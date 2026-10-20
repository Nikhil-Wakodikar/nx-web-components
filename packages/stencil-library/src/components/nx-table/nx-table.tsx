import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Method,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

export type NxTableVariant = 'default' | 'card' | 'bordered' | 'borderless';
export type NxTableSize = 'sm' | 'md' | 'lg';
export type NxTableColor =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'dark'
  | string;

export interface NxTableColumn<T = any> {
  /** Unique key identifying the field in row data */
  key: string;
  /** Display label for the column header */
  title?: string;
  /** Whether this column is sortable */
  sortable?: boolean;
  /** Fixed or percentage width for this column (e.g. '120px', '25%') */
  width?: string;
  /** Text alignment for the column */
  align?: 'left' | 'center' | 'right';
  /** Optional custom cell formatter: (value, row, index) => string */
  formatter?: (value: any, row: T, index: number) => any;
  /** Custom slot name if providing slotted content per column */
  slot?: string;
}

export interface NxTableSortEventDetail {
  column: string;
  direction: 'asc' | 'desc' | 'none';
}

export interface NxTableSelectionEventDetail {
  selectedKeys: (string | number)[];
  selectedRows: any[];
}

export interface NxTablePageChangeEventDetail {
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface NxTableRowClickEventDetail {
  row: any;
  index: number;
  key: string | number;
}

const COLOR_MAP: Record<string, string> = {
  primary: 'var(--nx-color-primary, #8145b5)',
  secondary: 'var(--nx-color-secondary, #475569)',
  success: 'var(--nx-color-success, #16a34a)',
  warning: 'var(--nx-color-warning, #d97706)',
  danger: 'var(--nx-color-error, #dc2626)',
  error: 'var(--nx-color-error, #dc2626)',
  info: 'var(--nx-color-info, #2563eb)',
  dark: 'var(--nx-color-gray-900, #0f172a)',
};

let tableIds = 0;

@Component({
  tag: 'nx-table',
  styleUrl: 'nx-table.scss',
  shadow: true,
})
export class NxTable {
  @Element() el!: HTMLElement;

  private tableId = `nx-table-${tableIds++}`;

  /** Column definitions for data-driven mode */
  @Prop() columns?: NxTableColumn[] | string;

  /** Row data array for data-driven mode */
  @Prop() data?: any[] | string;

  /** Property key used as unique row identifier (defaults to 'id' or array index) */
  @Prop() rowKey = 'id';

  /** Visual appearance variant */
  @Prop({ reflect: true }) variant: NxTableVariant = 'default';

  /** Table density / row height */
  @Prop({ reflect: true }) size: NxTableSize = 'md';

  /** Theme color for selection, active sort, and pagination */
  @Prop({ reflect: true }) color: NxTableColor = 'primary';

  /** Enable subtle alternating zebra stripe background on rows */
  @Prop({ reflect: true }) striped = false;

  /** Highlight rows on hover */
  @Prop({ reflect: true }) hoverable = true;

  /** Add borders between all cells */
  @Prop({ reflect: true }) bordered = false;

  /** Global switch to enable column sorting */
  @Prop() sortable = true;

  /** Column key currently sorted by */
  @Prop({ mutable: true }) sortColumn?: string;

  /** Current sort direction: 'asc', 'desc', or 'none' */
  @Prop({ mutable: true }) sortDirection: 'asc' | 'desc' | 'none' = 'none';

  /** Enable row selection with checkboxes */
  @Prop({ reflect: true }) selectable = false;

  /** Selection mode: multi-row or single-row selection */
  @Prop() selectionMode: 'multiple' | 'single' = 'multiple';

  /** Array of selected row keys */
  @Prop({ mutable: true }) selectedRows: (string | number)[] = [];

  /** Makes rows interactive and clickable */
  @Prop({ reflect: true }) clickableRows = false;

  /** Enable built-in bottom pagination bar */
  @Prop({ reflect: true }) paginated = false;

