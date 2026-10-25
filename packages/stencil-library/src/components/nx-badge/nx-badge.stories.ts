import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-badge>` is an accessible, versatile indicator component used to highlight status,
 * numerical counts, tags, or unread notifications. It supports standalone and floating
 * badge positions, dot and pulse animations, multiple shapes, and CSS variable styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Badge',
  component: 'nx-badge',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-badge>\` component highlights numerical counts, statuses, or labels.
It functions in two primary modes:
1. **Standalone Badge**: Renders an inline pill, rounded, or circular status tag.
2. **Floating / Anchored Badge**: When \`placement\` is set, wraps any child element (such as an avatar or button) and positions the badge at one of its four corners.

---

### How to Use Custom Styling

\`<nx-badge>\` uses Shadow DOM encapsulation. You can customize its styling using
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-badge-bg\` | Badge background color | Determined by \`color\` token & \`variant\` |
| \`--nx-badge-text-color\` | Text / symbol color | Contrast color for theme or \`#ffffff\` |
| \`--nx-badge-border-color\` | Border color for outline & subtle styles | Matches theme color or transparent |
| \`--nx-badge-pulse-color\` | Color of animated pulsing ring | Matches theme color |
| \`--nx-badge-font-family\` | Font family of badge label | \`sans-serif\` |

#### 2. Inline Style Customization
Pass CSS variables directly via the \`style\` attribute:
\`\`\`html
<nx-badge value="VIP" style="--nx-badge-bg: #f59e0b; --nx-badge-text-color: #000; font-weight: 700;"></nx-badge>
\`\`\`

#### 3. Shadow Parts Styling (\`::part\`)
- \`::part(badge)\`: Targets the inner \`<span>\` badge element.
- \`::part(anchor)\`: Targets the wrapper around slotted content when \`placement\` is set.

\`\`\`css
nx-badge::part(badge) {
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Numerical count or text label displayed in the badge',
      defaultValue: '8',
    },
    variant: {
      control: 'select',
      options: ['solid', 'subtle', 'outline'],
      description: 'Visual fill variant',
      table: { defaultValue: { summary: 'solid' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'error', 'info', 'dark', 'light', '#8b5cf6', '#ec4899'],
      description: 'Color theme token or any custom CSS color string',
      table: { defaultValue: { summary: 'primary' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    shape: {
      control: 'select',
      options: ['pill', 'rounded', 'circle'],
      description: 'Corner radius shape',
      table: { defaultValue: { summary: 'pill' } },
    },
    dot: {
      control: 'boolean',
      description: 'When true, displays a minimal status dot without text',
      table: { defaultValue: { summary: 'false' } },
    },
    pulse: {
      control: 'boolean',
      description: 'When true, displays an animated ping/pulse ring around the badge',
      table: { defaultValue: { summary: 'false' } },
    },
    max: {
      control: 'number',
      description: 'Maximum numerical value before displaying max+ (e.g. 99+)',
      table: { defaultValue: { summary: '99' } },
    },
    placement: {
      control: 'select',
      options: [undefined, 'top-end', 'top-start', 'bottom-end', 'bottom-start'],
      description: 'Corner anchor placement when wrapping child content',
    },
  },
  args: {
    value: '8',
    variant: 'solid',
    color: 'primary',
    size: 'md',
    shape: 'pill',
    dot: false,
    pulse: false,
    max: 99,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-badge
      .value=${args.value}
      .variant=${args.variant}
      .color=${args.color}
      .size=${args.size}
      .shape=${args.shape}
      ?dot=${args.dot}
      ?pulse=${args.pulse}
      .max=${args.max}
      .placement=${args.placement}
    >
      ${args.placement ? html`<nx-button fill="outline">Notifications</nx-button>` : ''}
    </nx-badge>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Solid (High Emphasis)</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <nx-badge variant="solid" color="primary" value="Primary"></nx-badge>
          <nx-badge variant="solid" color="secondary" value="Secondary"></nx-badge>
          <nx-badge variant="solid" color="success" value="Success"></nx-badge>
          <nx-badge variant="solid" color="warning" value="Warning"></nx-badge>
          <nx-badge variant="solid" color="danger" value="Danger"></nx-badge>
          <nx-badge variant="solid" color="info" value="Info"></nx-badge>
          <nx-badge variant="solid" color="dark" value="Dark"></nx-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Subtle (Low / Medium Emphasis)</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <nx-badge variant="subtle" color="primary" value="Primary"></nx-badge>
          <nx-badge variant="subtle" color="secondary" value="Secondary"></nx-badge>
          <nx-badge variant="subtle" color="success" value="Success"></nx-badge>
          <nx-badge variant="subtle" color="warning" value="Warning"></nx-badge>
          <nx-badge variant="subtle" color="danger" value="Danger"></nx-badge>
          <nx-badge variant="subtle" color="info" value="Info"></nx-badge>
          <nx-badge variant="subtle" color="dark" value="Dark"></nx-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Outline (Border Only)</h4>
        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
          <nx-badge variant="outline" color="primary" value="Primary"></nx-badge>
          <nx-badge variant="outline" color="secondary" value="Secondary"></nx-badge>
          <nx-badge variant="outline" color="success" value="Success"></nx-badge>
          <nx-badge variant="outline" color="warning" value="Warning"></nx-badge>
          <nx-badge variant="outline" color="danger" value="Danger"></nx-badge>
          <nx-badge variant="outline" color="info" value="Info"></nx-badge>
          <nx-badge variant="outline" color="dark" value="Dark"></nx-badge>
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
        <div style="display: flex; gap: 16px; align-items: center;">
          <nx-badge size="sm" color="primary" value="Small (sm)"></nx-badge>
          <nx-badge size="md" color="primary" value="Medium (md)"></nx-badge>
          <nx-badge size="lg" color="primary" value="Large (lg)"></nx-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-family: sans-serif; font-size: 14px; color: #64748b;">Shapes (pill, rounded, circle)</h4>
        <div style="display: flex; gap: 16px; align-items: center;">
          <nx-badge shape="pill" color="info" value="Pill Shape"></nx-badge>
          <nx-badge shape="rounded" color="info" value="Rounded Shape"></nx-badge>
          <nx-badge shape="circle" color="info" value="5"></nx-badge>
          <nx-badge shape="circle" color="danger" value="99+"></nx-badge>
        </div>
      </div>
    </div>
  `,
};

