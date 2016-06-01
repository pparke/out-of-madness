/*
 * Menu state
 * ============================================================================
 *
 * Menu state
 */
import Phaser     from 'phaser';
import BaseSystem from '../systems/BaseSystem';

export default class Menu extends Phaser.State {

  create () {
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;
    this.titleSize = 85;
    this.menuSize = 30;

    this.game.time.events.add(Phaser.Timer.SECOND * 0.2, this.showTitle, this);
    this.game.time.events.add(Phaser.Timer.SECOND * 0.3, this.showMenuOptions, this);

  }

  update () {
    BaseSystem.update();
  }

  // --------------------------------------------------------------------------

  showTitle () {
    let title = this.game.add.text(this.centerX, this.centerY, 'OUT OF MADNESS', {
      font: `${this.titleSize}px NoirEtBlancBold`,
      fontSize: `${this.titleSize}px`,
      fontFamily: 'NoirEtBlancBold',
      fill: '#FFFFFF',
      align: 'center',
    });

    title.anchor.set(0.5);
    title.inputEnabled = true;

  }

  showMenuOptions () {
    let style = {
      font: `${this.menuSize}px DayPosterBlackRegular`,
      fontSize: `${this.menuSize}px`,
      fontFamily: 'DayPosterBlackRegular',
      fill: '#ffffff',
      align: 'center',
    };

    // start option
    let start = this.game.add.text(this.centerX, this.centerY + (this.titleSize + this.menuSize*2), 'NEW GAME', style);
    start.anchor.set(0.5);
    start.inputEnabled = true;
    start.input.useHandCursor = true;
    start.events.onInputUp.add(this.newGame, this);
    start.events.onInputOver.add(this.over, this);
    start.events.onInputOut.add(this.out, this);
    start.alpha = 0;
    this.game.add.tween(start).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);

    // load option
    let load = this.game.add.text(this.centerX, this.centerY + (this.titleSize + this.menuSize*4), 'CONTINUE', style);
    load.anchor.set(0.5);
    load.inputEnabled = true;
    load.input.useHandCursor = true;
    load.events.onInputUp.add(this.loadGame, this);
    load.events.onInputOver.add(this.over, this);
    load.events.onInputOut.add(this.out, this);
    load.alpha = 0;
    this.game.add.tween(load).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
  }

  over (item) {
    item.fill = '#880000';
  }

  out (item) {
    item.fill = '#ffffff';
  }

  newGame () {
    this.state.start('Game');
  }

  loadGame (...args) {
    console.log('load game', args);
  }

}