  /** Number of items per page */
  @Prop({ mutable: true }) pageSize = 10;

  /** Current active page index (1-based) */
  @Prop({ mutable: true }) currentPage = 1;

  /** Page size options in dropdown */
  @Prop() pageSizeOptions: number[] | string = [5, 10, 25, 50];

  /** Total number of items (for server-side pagination) */
  @Prop() totalItems?: number;

  /** Show loading overlay spinner */
  @Prop({ reflect: true }) loading = false;

  /** Text displayed during loading state */
  @Prop() loadingText = 'Loading data...';

  /** Text displayed when no data is found */
  @Prop() emptyText = 'No data available';

  /** Keep table header pinned when scrolling vertically */
  @Prop({ reflect: true }) stickyHeader = false;

  /** Maximum height for scrollable table container */
  @Prop() maxHeight?: string;

  /** Table caption for accessibility */
  @Prop() caption?: string;

  @State() private parsedColumns: NxTableColumn[] = [];
  @State() private parsedData: any[] = [];
  @State() private parsedPageSizeOptions: number[] = [5, 10, 25, 50];
  @State() private hasSlottedContent = false;

  /** Emitted when a sortable column header is clicked */
  @Event({ bubbles: true, composed: true }) nxSort!: EventEmitter<NxTableSortEventDetail>;

  /** Emitted when row selection changes */
  @Event({ bubbles: true, composed: true }) nxSelectionChange!: EventEmitter<NxTableSelectionEventDetail>;

  /** Emitted when current page or page size changes */
  @Event({ bubbles: true, composed: true }) nxPageChange!: EventEmitter<NxTablePageChangeEventDetail>;

  /** Emitted when a table row is clicked */
  @Event({ bubbles: true, composed: true }) nxRowClick!: EventEmitter<NxTableRowClickEventDetail>;

  @Watch('columns')
  columnsChanged() {
    this.initColumns();
  }

  @Watch('data')
  dataChanged() {
    this.initData();
  }

  @Watch('pageSizeOptions')
  pageSizeOptionsChanged() {
    this.initPageSizeOptions();
  }

  componentWillLoad() {
    this.initColumns();
    this.initData();
    this.initPageSizeOptions();
    this.checkSlottedContent();
  }

  componentDidLoad() {
    this.injectSlottedTableStyles();
  }

  private initColumns() {
    if (!this.columns) {
      this.parsedColumns = [];
      return;
    }
    if (typeof this.columns === 'string') {
      try {
        this.parsedColumns = JSON.parse(this.columns);
      } catch (e) {
        console.warn('[nx-table] Failed to parse columns JSON string:', e);
        this.parsedColumns = [];
      }
    } else if (Array.isArray(this.columns)) {
      this.parsedColumns = this.columns.map((col) => {
        if (typeof col === 'string') {
          return { key: col, title: this.formatTitle(col), sortable: true };
        }
        return {
          ...col,
          title: col.title !== undefined ? col.title : this.formatTitle(col.key),
          sortable: col.sortable !== undefined ? col.sortable : true,
        };
      });
    }
  }

  private initData() {
    if (!this.data) {
      this.parsedData = [];
      return;
    }
    if (typeof this.data === 'string') {
      try {
        this.parsedData = JSON.parse(this.data);
      } catch (e) {
        console.warn('[nx-table] Failed to parse data JSON string:', e);
        this.parsedData = [];
      }
    } else if (Array.isArray(this.data)) {
      this.parsedData = [...this.data];
    }

    // Auto-infer columns if columns were not explicitly passed but data is available
    if (this.parsedColumns.length === 0 && this.parsedData.length > 0) {
      const firstRow = this.parsedData[0];
      if (firstRow && typeof firstRow === 'object') {
        this.parsedColumns = Object.keys(firstRow).map((key) => ({
          key,
          title: this.formatTitle(key),
          sortable: true,
        }));
      }
    }
  }

