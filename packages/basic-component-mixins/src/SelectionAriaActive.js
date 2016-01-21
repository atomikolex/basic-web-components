/**
 * @class SelectionAriaActive
 * @classdesc Mixin which treats the selected item in a list as the active item
 * in ARIA accessibility terms
 *
 * Handling ARIA selection state properly is actually quite complex. Not only
 * does the selected item need to be marked as selected; the other items should
 * be marked as *not* selected. Additionally, the outermost element with the
 * keyboard focus needs to have attributes set on it so that the selection is
 * knowable at the list level. That in turn requires that all items in the list
 * have ID attributes assigned to them. (To that end, this mixin will assign
 * generated IDs to any item that doesn't already have an ID.)
 */


// Used to assign unique IDs to item elements without IDs.
let idCount = 0;


export default (base) => class SelectionAriaActive extends base {

  applySelection(item, selected) {
    if (super.applySelection) { super.applySelection(item, selected); }
    item.setAttribute('aria-selected', selected);
    let itemId = item.getAttribute('id');
    if (itemId) {
      this.collective.outermostElement.setAttribute('aria-activedescendant', itemId);
    }
  }

  collectiveChanged() {
    if (super.collectiveChanged) { super.collectiveChanged(); }

    // Ensure the outermost aspect has an ARIA role.
    let outermostElement = this.collective.outermostElement;
    if (!outermostElement.getAttribute('role')) {
      // Try to promote an ARIA role from an inner element. If none is found,
      // use a default role.
      let role = getCollectiveAriaRole(this.collective) || 'listbox';
      outermostElement.setAttribute('role', role);
    }
    if (!outermostElement.getAttribute('aria-activedescendant')) {
      // Try to promote an ARIA activedescendant value from an inner element.
      let descendant = getCollectiveAriaActiveDescendant(this.collective);
      if (descendant) {
        outermostElement.setAttribute('aria-activedescendant', descendant);
      }
    }

    // Remove the ARIA role and activedescendant values from the collective's
    // inner elements.
    this.collective.elements.forEach(element => {
      if (element !== outermostElement) {
        element.removeAttribute('aria-activedescendant');
        element.removeAttribute('role');
      }
    });
  }

  createdCallback() {
    if (super.createdCallback) { super.createdCallback(); }

    // Determine a base item ID based on this component's host's own ID. This
    // will be combined with a unique integer to assign IDs to items that don't
    // have an explicit ID. If the basic-list-box has ID "foo", then its items
    // will have IDs that look like "_fooOption1". If the list has no ID itself,
    // its items will get IDs that look like "_option1". Item IDs are prefixed
    // with an underscore to differentiate them from manually-assigned IDs, and
    // to minimize the potential for ID conflicts.
    let elementId = this.getAttribute( "id" );
    this.itemBaseId = elementId ?
        "_" + elementId + "Option" :
        "_option";
  }

  itemAdded(item) {
    if (super.itemAdded) { super.itemAdded(item); }

    item.setAttribute('role', 'option');

    // Ensure each item has an ID so we can set aria-activedescendant on the
    // overall list whenever the selection changes.
    if (!item.getAttribute('id')) {
      item.setAttribute('id', this.itemBaseId + idCount++);
    }
  }

  get selectedItem() {
    return super.selectedItem;
  }
  set selectedItem(item) {
    if ('selectedItem' in base.prototype) { super.selectedItem = item; }
    // Catch the case where the selection is removed.
    if (item == null && this.collective) {
      this.collective.outermostElement.removeAttribute('aria-activedescendant');
    }
  }

};


// Return the first ARIA activedescendant defined by the collective.
function getCollectiveAriaActiveDescendant(collective) {
  let descendants = collective.elements.map(element => element.getAttribute('aria-activedescendant'));
  let nonNullDescendants = descendants.filter(descendant => descendant !== null);
  return nonNullDescendants[0];
}


// Return the first ARIA label defined by the collective.
function getCollectiveAriaRole(collective) {
  let roles = collective.elements.map(element => element.getAttribute('role'));
  let nonNullRoles = roles.filter(role => role !== null);
  return nonNullRoles[0];
}
