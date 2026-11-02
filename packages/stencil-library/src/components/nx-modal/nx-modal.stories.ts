import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-modal>` is an accessible dialog / overlay modal component.
 * Features focus trapping, escape key dismiss, backdrop click handlers, multiple size presets,
 * backdrop blur effects, animated transitions, and CSS custom property styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Modal',
  component: 'nx-modal',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-modal>\` component renders an accessible dialog overlay for prompts, forms, and alerts.
Features:
- **Dismissible Modes**: Close via header X button, backdrop click, or ESC key.
- **Sizes**: \`sm\` (400px), \`md\` (560px), \`lg\` (800px), \`xl\` (1024px), and \`full\` screen.
- **Scrollable Mode**: Long content scrolls smoothly inside the modal body while keeping header and footer pinned.
- **Backdrop**: Configurable backdrop blur and color overlay.

---

### How to Use Custom Styling

\`<nx-modal>\` encapsulates its styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-modal-bg\` | Dialog background color | \`#ffffff\` |
| \`--nx-modal-color\` | Dialog text color | \`#0f172a\` |
| \`--nx-modal-radius\` | Corner radius | \`12px\` |
| \`--nx-modal-shadow\` | Elevation drop shadow | Multi-layer soft shadow |
| \`--nx-modal-backdrop-bg\` | Backdrop overlay tint color | \`rgba(15, 23, 42, 0.6)\` |
| \`--nx-modal-backdrop-blur\` | Backdrop backdrop-filter blur | \`4px\` |
| \`--nx-modal-header-padding\`| Header padding | \`20px 24px\` |
| \`--nx-modal-body-padding\` | Body content padding | \`24px\` |
| \`--nx-modal-footer-padding\`| Footer padding | \`16px 24px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(backdrop)\`: The dark screen overlay element.
- \`::part(dialog)\`: The main white dialog surface box.
- \`::part(header)\`: The header row containing title and close button.
- \`::part(title)\`: The modal title heading.
- \`::part(body)\`: The body scroll area.
- \`::part(footer)\`: The modal action footer.
- \`::part(close-button)\`: The close icon button.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls modal open / closed state',
      table: { defaultValue: { summary: 'false' } },
    },
    header: {
      control: 'text',
      description: 'Modal title text',
      defaultValue: 'Confirm Deletion',
    },
    subHeader: {
      control: 'text',
      description: 'Subtitle / secondary heading in header',
      defaultValue: 'This action cannot be undone.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal width sizing preset',
      table: { defaultValue: { summary: 'md' } },
    },
    backdrop: {
      control: 'select',
      options: [true, false, 'static'],
      description: 'Backdrop behavior: true closes on click, "static" prevents closing on click',
      table: { defaultValue: { summary: 'true' } },
    },
    centered: {
      control: 'boolean',
      description: 'Vertically centers dialog in viewport',
      table: { defaultValue: { summary: 'true' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows the close button in the header',
      table: { defaultValue: { summary: 'true' } },
    },
    scrollable: {
      control: 'boolean',
      description: 'Limits body height and enables scrolling for long contents',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    isOpen: false,
    header: 'Confirm Deletion',
    subHeader: 'This action cannot be undone.',
    size: 'md',
    backdrop: true,
    centered: true,
    dismissible: true,
    scrollable: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div>
      <nx-button
        fill="solid"
        @click=${() => {
          const m = document.querySelector('nx-modal#demo-modal') as any;
          if (m) m.isOpen = true;
        }}
      >
        Open Modal
      </nx-button>

      <nx-modal
        id="demo-modal"
        ?is-open=${args.isOpen}
        header=${ifDefined(args.header)}
        sub-header=${ifDefined(args.subHeader)}
        size=${ifDefined(args.size)}
        backdrop=${ifDefined(args.backdrop)}
        ?centered=${args.centered}
        ?dismissible=${args.dismissible}
        ?scrollable=${args.scrollable}
        @nxDismiss=${(e: CustomEvent) => {
          console.log('nxDismiss:', e.detail);
          const m = document.querySelector('nx-modal#demo-modal') as any;
          if (m) m.isOpen = false;
        }}
      >
        <p style="margin: 0; color: #475569; line-height: 1.6; font-size: 14px;">
          Are you sure you want to permanently delete this repository and all associated branch records? This operation is immediate and irreversible.
        </p>

        <div slot="footer" style="display: flex; justify-content: flex-end; gap: 10px;">
          <nx-button
            fill="clear"
            @click=${() => {
              const m = document.querySelector('nx-modal#demo-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Cancel
          </nx-button>
          <nx-button
            fill="solid"
            color="danger"
            @click=${() => {
              const m = document.querySelector('nx-modal#demo-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Delete Repository
          </nx-button>
        </div>
      </nx-modal>
    </div>
  `,
};

