import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

export type NxModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface NxModalDismissDetail {
  role?: string;
}

let modalIds = 0;

@Component({
  tag: 'nx-modal',
  styleUrl: 'nx-modal.scss',
  shadow: true,
})
export class NxModal {
  @Element() el!: HTMLElement;

  private readonly modalId = `nx-modal-${modalIds++}`;
  private readonly titleId = `${this.modalId}-title`;
  private readonly subtitleId = `${this.modalId}-subtitle`;
  private previouslyFocusedElement?: HTMLElement | null;
  private slotObserver?: MutationObserver;
  private staticAnimationTimer?: any;

  @State() isClosing = false;
  @State() isStaticAnimating = false;
  @State() hasHeaderSlot = false;
  @State() hasFooterSlot = false;

  /** Whether the modal is currently open */
  @Prop({ mutable: true, reflect: true }) isOpen = false;

  /** Title text displayed in the modal header */
  @Prop() header?: string;

  /** Optional subtitle or description text below the title */
  @Prop() subHeader?: string;

  /** Size of the modal dialog */
  @Prop({ reflect: true }) size: NxModalSize = 'md';

  /**
   * Backdrop behavior:
   * - true: Clicking backdrop dismisses the modal
   * - false / 'static': Clicking backdrop does not dismiss and triggers a subtle pulse animation
   */
  @Prop() backdrop: 'static' | boolean = true;

  /** Whether pressing the Escape key dismisses the modal */
  @Prop() keyboard = true;

  /** Whether to display the close (X) button in the header */
  @Prop() dismissible = true;

  /** Whether to vertically center the modal in the viewport */
  @Prop({ reflect: true }) centered = true;

  /** Whether the modal body should scroll internally when content exceeds viewport */
  @Prop({ reflect: true }) scrollable = false;

  /** Whether entrance and exit animations are enabled */
  @Prop() animated = true;

  /** Base z-index for the modal and backdrop */
  @Prop() zIndex = 1050;

  /** Emitted when the modal has opened and is presented */
  @Event({ bubbles: true, composed: true })
  nxPresent!: EventEmitter<void>;

  /** Emitted when the modal has closed */
  @Event({ bubbles: true, composed: true })
  nxDismiss!: EventEmitter<NxModalDismissDetail>;

  /** Emitted specifically when the close button is clicked */
  @Event({ bubbles: true, composed: true })
  nxClose!: EventEmitter<void>;

  @Watch('isOpen')
  handleIsOpenChange(newVal: boolean, oldVal: boolean) {
    if (newVal && !oldVal) {
      this.presentModal();
    } else if (!newVal && oldVal) {
      this.dismissModal();
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.isOpen && !this.isClosing && this.keyboard && ev.key === 'Escape') {
      ev.preventDefault();
      this.dismiss('escape');
    }
  }

  connectedCallback() {
    this.checkSlots();
    if (typeof MutationObserver !== 'undefined') {
      this.slotObserver = new MutationObserver(() => this.checkSlots());
      this.slotObserver.observe(this.el, { childList: true });
    }
    if (this.isOpen) {
      this.presentModal();
    }
  }

  disconnectedCallback() {
    this.slotObserver?.disconnect();
    this.slotObserver = undefined;
    clearTimeout(this.staticAnimationTimer);
    this.restoreBodyScroll();
  }

  /** Opens the modal programmatically */
  @Method()
  async present(): Promise<void> {
    if (this.isOpen) return;
    this.isOpen = true;
  }

  /** Dismisses the modal programmatically */
  @Method()
  async dismiss(role?: string): Promise<void> {
    if (!this.isOpen && !this.isClosing) return;
    this.dismissModal(role);
  }

  private checkSlots = () => {
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
  };

  private presentModal() {
    this.isClosing = false;
    this.isStaticAnimating = false;
    this.previouslyFocusedElement = document.activeElement as HTMLElement;

    this.lockBodyScroll();
    this.nxPresent.emit();

    requestAnimationFrame(() => {
      const dialog = this.el.shadowRoot?.querySelector('.modal-dialog') as HTMLElement;
      dialog?.focus();
    });
  }

