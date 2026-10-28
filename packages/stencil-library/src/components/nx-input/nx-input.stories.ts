import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-input>` is an accessible, feature-packed text input component supporting labels,
 * validation feedback (error/success states), prefix/suffix slots, character counters,
 * multiple input types, and deep CSS custom property customization.
 */
const meta: Meta = {
  title: 'NX Web Components/Input',
  component: 'nx-input',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-input>\` component encapsulates a native \`<input>\` element with full accessibility,
custom label placement, validation messaging, helper texts, character counters, and slot adornments.

---

### How to Use Custom Styling

\`<nx-input>\` encapsulates styling inside Shadow DOM. Style overrides can be achieved using
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Input field background color | \`#ffffff\` |
| \`--background-focus\` | Background color when focused | \`#ffffff\` |
| \`--background-disabled\` | Background color when disabled | \`#f1f5f9\` |
| \`--color\` | Text color | \`#0f172a\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-hover-color\` | Border color on hover | \`#94a3b8\` |
| \`--border-focus-color\` | Border & focus ring color | \`#8145b5\` |
| \`--border-error-color\` | Border color when invalid | \`#dc2626\` |
| \`--border-success-color\` | Border color when success | \`#16a34a\` |
| \`--border-radius\` | Corner border radius | \`4px\` |
| \`--placeholder-color\` | Placeholder text color | \`#64748b\` |
| \`--caret-color\` | Text cursor caret color | \`#8145b5\` |
| \`--padding-start\` | Inner left padding | \`12px\` |
| \`--padding-end\` | Inner right padding | \`12px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(input-box)\`: The container surrounding prefix, input, and suffix elements.
- \`::part(input)\`: The native HTML \`<input>\` element.
- \`::part(label)\`: The label heading.
- \`::part(helper-text)\`: The supporting helper text.
- \`::part(error-text)\`: The error message container.
- \`::part(start)\` & \`::part(end)\`: The slot containers for leading/trailing adornments.
- \`::part(counter)\`: The character counter container.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Input label text displayed above the field',
      defaultValue: 'Email Address',
    },
    value: {
      control: 'text',
      description: 'Current string value of the input',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text displayed when field is empty',
      defaultValue: 'you@example.com',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
      table: { defaultValue: { summary: 'text' } },
    },
    helperText: {
      control: 'text',
      description: 'Descriptive guidance message shown below the input',
      defaultValue: 'We will never share your email.',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid is true',
    },
    invalid: {
      control: 'boolean',
      description: 'Marks the field as invalid and applies danger border styling',
      table: { defaultValue: { summary: 'false' } },
    },
    success: {
      control: 'boolean',
      description: 'Marks the field as successful and applies green border styling',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user input and dims field',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Prevents editing while keeping selectable text and focusable state',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Appends required indicator to label and marks form control required',
      table: { defaultValue: { summary: 'false' } },
    },
    counter: {
      control: 'boolean',
      description: 'Displays a live character count when maxlength is configured',
      table: { defaultValue: { summary: 'false' } },
    },
    maxlength: {
      control: 'number',
      description: 'Maximum allowable character length',
    },
  },
  args: {
    label: 'Email Address',
    value: '',
    placeholder: 'you@example.com',
    type: 'text',
    helperText: 'We will never share your email.',
    invalid: false,
    success: false,
    disabled: false,
    readonly: false,
    required: false,
    counter: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 360px;">
      <nx-input
        label=${ifDefined(args.label)}
        value=${ifDefined(args.value)}
        placeholder=${ifDefined(args.placeholder)}
        type=${ifDefined(args.type)}
        helper-text=${ifDefined(args.helperText)}
        error-text=${ifDefined(args.errorText)}
        ?invalid=${args.invalid}
        ?success=${args.success}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        ?counter=${args.counter}
        maxlength=${ifDefined(args.maxlength)}
        @nxInput=${(e: CustomEvent) => console.log('nxInput:', e.detail)}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
        @nxFocus=${() => console.log('nxFocus')}
        @nxBlur=${() => console.log('nxBlur')}
      ></nx-input>
    </div>
  `,
};