export const DotAndPulseIndicators: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px;">
      <div style="display: flex; gap: 24px; align-items: center;">
        <span style="display: inline-flex; align-items: center; gap: 8px; font-family: sans-serif; font-size: 14px;">
          <nx-badge dot color="success" size="sm"></nx-badge>
          Online (Static Dot)
        </span>
        <span style="display: inline-flex; align-items: center; gap: 8px; font-family: sans-serif; font-size: 14px;">
          <nx-badge dot pulse color="success" size="md"></nx-badge>
          Live Activity (Pulsing Dot)
        </span>
        <span style="display: inline-flex; align-items: center; gap: 8px; font-family: sans-serif; font-size: 14px;">
          <nx-badge dot pulse color="danger" size="md"></nx-badge>
          Critical Alert (Pulsing Dot)
        </span>
      </div>

      <div style="display: flex; gap: 24px; align-items: center;">
        <nx-badge pulse color="primary" value="New Feature"></nx-badge>
        <nx-badge pulse color="danger" value="Urgent"></nx-badge>
      </div>
    </div>
  `,
};

export const PlacementsAndAnchoring: Story = {
  render: () => html`
    <div style="display: flex; gap: 32px; flex-wrap: wrap; align-items: center; padding: 16px 0;">
      <nx-badge placement="top-end" color="danger" value="3">
        <nx-button fill="outline">Inbox</nx-button>
      </nx-badge>

      <nx-badge placement="top-start" color="primary" value="NEW">
        <nx-button fill="solid">Messages</nx-button>
      </nx-badge>

      <nx-badge placement="bottom-end" dot pulse color="success">
        <div style="width: 44px; height: 44px; border-radius: 50%; background: #e2e8f0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #475569;">
          JD
        </div>
      </nx-badge>

      <nx-badge placement="top-end" color="warning" value="99+" max="99">
        <nx-button fill="clear">Alerts</nx-button>
      </nx-badge>
    </div>
  `,
};

export const MaxThreshold: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center;">
      <nx-badge color="danger" value="12" max="99"></nx-badge>
      <nx-badge color="danger" value="99" max="99"></nx-badge>
      <nx-badge color="danger" value="150" max="99"></nx-badge>
      <nx-badge color="info" value="10" max="9"></nx-badge>
      <nx-badge color="primary" value="1000" max="999"></nx-badge>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 28px; font-family: sans-serif;">
      <!-- 1. CSS Custom Properties -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #475569;">
          1. CSS Custom Properties (--nx-badge-bg, --nx-badge-text-color, --nx-badge-border-color)
        </h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-badge
            value="Neon Amber"
            style="--nx-badge-bg: #f59e0b; --nx-badge-text-color: #000000; font-weight: 700;"
          ></nx-badge>

          <nx-badge
            value="Cyber Gradient"
            style="--nx-badge-bg: linear-gradient(135deg, #6366f1, #ec4899); --nx-badge-text-color: #ffffff; font-weight: 600;"
          ></nx-badge>

          <nx-badge
            value="Sunset Glow"
            style="--nx-badge-bg: linear-gradient(135deg, #f97316, #e11d48); --nx-badge-text-color: #ffffff; font-weight: 600;"
          ></nx-badge>

          <nx-badge
            variant="outline"
            value="Custom Cyan Border &amp; Text"
            style="--nx-badge-border-color: #06b6d4; --nx-badge-text-color: #0891b2; font-weight: 600;"
          ></nx-badge>

          <nx-badge
            value="CODE MONO"
            style="--nx-badge-bg: #1e293b; --nx-badge-text-color: #38bdf8; --nx-badge-font-family: monospace; --nx-badge-font-weight: 700;"
          ></nx-badge>
        </div>
      </div>

      <!-- 2. Custom Pulse Glow Colors -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #475569;">
          2. Custom Pulsing Ring Colors (--nx-badge-pulse-color)
        </h4>
        <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
          <span style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px;">
            <nx-badge
              dot
              pulse
              style="--nx-badge-bg: #06b6d4; --nx-badge-pulse-color: #06b6d4;"
            ></nx-badge>
            Cyan Live Stream
          </span>

          <span style="display: inline-flex; align-items: center; gap: 8px; font-size: 13px;">
            <nx-badge
              dot
              pulse
              style="--nx-badge-bg: #ec4899; --nx-badge-pulse-color: #ec4899;"
            ></nx-badge>
            Hot Pink Alert
          </span>

          <nx-badge
            pulse
            value="EXCLUSIVE OFFER"
            style="--nx-badge-bg: #8b5cf6; --nx-badge-pulse-color: #8b5cf6; font-weight: 700;"
          ></nx-badge>
        </div>
      </div>

      <!-- 3. Arbitrary Hex / RGB Colors -->
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #475569;">
          3. Custom Color Prop (Arbitrary Hex / RGB)
        </h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-badge color="#8b5cf6" value="#8b5cf6 Solid"></nx-badge>
          <nx-badge variant="subtle" color="#8b5cf6" value="#8b5cf6 Subtle"></nx-badge>
          <nx-badge variant="outline" color="#8b5cf6" value="#8b5cf6 Outline"></nx-badge>
          <nx-badge color="#059669" value="Emerald #059669"></nx-badge>
          <nx-badge color="#db2777" value="Rose #db2777"></nx-badge>
        </div>
      </div>
    </div>
  `,
};

