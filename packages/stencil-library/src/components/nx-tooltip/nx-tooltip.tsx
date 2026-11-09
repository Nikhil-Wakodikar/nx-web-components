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
import {
  NxTooltipPlacement,
  NxTooltipSize,
  NxTooltipTrigger,
  NxTooltipVariant,
} from './nx-tooltip.types';

let tooltipIds = 0;

/**
 * `<nx-tooltip>` displays informative text or rich content when users hover, focus, or click an anchor element.
 *
 * @part trigger - Wrapper around the slotted trigger element.
 * @part bubble - The floating tooltip bubble container.
 * @part content - The wrapper for slotted or text content inside the bubble.
 * @part arrow - The pointer arrow element.
 */
@Component({
  tag: 'nx-tooltip',
  styleUrl: 'nx-tooltip.scss',
  shadow: true,
})
export class NxTooltip {
  @Element() el!: HTMLElement;

  private tooltipId = `nx-tooltip-${tooltipIds++}`;
  private bubbleEl?: HTMLElement;
  private triggerWrapperEl?: HTMLElement;
  private showTimeout?: any;
  private hideTimeout?: any;
  private activeTargetEl?: HTMLElement | null = null;

  @State() isVisible = false;
  @State() currentPlacement: NxTooltipPlacement = 'top';
  @State() bubbleStyle: { top?: string; left?: string } = {};

  /**
   * The text content to display inside the tooltip.
   * If slot="content" is provided, this prop will be overridden by the slot.
   */
  @Prop() content?: string;

  /**
   * Preferred placement of the tooltip relative to the trigger.
   */
  @Prop({ reflect: true }) placement: NxTooltipPlacement = 'top';

  /**
   * Event that triggers the tooltip display: 'hover', 'focus', 'click', or 'manual'.
   */
  @Prop({ reflect: true }) trigger: NxTooltipTrigger = 'hover';

  /**
   * Visual color variant theme.
   */
  @Prop({ reflect: true }) variant: NxTooltipVariant = 'dark';

  /**
   * Size variant of the tooltip: 'sm', 'md', or 'lg'.
   */
  @Prop({ reflect: true }) size: NxTooltipSize = 'md';

  /**
   * Whether to display the pointer arrow triangle.
   */
  @Prop({ reflect: true }) arrow = true;

  /**
   * Delay in milliseconds before showing the tooltip.
   */
  @Prop() delay = 100;

  /**
   * Delay in milliseconds before hiding the tooltip.
   */
  @Prop() hideDelay = 100;

  /**
   * Offset distance in pixels from the target element.
   */
  @Prop() offset = 8;

  /**
   * Maximum width of the tooltip popup.
   */
  @Prop({ attribute: 'max-width' }) maxWidth = '18rem';

  /**
   * Disables tooltip interaction entirely when true.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Programmatic visibility control (useful for manual mode or Storybook preview).
   */
  @Prop({ mutable: true, reflect: true }) open = false;

  /**
   * Optional CSS selector or element ID for external trigger attachment.
   */
  @Prop() target?: string;

  /**
   * Emitted when the tooltip becomes visible.
   */
  @Event() nxShow!: EventEmitter<void>;

  /**
   * Emitted when the tooltip hides.
   */
  @Event() nxHide!: EventEmitter<void>;

  @Watch('open')
  handleOpenPropChange(newVal: boolean) {
    if (newVal) {
      this.showTooltip();
    } else {
      this.hideTooltip();
    }
  }

  @Watch('placement')
  handlePlacementChange(newVal: NxTooltipPlacement) {
    this.currentPlacement = newVal;
    if (this.isVisible && this.target) {
      this.updatePosition();
    }
  }

  @Watch('disabled')
  handleDisabledChange(newVal: boolean) {
    if (newVal && this.isVisible) {
      this.hideTooltip();
    }
  }

  @Watch('target')
  handleTargetChange() {
    this.setupExternalTarget();
    if (this.isVisible && this.target) {
      this.updatePosition();
    }
  }

  componentWillLoad() {
    this.currentPlacement = this.placement;
    if (this.open && !this.disabled) {
      this.isVisible = true;
    }
  }

  componentDidLoad() {
    this.setupExternalTarget();
    if (this.open && !this.disabled) {
      this.showTooltip();
    }
  }

  disconnectedCallback() {
    this.cleanupListeners();
    this.clearTimers();
  }

  /**
   * Public API: Programmatically display the tooltip.
   */
  @Method()
  async show(): Promise<void> {
    this.showTooltip();
  }

  /**
   * Public API: Programmatically hide the tooltip.
   */
  @Method()
  async hide(): Promise<void> {
    this.hideTooltip();
  }

