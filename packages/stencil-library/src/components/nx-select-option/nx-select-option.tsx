import { Component, Element, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

export interface NxSelectOptionSelectDetail {
  value: string;
  label: string;
}

@Component({
  tag: 'nx-select-option',
  styleUrl: 'nx-select-option.scss',
  shadow: true,
})
export class NxSelectOption {
  @Element() el!: HTMLElement;

  private readonly optionId = `nx-select-option-${selectOptionIds++}`;

  @Prop() value = '';
  @Prop({ reflect: true }) disabled = false;
  @Prop({ mutable: true, reflect: true }) selected = false;
  @Prop({ mutable: true, reflect: true }) active = false;

  @Event({
    eventName: 'nxSelectOptionSelect',
    bubbles: true,
    composed: true,
  })
  optionSelect!: EventEmitter<NxSelectOptionSelectDetail>;

  private chooseOption = (event: MouseEvent) => {
    event.preventDefault();
    if (this.disabled) return;

    this.optionSelect.emit({
      value: this.value,
      label: this.el.textContent?.trim() || this.value,
    });
  };

  private preventFocusChange = (event: MouseEvent) => {
    event.preventDefault();
  };

  render() {
    return (
      <Host
        id={this.optionId}
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : 'false'}
        class={{ selected: this.selected, active: this.active, disabled: this.disabled }}
        onClick={this.chooseOption}
        onMouseDown={this.preventFocusChange}
      >
        <slot />
        {this.selected && <span class="checkmark" aria-hidden="true">✓</span>}
      </Host>
    );
  }
}

let selectOptionIds = 0;