import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-progress>` and `<nx-loader>` visualize loading progress, background tasks, and waiting states.
 * Supports linear bars, circular rings, indeterminate animations, buffer progress,
 * and diverse loader variants (spinner, dots, bars, pulse).
 */
const meta: Meta = {
  title: 'NX Web Components/Progress & Loader',
  component: 'nx-progress',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
This suite documents two complementary progress and loading indicators:
- **\`<nx-progress>\`**: Displays numerical or indeterminate progress in linear or circular format.
- **\`<nx-loader>\`**: Renders dynamic waiting animations (\`spinner\`, \`dots\`, \`bars\`, \`pulse\`) with optional text labels and fullscreen overlays.

---

### How to Use Custom Styling

Both components use Shadow DOM encapsulation. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties for \`<nx-progress>\`
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--color\` | Progress fill bar / circle color | \`#8145b5\` |
| \`--track-color\` | Inactive background track color | \`#e2e8f0\` |
| \`--buffer-color\` | Pre-buffered progress bar color | \`#ebdef4\` |
| \`--height\` | Thickness of linear bar | \`4px\` - \`12px\` |
| \`--circular-size\` | Diameter of circular ring | \`48px\` |
| \`--border-radius\` | Corner radius of linear bar | \`9999px\` |
| \`--label-color\` | Label text color | \`#1e293b\` |
| \`--value-color\` | Percentage text color | \`#475569\` |

#### 2. Public CSS Custom Properties for \`<nx-loader>\`
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--color\` | Loader indicator color | \`#8145b5\` |
| \`--size\` | Spinner diameter / loader dimensions | \`24px\` |
| \`--duration\` | Animation cycle speed | \`1s\` |
| \`--label-color\` | Accompanying label color | \`#334155\` |
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Current progress value (0 to max)',
      defaultValue: 65,
    },
    max: {
      control: 'number',
      description: 'Maximum progress value',
      table: { defaultValue: { summary: '100' } },
    },
    variant: {
      control: 'select',
      options: ['linear', 'circular'],
      description: 'Progress presentation format',
      table: { defaultValue: { summary: 'linear' } },
    },
    indeterminate: {
      control: 'boolean',
      description: 'Continuous looping animation for unknown completion time',
      table: { defaultValue: { summary: 'false' } },
    },
    showValue: {
      control: 'boolean',
      description: 'Displays current value / percentage text',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Descriptive title rendered above the progress bar',
      defaultValue: 'Uploading Assets',
    },
    striped: {
      control: 'boolean',
      description: 'Applies diagonal stripe pattern to fill bar',
      table: { defaultValue: { summary: 'false' } },
    },
    animated: {
      control: 'boolean',
      description: 'Animates the striped pattern',
      table: { defaultValue: { summary: 'false' } },
    },
    color: {
      control: 'color',
      description: 'Color theme override',
    },
  },
  args: {
    value: 65,
    max: 100,
    variant: 'linear',
    indeterminate: false,
    showValue: true,
    label: 'Uploading Assets',
    striped: false,
    animated: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 450px;">
      <nx-progress
        .value=${args.value}
        .max=${args.max}
        .variant=${args.variant}
        ?indeterminate=${args.indeterminate}
        ?showValue=${args.showValue}
        .label=${args.label}
        ?striped=${args.striped}
        ?animated=${args.animated}
        .color=${args.color}
      ></nx-progress>
    </div>
  `,
};

export const CircularProgress: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; align-items: center;">
      <nx-progress variant="circular" value="25" showValue size="small"></nx-progress>
      <nx-progress variant="circular" value="65" showValue size="default"></nx-progress>
      <nx-progress variant="circular" value="90" showValue size="large" color="#10b981"></nx-progress>
      <nx-progress variant="circular" indeterminate label="Processing..."></nx-progress>
    </div>
  `,
};

export const LinearWithBufferAndStripes: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 450px;">
      <nx-progress
        label="Video Stream Buffering"
        value="45"
        buffer="75"
        showValue
      ></nx-progress>

      <nx-progress
        label="Animated Upload Task"
        value="70"
        striped
        animated
        color="#0284c7"
      ></nx-progress>

      <nx-progress
        label="Indeterminate Linear Sync"
        indeterminate
        color="#8145b5"
      ></nx-progress>
    </div>
  `,
};

export const LoaderVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <h4 style="margin: 0; font-size: 14px; color: #64748b;">nx-loader Indicator Styles</h4>
      <div style="display: flex; gap: 36px; align-items: center; flex-wrap: wrap;">
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <nx-loader variant="spinner" size="32" color="primary"></nx-loader>
          <span style="font-size: 12px; color: #64748b;">spinner</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <nx-loader variant="dots" size="32" color="primary"></nx-loader>
          <span style="font-size: 12px; color: #64748b;">dots</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <nx-loader variant="bars" size="32" color="primary"></nx-loader>
          <span style="font-size: 12px; color: #64748b;">bars</span>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
          <nx-loader variant="pulse" size="32" color="primary"></nx-loader>
          <span style="font-size: 12px; color: #64748b;">pulse</span>
        </div>
      </div>

      <div style="padding-top: 12px;">
        <nx-loader variant="spinner" label="Connecting to secure gateway..." labelPlacement="end"></nx-loader>
      </div>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 450px;">
      <nx-progress
        label="Neon Gradient Progress"
        value="80"
        showValue
        style="
          --color: linear-gradient(90deg, #6366f1, #ec4899);
          --track-color: #1e1e2e;
          --height: 10px;
          --value-color: #ec4899;
        "
      ></nx-progress>

      <div style="display: flex; gap: 24px; align-items: center;">
        <nx-loader
          variant="spinner"
          size="40"
          style="
            --color: #ec4899;
            --track-color: #fce7f3;
            --duration: 0.6s;
          "
          label="Fast Neon Spinner"
        ></nx-loader>
      </div>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(track)`, `::part(fill)`, `::part(label)`, `::part(value)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-progress-parts::part(track) {
        border-radius: 9999px;
        padding: 2px;
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
      }
      .custom-progress-parts::part(fill) {
        border-radius: 9999px;
        background: linear-gradient(90deg, #8145b5, #ec4899);
      }
      .custom-progress-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: #8145b5;
        font-size: 11px;
      }
      .custom-progress-parts::part(value) {
        font-weight: 700;
        color: #ec4899;
      }
    </style>

    <div style="max-width: 450px; font-family: sans-serif;">
      <nx-progress
        class="custom-progress-parts"
        label="Encapsulated Gradient Bar via ::part(fill)"
        value="65"
        showValue
      ></nx-progress>
    </div>
  `,
};