  private initPageSizeOptions() {
    if (typeof this.pageSizeOptions === 'string') {
      try {
        this.parsedPageSizeOptions = JSON.parse(this.pageSizeOptions);
      } catch {
        this.parsedPageSizeOptions = [5, 10, 25, 50];
      }
    } else if (Array.isArray(this.pageSizeOptions)) {
      this.parsedPageSizeOptions = this.pageSizeOptions;
    }
  }

  private checkSlottedContent = () => {
    this.hasSlottedContent = !!this.el.querySelector('table');
  };

  private injectSlottedTableStyles() {
    if (!document.getElementById('nx-table-light-styles')) {
      const style = document.createElement('style');
      style.id = 'nx-table-light-styles';
      style.textContent = `
        nx-table table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-family: inherit;
        }
        nx-table table th {
          padding: 12px 16px;
          font-weight: 500;
          font-size: 13px;
          color: var(--nx-color-gray-600, #475569);
          background-color: var(--nx-color-gray-50, #f8fafc);
          border-bottom: 1px solid var(--nx-color-gray-200, #e2e8f0);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        nx-table table td {
          padding: 12px 16px;
          font-weight: 400;
          font-size: 14px;
          color: var(--nx-color-gray-800, #1e293b);
          border-bottom: 1px solid var(--nx-color-gray-200, #e2e8f0);
        }
        nx-table[striped] table tbody tr:nth-child(even) {
          background-color: var(--nx-color-gray-50, #f8fafc);
        }
        nx-table[hoverable] table tbody tr:hover {
          background-color: var(--nx-color-gray-100, #f1f5f9);
        }
        nx-table[size="sm"] table th, nx-table[size="sm"] table td {
          padding: 8px 12px;
          font-size: 13px;
        }
        nx-table[size="lg"] table th, nx-table[size="lg"] table td {
          padding: 16px 20px;
          font-size: 15px;
        }
        nx-table[bordered] table th, nx-table[bordered] table td {
          border: 1px solid var(--nx-color-gray-200, #e2e8f0);
        }
        nx-table[borderless] table th, nx-table[borderless] table td {
          border: none;
        }
      `;
      document.head.appendChild(style);
    }
  }

  private formatTitle(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[_-]/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase())
      .trim();
  }

  private getRowKey(row: any, index: number): string | number {
    if (row && typeof row === 'object' && this.rowKey in row) {
      return row[this.rowKey];
    }
    return index;
  }

