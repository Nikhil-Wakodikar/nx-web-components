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

export type NxLabelSize = 'sm' | 'md' | 'lg';
export type NxLabelWeight = 'regular' | 'medium';
export type NxLabelFontFamily = 'regular' | 'medium' | 'rubik' | 'rubik-medium' | string;
export type NxLabelColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'muted'
  | 'info'
  | 'dark'
  | string;
export type NxLabelPosition = 'inline' | 'stacked';

const COLOR_MAP: Record<string, string> = {
  default: 'var(--nx-color-gray-700, #334155)',
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  muted: 'var(--nx-color-gray-500, #64748b)',
  info: 'var(--nx-color-info, #2563eb)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

let labelIds = 0;

@Component({
  tag: 'nx-label',
  styleUrl: 'nx-label.scss',
  shadow: true,
})
export class NxLabel {
  @Element() el!: HTMLElement;

  private labelId = `nx-label-${labelIds++}`;

  @State() private hasStartSlot = false;
  @State() private hasEndSlot = false;

  /** Target element ID that this label is associated with */
  @Prop({ attribute: 'for' }) htmlFor?: string;

  /** Whether the associated input/field is required */
  @Prop({ reflect: true }) required = false;

  /** Whether to display an (optional) badge or indicator */
  @Prop({ reflect: true }) optional = false;

  /** Font size / density: 'sm', 'md', 'lg' */
  @Prop({ reflect: true }) size: NxLabelSize = 'md';

  /** Font weight: 'regular' (400) or 'medium' (500) */
  @Prop({ reflect: true }) weight: NxLabelWeight = 'medium';

  /** Font family variant: 'regular' (default, Rubik-Regular) or 'rubik-medium' / 'medium' */
  @Prop({ reflect: true }) fontFamily?: NxLabelFontFamily = 'regular';

  /** Color theme or custom CSS color */
  @Prop({ reflect: true }) color: NxLabelColor = 'default';

  /** Position / layout mode: 'inline' or 'stacked' */
  @Prop({ reflect: true }) position: NxLabelPosition = 'inline';

  /** Disabled state */
  @Prop({ reflect: true }) disabled = false;

  /** Whether long text should truncate with an ellipsis */
  @Prop({ reflect: true }) truncate = false;

  /** Emitted when the label is clicked */
  @Event({ bubbles: true, composed: true }) nxClick!: EventEmitter<MouseEvent>;

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

  private handleClick = (ev: MouseEvent) => {
    if (this.disabled) {
      ev.preventDefault();
      ev.stopPropagation();
      return;
    }

    this.nxClick.emit(ev);

    // If an associated htmlFor ID is provided, forward focus and interaction
    if (this.htmlFor) {
      const root = (this.el.getRootNode() as Document | ShadowRoot) || document;
      const target = root.getElementById?.(this.htmlFor);
      if (target) {
        if (typeof (target as any).setFocus === 'function') {
          (target as any).setFocus();
        } else if (typeof (target as any).focus === 'function') {
          (target as any).focus();
        }

        // For inputs, toggles, checkboxes, radios, trigger click
        const tagName = target.tagName.toLowerCase();
        if (
          tagName === 'input' ||
          tagName === 'button' ||
          tagName === 'nx-checkbox' ||
          tagName === 'nx-radio' ||
          tagName === 'nx-toggle'
        ) {
          target.click();
        }
      }
    }
  };

  render() {
    const textColor = COLOR_MAP[this.color] || this.color || COLOR_MAP.default;
    const isInteractive = !!this.htmlFor && !this.disabled;
    const isMediumFont =
      this.fontFamily === 'medium' || this.fontFamily === 'rubik-medium';

    const hostStyles: Record<string, string> = {
      '--nx-label-color': textColor,
    };

    if (isMediumFont) {
      hostStyles['--nx-label-font-family'] =
        'var(--font-rubik-medium, \'Rubik-Medium\', sans-serif)';
    } else if (
      this.fontFamily &&
      this.fontFamily !== 'regular' &&
      this.fontFamily !== 'rubik'
    ) {
      hostStyles['--nx-label-font-family'] = this.fontFamily;
    }

    return (
      <Host
        id={this.labelId}
        style={hostStyles}
        class={{
          [`size-${this.size}`]: !!this.size,
          [`weight-${this.weight}`]: !!this.weight,
          [`position-${this.position}`]: !!this.position,
          [`font-family-${this.fontFamily}`]: !!this.fontFamily,
          'is-disabled': this.disabled,
          'is-required': this.required,
          'is-optional': this.optional,
          'is-interactive': isInteractive,
          'is-truncated': this.truncate,
          'has-start': this.hasStartSlot,
          'has-end': this.hasEndSlot,
        }}
      >
        <label
          class="label-inner"
          htmlFor={this.htmlFor}
          onClick={this.handleClick}
          part="label"
        >
          {/* Start Slot (Icon / Prefix) */}
          <span
            class={{ 'label-start': true, 'is-hidden': !this.hasStartSlot }}
            part="start"
          >
            <slot name="start" onSlotchange={this.checkSlots}></slot>
          </span>

          {/* Main Label Text (Default Slot) */}
          <span class="label-text" part="text">
            <slot onSlotchange={this.checkSlots}></slot>
          </span>

          {/* Required Marker */}
          {this.required && (
            <span class="label-required" part="required" aria-hidden="true">
              <slot name="required" onSlotchange={this.checkSlots}>
                *
              </slot>
            </span>
          )}

          {/* Optional Indicator */}
          {this.optional && (
            <span class="label-optional" part="optional">
              <slot name="optional" onSlotchange={this.checkSlots}>
                (optional)
              </slot>
            </span>
          )}

          {/* End Slot (Tooltip, Badge, Action) */}
          <span
            class={{ 'label-end': true, 'is-hidden': !this.hasEndSlot }}
            part="end"
          >
            <slot name="end" onSlotchange={this.checkSlots}></slot>
          </span>
        </label>
      </Host>
    );
  }
}