  private dismissModal(role?: string) {
    if (this.isClosing) return;

    if (!this.animated) {
      this.isOpen = false;
      this.isClosing = false;
      this.restoreBodyScroll();
      this.emitDismissEvents(role);
      return;
    }

    this.isClosing = true;
    setTimeout(() => {
      this.isOpen = false;
      this.isClosing = false;
      this.restoreBodyScroll();
      this.emitDismissEvents(role);
    }, 200);
  }

  private emitDismissEvents(role?: string) {
    this.nxDismiss.emit({ role });
    if (role === 'close') {
      this.nxClose.emit();
    }
    if (this.previouslyFocusedElement && typeof this.previouslyFocusedElement.focus === 'function') {
      this.previouslyFocusedElement.focus();
      this.previouslyFocusedElement = null;
    }
  }

  private lockBodyScroll() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  private restoreBodyScroll() {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  private onBackdropClick = (ev: MouseEvent) => {
    if (ev.target === ev.currentTarget) {
      if (this.backdrop === false || this.backdrop === 'static') {
        this.triggerStaticAnimation();
      } else {
        this.dismiss('backdrop');
      }
    }
  };

  private triggerStaticAnimation() {
    clearTimeout(this.staticAnimationTimer);
    this.isStaticAnimating = true;
    this.staticAnimationTimer = setTimeout(() => {
      this.isStaticAnimating = false;
    }, 300);
  }

  private onCloseClick = (ev: MouseEvent) => {
    ev.stopPropagation();
    this.dismiss('close');
  };

  render() {
    if (!this.isOpen && !this.isClosing) {
      return null;
    }

    const hasHeader = !!(this.hasHeaderSlot || this.header);

    return (
      <Host
        class={{
          'is-open': this.isOpen && !this.isClosing,
          'is-closing': this.isClosing,
          [`size-${this.size}`]: true,
          'is-centered': this.centered,
          'is-scrollable': this.scrollable,
        }}
        style={{
          '--nx-modal-z-index': `${this.zIndex}`,
        }}
        role="dialog"
        aria-modal="true"
        aria-hidden={!this.isOpen ? 'true' : 'false'}
        aria-labelledby={this.header ? this.titleId : undefined}
        aria-describedby={this.subHeader ? this.subtitleId : undefined}
      >
        <div
          class="modal-backdrop"
          part="backdrop"
          onClick={this.onBackdropClick}
        >
          <div
            class={{
              'modal-dialog': true,
              'is-static-animating': this.isStaticAnimating,
            }}
            part="dialog"
            tabIndex={-1}
          >
            {/* Modal Header */}
            {(hasHeader || this.dismissible) && (
              <div class="modal-header" part="header">
                <div class="modal-title-group">
                  {this.hasHeaderSlot ? (
                    <slot name="header" onSlotchange={this.checkSlots}></slot>
                  ) : (
                    [
                      this.header && (
                        <h2 class="modal-title" id={this.titleId} part="title">
                          {this.header}
                        </h2>
                      ),
                      this.subHeader && (
                        <p class="modal-subtitle" id={this.subtitleId} part="subtitle">
                          {this.subHeader}
                        </p>
                      ),
                    ]
                  )}
                </div>

                {this.dismissible && (
                  <button
                    type="button"
                    class="modal-close-btn"
                    part="close-button"
                    aria-label="Close modal"
                    onClick={this.onCloseClick}
                  >
                    <svg
                      class="modal-close-svg"
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
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
              </div>
            )}

            {/* Modal Body */}
            <div class="modal-body" part="body">
              <slot onSlotchange={this.checkSlots}></slot>
            </div>

            {/* Modal Footer */}
            {this.hasFooterSlot && (
              <div class="modal-footer" part="footer">
                <slot name="footer" onSlotchange={this.checkSlots}></slot>
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}

