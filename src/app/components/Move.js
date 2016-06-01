/**
 * Move Component
 */
import Base from'./Base';

export default class Move extends Base {
  constructor (... args) {
    super(... args);

    this.name = 'Move';
    this.target = null;

    this.isMoving = false;
    this.doneMoving = true;
    this.canMove = true;

    this.events = {
      onMove: new Phaser.Signal(),
      onArrived: new Phaser.Signal(),
      onStuck: new Phaser.Signal()
    };

    this.destination = new Phaser.Point(0, 0);
    this.speed = 60;

  }

  /**
   * Start the entity moving towards the given point.
   * @param {Phaser.Point} point - the point to move to
   */
  moveTo (point) {
    if (!this.canMove) {
      return;
    }

    this.isMoving = true;

    this.destination = new Phaser.Point(point.x, point.y);

    console.log('moving to point', point.x, point.y)

    // if the destination is to the right
    if (this.target.position.x < this.destination.x) {
      this.target.animate('right');
    }
    else {
      this.target.animate('left');
    }

    this.target.game.physics.arcade.moveToObject(this.target, this.destination, this.speed);
  }

  update () {
    if (this.isMoving) {
      if (Math.abs(this.target.position.x - this.destination.x) < 5) {
        this.target.body.velocity.x = 0;
      }
      if (Math.abs(this.target.position.y - this.destination.y) < 5) {
        this.target.body.velocity.y = 0;
      }
      if (this.target.body.velocity.x === 0 && this.target.body.velocity.y === 0) {
        this.isMoving = false;
        this.target.animate('stop');
      }
    }
  }
}
