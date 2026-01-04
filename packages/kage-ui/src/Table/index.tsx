import React, { useState, useCallback, useMemo, ReactNode, CSSProperties } from 'react';
import Pagination from '../Pagination';
import Checkbox from '../Checkbox';
import Empty from '../Empty';
import './style.less';

// ============ 类型定义 ============

/** 排序方向 */
export type SortOrder = 'ascend' | 'descend' | null;

/** 列对齐方式 */
export type AlignType = 'left' | 'center' | 'right';

/** 表格尺寸 */
export type TableSize = 'default' | 'middle' | 'small';

/** 筛选项 */
export interface FilterItem {
  text: string;
  value: string | number | boolean;
}

/** 列定义 */
export interface ColumnType<T = any> {
  /** 列标题 */
  title: ReactNode;
  /** 列数据的字段名 */
  dataIndex?: string;
  /** React key，默认使用 dataIndex */
  key?: string;
  /** 列宽度 */
  width?: number | string;
  /** 最小列宽度 */
  minWidth?: number;
  /** 对齐方式 */
  align?: AlignType;
  /** 是否固定列 */
  fixed?: 'left' | 'right';
  /** 是否可排序 */
  sorter?: boolean | ((a: T, b: T) => number);
  /** 默认排序顺序 */
  defaultSortOrder?: SortOrder;
  /** 排序顺序 (受控) */
  sortOrder?: SortOrder;
  /** 筛选菜单项 */
  filters?: FilterItem[];
  /** 筛选方法 */
  onFilter?: (value: string | number | boolean, record: T) => boolean;
  /** 默认筛选值 */
  defaultFilteredValue?: (string | number | boolean)[];
  /** 筛选值 (受控) */
  filteredValue?: (string | number | boolean)[];
  /** 自定义渲染函数 */
  render?: (value: any, record: T, index: number) => ReactNode;
  /** 文字省略 */
  ellipsis?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 单元格的样式 */
  onCell?: (record: T, index: number) => CSSProperties;
  /** 表头单元格的样式 */
  onHeaderCell?: () => CSSProperties;
  /** 子列 */
  children?: ColumnType<T>[];
}

/** 行选择配置 */
export interface RowSelection<T = any> {
  /** 选择类型 */
  type?: 'checkbox' | 'radio';
  /** 选中项的 key 数组 */
  selectedRowKeys?: React.Key[];
  /** 选中项发生变化时的回调 */
  onChange?: (selectedRowKeys: React.Key[], selectedRows: T[]) => void;
  /** 用户手动选择/取消选择某行的回调 */
  onSelect?: (record: T, selected: boolean, selectedRows: T[], nativeEvent: Event) => void;
  /** 用户手动选择/取消选择所有行的回调 */
  onSelectAll?: (selected: boolean, selectedRows: T[], changeRows: T[]) => void;
  /** 行是否可选择 */
  getCheckboxProps?: (record: T) => { disabled?: boolean; name?: string };
  /** 固定选择列 */
  fixed?: boolean;
  /** 选择列的宽度 */
  columnWidth?: number | string;
  /** 选择列的标题 */
  columnTitle?: ReactNode;
  /** 自定义渲染勾选框 */
  renderCell?: (
    checked: boolean,
    record: T,
    index: number,
    originNode: ReactNode
  ) => ReactNode;
  /** 隐藏全选按钮 */
  hideSelectAll?: boolean;
}

/** 分页配置 */
export interface TablePagination {
  /** 当前页码 */
  current?: number;
  /** 每页条数 */
  pageSize?: number;
  /** 数据总数 */
  total?: number;
  /** 每页条数选项 */
  pageSizeOptions?: number[];
  /** 是否显示每页条数选择器 */
  showSizeChanger?: boolean;
  /** 是否显示快速跳转 */
  showQuickJumper?: boolean;
  /** 是否显示总数 */
  showTotal?: (total: number, range: [number, number]) => ReactNode;
  /** 分页位置 */
  position?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight';
  /** 是否禁用 */
  disabled?: boolean;
  /** 简洁模式 */
  simple?: boolean;
}

