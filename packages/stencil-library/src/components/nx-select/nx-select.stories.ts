import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-select>` and `<nx-select-option>` provide an accessible, styled dropdown menu
 * for single-selection from a list of options. It supports floating popover menus,
 * keyboard arrow navigation, validation feedback, and CSS custom property styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Select',
  component: 'nx-select',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The select component system consists of:
- **\`<nx-select>\`**: The trigger and dropdown manager.
- **\`<nx-select-option>\`**: Individual menu options placed inside the default slot.

---

### How to Use Custom Styling

\`<nx-select>\` encapsulates its styles using Shadow DOM. You can customize dropdown appearance via
**CSS Custom Properties**.

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Select box background color | \`#ffffff\` |
| \`--color\` | Selected value text color | \`#0f172a\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-hover-color\` | Border color on hover | \`#94a3b8\` |
| \`--border-focus-color\` | Border and focus ring color | \`#8145b5\` |
| \`--border-error-color\` | Invalid state border color | \`#dc2626\` |
| \`--border-success-color\` | Success state border color | \`#16a34a\` |
| \`--border-radius\` | Corner radius | \`4px\` |
| \`--control-height\` | Height of select trigger input | \`40px\` |
| \`--placeholder-color\` | Placeholder text color | \`#64748b\` |
| \`--font-size\` | Font size of trigger text | \`16px\` |

#### 2. Usage Pattern
\`\`\`html
<nx-select label="Country" placeholder="Choose country..." value="us">
  <nx-select-option value="us">United States</nx-select-option>
  <nx-select-option value="ca">Canada</nx-select-option>
  <nx-select-option value="uk">United Kingdom</nx-select-option>
</nx-select>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label displayed above select trigger',
      defaultValue: 'Programming Language',
    },
    value: {
      control: 'text',
      description: 'Selected value',
      defaultValue: 'typescript',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when no option is selected',
      defaultValue: 'Choose language...',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables dropdown interaction',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks select as invalid with danger border',
      table: { defaultValue: { summary: 'false' } },
    },
    success: {
      control: 'boolean',
      description: 'Marks select as valid with green border',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Marks field required with an asterisk',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Programming Language',
    value: 'typescript',
    placeholder: 'Choose language...',
    disabled: false,
    invalid: false,
    success: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 340px; min-height: 220px;">
      <nx-select
        .label=${args.label}
        .value=${args.value}
        .placeholder=${args.placeholder}
        ?disabled=${args.disabled}
        ?invalid=${args.invalid}
        ?success=${args.success}
        ?required=${args.required}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
      >
        <nx-select-option value="javascript">JavaScript</nx-select-option>
        <nx-select-option value="typescript">TypeScript</nx-select-option>
        <nx-select-option value="python">Python</nx-select-option>
        <nx-select-option value="rust">Rust</nx-select-option>
        <nx-select-option value="go">Go</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 340px; min-height: 300px;">
      <nx-select label="Department (Valid)" value="engineering" success>
        <nx-select-option value="engineering">Engineering</nx-select-option>
        <nx-select-option value="product">Product Management</nx-select-option>
        <nx-select-option value="design">Design</nx-select-option>
      </nx-select>

      <nx-select label="Region (Required & Invalid)" invalid required placeholder="Select region...">
        <nx-select-option value="na">North America</nx-select-option>
        <nx-select-option value="eu">Europe</nx-select-option>
        <nx-select-option value="apac">Asia Pacific</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const DisabledOptions: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 220px;">
      <nx-select label="Delivery Slot" placeholder="Pick time slot...">
        <nx-select-option value="morning">Morning (9am - 12pm)</nx-select-option>
        <nx-select-option value="afternoon" disabled>Afternoon (1pm - 4pm) [Full]</nx-select-option>
        <nx-select-option value="evening">Evening (5pm - 8pm)</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 220px;">
      <nx-select
        label="Rounded Purple Select"
        value="dark"
        style="
          --border-color: #8145b5;
          --border-radius: 9999px;
          --border-focus-color: #6e389c;
        "
      >
        <nx-select-option value="light">Light Theme</nx-select-option>
        <nx-select-option value="dark">Dark Theme</nx-select-option>
        <nx-select-option value="system">System Synchronized</nx-select-option>
      </nx-select>
    </div>
  `,
};

