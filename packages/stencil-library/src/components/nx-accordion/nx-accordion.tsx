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

export type NxAccordionVariant = 'bordered' | 'borderless' | 'accent';
export type NxAccordionExpandIconPosition = 'start' | 'end';

export interface NxAccordionToggleEventDetail {
  value: string;
  open: boolean;
}

export interface AccordionGroupElement extends HTMLElement {
  requestToggle: (accordion: any, targetOpen: boolean) => Promise<void>;
}

let accordionIds = 0;

@Component({
  tag: 'nx-accordion',
  styleUrl: 'nx-accordion.scss',
  shadow: true,
})
export class NxAccordion {
  @Element() el!: HTMLElement;

  private accordionId = `nx-accordion-${accordionIds++}`;
  private headerId = `${this.accordionId}-header`;
  private contentId = `${this.accordionId}-content`;
  private parentGroup?: AccordionGroupElement;

  @Prop({ mutable: true }) value: string = this.accordionId;

  @Prop() header?: string;

  @Prop() subHeader?: string;

  @Prop({ reflect: true, mutable: true }) open = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) variant: NxAccordionVariant = 'bordered';

  @Prop({ reflect: true }) expandIconPosition: NxAccordionExpandIconPosition = 'end';

  @Prop() hideToggleIcon = false;

  @State() hasStartSlot = false;
  @State() hasEndSlot = false;
  @State() hasHeaderSlot = false;

  @Event({ bubbles: true, composed: true })
  nxToggle!: EventEmitter<NxAccordionToggleEventDetail>;

  @Watch('open')
  openChanged(isOpen: boolean) {
    this.nxToggle.emit({ value: this.value, open: isOpen });
  }

  connectedCallback() {
    this.parentGroup = this.el.closest('nx-accordion-group') || undefined;
    if (!this.value) {
      this.value = this.accordionId;
    }
    this.checkSlots();
  }

  private checkSlots = () => {
    this.hasStartSlot = !!this.el.querySelector('[slot="start"]');
    this.hasEndSlot = !!this.el.querySelector('[slot="end"]');
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
  };

  @Method()
  async expand() {
    if (this.disabled || this.open) return;
    if (this.parentGroup) {
      await this.parentGroup.requestToggle(this.el, true);
    } else {
      this.open = true;
    }
  }

  @Method()
  async collapse() {
    if (this.disabled || !this.open) return;
    if (this.parentGroup) {
      await this.parentGroup.requestToggle(this.el, false);
    } else {
      this.open = false;
    }
  }

  @Method()
  async toggle() {
    if (this.open) {
      await this.collapse();
    } else {
      await this.expand();
    }
  }

  private onHeaderClick = (ev: MouseEvent) => {
    if (this.disabled) return;
    ev.preventDefault();

    const targetOpen = !this.open;
    if (this.parentGroup) {
      this.parentGroup.requestToggle(this.el, targetOpen);
    } else {
      this.open = targetOpen;
    }
  };

  private onHeaderKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return;
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.onHeaderClick(ev as unknown as MouseEvent);
    }
  };

  private renderToggleIcon() {
    if (this.hideToggleIcon) return null;

    return (
      <span class="accordion-icon" aria-hidden="true" part="icon">
        <svg
          class="chevron-svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    );
  }

  private renderHeaderContent() {
    return (
      <div class="header-text-container" part="header-content">
        <slot name="header" onSlotchange={this.checkSlots}>
          {this.header && <span class="header-title" part="title">{this.header}</span>}
          {this.subHeader && <span class="header-subtitle" part="subtitle">{this.subHeader}</span>}
        </slot>
      </div>
    );
  }

  render() {
    return (
      <Host
        id={this.accordionId}
        class={{
          [`accordion-${this.variant}`]: true,
          'is-open': this.open,
          'is-disabled': this.disabled,
          [`icon-${this.expandIconPosition}`]: true,
        }}
      >
        <button
          type="button"
          id={this.headerId}
          class="accordion-header-btn"
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls={this.contentId}
          disabled={this.disabled}
          onClick={this.onHeaderClick}
          onKeyDown={this.onHeaderKeyDown}
          part="header-button"
        >
          {this.expandIconPosition === 'start' && this.renderToggleIcon()}

          <span class="slot-start" part="start" hidden={!this.hasStartSlot}>
            <slot name="start" onSlotchange={this.checkSlots}></slot>
          </span>

          {this.renderHeaderContent()}

          <span class="slot-end" part="end" hidden={!this.hasEndSlot}>
            <slot name="end" onSlotchange={this.checkSlots}></slot>
          </span>

          {this.expandIconPosition === 'end' && this.renderToggleIcon()}
        </button>

        <div
          id={this.contentId}
          class="accordion-collapse"
          role="region"
          aria-labelledby={this.headerId}
          part="collapse"
        >
          <div class="accordion-body" part="body">
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}

