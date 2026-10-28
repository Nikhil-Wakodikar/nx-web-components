import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-icon>` renders high-quality, crisp SVG icons powered by the Lucide icon library.
 * It provides responsive sizing presets, custom pixel sizing, color token mapping,
 * stroke width adjustments, and ARIA accessibility labels.
 */
const meta: Meta = {
  title: 'NX Web Components/Icon',
  component: 'nx-icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-icon>\` component provides unified access to the complete Lucide icon family.
Icons render cleanly with vector SVGs that scale gracefully to any resolution.

---

### How to Use Custom Styling

\`<nx-icon>\` uses \`currentColor\` for SVG strokes by default, meaning it inherits the text color
of any parent element automatically.

#### 1. Public Styling Hooks
- Direct \`color\` property (supports design system tokens: \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\`, \`dark\`, \`medium\`, \`light\` or any CSS hex/rgb).
- Direct \`size\` property: \`small\` (16px), \`medium\` / \`default\` (20px), \`large\` (32px), or numbers (\`24\`, \`48\`).
- Inherited \`color\` via parent CSS:
\`\`\`css
.nav-link:hover nx-icon {
  color: #6366f1;
}
\`\`\`

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(svg)\`: Targets the inner \`<svg>\` element for drop-shadows, animations, or stroke effects.

\`\`\`css
nx-icon.spin::part(svg) {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Lucide icon identifier (kebab-case, camelCase, or alias)',
      defaultValue: 'heart',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', '24', '36', '48', '64'],
      description: 'Preset size string or explicit pixel dimensions',
      table: { defaultValue: { summary: 'medium' } },
    },
    color: {
      control: 'select',
      options: [
        undefined,
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'dark',
        'medium',
        '#ec4899',
        '#10b981',
      ],
      description: 'Color token name or custom CSS color string',
    },
    strokeWidth: {
      control: 'number',
      description: 'SVG stroke thickness',
      table: { defaultValue: { summary: '2' } },
    },
    label: {
      control: 'text',
      description: 'Accessible label for screen readers. Sets role="img" and aria-label.',
    },
  },
  args: {
    name: 'heart',
    size: 'medium',
    strokeWidth: 2,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-icon
      name=${ifDefined(args.name)}
      size=${ifDefined(args.size)}
      color=${ifDefined(args.color)}
      stroke-width=${ifDefined(args.strokeWidth)}
      label=${ifDefined(args.label)}
    ></nx-icon>
  `,
};

export const ColorTokens: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="check-circle" color="primary" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Primary</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="check-circle" color="secondary" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Secondary</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="check-circle" color="success" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Success</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="alert-triangle" color="warning" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Warning</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="alert-circle" color="danger" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Danger</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="info" color="info" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Info</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="moon" color="dark" size="28"></nx-icon>
        <span style="font-size: 12px; color: #64748b;">Dark</span>
      </div>
    </div>
  `,
};

export const SizingPresets: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: flex-end;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="star" size="small"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">small (16px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="star" size="medium"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">medium (20px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="star" size="large"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">large (32px)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="star" size="48" color="#f59e0b"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">custom 48px</span>
      </div>
    </div>
  `,
};

export const StrokeWidths: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="shield" size="32" stroke-width="1"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">stroke: 1</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="shield" size="32" stroke-width="2"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">stroke: 2 (default)</span>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; gap: 6px;">
        <nx-icon name="shield" size="32" stroke-width="3"></nx-icon>
        <span style="font-size: 11px; color: #64748b;">stroke: 3</span>
      </div>
    </div>
  `,
};

export const CommonIconGallery: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 16px;">
      ${[
        'user', 'settings', 'bell', 'search', 'mail', 'folder', 'calendar', 'clock',
        'camera', 'check', 'x', 'trash', 'plus', 'edit', 'download', 'upload',
        'external-link', 'copy', 'share-2', 'message-square', 'file-text', 'lock'
      ].map(
        (name) => html`
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 12px 8px; border: 1px solid #e2e8f0; border-radius: 8px; gap: 8px;">
            <nx-icon name=${name} size="24" color="primary"></nx-icon>
            <span style="font-size: 11px; color: #475569; text-align: center; word-break: break-all;">${name}</span>
          </div>
        `
      )}
    </div>
  `,
};

/**
 * Demonstrates Custom Styling using inherited CSS properties and CSS variables.
 */
export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
      <div style="color: #8145b5; display: flex; align-items: center; gap: 8px;">
        <nx-icon name="sparkles" size="28"></nx-icon>
        <span style="font-weight: 600; font-family: sans-serif;">Inherited Purple Text Color</span>
      </div>

      <div style="color: #0284c7; display: flex; align-items: center; gap: 8px;">
        <nx-icon name="cloud" size="28"></nx-icon>
        <span style="font-weight: 600; font-family: sans-serif;">Inherited Sky Blue Color</span>
      </div>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(svg)`) for animations, glow filters, and transformations.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .icon-spin::part(svg) {
        animation: nx-icon-spin 2s linear infinite;
      }
      .icon-glow::part(svg) {
        filter: drop-shadow(0 0 8px #ec4899);
      }
      .icon-bounce::part(svg) {
        transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      }
      .icon-bounce:hover::part(svg) {
        transform: scale(1.3) rotate(-10deg);
      }
      @keyframes nx-icon-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    </style>

    <div style="display: flex; gap: 32px; align-items: center; flex-wrap: wrap; padding: 12px 0;">
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <nx-icon class="icon-spin" name="loader-2" size="32" color="primary"></nx-icon>
        <span style="font-size: 12px; color: #64748b; font-family: sans-serif;">Spinning via ::part(svg)</span>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <nx-icon class="icon-glow" name="heart" size="32" color="#ec4899"></nx-icon>
        <span style="font-size: 12px; color: #64748b; font-family: sans-serif;">Glow Filter via ::part(svg)</span>
      </div>

      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <nx-icon class="icon-bounce" name="zap" size="32" color="warning"></nx-icon>
        <span style="font-size: 12px; color: #64748b; font-family: sans-serif;">Hover Bounce via ::part(svg)</span>
      </div>
    </div>
  `,
};


