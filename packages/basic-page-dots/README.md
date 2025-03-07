# API Documentation
<a name="PageDots"></a>
## PageDots ⇐ <code>ElementBase</code>
Presents a set of small dots to show list item count and select list items.

You can see a [live demo](http://basicwebcomponents.org/basic-web-components/packages/basic-carousel/carouselWithDots.html)
of this component applied to a carousel.

There will be one dot for each item, and the dot for the currently selected
item will be shown selected.

Typical usage:

    <basic-page-dots>
      <basic-carousel>
        ... images, etc. ...
      </basic-carousel>
    </basic-page-dots>

Although the dots are quite small by default, clicking/tapping a dot will
will select the corresponding list item.

  **Kind**: global class
**Extends:** <code>ElementBase</code>  
**Mixes**: <code>[ContentFirstChildTarget](../basic-component-mixins/docs/ContentFirstChildTarget.md)</code>
  , <code>[DistributedChildrenAsContent](../basic-component-mixins/docs/DistributedChildrenAsContent.md)</code>
  , <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code>
  , <code>[Keyboard](../basic-component-mixins/docs/Keyboard.md)</code>
  , <code>[ObserveContentChanges](../basic-component-mixins/docs/ObserveContentChanges.md)</code>
  , <code>[TargetInCollective](../basic-component-mixins/docs/TargetInCollective.md)</code>
  , <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code>
  

* [PageDots](#PageDots) ⇐ <code>ElementBase</code>
    * [.applySelection(item, selected)](#ItemsSelection+applySelection)
    * [.canSelectNext](#ItemsSelection+canSelectNext) : <code>boolean</code>
    * [.canSelectPrevious](#ItemsSelection+canSelectPrevious) : <code>boolean</code>
    * [.content](#DistributedChildrenAsContent+content) : <code>Array.&lt;HTMLElement&gt;</code>
    * ["content-changed"](#ObserveContentChanges.event_content-changed)
    * [.contentChanged()](#ObserveContentChanges+contentChanged)
    * [.itemAdded(item)](#ItemsSelection+itemAdded)
    * [.items](#TargetSelection+items) : <code>Array.&lt;HTMLElement&gt;</code>
    * [.itemsChanged()](#TargetSelection+itemsChanged)
    * [.keydown(event)](#Keyboard+keydown) ⇒ <code>boolean</code>
    * [.position](#PageDots+position) : <code>number</code>
    * ["selected-index-changed"](#ItemsSelection.event_selected-index-changed)
    * ["selected-item-changed"](#ItemsSelection.event_selected-item-changed)
    * [.selectedIndex](#TargetSelection+selectedIndex) : <code>number</code>
    * [.selectedIndex](#ItemsSelection+selectedIndex) : <code>number</code>
    * [.selectedItem](#ItemsSelection+selectedItem) : <code>object</code>
    * [.selectedItem](#TargetSelection+selectedItem) : <code>HTMLElement</code>
    * [.selectFirst()](#ItemsSelection+selectFirst)
    * [.selectionRequired](#ItemsSelection+selectionRequired) : <code>boolean</code>
    * [.selectLast()](#ItemsSelection+selectLast)
    * [.selectNext()](#ItemsSelection+selectNext)
    * [.selectPrevious()](#ItemsSelection+selectPrevious)
    * [.target](#TargetInCollective+target) : <code>HTMLElement</code>
    * [.target](#ContentFirstChildTarget+target) : <code>HTMLElement</code>
    * [.target](#TargetSelection+target) : <code>HTMLElement</code>

<a name="ItemsSelection+applySelection"></a>
### pageDots.applySelection(item, selected)
Apply the indicate selection state to the item.

The default implementation of this method does nothing. User-visible
effects will typically be handled by other mixins.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the item being selected/deselected |
| selected | <code>boolean</code> | true if the item is selected, false if not |

<a name="ItemsSelection+canSelectNext"></a>
### pageDots.canSelectNext : <code>boolean</code>
True if the selection can be moved to the next item, false if not (the
selected item is the last item in the list).

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+canSelectPrevious"></a>
### pageDots.canSelectPrevious : <code>boolean</code>
True if the selection can be moved to the previous item, false if not
(the selected item is the first one in the list).

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="DistributedChildrenAsContent+content"></a>
### pageDots.content : <code>Array.&lt;HTMLElement&gt;</code>
The content of this component, defined to be the flattened array of
children distributed to the component.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[DistributedChildrenAsContent](../basic-component-mixins/docs/DistributedChildrenAsContent.md)</code> mixin.
<a name="ObserveContentChanges.event_content-changed"></a>
### "content-changed"
This event is raised when the component's contents (including distributed
children) have changed.

  **Kind**: event emitted by <code>[PageDots](#PageDots)</code>. Defined by <code>[ObserveContentChanges](../basic-component-mixins/docs/ObserveContentChanges.md)</code> mixin.
<a name="ObserveContentChanges+contentChanged"></a>
### pageDots.contentChanged()
Invoked when the contents of the component (including distributed
children) have changed.

This method is also invoked when a component is first instantiated; the
contents have essentially "changed" from being nothing. This allows the
component to perform initial processing of its children.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ObserveContentChanges](../basic-component-mixins/docs/ObserveContentChanges.md)</code> mixin.
<a name="ItemsSelection+itemAdded"></a>
### pageDots.itemAdded(item)
Handle a new item being added to the list.

The default implementation of this method simply sets the item's
selection state to false.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.

| Param | Type | Description |
| --- | --- | --- |
| item | <code>HTMLElement</code> | the item being added |

<a name="TargetSelection+items"></a>
### pageDots.items : <code>Array.&lt;HTMLElement&gt;</code>
The current set of items in the list.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code> mixin.
<a name="TargetSelection+itemsChanged"></a>
### pageDots.itemsChanged()
This method is invoked when the underlying contents change. It is also
invoked on component initialization – since the items have "changed" from
being nothing.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code> mixin.
<a name="Keyboard+keydown"></a>
### pageDots.keydown(event) ⇒ <code>boolean</code>
Handle the indicated keyboard event.

The default implementation of this method does nothing. This will
typically be handled by other mixins.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[Keyboard](../basic-component-mixins/docs/Keyboard.md)</code> mixin.
**Returns**: <code>boolean</code> - true if the event was handled  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>KeyboardEvent</code> | the keyboard event |

<a name="PageDots+position"></a>
### pageDots.position : <code>number</code>
The distance the user has moved the first touchpoint since the beginning
of a drag, expressed as a fraction of the element's width.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>
<a name="ItemsSelection.event_selected-index-changed"></a>
### "selected-index-changed"
Fires when the selectedIndex property changes.

  **Kind**: event emitted by <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.

| Param | Type | Description |
| --- | --- | --- |
| detail.selectedIndex | <code>number</code> | The new selected index. |

<a name="ItemsSelection.event_selected-item-changed"></a>
### "selected-item-changed"
Fires when the selectedItem property changes.

  **Kind**: event emitted by <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.

| Param | Type | Description |
| --- | --- | --- |
| detail.selectedItem | <code>HTMLElement</code> | The new selected item. |
| detail.previousItem | <code>HTMLElement</code> | The previously selected item. |

<a name="TargetSelection+selectedIndex"></a>
### pageDots.selectedIndex : <code>number</code>
The index of the item which is currently selected, or -1 if there is no
selection.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code> mixin.
<a name="ItemsSelection+selectedIndex"></a>
### pageDots.selectedIndex : <code>number</code>
The index of the item which is currently selected, or -1 if there is no
selection.

Setting the index to -1 deselects any current-selected item.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+selectedItem"></a>
### pageDots.selectedItem : <code>object</code>
The currently selected item, or null if there is no selection.

Setting this property to null deselects any currently-selected item.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="TargetSelection+selectedItem"></a>
### pageDots.selectedItem : <code>HTMLElement</code>
The currently selected item, or null if there is no selection.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code> mixin.
<a name="ItemsSelection+selectFirst"></a>
### pageDots.selectFirst()
Select the first item in the list.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+selectionRequired"></a>
### pageDots.selectionRequired : <code>boolean</code>
True if the list should always have a selection (if it has items).

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+selectLast"></a>
### pageDots.selectLast()
Select the last item in the list.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+selectNext"></a>
### pageDots.selectNext()
Select the next item in the list.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="ItemsSelection+selectPrevious"></a>
### pageDots.selectPrevious()
Select the previous item in the list.

  **Kind**: instance method of <code>[PageDots](#PageDots)</code>. Defined by <code>[ItemsSelection](../basic-component-mixins/docs/ItemsSelection.md)</code> mixin.
<a name="TargetInCollective+target"></a>
### pageDots.target : <code>HTMLElement</code>
Gets/sets the current target of the component.

Set this to point to another element. That target element will be
implicitly added to the component's collective. That is, the component
and its target will share responsibility for handling keyboard events.

You can set this property yourself, or you can use the
ContentFirstChildTarget mixin to automatically set the target to the
component's first child.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetInCollective](../basic-component-mixins/docs/TargetInCollective.md)</code> mixin.
<a name="ContentFirstChildTarget+target"></a>
### pageDots.target : <code>HTMLElement</code>
Gets/sets the current target of the component.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[ContentFirstChildTarget](../basic-component-mixins/docs/ContentFirstChildTarget.md)</code> mixin.
<a name="TargetSelection+target"></a>
### pageDots.target : <code>HTMLElement</code>
Gets/sets the target element to which this component will delegate
selection actions.

  **Kind**: instance property of <code>[PageDots](#PageDots)</code>. Defined by <code>[TargetSelection](../basic-component-mixins/docs/TargetSelection.md)</code> mixin.
