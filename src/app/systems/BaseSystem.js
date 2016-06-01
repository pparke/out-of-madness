/**
 * Base System
 * Provides the essential methods for adding, removing and updating components.
 * This class and all subclasses are singletons.
 */

import * as Components from '../components';

const _components = new Set();      // static class variable containing all existing components

export default class BaseSystem {
  constructor () {
    // the components that this system operates on
    this.components = [];

  }

  /**
   * Add a new component to the given target, also creates
   * the components hash on the target if none exists
   * @param {object} target - the target to add the component to
   * @param {string} name   - the class name of the component to create
   * @returns {object} the created component
   */
  static addComponent (target, name) {
    let C = Components[name];
    let comp = new C();

    if (!target.components) {
      target.components = {};
    }

    target.components[comp.name] = comp;
    comp.setTarget(target);
    // keep track of the component so we can update it
    _components.add(comp);

    return comp;
  }

  /**
   * Remove a component from the given object
   * @param  {object} target - the object to remove the component from
   * @param  {string} name   - the name of the component to remove
   */
  static removeComponent (target, name) {
    let comp = target.components[name];
    _components.delete(comp);
    delete target.components[name];
  }

  /**
   * Set up the components on the target entity and return
   * a map of the created components
   * @param  {object} target - the entity to add the components to
   * @param  {array} components - (optional) the components to add to the entity, must be a subset of this.components
   * @return {object} a map of the component created with their class names as keys
   */
  mogrify (target, components) {
    components = components || this.components;
    components = components.filter((comp) => this.components.indexOf(comp) > -1);

    return components.reduce((obj, name) => {
      obj[name] = BaseSystem.addComponent(target, name);
      return obj;
    }, {});
  }

  /**
   * Checks if the given entity has all of the required components
   * @param  {object} entity - the entity containing the components
   * @return {boolean}       - true if all required components are present
   */
  matchEntity (entity) {
    let ecomps = Object.keys(entity.components);

    // check if the entity has the required components
    for (let i = 0; i < this.components.length; i++) {
      if (!ecomps.some((name) => this.components[i] === name)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Call the update method of all existing components.
   */
  static update () {
    _components.forEach((component) => {
      if (component.update) {
        component.update();
      }
    });
  }
}
