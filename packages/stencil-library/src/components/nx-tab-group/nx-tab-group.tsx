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

export type NxTabGroupPlacement = 'top' | 'bottom' | 'start' | 'end';
export type NxTabGroupSize = 'sm' | 'md' | 'lg';
export type NxTabGroupColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'dark'
  | string;

export interface NxTabChangeEventDetail {
  value: string;
  previousValue?: string;
  index: number;
}

export interface NxTabElement extends HTMLElement {
  value: string;
  label?: string;
  icon?: string;
  badge?: string | number;
  disabled: boolean;
  closable: boolean;
  active: boolean;
  select: () => Promise<void>;
  close: () => Promise<void>;
}

interface TabItemData {
  value: string;
  label?: string;
  icon?: string;
  badge?: string | number;
  disabled: boolean;
  closable: boolean;
  hasLabelSlot: boolean;
  labelHtml?: string;
}

const COLOR_TOKENS: Record<string, string> = {
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  info: 'var(--nx-color-info, #2563eb)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

@Component({
  tag: 'nx-tab-group',
  styleUrl: 'nx-tab-group.scss',
  shadow: true,
})
export class NxTabGroup {
  @Element() el!: HTMLElement;

  private tabListEl?: HTMLElement;
  private indicatorEl?: HTMLElement;
  private syncTimeout?: any;
  private resizeObserver?: ResizeObserver;

  @State() tabItems: TabItemData[] = [];
  @State() canScrollLeft = false;
  @State() canScrollRight = false;

  /** Value of the currently active/selected tab */
  @Prop({ mutable: true }) value?: string;

  /** Color theme for active indicator and hover states (e.g. 'primary', 'secondary', 'success', etc.) */
  @Prop({ reflect: true }) color: NxTabGroupColor = 'primary';

  /** Placement position of the tab navigation relative to panels */
  @Prop({ reflect: true }) placement: NxTabGroupPlacement = 'top';

  /** Sizing of the tab buttons */
  @Prop({ reflect: true }) size: NxTabGroupSize = 'md';

  /** Whether tab buttons should stretch to fill the container width evenly */
  @Prop({ reflect: true }) stretch = true;

  /** Whether the tab bar allows horizontal scrolling when tabs overflow */
  @Prop({ reflect: true }) scrollable = true;

  /** Whether all tabs in the group are disabled */
  @Prop({ reflect: true }) disabled = false;

  /** Emitted when the active tab changes */
  @Event({ bubbles: true, composed: true })
  nxChange!: EventEmitter<NxTabChangeEventDetail>;

  @Watch('value')
  valueChanged(newVal?: string, oldVal?: string) {
    this.updateActiveTabs();
    requestAnimationFrame(() => this.updateIndicator());
    if (newVal !== oldVal) {
      const index = this.tabItems.findIndex(t => t.value === newVal);
      this.nxChange.emit({
        value: newVal || '',
        previousValue: oldVal,
        index: index >= 0 ? index : 0,
      });
    }
  }

  @Watch('color')
  @Watch('disabled')
  @Watch('placement')
  @Watch('size')
  @Watch('stretch')
  propChanged() {
    requestAnimationFrame(() => this.updateIndicator());
  }

  connectedCallback() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateIndicator();
        this.checkScrollButtons();
      });
      this.resizeObserver.observe(this.el);
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    clearTimeout(this.syncTimeout);
  }

  componentWillLoad() {
    this.syncTabs();
  }

  componentDidLoad() {
    this.syncTabs();
  }

  componentDidUpdate() {
    this.updateIndicator();
    this.checkScrollButtons();
  }

  /** Returns all child nx-tab elements */
  @Method()
  async getTabs(): Promise<NxTabElement[]> {
    return Array.from(this.el.querySelectorAll('nx-tab')) as NxTabElement[];
  }

  /** Gets the value of the currently selected tab */
  @Method()
  async getSelectedTab(): Promise<string | undefined> {
    return this.value;
  }

  /** Programmatically selects a tab by its value */
  @Method()
  async selectTab(value: string): Promise<void> {
    if (this.disabled) return;
    const tabItem = this.tabItems.find(t => t.value === value);
    if (tabItem && tabItem.disabled) return;

    if (this.value !== value) {
      this.value = value;
    } else {
      this.updateActiveTabs();
      this.updateIndicator();
    }
  }

  /** Called by child nx-tab to register or update */
  @Method()
  async registerTab(_tab?: any): Promise<void> {
    this.queueSyncTabs();
  }

  /** Called by child nx-tab when removed */
  @Method()
  async unregisterTab(_tab?: any): Promise<void> {
    this.queueSyncTabs();
  }

  private queueSyncTabs() {
    clearTimeout(this.syncTimeout);
    this.syncTimeout = setTimeout(() => this.syncTabs(), 10);
  }

  private async syncTabs() {
    const tabs = await this.getTabs();
    if (!tabs.length) {
      this.tabItems = [];
      return;
    }

    const newItems: TabItemData[] = tabs.map((tab, idx) => {
      const val = tab.value || tab.getAttribute('value') || `nx-tab-${idx}`;
      if (!tab.value) {
        tab.value = val;
      }
      return {
        value: val,
        label: tab.label || tab.getAttribute('label') || undefined,
        icon: tab.icon || tab.getAttribute('icon') || undefined,
        badge: tab.badge !== undefined ? tab.badge : (tab.getAttribute('badge') || undefined),
        disabled: tab.disabled || tab.hasAttribute('disabled'),
        closable: tab.closable || tab.hasAttribute('closable'),
        hasLabelSlot: !!tab.querySelector('[slot="label"]'),
        labelHtml: tab.querySelector('[slot="label"]')?.innerHTML,
      };
    });

    const isDifferent =
      newItems.length !== this.tabItems.length ||
      newItems.some((item, i) => {
        const cur = this.tabItems[i];
        return (
          !cur ||
          cur.value !== item.value ||
          cur.label !== item.label ||
          cur.disabled !== item.disabled ||
          cur.closable !== item.closable
        );
      });

    if (isDifferent) {
      this.tabItems = newItems;
    }

    // If current value is not set or not in valid tabs, select first non-disabled tab
    const hasCurrent = newItems.some(t => t.value === this.value);
    if (!hasCurrent) {
      const firstActive = newItems.find(t => !t.disabled);
      this.value = firstActive ? firstActive.value : newItems[0]?.value;
    }

    this.updateActiveTabs();
    requestAnimationFrame(() => {
      this.updateIndicator();
      this.checkScrollButtons();
    });
  }

  private async updateActiveTabs() {
    const tabs = await this.getTabs();
    const activeIndex = this.tabItems.findIndex(t => t.value === this.value);
    const selectedIdx = activeIndex >= 0 ? activeIndex : 0;

    tabs.forEach((tab, i) => {
      const isActive = i === selectedIdx || (tab.value && tab.value === this.value);
      tab.active = isActive;
      if (isActive) {
        tab.setAttribute('active', '');
      } else {
        tab.removeAttribute('active');
      }
    });
  }

  private updateIndicator() {
    if (!this.tabListEl || !this.indicatorEl) return;
    const total = this.tabItems.length;
    if (total === 0) {
      this.indicatorEl.style.opacity = '0';
      return;
    }

    const selectedIndex = this.tabItems.findIndex(t => t.value === this.value);
    const activeIndex = selectedIndex >= 0 ? selectedIndex : 0;

    const isVertical = this.placement === 'start' || this.placement === 'end';
    const selectedBtn = this.tabListEl.querySelector(`.tab-item.is-selected`) as HTMLElement;

    if (isVertical) {
      if (selectedBtn && selectedBtn.offsetHeight > 0) {
        this.indicatorEl.style.top = `${selectedBtn.offsetTop}px`;
        this.indicatorEl.style.height = `${selectedBtn.offsetHeight}px`;
      } else {
        this.indicatorEl.style.top = `${(activeIndex / total) * 100}%`;
        this.indicatorEl.style.height = `${(1 / total) * 100}%`;
      }
      this.indicatorEl.style.left = '';
      this.indicatorEl.style.width = '';
      this.indicatorEl.style.opacity = '1';
    } else {
      if (selectedBtn && selectedBtn.offsetWidth > 0) {
        this.indicatorEl.style.left = `${selectedBtn.offsetLeft}px`;
        this.indicatorEl.style.width = `${selectedBtn.offsetWidth}px`;
      } else {
        this.indicatorEl.style.left = `${(activeIndex / total) * 100}%`;
        this.indicatorEl.style.width = `${(1 / total) * 100}%`;
      }
      this.indicatorEl.style.top = '';
      this.indicatorEl.style.height = '';
      this.indicatorEl.style.opacity = '1';
    }
  }

  private checkScrollButtons = () => {
    if (!this.tabListEl || !this.scrollable || this.placement === 'start' || this.placement === 'end') {
      if (this.canScrollLeft) this.canScrollLeft = false;
      if (this.canScrollRight) this.canScrollRight = false;
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = this.tabListEl;
    const canLeft = scrollLeft > 2;
    const canRight = scrollLeft + clientWidth < scrollWidth - 2;
    if (this.canScrollLeft !== canLeft) this.canScrollLeft = canLeft;
    if (this.canScrollRight !== canRight) this.canScrollRight = canRight;
  };

  private scrollLeft = () => {
    if (this.tabListEl) {
      this.tabListEl.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  private scrollRight = () => {
    if (this.tabListEl) {
      this.tabListEl.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  private handleTabItemKeyDown = (ev: KeyboardEvent, value: string) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      this.selectTab(value);
    }
  };

  private handleKeyNavigation = (ev: KeyboardEvent) => {
    const enabledTabs = this.tabItems.filter(t => !t.disabled && !this.disabled);
    if (!enabledTabs.length) return;

    const currentIndex = enabledTabs.findIndex(t => t.value === this.value);
    const isVertical = this.placement === 'start' || this.placement === 'end';
    const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft';
    const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight';

    let targetTab: TabItemData | undefined;

    if (ev.key === prevKey) {
      ev.preventDefault();
      const prevIdx = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
      targetTab = enabledTabs[prevIdx];
    } else if (ev.key === nextKey) {
      ev.preventDefault();
      const nextIdx = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
      targetTab = enabledTabs[nextIdx];
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      targetTab = enabledTabs[0];
    } else if (ev.key === 'End') {
      ev.preventDefault();
      targetTab = enabledTabs[enabledTabs.length - 1];
    }

    if (targetTab) {
      this.selectTab(targetTab.value);
      requestAnimationFrame(() => {
        const btn = this.tabListEl?.querySelector(`.tab-item[data-value="${targetTab?.value}"]`) as HTMLElement;
        btn?.focus();
      });
    }
  };

  private handleTabClose = async (ev: MouseEvent, value: string) => {
    ev.stopPropagation();
    const tabs = await this.getTabs();
    const tabEl = tabs.find(t => (t.value || t.getAttribute('value')) === value);
    if (tabEl) {
      await tabEl.close();
    }
  };

  private onSlotChange = () => {
    this.queueSyncTabs();
  };

  private get resolvedColor(): string {
    const key = (this.color || 'primary').toLowerCase();
    return COLOR_TOKENS[key] || this.color || 'var(--nx-color-primary, #8145b5)';
  }

  render() {
    const isVertical = this.placement === 'start' || this.placement === 'end';
    const colorKey = (this.color || 'primary').toLowerCase();
    const isNamedColor = colorKey in COLOR_TOKENS;
    const resolvedColor = this.resolvedColor;
    const hostStyles: Record<string, string> = {
      '--nx-tab-indicator-color': resolvedColor,
      '--nx-tab-color-hover': resolvedColor,
    };

    const tabNav = (
      <div
        class={{
          'tab-bar-container': true,
          'has-scroll-left': this.canScrollLeft,
          'has-scroll-right': this.canScrollRight,
        }}
        part="nav"
      >
        {this.scrollable && !isVertical && this.canScrollLeft && (
          <button
            type="button"
            class="tab-scroll-btn tab-scroll-left"
            aria-label="Scroll tabs left"
            onClick={this.scrollLeft}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div
          class="tab-list"
          role="tablist"
          ref={el => (this.tabListEl = el)}
          onScroll={this.checkScrollButtons}
          onKeyDown={this.handleKeyNavigation}
          part="tablist"
        >
          {this.tabItems.map((item, index) => {
            const isSelected = item.value === this.value;
            const isDisabled = item.disabled || this.disabled;

            return (
              <div
                role="tab"
                id={`nx-tab-header-${item.value}`}
                data-value={item.value}
                data-index={index}
                aria-selected={isSelected ? 'true' : 'false'}
                aria-controls={`nx-tab-panel-${item.value}`}
                aria-disabled={isDisabled ? 'true' : undefined}
                tabindex={isDisabled ? -1 : isSelected ? 0 : -1}
                class={{
                  'tab-item': true,
                  'is-selected': isSelected,
                  'is-disabled': isDisabled,
                  'has-icon': !!item.icon,
                  'has-badge': item.badge !== undefined,
                  'is-closable': item.closable,
                }}
                onClick={() => this.selectTab(item.value)}
                onKeyDown={(e) => this.handleTabItemKeyDown(e, item.value)}
                part={isSelected ? 'tab active-tab' : 'tab'}
              >
                {item.icon && (
                  <nx-icon name={item.icon} size="16px" class="tab-icon"></nx-icon>
                )}

                {item.hasLabelSlot && item.labelHtml ? (
                  <span class="tab-label" innerHTML={item.labelHtml}></span>
                ) : (
                  <span class="tab-label">{item.label}</span>
                )}

                {item.badge !== undefined && (
                  <span class="tab-badge" part="badge">
                    {item.badge}
                  </span>
                )}

                {item.closable && (
                  <button
                    type="button"
                    class="tab-close-btn"
                    aria-label={`Close ${item.label || 'tab'}`}
                    onClick={(e) => this.handleTabClose(e, item.value)}
                  >
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                )}
              </div>
            );
          })}

          {/* Active bottom underline indicator */}
          <div
            ref={el => (this.indicatorEl = el)}
            class="tab-indicator"
            part="indicator"
          ></div>
        </div>

        {this.scrollable && !isVertical && this.canScrollRight && (
          <button
            type="button"
            class="tab-scroll-btn tab-scroll-right"
            aria-label="Scroll tabs right"
            onClick={this.scrollRight}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>
    );

    return (
      <Host
        style={hostStyles}
        class={{
          [`color-${colorKey}`]: isNamedColor,
          [`placement-${this.placement}`]: true,
          [`size-${this.size}`]: true,
          'is-stretched': this.stretch,
          'is-disabled': this.disabled,
        }}
      >
        {this.placement === 'bottom' || this.placement === 'end' ? (
          [
            <div class="tab-panels-wrapper" part="panels-wrapper">
              <slot onSlotchange={this.onSlotChange}></slot>
            </div>,
            tabNav,
          ]
        ) : (
          [
            tabNav,
            <div class="tab-panels-wrapper" part="panels-wrapper">
              <slot onSlotchange={this.onSlotChange}></slot>
            </div>,
          ]
        )}
      </Host>
    );
  }
}