export const SizingOptions: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${['sm', 'md', 'lg', 'xl'].map(
        (size) => html`
          <nx-button
            fill="outline"
            @click=${() => {
              const m = document.querySelector(`nx-modal#modal-${size}`) as any;
              if (m) m.isOpen = true;
            }}
          >
            Open ${size.toUpperCase()} Modal
          </nx-button>

          <nx-modal
            id=${`modal-${size}`}
            size=${size}
            header=${`${size.toUpperCase()} Modal Dialog`}
            @nxDismiss=${() => {
              const m = document.querySelector(`nx-modal#modal-${size}`) as any;
              if (m) m.isOpen = false;
            }}
          >
            <p style="margin: 0; color: #475569; font-size: 14px;">
              This is a standard ${size} modal dialog demonstrating responsive sizing.
            </p>
          </nx-modal>
        `
      )}
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div>
      <nx-button
        fill="solid"
        color="dark"
        @click=${() => {
          const m = document.querySelector('nx-modal#dark-modal') as any;
          if (m) m.isOpen = true;
        }}
      >
        Open Dark Themed Modal
      </nx-button>

      <nx-modal
        id="dark-modal"
        header="Dark System Dialog"
        subHeader="Using CSS custom properties"
        style="
          --nx-modal-bg: #0f172a;
          --nx-modal-color: #cbd5e1;
          --nx-modal-radius: 16px;
          --nx-modal-backdrop-blur: 8px;
          --nx-modal-backdrop-bg: rgba(0, 0, 0, 0.75);
        "
        @nxDismiss=${() => {
          const m = document.querySelector('nx-modal#dark-modal') as any;
          if (m) m.isOpen = false;
        }}
      >
        <p style="margin: 0; line-height: 1.6; font-size: 14px;">
          This modal demonstrates custom dark mode styling with enhanced backdrop blur and custom radius.
        </p>

        <div slot="footer" style="display: flex; justify-content: flex-end; gap: 8px;">
          <nx-button
            fill="clear"
            color="light"
            @click=${() => {
              const m = document.querySelector('nx-modal#dark-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Dismiss
          </nx-button>
          <nx-button
            fill="solid"
            color="primary"
            @click=${() => {
              const m = document.querySelector('nx-modal#dark-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Save Changes
          </nx-button>
        </div>
      </nx-modal>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(dialog)`, `::part(header)`, `::part(title)`, `::part(body)`, `::part(footer)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-modal-parts::part(header) {
        background: linear-gradient(135deg, #8145b5, #4f46e5);
        padding: 20px 24px;
      }
      .custom-modal-parts::part(title) {
        color: #ffffff;
        font-size: 18px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
      .custom-modal-parts::part(subtitle) {
        color: rgba(255, 255, 255, 0.85);
      }
      .custom-modal-parts::part(close-button) {
        color: #ffffff;
      }
      .custom-modal-parts::part(dialog) {
        border-radius: 16px;
        overflow: hidden;
      }
      .custom-modal-parts::part(footer) {
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
      }
    </style>

    <div>
      <nx-button
        color="primary"
        @click=${() => {
          const m = document.querySelector('nx-modal#parts-modal') as any;
          if (m) m.isOpen = true;
        }}
      >
        Open Shadow Parts Styled Modal
      </nx-button>

      <nx-modal
        id="parts-modal"
        class="custom-modal-parts"
        header="Gradient Header Modal"
        subHeader="Styled via ::part(header) and ::part(dialog)"
        @nxDismiss=${() => {
          const m = document.querySelector('nx-modal#parts-modal') as any;
          if (m) m.isOpen = false;
        }}
      >
        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #334155;">
          Demonstrating deep shadow DOM styling via CSS shadow parts with custom gradient banners, white text, and styled footers.
        </p>

        <div slot="footer" style="display: flex; justify-content: flex-end; gap: 10px;">
          <nx-button
            fill="outline"
            color="secondary"
            size="small"
            @click=${() => {
              const m = document.querySelector('nx-modal#parts-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Cancel
          </nx-button>
          <nx-button
            color="primary"
            size="small"
            @click=${() => {
              const m = document.querySelector('nx-modal#parts-modal') as any;
              if (m) m.isOpen = false;
            }}
          >
            Confirm
          </nx-button>
        </div>
      </nx-modal>
    </div>
  `,
};


