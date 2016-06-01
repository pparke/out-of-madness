/*
 * Game class
 * ============================================================================
 *
 * Extends the Phaser.Game class to automatically detect the client screen size
 * and import all necessary states.  Starts Boot state when ready.
 */

import 'pixi';
import 'p2';
import Phaser from 'phaser';

import * as states from './app/states';


class Game extends Phaser.Game {
  constructor () {
    let width = document.documentElement.clientWidth > 1024 ? 1024 : document.documentElement.clientWidth;
    let height = document.documentElement.clientHeight > 768 ? 768 : document.documentElement.clientHeight;

    super(width, height, Phaser.AUTO, 'content', null);

    // Dynamically add all required game states.
    Object.keys(states).forEach((key) => this.state.add(key, states[key]));

    this.state.start('Boot');
  }
}

// wait for the page to fully load before creating the game
window.addEventListener('load', function (event) {
  console.log('page loaded')
  window.game = new Game();
});
