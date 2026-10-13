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

interface CalendarDay {
  date: Date;
  iso: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
}

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const SHORT_MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const WEEKDAYS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAYS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

@Component({
  tag: 'nx-date-picker',
  styleUrl: 'nx-date-picker.scss',
  shadow: true,
})
export class NxDatePicker {
  @Element() el!: HTMLElement;

  private readonly pickerId = `nx-date-picker-${datePickerIds++}`;
  private readonly labelId = `${this.pickerId}-label`;
  private readonly panelId = `${this.pickerId}-panel`;

  @Prop({ mutable: true }) value = '';

  @Prop() label?: string;

  @Prop() placeholder = 'Select date';

  @Prop() name = '';

  @Prop() required = false;

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) readonly = false;

  @Prop({ reflect: true }) invalid = false;

  @Prop({ reflect: true }) success = false;

  @Prop() min?: string;

  @Prop() max?: string;

  @Prop() format: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD' | 'DD MMM YYYY' = 'DD/MM/YYYY';

  @Prop() firstDayOfWeek: 0 | 1 = 0;

  @Prop() clearable = true;

  @Prop() showTodayButton = true;

  @Prop() helperText?: string;

  @Prop() errorText?: string;

  @State() isOpen = false;
  @State() viewMonth = new Date().getMonth();
  @State() viewYear = new Date().getFullYear();
  @State() viewMode: 'days' | 'months' | 'years' = 'days';

  @Event({ bubbles: true, composed: true }) nxInput!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxChange!: EventEmitter<string>;
  @Event({ bubbles: true, composed: true }) nxFocus!: EventEmitter<FocusEvent>;
  @Event({ bubbles: true, composed: true }) nxBlur!: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this.syncViewToValue();
  }

  @Watch('value')
  valueChanged() {
    this.syncViewToValue();
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
    this.syncViewToValue();
    this.viewMode = 'days';
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.closePanel();
  }

  private closePanel() {
    this.isOpen = false;
    this.viewMode = 'days';
  }

  private parseIsoDate(input?: string): Date | null {
    if (!input) return null;
    const trimmed = input.trim();
    const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    const slashMatch = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(trimmed);

    let year: number;
    let month: number;
    let day: number;

    if (isoMatch) {
      year = Number(isoMatch[1]);
      month = Number(isoMatch[2]) - 1;
      day = Number(isoMatch[3]);
    } else if (slashMatch) {
      if (this.format === 'MM/DD/YYYY') {
        month = Number(slashMatch[1]) - 1;
        day = Number(slashMatch[2]);
      } else {
        day = Number(slashMatch[1]);
        month = Number(slashMatch[2]) - 1;
      }
      year = Number(slashMatch[3]);
    } else {
      return null;
    }

    const date = new Date(year, month, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month ||
      date.getDate() !== day
    ) {
      return null;
    }
    return date;
  }

  private normalizeToIso(input?: string): string {
    const date = this.parseIsoDate(input);
    return date ? this.toIsoDate(date) : '';
  }

  private toIsoDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private formatDisplayDate(iso: string): string {
    const date = this.parseIsoDate(iso);
    if (!date) return '';
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    const mmm = SHORT_MONTH_NAMES[date.getMonth()];

    switch (this.format) {
      case 'MM/DD/YYYY':
        return `${mm}/${dd}/${yyyy}`;
      case 'YYYY-MM-DD':
        return `${yyyy}-${mm}-${dd}`;
      case 'DD MMM YYYY':
        return `${dd} ${mmm} ${yyyy}`;
      case 'DD/MM/YYYY':
      default:
        return `${dd}/${mm}/${yyyy}`;
    }
  }

  private syncViewToValue() {
    const parsed = this.parseIsoDate(this.value);
    const target = parsed || new Date();
    this.viewMonth = target.getMonth();
    this.viewYear = target.getFullYear();
  }

  private isDateDisabled(iso: string): boolean {
    const minIso = this.normalizeToIso(this.min);
    const maxIso = this.normalizeToIso(this.max);
    if (minIso && iso < minIso) return true;
    if (maxIso && iso > maxIso) return true;
    return false;
  }

  private get calendarDays(): CalendarDay[] {
    const firstOfMonth = new Date(this.viewYear, this.viewMonth, 1);
    const startDayOffset =
      (firstOfMonth.getDay() - this.firstDayOfWeek + 7) % 7;
    const startDate = new Date(this.viewYear, this.viewMonth, 1 - startDayOffset);
    const todayIso = this.toIsoDate(new Date());

    const days: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const current = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + i,
      );
      const iso = this.toIsoDate(current);
      days.push({
        date: current,
        iso,
        day: current.getDate(),
        isCurrentMonth: current.getMonth() === this.viewMonth,
        isToday: iso === todayIso,
        isSelected: iso === this.value,
        isDisabled: this.isDateDisabled(iso),
      });
    }

    return days;
  }

  private get yearRange(): number[] {
    const startYear = this.viewYear - 5;
    return Array.from({ length: 12 }, (_, idx) => startYear + idx);
  }

  private selectDate(iso: string) {
    if (this.disabled || this.readonly || this.isDateDisabled(iso)) return;
    this.value = iso;
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);
    this.closePanel();
    this.setFocus();
  }

  private handleClear = (ev: MouseEvent) => {
    ev.stopPropagation();
    if (this.disabled || this.readonly) return;
    this.value = '';
    this.nxInput.emit(this.value);
    this.nxChange.emit(this.value);
  };

  private handleSelectToday = () => {
    const todayIso = this.toIsoDate(new Date());
    if (this.isDateDisabled(todayIso)) return;
    this.selectDate(todayIso);
  };

  private changeMonth(delta: number) {
    if (this.viewMode === 'years') {
      this.viewYear += delta * 12;
      return;
    }
    const next = new Date(this.viewYear, this.viewMonth + delta, 1);
    this.viewMonth = next.getMonth();
    this.viewYear = next.getFullYear();
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
    const displayValue = this.formatDisplayDate(this.value);
    const weekdays = this.firstDayOfWeek === 1 ? WEEKDAYS_MON : WEEKDAYS_SUN;

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
                    aria-label="Clear date"
                    onClick={this.handleClear}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </span>
                )}
                <svg class="picker-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </span>
            </button>

            <div
              part="panel"
              class="picker-panel"
              id={this.panelId}
              role="dialog"
              aria-label="Calendar"
              hidden={!this.isOpen}
            >
              <div class="calendar-header">
                <button
                  type="button"
                  class="nav-btn"
                  aria-label="Previous"
                  onClick={() => this.changeMonth(-1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <div class="header-selectors">
                  <button
                    type="button"
                    class="selector-btn"
                    onClick={() => (this.viewMode = this.viewMode === 'months' ? 'days' : 'months')}
                  >
                    {MONTH_NAMES[this.viewMonth]}
                  </button>
                  <button
                    type="button"
                    class="selector-btn"
                    onClick={() => (this.viewMode = this.viewMode === 'years' ? 'days' : 'years')}
                  >
                    {this.viewYear}
                  </button>
                </div>

                <button
                  type="button"
                  class="nav-btn"
                  aria-label="Next"
                  onClick={() => this.changeMonth(1)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {this.viewMode === 'days' && (
                <div class="calendar-body">
                  <div class="weekdays-grid">
                    {weekdays.map(day => (
                      <span class="weekday-cell" key={day}>
                        {day}
                      </span>
                    ))}
                  </div>

                  <div class="days-grid">
                    {this.calendarDays.map(item => (
                      <button
                        type="button"
                        key={item.iso}
                        disabled={item.isDisabled}
                        class={{
                          'day-cell': true,
                          'outside-month': !item.isCurrentMonth,
                          'is-today': item.isToday,
                          'is-selected': item.isSelected,
                          'is-disabled': item.isDisabled,
                        }}
                        onClick={() => this.selectDate(item.iso)}
                      >
                        {item.day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {this.viewMode === 'months' && (
                <div class="months-grid">
                  {SHORT_MONTH_NAMES.map((mName, idx) => (
                    <button
                      type="button"
                      key={mName}
                      class={{
                        'grid-option-btn': true,
                        'is-selected': idx === this.viewMonth,
                      }}
                      onClick={() => {
                        this.viewMonth = idx;
                        this.viewMode = 'days';
                      }}
                    >
                      {mName}
                    </button>
                  ))}
                </div>
              )}

              {this.viewMode === 'years' && (
                <div class="years-grid">
                  {this.yearRange.map(yr => (
                    <button
                      type="button"
                      key={yr}
                      class={{
                        'grid-option-btn': true,
                        'is-selected': yr === this.viewYear,
                      }}
                      onClick={() => {
                        this.viewYear = yr;
                        this.viewMode = 'days';
                      }}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              )}

              {(this.showTodayButton || this.clearable) && (
                <div class="calendar-footer">
                  {this.showTodayButton && (
                    <button type="button" class="footer-btn" onClick={this.handleSelectToday}>
                      Today
                    </button>
                  )}
                  {this.clearable && (
                    <button
                      type="button"
                      class="footer-btn footer-btn-secondary"
                      onClick={ev => {
                        this.handleClear(ev);
                        this.closePanel();
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {this.renderFooterMessage()}
        </div>
      </Host>
    );
  }
}

let datePickerIds = 0;

