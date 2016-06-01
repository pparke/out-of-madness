/**
 * Base Component
 */

export default class Base {
  constructor () {
    this.name = 'Base';
    this.target = null;
    this.events = {};
  }

  setTarget (target) {
    this.target = target;
    this.afterTarget();
  }

  /**
   * After Target
   * Perform any operations needed after target is set.
   */
  afterTarget () {
    // stub
    console.log(`[${this.name}] Added target.`);
  }

  /**
   *   Publish an event
   *   @param {string} event - the key of the event
   *   @param {any} args - arguments to pass to any listeners
   */
  publish (event, ...args) {
    if (this.events.hasOwnProperty(event)) {
      this.events[event].dispatch(...args)
    }
  }

  update () {
    // stub
  }
}