/**
 * Custom Styling for Dark Mode Containers
 * High-contrast indicators and translucent glassmorphism tags on dark backgrounds.
 */
export const CustomStylingDarkMode: Story = {
  render: () => html`
    <div
      style="
        max-width: 600px;
        padding: 24px;
        background: #0f172a;
        border-radius: 14px;
        border: 1px solid #1e293b;
        font-family: sans-serif;
      "
    >
      <h4 style="margin: 0 0 16px; font-size: 13px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">
        Dark Mode Theme Customization
      </h4>

      <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 24px;">
        <!-- Translucent frosted badge -->
        <nx-badge
          value="Glassmorphic Pill"
          style="
            --nx-badge-bg: rgba(255, 255, 255, 0.12);
            --nx-badge-text-color: #f1f5f9;
            --nx-badge-border-color: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(4px);
          "
        ></nx-badge>

        <!-- Neon green online dot -->
        <nx-badge
          dot
          pulse
          style="--nx-badge-bg: #10b981; --nx-badge-pulse-color: #10b981;"
        ></nx-badge>
        <span style="color: #cbd5e1; font-size: 13px;">Active Session</span>

        <!-- Dark outline badge -->
        <nx-badge
          variant="outline"
          value="Dark Border"
          style="--nx-badge-border-color: #475569; --nx-badge-text-color: #94a3b8;"
        ></nx-badge>
      </div>

      <!-- Anchored in dark container -->
      <div style="display: flex; gap: 32px; align-items: center;">
        <nx-badge
          placement="bottom-end"
          dot
          pulse
          style="--nx-badge-bg: #22c55e; --nx-badge-pulse-color: #22c55e;"
        >
          <div
            style="
              width: 44px;
              height: 44px;
              border-radius: 50%;
              background: #1e293b;
              color: #f8fafc;
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: 600;
              font-size: 14px;
              border: 1px solid #334155;
            "
          >
            JD
          </div>
        </nx-badge>

        <nx-badge
          placement="top-end"
          value="99+"
          style="
            --nx-badge-bg: #f43f5e;
            --nx-badge-text-color: #ffffff;
            font-weight: 700;
          "
        >
          <nx-button color="dark" fill="outline">Notifications</nx-button>
        </nx-badge>
      </div>
    </div>
  `,
};

