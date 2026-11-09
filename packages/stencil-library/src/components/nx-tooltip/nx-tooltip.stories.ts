import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-tooltip>` displays informative text or rich content when users hover, focus, or click an anchor element.
 *
 * ### Key Features:
 * - **Reliable Positioning**: Supports 12 placements (`top`, `bottom`, `left`, `right`, plus `-start` and `-end` alignments) with collision boundary detection and auto-flip.
 * - **Trigger Modes**: `hover` (default), `focus`, `click`, and `manual` control via methods or the `open` prop.
 * - **Variants & Sizes**: 7 visual themes (`dark`, `light`, `primary`, `success`, `warning`, `danger`, `info`) and 3 sizes (`sm`, `md`, `lg`).
 * - **Target Flexibility**: Wrap any element directly via slot or target an external element by selector/ID (`target="btn-id"`).
 * - **Rich Content**: Supports plain text via `content` attribute or rich HTML via `slot="content"`.
 * - **Accessibility**: Follows WAI-ARIA Tooltip specification with `role="tooltip"`, `aria-describedby` synchronization, and `Escape` key dismissal.
 */
const meta: Meta = {
  title: 'NX Web Components/Tooltip',
  component: 'nx-tooltip',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-tooltip>\` component displays brief contextual assistance, keyboard shortcuts, or explanatory labels.
It functions in two primary modes:
1. **Slotted Trigger**: Wrap any button, badge, icon, or element inside the tooltip.
2. **Target Selector**: Set the \`target\` prop to an element's ID to attach the tooltip remotely without wrapping.

---

### How to Use Custom Styling

\`<nx-tooltip>\` encapsulates its styles using Shadow DOM. You can customize the tooltip appearance using
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-tooltip-bg\` / \`--background\` | Tooltip bubble background color | \`#0f172a\` |
| \`--nx-tooltip-color\` / \`--color\` | Tooltip text color | \`#ffffff\` |
| \`--nx-tooltip-border-color\` / \`--border-color\` | Border color for bubble and arrow | \`rgba(255, 255, 255, 0.12)\` |
| \`--nx-tooltip-border-width\` / \`--border-width\` | Border thickness | \`1px\` |
| \`--nx-tooltip-border-style\` / \`--border-style\` | Border line style | \`solid\` |
| \`--nx-tooltip-border-radius\` / \`--border-radius\` | Corner radius of the bubble | \`0.25rem\` |
| \`--nx-tooltip-font-family\` / \`--font-family\` | Font family | \`Rubik, Poppins, sans-serif\` |
| \`--nx-tooltip-font-size\` / \`--font-size\` | Font size of tooltip content | \`0.75rem\` (12px) |
| \`--nx-tooltip-font-weight\` / \`--font-weight\` | Text font weight | \`400\` |
| \`--nx-tooltip-line-height\` / \`--line-height\` | Content line height | \`1.4\` |
| \`--nx-tooltip-padding\` / \`--padding\` | Internal padding within the bubble | \`0.375rem 0.6875rem\` |
| \`--nx-tooltip-shadow\` / \`--box-shadow\` | Elevation box-shadow of the bubble | \`0 4px 14px rgba(0, 0, 0, 0.16)\` |
| \`--nx-tooltip-max-width\` / \`--max-width\` | Maximum bubble width | \`18rem\` |
| \`--nx-tooltip-offset\` / \`--offset\` | Distance from anchor target | \`8px\` |
| \`--nx-tooltip-arrow-size\` / \`--arrow-size\` | Size of the pointing arrow triangle | \`0.5rem\` (8px) |
| \`--nx-tooltip-arrow-bg\` / \`--arrow-bg\` | Background color of pointer arrow | Inherits \`--nx-tooltip-bg\` |
| \`--nx-tooltip-z-index\` / \`--z-index\` | Stacking context z-index | \`1000\` (\`9999\` for external target) |

#### 2. Inline Style Customization
Pass CSS custom properties directly on the element via the \`style\` attribute:
\`\`\`html
<nx-tooltip
  content="Custom Emerald Tooltip"
  style="
    --background: #065f46;
    --color: #ecfdf5;
    --border-color: #10b981;
    --border-radius: 9999px;
    --padding: 6px 14px;
  "
>
  <nx-button color="success">Hover Me</nx-button>
</nx-tooltip>
\`\`\`

#### 3. Shadow Parts Styling (\`::part\`)
- \`nx-tooltip::part(trigger)\`: The wrapper around slotted trigger elements.
- \`nx-tooltip::part(bubble)\`: The floating tooltip bubble container.
- \`nx-tooltip::part(content)\`: The text and slot container within the bubble.
- \`nx-tooltip::part(arrow)\`: The pointer arrow element.

\`\`\`css
nx-tooltip::part(bubble) {
  backdrop-filter: blur(8px);
  letter-spacing: 0.04em;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The text content displayed inside the tooltip bubble.',
    },
    placement: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Placement relative to the target element.',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'Interaction trigger mode.',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light', 'primary', 'success', 'warning', 'danger', 'info'],
      description: 'Color theme variant.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the tooltip padding and font.',
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show the pointing arrow triangle.',
    },
    open: {
      control: 'boolean',
      description: 'Controls whether the tooltip is visible.',
    },
    delay: {
      control: 'number',
      description: 'Show delay in milliseconds.',
    },
    hideDelay: {
      control: 'number',
      description: 'Hide delay in milliseconds.',
    },
    offset: {
      control: 'number',
      description: 'Distance in pixels between trigger and tooltip bubble.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled.',
    },
  },
  args: {
    content: 'Helpful tooltip information',
    placement: 'top',
    trigger: 'hover',
    variant: 'dark',
    size: 'md',
    arrow: true,
    open: false,
    delay: 100,
    hideDelay: 100,
    offset: 8,
    disabled: false,
  },
};

export default meta;

export const Default: StoryObj = {
  render: args => html`
    <div style="padding: 4rem; display: flex; justify-content: center; align-items: center;">
      <nx-tooltip
        content=${args.content}
        placement=${ifDefined(args.placement)}
        trigger=${ifDefined(args.trigger)}
        variant=${ifDefined(args.variant)}
        size=${ifDefined(args.size)}
        ?arrow=${args.arrow}
        ?open=${args.open}
        delay=${ifDefined(args.delay)}
        hide-delay=${ifDefined(args.hideDelay)}
        offset=${ifDefined(args.offset)}
        ?disabled=${args.disabled}
      >
        <nx-button color="primary">Hover Me</nx-button>
      </nx-tooltip>
    </div>
  `,
};

export const Placements: StoryObj = {
  render: () => html`
    <div style="padding: 5rem 2rem; max-width: 44rem; margin: 0 auto; display: flex; flex-direction: column; gap: 4.5rem; align-items: center;">
      <!-- Top Row -->
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
        <nx-tooltip content="Top Start Placement" placement="top-start" ?open=${true}>
          <nx-button fill="outline" color="secondary">Top-Start</nx-button>
        </nx-tooltip>
        <nx-tooltip content="Top Center Placement" placement="top" ?open=${true}>
          <nx-button fill="outline" color="primary">Top</nx-button>
        </nx-tooltip>
        <nx-tooltip content="Top End Placement" placement="top-end" ?open=${true}>
          <nx-button fill="outline" color="secondary">Top-End</nx-button>
        </nx-tooltip>
      </div>

      <!-- Middle Row: Left & Right -->
      <div style="display: flex; justify-content: space-between; width: 100%; max-width: 38rem;">
        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <nx-tooltip content="Left Start" placement="left-start" ?open=${true}>
            <nx-button fill="outline" color="secondary">Left-Start</nx-button>
          </nx-tooltip>
          <nx-tooltip content="Left Center" placement="left" ?open=${true}>
            <nx-button fill="outline" color="primary">Left</nx-button>
          </nx-tooltip>
          <nx-tooltip content="Left End" placement="left-end" ?open=${true}>
            <nx-button fill="outline" color="secondary">Left-End</nx-button>
          </nx-tooltip>
        </div>

        <div style="display: flex; flex-direction: column; gap: 2.5rem;">
          <nx-tooltip content="Right Start" placement="right-start" ?open=${true}>
            <nx-button fill="outline" color="secondary">Right-Start</nx-button>
          </nx-tooltip>
          <nx-tooltip content="Right Center" placement="right" ?open=${true}>
            <nx-button fill="outline" color="primary">Right</nx-button>
          </nx-tooltip>
          <nx-tooltip content="Right End" placement="right-end" ?open=${true}>
            <nx-button fill="outline" color="secondary">Right-End</nx-button>
          </nx-tooltip>
        </div>
      </div>

      <!-- Bottom Row -->
      <div style="display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center;">
        <nx-tooltip content="Bottom Start Placement" placement="bottom-start" ?open=${true}>
          <nx-button fill="outline" color="secondary">Bottom-Start</nx-button>
        </nx-tooltip>
        <nx-tooltip content="Bottom Center Placement" placement="bottom" ?open=${true}>
          <nx-button fill="outline" color="primary">Bottom</nx-button>
        </nx-tooltip>
        <nx-tooltip content="Bottom End Placement" placement="bottom-end" ?open=${true}>
          <nx-button fill="outline" color="secondary">Bottom-End</nx-button>
        </nx-tooltip>
      </div>
    </div>
  `,
};

export const Variants: StoryObj = {
  render: () => html`
    <div style="padding: 4.5rem 2rem; display: flex; gap: 2rem; flex-wrap: wrap; justify-content: center; align-items: center;">
      <nx-tooltip content="Default Dark" variant="dark" ?open=${true}>
        <nx-button color="dark">Dark</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Clean Light" variant="light" ?open=${true}>
        <nx-button fill="outline">Light</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Brand Primary" variant="primary" ?open=${true}>
        <nx-button color="primary">Primary</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Changes saved!" variant="success" ?open=${true}>
        <nx-button color="success">Success</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Caution required" variant="warning" ?open=${true}>
        <nx-button color="warning">Warning</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Cannot be undone" variant="danger" ?open=${true}>
        <nx-button color="danger">Danger</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Help and guide" variant="info" ?open=${true}>
        <nx-button color="info">Info</nx-button>
      </nx-tooltip>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="padding: 4.5rem 2rem; display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center; align-items: center;">
      <nx-tooltip content="Small tooltip (sm)" size="sm" ?open=${true}>
        <nx-button size="small">Small Tooltip</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Standard medium tooltip (md)" size="md" ?open=${true}>
        <nx-button>Medium Tooltip</nx-button>
      </nx-tooltip>

      <nx-tooltip content="Large spacious tooltip (lg)" size="lg" ?open=${true}>
        <nx-button size="large">Large Tooltip</nx-button>
      </nx-tooltip>
    </div>
  `,
};

export const TriggerModes: StoryObj = {
  render: () => html`
    <div style="padding: 3rem; display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; align-items: center;">
      <!-- Hover -->
      <nx-tooltip content="Triggers on mouseenter / mouseleave" trigger="hover">
        <nx-button color="primary">Hover Trigger</nx-button>
      </nx-tooltip>

      <!-- Focus -->
      <nx-tooltip content="Triggers when focused via Tab key" trigger="focus">
        <nx-button fill="outline" color="secondary">Focus Trigger (Tab here)</nx-button>
      </nx-tooltip>

      <!-- Click -->
      <nx-tooltip content="Click anywhere outside to dismiss" trigger="click">
        <nx-button color="dark">Click Trigger (Toggle)</nx-button>
      </nx-tooltip>

      <!-- Manual -->
      <nx-tooltip content="Controlled via [open]=true prop" trigger="manual" ?open=${true}>
        <nx-button color="secondary">Always Open (Manual)</nx-button>
      </nx-tooltip>
    </div>
  `,
};

export const RichContent: StoryObj = {
  render: () => html`
    <div style="padding: 5rem; display: flex; justify-content: center; align-items: center;">
      <nx-tooltip placement="bottom" variant="dark" max-width="20rem" ?open=${true}>
        <nx-button color="primary">
          <nx-icon slot="start" name="sparkles"></nx-icon>
          Rich Tooltip
        </nx-button>
        <div slot="content" style="padding: 0.25rem 0;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.375rem;">
            <nx-icon name="keyboard" size="16" color="#38bdf8"></nx-icon>
            <strong style="color: #ffffff; font-size: 0.8125rem;">Keyboard Shortcut</strong>
          </div>
          <p style="margin: 0 0 0.5rem; font-size: 0.75rem; color: #94a3b8; line-height: 1.4;">
            Press the shortcut below to quickly trigger dynamic form generation.
          </p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 0.375rem;">
            <span style="font-size: 0.6875rem; color: #cbd5e1;">Quick action</span>
            <span style="background: rgba(255,255,255,0.15); padding: 0.125rem 0.375rem; border-radius: 3px; font-family: monospace; font-size: 0.6875rem;">⌘ + K</span>
          </div>
        </div>
      </nx-tooltip>
    </div>
  `,
};

export const ExternalTarget: StoryObj = {
  render: () => html`
    <div style="padding: 4rem; display: flex; flex-direction: column; align-items: center; gap: 1.5rem;">
      <p style="color: #64748b; font-size: 0.875rem; margin: 0;">
        The tooltip is rendered separately and attached to the button below using <code>target="btn-download"</code>:
      </p>

      <nx-button id="btn-download" color="primary">
        <nx-icon slot="start" name="download"></nx-icon>
        Download Assets
      </nx-button>

      <nx-tooltip
        target="btn-download"
        content="Download full UI component kit archive (.zip)"
        placement="bottom"
        variant="primary"
      ></nx-tooltip>
    </div>
  `,
};

/**
 * Custom Styling via CSS Custom Properties
 * Demonstrates theming tooltips with custom backgrounds, borders, shadows, and pill shapes.
 */
export const CustomStyling: StoryObj = {
  render: () => html`
    <div style="padding: 5rem 2rem; display: flex; gap: 2.5rem; flex-wrap: wrap; justify-content: center; align-items: center;">
      <!-- Emerald Pill Tooltip -->
      <nx-tooltip
        content="Verified Secure Deployment"
        placement="top"
        ?open=${true}
        style="
          --nx-tooltip-bg: #065f46;
          --nx-tooltip-color: #ecfdf5;
          --nx-tooltip-border-color: #10b981;
          --nx-tooltip-border-radius: 9999px;
          --nx-tooltip-padding: 0.45rem 1rem;
          --nx-tooltip-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
          --nx-tooltip-font-weight: 500;
        "
      >
        <nx-button color="success">Emerald Pill</nx-button>
      </nx-tooltip>

      <!-- Ocean Blue Card Tooltip -->
      <nx-tooltip
        content="Custom border & elevation shadow"
        placement="bottom"
        ?open=${true}
        style="
          --nx-tooltip-bg: #0284c7;
          --nx-tooltip-color: #ffffff;
          --nx-tooltip-border-color: #38bdf8;
          --nx-tooltip-border-width: 2px;
          --nx-tooltip-border-radius: 8px;
          --nx-tooltip-padding: 0.5rem 0.875rem;
          --nx-tooltip-shadow: 0 12px 28px rgba(2, 132, 199, 0.3);
          --nx-tooltip-font-size: 0.8125rem;
        "
      >
        <nx-button color="info">Ocean Blue</nx-button>
      </nx-tooltip>

      <!-- Sunset Amber Warning -->
      <nx-tooltip
        content="Rate limit: 120 requests remaining"
        placement="top"
        ?open=${true}
        style="
          --nx-tooltip-bg: #78350f;
          --nx-tooltip-color: #fef3c7;
          --nx-tooltip-border-color: #f59e0b;
          --nx-tooltip-border-radius: 6px;
          --nx-tooltip-padding: 0.4rem 0.75rem;
          --nx-tooltip-shadow: 0 8px 20px rgba(245, 158, 11, 0.2);
        "
      >
        <nx-button color="warning">Sunset Amber</nx-button>
      </nx-tooltip>

      <!-- Purple Neon Glow Tooltip -->
      <nx-tooltip
        content="Pro Feature · Unlimited Cloud Sync"
        placement="bottom"
        ?open=${true}
        style="
          --nx-tooltip-bg: #2e1065;
          --nx-tooltip-color: #f3e8ff;
          --nx-tooltip-border-color: #a855f7;
          --nx-tooltip-border-width: 1px;
          --nx-tooltip-border-radius: 10px;
          --nx-tooltip-padding: 0.5rem 0.95rem;
          --nx-tooltip-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
          --nx-tooltip-font-weight: 600;
        "
      >
        <nx-button color="primary">Neon Glow</nx-button>
      </nx-tooltip>
    </div>
  `,
};

/**
 * Custom Styling via CSS Shadow Parts (`::part`)
 * Demonstrates deep styling using `::part(bubble)`, `::part(content)`, and `::part(arrow)`.
 */
export const CustomStylingShadowParts: StoryObj = {
  render: () => html`
    <style>
      .custom-glass-tooltip::part(bubble) {
        background: rgba(15, 23, 42, 0.82);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(56, 189, 248, 0.35);
        border-radius: 12px;
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35), 0 0 16px rgba(56, 189, 248, 0.15);
        padding: 10px 16px;
      }
      .custom-glass-tooltip::part(arrow) {
        background: rgba(15, 23, 42, 0.82);
        border-right: 1px solid rgba(56, 189, 248, 0.35);
        border-bottom: 1px solid rgba(56, 189, 248, 0.35);
      }
      .custom-glass-tooltip::part(content) {
        color: #e0f2fe;
        font-family: var(--font-rubik, sans-serif);
        font-size: 13px;
        letter-spacing: 0.02em;
        line-height: 1.5;
      }

      .custom-gradient-tooltip::part(bubble) {
        background: linear-gradient(135deg, #8145b5 0%, #ec4899 100%);
        border: none;
        border-radius: 20px;
        box-shadow: 0 8px 24px rgba(236, 72, 153, 0.35);
        padding: 8px 18px;
      }
      .custom-gradient-tooltip::part(arrow) {
        background: #b847a9;
        border: none;
      }
      .custom-gradient-tooltip::part(content) {
        color: #ffffff;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        font-size: 11px;
      }
    </style>

    <div style="padding: 5rem 2rem; display: flex; gap: 3rem; flex-wrap: wrap; justify-content: center; align-items: center;">
      <!-- Glassmorphic Tooltip -->
      <nx-tooltip class="custom-glass-tooltip" placement="top" ?open=${true}>
        <nx-button color="dark">Glassmorphic ::part</nx-button>
        <div slot="content">
          <strong style="color: #38bdf8; display: block; margin-bottom: 2px;">Glassmorphism UI</strong>
          <span>Styled with backdrop blur and cyan neon borders</span>
        </div>
      </nx-tooltip>

      <!-- Gradient Badge Tooltip -->
      <nx-tooltip
        class="custom-gradient-tooltip"
        content="PRO FEATURE ACCESS"
        placement="bottom"
        ?open=${true}
      >
        <nx-button color="primary">Gradient ::part</nx-button>
      </nx-tooltip>
    </div>
  `,
};
