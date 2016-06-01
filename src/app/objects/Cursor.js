/*
 * Cursor
 * ============================================================================
 * The game cursor
 */

export default class Cursor extends Phaser.Sprite {
   constructor (game, ...args) {
     super(game, 0, 0, 'cursors', 'eye01');

     this.anchor.setTo(0.5, 0.5);
     this.scale.x = 1;
     this.scale.y = 1;

     this.game.add.existing(this);
     this.game.physics.arcade.enable(this);
     this.body.setSize(32, 32);

     this.game.input.addMoveCallback(this.follow, this);
   }

   follow (pointer, x, y) {
     this.position.x = x;
     this.position.y = y;
   }

 }
