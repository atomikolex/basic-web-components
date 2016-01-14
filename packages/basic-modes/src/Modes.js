/*
 * Shows exactly one child element at a time. This can be useful, for example,
 * if a given UI element has multiple modes that present substantially different
 * elements.
 *
 * This component doesn't provide any UI for changing which mode is shown.
 *
 * @class Modes
 */


import ElementBase from '../../basic-element-base/src/ElementBase';
import ChildrenContent from '../../basic-component-mixins/src/ChildrenContent';
import CollectiveMember from '../../basic-component-mixins/src/CollectiveMember';
import ContentItems from '../../basic-component-mixins/src/ContentItems';
import ItemsAccessible from '../../basic-component-mixins/src/ItemsAccessible';
import ItemsSelection from '../../basic-component-mixins/src/ItemsSelection';

let base = ElementBase.compose(
  ChildrenContent,
  CollectiveMember,
  ContentItems,
  ItemsSelection,
  ItemsAccessible
);


export default class Modes extends base {

  applySelection(item, selected) {
    if (super.applySelection) { super.applySelection(item, selected); }
    // item.style.visibility = selected ? 'visible' : 'hidden';
    item.style.display = selected ? 'inherit' : 'none';
  }

  attachedCallback() {
    // HACK
    this.itemsChanged();
    this.selectionRequired = true;
  }

  // itemAdded(item) {
  //   if (super.itemAdded) { super.itemAdded(item); }
  //   item.style.position = 'absolute';
  //   item.style.top = 0;
  // }

}


document.registerElement('basic-modes', Modes);
