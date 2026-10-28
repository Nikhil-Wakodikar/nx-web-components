import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-time-picker>` is an accessible time input control supporting 12-hour (AM/PM) and
 * 24-hour military formats, customizable minute/second intervals, a "Now" shortcut button,
 * and custom color theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Time Picker',
  component: 'nx-time-picker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-time-picker>\` component allows users to enter or choose a time value.
Features include:
- **12h vs 24h Formats**: Supports AM/PM meridian indicators or 24h standard military time.
- **Granularity**: Optional seconds display (\`showSeconds\`) and step intervals (\`minuteStep="15"\`).
- **Quick Selection**: "Now" button instantly populates the current system time.

---

### How to Use Custom Styling

\`<nx-time-picker>\` encapsulates its styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Input trigger background | \`#ffffff\` |
| \`--color\` | Input text color | \`#0f172a\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-focus-color\` | Focus ring / border color | \`#8145b5\` |
| \`--accent-color\` | Selected time cell highlight color | \`#8145b5\` |
| \`--accent-light\` | Hover cell background | \`#f6f0fa\` |
| \`--border-radius\` | Corner radius | \`4px\` |
| \`--control-height\` | Height of the input box | \`40px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(trigger)\`: The input box triggering the time dropdown.
- \`::part(panel)\`: The time selection popup dialog.
- \`::part(label)\`: The field label.
- \`::part(footer)\`: The footer row containing "Now" and clear actions.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label displayed above the picker',
      defaultValue: 'Meeting Time',
    },
    value: {
      control: 'text',
      description: 'Current time value string',
      defaultValue: '02:30 PM',
    },
    format: {
      control: 'select',
      options: ['12h', '24h'],
      description: '12-hour (with AM/PM) or 24-hour display format',
      table: { defaultValue: { summary: '12h' } },
    },
    showSeconds: {
      control: 'boolean',
      description: 'Whether to display seconds column',
      table: { defaultValue: { summary: 'false' } },
    },
    minuteStep: {
      control: 'number',
      description: 'Step interval between minute choices (e.g. 15 for quarter-hour increments)',
      table: { defaultValue: { summary: '1' } },
    },
    showNowButton: {
      control: 'boolean',
      description: 'Shows "Now" shortcut button in footer',
      table: { defaultValue: { summary: 'true' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Enables quick clear trigger',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interactions',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks input invalid and applies error styles',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    label: 'Meeting Time',
    value: '02:30 PM',
    format: '12h',
    showSeconds: false,
    minuteStep: 1,
    showNowButton: true,
    clearable: true,
    disabled: false,
    invalid: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 300px; min-height: 320px;">
      <nx-time-picker
        label=${ifDefined(args.label)}
        value=${ifDefined(args.value)}
        format=${ifDefined(args.format)}
        ?show-seconds=${args.showSeconds}
        minute-step=${ifDefined(args.minuteStep)}
        ?show-now-button=${args.showNowButton}
        ?clearable=${args.clearable}
        ?disabled=${args.disabled}
        ?invalid=${args.invalid}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
      ></nx-time-picker>
    </div>
  `,
};

export const FormatComparison: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; flex-wrap: wrap; min-height: 320px;">
      <div style="width: 260px;">
        <nx-time-picker label="12-Hour (AM/PM)" format="12h" value="09:15 AM"></nx-time-picker>
      </div>
      <div style="width: 260px;">
        <nx-time-picker label="24-Hour Military" format="24h" value="14:45"></nx-time-picker>
      </div>
    </div>
  `,
};

export const SteppedIntervals: Story = {
  render: () => html`
    <div style="max-width: 300px; min-height: 320px;">
      <nx-time-picker
        label="Quarter-Hour Booking (15m step)"
        format="12h"
        minute-step="15"
        helper-text="Only 00, 15, 30, and 45 minutes can be selected."
      ></nx-time-picker>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 300px; min-height: 320px;">
      <nx-time-picker
        label="Indigo Styled Time Picker"
        value="10:00 AM"
        style="
          --accent-color: #6366f1;
          --accent-light: #e0e7ff;
          --border-focus-color: #4f46e5;
          --border-radius: 8px;
        "
      ></nx-time-picker>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(trigger)`, `::part(panel)`, `::part(label)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-time-parts::part(trigger) {
        border: 2px dashed #8145b5;
        border-radius: 12px;
        background: #faf5ff;
        font-weight: 600;
        color: #8145b5;
      }
      .custom-time-parts::part(panel) {
        border: 2px solid #8145b5;
        border-radius: 14px;
        box-shadow: 0 10px 24px rgba(129, 69, 181, 0.15);
      }
      .custom-time-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: #8145b5;
      }
    </style>

    <div style="max-width: 300px; min-height: 320px;">
      <nx-time-picker
        class="custom-time-parts"
        label="Dashed Trigger via ::part(trigger)"
        value="02:30 PM"
      ></nx-time-picker>
    </div>
  `,
};


