import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

/**
 * `<nx-divider>` is a separator component used to group, demarcate, or organize
 * layout sections and content items. It supports horizontal and vertical orientations,
 * line styles (solid, dashed, dotted), color tokens, thickness and spacing scales,
 * inset indentation, and centered or aligned labels with optional icons and badges.
 */
const meta: Meta = {
  title: 'NX Web Components/Divider',
  component: 'nx-divider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-divider>\` component provides clean separation between content blocks or inline elements.

Key capabilities:
- **Horizontal & Vertical**: Separate rows of content or inline navigation and toolbar actions.
- **Line Styles**: \`solid\`, \`dashed\`, and \`dotted\`.
- **Text & Slotted Content**: Insert labels, badges, or icons in the divider with configurable alignment (\`start\`, \`center\`, \`end\`).
- **Thickness & Spacing Scales**: Configurable via presets or custom dimensions.
- **Theme Colors**: Native support for design system tokens (\`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\`, etc.).
- **Inset Mode**: Indents the divider from parent container edges.

---

### How to Use Custom Styling

\`<nx-divider>\` encapsulates its styles using Shadow DOM. You can customize its styling using
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-divider-color\` | Color of the separator line | \`#e2e8f0\` |
| \`--nx-divider-style\` | Border style (\`solid\`, \`dashed\`, \`dotted\`) | \`solid\` |
| \`--nx-divider-thickness\` | Border thickness | \`1px\` |
| \`--nx-divider-spacing\` | Margin spacing (top/bottom or left/right) | \`16px\` |
| \`--nx-divider-label-color\` | Text color for the label | \`#64748b\` |
| \`--nx-divider-label-font-size\` | Font size of the label | \`13px\` |
| \`--nx-divider-label-padding\` | Padding around the label | \`12px\` |

#### 2. Inline Style Customization
\`\`\`html
<nx-divider style="--nx-divider-color: #8145b5; --nx-divider-thickness: 2px;"></nx-divider>
\`\`\`

#### 3. Shadow Parts Styling (\`::part\`)
- \`::part(divider)\`: The divider wrapper.
- \`::part(line)\`: The line element(s).
- \`::part(line-start)\`: The start line segment when label is present.
- \`::part(line-end)\`: The end line segment when label is present.
- \`::part(label)\`: The label container.
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the divider',
      table: { defaultValue: { summary: 'horizontal' } },
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style pattern',
      table: { defaultValue: { summary: 'solid' } },
    },
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'info',
        'muted',
        'dark',
      ],
      description: 'Color theme token or CSS color',
      table: { defaultValue: { summary: 'default' } },
    },
    thickness: {
      control: 'select',
      options: ['hairline', 'thin', 'medium', 'thick'],
      description: 'Line thickness preset or pixel size',
      table: { defaultValue: { summary: 'thin' } },
    },
    spacing: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Margin spacing surrounding the divider',
      table: { defaultValue: { summary: 'md' } },
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment of label content',
      table: { defaultValue: { summary: 'center' } },
    },
    inset: {
      control: 'boolean',
      description: 'Whether to inset the divider from container edges',
      table: { defaultValue: { summary: 'false' } },
    },
    label: {
      control: 'text',
      description: 'Text label displayed within the divider',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    color: 'default',
    thickness: 'thin',
    spacing: 'md',
    inset: false,
  },
  render: (args) => html`
    <div style="max-width: 600px; font-family: sans-serif;">
      <p style="margin: 0; color: #334155;">Above content paragraph demonstrating natural document flow.</p>
      <nx-divider
        orientation=${ifDefined(args.orientation)}
        variant=${ifDefined(args.variant)}
        color=${ifDefined(args.color)}
        thickness=${ifDefined(args.thickness)}
        spacing=${ifDefined(args.spacing)}
        ?inset=${args.inset}
        label=${ifDefined(args.label)}
      ></nx-divider>
      <p style="margin: 0; color: #334155;">Below content paragraph separated cleanly by the divider.</p>
    </div>
  `,
};

export const LineVariants: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 8px; max-width: 600px; font-family: sans-serif;">
      <span style="font-size: 13px; color: #64748b; font-weight: 600;">SOLID (Default)</span>
      <nx-divider variant="solid"></nx-divider>

      <span style="font-size: 13px; color: #64748b; font-weight: 600;">DASHED</span>
      <nx-divider variant="dashed"></nx-divider>

      <span style="font-size: 13px; color: #64748b; font-weight: 600;">DOTTED</span>
      <nx-divider variant="dotted"></nx-divider>
    </div>
  `,
};

