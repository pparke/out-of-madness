/**
 * Flammable Component
 */
import Base from'./Base';

export default class Flammable extends Base {
  constructor (... args) {
    super (... args);

    this.name = 'Flammable';
    this.target = null;

    this.isBurning = false;
    this.isBurnt = false;
    this.burnPoints = 100;

    this.events.onBurnt = new Phaser.Signal();
  }

  setTarget (target) {
    this.target = target;
    console.log(`[${this.name}] Added target.`);
  }

  burn () {
    if (this.isBurnt) {
      return;
    }

    this.isBurning = true;
    this.burnPoints -= 1;

    console.log(`Burnable component points remaining: ${this.burnPoints}`);

    if (this.burnPoints <= 0) {
      this.burnt();
    }
  }

  burnt () {
    this.isBurning = false;
    this.isBurnt = true;
    this.events.onBurnt.dispatch();
  }

  update () {
    if (this.isBurning) {
      this.burn();
    }
  }
}
