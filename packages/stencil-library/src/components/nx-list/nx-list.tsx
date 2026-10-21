import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import {
  NxListItemClickEventDetail,
  NxListItemLines,
} from '../nx-list-item/nx-list-item';

export type NxListLines = NxListItemLines;

export interface NxListItemElement extends HTMLElement {
  lines?: NxListItemLines;
  clickable?: boolean;
  disabled?: boolean;
  selected?: boolean;
  value?: string;
  dataset: DOMStringMap;
}

export interface NxListChangeEventDetail {
  value?: string;
  selected: boolean;
  item?: NxListItemElement;
  event?: MouseEvent | KeyboardEvent;
}

let listIds = 0;

@Component({
  tag: 'nx-list',
  styleUrl: 'nx-list.scss',
  shadow: true,
})
export class NxList {
  @Element() el!: HTMLElement;

  private listId = `nx-list-${listIds++}`;

  /** Divider line style for items in this list: 'full', 'inset', or 'none' */
  @Prop({ reflect: true }) lines: NxListLines = 'full';

  /** When true, child items in this list become clickable (hover/focus/active) unless overridden on item */
  @Prop({ reflect: true }) clickable = false;

  /** When true, list and its items become disabled */
  @Prop({ reflect: true }) disabled = false;

  /** Currently selected item value */
  @Prop({ reflect: true, mutable: true }) value?: string;

  /** Emitted when the selected item value changes */
  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<NxListChangeEventDetail>;

  @Watch('lines')
  linesChanged() {
    this.syncChildItems();
  }

  @Watch('clickable')
  clickableChanged() {
    this.syncChildItems();
  }

  @Watch('disabled')
  disabledChanged() {
    this.syncChildItems();
  }

  @Watch('value')
  valueChanged() {
    this.syncChildItems();
  }

  connectedCallback() {
    this.syncChildItems();
  }

  componentDidLoad() {
    this.syncChildItems();
  }

  private getChildItems(): NxListItemElement[] {
    return Array.from(this.el.querySelectorAll('nx-list-item'));
  }

  private syncChildItems = () => {
    const items = this.getChildItems();
    items.forEach((item) => {
      // Sync lines
      if (!item.hasAttribute('lines') || item.dataset.inheritedLines === 'true') {
        item.lines = this.lines;
        item.dataset.inheritedLines = 'true';
      }

      // Sync clickable
      if (!item.hasAttribute('clickable') || item.dataset.inheritedClickable === 'true') {
        if (this.clickable) {
          item.clickable = true;
          item.dataset.inheritedClickable = 'true';
        } else if (item.dataset.inheritedClickable === 'true') {
          item.clickable = false;
          delete item.dataset.inheritedClickable;
        }
      }

      // Sync disabled
      if (!item.hasAttribute('disabled') || item.dataset.inheritedDisabled === 'true') {
        if (this.disabled) {
          item.disabled = true;
          item.dataset.inheritedDisabled = 'true';
        } else if (item.dataset.inheritedDisabled === 'true') {
          item.disabled = false;
          delete item.dataset.inheritedDisabled;
        }
      }

      // Sync selected with value
      if (this.value !== undefined && item.value !== undefined) {
        item.selected = item.value === this.value;
      }
    });
  };

  @Listen('nxClick')
  handleItemClick(ev: CustomEvent<NxListItemClickEventDetail>) {
    if (this.disabled) return;

    const item = ev.target as unknown as NxListItemElement;
    const detail = ev.detail;

    if (detail && detail.value !== undefined) {
      this.value = detail.value;
      this.syncChildItems();

      this.nxChange.emit({
        value: this.value,
        selected: true,
        item,
        event: detail.event,
      });
    }
  }

  render() {
    return (
      <Host
        id={this.listId}
        class={{
          [`lines-${this.lines}`]: true,
          'is-clickable': this.clickable,
          'is-disabled': this.disabled,
        }}
      >
        <div class="nx-list-container" role="list" part="container">
          <slot onSlotchange={this.syncChildItems}></slot>
        </div>
      </Host>
    );
  }
}
