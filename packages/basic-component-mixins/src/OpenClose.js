import toggleClass from '../../basic-component-mixins/src/toggleClass';


/* Exported function extends a base class with OpenClose. */
export default (base) => {

  /**
   * Mixin which adds close/open semantics.
   *
   * This mixin does not produce any user-visible effects. Instead it applies
   * a `basic-closed` CSS class to the component host if the host is
   * closed, and a `basic-opened` class if opened. It also invokes a `render`
   * function that can be overridden to apply custom effects.
   */
  class OpenClose extends base {

    attachedCallback() {
      if (super.attachedCallback) { super.attachedCallback(); }
      this.render(this.closed);
    }

    createdCallback() {
      if (super.createdCallback) { super.createdCallback(); }
      this._closed = false;
    }

    /**
     * Close the component.
     *
     * This is equivalent to setting the `closed` property to true.
     */
    close() {
      this.closed = true;
    }

    /**
     * True if the component is curently closed.
     *
     * @type {boolean}
     * @default false
     */
    get closed() {
      return this._closed;
    }
    set closed(value) {
      if ('closed' in base.prototype) { super.closed = value; }
      if (this._closed !== value) {
        this._closed = value;
        this.render(value);

        let event = new CustomEvent('closed-changed');
        this.dispatchEvent(event);
      }
    }

    /**
     * Open the component.
     *
     * This is equivalent to setting the `closed` property to false.
     */
    open() {
      this.closed = false;
    }

    /**
     * Perform custom rendering of the close/open transition.
     *
     * You can override this method to perform custom effects. If you do so,
     * be sure to invoke `super()` in your implementation to get the baseline
     * behavior.
     *
     * @param {boolean} closing - True if the component is being closed,
     *        false if it's being opened.
     */
    render(closing) {
      toggleClass(this, 'basic-closed', closing);
      toggleClass(this, 'basic-opened', !closing);
      this.setAttribute('aria-expanded', !closing);
    }

    /**
     * Toggle the component's open/closed state.
     */
    toggle() {
      this.closed = !this.closed;
    }

  }

  return OpenClose;
};