  private get sortedData(): any[] {
    if (!this.sortColumn || this.sortDirection === 'none') {
      return this.parsedData;
    }
    const key = this.sortColumn;
    const dir = this.sortDirection;

    return [...this.parsedData].sort((a, b) => {
      const valA = a ? a[key] : undefined;
      const valB = b ? b[key] : undefined;

      if (valA === valB) return 0;
      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return dir === 'asc' ? valA - valB : valB - valA;
      }
      const strA = String(valA).toLowerCase();
      const strB = String(valB).toLowerCase();
      return dir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }

  private get totalCount(): number {
    return this.totalItems !== undefined ? this.totalItems : this.parsedData.length;
  }

  private get totalPages(): number {
    if (!this.paginated || this.pageSize <= 0) return 1;
    return Math.max(1, Math.ceil(this.totalCount / this.pageSize));
  }

  private get currentPageData(): any[] {
    const data = this.sortedData;
    if (!this.paginated) {
      return data;
    }
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return data.slice(start, end);
  }

  /** Selects all rows currently displayed on this page */
  @Method()
  async selectAll(): Promise<void> {
    const pageKeys = this.currentPageData.map((row, i) => this.getRowKey(row, i));
    const newSelected = Array.from(new Set([...this.selectedRows, ...pageKeys]));
    this.selectedRows = newSelected;
    this.emitSelectionChange();
  }

  /** Deselects all rows */
  @Method()
  async deselectAll(): Promise<void> {
    this.selectedRows = [];
    this.emitSelectionChange();
  }

  /** Returns array of currently selected full row objects */
  @Method()
  async getSelectedRows(): Promise<any[]> {
    const keySet = new Set(this.selectedRows);
    return this.parsedData.filter((row, i) => keySet.has(this.getRowKey(row, i)));
  }

  /** Returns array of currently selected keys */
  @Method()
  async getSelectedKeys(): Promise<(string | number)[]> {
    return [...this.selectedRows];
  }

  /** Programmatically sets active page */
  @Method()
  async setPage(page: number): Promise<void> {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.emitPageChange();
  }

  /** Programmatically sets column sort */
  @Method()
  async sort(column: string, direction?: 'asc' | 'desc' | 'none'): Promise<void> {
    if (direction) {
      this.sortColumn = column;
      this.sortDirection = direction;
    } else {
      this.handleHeaderSort(column);
      return;
    }
    this.nxSort.emit({ column: this.sortColumn, direction: this.sortDirection });
  }

  private handleHeaderSort = (colKey: string) => {
    if (!this.sortable) return;

    let nextDir: 'asc' | 'desc' | 'none' = 'asc';
    if (this.sortColumn === colKey) {
      if (this.sortDirection === 'asc') nextDir = 'desc';
      else if (this.sortDirection === 'desc') nextDir = 'none';
      else nextDir = 'asc';
    }

    this.sortColumn = nextDir === 'none' ? undefined : colKey;
    this.sortDirection = nextDir;

    this.nxSort.emit({
      column: colKey,
      direction: nextDir,
    });
  };

  private handleRowSelect = (rowKey: string | number, _row: any, ev: Event) => {
    ev.stopPropagation();
    const checked = (ev.target as HTMLInputElement).checked;

    if (this.selectionMode === 'single') {
      this.selectedRows = checked ? [rowKey] : [];
    } else {
      if (checked) {
        if (!this.selectedRows.includes(rowKey)) {
          this.selectedRows = [...this.selectedRows, rowKey];
        }
      } else {
        this.selectedRows = this.selectedRows.filter((k) => k !== rowKey);
      }
    }
    this.emitSelectionChange();
  };

  private handleSelectAllToggle = (ev: Event) => {
    ev.stopPropagation();
    const checked = (ev.target as HTMLInputElement).checked;
    const pageKeys = this.currentPageData.map((row, i) => this.getRowKey(row, i));

    if (checked) {
      const merged = Array.from(new Set([...this.selectedRows, ...pageKeys]));
      this.selectedRows = merged;
    } else {
      const pageKeySet = new Set(pageKeys);
      this.selectedRows = this.selectedRows.filter((k) => !pageKeySet.has(k));
    }
    this.emitSelectionChange();
  };

  private emitSelectionChange() {
    const keySet = new Set(this.selectedRows);
    const selectedObjects = this.parsedData.filter((row, i) => keySet.has(this.getRowKey(row, i)));
    this.nxSelectionChange.emit({
      selectedKeys: [...this.selectedRows],
      selectedRows: selectedObjects,
    });
  }

  private emitPageChange() {
    this.nxPageChange.emit({
      page: this.currentPage,
      pageSize: this.pageSize,
      totalPages: this.totalPages,
    });
  }

  private handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > this.totalPages || newPage === this.currentPage) return;
    this.currentPage = newPage;
    this.emitPageChange();
  };

  private handlePageSizeChange = (ev: Event) => {
    const newSize = parseInt((ev.target as HTMLSelectElement).value, 10);
    if (!isNaN(newSize) && newSize > 0) {
      this.pageSize = newSize;
      this.currentPage = 1;
      this.emitPageChange();
    }
  };

  private handleRowClick = (row: any, index: number) => {
    const key = this.getRowKey(row, index);
    this.nxRowClick.emit({ row, index, key });
  };

  private renderSortIndicator(colKey: string) {
    const isCurrent = this.sortColumn === colKey;
    const dir = isCurrent ? this.sortDirection : 'none';

    return (
      <span class={{ 'sort-indicator': true, [`is-${dir}`]: true }} aria-hidden="true">
        <svg class="sort-arrow asc" viewBox="0 0 12 12">
          <path d="M6 2.5 2.5 7h7z" fill="currentColor" />
        </svg>
        <svg class="sort-arrow desc" viewBox="0 0 12 12">
          <path d="M6 9.5 9.5 5h-7z" fill="currentColor" />
        </svg>
      </span>
    );
  }

  private renderHeaderCheckbox() {
    const pageKeys = this.currentPageData.map((row, i) => this.getRowKey(row, i));
    if (pageKeys.length === 0) return null;

    const selectedOnPage = pageKeys.filter((k) => this.selectedRows.includes(k));
    const allSelected = selectedOnPage.length === pageKeys.length && pageKeys.length > 0;
    const someSelected = selectedOnPage.length > 0 && !allSelected;

    return (
      <th class="th-checkbox" style={{ width: '48px' }}>
        <label class="table-checkbox-label">
          <input
            type="checkbox"
            class="table-checkbox-input"
            checked={allSelected}
            indeterminate={someSelected}
            onChange={this.handleSelectAllToggle}
            aria-label="Select all rows on current page"
          />
          <span class="table-checkbox-custom">
            {allSelected && (
              <svg class="icon-check" viewBox="0 0 16 16">
                <path
                  d="M13.2 4.3a.9.9 0 0 1 0 1.28l-6 6a.9.9 0 0 1-1.28 0l-3-3a.9.9 0 0 1 1.28-1.28L6.56 9.66l5.36-5.36a.9.9 0 0 1 1.28 0z"
                  fill="currentColor"
                />
              </svg>
            )}
            {someSelected && <span class="icon-indeterminate"></span>}
          </span>
        </label>
      </th>
    );
  }

  private renderRowCheckbox(row: any, index: number) {
    const rowKey = this.getRowKey(row, index);
    const isChecked = this.selectedRows.includes(rowKey);

    return (
      <td class="td-checkbox" onClick={(e) => e.stopPropagation()}>
        <label class="table-checkbox-label">
          <input
            type={this.selectionMode === 'single' ? 'radio' : 'checkbox'}
            name={this.selectionMode === 'single' ? `${this.tableId}-selection` : undefined}
            class="table-checkbox-input"
            checked={isChecked}
            onChange={(e) => this.handleRowSelect(rowKey, row, e)}
            aria-label={`Select row ${index + 1}`}
          />
          <span class="table-checkbox-custom">
            {isChecked && (
              <svg class="icon-check" viewBox="0 0 16 16">
                <path
                  d="M13.2 4.3a.9.9 0 0 1 0 1.28l-6 6a.9.9 0 0 1-1.28 0l-3-3a.9.9 0 0 1 1.28-1.28L6.56 9.66l5.36-5.36a.9.9 0 0 1 1.28 0z"
                  fill="currentColor"
                />
              </svg>
            )}
          </span>
        </label>
      </td>
    );
  }

  private renderPagination() {
    if (!this.paginated) return null;

    const total = this.totalCount;
    const start = total === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(start + this.pageSize - 1, total);
    const totalPages = this.totalPages;

    // Generate page items array with ellipses
    const pages: (number | 'ellipsis')[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (this.currentPage > 3) pages.push('ellipsis');
      const startP = Math.max(2, this.currentPage - 1);
      const endP = Math.min(totalPages - 1, this.currentPage + 1);
      for (let i = startP; i <= endP; i++) pages.push(i);
      if (this.currentPage < totalPages - 2) pages.push('ellipsis');
      pages.push(totalPages);
    }

    return (
      <div class="table-pagination-bar" part="pagination">
        <div class="pagination-info">
          <span>
            Showing <strong class="fw-500">{start}</strong> to <strong class="fw-500">{end}</strong> of{' '}
            <strong class="fw-500">{total}</strong> entries
          </span>
          {this.parsedPageSizeOptions.length > 0 && (
            <label class="page-size-selector">
              <span>Rows per page:</span>
              <select onChange={this.handlePageSizeChange} aria-label="Rows per page">
                {this.parsedPageSizeOptions.map((opt) => (
                  <option value={opt} selected={opt === this.pageSize}>
                    {opt}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        <div class="pagination-controls" role="navigation" aria-label="Pagination">
          <button
            type="button"
            class="page-btn page-nav"
            disabled={this.currentPage === 1 || this.loading}
            onClick={() => this.handlePageChange(this.currentPage - 1)}
            aria-label="Previous page"
          >
            <svg class="page-arrow" viewBox="0 0 16 16">
              <path
                d="M10.3 3.3a1 1 0 0 1 0 1.4L6.4 8l3.9 3.3a1 1 0 0 1-1.4 1.4l-4.6-4a1 1 0 0 1 0-1.4l4.6-4a1 1 0 0 1 1.4 0z"
                fill="currentColor"
              />
            </svg>
          </button>

          {pages.map((p, idx) => {
            if (p === 'ellipsis') {
              return (
                <span key={`ellipsis-${idx}`} class="page-ellipsis" aria-hidden="true">
                  &hellip;
                </span>
              );
            }
            const isActive = p === this.currentPage;
            return (
              <button
                key={`page-${p}`}
                type="button"
                class={{ 'page-btn': true, 'is-active': isActive }}
                aria-current={isActive ? 'page' : undefined}
                disabled={this.loading}
                onClick={() => this.handlePageChange(p)}
              >
                {p}
              </button>
            );
          })}

          <button
            type="button"
            class="page-btn page-nav"
            disabled={this.currentPage === totalPages || this.loading}
            onClick={() => this.handlePageChange(this.currentPage + 1)}
            aria-label="Next page"
          >
            <svg class="page-arrow" viewBox="0 0 16 16">
              <path
                d="M5.7 3.3a1 1 0 0 0 0 1.4L9.6 8 5.7 11.3a1 1 0 0 0 1.4 1.4l4.6-4a1 1 0 0 0 0-1.4l-4.6-4a1 1 0 0 0-1.4 0z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  private renderEmptyState(colSpan: number) {
    return (
      <tr class="empty-row">
        <td colSpan={colSpan} class="empty-cell">
          <slot name="empty">
            <div class="empty-content">
              <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke-width="1.5" />
                <path d="M8 12h8" stroke-width="1.5" stroke-linecap="round" />
              </svg>
              <p class="empty-text">{this.emptyText}</p>
            </div>
          </slot>
        </td>
      </tr>
    );
  }

  private renderLoadingOverlay() {
    if (!this.loading) return null;

    return (
      <div class="table-loading-overlay" part="loading-overlay">
        <slot name="loading">
          <div class="loading-spinner-wrap">
            <svg class="loading-spinner" viewBox="0 0 32 32">
              <circle
                class="spinner-track"
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke-width="3"
              />
              <circle
                class="spinner-thumb"
                cx="16"
                cy="16"
                r="13"
                fill="none"
                stroke-width="3"
                stroke-dasharray="80"
                stroke-dashoffset="60"
              />
            </svg>
            {this.loadingText && <span class="loading-label">{this.loadingText}</span>}
          </div>
        </slot>
      </div>
    );
  }

  render() {
    const isDataMode = (this.parsedData.length > 0 || this.parsedColumns.length > 0) && !this.hasSlottedContent;
    const hasData = this.parsedData.length > 0;
    const pageData = this.currentPageData;
    const totalCols = this.parsedColumns.length + (this.selectable ? 1 : 0);

    const themeColor = COLOR_MAP[this.color] || this.color || COLOR_MAP.primary;
    const hostStyles: Record<string, string> = {
      '--table-color': themeColor,
    };
    if (this.maxHeight) {
      hostStyles['--table-max-height'] = this.maxHeight;
    }

    return (
      <Host
        style={hostStyles}
        class={{
          [`variant-${this.variant}`]: !!this.variant,
          [`size-${this.size}`]: !!this.size,
          'is-striped': this.striped,
          'is-hoverable': this.hoverable,
          'is-bordered': this.bordered,
          'is-clickable': this.clickableRows,
          'is-sticky-header': this.stickyHeader,
          'is-loading': this.loading,
        }}
      >
        <div class="nx-table-card" part="container">
          {/* Top toolbar / actions header slot */}
          <div class="table-top-bar" part="header">
            <slot name="header" onSlotchange={this.checkSlottedContent}></slot>
          </div>

          <div class="table-scroll-container" part="scroll-container">
            {this.renderLoadingOverlay()}

            {isDataMode ? (
              <table class="nx-table-element" part="table">
                {this.caption && <caption class="sr-only">{this.caption}</caption>}
                <thead>
                  <tr>
                    {this.selectable && this.renderHeaderCheckbox()}
                    {this.parsedColumns.map((col) => {
                      const canSort = this.sortable && col.sortable !== false;
                      const isSorted = this.sortColumn === col.key;
                      const dir = isSorted ? this.sortDirection : 'none';

                      return (
                        <th
                          key={col.key}
                          style={{
                            width: col.width || 'auto',
                            textAlign: col.align || 'left',
                          }}
                          class={{
                            'sortable-th': canSort,
                            'is-sorted': isSorted,
                          }}
                          aria-sort={
                            canSort
                              ? dir === 'asc'
                                ? 'ascending'
                                : dir === 'desc'
                                ? 'descending'
                                : 'none'
                              : undefined
                          }
                          onClick={() => canSort && this.handleHeaderSort(col.key)}
                        >
                          <span class="th-content">
                            <span>{col.title || col.key}</span>
                            {canSort && this.renderSortIndicator(col.key)}
                          </span>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {!hasData && this.renderEmptyState(totalCols)}
                  {hasData &&
                    pageData.map((row, idx) => {
                      const rowKey = this.getRowKey(row, idx);
                      const isSelected = this.selectedRows.includes(rowKey);

                      return (
                        <tr
                          key={String(rowKey)}
                          class={{
                            'is-selected': isSelected,
                            'is-interactive': this.clickableRows,
                          }}
                          onClick={() => this.clickableRows && this.handleRowClick(row, idx)}
                        >
                          {this.selectable && this.renderRowCheckbox(row, idx)}
                          {this.parsedColumns.map((col) => {
                            const rawVal = row ? row[col.key] : undefined;
                            const formattedVal = col.formatter
                              ? col.formatter(rawVal, row, idx)
                              : rawVal !== null && rawVal !== undefined
                              ? String(rawVal)
                              : '';

                            return (
                              <td
                                key={`${rowKey}-${col.key}`}
                                style={{ textAlign: col.align || 'left' }}
                              >
                                {col.slot ? (
                                  <slot name={`${col.slot}-${rowKey}`}>
                                    <slot name={col.slot}>{formattedVal}</slot>
                                  </slot>
                                ) : (
                                  formattedVal
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              /* Slotted HTML table fallback mode */
              <div class="slotted-table-wrapper">
                <slot onSlotchange={this.checkSlottedContent}></slot>
              </div>
            )}
          </div>

          {/* Built-in pagination or custom bottom footer */}
          {isDataMode && this.paginated && this.renderPagination()}
          <div class="table-bottom-bar" part="footer">
            <slot name="footer" onSlotchange={this.checkSlottedContent}></slot>
          </div>
        </div>
      </Host>
    );
  }
}
