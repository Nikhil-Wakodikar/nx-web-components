import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-toggle>` is an accessible switch component for binary on/off settings.
 * It provides smooth thumb sliding animations, size presets, customizable colors,
 * label placement controls, and validation states.
 */
const meta: Meta = {
  title: 'NX Web Components/Toggle',
  component: 'nx-toggle',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-toggle>\` component acts as a switch control representing on/off or enabled/disabled states.
It includes smooth sliding animations, ARIA switch semantics, keyboard activation,
and comprehensive styling hooks.

---

### How to Use Custom Styling

\`<nx-toggle>\` uses Shadow DOM encapsulation. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--track-width\` | Width of the toggle track | Set by size preset |
| \`--track-height\` | Height of the toggle track | Set by size preset |
| \`--track-background\` | Unchecked track color | \`#cbd5e1\` |
| \`--track-background-checked\` | Checked track color | \`#8145b5\` |
| \`--thumb-background\` | Sliding thumb circle color | \`#ffffff\` |
| \`--thumb-size\` | Diameter of the thumb circle | Set by size preset |
| \`--thumb-shadow\` | Box shadow for the thumb | Soft elevation shadow |
| \`--border-color-checked\` | Checked border color | \`#8145b5\` |
| \`--label-color\` | Label text color | \`#0f172a\` |
| \`--label-font-size\` | Label text size | \`14px\` |
| \`--gap\` | Gap between track and label | \`10px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(container)\`: The flex wrapper containing track and label.
- \`::part(track)\`: The pill-shaped track element.
- \`::part(thumb)\`: The sliding circular indicator.
- \`::part(label)\`: The label text element.
- \`::part(helper-text)\`: The supporting helper message.
- \`::part(error-text)\`: The invalid error message.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label for the toggle switch',
      defaultValue: 'Enable Push Notifications',
    },
    checked: {
      control: 'boolean',
      description: 'Whether switch is currently toggled on',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'medium', 'large'],
      description: 'Toggle switch dimensions preset',
      table: { defaultValue: { summary: 'default' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interactions and dims opacity',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks toggle as invalid with error border',
      table: { defaultValue: { summary: 'false' } },
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'start'],
      description: 'Position of label relative to the toggle switch',
      table: { defaultValue: { summary: 'end' } },
    },
    helperText: {
      control: 'text',
      description: 'Guidance text placed below the toggle',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid is true',
    },
    color: {
      control: 'color',
      description: 'Custom active track fill color',
    },
  },
  args: {
    label: 'Enable Push Notifications',
    checked: false,
    size: 'default',
    disabled: false,
    invalid: false,
    labelPlacement: 'end',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-toggle
      .label=${args.label}
      ?checked=${args.checked}
      .size=${args.size}
      ?disabled=${args.disabled}
      ?invalid=${args.invalid}
      .labelPlacement=${args.labelPlacement}
      .helperText=${args.helperText}
      .errorText=${args.errorText}
      .color=${args.color}
      @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
    ></nx-toggle>
  `,
};

export const Sizing: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <nx-toggle size="small" label="Small Switch (small)"></nx-toggle>
      <nx-toggle size="default" checked label="Default Switch (default)"></nx-toggle>
      <nx-toggle size="large" checked label="Large Switch (large)"></nx-toggle>
    </div>
  `,
};

export const LabelPlacementAndLayout: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 400px;">
      <nx-toggle labelPlacement="end" label="Label on Right (Default)"></nx-toggle>
      <nx-toggle labelPlacement="start" label="Label on Left"></nx-toggle>
      <div style="border: 1px solid #e2e8f0; padding: 14px 16px; border-radius: 8px;">
        <nx-toggle
          justify="space-between"
          labelPlacement="start"
          label="Automatic Cloud Backups"
          helperText="Backs up your database snapshot every 24 hours"
          checked
          style="width: 100%; display: block;"
        ></nx-toggle>
      </div>
    </div>
  `,
};

export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-toggle label="Normal Unchecked"></nx-toggle>
      <nx-toggle checked label="Normal Checked"></nx-toggle>
      <nx-toggle disabled label="Disabled Unchecked"></nx-toggle>
      <nx-toggle disabled checked label="Disabled Checked"></nx-toggle>
      <nx-toggle invalid errorText="This setting cannot be disabled." checked label="Invalid State"></nx-toggle>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <nx-toggle
        checked
        label="Emerald Accent Switch"
        style="
          --track-background-checked: #10b981;
          --border-color-checked: #10b981;
        "
      ></nx-toggle>

      <nx-toggle
        checked
        label="Cyber Neon Gradient Track"
        style="
          --track-background-checked: linear-gradient(135deg, #6366f1, #ec4899);
          --border-color-checked: transparent;
        "
      ></nx-toggle>
    </div>
  `,
};

