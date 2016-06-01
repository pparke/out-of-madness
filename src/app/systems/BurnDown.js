/**
 * Burn Down System
 * Allows an entity to be burnt until it is destroyed
 */
import BaseSystem from './BaseSystem';

export default class BurnDown extends BaseSystem {
  constructor (... args) {
    super(... args);

    this.components = ['Breakable', 'Flammable'];
  }

  mogrify (target) {
    let components = super.mogrify(target);
    // wire component signals to component methods here
    components.Flammable.events.onBurnt.add(components.Breakable.broken, components.Breakable);
  }

}
