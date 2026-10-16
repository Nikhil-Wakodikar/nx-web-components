import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

export type NxToastPosition =
  | 'top'
  | 'bottom'
  | 'middle'
  | 'top-start'
  | 'top-end'
  | 'top-left'
  | 'top-right'
  | 'top-center'
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom-left'
  | 'bottom-right'
  | 'bottom-center';

export type NxToastVariant =
  | 'default'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info';

export interface NxToastDismissDetail {
  role?: string;
}

@Component({
  tag: 'nx-toast',
  styleUrl: 'nx-toast.scss',
  shadow: true,
})
export class NxToast {
  @Element() el!: HTMLElement;

  private dismissTimer?: any;
  private timerStartTime = 0;
  private remainingTime = 0;
  private slotObserver?: MutationObserver;

  @State() isClosing = false;
  @State() isPaused = false;
  @State() hasIconSlot = false;
  @State() hasHeaderSlot = false;
  @State() hasActionSlot = false;

  /** Whether the toast is currently visible */
  @Prop({ mutable: true, reflect: true }) isOpen = false;

  /** Primary text message to display */
  @Prop() message?: string;

  /** Optional title or header text displayed above the message */
  @Prop() header?: string;

  /**
   * Duration in milliseconds before the toast automatically dismisses.
   * Set to 0 to disable auto-dismiss.
   */
  @Prop() duration = 3000;

  /** Position of the toast on screen */
  @Prop({ reflect: true }) position: NxToastPosition = 'bottom';

  /** Visual variant of the toast */
  @Prop({ reflect: true }) variant: NxToastVariant = 'default';

  /** Custom icon name to display (overrides default variant icon) */
  @Prop() icon?: string;

  /** Whether to show a leading icon */
  @Prop() showIcon = true;

  /** Whether to show a close (X) button */
  @Prop() dismissible = true;

  /** Text label for the action button */
  @Prop() actionText?: string;

  /** Whether hovering over the toast pauses the auto-dismiss timer */
  @Prop() pauseOnHover = true;

  /** Whether to display an animated countdown progress bar at the bottom */
  @Prop() showProgressBar = false;

  /** Whether the toast card has a translucent backdrop-blur effect */
  @Prop({ reflect: true }) translucent = false;

  /** Whether opening/closing animations are enabled */
  @Prop() animated = true;

  /** Emitted when the toast is presented */
  @Event({ bubbles: true, composed: true })
  nxPresent!: EventEmitter<void>;

  /** Emitted when the toast is dismissed */
  @Event({ bubbles: true, composed: true })
  nxDismiss!: EventEmitter<NxToastDismissDetail>;

  /** Emitted when the action button is clicked */
  @Event({ bubbles: true, composed: true })
  nxAction!: EventEmitter<void>;

  /** Emitted when the close button is clicked */
  @Event({ bubbles: true, composed: true })
  nxClose!: EventEmitter<void>;

  @Watch('isOpen')
  handleIsOpenChange(newVal: boolean, oldVal: boolean) {
    if (newVal && !oldVal) {
      this.presentToast();
    } else if (!newVal && oldVal) {
      this.dismissToast();
    }
  }

  connectedCallback() {
    this.checkSlots();
    if (typeof MutationObserver !== 'undefined') {
      this.slotObserver = new MutationObserver(() => this.checkSlots());
      this.slotObserver.observe(this.el, { childList: true });
    }
    if (this.isOpen) {
      this.presentToast();
    }
  }

  disconnectedCallback() {
    this.clearDismissTimer();
    this.slotObserver?.disconnect();
    this.slotObserver = undefined;
  }

  /** Shows the toast */
  @Method()
  async present(): Promise<void> {
    if (this.isOpen) return;
    this.isOpen = true;
  }

  /** Dismisses the toast */
  @Method()
  async dismiss(role?: string): Promise<void> {
    if (!this.isOpen && !this.isClosing) return;
    this.dismissToast(role);
  }

  private checkSlots = () => {
    this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasActionSlot = !!this.el.querySelector('[slot="action"]');
  };

  private presentToast() {
    this.isClosing = false;
    this.isPaused = false;
    this.startDismissTimer();
    this.nxPresent.emit();
  }

  private dismissToast(role?: string) {
    this.clearDismissTimer();
    if (this.isClosing) return;

    if (!this.animated) {
      this.isOpen = false;
      this.isClosing = false;
      this.emitDismissEvents(role);
      return;
    }

    this.isClosing = true;
    setTimeout(() => {
      this.isOpen = false;
      this.isClosing = false;
      this.emitDismissEvents(role);
    }, 200);
  }

  private emitDismissEvents(role?: string) {
    this.nxDismiss.emit({ role });
    if (role === 'action') {
      this.nxAction.emit();
    } else if (role === 'close') {
      this.nxClose.emit();
    }
  }

  private startDismissTimer() {
    this.clearDismissTimer();
    if (this.duration <= 0) return;

    this.remainingTime = this.duration;
    this.timerStartTime = Date.now();
    this.dismissTimer = setTimeout(() => {
      this.dismiss('timeout');
    }, this.remainingTime);
  }

  private clearDismissTimer() {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
  }

