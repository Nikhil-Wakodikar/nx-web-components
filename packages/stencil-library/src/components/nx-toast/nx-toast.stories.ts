import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-toast>` provides non-intrusive toast notifications and snackbars.
 * Features customizable screen placement, auto-dismiss timers with progress bars,
 * pause on hover, action button slots, alert variants, and full CSS custom property theming.
 */
const meta: Meta = {
  title: 'NX Web Components/Toast',
  component: 'nx-toast',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-toast>\` component notifies users of system feedback, background events, or brief alerts.
Key features:
- **Alert Variants**: \`default\`, \`primary\`, \`success\`, \`warning\`, \`error\` / \`danger\`, \`info\`.
- **Flexible Positioning**: Supports 12 distinct viewport coordinates (\`top-end\`, \`bottom-end\`, \`top-center\`, etc.).
- **Auto-Dismiss & Progress Bar**: Automatically counts down duration with an optional visual progress bar and pause-on-hover.
- **Action Buttons**: Slot an interactive undo or retry button into the toast.

---

### How to Use Custom Styling

\`<nx-toast>\` encapsulates its styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-toast-bg\` | Card background color | \`#ffffff\` |
| \`--nx-toast-color\` | Message text color | \`#0f172a\` |
| \`--nx-toast-border\` | Border style | \`1px solid #e2e8f0\` |
| \`--nx-toast-radius\` | Corner radius | \`12px\` |
| \`--nx-toast-shadow\` | Drop shadow | Soft elevated shadow |
| \`--nx-toast-accent-color\` | Leading accent stripe color | Matches variant theme color |
| \`--nx-toast-min-width\` | Minimum width | \`280px\` |
| \`--nx-toast-max-width\` | Maximum width | \`480px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(card)\`: The outer toast card surface.
- \`::part(icon)\`: The status icon container.
- \`::part(header)\`: The toast title heading.
- \`::part(message)\`: The body message text.
- \`::part(action)\`: The action button container.
- \`::part(close-button)\`: The close dismiss button.
- \`::part(progress-bar)\`: The animated duration countdown bar.
        `,
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls toast visibility',
      table: { defaultValue: { summary: 'false' } },
    },
    message: {
      control: 'text',
      description: 'Toast message body',
      defaultValue: 'Changes saved successfully to cloud storage.',
    },
    header: {
      control: 'text',
      description: 'Optional bold toast title',
      defaultValue: 'Success',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'error', 'danger', 'info'],
      description: 'Visual alert color theme',
      table: { defaultValue: { summary: 'default' } },
    },
    position: {
      control: 'select',
      options: [
        'bottom',
        'bottom-end',
        'bottom-start',
        'bottom-center',
        'top',
        'top-end',
        'top-start',
        'top-center',
      ],
      description: 'Viewport anchor placement',
      table: { defaultValue: { summary: 'bottom' } },
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss delay in milliseconds (0 to disable)',
      table: { defaultValue: { summary: '3000' } },
    },
    showProgressBar: {
      control: 'boolean',
      description: 'Shows animated duration countdown bar',
      table: { defaultValue: { summary: 'false' } },
    },
    showIcon: {
      control: 'boolean',
      description: 'Shows status icon matching variant',
      table: { defaultValue: { summary: 'true' } },
    },
    dismissible: {
      control: 'boolean',
      description: 'Shows close button',
      table: { defaultValue: { summary: 'true' } },
    },
    actionText: {
      control: 'text',
      description: 'Action button label (e.g. Undo)',
    },
  },
  args: {
    isOpen: false,
    message: 'Changes saved successfully to cloud storage.',
    header: 'Success',
    variant: 'success',
    position: 'bottom-end',
    duration: 4000,
    showProgressBar: true,
    showIcon: true,
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div>
      <nx-button
        fill="solid"
        color="success"
        @click=${() => {
          const t = document.querySelector('nx-toast#demo-toast') as any;
          if (t) t.isOpen = true;
        }}
      >
        Trigger Toast Notification
      </nx-button>

      <nx-toast
        id="demo-toast"
        .isOpen=${args.isOpen}
        .header=${args.header}
        .message=${args.message}
        .variant=${args.variant}
        .position=${args.position}
        .duration=${args.duration}
        ?showProgressBar=${args.showProgressBar}
        ?showIcon=${args.showIcon}
        ?dismissible=${args.dismissible}
        .actionText=${args.actionText}
        @nxDismiss=${() => {
          const t = document.querySelector('nx-toast#demo-toast') as any;
          if (t) t.isOpen = false;
        }}
      ></nx-toast>
    </div>
  `,
};

export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
      ${['success', 'warning', 'danger', 'info', 'primary'].map(
        (variant) => html`
          <nx-button
            fill="outline"
            color=${variant === 'danger' ? 'danger' : variant === 'warning' ? 'warning' : 'primary'}
            @click=${() => {
              const t = document.querySelector(`nx-toast#toast-${variant}`) as any;
              if (t) t.isOpen = true;
            }}
          >
            Show ${variant} Toast
          </nx-button>

          <nx-toast
            id=${`toast-${variant}`}
            variant=${variant}
            header=${variant.toUpperCase()}
            message=${`This is an informative ${variant} alert toast message.`}
            position="top-end"
            duration="3000"
            showProgressBar
            @nxDismiss=${() => {
              const t = document.querySelector(`nx-toast#toast-${variant}`) as any;
              if (t) t.isOpen = false;
            }}
          ></nx-toast>
        `
      )}
    </div>
  `,
};

