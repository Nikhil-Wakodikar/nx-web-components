import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-checkbox>` is an accessible form selection control supporting checked,
 * unchecked, and indeterminate states, label placement variations, error/helper texts,
 * and comprehensive CSS Custom Property theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Checkbox',
  component: 'nx-checkbox',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-checkbox>\` component provides an accessible checkbox input with full keyboard
navigation (Space / Enter to toggle), support for three states (\`checked\`, \`unchecked\`,
and \`indeterminate\`), flexible label alignments, and validation messaging.

---

### How to Use Custom Styling

\`<nx-checkbox>\` encapsulates its styles using Shadow DOM. Consumers can customize it via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--size\` | Checkbox box dimensions (width & height) | \`18px\` |
| \`--border-width\` | Box border thickness | \`1.5px\` |
| \`--border-color\` | Default unchecked border color | \`#94a3b8\` |
| \`--border-hover-color\` | Hover state border color | \`#475569\` |
| \`--border-radius\` | Checkbox corner curvature | \`4px\` |
| \`--background\` | Unchecked background color | \`transparent\` |
| \`--checked-background\` | Active/checked fill background | \`#8145b5\` |
| \`--checked-border-color\` | Border color when checked | \`#8145b5\` |
| \`--check-color\` | Checkmark glyph color | \`#ffffff\` |
| \`--border-error-color\` | Border color when invalid | \`#dc2626\` |
| \`--label-color\` | Checkbox label text color | \`#0f172a\` |
| \`--label-font-size\` | Label font size | \`14px\` |
| \`--gap\` | Space between checkbox box and label | \`8px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(container)\`: The flex wrapper holding the box and label.
- \`::part(mark)\`: The outer box element containing the checkmark SVG.
- \`::part(label)\`: The label text container.
- \`::part(helper-text)\`: The supporting helper message.
- \`::part(error-text)\`: The invalid error message.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label accompanying the checkbox',
      defaultValue: 'I accept the terms and conditions',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is currently checked',
      table: { defaultValue: { summary: 'false' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Displays a horizontal dash indicator for partially selected trees',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interactions and dims opacity',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Applies error border and displays errorText',
      table: { defaultValue: { summary: 'false' } },
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start'],
      description: 'Position of label relative to checkbox mark',
      table: { defaultValue: { summary: 'end' } },
    },
    helperText: {
      control: 'text',
      description: 'Guidance text beneath the checkbox',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid is true',
    },
    color: {
      control: 'color',
      description: 'Theme color override for checked fill',
    },
  },
  args: {
    label: 'I accept the terms and conditions',
    checked: false,
    indeterminate: false,
    disabled: false,
    invalid: false,
    labelPlacement: 'end',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-checkbox
      .label=${args.label}
      ?checked=${args.checked}
      ?indeterminate=${args.indeterminate}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
      .labelPlacement=${args.labelPlacement}
      .helperText=${args.helperText}
      .errorText=${args.errorText}
      .color=${args.color}
      @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
    ></nx-checkbox>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-checkbox label="Unchecked Checkbox"></nx-checkbox>
      <nx-checkbox checked label="Checked Checkbox"></nx-checkbox>
      <nx-checkbox indeterminate label="Indeterminate (Parent Category)"></nx-checkbox>
      <nx-checkbox disabled label="Disabled Unchecked"></nx-checkbox>
      <nx-checkbox disabled checked label="Disabled Checked"></nx-checkbox>
    </div>
  `,
};

export const LabelPlacementAndLayout: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 380px;">
      <nx-checkbox labelPlacement="end" label="Label at End (Default)"></nx-checkbox>
      <nx-checkbox labelPlacement="start" label="Label at Start"></nx-checkbox>
      <div style="border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px;">
        <nx-checkbox
          justify="space-between"
          labelPlacement="start"
          label="Full-Width Justified Option"
          style="width: 100%; display: block;"
        ></nx-checkbox>
      </div>
    </div>
  `,
};

export const ValidationAndHelpers: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <nx-checkbox
        checked
        label="Subscribe to weekly newsletter"
        helperText="You can unsubscribe at any time."
      ></nx-checkbox>

      <nx-checkbox
        invalid
        label="I agree to the Terms of Service"
        errorText="You must accept the terms before proceeding."
      ></nx-checkbox>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <nx-checkbox
        checked
        label="Emerald Green Rounded Checkbox"
        style="
          --checked-background: #10b981;
          --checked-border-color: #10b981;
          --border-radius: 9999px;
          --size: 22px;
        "
      ></nx-checkbox>

      <nx-checkbox
        checked
        label="Rose Pink Large Checkbox"
        style="
          --checked-background: #ec4899;
          --checked-border-color: #ec4899;
          --size: 24px;
          --label-font-size: 16px;
        "
      ></nx-checkbox>
    </div>
  `,
};