  /**
   * Public API: Toggle tooltip visibility.
   */
  @Method()
  async toggle(): Promise<void> {
    if (this.isVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  // ==========================================
  // Trigger Listeners & Event Management
  // ==========================================

  private setupExternalTarget() {
    if (!this.target) return;
    const resolved =
      document.getElementById(this.target) ||
      (document.querySelector(this.target) as HTMLElement | null);

    if (resolved && resolved !== this.activeTargetEl) {
      this.cleanupExternalListeners();
      this.activeTargetEl = resolved;
      this.attachTargetListeners(resolved);
    }
  }

  private attachTargetListeners(el: HTMLElement) {
    el.addEventListener('mouseenter', this.handleTriggerMouseEnter);
    el.addEventListener('mouseleave', this.handleTriggerMouseLeave);
    el.addEventListener('focusin', this.handleTriggerFocusIn);
    el.addEventListener('focusout', this.handleTriggerFocusOut);
    el.addEventListener('click', this.handleTriggerClick);
  }

  private cleanupExternalListeners() {
    if (this.activeTargetEl) {
      this.activeTargetEl.removeEventListener('mouseenter', this.handleTriggerMouseEnter);
      this.activeTargetEl.removeEventListener('mouseleave', this.handleTriggerMouseLeave);
      this.activeTargetEl.removeEventListener('focusin', this.handleTriggerFocusIn);
      this.activeTargetEl.removeEventListener('focusout', this.handleTriggerFocusOut);
      this.activeTargetEl.removeEventListener('click', this.handleTriggerClick);
      this.activeTargetEl = null;
    }
  }

  private cleanupListeners() {
    this.cleanupExternalListeners();
    window.removeEventListener('resize', this.handleWindowChange);
    window.removeEventListener('scroll', this.handleWindowChange, true);
    document.removeEventListener('click', this.handleDocumentClick);
  }

  private clearTimers() {
    if (this.showTimeout) clearTimeout(this.showTimeout);
    if (this.hideTimeout) clearTimeout(this.hideTimeout);
  }

  private getTargetElement(): HTMLElement | null {
    if (this.activeTargetEl) return this.activeTargetEl;
    if (this.target) {
      const found =
        document.getElementById(this.target) ||
        (document.querySelector(this.target) as HTMLElement | null);
      if (found) {
        this.activeTargetEl = found;
        return found;
      }
    }
    const slotted = this.el.firstElementChild as HTMLElement | null;
    if (slotted && slotted.slot !== 'content') {
      return slotted;
    }
    return this.triggerWrapperEl || this.el;
  }

  // ==========================================
  // Show / Hide Handlers
  // ==========================================

  private showTooltip() {
    if (this.disabled) return;
    if (this.hideTimeout) clearTimeout(this.hideTimeout);

    const performShow = () => {
      this.isVisible = true;
      this.open = true;

      if (this.target) {
        this.updatePosition();
        window.addEventListener('resize', this.handleWindowChange, { passive: true });
        window.addEventListener('scroll', this.handleWindowChange, { passive: true, capture: true });
      }

      if (this.trigger === 'click') {
        setTimeout(() => document.addEventListener('click', this.handleDocumentClick), 0);
      }

      // Accessibility link
      const target = this.getTargetElement();
      if (target) {
        target.setAttribute('aria-describedby', this.tooltipId);
      }

      this.nxShow.emit();
    };

    if (this.delay > 0) {
      this.showTimeout = setTimeout(performShow, this.delay);
    } else {
      performShow();
    }
  }

  private hideTooltip() {
    if (this.showTimeout) clearTimeout(this.showTimeout);

    this.hideTimeout = setTimeout(() => {
      this.isVisible = false;
      this.open = false;

      window.removeEventListener('resize', this.handleWindowChange);
      window.removeEventListener('scroll', this.handleWindowChange, true);
      document.removeEventListener('click', this.handleDocumentClick);

      const target = this.getTargetElement();
      if (target) {
        target.removeAttribute('aria-describedby');
      }

      this.nxHide.emit();
    }, this.hideDelay);
  }

  // ==========================================
  // Interaction Listeners
  // ==========================================

  private handleTriggerMouseEnter = () => {
    if (this.trigger === 'hover') {
      this.showTooltip();
    }
  };

  private handleTriggerMouseLeave = () => {
    if (this.trigger === 'hover') {
      this.hideTooltip();
    }
  };

  private handleTriggerFocusIn = () => {
    if (this.trigger === 'focus' || this.trigger === 'hover') {
      this.showTooltip();
    }
  };

  private handleTriggerFocusOut = () => {
    if (this.trigger === 'focus' || this.trigger === 'hover') {
      this.hideTooltip();
    }
  };

  private handleTriggerClick = (e: MouseEvent) => {
    if (this.trigger === 'click') {
      e.stopPropagation();
      this.toggle();
    }
  };

  private handleDocumentClick = (e: MouseEvent) => {
    if (!this.isVisible || this.trigger !== 'click') return;
    const path = e.composedPath();
    const isInsideBubble = this.bubbleEl && path.includes(this.bubbleEl);
    const isInsideTrigger = this.el && path.includes(this.el);

    if (!isInsideBubble && !isInsideTrigger) {
      this.hideTooltip();
    }
  };

  @Listen('keydown', { target: 'window' })
  handleWindowKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape' && this.isVisible) {
      this.hideTooltip();
    }
  }