export const InputTypes: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; max-width: 650px;">
      <nx-input label="Standard Text" placeholder="Enter text..." type="text"></nx-input>
      <nx-input label="Password" type="password" value="secretpassword"></nx-input>
      <nx-input label="Email" type="email" placeholder="name@company.com"></nx-input>
      <nx-input label="Search" type="search" placeholder="Search components..."></nx-input>
      <nx-input label="Number" type="number" value="42"></nx-input>
      <nx-input label="Telephone" type="tel" placeholder="+1 (555) 000-0000"></nx-input>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 380px;">
      <nx-input
        label="Username (Valid)"
        value="alex_designer"
        success
        helperText="Username is available!"
      ></nx-input>

      <nx-input
        label="Password (Invalid)"
        type="password"
        value="123"
        invalid
        errorText="Password must be at least 8 characters with numbers."
      ></nx-input>

      <nx-input
        label="Required Field"
        required
        placeholder="Required input"
        helperText="Required fields display an asterisk (*)"
      ></nx-input>
    </div>
  `,
};

export const SlotsWithAdornments: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 380px;">
      <!-- Leading Icon -->
      <nx-input label="Search" placeholder="Search catalog...">
        <nx-icon slot="start" name="search" size="18" color="medium"></nx-icon>
      </nx-input>

      <!-- Currency Prefix & Suffix -->
      <nx-input label="Price" placeholder="0.00" type="number">
        <span slot="start" style="color: #64748b; font-weight: 500; font-size: 14px;">$</span>
        <span slot="end" style="color: #64748b; font-size: 12px; font-weight: bold;">USD</span>
      </nx-input>

      <!-- Trailing Action -->
      <nx-input label="Website URL" value="https://example.com">
        <nx-icon slot="start" name="globe" size="18" color="primary"></nx-icon>
        <nx-icon slot="end" name="external-link" size="16" color="medium" style="cursor: pointer;"></nx-icon>
      </nx-input>
    </div>
  `,
};

export const CharacterCounter: Story = {
  render: () => html`
    <div style="max-width: 380px;">
      <nx-input
        label="Short Bio / Headline"
        placeholder="Enter your title"
        value="Senior Frontend Architect"
        counter
        maxlength="40"
        helperText="Keep it short and impactful."
      ></nx-input>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 380px;">
      <!-- Rounded Pill Style -->
      <nx-input
        label="Search with Custom Rounded Border"
        placeholder="Search with pill styling..."
        style="
          --border-radius: 9999px;
          --border-color: #6366f1;
          --border-focus-color: #4f46e5;
          --padding-start: 18px;
          --padding-end: 18px;
        "
      >
        <nx-icon slot="start" name="search" size="18" color="#6366f1"></nx-icon>
      </nx-input>

      <!-- High Contrast Dark Input -->
      <div style="background: #0f172a; padding: 20px; border-radius: 8px;">
        <nx-input
          label="Dark Surface Input"
          placeholder="Dark theme ready..."
          style="
            --background: #1e293b;
            --color: #f8fafc;
            --border-color: #334155;
            --border-focus-color: #38bdf8;
            --placeholder-color: #64748b;
          "
        ></nx-input>
      </div>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(input-box)`, `::part(input)`, `::part(label)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-input-parts::part(input-box) {
        border: 2px dashed #8145b5;
        border-radius: 12px;
        background: #faf5ff;
        box-shadow: 0 4px 12px rgba(129, 69, 181, 0.08);
      }
      .custom-input-parts::part(input) {
        font-family: monospace;
        font-weight: 600;
        color: #6b21a8;
      }
      .custom-input-parts::part(label) {
        text-transform: uppercase;
        letter-spacing: 0.08em;
        font-weight: 700;
        color: #8145b5;
        font-size: 12px;
      }
    </style>

    <div style="max-width: 380px;">
      <nx-input
        class="custom-input-parts"
        label="Dashed Input Box via ::part(input-box)"
        value="PRO-COUPON-2026"
      ></nx-input>
    </div>
  `,
};


