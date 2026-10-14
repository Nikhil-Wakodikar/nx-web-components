import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';

export type NxCardVariant = 'elevated' | 'outlined' | 'flat';
export type NxCardPadding = 'none' | 'small' | 'medium' | 'large';

@Component({
  tag: 'nx-card',
  styleUrl: 'nx-card.scss',
  shadow: true,
})
export class NxCard {
  @Element() el!: HTMLElement;

  @Prop({ reflect: true }) variant: NxCardVariant = 'elevated';
  @Prop({ reflect: true }) padding: NxCardPadding = 'medium';
  @Prop({ reflect: true }) hoverable = false;
  @Prop({ reflect: true }) disabled = false;

  @Prop() headerTitle?: string;
  @Prop() subtitle?: string;
  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;

  @State() hasMediaSlot = false;
  @State() hasHeaderSlot = false;
  @State() hasFooterSlot = false;

  @Event({ bubbles: true, composed: true }) nxClick!: EventEmitter<MouseEvent>;

  connectedCallback() {
    this.checkSlots();
  }

  private checkSlots = () => {
    this.hasMediaSlot = !!this.el.querySelector('[slot="media"]');
    this.hasHeaderSlot = !!this.el.querySelector('[slot="header"]');
    this.hasFooterSlot = !!this.el.querySelector('[slot="footer"]');
  };

  private get hasHeaderContent(): boolean {
    return this.hasHeaderSlot || !!this.headerTitle || !!this.subtitle;
  }

  private get isInteractive(): boolean {
    return (this.hoverable || !!this.href) && !this.disabled;
  }

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }
    this.nxClick.emit(ev);
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return;
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      if (this.href) {
        const link = this.el.shadowRoot?.querySelector<HTMLAnchorElement>('a.card-inner');
        link?.click();
      } else {
        this.el.click();
      }
    }
  };

  private renderHeader() {
    if (!this.hasHeaderContent) return null;

    return (
      <div class="card-header" part="header">
        <slot name="header" onSlotchange={this.checkSlots}>
          {this.headerTitle && <h3 class="card-title" part="title">{this.headerTitle}</h3>}
          {this.subtitle && <p class="card-subtitle" part="subtitle">{this.subtitle}</p>}
        </slot>
      </div>
    );
  }

  render() {
    const isLink = !!this.href && !this.disabled;

    const content = (
      <div class="card-content-wrapper">
        <div class="card-media" part="media" hidden={!this.hasMediaSlot}>
          <slot name="media" onSlotchange={this.checkSlots}></slot>
        </div>

        {this.renderHeader()}

        <div class="card-body" part="body">
          <slot></slot>
        </div>

        <div class="card-footer" part="footer" hidden={!this.hasFooterSlot}>
          <slot name="footer" onSlotchange={this.checkSlots}></slot>
        </div>
      </div>
    );

    return (
      <Host
        class={{
          [`card-${this.variant}`]: true,
          [`padding-${this.padding}`]: true,
          'is-hoverable': this.hoverable,
          'is-interactive': this.isInteractive,
          'is-disabled': this.disabled,
          'has-media': this.hasMediaSlot,
        }}
        onClick={this.handleClick}
        onKeyDown={this.isInteractive && !isLink ? this.handleKeyDown : undefined}
        tabindex={this.isInteractive && !isLink ? 0 : undefined}
        role={this.isInteractive && !isLink ? 'button' : undefined}
        aria-disabled={this.disabled ? 'true' : undefined}
      >
        {isLink ? (
          <a
            class="card-inner card-link"
            href={this.href}
            target={this.target}
            rel={this.rel}
            tabindex={0}
          >
            {content}
          </a>
        ) : (
          <div class="card-inner">
            {content}
          </div>
        )}
      </Host>
    );
  }
}

