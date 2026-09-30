import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'nx-checkbox',
  styleUrl: 'nx-checkbox.scss',
  shadow: true,
})
export class NxCheckbox {

  @Prop({ mutable: true }) checked: boolean = false;

  @Prop({ mutable: true }) disabled: boolean = false;

  @Prop() justify?: 'start' | 'end' | 'space-between';

  @Prop() alignment?: 'start' | 'center';

  private inputId = `nx-checkbox-${checkboxIds++}`;

  @Event({
    eventName: 'checkedChange',
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  checkedChange!: EventEmitter<boolean>;

  private onChange = (event: Event) => {
    const checked = (event.target as HTMLInputElement).checked;

    this.checked = checked;
    this.checkedChange.emit(checked);
  };

  render() {
    const {
      checked,
      disabled,
      justify,
      alignment,
      inputId
    } = this;

    return (
      <Host
        class={{
          checked,
          disabled,
          [`checkbox-justify-${justify}`]: justify !== undefined,
          [`checkbox-alignment-${alignment}`]: alignment !== undefined,
        }}
      >
        <div part="container" class="checkbox-wrapper">

          <div part="mark" class="checkbox-box-wrapper">
            <input
              id={inputId}
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={this.onChange}
            />
          </div>

          <label
            part="label"
            class="checkbox-label-container"
            htmlFor={inputId}
          >
            <slot />
          </label>

        </div>
      </Host>
    );
  }
}

let checkboxIds = 0