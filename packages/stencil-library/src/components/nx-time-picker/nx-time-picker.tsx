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

@Component({
  tag: 'nx-time-picker',
  styleUrl: 'nx-time-picker.scss',
  shadow: true,
})
export class NxTimePicker {
  @Element() el!: HTMLElement;

  private readonly pickerId = `nx-time-picker-${timePickerIds++}`;
  private readonly labelId = `${this.pickerId}-label`;
  private readonly panelId = `${this.pickerId}-panel`;

  @Prop({ mutable: true }) value = '';

  @Prop() label?: string;

  @Prop() placeholder = 'Select time';

  @Prop() name = '';

  @Prop() required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) readonly = false;

  @Prop({ reflect: true }) invalid = false;

  @Prop({ reflect: true }) success = false;

  @Prop() format: '12h' | '24h' = '12h';

  @Prop() showSeconds = false;

  @Prop() minuteStep = 1;

  @Prop() secondStep = 1;

  @Prop() min?: string;

  @Prop() max?: string;

  @Prop() clearable = true;

  @Prop() showNowButton = true;

  @Prop() helperText?: string;

  @Prop() errorText?: string;

  @State() isOpen = false;
  @State() selectedHour = 9;
  @State() selectedMinute = 0;
  @State() selectedSecond = 0;
  @State() selectedPeriod: 'AM' | 'PM' = 'AM';

  @Event({ bubbles: true, composed: true }) nxInput!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;
  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.syncStateFromValue();
  }

  @Watch('value')
  valueChanged() {
    this.syncStateFromValue();
  }

  @Watch('disabled')
  disabledChanged(disabled: boolean) {
    if (disabled) {
      this.closePanel();
    }
  }

  @Listen('click', { target: 'document' })
  handleOutsideClick(event: MouseEvent) {
    if (this.isOpen && !event.composedPath().includes(this.el)) {
      this.closePanel();
      this.nxBlur.emit(new FocusEvent('blur'));
    }
  }

  @Method()
  async setFocus() {
    this.el.shadowRoot?.querySelector<HTMLButtonElement>('.picker-trigger')?.focus();
  }

  @Method()
  async open() {
    if (this.disabled || this.readonly) return;
    this.syncStateFromValue();
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.closePanel();
  }

  private closePanel() {
    this.isOpen = false;
  }

  private parseTime(val?: string): { hour24: number; minute: number; second: number } | null {
    if (!val) return null;
    const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?$/i.exec(val.trim());
    if (!match) return null;

    let hour24 = Number(match[1]);
    const minute = Number(match[2]);
    const second = match[3] ? Number(match[3]) : 0;
    const period = match[4]?.toUpperCase();

    if (period === 'PM' && hour24 < 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;

    if (hour24 < 0 || hour24 > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) {
      return null;
    }

    return { hour24, minute, second };
  }

  private syncStateFromValue() {
    const parsed = this.parseTime(this.value);
    if (!parsed) {
      const now = new Date();
      this.setInternalTime(now.getHours(), now.getMinutes(), now.getSeconds());
      return;
    }
    this.setInternalTime(parsed.hour24, parsed.minute, parsed.second);
  }

  private setInternalTime(hour24: number, minute: number, second: number) {
    this.selectedMinute = minute;
    this.selectedSecond = second;
    if (this.format === '12h') {
      this.selectedPeriod = hour24 >= 12 ? 'PM' : 'AM';
      this.selectedHour = hour24 % 12 || 12;
    } else {
      this.selectedHour = hour24;
    }
  }

  private get currentHour24(): number {
    if (this.format === '24h') return this.selectedHour;
    if (this.selectedPeriod === 'AM') {
      return this.selectedHour === 12 ? 0 : this.selectedHour;
    }
    return this.selectedHour === 12 ? 12 : this.selectedHour + 12;
  }

  private buildValue(hour24: number, minute: number, second: number): string {
    const hh = String(hour24).padStart(2, '0');
    const mm = String(minute).padStart(2, '0');
    const ss = String(second).padStart(2, '0');
    return this.showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
  }

  private formatDisplayTime(val: string): string {
    const parsed = this.parseTime(val);
    if (!parsed) return '';

    const mm = String(parsed.minute).padStart(2, '0');
    const ss = String(parsed.second).padStart(2, '0');

    if (this.format === '24h') {
      const hh = String(parsed.hour24).padStart(2, '0');
      return this.showSeconds ? `${hh}:${mm}:${ss}` : `${hh}:${mm}`;
    }

    const period = parsed.hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = String(parsed.hour24 % 12 || 12).padStart(2, '0');
    return this.showSeconds ? `${hour12}:${mm}:${ss} ${period}` : `${hour12}:${mm} ${period}`;
  }

  private commitSelection() {
    if (this.disabled || this.readonly) return;
    const nextValue = this.buildValue(this.currentHour24, this.selectedMinute, this.selectedSecond);
    if (this.min && nextValue < this.min) return;
    if (this.max && nextValue > this.max) return;

    this.value = nextValue;
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);
  }

  private handleSelectHour(hour: number) {
    this.selectedHour = hour;
    this.commitSelection();
  }

  private handleSelectMinute(minute: number) {
    this.selectedMinute = minute;
    this.commitSelection();
  }

  private handleSelectSecond(second: number) {
    this.selectedSecond = second;
    this.commitSelection();
  }

  private handleSelectPeriod(period: 'AM' | 'PM') {
    this.selectedPeriod = period;
    this.commitSelection();
  }

  private handleSelectNow = () => {
    const now = new Date();
    const stepMin = Math.max(1, this.minuteStep);
    const roundedMin = Math.floor(now.getMinutes() / stepMin) * stepMin;
    this.setInternalTime(now.getHours(), roundedMin, now.getSeconds());
    this.commitSelection();
    this.closePanel();
    this.setFocus();
  };

  private handleClear = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.value = '';
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);
  };

  private get hourOptions(): number[] {
    if (this.format === '24h') {
      return Array.from({ length: 24 }, (_, idx) => idx);
    }
    return Array.from({ length: 12 }, (_, idx) => idx + 1);
  }

  private get minuteOptions(): number[] {
    const step = Math.max(1, Math.min(30, this.minuteStep || 1));
    const options: number[] = [];
    for (let m = 0; m < 60; m += step) {
      options.push(m);
    }
    return options;
  }

  private get secondOptions(): number[] {
    const step = Math.max(1, Math.min(30, this.secondStep || 1));
    const options: number[] = [];
    for (let s = 0; s < 60; s += step) {
      options.push(s);
    }
    return options;
  }

  private onTriggerClick = () => {
    if (this.disabled || this.readonly) return;
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.open();
    }
  };

  private onTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.isOpen) {
      event.preventDefault();
      this.closePanel();
    } else if ((event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') && !this.isOpen) {
      event.preventDefault();
      this.open();
    }
  };

  private onTriggerFocus = (ev: FocusEvent) => {
    this.nxFocus.emit(ev);
  };

  private onTriggerBlur = (ev: FocusEvent) => {
    const related = ev.relatedTarget as Node | null;
    if (related && (this.el.contains(related) || this.el.shadowRoot?.contains(related))) {
      return;
    }
    if (!this.isOpen) {
      this.nxBlur.emit(ev);
    }
  };

  private renderFooterMessage() {
    const showError = this.invalid && Boolean(this.errorText);
    const showHelper = !showError && Boolean(this.helperText);
    if (!showError && !showHelper) return null;

    return (
      <div part="footer" class="field-footer">
        {showError && (
          <div part="error-text" class="error-text">
            {this.errorText}
          </div>
        )}
        {showHelper && (
          <div part="helper-text" class="helper-text">
            {this.helperText}
          </div>
        )}
      </div>
    );
  }

  render() {
    const displayValue = this.formatDisplayTime(this.value);

    return (
      <Host
        class={{
          'invalid': this.invalid,
          'success': this.success,
          'disabled': this.disabled,
          'is-open': this.isOpen,
        }}
      >
        <div class="picker-field">
          {this.label && (
            <label part="label" class="label-text" id={this.labelId} htmlFor={this.pickerId}>
              {this.label}
              {this.required && <span class="required">*</span>}
            </label>
          )}

          <div class="picker-control">
            <button
              part="trigger"
              class="picker-trigger"
              id={this.pickerId}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={this.isOpen ? 'true' : 'false'}
              aria-controls={this.panelId}
              aria-labelledby={this.label ? this.labelId : undefined}
              aria-invalid={this.invalid ? 'true' : 'false'}
              disabled={this.disabled}
              onClick={this.onTriggerClick}
              onKeyDown={this.onTriggerKeyDown}
              onFocus={this.onTriggerFocus}
              onBlur={this.onTriggerBlur}
            >
              <span class={{ 'selected-label': true, 'placeholder': !displayValue }}>
                {displayValue || this.placeholder}
              </span>

              <span class="trigger-actions">
                {this.clearable && displayValue && !this.disabled && !this.readonly && (
                  <span
                    class="clear-btn"
                    role="button"
                    tabIndex={-1}
                    aria-label="Clear time"
                    onClick={this.handleClear}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <svg class="picker-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
            </button>

            <div
              part="panel"
              class="picker-panel"
              id={this.panelId}
              role="dialog"
              aria-label="Time picker"
              hidden={!this.isOpen}
            >
              <div class="time-columns">
                <div class="time-column">
                  <span class="column-header">Hr</span>
                  <div class="column-list">
                    {this.hourOptions.map(hr => (
                      <button
                        type="button"
                        key={hr}
                        class={{
                          'time-cell': true,
                          'is-selected': Boolean(this.value) && hr === this.selectedHour,
                        }}
                        onClick={() => this.handleSelectHour(hr)}
                      >
                        {String(hr).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                <div class="time-column">
                  <span class="column-header">Min</span>
                  <div class="column-list">
                    {this.minuteOptions.map(min => (
                      <button
                        type="button"
                        key={min}
                        class={{
                          'time-cell': true,
                          'is-selected': Boolean(this.value) && min === this.selectedMinute,
                        }}
                        onClick={() => this.handleSelectMinute(min)}
                      >
                        {String(min).padStart(2, '0')}
                      </button>
                    ))}
                  </div>
                </div>

                {this.showSeconds && (
                  <div class="time-column">
                    <span class="column-header">Sec</span>
                    <div class="column-list">
                      {this.secondOptions.map(sec => (
                        <button
                          type="button"
                          key={sec}
                          class={{
                            'time-cell': true,
                            'is-selected': Boolean(this.value) && sec === this.selectedSecond,
                          }}
                          onClick={() => this.handleSelectSecond(sec)}
                        >
                          {String(sec).padStart(2, '0')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {this.format === '12h' && (
                  <div class="time-column period-column">
                    <span class="column-header">AM/PM</span>
                    <div class="column-list">
                      {(['AM', 'PM'] as const).map(period => (
                        <button
                          type="button"
                          key={period}
                          class={{
                            'time-cell': true,
                            'is-selected': Boolean(this.value) && period === this.selectedPeriod,
                          }}
                          onClick={() => this.handleSelectPeriod(period)}
                        >
                          {period}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div class="time-footer">
                {this.showNowButton && (
                  <button type="button" class="footer-btn" onClick={this.handleSelectNow}>
                    Now
                  </button>
                )}
                <button
                  type="button"
                  class="footer-btn footer-btn-primary"
                  onClick={() => {
                    if (!this.value) {
                      this.commitSelection();
                    }
                    this.closePanel();
                    this.setFocus();
                  }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>

          {this.renderFooterMessage()}
        </div>
      </Host>
    );
  }
}

let timePickerIds = 0;

