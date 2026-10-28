import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-date-picker>` is a feature-rich, accessible calendar picker component.
 * It provides custom date formatting, min/max range constraints, quick "Today" navigation,
 * clear button, validation feedback, and custom accent theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Date Picker',
  component: 'nx-date-picker',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-date-picker>\` component allows users to enter or choose dates using a dropdown calendar popup.
Key features include:
- **Multiple Formats**: Supports \`DD/MM/YYYY\`, \`MM/DD/YYYY\`, \`YYYY-MM-DD\`, and \`DD MMM YYYY\`.
- **Date Constraints**: Restrict selectable ranges via \`min\` and \`max\` ISO date strings.
- **First Day of Week**: Configure whether weeks start on Sunday (\`0\`) or Monday (\`1\`).
- **Quick Actions**: Built-in "Today" button and clear trigger.

---

### How to Use Custom Styling

\`<nx-date-picker>\` encapsulates its styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Input trigger background | \`#ffffff\` |
| \`--color\` | Input text color | \`#0f172a\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-focus-color\` | Focus ring / border color | \`#8145b5\` |
| \`--border-error-color\` | Invalid border color | \`#dc2626\` |
| \`--accent-color\` | Selected day circle & calendar highlight | \`#8145b5\` |
| \`--accent-light\` | Hover day background color | \`#f6f0fa\` |
| \`--border-radius\` | Corner radius | \`4px\` |
| \`--control-height\` | Height of the input box | \`40px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(trigger)\`: The input box triggering the calendar.
- \`::part(panel)\`: The popup calendar dialog container.
- \`::part(label)\`: The field label.
- \`::part(helper-text)\`: The supporting helper message.
- \`::part(error-text)\`: The invalid error message.
- \`::part(footer)\`: The calendar popup footer action row.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label displayed above the picker',
      defaultValue: 'Departure Date',
    },
    value: {
      control: 'text',
      description: 'Current date string in selected format or ISO format',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown when empty',
      defaultValue: 'Select date',
    },
    format: {
      control: 'select',
      options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'DD MMM YYYY'],
      description: 'Date display format',
      table: { defaultValue: { summary: 'DD/MM/YYYY' } },
    },
    firstDayOfWeek: {
      control: 'select',
      options: [0, 1],
      description: 'Starting day of the calendar week: 0 for Sunday, 1 for Monday',
      table: { defaultValue: { summary: '0' } },
    },
    showTodayButton: {
      control: 'boolean',
      description: 'Displays a quick "Today" shortcut button in the calendar footer',
      table: { defaultValue: { summary: 'true' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Shows an X button to clear current date selection',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interactions',
      table: { defaultValue: { summary: 'false' } },
    },
    invalid: {
      control: 'boolean',
      description: 'Marks input invalid and shows errorText',
      table: { defaultValue: { summary: 'false' } },
    },
    success: {
      control: 'boolean',
      description: 'Marks input as successfully verified',
      table: { defaultValue: { summary: 'false' } },
    },
    helperText: {
      control: 'text',
      description: 'Supporting guidance text below the picker',
    },
    errorText: {
      control: 'text',
      description: 'Error message displayed when invalid is true',
    },
  },
  args: {
    label: 'Departure Date',
    value: '',
    format: 'DD/MM/YYYY',
    firstDayOfWeek: 0,
    showTodayButton: true,
    clearable: true,
    disabled: false,
    invalid: false,
    success: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 320px; min-height: 380px;">
      <nx-date-picker
        label=${ifDefined(args.label)}
        value=${ifDefined(args.value)}
        placeholder=${ifDefined(args.placeholder)}
        format=${ifDefined(args.format)}
        first-day-of-week=${ifDefined(args.firstDayOfWeek)}
        ?show-today-button=${args.showTodayButton}
        ?clearable=${args.clearable}
        ?disabled=${args.disabled}
        ?invalid=${args.invalid}
        ?success=${args.success}
        helper-text=${ifDefined(args.helperText)}
        error-text=${ifDefined(args.errorText)}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
      ></nx-date-picker>
    </div>
  `,
};

export const FormatVariants: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; max-width: 600px; min-height: 400px;">
      <nx-date-picker label="DD/MM/YYYY (UK/EU/India)" format="DD/MM/YYYY" value="23/10/2026"></nx-date-picker>
      <nx-date-picker label="MM/DD/YYYY (US)" format="MM/DD/YYYY" value="10/23/2026"></nx-date-picker>
      <nx-date-picker label="YYYY-MM-DD (ISO 8601)" format="YYYY-MM-DD" value="2026-10-23"></nx-date-picker>
      <nx-date-picker label="DD MMM YYYY (Verbose)" format="DD MMM YYYY" value="23 Oct 2026"></nx-date-picker>
    </div>
  `,
};

export const DateConstraints: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 380px;">
      <nx-date-picker
        label="Flight Booking Window"
        placeholder="Pick date between Nov 1 - Nov 15"
        min="2026-11-01"
        max="2026-11-15"
        firstDayOfWeek="1"
        helperText="Only dates between Nov 1 and Nov 15, 2026 can be selected."
      ></nx-date-picker>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 340px; min-height: 380px;">
      <nx-date-picker
        label="Emerald Accent Calendar"
        value="2026-10-23"
        format="YYYY-MM-DD"
        style="
          --accent-color: #10b981;
          --accent-light: #d1fae5;
          --border-focus-color: #059669;
          --border-radius: 8px;
        "
      ></nx-date-picker>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(trigger)`, `::part(panel)`, `::part(label)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-picker-parts::part(trigger) {
        border: 2px dashed #8145b5;
        border-radius: 12px;
        background: #fdf4ff;
        font-weight: 600;
        color: #8145b5;
      }
      .custom-picker-parts::part(panel) {
        border: 2px solid #8145b5;
        border-radius: 16px;
        box-shadow: 0 12px 28px rgba(129, 69, 181, 0.2);
      }
      .custom-picker-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: #8145b5;
      }
    </style>

    <div style="max-width: 340px; min-height: 380px;">
      <nx-date-picker
        class="custom-picker-parts"
        label="Dashed Trigger via ::part(trigger)"
        value="2026-10-23"
        format="YYYY-MM-DD"
      ></nx-date-picker>
    </div>
  `,
};