export const WithLabelsAndAlignment: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 16px; max-width: 640px; font-family: sans-serif;">
      <div>
        <span style="font-size: 13px; color: #64748b; font-weight: 600;">CENTERED LABEL</span>
        <nx-divider label="OR"></nx-divider>
      </div>

      <div>
        <span style="font-size: 13px; color: #64748b; font-weight: 600;">START / LEFT ALIGNED</span>
        <nx-divider align="start" label="SECTION HEADER"></nx-divider>
      </div>

      <div>
        <span style="font-size: 13px; color: #64748b; font-weight: 600;">END / RIGHT ALIGNED</span>
        <nx-divider align="end" label="STEP 2 OF 4"></nx-divider>
      </div>

      <div>
        <span style="font-size: 13px; color: #64748b; font-weight: 600;">DASHED WITH CENTERED LABEL</span>
        <nx-divider variant="dashed" color="primary" label="CONTINUE WITH SOCIAL"></nx-divider>
      </div>
    </div>
  `,
};

export const SlottedContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 20px; max-width: 640px; font-family: sans-serif;">
      <div>
        <nx-divider>
          <nx-badge color="primary" value="NEW UPDATE" size="sm"></nx-badge>
        </nx-divider>
      </div>

      <div>
        <nx-divider color="secondary" variant="dashed">
          <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #475569; font-weight: 500;">
            <nx-icon name="user" size="small"></nx-icon>
            Profile Information
          </span>
        </nx-divider>
      </div>

      <div>
        <nx-divider align="start" color="info">
          <nx-chip label="Security Rules" size="sm" color="info"></nx-chip>
        </nx-divider>
      </div>
    </div>
  `,
};

export const ColorTokens: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; font-family: sans-serif;">
      <nx-divider color="default" label="Default"></nx-divider>
      <nx-divider color="primary" label="Primary"></nx-divider>
      <nx-divider color="secondary" label="Secondary"></nx-divider>
      <nx-divider color="success" label="Success"></nx-divider>
      <nx-divider color="warning" label="Warning"></nx-divider>
      <nx-divider color="danger" label="Danger"></nx-divider>
      <nx-divider color="info" label="Info"></nx-divider>
      <nx-divider color="dark" label="Dark"></nx-divider>
    </div>
  `,
};

export const ThicknessScale: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 12px; max-width: 600px; font-family: sans-serif;">
      <span style="font-size: 12px; color: #64748b;">Hairline / Thin (1px)</span>
      <nx-divider thickness="thin" color="primary"></nx-divider>

      <span style="font-size: 12px; color: #64748b;">Medium (2px)</span>
      <nx-divider thickness="medium" color="primary"></nx-divider>

      <span style="font-size: 12px; color: #64748b;">Thick (4px)</span>
      <nx-divider thickness="thick" color="primary"></nx-divider>
    </div>
  `,
};

export const VerticalOrientation: Story = {
  render: () => html`
    <div style="display: flex; align-items: center; height: 48px; background: #ffffff; padding: 0 16px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: sans-serif;">
      <span style="font-weight: 600; font-size: 14px; color: #1e293b;">App Brand</span>
      <nx-divider orientation="vertical" spacing="md"></nx-divider>
      <nx-link href="#">Dashboard</nx-link>
      <nx-divider orientation="vertical" spacing="md"></nx-divider>
      <nx-link href="#">Settings</nx-link>
      <nx-divider orientation="vertical" spacing="md"></nx-divider>
      <nx-badge color="success" value="Active" size="sm"></nx-badge>
    </div>
  `,
};

export const InsetDivider: Story = {
  render: () => html`
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 480px; overflow: hidden; font-family: sans-serif;">
      <div style="padding: 16px;">
        <h4 style="margin: 0 0 4px; font-size: 15px; color: #0f172a;">Card Item 1</h4>
        <p style="margin: 0; font-size: 13px; color: #64748b;">First section with descriptive text.</p>
      </div>

      <nx-divider inset></nx-divider>

      <div style="padding: 16px;">
        <h4 style="margin: 0 0 4px; font-size: 15px; color: #0f172a;">Card Item 2</h4>
        <p style="margin: 0; font-size: 13px; color: #64748b;">Second section indented cleanly from the borders.</p>
      </div>
    </div>
  `,
};

/**
 * Demonstrates Custom Styling using CSS Custom Properties (`--nx-divider-color`, `--nx-divider-thickness`, etc.).
 */
export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 24px; max-width: 600px; font-family: sans-serif;">
      <div>
        <span style="font-size: 13px; font-weight: 600; color: #475569;">1. Neon Purple Gradient Line</span>
        <nx-divider
          label="EXCLUSIVE CONTENT"
          style="
            --nx-divider-color: #8145b5;
            --nx-divider-thickness: 2px;
            --nx-divider-label-color: #8145b5;
            --nx-divider-label-font-weight: 700;
          "
        ></nx-divider>
      </div>

      <div>
        <span style="font-size: 13px; font-weight: 600; color: #475569;">2. Dark Slate & Amber Highlight</span>
        <nx-divider
          label="SYSTEM CHECKPOINT"
          style="
            --nx-divider-color: #f59e0b;
            --nx-divider-thickness: 3px;
            --nx-divider-label-color: #b45309;
            --nx-divider-label-font-size: 11px;
            --nx-divider-spacing: 24px;
          "
        ></nx-divider>
      </div>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`::part(line)`, `::part(label)`, `::part(divider)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .styled-divider-parts::part(line) {
        border-top: 2px dashed #0284c7;
      }
      .styled-divider-parts::part(label) {
        background: #e0f2fe;
        color: #0369a1;
        padding: 4px 14px;
        border-radius: 9999px;
        font-weight: 700;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        border: 1px solid #bae6fd;
      }
    </style>

    <div style="max-width: 600px; font-family: sans-serif;">
      <nx-divider class="styled-divider-parts" label="Pill Label via ::part(label)"></nx-divider>
    </div>
  `,
};


