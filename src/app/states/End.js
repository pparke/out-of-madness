/*
 * End state
 * ============================================================================
 *
 * A End state
 */
import Phaser     from 'phaser';
import BaseSystem from '../systems/BaseSystem';

export default class Game extends Phaser.State {

  create () {
    this.centerX = this.world.centerX;
    this.centerY = this.world.centerY;
    this.endSize = 85;
    this.scoreSize = 30;

    let end = this.game.add.text(this.centerX, this.centerY, 'FIN', {
      font: `${this.endSize}px NoirEtBlancBold`,
      fontSize: `${this.endSize}px`,
      fontFamily: 'NoirEtBlancBold',
      fill: '#FFFFFF',
      align: 'center',
    });

    end.anchor.set(0.5);

    this.game.time.events.add(Phaser.Timer.SECOND * 2, this.showScore, this);

  }

  update () {
    BaseSystem.update();
  }

  // --------------------------------------------------------------------------

  showScore () {
    let score = this.game.add.text(this.centerX, this.centerY + (this.endSize + this.scoreSize*2), 'Score: 1000', {
      font: `${this.scoreSize}px NoirEtBlancBold`,
      fontSize: `${this.scoreSize}px`,
      fontFamily: 'NoirEtBlancBold',
      fill: '#FFFFFF',
      align: 'center',
    });

    score.anchor.set(0.5);

  }

}