  private pauseTimer = () => {
    if (!this.pauseOnHover || this.duration <= 0 || !this.dismissTimer) return;
    this.clearDismissTimer();
    const elapsed = Date.now() - this.timerStartTime;
    this.remainingTime = Math.max(0, this.remainingTime - elapsed);
    this.isPaused = true;
  };

  private resumeTimer = () => {
    if (!this.pauseOnHover || this.duration <= 0 || this.remainingTime <= 0) return;
    this.timerStartTime = Date.now();
    this.isPaused = false;
    this.dismissTimer = setTimeout(() => {
      this.dismiss('timeout');
    }, this.remainingTime);
  };

  private onActionClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    this.dismiss('action');
  };

  private onCloseClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    this.dismiss('close');
  };

  private get isAlertVariant(): boolean {
    return this.variant === 'danger' || this.variant === 'error' || this.variant === 'warning';
  }

  private get shouldShowIcon(): boolean {
    if (!this.showIcon) return false;
    if (this.hasIconSlot || this.icon) return true;
    return (
      this.variant === 'success' ||
      this.variant === 'info' ||
      this.variant === 'warning' ||
      this.variant === 'danger' ||
      this.variant === 'error'
    );
  }

  private get normalizedPosition(): string {
    const pos = (this.position || 'bottom').toLowerCase().trim();
    switch (pos) {
      case 'top-left':
        return 'top-start';
      case 'top-right':
        return 'top-end';
      case 'top':
        return 'top-center';
      case 'bottom-left':
        return 'bottom-start';
      case 'bottom-right':
        return 'bottom-end';
      case 'bottom':
        return 'bottom-center';
      case 'center':
        return 'middle';
      default:
        return pos;
    }
  }

  private renderDefaultIcon() {
    if (this.icon) {
      return <nx-icon name={this.icon} size="20px"></nx-icon>;
    }

    switch (this.variant) {
      case 'success':
        return (
          <svg
            class="toast-default-svg toast-svg-success"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        );
      case 'warning':
        return (
          <svg
            class="toast-default-svg toast-svg-warning"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      case 'danger':
      case 'error':
        return (
          <svg
            class="toast-default-svg toast-svg-danger"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        );
      case 'info':
        return (
          <svg
            class="toast-default-svg toast-svg-info"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case 'primary':
        return (
          <svg
            class="toast-default-svg toast-svg-primary"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
          </svg>
        );
      default:
        return (
          <svg
            class="toast-default-svg toast-svg-default"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
    }
  }

  render() {
    if (!this.isOpen && !this.isClosing) {
      return null;
    }

    const pos = this.normalizedPosition;
    const hasHeader = !!(this.hasHeaderSlot || this.header);

    return (
      <Host
        class={{
          'is-open': this.isOpen && !this.isClosing,
          'is-closing': this.isClosing,
          'is-paused': this.isPaused,
          [`position-${pos}`]: true,
          [`variant-${this.variant}`]: true,
          'has-icon': this.shouldShowIcon,
          'has-header': hasHeader,
          'is-translucent': this.translucent,
        }}
        aria-hidden={!this.isOpen ? 'true' : 'false'}
      >
        <div
          class="toast-container"
          part="container"
          onMouseEnter={this.pauseTimer}
          onMouseLeave={this.resumeTimer}
        >
          <div
            class="toast-card"
            part="card"
            role={this.isAlertVariant ? 'alert' : 'status'}
            aria-live={this.isAlertVariant ? 'assertive' : 'polite'}
            aria-atomic="true"
          >
            {this.shouldShowIcon && (
              <div class="toast-icon-wrapper" part="icon">
                {this.hasIconSlot ? (
                  <slot name="icon" onSlotchange={this.checkSlots}></slot>
                ) : (
                  this.renderDefaultIcon()
                )}
              </div>
            )}

            <div class="toast-content" part="content">
              {(this.hasHeaderSlot || this.header) && (
                <div class="toast-header" part="header">
                  {this.hasHeaderSlot ? (
                    <slot name="header" onSlotchange={this.checkSlots}></slot>
                  ) : (
                    this.header
                  )}
                </div>
              )}

              <div class="toast-message" part="message">
                {this.message ? this.message : <slot onSlotchange={this.checkSlots}></slot>}
              </div>
            </div>

            {(this.hasActionSlot || this.actionText) && (
              <div class="toast-action" part="action">
                {this.hasActionSlot ? (
                  <slot name="action" onSlotchange={this.checkSlots}></slot>
                ) : (
                  <button
                    type="button"
                    class="toast-action-btn"
                    onClick={this.onActionClick}
                  >
                    {this.actionText}
                  </button>
                )}
              </div>
            )}

            {this.dismissible && (
              <button
                type="button"
                class="toast-close-btn"
                part="close-button"
                aria-label="Close"
                onClick={this.onCloseClick}
              >
                <svg
                  class="toast-close-svg"
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}

            {this.showProgressBar && this.duration > 0 && (
              <div class="toast-progress-bar-container" part="progress-container">
                <div
                  class="toast-progress-bar"
                  part="progress-bar"
                  style={{
                    animationDuration: `${this.duration}ms`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

