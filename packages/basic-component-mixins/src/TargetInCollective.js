/**
 * @class TargetInCollective
 * @classdesc Mixin which allows a component to provide aggregate behavior with
 * other elements, e.g., for keyboard handling
 */


import Collective from './Collective';

export default (base) => class TargetInCollective extends base {

  createdCallback() {
    if (super.createdCallback) { super.createdCallback(); }
    this.collective = new Collective(this);
  }

  get target() {
    return super.target;
  }
  set target(element) {
    if ('target' in base.prototype) { super.target = element; }
    this.collective.assimilate(element);
  }

};
