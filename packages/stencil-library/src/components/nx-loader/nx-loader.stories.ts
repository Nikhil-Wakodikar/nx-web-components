import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-loader>` is an accessible, customizable loading indicator component supporting
 * multiple animated variants (spinner, dots, bars, pulse), sizing scales, custom colors,
 * labels, and container overlay modes.
 */
const meta: Meta = {
  title: 'NX Web Components/Loader',
  component: 'nx-loader',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-loader>\` component indicates waiting or in-flight background operations.
It supports:
- **Variants**: \`spinner\` (circular SVG), \`dots\` (jumping dots), \`bars\` (equalizer waves), and \`pulse\` (expanding rings).
- **Sizing**: \`small\` (16px), \`default\` / \`medium\` (24px), \`large\` (36px), \`xlarge\` (48px), or explicit pixel numbers.
- **Labels**: Accompanying status message placed at \`start\`, \`end\`, \`top\`, or \`bottom\`.
- **Modes**: Inline, container \`overlay\`, or \`fullscreen\`.

---

### How to Use Custom Styling

\`<nx-loader>\` encapsulates its styles using Shadow DOM. You can customize loader appearance via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--color\` | Indicator primary color | \`var(--nx-color-primary, #8145b5)\` |
| \`--track-color\` | Spinner background track color | \`var(--nx-color-gray-200, #e2e8f0)\` |
| \`--size\` | Indicator width and height | \`24px\` |
| \`--duration\` | Animation loop duration | \`0.85s\` |
| \`--label-color\` | Accompanying label text color | \`#334155\` |
| \`--label-font-size\` | Font size of label text | \`14px\` |
| \`--gap\` | Gap between indicator and label | \`8px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(container)\`: The outer wrapper for indicator and label.
- \`::part(indicator)\`: The animated spinner, dots, bars, or pulse container.
- \`::part(label)\`: The text label element.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['spinner', 'dots', 'bars', 'pulse'],
      description: 'Animation pattern',
      table: { defaultValue: { summary: 'spinner' } },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large', 'xlarge'],
      description: 'Size preset or pixel dimensions',
      table: { defaultValue: { summary: 'default' } },
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'dark',
        'medium',
        '#8b5cf6',
        '#ec4899',
      ],
      description: 'Color token name or custom CSS color string',
      table: { defaultValue: { summary: 'primary' } },
    },
    label: {
      control: 'text',
      description: 'Status label text',
    },
    labelPlacement: {
      control: 'select',
      options: ['end', 'bottom', 'start', 'top'],
      description: 'Position of label relative to indicator',
      table: { defaultValue: { summary: 'end' } },
    },
    paused: {
      control: 'boolean',
      description: 'Freezes animation loop',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'spinner',
    size: 'default',
    color: 'primary',
    label: 'Loading...',
    labelPlacement: 'end',
    paused: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-loader
      .variant=${args.variant}
      .size=${args.size}
      .color=${args.color}
      .label=${args.label}
      .labelPlacement=${args.labelPlacement}
      ?paused=${args.paused}
    ></nx-loader>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; font-family: sans-serif;">
      <nx-loader variant="spinner" label="Spinner"></nx-loader>
      <nx-loader variant="dots" color="info" label="Dots"></nx-loader>
      <nx-loader variant="bars" color="success" label="Bars"></nx-loader>
      <nx-loader variant="pulse" color="warning" label="Pulse"></nx-loader>
    </div>
  `,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      <nx-loader size="small" label="Small (16px)"></nx-loader>
      <nx-loader size="default" label="Default (24px)"></nx-loader>
      <nx-loader size="large" label="Large (36px)"></nx-loader>
      <nx-loader size="xlarge" label="XLarge (48px)"></nx-loader>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; font-family: sans-serif;">
      <nx-loader
        variant="spinner"
        label="Cyber Neon Spinner"
        style="
          --color: #06b6d4;
          --track-color: #cffafe;
          --label-color: #0891b2;
          --label-font-size: 15px;
          --size: 32px;
        "
      ></nx-loader>

      <nx-loader
        variant="dots"
        label="Warm Amber Dots"
        style="
          --color: #f59e0b;
          --label-color: #b45309;
          --size: 28px;
        "
      ></nx-loader>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(indicator)`, `::part(label)`, `::part(container)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-loader-parts::part(container) {
        padding: 10px 18px;
        border-radius: 9999px;
        background: #fdf4ff;
        border: 1px solid #f0abfc;
        box-shadow: 0 4px 12px rgba(129, 69, 181, 0.15);
      }
      .custom-loader-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        color: #8145b5;
      }
    </style>

    <div style="font-family: sans-serif;">
      <nx-loader
        class="custom-loader-parts"
        color="primary"
        label="Syncing Workspace..."
      ></nx-loader>
    </div>
  `,
};