/** 表格属性 */
export interface TableProps<T = any> {
  /** 列配置 */
  columns: ColumnType<T>[];
  /** 数据数组 */
  dataSource: T[];
  /** 表格行 key 的取值 */
  rowKey?: string | ((record: T) => React.Key);
  /** 是否显示表头 */
  showHeader?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 表格大小 */
  size?: TableSize;
  /** 是否加载中 */
  loading?: boolean;
  /** 加载文案 */
  loadingText?: string;
  /** 空状态时的显示内容 */
  locale?: {
    emptyText?: ReactNode;
  };
  /** 分页配置，false 禁用分页 */
  pagination?: TablePagination | false;
  /** 行选择配置 */
  rowSelection?: RowSelection<T>;
  /** 行的类名 */
  rowClassName?: string | ((record: T, index: number) => string);
  /** 设置行属性 */
  onRow?: (record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>;
  /** 表格标题 */
  title?: () => ReactNode;
  /** 表格尾部 */
  footer?: () => ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 表格滚动配置 */
  scroll?: {
    x?: number | string | true;
    y?: number | string;
  };
  /** 排序变化的回调 */
  onChange?: (
    pagination: { current: number; pageSize: number },
    filters: Record<string, (string | number | boolean)[] | null>,
    sorter: { column?: ColumnType<T>; order?: SortOrder; field?: string }
  ) => void;
  /** 展开行配置 */
  expandable?: {
    expandedRowRender?: (record: T, index: number, indent: number, expanded: boolean) => ReactNode;
    rowExpandable?: (record: T) => boolean;
    expandedRowKeys?: React.Key[];
    defaultExpandedRowKeys?: React.Key[];
    onExpand?: (expanded: boolean, record: T) => void;
    onExpandedRowsChange?: (expandedKeys: React.Key[]) => void;
    expandIcon?: (props: { expanded: boolean; record: T; onExpand: () => void }) => ReactNode;
    expandRowByClick?: boolean;
    indentSize?: number;
    showExpandColumn?: boolean;
  };
  /** 是否显示斑马纹 */
  striped?: boolean;
  /** 悬浮行高亮 */
  hoverable?: boolean;
  /** 粘性头部 */
  sticky?: boolean;
  /** 摘要 */
  summary?: (data: readonly T[]) => ReactNode;
}

// ============ 工具函数 ============

/** 获取记录的 key */
function getRowKey<T>(record: T, rowKey: string | ((record: T) => React.Key), index: number): React.Key {
  if (typeof rowKey === 'function') {
    return rowKey(record);
  }
  return (record as any)[rowKey] ?? index;
}

/** 获取嵌套值 */
function getNestedValue(record: any, dataIndex?: string): any {
  if (!dataIndex) return record;
  const keys = dataIndex.split('.');
  let value = record;
  for (const key of keys) {
    value = value?.[key];
  }
  return value;
}

// ============ Table 组件 ============

export const Table = <T extends Record<string, any> = any>({
  columns,
  dataSource,
  rowKey = 'key',
  showHeader = true,
  bordered = false,
  size = 'default',
  loading = false,
  loadingText = '加载中...',
  locale,
  pagination = {},
  rowSelection,
  rowClassName,
  onRow,
  title,
  footer,
  className = '',
  style,
  scroll,
  onChange,
  expandable,
  striped = false,
  hoverable = true,
  sticky = false,
  summary,
}: TableProps<T>) => {
  // ============ 状态管理 ============

  // 排序状态
  const [sortState, setSortState] = useState<{
    field?: string;
    order?: SortOrder;
  }>(() => {
    for (const col of columns) {
      if (col.defaultSortOrder) {
        return { field: col.dataIndex || col.key, order: col.defaultSortOrder };
      }
    }
    return {};
  });

  // 筛选状态
  const [filterState, setFilterState] = useState<Record<string, (string | number | boolean)[]>>(() => {
    const initial: Record<string, (string | number | boolean)[]> = {};
    for (const col of columns) {
      if (col.defaultFilteredValue) {
        const key = col.dataIndex || col.key || '';
        initial[key] = col.defaultFilteredValue;
      }
    }
    return initial;
  });

  // 筛选下拉菜单可见性
  const [filterVisible, setFilterVisible] = useState<Record<string, boolean>>({});

  // 分页状态
  const [paginationState, setPaginationState] = useState({
    current: 1,
    pageSize: 10,
  });

  // 展开行状态
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(
    expandable?.defaultExpandedRowKeys || []
  );

  // 选中行状态 (非受控模式)
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<React.Key[]>([]);

  // ============ 计算值 ============

  // 当前分页配置
  const currentPagination = useMemo(() => {
    if (pagination === false) return null;
    return {
      current: pagination.current ?? paginationState.current,
      pageSize: pagination.pageSize ?? paginationState.pageSize,
      total: pagination.total ?? dataSource.length,
      ...pagination,
    };
  }, [pagination, paginationState, dataSource.length]);

  // 选中的行 keys
  const selectedRowKeys = rowSelection?.selectedRowKeys ?? internalSelectedKeys;

  // 处理后的数据 (排序 + 筛选)
  const processedData = useMemo(() => {
    let result = [...dataSource];

    // 应用筛选
    for (const col of columns) {
      const key = col.dataIndex || col.key || '';
      const filterValues = col.filteredValue ?? filterState[key];
      if (filterValues && filterValues.length > 0 && col.onFilter) {
        result = result.filter((record) =>
          filterValues.some((value) => col.onFilter!(value, record))
        );
      }
    }

    // 应用排序
    const sortColumn = columns.find(
      (col) => (col.dataIndex || col.key) === sortState.field
    );
    const sortOrder = sortColumn?.sortOrder ?? sortState.order;

    if (sortColumn && sortOrder && sortColumn.sorter) {
      const sorter =
        typeof sortColumn.sorter === 'function'
          ? sortColumn.sorter
          : (a: T, b: T) => {
              const aVal = getNestedValue(a, sortColumn.dataIndex);
              const bVal = getNestedValue(b, sortColumn.dataIndex);
              if (aVal === bVal) return 0;
              if (aVal === null || aVal === undefined) return 1;
              if (bVal === null || bVal === undefined) return -1;
              return aVal < bVal ? -1 : 1;
            };

      result.sort((a, b) => {
        const compareResult = sorter(a, b);
        return sortOrder === 'ascend' ? compareResult : -compareResult;
      });
    }

    return result;
  }, [dataSource, columns, sortState, filterState]);

  // 当前页数据
  const currentPageData = useMemo(() => {
    if (!currentPagination) return processedData;

    const { current, pageSize } = currentPagination;
    const start = (current - 1) * pageSize;
    const end = start + pageSize;
    return processedData.slice(start, end);
  }, [processedData, currentPagination]);

  // 展开的行 keys
  const currentExpandedKeys = expandable?.expandedRowKeys ?? expandedKeys;

  // ============ 事件处理 ============

  // 排序处理
  const handleSort = useCallback(
    (column: ColumnType<T>) => {
      const field = column.dataIndex || column.key || '';
      let newOrder: SortOrder;

      if (sortState.field !== field) {
        newOrder = 'ascend';
      } else if (sortState.order === 'ascend') {
        newOrder = 'descend';
      } else if (sortState.order === 'descend') {
        newOrder = null;
      } else {
        newOrder = 'ascend';
      }

      setSortState({ field: newOrder ? field : undefined, order: newOrder });

      onChange?.(
        { current: currentPagination?.current || 1, pageSize: currentPagination?.pageSize || 10 },
        filterState,
        { column: newOrder ? column : undefined, order: newOrder, field: newOrder ? field : undefined }
      );
    },
    [sortState, currentPagination, filterState, onChange]
  );

  // 筛选处理
  const handleFilter = useCallback(
    (column: ColumnType<T>, values: (string | number | boolean)[]) => {
      const key = column.dataIndex || column.key || '';
      const newFilterState = { ...filterState, [key]: values };
      if (values.length === 0) {
        delete newFilterState[key];
      }
      setFilterState(newFilterState);
      setFilterVisible({ ...filterVisible, [key]: false });

      // 重置到第一页
      setPaginationState({ ...paginationState, current: 1 });

      onChange?.(
        { current: 1, pageSize: currentPagination?.pageSize || 10 },
        newFilterState,
        { column: sortState.field ? columns.find(c => (c.dataIndex || c.key) === sortState.field) : undefined, order: sortState.order, field: sortState.field }
      );
    },
    [filterState, filterVisible, paginationState, currentPagination, sortState, columns, onChange]
  );

  // 分页处理
  const handlePageChange = useCallback(
    (page: number, pageSize: number) => {
      setPaginationState({ current: page, pageSize });
      onChange?.(
        { current: page, pageSize },
        filterState,
        { column: sortState.field ? columns.find(c => (c.dataIndex || c.key) === sortState.field) : undefined, order: sortState.order, field: sortState.field }
      );
    },
    [filterState, sortState, columns, onChange]
  );

  // 行选择处理
  const handleSelectRow = useCallback(
    (record: T, selected: boolean) => {
      const key = getRowKey(record, rowKey, 0);
      let newSelectedKeys: React.Key[];

      if (rowSelection?.type === 'radio') {
        newSelectedKeys = selected ? [key] : [];
      } else {
        newSelectedKeys = selected
          ? [...selectedRowKeys, key]
          : selectedRowKeys.filter((k) => k !== key);
      }

      if (!rowSelection?.selectedRowKeys) {
        setInternalSelectedKeys(newSelectedKeys);
      }

      const newSelectedRows = dataSource.filter((r) =>
        newSelectedKeys.includes(getRowKey(r, rowKey, 0))
      );
      rowSelection?.onChange?.(newSelectedKeys, newSelectedRows);
      rowSelection?.onSelect?.(record, selected, newSelectedRows, {} as Event);
    },
    [rowKey, rowSelection, selectedRowKeys, dataSource]
  );

  // 全选处理
  const handleSelectAll = useCallback(
    (selected: boolean) => {
      const selectableRecords = currentPageData.filter((record) => {
        const props = rowSelection?.getCheckboxProps?.(record);
        return !props?.disabled;
      });

      const newSelectedKeys = selected
        ? [...new Set([...selectedRowKeys, ...selectableRecords.map((r) => getRowKey(r, rowKey, 0))])]
        : selectedRowKeys.filter(
            (key) => !selectableRecords.some((r) => getRowKey(r, rowKey, 0) === key)
          );

      if (!rowSelection?.selectedRowKeys) {
        setInternalSelectedKeys(newSelectedKeys);
      }

      const newSelectedRows = dataSource.filter((r) =>
        newSelectedKeys.includes(getRowKey(r, rowKey, 0))
      );
      const changeRows = selectableRecords;

      rowSelection?.onChange?.(newSelectedKeys, newSelectedRows);
      rowSelection?.onSelectAll?.(selected, newSelectedRows, changeRows);
    },
    [currentPageData, selectedRowKeys, rowKey, rowSelection, dataSource]
  );

  // 展开处理
  const handleExpand = useCallback(
    (record: T) => {
      const key = getRowKey(record, rowKey, 0);
      const expanded = currentExpandedKeys.includes(key);
      const newExpandedKeys = expanded
        ? currentExpandedKeys.filter((k) => k !== key)
        : [...currentExpandedKeys, key];

      if (!expandable?.expandedRowKeys) {
        setExpandedKeys(newExpandedKeys);
      }

      expandable?.onExpand?.(!expanded, record);
      expandable?.onExpandedRowsChange?.(newExpandedKeys);
    },
    [currentExpandedKeys, rowKey, expandable]
  );

  // ============ 渲染函数 ============

  // 渲染排序图标
  const renderSorter = (column: ColumnType<T>) => {
    if (!column.sorter) return null;

    const field = column.dataIndex || column.key;
    const currentOrder = column.sortOrder ?? (sortState.field === field ? sortState.order : null);

    return (
      <span className="kage-table-column-sorter">
        <span
          className={`kage-table-column-sorter-up ${currentOrder === 'ascend' ? 'active' : ''}`}
        >
          ▲
        </span>
        <span
          className={`kage-table-column-sorter-down ${currentOrder === 'descend' ? 'active' : ''}`}
        >
          ▼
        </span>
      </span>
    );
  };

  // 渲染筛选器
  const renderFilter = (column: ColumnType<T>) => {
    if (!column.filters || column.filters.length === 0) return null;

    const key = column.dataIndex || column.key || '';
    const currentFilterValues = column.filteredValue ?? filterState[key] ?? [];
    const isVisible = filterVisible[key];

    return (
      <span className="kage-table-filter-trigger-container">
        <span
          className={`kage-table-filter-trigger ${currentFilterValues.length > 0 ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setFilterVisible({ ...filterVisible, [key]: !isVisible });
          }}
        >
          ▼
        </span>
        {isVisible && (
          <div className="kage-table-filter-dropdown">
            {column.filters.map((filter) => (
              <label key={String(filter.value)} className="kage-table-filter-item">
                <input
                  type="checkbox"
                  checked={currentFilterValues.includes(filter.value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...currentFilterValues, filter.value]
                      : currentFilterValues.filter((v) => v !== filter.value);
                    handleFilter(column, newValues);
                  }}
                />
                <span>{filter.text}</span>
              </label>
            ))}
            <div className="kage-table-filter-dropdown-btns">
              <button
                onClick={() => handleFilter(column, [])}
                className="kage-table-filter-dropdown-link"
              >
                重置
              </button>
              <button
                onClick={() => setFilterVisible({ ...filterVisible, [key]: false })}
                className="kage-table-filter-dropdown-link confirm"
              >
                确定
              </button>
            </div>
          </div>
        )}
      </span>
    );
  };

  // 渲染表头单元格
  const renderHeaderCell = (column: ColumnType<T>) => {
    const isSortable = !!column.sorter;
    const hasFilter = column.filters && column.filters.length > 0;

    return (
      <th
        key={column.key || column.dataIndex}
        className={[
          'kage-table-cell',
          column.className,
          column.align && `kage-table-cell-${column.align}`,
          isSortable && 'kage-table-column-has-sorters',
          column.fixed && `kage-table-cell-fix-${column.fixed}`,
          column.ellipsis && 'kage-table-cell-ellipsis',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          width: column.width,
          minWidth: column.minWidth,
          ...column.onHeaderCell?.(),
        }}
        onClick={isSortable ? () => handleSort(column) : undefined}
      >
        <div className="kage-table-column-title">
          <span>{column.title}</span>
          {renderSorter(column)}
          {renderFilter(column)}
        </div>
      </th>
    );
  };

  // 渲染选择列表头
  const renderSelectionHeader = () => {
    if (!rowSelection) return null;

    const selectableRecords = currentPageData.filter((record) => {
      const props = rowSelection.getCheckboxProps?.(record);
      return !props?.disabled;
    });

    const allSelected =
      selectableRecords.length > 0 &&
      selectableRecords.every((record) =>
        selectedRowKeys.includes(getRowKey(record, rowKey, 0))
      );
    const someSelected = selectableRecords.some((record) =>
      selectedRowKeys.includes(getRowKey(record, rowKey, 0))
    );

    if (rowSelection.hideSelectAll) {
      return <th className="kage-table-selection-column" style={{ width: rowSelection.columnWidth || 48 }}>{rowSelection.columnTitle}</th>;
    }

    if (rowSelection.type === 'radio') {
      return <th className="kage-table-selection-column" style={{ width: rowSelection.columnWidth || 48 }}>{rowSelection.columnTitle}</th>;
    }

    return (
      <th className="kage-table-selection-column" style={{ width: rowSelection.columnWidth || 48 }}>
        {rowSelection.columnTitle || (
          <Checkbox
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
            onChange={(e) => handleSelectAll(e.target.checked)}
            disabled={selectableRecords.length === 0}
          />
        )}
      </th>
    );
  };

  // 渲染展开列表头
  const renderExpandHeader = () => {
    if (!expandable?.expandedRowRender) return null;
    if (expandable.showExpandColumn === false) return null;
    return <th className="kage-table-expand-icon-cell" style={{ width: 48 }} />;
  };

  // 渲染表格单元格
  const renderCell = (column: ColumnType<T>, record: T, index: number) => {
    const value = getNestedValue(record, column.dataIndex);
    const content = column.render ? column.render(value, record, index) : value;

    return (
      <td
        key={column.key || column.dataIndex}
        className={[
          'kage-table-cell',
          column.className,
          column.align && `kage-table-cell-${column.align}`,
          column.fixed && `kage-table-cell-fix-${column.fixed}`,
          column.ellipsis && 'kage-table-cell-ellipsis',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          width: column.width,
          minWidth: column.minWidth,
          ...column.onCell?.(record, index),
        }}
      >
        {column.ellipsis ? (
          <span className="kage-table-cell-content" title={typeof content === 'string' ? content : undefined}>
            {content}
          </span>
        ) : (
          content
        )}
      </td>
    );
  };

  // 渲染选择列单元格
  const renderSelectionCell = (record: T, index: number) => {
    if (!rowSelection) return null;

    const key = getRowKey(record, rowKey, index);
    const checked = selectedRowKeys.includes(key);
    const checkboxProps = rowSelection.getCheckboxProps?.(record);

    const originNode =
      rowSelection.type === 'radio' ? (
        <input
          type="radio"
          checked={checked}
          disabled={checkboxProps?.disabled}
          name={checkboxProps?.name || 'table-radio'}
          onChange={(e) => handleSelectRow(record, e.target.checked)}
        />
      ) : (
        <Checkbox
          checked={checked}
          disabled={checkboxProps?.disabled}
          onChange={(e) => handleSelectRow(record, e.target.checked)}
        />
      );

    const node = rowSelection.renderCell
      ? rowSelection.renderCell(checked, record, index, originNode)
      : originNode;

    return (
      <td className="kage-table-selection-column" style={{ width: rowSelection.columnWidth || 48 }}>
        {node}
      </td>
    );
  };

  // 渲染展开列单元格
  const renderExpandCell = (record: T, index: number) => {
    if (!expandable?.expandedRowRender) return null;
    if (expandable.showExpandColumn === false) return null;

    const key = getRowKey(record, rowKey, index);
    const expanded = currentExpandedKeys.includes(key);
    const expandable_ = expandable.rowExpandable?.(record) ?? true;

    if (!expandable_) {
      return <td className="kage-table-expand-icon-cell" />;
    }

    const defaultIcon = (
      <span
        className={`kage-table-row-expand-icon ${expanded ? 'kage-table-row-expand-icon-expanded' : 'kage-table-row-expand-icon-collapsed'}`}
        onClick={() => handleExpand(record)}
      >
        {expanded ? '−' : '+'}
      </span>
    );

    const icon = expandable.expandIcon
      ? expandable.expandIcon({ expanded, record, onExpand: () => handleExpand(record) })
      : defaultIcon;

    return <td className="kage-table-expand-icon-cell">{icon}</td>;
  };

  // 渲染展开行
  const renderExpandedRow = (record: T, index: number) => {
    if (!expandable?.expandedRowRender) return null;

    const key = getRowKey(record, rowKey, index);
    if (!currentExpandedKeys.includes(key)) return null;

    const colSpan =
      columns.length +
      (rowSelection ? 1 : 0) +
      (expandable.showExpandColumn !== false ? 1 : 0);

    return (
      <tr key={`${key}-expanded`} className="kage-table-expanded-row">
        <td colSpan={colSpan} className="kage-table-expanded-row-cell">
          {expandable.expandedRowRender(record, index, expandable.indentSize || 15, true)}
        </td>
      </tr>
    );
  };

  // 渲染表格行
  const renderRow = (record: T, index: number) => {
    const key = getRowKey(record, rowKey, index);
    const isSelected = selectedRowKeys.includes(key);
    const isExpanded = currentExpandedKeys.includes(key);

    const rowClass =
      typeof rowClassName === 'function' ? rowClassName(record, index) : rowClassName;

    const rowProps = onRow?.(record, index) || {};

    const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
      rowProps.onClick?.(e as any);
      if (expandable?.expandRowByClick) {
        handleExpand(record);
      }
    };

    return (
      <React.Fragment key={key}>
        <tr
          {...rowProps}
          className={[
            'kage-table-row',
            rowClass,
            isSelected && 'kage-table-row-selected',
            isExpanded && 'kage-table-row-expanded',
            striped && index % 2 === 1 && 'kage-table-row-striped',
          ]
            .filter(Boolean)
            .join(' ')}
          onClick={handleRowClick}
        >
          {renderSelectionCell(record, index)}
          {renderExpandCell(record, index)}
          {columns.map((column) => renderCell(column, record, index))}
        </tr>
        {renderExpandedRow(record, index)}
      </React.Fragment>
    );
  };

  // 渲染空状态
  const renderEmpty = () => {
    const colSpan =
      columns.length +
      (rowSelection ? 1 : 0) +
      (expandable?.expandedRowRender && expandable.showExpandColumn !== false ? 1 : 0);

    return (
      <tr className="kage-table-placeholder">
        <td colSpan={colSpan} className="kage-table-cell">
          <Empty description={locale?.emptyText || '暂无数据'} />
        </td>
      </tr>
    );
  };

  // 渲染加载状态
  const renderLoading = () => (
    <div className="kage-table-loading">
      <div className="kage-table-loading-spinner" />
      <span>{loadingText}</span>
    </div>
  );

  // 渲染分页
  const renderPagination = () => {
    if (!currentPagination) return null;

    const position = currentPagination.position || 'bottomRight';
    const [vertical, horizontal] = [
      position.includes('top') ? 'top' : 'bottom',
      position.includes('Left') ? 'left' : position.includes('Center') ? 'center' : 'right',
    ];

    return (
      <div
        className={`kage-table-pagination kage-table-pagination-${horizontal}`}
        data-position={vertical}
      >
        <Pagination
          current={currentPagination.current}
          total={currentPagination.total}
          pageSize={currentPagination.pageSize}
          pageSizeOptions={currentPagination.pageSizeOptions}
          showSizeChanger={currentPagination.showSizeChanger}
          showQuickJumper={currentPagination.showQuickJumper}
          showTotal={currentPagination.showTotal}
          disabled={currentPagination.disabled}
          simple={currentPagination.simple}
          onChange={handlePageChange}
        />
      </div>
    );
  };

  // 渲染摘要
  const renderSummary = () => {
    if (!summary) return null;

    return <tfoot className="kage-table-summary">{summary(processedData)}</tfoot>;
  };

  // ============ 主渲染 ============

  const tableClassNames = [
    'kage-table',
    `kage-table-${size}`,
    bordered && 'kage-table-bordered',
    loading && 'kage-table-loading-wrapper',
    hoverable && 'kage-table-hoverable',
    sticky && 'kage-table-sticky',
    (scroll?.x || scroll?.y) && 'kage-table-scroll',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const tableStyle: CSSProperties = {
    ...style,
  };

  const scrollStyle: CSSProperties = {
    overflowX: scroll?.x ? 'auto' : undefined,
    overflowY: scroll?.y ? 'auto' : undefined,
    maxHeight: scroll?.y,
  };

  const innerTableStyle: CSSProperties = {
    width: scroll?.x === true ? 'max-content' : scroll?.x,
    minWidth: scroll?.x ? '100%' : undefined,
  };

  return (
    <div className={tableClassNames} style={tableStyle}>
      {title && <div className="kage-table-title">{title()}</div>}

      {currentPagination?.position?.includes('top') && renderPagination()}

      <div className="kage-table-container" style={scrollStyle}>
        {loading && renderLoading()}
        <table style={innerTableStyle}>
          {showHeader && (
            <thead className="kage-table-thead">
              <tr>
                {renderSelectionHeader()}
                {renderExpandHeader()}
                {columns.map((column) => renderHeaderCell(column))}
              </tr>
            </thead>
          )}
          <tbody className="kage-table-tbody">
            {currentPageData.length > 0 ? currentPageData.map(renderRow) : renderEmpty()}
          </tbody>
          {renderSummary()}
        </table>
      </div>

      {(!currentPagination?.position || currentPagination.position.includes('bottom')) &&
        renderPagination()}

      {footer && <div className="kage-table-footer">{footer()}</div>}
    </div>
  );
};

// ============ 导出 ============

export type { ColumnType as TableColumnType };

export default Table;