/**
 * Custom Styling via Shadow Parts (::part)
 * Deeply style badge internals (typography, glow effects, letter spacing).
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .badge-glow::part(badge) {
        box-shadow: 0 0 12px rgba(129, 69, 181, 0.7);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 700;
      }
      .badge-amber-glow::part(badge) {
        box-shadow: 0 0 10px rgba(245, 158, 11, 0.6);
        border: 1px solid #fde68a;
        letter-spacing: 0.05em;
      }
      .badge-pill-spacing::part(badge) {
        letter-spacing: 0.12em;
        text-transform: uppercase;
        font-size: 11px;
      }
    </style>

    <div style="display: flex; flex-direction: column; gap: 20px; font-family: sans-serif;">
      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #475569;">
          Glowing Drop Shadow via ::part(badge)
        </h4>
        <div style="display: flex; gap: 20px; align-items: center;">
          <nx-badge class="badge-glow" color="primary" value="PRO FEATURE"></nx-badge>
          <nx-badge class="badge-amber-glow" color="warning" value="EARLY ACCESS"></nx-badge>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 12px; font-size: 14px; font-weight: 600; color: #475569;">
          Custom Letter Spacing via ::part(badge)
        </h4>
        <div style="display: flex; gap: 16px; align-items: center;">
          <nx-badge class="badge-pill-spacing" color="info" value="TRACKING ACTIVE"></nx-badge>
          <nx-badge class="badge-pill-spacing" color="secondary" value="RELEASE V2.4"></nx-badge>
        </div>
      </div>
    </div>
  `,
};

