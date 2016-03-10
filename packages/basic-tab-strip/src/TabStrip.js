import ElementBase from '../../basic-element-base/src/ElementBase';
import ContentFirstChildTarget from '../../basic-component-mixins/src/ContentFirstChildTarget';
import DirectionSelection from '../../basic-component-mixins/src/DirectionSelection';
import DistributedChildrenAsContent from '../../basic-component-mixins/src/DistributedChildrenAsContent';
import ItemsSelection from '../../basic-component-mixins/src/ItemsSelection';
import KeyboardDirection from '../../basic-component-mixins/src/KeyboardDirection';
import ObserveContentChanges from '../../basic-component-mixins/src/ObserveContentChanges';
import renderArrayAsElements from '../../basic-component-mixins/src/renderArrayAsElements';
import TargetSelection from '../../basic-component-mixins/src/TargetSelection';
import toggleClass from '../../basic-component-mixins/src/toggleClass';


// Used to assign unique IDs to tabs for ARIA purposes.
let idCount = 0;


let base = ElementBase.compose(
  ContentFirstChildTarget,
  DirectionSelection,
  DistributedChildrenAsContent,
  ItemsSelection,
  KeyboardDirection,
  ObserveContentChanges,
  TargetSelection
);


/**
 * A horizontal strip of tabs.
 *
 * The component creates a tab to represent each of its light DOM children —
 * the panels (a.k.a pages) that will be shown or hidden when the user selects
 * a tab.
 *
 * The user can select a tab with the mouse or touch, as well as by through the
 * keyboard. Each tab appears as a separate button in the tab order.
 * Additionally, if the focus is currently on a tab, the user can quickly
 * navigate between tabs with the left and right arrow keys.
 *
 * By default, the tabs are shown grouped to the left, where each tab is only
 * as big as necessary. You can apply the `spread` CSS class to a
 * basic-tab-strip element for a variant appearance in which the available width
 * of the element is divided up equally among tabs.
 *
 * @extends ElementBase
 * @mixes ContentFirstChildTarget
 * @mixes DirectionSelection
 * @mixes DistributedChildrenAsContent
 * @mixes ItemsSelection
 * @mixes KeyboardDirection
 * @mixes ObserveContentChanges
 * @mixes TargetSelection
 */
class TabStrip extends base {

  applySelection(item, selected) {
    if (super.applySelection) { super.applySelection(item, selected); }
    let index = this.items.indexOf(item);
    // See if the corresponding tab has already been created.
    // If not, the correct tab will be selected when it gets created.
    let tabs = this.tabs;
    if (tabs && tabs.length > index) {
      let tab = this.tabs[index];
      if (tab) {
        applySelectionToTab(tab, selected);
      }
    }
  }

  createdCallback() {
    super.createdCallback();

    this.$.tabs.addEventListener('click', event => {
      let tab = event.target;
      let tabIndex = this.tabs.indexOf(tab);
      if (tabIndex >= 0) {
        this.selectedIndex = tabIndex;
      }
    });

    // Listen to keydown events on the tabs, not on pages.
    this.$.tabs.addEventListener('keydown', event => {
      let handled = this.keydown(event);
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });

    if (!this.getAttribute('role')) {
      // Assign a default ARIA role.
      this.setAttribute('role', 'tablist');
    }

    if (!this.tabPosition) {
      this.tabPosition = 'top';
    }
  }

  get tabs() {
    return [].slice.call(this.$.tabs.querySelectorAll('.tab'));
  }

  itemsChanged() {
    if (super.itemsChanged) { super.itemsChanged(); }

    let baseId = this.id ?
    "_" + this.id + "Panel" :
    "_panel";

    // Confirm that items have at least a default role and ID for ARIA purposes.
    this.items.forEach(item => {
      if (!item.getAttribute('role')) {
        item.setAttribute('role', 'tabpanel');
      }
      if (!item.id) {
        item.id = baseId + idCount++;
      }
    });

    // Create tabs.
    renderArrayAsElements(this.items, this.$.tabs, (item, element) => {
      if (!element) {
        element = document.createElement('button');
        element.classList.add('tab');
        element.classList.add('style-scope');
        element.classList.add('basic-tab-strip');
        element.setAttribute('role', 'tab');
        return element;
      }
      element.id = item.id + '_tab';
      element.textContent = item.getAttribute('aria-label');

      // Point tab and panel at each other.
      element.setAttribute('aria-controls', item.id);
      item.setAttribute('aria-labelledby', element.id);
    });

    this.selectedItemChanged();  // In case position of selected item moved.
  }

  keydown(event) {
    let handled = super.keydown(event);
    if (handled) {
      // If the event resulted in a change of selection, move the focus to the
      // newly-selected tab.
      this.tabs[this.selectedIndex].focus();
    }
    return handled;
  }

