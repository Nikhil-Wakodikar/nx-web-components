import { Component, Element, Host, Method, Prop, h } from '@stencil/core';

export interface AutocompleteParent extends HTMLElement {
  selectOptionElement(option: HTMLElement): Promise<void>;
  setOptionActive(option: HTMLElement): Promise<void>;
}

let optionIds = 0;

/**
 * `<nx-option>` represents an individual selectable suggestion item inside `<nx-autocomplete>`.
 */
@Component({
  tag: 'nx-option',
  styleUrl: 'nx-option.scss',
  shadow: true,
})
export class NxOption {
  @Element() el!: HTMLElement;

  private readonly optionId = `nx-option-${optionIds++}`;

  /**
   * The value represented by this option.
   */
  @Prop() value = '';

  /**
   * Optional custom display label. If omitted, textContent of the slotted content is used.
   */
  @Prop() label?: string;

  /**
   * Whether the option is disabled and cannot be selected.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Whether the option is currently selected.
   */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /**
   * Whether the option is currently active (highlighted via keyboard navigation or hover).
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  /**
   * Returns the resolved display label string.
   */
  @Method()
  async getLabel(): Promise<string> {
    return this.label || this.el.textContent?.trim() || this.value;
  }

  private onMouseDown = (event: MouseEvent) => {
    // Prevent focus change away from the autocomplete input
    event.preventDefault();
  };

  private onClick = (event: MouseEvent) => {
    event.preventDefault();
    if (this.disabled) return;

    const autocomplete = this.el.closest('nx-autocomplete') as unknown as AutocompleteParent | null;
    autocomplete?.selectOptionElement(this.el);
  };

  private onMouseEnter = () => {
    if (this.disabled) return;
    const autocomplete = this.el.closest('nx-autocomplete') as unknown as AutocompleteParent | null;
    autocomplete?.setOptionActive(this.el);
  };

  render() {
    return (
      <Host
        id={this.optionId}
        role="option"
        aria-selected={this.selected ? 'true' : 'false'}
        aria-disabled={this.disabled ? 'true' : undefined}
        class={{
          'is-selected': this.selected,
          'is-active': this.active,
          'is-disabled': this.disabled,
        }}
        onMouseDown={this.onMouseDown}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
      >
        <span class="option-label" part="label">
          <slot />
        </span>

        {this.selected && (
          <nx-icon
            class="checkmark"
            part="checkmark"
            name="check"
            size="small"
          ></nx-icon>
        )}
      </Host>
    );
  }
}
