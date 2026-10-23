import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const SAMPLE_COLUMNS = [
  { key: 'id', title: 'ID', width: '80px', sortable: true },
  { key: 'name', title: 'User Name', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  { key: 'status', title: 'Status', sortable: true },
  { key: 'joined', title: 'Joined Date', sortable: true },
];

const SAMPLE_DATA = [
  { id: 1, name: 'Alice Walker', role: 'Lead Architect', status: 'Active', joined: '12 Jan 2024' },
  { id: 2, name: 'Bob Roberts', role: 'DevOps Engineer', status: 'Active', joined: '03 Feb 2024' },
  { id: 3, name: 'Catherine Zeta', role: 'UI/UX Designer', status: 'Pending', joined: '19 Mar 2024' },
  { id: 4, name: 'David Miller', role: 'Full Stack Dev', status: 'Active', joined: '22 Apr 2024' },
  { id: 5, name: 'Emma Watson', role: 'Product Manager', status: 'Inactive', joined: '15 May 2024' },
  { id: 6, name: 'Frank Castle', role: 'QA Automation', status: 'Active', joined: '10 Jun 2024' },
  { id: 7, name: 'Grace Hopper', role: 'Systems Engineer', status: 'Active', joined: '01 Jul 2024' },
];

/**
 * `<nx-table>` is a high-performance, accessible data table component.
 * Features built-in column sorting, pagination controls, row selection (checkboxes),
 * sticky headers, striped rows, loading states, and deep CSS custom property customization.
 */
const meta: Meta = {
  title: 'NX Web Components/Table',
  component: 'nx-table',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Overview
The \`<nx-table>\` component presents structured datasets with rich interactive features:
- **Interactive Sorting**: Click column headers to toggle ascending/descending order.
- **Client & Server Pagination**: Built-in page numbers, jump controls, and page-size selector.
- **Selection**: Checkbox selection for single or multiple rows with \`nxSelectionChange\`.
- **Loading & Empty Overlays**: Built-in spinners and custom empty state slots.

---

### How to Use Custom Styling

\`<nx-table>\` encapsulates its styles using Shadow DOM. Customization is provided via
**CSS Custom Properties** or **CSS Shadow Parts** (\`::part\`).

#### 1. Public CSS Custom Properties
| CSS Property | Description | Default Value |
| :--- | :--- | :--- |
| \`--table-color\` | Primary table theme color | \`#8145b5\` |
| \`--table-row-color\` | Cell text color | \`#1e293b\` |
| \`--table-border-color\` | Grid line and border color | \`#e2e8f0\` |
| \`--table-header-bg\` | Table header background | \`#f8fafc\` |
| \`--table-header-color\` | Table header title text color | \`#475569\` |
| \`--table-striped-bg\` | Alternate striped row background | \`#f8fafc\` |
| \`--table-row-hover\` | Hover highlight row background | \`#f1f5f9\` |
| \`--table-selected-bg\` | Selected row background | \`rgba(129, 69, 181, 0.08)\` |
| \`--table-cell-padding-y\` | Vertical cell padding | \`12px\` |
| \`--table-cell-padding-x\` | Horizontal cell padding | \`16px\` |

#### 2. Shadow Parts Styling (\`::part\`)
- \`::part(container)\`: Outer border wrapper.
- \`::part(table)\`: HTML \`<table>\` element.
- \`::part(header)\`: Top header bar.
- \`::part(pagination)\`: Bottom pagination bar.
- \`::part(loading-overlay)\`: Loading state screen.
        `,
      },
    },
  },
  argTypes: {
    striped: {
      control: 'boolean',
      description: 'Alternates zebra background on even rows',
      table: { defaultValue: { summary: 'false' } },
    },
    bordered: {
      control: 'boolean',
      description: 'Draws vertical and outer borders',
      table: { defaultValue: { summary: 'false' } },
    },
    hoverable: {
      control: 'boolean',
      description: 'Highlights rows on hover',
      table: { defaultValue: { summary: 'true' } },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Row padding density',
      table: { defaultValue: { summary: 'md' } },
    },
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'borderless', 'card'],
      description: 'Visual table layout variant',
      table: { defaultValue: { summary: 'default' } },
    },
    sortable: {
      control: 'boolean',
      description: 'Enables sorting on columns marked sortable',
      table: { defaultValue: { summary: 'true' } },
    },
    paginated: {
      control: 'boolean',
      description: 'Renders bottom pagination bar',
      table: { defaultValue: { summary: 'false' } },
    },
    pageSize: {
      control: 'number',
      description: 'Items shown per page',
      table: { defaultValue: { summary: '10' } },
    },
    selectable: {
      control: 'boolean',
      description: 'Renders row checkboxes for selection',
      table: { defaultValue: { summary: 'false' } },
    },
    selectionMode: {
      control: 'select',
      options: ['multiple', 'single'],
      description: 'Allow multi-row or single-row selection',
      table: { defaultValue: { summary: 'multiple' } },
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner overlay',
      table: { defaultValue: { summary: 'false' } },
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Keeps column headers pinned when scrolling',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  args: {
    striped: false,
    bordered: false,
    hoverable: true,
    size: 'md',
    variant: 'default',
    sortable: true,
    paginated: false,
    pageSize: 5,
    selectable: false,
    selectionMode: 'multiple',
    loading: false,
    stickyHeader: false,
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: (args) => html`
    <nx-table
      .columns=${SAMPLE_COLUMNS}
      .data=${SAMPLE_DATA}
      ?striped=${args.striped}
      ?bordered=${args.bordered}
      ?hoverable=${args.hoverable}
      .size=${args.size}
      .variant=${args.variant}
      ?sortable=${args.sortable}
      ?paginated=${args.paginated}
      .pageSize=${args.pageSize}
      ?selectable=${args.selectable}
      .selectionMode=${args.selectionMode}
      ?loading=${args.loading}
      ?stickyHeader=${args.stickyHeader}
      @nxSort=${(e: CustomEvent) => console.log('nxSort:', e.detail)}
      @nxSelectionChange=${(e: CustomEvent) => console.log('nxSelectionChange:', e.detail)}
      @nxRowClick=${(e: CustomEvent) => console.log('nxRowClick:', e.detail)}
    ></nx-table>
  `,
};

