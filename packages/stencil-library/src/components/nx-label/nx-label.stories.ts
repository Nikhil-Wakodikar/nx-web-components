import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-label>` is an accessible form label component supporting required indicators (*),
 * optional badges, leading/trailing icon slots, stacked/inline orientations, and typography controls.
 */
const meta: Meta = {
  title: 'NX Web Components/Label',
  component: 'nx-label',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-label>\` component pairs with form inputs to provide accessible, semantic field labels.
Features include:
- **Required & Optional Indicators**: Displays red asterisk \`*\` when \`required\` or an \`(Optional)\` tag when \`optional\`.
- **Slots**: \`start\` and \`end\` slots for icons, tooltips, or info popovers.
- **Form Association**: Links to native or web component inputs via \`htmlFor\`.

---

### How to Use Custom Styling

\`<nx-label>\` uses Shadow DOM encapsulation. Consumers can customize it via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-label-color\` | Label text color | \`#334155\` |
| \`--nx-label-font-size\` | Font size override | Set by size preset (\`14px\` md) |
| \`--nx-label-font-weight\` | Font weight override | \`500\` (medium) |
| \`--nx-label-gap\` | Gap between label text and indicators/slots | \`6px\` |
| \`--nx-label-required-color\` | Color of required asterisk | \`#dc2626\` |
| \`--nx-label-optional-color\` | Color of optional badge text | \`#94a3b8\` |
| \`--nx-label-font-family\` | Font family override | Rubik / system sans-serif |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(label)\`: The root label element.
- \`::part(text)\`: The main label text container.
- \`::part(required)\`: The required asterisk indicator.
- \`::part(optional)\`: The optional badge element.
- \`::part(start)\` & \`::part(end)\`: Slot containers for adornments.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Font size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    weight: {
      control: 'select',
      options: ['regular', 'medium'],
      description: 'Font weight',
      table: { defaultValue: { summary: 'medium' } },
    },
    required: {
      control: 'boolean',
      description: 'Displays a red asterisk required indicator',
      table: { defaultValue: { summary: 'false' } },
    },
    optional: {
      control: 'boolean',
      description: 'Displays an (Optional) tag beside the label',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dims label appearance for disabled form fields',
      table: { defaultValue: { summary: 'false' } },
    },
    truncate: {
      control: 'boolean',
      description: 'Truncates long label text with an ellipsis',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    size: 'md',
    weight: 'medium',
    required: false,
    optional: false,
    disabled: false,
    truncate: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-label
      .size=${args.size}
      .weight=${args.weight}
      ?required=${args.required}
      ?optional=${args.optional}
      ?disabled=${args.disabled}
      ?truncate=${args.truncate}
    >
      Full Legal Name
    </nx-label>
  `,
};

export const SizingAndWeights: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-label size="sm">Small Label (sm - 12px)</nx-label>
      <nx-label size="md">Medium Label (md - 14px)</nx-label>
      <nx-label size="lg">Large Label (lg - 16px)</nx-label>
      <nx-label weight="regular">Regular Weight (400)</nx-label>
      <nx-label weight="medium">Medium Weight (500)</nx-label>
    </div>
  `,
};

export const IndicatorsAndSlots: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
      <nx-label required>Billing Address</nx-label>
      <nx-label optional>Apartment or Suite Number</nx-label>
      <nx-label required>
        <nx-icon slot="start" name="lock" size="14" color="medium"></nx-icon>
        Secret Recovery Key
        <nx-icon slot="end" name="help-circle" size="14" color="medium" style="cursor: pointer;"></nx-icon>
      </nx-label>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-label
        required
        style="
          --nx-label-color: #6366f1;
          --nx-label-font-size: 16px;
          --nx-label-required-color: #ec4899;
        "
      >
        Indigo Themed Label with Pink Asterisk
      </nx-label>
    </div>
  `,
};