  selectedItemChanged() {
    if (super.selectedItemChanged) { super.selectedItemChanged(); }
    let selectedIndex = this.selectedIndex;
    this.tabs.forEach((tab, i) => {
      applySelectionToTab(tab, i === selectedIndex);
    });
  }

  /**
   * The position of the tab strip relative to the element's children. Valid
   * values are "top", "left", "right", and "bottom".
   *
   * @default "top"
   * @type {string}
   */
  get tabPosition() {
    return this._tabPosition;
  }
  set tabPosition(position) {
    this._tabPosition = position;

    if (this.getAttribute('tab-position') !== position) {
      this.setAttribute('tab-position', position);
      return;
    }

    // Physically reorder the tabs and pages to reflect the desired arrangement.
    let lastElement = (position === 'top' || position === 'left') ?
      this.$.pages :
      this.$.tabs;
    this.shadowRoot.appendChild(lastElement);

    this.navigationAxis = (position === 'top' || position === 'bottom') ?
      'horizontal' :
      'vertical';
  }

  get template() {
    return `
      <style>
      :host {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: column;
        flex-direction: column;
        position: relative;
      }

      #tabs {
        /*
         * Avoid having tab container stretch across. User won't be able to see
         * it, but since it handles the keyboard, in Mobile Safari a tap on the
         * container background will cause the region to flash. Aligning the
         * region collapses it down to hold its contents.
         */
        -webkit-align-self: flex-start;
        align-self: flex-start;
        /* For IE bug (clicking tab produces gap between tab and page). */
        display: -webkit-flex;
        display: flex;
        /*
         * Try to obtain fast-tap behavior on all tabs.
         * See https://webkit.org/blog/5610/more-responsive-tapping-on-ios/.
         */
        touch-action: manipulation;
      }

      #pages {
        background: white;
        border: 1px solid #ccc;
        display: -webkit-flex;
        display: flex;
        -webkit-flex: 1;
        flex: 1;
      }

      #pages ::content > * {
        display: -webkit-flex;
        display: flex;
        -webkit-flex: 1;
        flex: 1;
      }

      .tab {
        background: white;
        border: 1px solid #ccc;
        cursor: pointer;
        display: inline-block;
        font-family: inherit;
        font-size: inherit;
        margin: 0;
        padding: 0.5em 0.75em;
        position: relative;
        transition: border-color 0.25s;
      }
      .tab.selected {
        border-color: #ccc;
        opacity: 1;
      }

      /* Top/bottom positions */
      :host([tab-position="top"]) .tab:not(:last-child),
      :host([tab-position="bottom"]) .tab:not(:last-child) {
        margin-right: 0.2em;
      }

      /* Top position */
      :host([tab-position="top"]) .tab {
        border-radius: 0.25em 0.25em 0 0;
        margin-bottom: -1px;
      }
      :host([tab-position="top"]) .tab.selected {
        border-bottom-color: transparent;
      }

      /* Bottom position */
      :host([tab-position="bottom"]) .tab {
        border-radius: 0 0 0.25em 0.25em;
        margin-top: -1px;
      }
      :host([tab-position="bottom"]) .tab.selected {
        border-top-color: transparent;
      }

      /* Left/right positions */
      :host([tab-position="left"]),
      :host([tab-position="right"]) {
        -webkit-flex-direction: row;
        flex-direction: row;
      }
      :host([tab-position="left"]) #tabs,
      :host([tab-position="right"]) #tabs {
        -webkit-flex-direction: column;
        flex-direction: column;
      }
      :host([tab-position="left"]) .tab:not(:last-child),
      :host([tab-position="right"]) .tab:not(:last-child) {
        margin-bottom: 0.2em;
      }

      /* Left position */
      :host([tab-position="left"]) .tab {
        border-radius: 0.25em 0 0 0.25em;
        margin-right: -1px;
      }
      :host([tab-position="left"]) .tab.selected {
        border-right-color: transparent;
      }

      /* Right position */
      :host([tab-position="right"]) .tab {
        border-radius: 0 0.25em 0.25em 0;
        margin-left: -1px;
      }
      :host([tab-position="right"]) .tab.selected {
        border-left-color: transparent;
      }

      .tab:hover {
        background-color: #eee;
      }

      /* Spread variant */
      :host(.spread) #tabs {
        align-items: stretch;
        align-self: initial;
      }
      :host(.spread) .tab {
        flex: 1;
      }
      </style>

      <div id="tabs"></div>
      <div id="pages">
        <slot></slot>
      </div>
    `;
  }

}


function applySelectionToTab(tab, selected) {
  toggleClass(tab, 'selected', selected);
  tab.setAttribute('aria-selected', selected);
}


document.registerElement('basic-tab-strip', TabStrip);
export default TabStrip;
