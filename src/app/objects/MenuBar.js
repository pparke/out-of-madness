/**
 * Menu Bar
 */

import Pane from './Pane';
import * as allpanes from '../data/panes/manifest.js';

export default class MenuBar extends Phaser.Group {
  constructor (game, ... args) {
    super(game, ... args);

    this.background = null;
    this.panes      = new Map();

    this.init();
    this.calculateHitArea();
  }

  init () {
    this.background = this.game.add.image(0, 0, 'menubar');
    this.background.fixedToCamera = true;
    this.add(this.background);
    this.y = this.game.height - this.background.height;
    this.setupPanes(allpanes);
  }

  /**
   *  Calculate Hit Area
   */
  calculateHitArea () {
    this.hitArea = new Phaser.Rectangle(this.x, this.y, this.width, this.height);
  }

  /**
   * Setup Panes
   */
  setupPanes (panes) {
    Object.keys(panes).forEach((key) => {
      let pane = panes[key];
      this.createPane(pane.key, pane);
    });
  }

  /**
   * Create Pane
   * Create a new pane with the given name and layout, add it to the map
   * and as a member of this group.
   */
  createPane (key, config) {
    let pane = new Pane(this.game, this, key);
    pane.init(config);

    this.panes.set(key, pane);
    this.add(pane);

    return pane;
  }

  /**
   * Show Pane
   * Move pane onto screen
   */
  showPane (key) {
    let pane = this.panes.get(key);
    pane.open = true;
    pane.callAll('revive');
    //let xpos = this.game.width - this.background.width;
    //this.game.add.tween(this).to( { x: xpos }, 500, 'Linear', true);
  }

  /**
   * Hide Pane
   */
  hidePane (key) {
    let pane = this.panes.get(key);
    pane.open = false;

    //let xpos = this.game.width;
    //this.game.add.tween(this).to( { x: xpos }, 500, 'Linear', true);
    //this.callAll('kill');
  }
}
