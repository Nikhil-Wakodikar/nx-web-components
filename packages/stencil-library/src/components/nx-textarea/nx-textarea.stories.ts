import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-textarea>` is an accessible multiline text input component supporting auto-grow expansion,
 * character counting, validation feedback, resize modes, helper messages, and deep CSS theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Textarea',
  component: 'nx-textarea',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-textarea>\` component encapsulates a multiline \`<textarea>\` element with built-in:
- **Auto-Grow**: Automatically expands its height as the user types when \`autoGrow\` is enabled.
- **Character Counter**: Live character countdown when \`counter\` and \`maxlength\` are present.
- **Resize Controls**: Control manual resize capability (\`vertical\`, \`none\`, \`horizontal\`, \`both\`).
- **Validation**: Error and success state highlighting with accessible error/helper messaging.

---

### How to Use Custom Styling

\`<nx-textarea>\` encapsulates its styles using Shadow DOM. Consumers can customize it via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Field background color | \`#ffffff\` |
| \`--background-focus\` | Focused background color | \`#ffffff\` |
| \`--background-disabled\` | Disabled background color | \`#f1f5f9\` |
| \`--color\` | Text color | \`#0f172a\` |
| \`--border-color\` | Default border color | \`#cbd5e1\` |
| \`--border-hover-color\` | Hover border color | \`#94a3b8\` |
| \`--border-focus-color\` | Focus ring / border color | \`#8145b5\` |
| \`--border-error-color\` | Invalid state border color | \`#dc2626\` |
| \`--border-success-color\` | Success state border color | \`#16a34a\` |
| \`--border-radius\` | Corner radius | \`4px\` |
| \`--min-height\` | Minimum container height | Calculated from \`rows\` |
| \`--caret-color\` | Text cursor caret color | \`#8145b5\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(textarea-box)\`: The border container wrapping the textarea element.
- \`::part(textarea)\`: The native HTML \`<textarea>\` element.
- \`::part(label)\`: The label heading.
- \`::part(helper-text)\`: The supporting helper message.
- \`::part(error-text)\`: The error text container.
- \`::part(counter)\`: The character count display.
        `,
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Textarea label displayed above the field',
      defaultValue: 'Project Description',
    },
    value: {
      control: 'text',
      description: 'String value of the multiline input',
      defaultValue: '',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder guidance text shown when empty',
      defaultValue: 'Write your detailed description here...',
    },
    rows: {
      control: 'number',
      description: 'Initial visible row height',
      table: { defaultValue: { summary: '4' } },
    },
    autoGrow: {
      control: 'boolean',
      description: 'Automatically expands vertical height as user types without scrollbars',
      table: { defaultValue: { summary: 'false' } },
    },
    resize: {
      control: 'select',
      options: ['vertical', 'none', 'horizontal', 'both'],
      description: 'Native CSS resize handle control',
      table: { defaultValue: { summary: 'vertical' } },
    },
    helperText: {
      control: 'text',
      description: 'Helpful guidance text placed beneath the textarea',
      defaultValue: 'Provide as much context as possible.',
    },
    errorText: {
      control: 'text',
      description: 'Error message displayed when invalid is true',
    },
    invalid: {
      control: 'boolean',
      description: 'Marks input invalid and applies error styles',
      table: { defaultValue: { summary: 'false' } },
    },
    success: {
      control: 'boolean',
      description: 'Marks input as successfully verified',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interaction and dims appearance',
      table: { defaultValue: { summary: 'false' } },
    },
    readonly: {
      control: 'boolean',
      description: 'Renders the content read-only while keeping text selectable',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Appends required indicator to label',
      table: { defaultValue: { summary: 'false' } },
    },
    counter: {
      control: 'boolean',
      description: 'Shows character counter when maxlength is set',
      table: { defaultValue: { summary: 'false' } },
    },
    maxlength: {
      control: 'number',
      description: 'Maximum permitted character length',
    },
  },
  args: {
    label: 'Project Description',
    value: '',
    placeholder: 'Write your detailed description here...',
    rows: 4,
    autoGrow: false,
    resize: 'vertical',
    helperText: 'Provide as much context as possible.',
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
    <div style="max-width: 450px;">
      <nx-textarea
        .label=${args.label}
        .value=${args.value}
        .placeholder=${args.placeholder}
        .rows=${args.rows}
        ?autoGrow=${args.autoGrow}
        .resize=${args.resize}
        .helperText=${args.helperText}
        .errorText=${args.errorText}
        ?invalid=${args.invalid}
        ?success=${args.success}
        ?disabled=${args.disabled}
        ?readonly=${args.readonly}
        ?required=${args.required}
        ?counter=${args.counter}
        .maxlength=${args.maxlength}
        @nxInput=${(e: CustomEvent) => console.log('nxInput:', e.detail)}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
      ></nx-textarea>
    </div>
  `,
};

export const AutoGrow: Story = {
  render: () => html`
    <div style="max-width: 450px;">
      <nx-textarea
        label="Auto-Expanding Comments"
        placeholder="Type multiple paragraphs to see the field expand dynamically..."
        autoGrow
        rows="2"
        helperText="Field height expands automatically without vertical scrollbars."
      ></nx-textarea>
    </div>
  `,
};

export const CharacterCounter: Story = {
  render: () => html`
    <div style="max-width: 450px;">
      <nx-textarea
        label="Feedback & Suggestions"
        placeholder="Tell us what you think..."
        counter
        maxlength="200"
        rows="3"
        helperText="Keep suggestions under 200 characters."
      ></nx-textarea>
    </div>
  `,
};

export const ValidationStates: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 450px;">
      <nx-textarea
        label="Pull Request Summary (Valid)"
        value="Refactored component storybook files and unified CSS custom property documentation."
        success
        helperText="Looks clear and concise!"
      ></nx-textarea>

      <nx-textarea
        label="Reason for Return (Invalid)"
        value="Bad"
        invalid
        errorText="Please provide at least 20 characters explaining the reason for return."
      ></nx-textarea>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 450px;">
      <nx-textarea
        label="Styled Code Snippet"
        placeholder="Paste JSON or code here..."
        style="
          --background: #1e1e2e;
          --color: #cdd6f4;
          --border-color: #45475a;
          --border-focus-color: #cba6f7;
          --border-radius: 8px;
          --font-family: 'Fira Code', monospace;
          --font-size: 13px;
        "
        rows="5"
        helperText="Custom monospace dark code box"
      ></nx-textarea>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(textarea-box)`, `::part(textarea)`, `::part(label)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-textarea-parts::part(textarea-box) {
        border: 2px dashed #8145b5;
        border-radius: 12px;
        background: #faf5ff;
        box-shadow: 0 4px 14px rgba(129, 69, 181, 0.08);
      }
      .custom-textarea-parts::part(textarea) {
        font-family: monospace;
        color: #581c87;
        font-size: 13px;
      }
      .custom-textarea-parts::part(label) {
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
        color: #8145b5;
        font-size: 12px;
      }
    </style>

    <div style="max-width: 450px;">
      <nx-textarea
        class="custom-textarea-parts"
        label="Dashed Note Area via ::part(textarea-box)"
        placeholder="Enter internal release notes..."
        rows="4"
      ></nx-textarea>
    </div>
  `,
};


