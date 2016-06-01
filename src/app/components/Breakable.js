/**
 * Breakable Component
 */
import Base from'./Base';

export default class Breakable extends Base {
  constructor (... args) {
    super(... args);

    this.name = 'Breakable';
    this.target = null;

    this.isBroken = false;

    this.events.onBroken = new Phaser.Signal();

  }

  setTarget (target) {
    this.target = target;
    console.log(`[${this.name}] Added target.`);
  }

  /**
   * Inflict damage on the breakable object
   * @param  {number} damage - the amount of health points to remove
   */
  hurt (damage) {
    if (this.isBroken) {
      return;
    }

    this.target.health -= damage;

    console.log(`Breakable hit for ${damage} points of damage. HP: ${this.target.health}`);

    if (this.target.health <= 0) {
      this.isBroken = true;
      this.broken();
    }
  }

  /**
   * Dispatch the onBroken event
   */
  broken () {
    console.log('Breakable has broken!');
    this.events.onBroken.dispatch();
  }
}