export const PaginatedAndSelectable: Story = {
  render: () => html`
    <nx-table
      .columns=${SAMPLE_COLUMNS}
      .data=${SAMPLE_DATA}
      paginated
      pageSize="4"
      selectable
      striped
      hoverable
      @nxPageChange=${(e: CustomEvent) => console.log('nxPageChange:', e.detail)}
      @nxSelectionChange=${(e: CustomEvent) => console.log('nxSelectionChange:', e.detail)}
    ></nx-table>
  `,
};

export const BorderedVariant: Story = {
  render: () => html`
    <nx-table
      .columns=${SAMPLE_COLUMNS}
      .data=${SAMPLE_DATA.slice(0, 4)}
      variant="bordered"
      bordered
    ></nx-table>
  `,
};

export const LoadingState: Story = {
  render: () => html`
    <nx-table
      .columns=${SAMPLE_COLUMNS}
      .data=${SAMPLE_DATA.slice(0, 4)}
      loading
      loadingText="Fetching user directories..."
    ></nx-table>
  `,
};

export const CustomStyling: Story = {
  render: () => html`
    <nx-table
      .columns=${SAMPLE_COLUMNS}
      .data=${SAMPLE_DATA}
      striped
      hoverable
      style="
        --table-color: #0284c7;
        --table-header-bg: #0f172a;
        --table-header-color: #ffffff;
        --table-striped-bg: #f0f9ff;
        --table-row-hover: #e0f2fe;
        --table-selected-bg: #bae6fd;
        --table-border-color: #e2e8f0;
      "
    ></nx-table>
  `,
};

