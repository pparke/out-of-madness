/*
 * SceneManager
 * ============================================================================
 *
 *
 */
import * as scenes from '../scenes';
import parseDimension from '../util/parseDimension';

export default class SceneManager {
  constructor (game, x, y, player, background, startScene) {
    this.game = game;
    this.player = player;
    this.game.systems.interaction.addText(this.player);

    this.background = this.game.add.image(x, y, background);
    this.background.anchor.set(0.5);
    this.game.systems.interaction.addTrigger(this.background);

    this.scene = null;

    this.entities = {
      exit: {},
      object: {},
      npc: {}
    };

    this.sceneGroup = game.add.group();
    this.game.display.group.add(this.background);
    this.game.display.group.add(this.sceneGroup);
    //this.sceneGroup.add(this.background);
    this.sceneGroup.add(this.player);

    this.onStage = {
      exit: [],
      object: [],
      npc: []
    };

    this.loadScene(startScene);
  }

  /**
   * Load the specified scene
   * @param  {string} key  - the scene to load
   * @param  {object} exit - the exit of the previous scene
   */
  loadScene (key, exit) {
    exit = exit || {};
    let entrance = exit.entrance;
    this.scene = scenes[key];
    this.background.frameName = this.scene.background;
    this.setupEntities('exit', this.scene.exits);
    this.setupEntities('object', this.scene.objects);
    // move the player to the exit connected to the previous one
    if (entrance) {
      this.player.x = parseDimension(this.scene.exits[entrance].x, this.game.world.width);
      this.player.y = parseDimension(this.scene.exits[entrance].y, this.game.world.height);
    }
  }

  /**
   * Find and return a dead entity from the pool or create a new one if none
   * are available
   */
  findOrCreate () {
    // try to find a dead entity to use
    let entity = null;
    this.sceneGroup.getFirstDead();
    if (entity === null) {
      entity = this.game.add.sprite(0, 0);
      this.sceneGroup.add(entity);
      entity.anchor.set(0.5, 1);
      this.game.physics.arcade.enable(entity, Phaser.Physics.ARCADE);
      entity.body.setSize(32, 32, 0, 0);
      entity.body.immovable = true;
      this.game.systems.interaction.addTrigger(entity);
      entity.kill();
    }
    return entity;
  }

  /**
   * Sets up the exits from the object given
   * @param  {object} exits - the exits and their properties
   */
  setupEntities (type, ents) {
    console.log('setting up', type, ents)
    // kill and remove all existing exits
    Object.keys(this.entities[type]).forEach((key) => {
      this.entities[type][key].kill();
      delete this.entities[type][key];
    });
    this.onStage[type] = [];
    // setup only the exits present in the scene
    let height = this.game.world.height;
    let width = this.game.world.width;
    Object.keys(ents).forEach((key) => {
      if (ents.hasOwnProperty(key)) {
        this.entities[type][key] = this.findOrCreate();
        console.log('entity', key, 'is', this.entities[type][key])
        this.entities[type][key].revive();
        let bodyWidth = parseDimension(ents[key].width, width);
        let bodyHeight = parseDimension(ents[key].height, height);
        let offsetX = parseDimension(ents[key].offsetX, width);
        let offsetY = parseDimension(ents[key].offsetY, height);
        this.entities[type][key].body.setSize(bodyWidth, bodyHeight, offsetX, offsetY);
        this.entities[type][key].x = parseDimension(ents[key].x, width);
        this.entities[type][key].y = parseDimension(ents[key].y, height);
        // exit props
        this.entities[type][key].scene = ents[key].scene;
        this.entities[type][key].entrance = ents[key].entrance;
        // object props
        this.entities[type][key].immovable = ents[key].immovable === undefined ? true : ents[key].immovable;
        if (ents[key].textureKey && ents[key].frameName) {
          console.log('texture', this.entities[type][key].texture);
          this.entities[type][key].loadTexture(ents[key].textureKey, ents[key].frameName);
        }
        else {
          // use .setTexture here?
        }
        this.entities[type][key].enable = ents[key].enable === undefined ? true : ents[key].enable;
        this.entities[type][key].action = ents[key].action;

        this.onStage[type].push(this.entities[type][key]);
      }
    });

  }

  update () {
    this.game.physics.arcade.overlap(this.player, this.onStage.exit, this.changeScene, null, this);
    this.game.physics.arcade.collide(this.player, this.onStage.object);
    this.sceneGroup.sort('y', Phaser.Group.SORT_ASCENDING);
  }

  changeScene (player, exit) {
    this.loadScene(exit.scene, exit);
  }

}
