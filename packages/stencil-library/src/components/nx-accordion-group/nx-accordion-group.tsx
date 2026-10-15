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

export type NxAccordionVariant = 'bordered' | 'borderless' | 'accent';
export type NxAccordionDisplayMode = 'default' | 'flat';
export type NxAccordionExpandIconPosition = 'start' | 'end';

export interface NxAccordionGroupChangeEventDetail {
  value: string | string[] | undefined;
}

export interface AccordionElement extends HTMLElement {
  value: string;
  open: boolean;
  disabled: boolean;
  variant: NxAccordionVariant;
  expandIconPosition: NxAccordionExpandIconPosition;
}

let accordionGroupIds = 0;

@Component({
  tag: 'nx-accordion-group',
  styleUrl: 'nx-accordion-group.scss',
  shadow: true,
})
export class NxAccordionGroup {
  @Element() el!: HTMLElement;

  private groupId = `nx-accordion-group-${accordionGroupIds++}`;

  @Prop() multiple = false;

  @Prop({ mutable: true }) value?: string | string[];

  @Prop({ reflect: true }) variant: NxAccordionVariant = 'bordered';

  @Prop({ reflect: true }) displayMode: NxAccordionDisplayMode = 'default';

  @Prop({ reflect: true }) disabled = false;

  @Prop({ reflect: true }) expandIconPosition: NxAccordionExpandIconPosition = 'end';

  @Event({ bubbles: true, composed: true })
  nxChange!: EventEmitter<NxAccordionGroupChangeEventDetail>;

  @Watch('value')
  valueChanged() {
    this.syncAccordions();
  }

  @Watch('disabled')
  @Watch('variant')
  @Watch('expandIconPosition')
  propChanged() {
    this.updateAccordionProps();
  }

  componentDidLoad() {
    this.updateAccordionProps();
    this.syncAccordions();
  }

  @Method()
  async getAccordions(): Promise<AccordionElement[]> {
    return Array.from(this.el.querySelectorAll('nx-accordion')) as AccordionElement[];
  }

  @Method()
  async requestToggle(accordion: AccordionElement, targetOpen: boolean) {
    if (this.disabled || accordion.disabled) return;

    const accordions = await this.getAccordions();
    const accordionValue = accordion.value || '';

    if (this.multiple) {
      let currentValues: string[] = Array.isArray(this.value)
        ? [...this.value]
        : this.value !== undefined
          ? [String(this.value)]
          : [];

      if (targetOpen) {
        if (!currentValues.includes(accordionValue)) {
          currentValues.push(accordionValue);
        }
      } else {
        currentValues = currentValues.filter(val => val !== accordionValue);
      }

      this.value = currentValues;
      accordion.open = targetOpen;
    } else {
      if (targetOpen) {
        this.value = accordionValue;
        accordions.forEach(item => {
          item.open = item === accordion;
        });
      } else {
        this.value = undefined;
        accordion.open = false;
      }
    }

    this.nxChange.emit({ value: this.value });
  }

  private updateAccordionProps() {
    const accordions = Array.from(this.el.querySelectorAll('nx-accordion')) as AccordionElement[];
    accordions.forEach(item => {
      if (!item.hasAttribute('variant')) {
        item.variant = this.variant;
      }
      if (!item.hasAttribute('expand-icon-position')) {
        item.expandIconPosition = this.expandIconPosition;
      }
      if (this.disabled) {
        item.disabled = true;
      }
    });
  }

  private syncAccordions() {
    const accordions = Array.from(this.el.querySelectorAll('nx-accordion')) as AccordionElement[];
    const isValArray = Array.isArray(this.value);

    accordions.forEach(item => {
      const val = item.value || '';
      if (isValArray) {
        item.open = (this.value as string[]).includes(val);
      } else if (this.value !== undefined) {
        item.open = item.value === this.value;
      }
    });
  }

  private onSlotChange = () => {
    this.updateAccordionProps();
    this.syncAccordions();
  };

  render() {
    return (
      <Host
        id={this.groupId}
        class={{
          [`group-${this.variant}`]: true,
          [`display-${this.displayMode}`]: true,
          'is-disabled': this.disabled,
        }}
      >
        <div class="accordion-group-container" role="presentation">
          <slot onSlotchange={this.onSlotChange}></slot>
        </div>
      </Host>
    );
  }
}

