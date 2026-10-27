import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-button>` is an accessible, themeable web component built with Stencil.
 * It provides solid, outline, and clear fill variants, predefined theme colors,
 * multiple size presets, customizable corner shapes, expansion widths,
 * slot positions for icons, and an extensive CSS Custom Property API.
 */
const meta: Meta = {
  title: 'NX Web Components/Button',
  component: 'nx-button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-button>\` component supports solid, outline (with default border), and clear fills,
customizable corner shapes, size presets, icon slots, and deep CSS customization via
**CSS Custom Properties** and **CSS Shadow Parts** (\`::part\`).

---

### How to Use Custom Styling

\`<nx-button>\` uses Shadow DOM for style encapsulation. You can customize its appearance
without breaking encapsulation using **CSS Custom Properties** or **CSS Shadow Parts**.

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--background\` | Button background color (or text/border for outline/clear) | \`var(--nx-color-primary, #8145b5)\` |
| \`--background-hover\` | Hover background color | \`#6e389c\` |
| \`--background-activated\` | Active / pressed background color | \`#5b2e81\` |
| \`--background-focused\` | Focus background color | \`#6e389c\` |
| \`--color\` | Button text and icon color | \`#ffffff\` |
| \`--color-hover\` | Text color on hover | \`#ffffff\` |
| \`--color-activated\` | Text color when pressed | \`#ffffff\` |
| \`--color-focused\` | Text color when focused | \`#ffffff\` |
| \`--border-color\` | Border color (defaults to \`--background\` for outline) | \`transparent\` (solid) / \`--background\` (outline) |
| \`--border-color-hover\` | Border color on hover | \`--background-hover\` |
| \`--border-color-activated\` | Border color when active | \`--background-activated\` |
| \`--border-width\` | Border thickness | \`0\` (solid) / \`1px\` (outline) |
| \`--border-style\` | Border line style (\`solid\`, \`dashed\`, \`dotted\`) | \`solid\` |
| \`--border-radius\` | Corner radius | \`0.375rem\` (6px) (\`999px\` for round) |
| \`--padding-top\` | Top padding | \`0.375rem\` (6px) (\`0.25rem\` sm, \`0.5rem\` lg) |
| \`--padding-bottom\` | Bottom padding | \`0.375rem\` (6px) (\`0.25rem\` sm, \`0.5rem\` lg) |
| \`--padding-start\` | Left padding | \`1rem\` (16px) (\`0.75rem\` sm, \`1.25rem\` lg) |
| \`--padding-end\` | Right padding | \`1rem\` (16px) (\`0.75rem\` sm, \`1.25rem\` lg) |
| \`--font-size\` | Font size | \`1rem\` (16px) (\`0.875rem\` sm, \`1.125rem\` lg) |
| \`--font-weight\` | Font weight | \`500\` |
| \`--box-shadow\` | Box shadow elevation | \`none\` |
| \`--opacity\` | Element opacity | \`1\` (\`0.5\` when disabled) |
| \`--transition\` | Transition animation | Smooth 0.2s ease transitions |

#### 2. Inline Style Customization
Pass CSS variables directly via the \`style\` attribute:
\`\`\`html
<nx-button style="--background: #ec4899; --border-radius: 9999px; --box-shadow: 0 4px 14px rgba(236,72,153,0.4);">
  Pink Pill Button
</nx-button>
\`\`\`

#### 3. Class-Based Theming in Your Stylesheets
Define classes with custom CSS properties in your CSS/SCSS files:
\`\`\`css
/* Gradient Brand Button */
.btn-brand-gradient {
  --background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  --color: #ffffff;
  --border-radius: 8px;
  --box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
  --font-weight: 600;
}

/* Custom Outline Accent */
.btn-accent-outline {
  --border-color: #0ea5e9;
  --border-width: 2px;
  --border-radius: 10px;
  --padding-start: 24px;
  --padding-end: 24px;
}
\`\`\`

#### 4. Shadow Parts Styling (\`::part\`)
For CSS rules not covered by CSS custom properties, use exported shadow parts:
- \`::part(native)\`: Targets the inner \`<button>\` element.
- \`::part(inner)\`: Targets the flex wrapper wrapping label and icon slots.

\`\`\`css
nx-button.stylish::part(native) {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    label: {
      name: 'Label / Content',
      control: 'text',
      description: 'Content rendered inside the button default slot',
      defaultValue: 'Button',
    },
    fill: {
      control: 'select',
      options: ['solid', 'outline', 'clear'],
      description: 'Fill variant style. "outline" displays a 1px solid border matching the button theme color by default.',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    variant: {
      control: 'select',
      options: [undefined, 'solid', 'outline', 'clear', 'ghost', 'text'],
      description: 'Visual variant alias for fill ("ghost" & "text" resolve to "clear")',
    },
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'light',
        'medium',
        'dark',
        '#6366f1',
        '#ec4899',
      ],
      description: 'Theme color preset or any custom CSS color string (hex, rgb, hsl)',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: 'Button size preset',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    shape: {
      control: 'select',
      options: [undefined, 'round', 'square'],
      description: 'Corner shape ("round" / "pill" applies 999px radius, "square" removes radius)',
    },
    expand: {
      control: 'select',
      options: [undefined, 'block', 'full'],
      description: 'Width expansion behavior ("block" = full container width; "full" = edge-to-edge without side borders)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Native HTML button type',
      table: {
        defaultValue: { summary: 'button' },
      },
    },
  },
  args: {
    label: 'Button',
    fill: 'solid',
    color: 'primary',
    size: 'default',
    disabled: false,
    type: 'button',
  },
};

export default meta;
type Story = StoryObj;

/**
 * Interactive playground with full controls to test all properties.
 */
export const Playground: Story = {
  render: (args) => html`
    <nx-button
      .fill=${args.fill}
      .variant=${args.variant}
      .color=${args.color}
      .size=${args.size}
      .shape=${args.shape}
      .expand=${args.expand}
      ?disabled=${args.disabled}
      .type=${args.type}
    >
      ${args.label}
    </nx-button>
  `,
};

/**
 * All fill variants: Solid, Outline (with default border), and Clear.
 * Also supports `variant="ghost"` and `variant="text"` as aliases for `clear`.
 */
export const FillsAndVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button fill="solid">Solid (Default)</nx-button>
      <nx-button fill="outline">Outline (Default Border)</nx-button>
      <nx-button fill="clear">Clear</nx-button>
      <nx-button variant="ghost">Ghost (Alias)</nx-button>
      <nx-button variant="text">Text (Alias)</nx-button>
    </div>
  `,
};