export const WithActionUndo: Story = {
  render: () => html`
    <div>
      <nx-button
        fill="solid"
        color="danger"
        @click=${() => {
          const t = document.querySelector('nx-toast#undo-toast') as any;
          if (t) t.isOpen = true;
        }}
      >
        Archive Item (With Undo)
      </nx-button>

      <nx-toast
        id="undo-toast"
        header="Item Archived"
        message="Item moved to trash bin."
        variant="primary"
        position="bottom-center"
        duration="5000"
        actionText="Undo"
        showProgressBar
        @nxAction=${() => alert('Undo clicked!')}
        @nxDismiss=${() => {
          const t = document.querySelector('nx-toast#undo-toast') as any;
          if (t) t.isOpen = false;
        }}
      ></nx-toast>
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
          const t = document.querySelector('nx-toast#dark-toast') as any;
          if (t) t.isOpen = true;
        }}
      >
        Dark Neon Toast
      </nx-button>

      <nx-toast
        id="dark-toast"
        header="Security Alert"
        message="New sign-in detected from Chrome on macOS."
        position="bottom-end"
        duration="4000"
        style="
          --nx-toast-bg: #0f172a;
          --nx-toast-color: #f8fafc;
          --nx-toast-border: 1px solid #334155;
          --nx-toast-accent-color: #06b6d4;
          --nx-toast-radius: 16px;
        "
        @nxDismiss=${() => {
          const t = document.querySelector('nx-toast#dark-toast') as any;
          if (t) t.isOpen = false;
        }}
      ></nx-toast>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(card)`, `::part(header)`, `::part(message)`, `::part(progress-bar)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-toast-parts::part(card) {
        border-radius: 16px;
        box-shadow: 0 12px 32px rgba(129, 69, 181, 0.25);
        border: 2px solid #8145b5;
        background: #faf5ff;
      }
      .custom-toast-parts::part(header) {
        color: #8145b5;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        font-size: 13px;
      }
      .custom-toast-parts::part(message) {
        color: #475569;
        font-size: 13px;
      }
      .custom-toast-parts::part(progress-bar) {
        background: linear-gradient(90deg, #8145b5, #ec4899);
        height: 4px;
      }
    </style>

    <div>
      <nx-button
        color="primary"
        @click=${() => {
          const t = document.querySelector('nx-toast#parts-toast') as any;
          if (t) t.isOpen = true;
        }}
      >
        Trigger Shadow Parts Styled Toast
      </nx-button>

      <nx-toast
        id="parts-toast"
        class="custom-toast-parts"
        header="Deployment Ready"
        message="Your production build was released successfully."
        position="top-end"
        duration="4000"
        @nxDismiss=${() => {
          const t = document.querySelector('nx-toast#parts-toast') as any;
          if (t) t.isOpen = false;
        }}
      ></nx-toast>
    </div>
  `,
};


