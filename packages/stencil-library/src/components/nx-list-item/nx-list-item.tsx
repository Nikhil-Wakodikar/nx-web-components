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

export type NxListItemLines = 'full' | 'inset' | 'none';

export interface NxListItemClickEventDetail {
  value?: string;
  selected: boolean;
  event: MouseEvent | KeyboardEvent;
}

let listItemIds = 0;

@Component({
  tag: 'nx-list-item',
  styleUrl: 'nx-list-item.scss',
  shadow: true,
})
export class NxListItem {
  @Element() el!: HTMLElement;

  private itemId = `nx-list-item-${listItemIds++}`;

  @State() private hasStartSlot = false;
  @State() private hasEndSlot = false;

  /** Unique value identifier */
  @Prop() value?: string;

  /** When true, item has hover, active, and focus states */
  @Prop({ reflect: true }) clickable = false;

  /** Whether this item is currently selected */
  @Prop({ reflect: true, mutable: true }) selected = false;

  /** Disabled state */
  @Prop({ reflect: true }) disabled = false;

  /** Divider line style below this item: 'full', 'inset', or 'none' */
  @Prop({ reflect: true }) lines: NxListItemLines = 'full';

  /** Link URL (renders semantic <a> tag) */
  @Prop() href?: string;

  /** Link target (e.g. '_blank') */
  @Prop() target?: string;

  /** Link rel */
  @Prop() rel?: string;

  /** Link download attribute */
  @Prop() download?: string;

  /** Emitted when the item is clicked */
  @Event({ bubbles: true, composed: true }) nxClick!: EventEmitter<NxListItemClickEventDetail>;

  connectedCallback() {
    this.checkSlots();
  }

  componentDidLoad() {
    this.checkSlots();
  }

  private checkSlots = () => {
    this.hasStartSlot = !!this.el.querySelector('[slot="start"]');
    this.hasEndSlot = !!this.el.querySelector('[slot="end"]');
  };

  private handleClick = (ev: MouseEvent | KeyboardEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    this.nxClick.emit({
      value: this.value,
      selected: this.selected,
      event: ev,
    });
  };

  private handleKeyDown = (ev: KeyboardEvent) => {
    if (this.disabled) return;
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.handleClick(ev);
    }
  };

  render() {
    const isInteractive = (this.clickable || !!this.href) && !this.disabled;

    const content = [
      <div
        class={{ 'item-start': true, 'is-hidden': !this.hasStartSlot }}
        part="start"
      >
        <slot name="start" onSlotchange={this.checkSlots}></slot>
      </div>,

      <div class="item-content" part="content">
        <slot></slot>
      </div>,

      <div
        class={{ 'item-end': true, 'is-hidden': !this.hasEndSlot }}
        part="end"
      >
        <slot name="end" onSlotchange={this.checkSlots}></slot>
      </div>,
    ];

    return (
      <Host
        id={this.itemId}
        class={{
          [`lines-${this.lines}`]: !!this.lines,
          'is-clickable': isInteractive,
          'is-selected': this.selected,
          'is-disabled': this.disabled,
          'has-start': this.hasStartSlot,
          'has-end': this.hasEndSlot,
        }}
      >
        {this.href && !this.disabled ? (
          <a
            class="list-item-inner"
            href={this.href}
            target={this.target}
            rel={this.rel}
            download={this.download}
            onClick={this.handleClick}
            part="inner"
          >
            {content}
          </a>
        ) : (
          <div
            class="list-item-inner"
            role={isInteractive ? 'button' : 'listitem'}
            tabindex={isInteractive ? 0 : undefined}
            aria-disabled={this.disabled ? 'true' : undefined}
            aria-selected={this.selected ? 'true' : undefined}
            onClick={isInteractive ? this.handleClick : undefined}
            onKeyDown={isInteractive ? this.handleKeyDown : undefined}
            part="inner"
          >
            {content}
          </div>
        )}
      </Host>
    );
  }
}