/**
 * Theme color presets in solid fill.
 */
export const ColorsSolid: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <nx-button color="primary">Primary</nx-button>
      <nx-button color="secondary">Secondary</nx-button>
      <nx-button color="success">Success</nx-button>
      <nx-button color="warning">Warning</nx-button>
      <nx-button color="danger">Danger</nx-button>
      <nx-button color="info">Info</nx-button>
      <nx-button color="light">Light</nx-button>
      <nx-button color="medium">Medium</nx-button>
      <nx-button color="dark">Dark</nx-button>
      <nx-button color="#8b5cf6">Custom Hex (#8b5cf6)</nx-button>
    </div>
  `,
};

/**
 * Theme color presets in outline fill, showing the automatic border color matching the theme.
 */
export const ColorsOutline: Story = {
  render: () => html`
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
      <nx-button fill="outline" color="primary">Primary</nx-button>
      <nx-button fill="outline" color="secondary">Secondary</nx-button>
      <nx-button fill="outline" color="success">Success</nx-button>
      <nx-button fill="outline" color="warning">Warning</nx-button>
      <nx-button fill="outline" color="danger">Danger</nx-button>
      <nx-button fill="outline" color="info">Info</nx-button>
      <nx-button fill="outline" color="dark">Dark</nx-button>
      <nx-button fill="outline" color="#8b5cf6">Custom Hex (#8b5cf6)</nx-button>
    </div>
  `,
};

/**
 * Sizes: Small (`small` / `sm`), Default (`default` / `md`), and Large (`large` / `lg`).
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button size="small">Small Button</nx-button>
      <nx-button size="default">Default Button</nx-button>
      <nx-button size="large">Large Button</nx-button>
    </div>
  `,
};

/**
 * Corner shapes: Rounded (default 6px), Round / Pill (`shape="round"` / `shape="pill"`), and Square (`shape="square"`).
 */
export const Shapes: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button>Default Rounded</nx-button>
      <nx-button shape="round">Round / Pill</nx-button>
      <nx-button shape="square">Square</nx-button>
      <nx-button fill="outline" shape="round">Outline Round</nx-button>
      <nx-button fill="outline" shape="square">Outline Square</nx-button>
    </div>
  `,
};

/**
 * Width expansion variants: Default (inline-block), Block (100% container width), and Full (edge-to-edge).
 */
export const Expansion: Story = {
  render: () => html`
    <div style="display: grid; gap: 16px; width: 100%; max-width: 480px;">
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">Default (inline-block):</p>
        <nx-button>Inline Button</nx-button>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">expand="block" (full container width):</p>
        <nx-button expand="block">Block Button</nx-button>
      </div>
      <div>
        <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">expand="full" (full width edge-to-edge):</p>
        <nx-button expand="full">Full Width Button</nx-button>
      </div>
    </div>
  `,
};

/**
 * Using icons with `nx-button` via `slot="start"` and `slot="end"`.
 */
export const WithIcons: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button>
        <nx-icon slot="start" name="plus"></nx-icon>
        Add Item
      </nx-button>
      <nx-button fill="outline" color="secondary">
        Download
        <nx-icon slot="end" name="arrow-right"></nx-icon>
      </nx-button>
      <nx-button color="success">
        <nx-icon slot="start" name="check"></nx-icon>
        Saved
      </nx-button>
      <nx-button color="danger" fill="outline">
        <nx-icon slot="start" name="trash-2"></nx-icon>
        Delete
      </nx-button>
      <nx-button shape="round" style="--padding-start: 10px; --padding-end: 10px;" aria-label="Settings">
        <nx-icon name="settings"></nx-icon>
      </nx-button>
    </div>
  `,
};

