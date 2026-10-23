import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-chip>` represents an interactive compact element for filters, selections,
 * input tokens, and action triggers. It supports removable buttons, checkable
 * selection states, leading/trailing icon slots, and custom color themes.
 */
const meta: Meta = {
  title: 'NX Web Components/Chip',
  component: 'nx-chip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-chip>\` component represents tags, attributes, contact pills, and filter selections.
It features built-in support for:
- **Clickable chips**: Triggers \`nxClick\` events.
- **Selectable chips**: Toggles selection state with an animated checkmark, emitting \`nxSelect\`.
- **Removable chips**: Displays an accessible remove button emitting \`nxRemove\`.
- **Slots**: \`start\` slot for icons/avatars, \`end\` slot for custom trailing indicators.

---

### How to Use Custom Styling

\`<nx-chip>\` encapsulates its styles using Shadow DOM. Consumers can customize it via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-chip-bg\` | Background color | Derived from \`color\` token & \`variant\` |
| \`--nx-chip-text-color\` | Text and icon color | Contrast color matching variant |
| \`--nx-chip-border-color\` | Border color for outline / subtle variants | Matches theme color or transparent |
| \`--nx-chip-font-family\` | Font family of the chip label | \`sans-serif\` |

#### 2. Inline Style Customization
Pass CSS variables directly via \`style\`:
\`\`\`html
<nx-chip label="Design System" style="--nx-chip-bg: #e0e7ff; --nx-chip-text-color: #3730a3; --nx-chip-border-color: #c7d2fe;"></nx-chip>
\`\`\`

#### 3. Shadow Parts Styling (\`::part\`)
- \`::part(label)\`: Targets the chip text container.
- \`::part(check)\`: Targets the selection checkmark icon container.
- \`::part(remove-button)\`: Targets the delete/remove button element.

\`\`\`css
nx-chip::part(remove-button):hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Text label for the chip',
      defaultValue: 'Chip Label',
    },
    variant: {
      control: 'select',
      options: ['subtle', 'solid', 'outline'],
      description: 'Visual fill variant',
      table: { defaultValue: { summary: 'subtle' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info', 'dark', 'light', '#6366f1'],
      description: 'Theme color preset or custom hex color',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size preset of the chip',
      table: { defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded'],
      description: 'Corner radius shape',
      table: { defaultValue: { summary: 'pill' } },
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the chip responds to clicks and shows pointer cursor',
      table: { defaultValue: { summary: 'false' } },
    },
    selectable: {
      control: 'boolean',
      description: 'Whether the chip can be toggled selected/unselected',
      table: { defaultValue: { summary: 'false' } },
    },
    selected: {
      control: 'boolean',
      description: 'Current selection state when selectable is true',
      table: { defaultValue: { summary: 'false' } },
    },
    removable: {
      control: 'boolean',
      description: 'Shows a remove button that fires nxRemove',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables all interactions and dims opacity',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Chip Label',
    variant: 'subtle',
    color: 'primary',
    size: 'md',
    shape: 'pill',
    clickable: false,
    selectable: false,
    selected: false,
    removable: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-chip
      .label=${args.label}
      .variant=${args.variant}
      .color=${args.color}
      .size=${args.size}
      .shape=${args.shape}
      ?clickable=${args.clickable}
      ?selectable=${args.selectable}
      ?selected=${args.selected}
      ?removable=${args.removable}
      ?disabled=${args.disabled}
      @nxClick=${(e: CustomEvent) => console.log('nxClick:', e.detail)}
      @nxSelect=${(e: CustomEvent) => console.log('nxSelect:', e.detail)}
      @nxRemove=${(e: CustomEvent) => console.log('nxRemove:', e.detail)}
    ></nx-chip>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Subtle Variant (Default)</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <nx-chip variant="subtle" color="primary" label="Primary"></nx-chip>
          <nx-chip variant="subtle" color="secondary" label="Secondary"></nx-chip>
          <nx-chip variant="subtle" color="success" label="Success"></nx-chip>
          <nx-chip variant="subtle" color="warning" label="Warning"></nx-chip>
          <nx-chip variant="subtle" color="danger" label="Danger"></nx-chip>
          <nx-chip variant="subtle" color="info" label="Info"></nx-chip>
          <nx-chip variant="subtle" color="dark" label="Dark"></nx-chip>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Solid Variant</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <nx-chip variant="solid" color="primary" label="Primary"></nx-chip>
          <nx-chip variant="solid" color="secondary" label="Secondary"></nx-chip>
          <nx-chip variant="solid" color="success" label="Success"></nx-chip>
          <nx-chip variant="solid" color="warning" label="Warning"></nx-chip>
          <nx-chip variant="solid" color="danger" label="Danger"></nx-chip>
          <nx-chip variant="solid" color="info" label="Info"></nx-chip>
          <nx-chip variant="solid" color="dark" label="Dark"></nx-chip>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Outline Variant</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <nx-chip variant="outline" color="primary" label="Primary"></nx-chip>
          <nx-chip variant="outline" color="secondary" label="Secondary"></nx-chip>
          <nx-chip variant="outline" color="success" label="Success"></nx-chip>
          <nx-chip variant="outline" color="warning" label="Warning"></nx-chip>
          <nx-chip variant="outline" color="danger" label="Danger"></nx-chip>
          <nx-chip variant="outline" color="info" label="Info"></nx-chip>
          <nx-chip variant="outline" color="dark" label="Dark"></nx-chip>
        </div>
      </div>
    </div>
  `,
};

