import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-text>` provides semantic, consistent typographic hierarchy throughout the application.
 * It manages heading levels, body copies, captions, line clamping, text truncation,
 * transformations, weights, and complete CSS variable styling.
 */
const meta: Meta = {
  title: 'NX Web Components/Text',
  component: 'nx-text',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-text>\` component standardizes typography across design systems.
It separates visual style (\`variant\`) from semantic HTML elements (\`as\`),
allowing you to render an \`h2\` visually as an \`h1\`, or a \`span\` as a \`body\` text.

---

### How to Use Custom Styling

\`<nx-text>\` encapsulates typography using Shadow DOM and exposes full control
via **CSS Custom Properties** or the \`::part(text)\` selector.

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--color\` | Text color | Inherited from variant or parent |
| \`--font-size\` | Font size override | Set by variant |
| \`--font-weight\` | Font weight override | Set by variant |
| \`--line-height\` | Line height override | \`1.2\` - \`1.5\` |
| \`--letter-spacing\` | Letter spacing | Set by variant |
| \`--text-align\` | Text alignment | \`left\` |
| \`--text-transform\` | Casing transformation | \`none\` |
| \`--line-clamp\` | Number of visible lines before truncation | \`none\` |
| \`--font-family\` | Font family override | Rubik / system sans-serif |

#### 2. Inline Style Customization
\`\`\`html
<nx-text style="--color: #6366f1; --font-size: 28px; --font-weight: 700;">
  Custom Styled Headline
</nx-text>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle1',
        'subtitle2',
        'body',
        'body-sm',
        'caption',
        'overline',
        'label',
      ],
      description: 'Typographic visual variant hierarchy',
      table: { defaultValue: { summary: 'body' } },
    },
    as: {
      control: 'select',
      options: [undefined, 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'label', 'small', 'strong'],
      description: 'Underlying semantic HTML tag rendered in the DOM',
    },
    weight: {
      control: 'select',
      options: [undefined, 'light', 'regular', 'medium', 'semibold', 'bold'],
      description: 'Font weight preset',
    },
    align: {
      control: 'select',
      options: [undefined, 'left', 'center', 'right', 'justify'],
      description: 'Text alignment',
    },
    transform: {
      control: 'select',
      options: [undefined, 'none', 'capitalize', 'uppercase', 'lowercase'],
      description: 'Text casing transformation',
    },
    color: {
      control: 'color',
      description: 'Direct font color value',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncates single line with ellipsis when container overflows',
      table: { defaultValue: { summary: 'false' } },
    },
    lines: {
      control: 'number',
      description: 'Number of lines to clamp multiline text with ellipsis',
    },
    italic: {
      control: 'boolean',
      description: 'Applies italic font style',
      table: { defaultValue: { summary: 'false' } },
    },
    underline: {
      control: 'boolean',
      description: 'Applies underline text decoration',
      table: { defaultValue: { summary: 'false' } },
    },
    strikethrough: {
      control: 'boolean',
      description: 'Applies strikethrough line-through decoration',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    variant: 'body',
    truncate: false,
    italic: false,
    underline: false,
    strikethrough: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-text
      .variant=${args.variant}
      .as=${args.as}
      .weight=${args.weight}
      .align=${args.align}
      .transform=${args.transform}
      .color=${args.color}
      ?truncate=${args.truncate}
      .lines=${args.lines}
      ?italic=${args.italic}
      ?underline=${args.underline}
      ?strikethrough=${args.strikethrough}
    >
      The quick brown fox jumps over the lazy dog.
    </nx-text>
  `,
};

export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-text variant="h1">Heading 1 (h1 - 30px / Bold)</nx-text>
      <nx-text variant="h2">Heading 2 (h2 - 24px / SemiBold)</nx-text>
      <nx-text variant="h3">Heading 3 (h3 - 20px / SemiBold)</nx-text>
      <nx-text variant="h4">Heading 4 (h4 - 18px / Medium)</nx-text>
      <nx-text variant="h5">Heading 5 (h5 - 16px / Medium)</nx-text>
      <nx-text variant="h6">Heading 6 (h6 - 14px / Medium)</nx-text>
      <nx-text variant="subtitle1">Subtitle 1 — Emphasized Section Lead</nx-text>
      <nx-text variant="subtitle2">Subtitle 2 — Secondary Section Subheading</nx-text>
      <nx-text variant="body">Body — Standard paragraphs and descriptions with optimal reading contrast.</nx-text>
      <nx-text variant="body-sm">Body Small — Secondary descriptions and ancillary information.</nx-text>
      <nx-text variant="caption">Caption — Small metadata, timestamps, and captions.</nx-text>
      <nx-text variant="overline">OVERLINE — UPPERCASE SUBHEADINGS AND CATEGORIES</nx-text>
      <nx-text variant="label">Label — Form labels and UI element identifiers.</nx-text>
    </div>
  `,
};

export const SemanticPolymorphism: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <p style="margin: 0; font-size: 13px; color: #64748b;">
        Decouple visual presentation from HTML semantics using the <code>as</code> prop:
      </p>
      <nx-text variant="h1" as="p">
        Renders an HTML &lt;p&gt; element styled visually as an &lt;h1&gt;
      </nx-text>
      <nx-text variant="caption" as="small">
        Renders an HTML &lt;small&gt; element styled visually as a caption
      </nx-text>
      <nx-text variant="body" as="strong" weight="bold">
        Renders an HTML &lt;strong&gt; element with bold weight
      </nx-text>
    </div>
  `,
};

export const TruncationAndClamping: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 400px;">
      <div>
        <h4 style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #64748b;">Single-Line Truncate</h4>
        <div style="border: 1px dashed #cbd5e1; padding: 12px; border-radius: 6px;">
          <nx-text truncate>
            This is an exceptionally long single-line headline that will smoothly truncate with an ellipsis once it reaches the edge of its parent container.
          </nx-text>
        </div>
      </div>

      <div>
        <h4 style="margin: 0 0 8px; font-family: sans-serif; font-size: 14px; color: #64748b;">Multi-Line Clamping (lines=2)</h4>
        <div style="border: 1px dashed #cbd5e1; padding: 12px; border-radius: 6px;">
          <nx-text .lines=${2}>
            Stencil enables developers to build standards-compliant Web Components that run seamlessly across React, Angular, Vue, and vanilla JavaScript without framework overhead or lock-in.
          </nx-text>
        </div>
      </div>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <nx-text style="--color: #8145b5; --font-size: 26px; --font-weight: 700; --letter-spacing: -0.02em;">
        Custom Purple Brand Heading
      </nx-text>

      <nx-text style="--color: #059669; --font-weight: 600; --text-transform: uppercase;">
        Custom Green Uppercase Status
      </nx-text>

      <nx-text
        style="
          background: linear-gradient(135deg, #6366f1, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 32px;
          font-weight: 800;
        "
      >
        Gradient Text Effect
      </nx-text>
    </div>
  `,
};