/**
 * Disabled state across all fills and color variations.
 */
export const Disabled: Story = {
  render: () => html`
    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button disabled>Solid Disabled</nx-button>
      <nx-button fill="outline" disabled>Outline Disabled</nx-button>
      <nx-button fill="clear" disabled>Clear Disabled</nx-button>
      <nx-button color="danger" disabled>Danger Disabled</nx-button>
    </div>
  `,
};

/**
 * Demonstrates Custom Styling via CSS Custom Properties (`style="--background: ..."`).
 */
export const CustomStylingVariables: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px;">
      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">1. Custom Colors & Shadows</h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-button
            style="
              --background: #10b981;
              --background-hover: #059669;
              --background-activated: #047857;
              --box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);
            "
          >
            Emerald Glow
          </nx-button>

          <nx-button
            style="
              --background: #f43f5e;
              --background-hover: #e11d48;
              --background-activated: #be123c;
              --box-shadow: 0 4px 14px rgba(244, 63, 94, 0.4);
            "
          >
            Rose Glow
          </nx-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">2. Custom Outline Border & Radius</h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-button
            fill="outline"
            style="
              --border-color: #f59e0b;
              --border-width: 2px;
              --border-radius: 12px;
              --color: #d97706;
              --background-hover-outline: rgba(245, 158, 11, 0.12);
            "
          >
            Amber 2px Border
          </nx-button>

          <nx-button
            fill="outline"
            style="
              --border-color: #6366f1;
              --border-style: dashed;
              --border-width: 2px;
              --color: #6366f1;
              --border-radius: 8px;
            "
          >
            Dashed Border
          </nx-button>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 10px; font-size: 14px; font-weight: 600;">3. Custom Padding, Font Size & Weight</h4>
        <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
          <nx-button
            style="
              --padding-start: 28px;
              --padding-end: 28px;
              --padding-top: 12px;
              --padding-bottom: 12px;
              --font-size: 18px;
              --font-weight: 700;
              --border-radius: 14px;
            "
          >
            Hero Action Button
          </nx-button>

          <nx-button
            style="
              --padding-start: 8px;
              --padding-end: 8px;
              --padding-top: 2px;
              --padding-bottom: 2px;
              --font-size: 12px;
              --border-radius: 4px;
            "
          >
            Micro Tag
          </nx-button>
        </div>
      </div>
    </div>
  `,
};

/**
 * Demonstrates advanced styling like Gradients, Glassmorphism, and Neon borders.
 */
export const CustomStylingGradientsAndGlass: Story = {
  render: () => html`
    <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
      <!-- Sunset Gradient -->
      <nx-button
        style="
          --background: linear-gradient(135deg, #f97316 0%, #ec4899 50%, #8b5cf6 100%);
          --color: #ffffff;
          --border-radius: 9999px;
          --box-shadow: 0 6px 20px rgba(236, 72, 153, 0.45);
          --font-weight: 600;
          --padding-start: 24px;
          --padding-end: 24px;
        "
      >
        Sunset Gradient
      </nx-button>

      <!-- Cyberpunk Neon -->
      <nx-button
        fill="outline"
        style="
          --background: transparent;
          --border-color: #06b6d4;
          --border-width: 2px;
          --color: #06b6d4;
          --border-radius: 6px;
          --box-shadow: 0 0 15px rgba(6, 182, 212, 0.5), inset 0 0 10px rgba(6, 182, 212, 0.2);
          --font-weight: 600;
          letter-spacing: 0.05em;
        "
      >
        Cyberpunk Neon
      </nx-button>

      <!-- Dark Luxury -->
      <nx-button
        style="
          --background: #18181b;
          --color: #fafafa;
          --border-color: #3f3f46;
          --border-width: 1px;
          --border-radius: 8px;
          --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1);
        "
      >
        Dark Minimal
      </nx-button>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(native)` and `::part(inner)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-part-btn::part(native) {
        letter-spacing: 0.15em;
        text-transform: uppercase;
        border: 2px solid #8145b5;
        background: transparent;
        color: #8145b5;
        transition: transform 0.15s ease, box-shadow 0.15s ease;
      }
      .custom-part-btn:hover::part(native) {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(129, 69, 181, 0.35);
      }
      .custom-part-btn:active::part(native) {
        transform: translateY(0);
      }
      .custom-part-btn::part(inner) {
        font-family: monospace;
      }
    </style>

    <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
      <nx-button class="custom-part-btn">
        Styled via ::part(native)
      </nx-button>
    </div>
  `,
};

