/*
 * Game state
 * ============================================================================
 *
 */
import Phaser       from 'phaser';
import BaseSystem   from '../systems/BaseSystem';
import Player       from '../objects/Player';
import Interaction  from '../systems/Interaction';
import SceneManager from '../objects/SceneManager';
import MenuBar      from '../objects/MenuBar';

export default class Game extends Phaser.State {

  /**
   * Create the player and scene objects
   */
  create () {
    //this.world.setBounds(0, 0, width, height);
    console.log(this.world)
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;

    console.log(this.centerX, this.centerY);

    this.game.ui = {};
    this.game.display = {};
    this.game.display.group = this.game.add.group();
    this.game.ui.group = this.game.add.group();

    // systems
    this.game.systems = {};
    this.game.systems.interaction = new Interaction(this.game);
    this.game.ui.group.add(this.game.systems.interaction.cursor);

    this.player = new Player(this.game, 194, 468);
    this.sceneManager = new SceneManager(this.game, this.centerX, this.centerY, this.player, 'background', 'start');
    this.menu = new MenuBar(this.game);

    this.game.systems.interaction.addActor(this.player);
  }

  update () {
    BaseSystem.update();
    this.sceneManager.update();
  }

  render () {
/*
    game.debug.bodyInfo(this.player, 32, 32);
    game.debug.body(this.player);
    if (this.sceneManager.entities.exit.south) {
      game.debug.body(this.sceneManager.entities.exit.south);
    }
    if (this.sceneManager.entities.exit.north) {
      game.debug.body(this.sceneManager.entities.exit.north);
    }
    Object.keys(this.sceneManager.entities.object).forEach((key) => {
      game.debug.body(this.sceneManager.entities.object[key]);
    })
*/
  }

}
