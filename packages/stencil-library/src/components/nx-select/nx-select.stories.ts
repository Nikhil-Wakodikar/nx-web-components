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

\`<nx-select>\` and \`<nx-select-option>\` encapsulate styles using Shadow DOM. You can customize the appearance via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. \`<nx-select>\` Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Select box background color | \`transparent\` |
| \`--background-hover\` | Select box background on hover | \`transparent\` |
| \`--background-disabled\` | Select box background when disabled | \`#f1f5f9\` |
| \`--color\` | Selected value text color | \`#0f172a\` |
| \`--placeholder-color\` | Placeholder text color | \`#64748b\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-hover-color\` | Border color on hover | \`#64748b\` |
| \`--border-focus-color\` | Border and focus outline color | \`#8145b5\` |
| \`--border-radius\` | Trigger corner radius | \`4px\` |
| \`--control-height\` | Height of select trigger input | \`48px\` |
| \`--padding\` | Trigger padding | \`12px 14px\` |
| \`--label-color\` | Field label text color | \`#0f172a\` |
| \`--chevron-color\` | Dropdown chevron arrow color | \`#64748b\` |
| \`--panel-background\` | Dropdown panel background color | \`#ffffff\` |
| \`--panel-border-color\` | Dropdown panel border color | \`var(--border-color)\` |
| \`--panel-border-radius\` | Dropdown panel corner radius | \`var(--border-radius)\` |
| \`--panel-box-shadow\` | Dropdown panel elevation shadow | \`0 4px 12px rgba(0, 0, 0, 0.1)\` |
| \`--panel-max-height\` | Maximum height of scrollable panel | \`240px\` |
| \`--option-background-hover\` | Inherited hover background for child options | \`#f6f0fa\` |
| \`--option-background-selected\` | Inherited selected background for child options | \`#f6f0fa\` |
| \`--option-color-selected\` | Inherited selected text color | \`#8145b5\` |
| \`--option-checkmark-color\` | Inherited checkmark icon color | \`#8145b5\` |

#### 2. \`<nx-select-option>\` CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Option background color | \`transparent\` |
| \`--background-hover\` | Background on hover/active | Inherits \`--option-background-hover\` |
| \`--background-selected\` | Background when selected | Inherits \`--option-background-selected\` |
| \`--color\` | Option text color | Inherits \`--option-color\` (\`#1e293b\`) |
| \`--color-selected\` | Text color when selected | Inherits \`--option-color-selected\` (\`#8145b5\`) |
| \`--color-disabled\` | Text color when disabled | Inherits \`--option-color-disabled\` (\`#94a3b8\`) |
| \`--checkmark-color\` | Selected checkmark color | Inherits \`--option-checkmark-color\` (\`#8145b5\`) |
| \`--border-radius\` | Option corner radius | Inherits \`--option-border-radius\` (\`4px\`) |
| \`--padding\` | Option internal padding | Inherits \`--option-padding\` (\`9px 12px\`) |
| \`--min-height\` | Option minimum height | Inherits \`--option-min-height\` (\`40px\`) |

#### 3. Shadow Parts Styling (\`::part\`)
- \`nx-select::part(trigger)\`: The select button trigger.
- \`nx-select::part(label)\`: The label element above the trigger.
- \`nx-select::part(panel)\`: The dropdown popover container.
- \`nx-select::part(chevron)\`: The chevron SVG arrow.
- \`nx-select::part(value)\`: The selected text label.
- \`nx-select-option::part(checkmark)\`: The checkmark symbol on selected options.

#### 4. Usage Pattern
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
    <div style="max-width: 340px; min-height: 240px; font-family: sans-serif;">
      <nx-select
        label="Brand Purple Select"
        value="pro"
        style="
          --border-color: #8145b5;
          --border-focus-color: #6e389c;
          --border-radius: 8px;
          --label-color: #8145b5;
          --panel-border-color: #8145b5;
          --panel-border-radius: 8px;
          --panel-box-shadow: 0 10px 25px rgba(129, 69, 181, 0.15);
          --option-background-hover: #f3e8ff;
          --option-background-selected: #f3e8ff;
          --option-color-selected: #8145b5;
          --option-checkmark-color: #8145b5;
        "
      >
        <nx-select-option value="starter">Starter Plan</nx-select-option>
        <nx-select-option value="pro">Professional Plan</nx-select-option>
        <nx-select-option value="enterprise">Enterprise Cloud</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const CustomStylingOceanPill: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 240px; font-family: sans-serif;">
      <nx-select
        label="Ocean Blue Pill Select"
        value="monthly"
        style="
          --border-color: #0284c7;
          --border-focus-color: #0369a1;
          --border-radius: 9999px;
          --padding: 10px 18px;
          --panel-border-radius: 12px;
          --panel-border-color: #e0f2fe;
          --option-background-hover: #e0f2fe;
          --option-background-selected: #e0f2fe;
          --option-color-selected: #0284c7;
          --option-checkmark-color: #0284c7;
          --option-border-radius: 8px;
        "
      >
        <nx-select-option value="weekly">Weekly Billing</nx-select-option>
        <nx-select-option value="monthly">Monthly Billing</nx-select-option>
        <nx-select-option value="annual">Annual Billing (Save 20%)</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const CustomStylingDarkMode: Story = {
  render: () => html`
    <div
      style="
        max-width: 400px;
        min-height: 280px;
        padding: 24px;
        background: #0f172a;
        border-radius: 14px;
        border: 1px solid #1e293b;
        font-family: sans-serif;
      "
    >
      <h4 style="margin: 0 0 16px; font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
        Dark Mode Theme Customization
      </h4>

      <nx-select
        label="Server Deployment Region"
        value="us-east"
        style="
          --background: #1e293b;
          --background-hover: #1e293b;
          --background-focus: #1e293b;
          --color: #f8fafc;
          --label-color: #cbd5e1;
          --placeholder-color: #64748b;
          --border-color: #334155;
          --border-hover-color: #475569;
          --border-focus-color: #8145b5;
          --chevron-color: #94a3b8;
          --panel-background: #1e293b;
          --panel-border-color: #334155;
          --panel-box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
          --option-color: #f1f5f9;
          --option-background-hover: #334155;
          --option-background-selected: #334155;
          --option-color-selected: #c084fc;
          --option-checkmark-color: #c084fc;
        "
      >
        <nx-select-option value="us-east">US East (N. Virginia)</nx-select-option>
        <nx-select-option value="us-west">US West (Oregon)</nx-select-option>
        <nx-select-option value="eu-central">EU Central (Frankfurt)</nx-select-option>
        <nx-select-option value="ap-southeast">AP Southeast (Tokyo)</nx-select-option>
      </nx-select>
    </div>
  `,
};

export const CustomOptionStyling: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 240px; font-family: sans-serif;">
      <nx-select label="Priority Selection" value="urgent">
        <nx-select-option
          value="low"
          style="--color-selected: #16a34a; --background-hover: #dcfce7; --checkmark-color: #16a34a;"
        >
          Low Priority
        </nx-select-option>

        <nx-select-option
          value="medium"
          style="--color-selected: #2563eb; --background-hover: #dbeafe; --checkmark-color: #2563eb;"
        >
          Normal Priority
        </nx-select-option>

        <nx-select-option
          value="urgent"
          style="--color-selected: #dc2626; --background-hover: #fee2e2; --checkmark-color: #dc2626; font-weight: 600;"
        >
          Urgent / Critical
        </nx-select-option>
      </nx-select>
    </div>
  `,
};

export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .styled-select-parts::part(trigger) {
        border: 2px dashed #8145b5;
        box-shadow: 0 2px 8px rgba(129, 69, 181, 0.1);
      }
      .styled-select-parts::part(panel) {
        border: 2px solid #8145b5;
        border-radius: 12px;
      }
      .styled-select-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: #8145b5;
      }
    </style>

    <div style="max-width: 340px; min-height: 240px; font-family: sans-serif;">
      <nx-select
        class="styled-select-parts"
        label="Dashed Trigger via ::part"
        value="analytics"
      >
        <nx-select-option value="overview">Overview Dashboard</nx-select-option>
        <nx-select-option value="analytics">Deep Analytics</nx-select-option>
        <nx-select-option value="reports">Export Reports</nx-select-option>
      </nx-select>
    </div>
  `,
};


