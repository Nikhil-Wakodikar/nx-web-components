import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-list>` and `<nx-list-item>` organize information into vertically stacked rows.
 * Features line divider modes (full, inset, none), clickable rows, start/end slots
 * for icons/badges/avatars, hyperlink navigation, and CSS custom property styling.
 */
const meta: Meta = {
  title: 'NX Web Components/List',
  component: 'nx-list',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The list system consists of:
- **\`<nx-list>\`**: The container managing divider styles, selection state, and background.
- **\`<nx-list-item>\`**: An individual list item supporting leading/trailing slots and interactive states.

---

### How to Use Custom Styling

\`<nx-list>\` and \`<nx-list-item>\` encapsulate their styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Scope | Description | Default Value |
| :--- | :--- | :--- | :--- |
| \`--nx-list-bg\` | List | Background color of the entire list | \`#ffffff\` |
| \`--nx-list-item-bg\` | Item | Item background color | \`transparent\` |
| \`--nx-list-item-color\` | Item | Item text color | \`#0f172a\` |
| \`--nx-list-item-border-color\` | Item | Divider line color | \`#e2e8f0\` |
| \`--nx-list-item-hover-bg\` | Item | Background when hovered | \`#f8fafc\` |
| \`--nx-list-item-active-bg\` | Item | Background when pressed | \`#f1f5f9\` |
| \`--nx-list-item-padding-x\` | Item | Left/Right padding | \`16px\` |
| \`--nx-list-item-min-height\` | Item | Minimum row height | \`48px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`nx-list::part(container)\`: List outer container.
- \`nx-list-item::part(inner)\`: Main row layout wrapper.
- \`nx-list-item::part(start)\`: Leading slot container.
- \`nx-list-item::part(content)\`: Center label content area.
- \`nx-list-item::part(end)\`: Trailing slot container.
        `,
      },
    },
  },
  argTypes: {
    lines: {
      control: 'select',
      options: ['full', 'inset', 'none'],
      description: 'Divider border style between items',
      table: { defaultValue: { summary: 'full' } },
    },
    clickable: {
      control: 'boolean',
      description: 'Enables click hover states on items',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Dims entire list and blocks interactions',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    lines: 'full',
    clickable: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 420px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <nx-list
        .lines=${args.lines}
        ?clickable=${args.clickable}
        ?disabled=${args.disabled}
      >
        <nx-list-item>
          <nx-icon slot="start" name="inbox" size="20" color="primary"></nx-icon>
          <div>
            <div style="font-weight: 500;">Inbox</div>
            <div style="font-size: 12px; color: #64748b;">Primary incoming emails</div>
          </div>
          <nx-badge slot="end" color="primary" value="12" size="sm"></nx-badge>
        </nx-list-item>

        <nx-list-item>
          <nx-icon slot="start" name="star" size="20" color="warning"></nx-icon>
          <div>
            <div style="font-weight: 500;">Starred</div>
            <div style="font-size: 12px; color: #64748b;">Saved messages</div>
          </div>
          <span slot="end" style="font-size: 12px; color: #94a3b8;">3</span>
        </nx-list-item>

        <nx-list-item>
          <nx-icon slot="start" name="archive" size="20" color="medium"></nx-icon>
          <div>
            <div style="font-weight: 500;">Archive</div>
            <div style="font-size: 12px; color: #64748b;">Older conversations</div>
          </div>
        </nx-list-item>
      </nx-list>
    </div>
  `,
};

export const InsetDividers: Story = {
  render: () => html`
    <div style="max-width: 420px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <nx-list lines="inset" clickable>
        <nx-list-item>
          <div slot="start" style="width: 36px; height: 36px; border-radius: 50%; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">
            JD
          </div>
          <div>
            <div style="font-weight: 500;">John Doe</div>
            <div style="font-size: 12px; color: #64748b;">Software Engineer</div>
          </div>
          <nx-icon slot="end" name="chevron-right" size="18" color="medium"></nx-icon>
        </nx-list-item>

        <nx-list-item>
          <div slot="start" style="width: 36px; height: 36px; border-radius: 50%; background: #10b981; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px;">
            AS
          </div>
          <div>
            <div style="font-weight: 500;">Alice Smith</div>
            <div style="font-size: 12px; color: #64748b;">Product Designer</div>
          </div>
          <nx-icon slot="end" name="chevron-right" size="18" color="medium"></nx-icon>
        </nx-list-item>
      </nx-list>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 420px; border-radius: 12px; overflow: hidden;">
      <nx-list
        style="
          --nx-list-bg: #0f172a;
        "
      >
        <nx-list-item
          clickable
          style="
            --nx-list-item-color: #f8fafc;
            --nx-list-item-border-color: #334155;
            --nx-list-item-hover-bg: #1e293b;
          "
        >
          <nx-icon slot="start" name="shield" size="20" color="#38bdf8"></nx-icon>
          <span style="font-weight: 500;">Security Diagnostics</span>
          <nx-badge slot="end" color="info" value="Secure" size="sm"></nx-badge>
        </nx-list-item>

        <nx-list-item
          clickable
          style="
            --nx-list-item-color: #f8fafc;
            --nx-list-item-border-color: #334155;
            --nx-list-item-hover-bg: #1e293b;
          "
        >
          <nx-icon slot="start" name="database" size="20" color="#a855f7"></nx-icon>
          <span style="font-weight: 500;">Database Snapshots</span>
          <nx-badge slot="end" color="success" value="Active" size="sm"></nx-badge>
        </nx-list-item>
      </nx-list>
    </div>
  `,
};

/**
 * Demonstrates CSS Shadow Parts (`nx-list::part(container)`, `nx-list-item::part(inner)`) for deep styling.
 */
export const CustomStylingShadowParts: Story = {
  render: () => html`
    <style>
      .custom-list-parts::part(container) {
        border: 2px dashed #8145b5;
        border-radius: 12px;
        padding: 6px;
        background: #faf5ff;
      }
      .custom-list-parts nx-list-item::part(inner) {
        border-radius: 8px;
        transition: transform 0.15s ease, background-color 0.15s ease;
      }
      .custom-list-parts nx-list-item:hover::part(inner) {
        transform: translateX(4px);
        background: #f3e8ff;
      }
    </style>

    <div style="max-width: 420px; font-family: sans-serif;">
      <nx-list class="custom-list-parts" lines="none">
        <nx-list-item clickable>
          <nx-icon slot="start" name="zap" size="18" color="primary"></nx-icon>
          Instant Deployment
          <nx-icon slot="end" name="chevron-right" size="16" color="medium"></nx-icon>
        </nx-list-item>
        <nx-list-item clickable>
          <nx-icon slot="start" name="cpu" size="18" color="primary"></nx-icon>
          Compute Allocation
          <nx-icon slot="end" name="chevron-right" size="16" color="medium"></nx-icon>
        </nx-list-item>
      </nx-list>
    </div>
  `,
};


