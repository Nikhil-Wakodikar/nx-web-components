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

  /** Name of the leading icon (e.g. 'circle-help', 'settings', 'user-round-key') */
  @Prop() icon?: string;

  /** Custom icon for the expand toggle (defaults to chevron) */
  @Prop() toggleIcon?: string;

  /** Optional alternate icon shown when expanded (e.g. 'minus' vs 'plus') */
  @Prop() collapseIcon?: string;

  @Prop({ reflect: true, mutable: true }) open = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) variant: NxAccordionVariant = 'bordered';

  @Prop({ reflect: true }) expandIconPosition: NxAccordionExpandIconPosition = 'end';

  @Prop() hideToggleIcon = false;

  /** Optional custom padding for the accordion content when open (defaults to 12px) */
  @Prop() contentPadding?: string;

  @State() hasHeaderSlot = false;
  @State() hasContentSlot = false;
  @State() hasIconSlot = false;
  @State() hasEndSlot = false;
  @State() hasToggleIconSlot = false;

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
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasContentSlot = !!this.el.querySelector('[slot="content"]');
    this.hasIconSlot = !!this.el.querySelector('[slot="icon"]') || !!this.el.querySelector('[slot="start"]');
    this.hasEndSlot = !!this.el.querySelector('[slot="end"]');
    this.hasToggleIconSlot = !!this.el.querySelector('[slot="toggle-icon"]');
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

  private get hasLeadingIcon(): boolean {
    return this.hasIconSlot || !!this.icon;
  }

  private renderLeadingIcon() {
    if (!this.hasLeadingIcon) return null;

    return (
      <span class="accordion-icon" part="icon" aria-hidden="true">
        <slot name="icon">
          <slot name="start" onSlotchange={this.checkSlots}>
            {this.icon && <nx-icon name={this.icon} size="20px"></nx-icon>}
          </slot>
        </slot>
      </span>
    );
  }

  private renderToggleIcon() {
    if (this.hideToggleIcon) return null;

    if (this.hasToggleIconSlot) {
      return (
        <span class="accordion-toggle-icon" part="toggle-icon" aria-hidden="true">
          <slot name="toggle-icon" onSlotchange={this.checkSlots}></slot>
        </span>
      );
    }

    if (this.open && this.collapseIcon) {
      return (
        <span class="accordion-toggle-icon has-collapse-icon" part="toggle-icon" aria-hidden="true">
          <nx-icon name={this.collapseIcon} size="20px"></nx-icon>
        </span>
      );
    }

    if (this.toggleIcon) {
      return (
        <span class="accordion-toggle-icon is-custom-toggle" part="toggle-icon" aria-hidden="true">
          <nx-icon name={this.toggleIcon} size="20px"></nx-icon>
        </span>
      );
    }

    return (
      <span class="accordion-toggle-icon" part="toggle-icon" aria-hidden="true">
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
      <div class="accordion-header-content" part="header">
        <slot name="header" onSlotchange={this.checkSlots}>
          {this.header}
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
          'has-leading-icon': this.hasLeadingIcon,
        }}
        style={this.contentPadding ? { '--content-padding': this.contentPadding } : undefined}
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

          {this.renderLeadingIcon()}

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
            <slot name="content" onSlotchange={this.checkSlots}></slot>
            {!this.hasContentSlot && <slot></slot>}
          </div>
        </div>
      </Host>
    );
  }
}
