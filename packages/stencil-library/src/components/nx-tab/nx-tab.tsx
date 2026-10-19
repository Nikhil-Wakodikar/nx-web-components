import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  Watch,
  h,
} from '@stencil/core';

let tabIds = 0;

export interface TabGroupElement extends HTMLElement {
  registerTab?: (tab: any) => Promise<void>;
  unregisterTab?: (tab: any) => Promise<void>;
  selectTab?: (value: string) => Promise<void>;
  handleTabClose?: (e: MouseEvent, value: string) => void;
}

@Component({
  tag: 'nx-tab',
  styleUrl: 'nx-tab.scss',
  shadow: true,
})
export class NxTab {
  @Element() el!: HTMLElement;

  private readonly tabId = `nx-tab-${tabIds++}`;
  private parentGroup?: TabGroupElement;

  /**
   * Unique identifier or value for this tab.
   * If omitted, a unique ID is automatically generated.
   */
  @Prop({ mutable: true }) value: string = this.tabId;

  /** Header title text displayed on the tab button */
  @Prop() label?: string;

  /** Optional icon name displayed before the label (e.g. 'settings', 'user-round-key') */
  @Prop() icon?: string;

  /** Optional badge count or text indicator (e.g. '3', 'New') */
  @Prop() badge?: string | number;

  /** Whether this tab is disabled */
  @Prop({ reflect: true }) disabled = false;

  /** Whether this tab can be closed/dismissed with a close button */
  @Prop({ reflect: true }) closable = false;

  /** Whether this tab is currently selected and active */
  @Prop({ mutable: true, reflect: true }) active = false;

  /** Emitted when the tab's close button is clicked */
  @Event({ bubbles: true, composed: true })
  nxClose!: EventEmitter<string>;

  @Watch('value')
  @Watch('label')
  @Watch('icon')
  @Watch('badge')
  @Watch('disabled')
  @Watch('closable')
  propChanged() {
    if (this.parentGroup && typeof this.parentGroup.registerTab === 'function') {
      this.parentGroup.registerTab(this);
    }
  }

  connectedCallback() {
    this.parentGroup = this.el.closest('nx-tab-group') || undefined;
    const attrVal = this.el.getAttribute('value');
    if (attrVal) {
      this.value = attrVal;
    } else if (!this.value) {
      this.value = this.tabId;
    }

    if (this.el.hasAttribute('active')) {
      this.active = true;
    }

    if (this.parentGroup && typeof this.parentGroup.registerTab === 'function') {
      this.parentGroup.registerTab(this);
    }
  }

  disconnectedCallback() {
    if (this.parentGroup && typeof this.parentGroup.unregisterTab === 'function') {
      this.parentGroup.unregisterTab(this);
    }
    this.parentGroup = undefined;
  }

  /** Selects this tab in the parent tab group */
  @Method()
  async select(): Promise<void> {
    if (this.disabled) return;
    if (this.parentGroup && typeof this.parentGroup.selectTab === 'function') {
      await this.parentGroup.selectTab(this.value);
    } else {
      this.active = true;
    }
  }

  /** Closes this tab */
  @Method()
  async close(): Promise<void> {
    this.nxClose.emit(this.value);
  }

  render() {
    return (
      <Host
        class={{
          'is-active': this.active,
          'is-disabled': this.disabled,
        }}
        role="tabpanel"
        id={`nx-tab-panel-${this.value}`}
        aria-labelledby={`nx-tab-header-${this.value}`}
        aria-hidden={!this.active ? 'true' : 'false'}
        tabindex={this.active ? 0 : -1}
      >
        <div class="tab-panel-content" part="panel">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