  private handleWindowChange = () => {
    if (this.isVisible && this.target) {
      this.updatePosition();
    }
  };

  // ==========================================
  // External Target Positioning & Clamping
  // ==========================================

  private updatePosition() {
    if (!this.bubbleEl || !this.target) return;
    const targetEl = this.getTargetElement();
    if (!targetEl) return;

    const triggerRect = targetEl.getBoundingClientRect();
    const bubbleRect = this.bubbleEl.getBoundingClientRect();
    const offset = this.offset;
    const viewportPad = 8;

    let placement = this.placement;

    // Flip if overflowing screen edges
    if (placement.startsWith('top') && triggerRect.top - bubbleRect.height - offset < viewportPad) {
      placement = placement.replace('top', 'bottom') as NxTooltipPlacement;
    } else if (
      placement.startsWith('bottom') &&
      triggerRect.bottom + bubbleRect.height + offset > window.innerHeight - viewportPad
    ) {
      placement = placement.replace('bottom', 'top') as NxTooltipPlacement;
    } else if (placement.startsWith('left') && triggerRect.left - bubbleRect.width - offset < viewportPad) {
      placement = placement.replace('left', 'right') as NxTooltipPlacement;
    } else if (
      placement.startsWith('right') &&
      triggerRect.right + bubbleRect.width + offset > window.innerWidth - viewportPad
    ) {
      placement = placement.replace('right', 'left') as NxTooltipPlacement;
    }

    this.currentPlacement = placement;

    let top = 0;
    let left = 0;

    // Calculate Primary Axis
    if (placement.startsWith('top')) {
      top = triggerRect.top - bubbleRect.height - offset;
    } else if (placement.startsWith('bottom')) {
      top = triggerRect.bottom + offset;
    } else if (placement.startsWith('left')) {
      left = triggerRect.left - bubbleRect.width - offset;
    } else if (placement.startsWith('right')) {
      left = triggerRect.right + offset;
    }

    // Calculate Cross Axis (Alignment)
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      if (placement.endsWith('-start')) {
        left = triggerRect.left;
      } else if (placement.endsWith('-end')) {
        left = triggerRect.right - bubbleRect.width;
      } else {
        left = triggerRect.left + (triggerRect.width - bubbleRect.width) / 2;
      }
    } else if (placement.startsWith('left') || placement.startsWith('right')) {
      if (placement.endsWith('-start')) {
        top = triggerRect.top;
      } else if (placement.endsWith('-end')) {
        top = triggerRect.bottom - bubbleRect.height;
      } else {
        top = triggerRect.top + (triggerRect.height - bubbleRect.height) / 2;
      }
    }

    // Viewport bounds clamping
    left = Math.max(viewportPad, Math.min(left, window.innerWidth - bubbleRect.width - viewportPad));
    top = Math.max(viewportPad, Math.min(top, window.innerHeight - bubbleRect.height - viewportPad));

    this.bubbleStyle = {
      top: `${Math.round(top)}px`,
      left: `${Math.round(left)}px`,
    };
  }

  render() {
    const hasTriggerSlot = !this.target;

    return (
      <Host
        class={{ 'has-target': !!this.target, disabled: this.disabled }}
      >
        {hasTriggerSlot && (
          <div
            class="tooltip-trigger-wrapper"
            part="trigger"
            ref={el => (this.triggerWrapperEl = el)}
            onMouseEnter={this.handleTriggerMouseEnter}
            onMouseLeave={this.handleTriggerMouseLeave}
            onFocusin={this.handleTriggerFocusIn}
            onFocusout={this.handleTriggerFocusOut}
            onClick={this.handleTriggerClick}
          >
            <slot></slot>
          </div>
        )}

        <div
          id={this.tooltipId}
          role="tooltip"
          aria-hidden={this.isVisible ? 'false' : 'true'}
          ref={el => (this.bubbleEl = el)}
          part="bubble"
          class={{
            'nx-tooltip-bubble': true,
            'is-visible': this.isVisible,
            [`placement-${this.currentPlacement}`]: true,
            [`variant-${this.variant}`]: true,
            [`size-${this.size}`]: true,
            'has-arrow': this.arrow,
          }}
          style={{
            ...(this.target ? this.bubbleStyle : {}),
            ...(this.maxWidth && this.maxWidth !== '18rem' ? { maxWidth: this.maxWidth } : {}),
            '--nx-tooltip-offset': `${this.offset}px`,
          }}
          onMouseEnter={this.trigger === 'hover' ? this.handleTriggerMouseEnter : undefined}
          onMouseLeave={this.trigger === 'hover' ? this.handleTriggerMouseLeave : undefined}
        >
          <div class="tooltip-content" part="content">
            <slot name="content">{this.content}</slot>
          </div>
          {this.arrow && <span class="tooltip-arrow" part="arrow" aria-hidden="true"></span>}
        </div>
      </Host>
    );
  }
}

