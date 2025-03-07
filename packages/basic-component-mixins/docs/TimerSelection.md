# API Documentation
<a name="TimerSelection"></a>
## TimerSelection
Mixin which provides for automatic timed changes in selection.

This mixin is useful for creating slideshow-like elements.

This mixin expects the component to define an `items` property, as well as
`selectFirst` and `selectNext` methods. You can implement those yourself,
or use the [ContentAsItems](ContentAsItems.md) and
[ItemsSelection](ItemsSelection.md) mixins.

  **Kind**: global class

* [TimerSelection](#TimerSelection)
    * [.pause()](#TimerSelection+pause)
    * [.play()](#TimerSelection+play)
    * [.playing](#TimerSelection+playing) : <code>boolean</code>

<a name="TimerSelection+pause"></a>
### timerSelection.pause()
Pause automatic progression of the selection.

  **Kind**: instance method of <code>[TimerSelection](#TimerSelection)</code>
<a name="TimerSelection+play"></a>
### timerSelection.play()
Begin automatic progression of the selection.

  **Kind**: instance method of <code>[TimerSelection](#TimerSelection)</code>
<a name="TimerSelection+playing"></a>
### timerSelection.playing : <code>boolean</code>
True if the selection is being automatically advanced.

  **Kind**: instance property of <code>[TimerSelection](#TimerSelection)</code>
