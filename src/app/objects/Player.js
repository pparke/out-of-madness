/*
 * Player
 * @extends Phaser.Sprite
 * ============================================================================
 *
 *
 */


export default class Player extends Phaser.Sprite {
  constructor (game, x, y) {
    super(game, x, y, 'character', 'idle0000');

    this.anchor.setTo(0.5, 1);
    this.scale.x = 2;
    this.scale.y = 2;

    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.body.setSize(32, 10);
    // animations
    let frames = Phaser.Animation.generateFrameNames('right', 0, 5, '', 4);
    this.animations.add('walk', frames, 6, true, true);

  }


  animate (dir) {
    switch (dir) {
      case 'right':
        if (this.scale.x < 0) this.scale.x *= -1;
        this.animations.play('walk');
        break;
      case 'left':
        if (this.scale.x > 0) this.scale.x *= -1;
        this.animations.play('walk');
        break;
      case 'stop':
        this.animations.stop();
        this.frameName = 'idle0000';
        break;
    }
  }

}