export const SizesAndShapes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Sizes (sm, md, lg)</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <nx-chip size="sm" label="Small (sm)"></nx-chip>
          <nx-chip size="md" label="Medium (md)"></nx-chip>
          <nx-chip size="lg" label="Large (lg)"></nx-chip>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Shapes (pill vs rounded)</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <nx-chip shape="pill" label="Pill Shape"></nx-chip>
          <nx-chip shape="rounded" label="Rounded Shape"></nx-chip>
          <nx-chip shape="rounded" variant="outline" label="Rounded Outline"></nx-chip>
        </div>
      </div>
    </div>
  `,
};

export const InteractiveStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Clickable & Removable</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <nx-chip clickable label="Clickable Chip" @nxClick=${() => alert('Chip clicked!')}></nx-chip>
          <nx-chip removable label="Removable Tag" @nxRemove=${(e: CustomEvent) => console.log('Removed:', e)}></nx-chip>
          <nx-chip clickable removable color="danger" label="Dismiss Alert"></nx-chip>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Selectable Filters</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <nx-chip selectable label="Angular" value="angular"></nx-chip>
          <nx-chip selectable selected label="React (Selected)" value="react"></nx-chip>
          <nx-chip selectable selected color="success" label="Vue (Selected)" value="vue"></nx-chip>
          <nx-chip selectable label="Svelte" value="svelte"></nx-chip>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Disabled State</h4>
        <div style="display: flex; gap: 12px; align-items: center;">
          <nx-chip disabled label="Disabled Subtle"></nx-chip>
          <nx-chip disabled variant="solid" label="Disabled Solid"></nx-chip>
          <nx-chip disabled removable label="Disabled Removable"></nx-chip>
        </div>
      </div>
    </div>
  `,
};

export const SlotsAndComposition: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <nx-chip label="Verified User">
        <nx-icon slot="start" name="check" size="14"></nx-icon>
      </nx-chip>

      <nx-chip label="Sarah Connor" color="secondary">
        <div slot="start" style="width: 20px; height: 20px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">
          SC
        </div>
      </nx-chip>

      <nx-chip label="Starred Repo" color="warning" variant="outline">
        <nx-icon slot="start" name="star" size="14"></nx-icon>
        <span slot="end" style="font-size: 11px; opacity: 0.75; font-weight: bold;">1.2k</span>
      </nx-chip>

      <nx-chip removable label="Location: San Francisco">
        <nx-icon slot="start" name="map-pin" size="14"></nx-icon>
      </nx-chip>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center;">
      <nx-chip
        label="Neon Purple"
        style="--nx-chip-bg: #8b5cf6; --nx-chip-text-color: #ffffff; font-weight: 600;"
      ></nx-chip>

      <nx-chip
        variant="outline"
        label="Emerald Accent"
        style="--nx-chip-border-color: #10b981; --nx-chip-text-color: #047857; font-weight: 600;"
      ></nx-chip>

      <nx-chip
        label="Cyberpunk Gradient"
        style="--nx-chip-bg: linear-gradient(135deg, #f43f5e, #fb923c); --nx-chip-text-color: #ffffff; font-weight: bold;"
      ></nx-chip>
    </div>
  `,
};

