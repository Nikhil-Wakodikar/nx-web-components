import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-radio>` and `<nx-radio-group>` provide accessible single-selection options among mutually exclusive choices.
 * Supports vertical and horizontal layouts, keyboard arrow navigation, error/helper messaging,
 * unchecking (allowEmptySelection), and CSS custom properties.
 */
const meta: Meta = {
  title: 'NX Web Components/Radio',
  component: 'nx-radio-group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The radio system consists of two coordinated components:
- **\`<nx-radio-group>\`**: The parent controller managing selected value state, group label, validation errors, and arrow key navigation.
- **\`<nx-radio>\`**: The individual interactive radio item.

---

### How to Use Custom Styling

\`<nx-radio>\` and \`<nx-radio-group>\` use Shadow DOM encapsulation. Customize styling via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Scope | Description | Default Value |
| :--- | :--- | :--- | :--- |
| \`--label-color\` | Group / Radio | Label text color | \`#0f172a\` |
| \`--gap\` | Group | Gap between radio buttons | \`16px\` |
| \`--size\` | Radio | Radio outer circle diameter | \`18px\` |
| \`--border-color\` | Radio | Unchecked ring border color | \`#94a3b8\` |
| \`--border-color-checked\` | Radio | Border color when selected | \`#8145b5\` |
| \`--background-checked\` | Radio | Inner dot fill color when selected | \`#8145b5\` |
| \`--border-error-color\` | Radio | Border color when invalid | \`#dc2626\` |
| \`--error-color\` | Group | Error text color | \`#dc2626\` |
| \`--helper-color\` | Group | Helper text color | \`#64748b\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`nx-radio-group::part(label)\`: The group legend title.
- \`nx-radio::part(mark)\`: The outer circular radio mark.
- \`nx-radio::part(label)\`: The individual radio option label.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Group label rendered above the options',
      defaultValue: 'Select Subscription Plan',
    },
    value: {
      control: 'text',
      description: 'Currently selected option value',
      defaultValue: 'pro',
    },
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout flow direction for the options',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all radio options in the group',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks selection as required',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the group as invalid and displays error text',
      table: { defaultValue: { summary: 'false' } },
    },
    allowEmptySelection: {
      control: 'boolean',
      description: 'Allows unselecting a checked radio button by clicking it again',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed beneath the group',
      defaultValue: 'You can upgrade or downgrade at any time.',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid is true',
    },
  },
  args: {
    label: 'Select Subscription Plan',
    value: 'pro',
    direction: 'vertical',
    disabled: false,
    required: false,
    invalid: false,
    allowEmptySelection: false,
    helperText: 'You can upgrade or downgrade at any time.',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-radio-group
      .label=${args.label}
      .value=${args.value}
      .direction=${args.direction}
      ?disabled=${args.disabled}
      ?required=${args.required}
      ?invalid=${args.invalid}
      ?allowEmptySelection=${args.allowEmptySelection}
      .helperText=${args.helperText}
      .errorText=${args.errorText}
      @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
    >
      <nx-radio value="starter">Starter Plan ($9/mo)</nx-radio>
      <nx-radio value="pro">Pro Plan ($29/mo)</nx-radio>
      <nx-radio value="enterprise">Enterprise Plan (Custom)</nx-radio>
    </nx-radio-group>
  `,
};

export const HorizontalLayout: Story = {
  render: () => html`
    <nx-radio-group label="Gender" direction="horizontal" value="female">
      <nx-radio value="female">Female</nx-radio>
      <nx-radio value="male">Male</nx-radio>
      <nx-radio value="other">Non-binary / Other</nx-radio>
    </nx-radio-group>
  `,
};

export const ValidationAndErrors: Story = {
  render: () => html`
    <nx-radio-group
      label="Delivery Speed"
      direction="vertical"
      required
      invalid
      errorText="Please choose a delivery method before proceeding to checkout."
    >
      <nx-radio value="standard">Standard Shipping (3-5 days)</nx-radio>
      <nx-radio value="express">Express Shipping (1-2 days)</nx-radio>
      <nx-radio value="same-day">Same-Day Courier</nx-radio>
    </nx-radio-group>
  `,
};

export const DisabledOptions: Story = {
  render: () => html`
    <nx-radio-group label="Seat Selection" direction="vertical" value="economy">
      <nx-radio value="economy">Economy Class (Available)</nx-radio>
      <nx-radio value="business" disabled>Business Class (Sold Out)</nx-radio>
      <nx-radio value="first" disabled>First Class (Sold Out)</nx-radio>
    </nx-radio-group>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <nx-radio-group
      label="Brand Theme Colors"
      direction="vertical"
      value="emerald"
      style="
        --label-color: #065f46;
        --gap: 20px;
      "
    >
      <nx-radio
        value="emerald"
        style="
          --border-color-checked: #10b981;
          --background-checked: #10b981;
          --size: 22px;
        "
      >
        Emerald Green Accent
      </nx-radio>

      <nx-radio
        value="rose"
        style="
          --border-color-checked: #f43f5e;
          --background-checked: #f43f5e;
          --size: 22px;
        "
      >
        Rose Pink Accent
      </nx-radio>
    </nx-radio-group>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(mark)`, `::part(label)`, `::part(container)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-radio-parts::part(mark) {
        box-shadow: 0 0 10px rgba(129, 69, 181, 0.35);
        border: 2px solid #8145b5;
        transition: transform 0.15s ease;
      }
      .custom-radio-parts:hover::part(mark) {
        transform: scale(1.1);
      }
      .custom-radio-parts::part(label) {
        font-weight: 600;
        color: #8145b5;
        letter-spacing: 0.02em;
      }
      .custom-radio-group-parts::part(container) {
        padding: 16px;
        border-radius: 12px;
        background: #faf5ff;
        border: 1px solid #f0abfc;
      }
    </style>

    <div style="max-width: 400px; font-family: sans-serif;">
      <nx-radio-group
        class="custom-radio-group-parts"
        label="Enhanced Plan Selection via Shadow Parts"
        value="pro"
      >
        <nx-radio class="custom-radio-parts" value="starter">Starter Sandbox</nx-radio>
        <nx-radio class="custom-radio-parts" value="pro">Pro Developer ($29/mo)</nx-radio>
        <nx-radio class="custom-radio-parts" value="enterprise">Enterprise Cloud</nx-radio>
      </nx-radio-group>
    </div>
  `,
};


