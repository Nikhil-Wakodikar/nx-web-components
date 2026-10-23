import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * `<nx-tab>` and `<nx-tab-group>` provide tabbed navigation interfaces.
 * Supports horizontal (top/bottom) and vertical (start/end) orientations, animated active indicators,
 * closable tabs, tab badges, leading icons, and full CSS custom property customization.
 */
const meta: Meta = {
  title: 'NX Web Components/Tabs',
  component: 'nx-tab-group',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The tab navigation system consists of two coordinated components:
- **\`<nx-tab-group>\`**: The container that manages tab header navigation, active indicators, scroll arrows, and layout placement.
- **\`<nx-tab>\`**: Individual tab item defining the tab label, icon, badge count, and corresponding content panel.

---

### How to Use Custom Styling

\`<nx-tab-group>\` encapsulates its styles using Shadow DOM. Customization is supported via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--nx-tab-color\` | Inactive tab label color | \`#334155\` |
| \`--nx-tab-color-hover\` | Tab label hover color | Theme primary |
| \`--nx-tab-color-active\` | Active tab label color | \`#8145b5\` |
| \`--nx-tab-indicator-color\` | Color of animated active bar indicator | \`#8145b5\` |
| \`--nx-tab-indicator-height\` | Thickness of the active indicator bar | \`2px\` |
| \`--nx-tab-border-color\` | Bottom track separator line | \`#f1f5f9\` |
| \`--nx-tab-bg-hover\` | Hover background color | \`rgba(129, 69, 181, 0.08)\` |
| \`--nx-tab-gap\` | Space between individual tab headers | \`8px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(tablist)\`: The ARIA tablist container holding the headers.
- \`::part(indicator)\`: The animated active indicator line.
- \`::part(nav)\`: The navigation scroll wrapper.
- \`::part(panels-wrapper)\`: Container wrapping all tab panels.
- \`nx-tab::part(panel)\`: The active tab panel content container.
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Value of the initially active tab',
      defaultValue: 'profile',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      description: 'Header placement relative to tab panels',
      table: { defaultValue: { summary: 'top' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tab header size preset',
      table: { defaultValue: { summary: 'md' } },
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Theme color for indicator and active text',
      table: { defaultValue: { summary: 'primary' } },
    },
    stretch: {
      control: 'boolean',
      description: 'Expands tab headers evenly across available width',
      table: { defaultValue: { summary: 'true' } },
    },
    scrollable: {
      control: 'boolean',
      description: 'Enables smooth scroll buttons when tab count overflows container width',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the entire tab group',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    value: 'profile',
    placement: 'top',
    size: 'md',
    color: 'primary',
    stretch: false,
    scrollable: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <div style="max-width: 650px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <nx-tab-group
        .value=${args.value}
        .placement=${args.placement}
        .size=${args.size}
        .color=${args.color}
        ?stretch=${args.stretch}
        ?scrollable=${args.scrollable}
        ?disabled=${args.disabled}
        @nxChange=${(e: CustomEvent) => console.log('nxChange:', e.detail)}
      >
        <nx-tab value="profile" label="Profile" icon="user">
          <div style="padding: 16px 0;">
            <h4 style="margin: 0 0 8px;">User Profile</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Manage your personal information, public avatar, and bio details.
            </p>
          </div>
        </nx-tab>

        <nx-tab value="security" label="Security" icon="shield" badge="1">
          <div style="padding: 16px 0;">
            <h4 style="margin: 0 0 8px;">Security Settings</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              Configure two-factor authentication and review active browser sessions.
            </p>
          </div>
        </nx-tab>

        <nx-tab value="billing" label="Billing" icon="credit-card">
          <div style="padding: 16px 0;">
            <h4 style="margin: 0 0 8px;">Billing & Invoices</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              View subscription details, payment methods, and downloadable PDF receipts.
            </p>
          </div>
        </nx-tab>
      </nx-tab-group>
    </div>
  `,
};

export const VerticalTabs: Story = {
  render: () => html`
    <div style="max-width: 650px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <nx-tab-group placement="start" value="general">
        <nx-tab value="general" label="General" icon="settings">
          <div style="padding: 0 16px;">
            <h4 style="margin: 0 0 8px;">General Preferences</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Application defaults and time zones.</p>
          </div>
        </nx-tab>

        <nx-tab value="notifications" label="Notifications" icon="bell" badge="3">
          <div style="padding: 0 16px;">
            <h4 style="margin: 0 0 8px;">Notifications</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">Email and mobile push delivery preferences.</p>
          </div>
        </nx-tab>

        <nx-tab value="integrations" label="Integrations" icon="puzzle">
          <div style="padding: 0 16px;">
            <h4 style="margin: 0 0 8px;">Connected Apps</h4>
            <p style="margin: 0; color: #64748b; font-size: 14px;">GitHub, Slack, and Jira connections.</p>
          </div>
        </nx-tab>
      </nx-tab-group>
    </div>
  `,
};

export const ClosableTabs: Story = {
  render: () => html`
    <div style="max-width: 650px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <nx-tab-group value="file1">
        <nx-tab value="file1" label="index.ts" closable @nxClose=${() => alert('Closed index.ts')}>
          <div style="padding: 16px 0; font-family: monospace; font-size: 13px; color: #334155;">
            // Editor content: index.ts
          </div>
        </nx-tab>
        <nx-tab value="file2" label="styles.scss" closable @nxClose=${() => alert('Closed styles.scss')}>
          <div style="padding: 16px 0; font-family: monospace; font-size: 13px; color: #334155;">
            // Editor content: styles.scss
          </div>
        </nx-tab>
        <nx-tab value="file3" label="README.md" closable @nxClose=${() => alert('Closed README.md')}>
          <div style="padding: 16px 0; font-family: monospace; font-size: 13px; color: #334155;">
            // Documentation: README.md
          </div>
        </nx-tab>
      </nx-tab-group>
    </div>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <div style="max-width: 650px; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
      <nx-tab-group
        value="emerald"
        style="
          --nx-tab-color-active: #059669;
          --nx-tab-indicator-color: #10b981;
          --nx-tab-indicator-height: 3px;
          --nx-tab-bg-hover: #d1fae5;
        "
      >
        <nx-tab value="emerald" label="Emerald Active">
          <p style="padding: 12px 0; color: #065f46; margin: 0;">Custom styled active indicator and hover highlight.</p>
        </nx-tab>
        <nx-tab value="settings" label="Settings">
          <p style="padding: 12px 0; color: #065f46; margin: 0;">Settings content.</p>
        </nx-tab>
      </nx-tab-group>
    </div>
  `,
};

