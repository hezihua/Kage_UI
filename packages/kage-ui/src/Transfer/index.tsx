import React, { useState, useCallback, useMemo } from 'react';
import './style.less';

// ============ Transfer 数据项 ============
export interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}

export type TransferDirection = 'left' | 'right';

// ============ Transfer Props ============
export interface TransferProps {
  /** 数据源，其中的数据将会被渲染到左边一栏 */
  dataSource: TransferItem[];
  /** 显示在右侧列表的数据 keys */
  targetKeys?: string[];
  /** 默认显示在右侧列表的数据 keys */
  defaultTargetKeys?: string[];
  /** 选中的数据 keys */
  selectedKeys?: string[];
  /** 默认选中的数据 keys */
  defaultSelectedKeys?: string[];
  /** 渲染每条数据项 */
  render?: (item: TransferItem) => React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 搜索框占位符 */
  searchPlaceholder?: string;
  /** 自定义过滤函数 */
  filterOption?: (inputValue: string, item: TransferItem) => boolean;
  /** 标题集合 */
  titles?: [React.ReactNode, React.ReactNode];
  /** 操作按钮文案集合 */
  operations?: [React.ReactNode, React.ReactNode];
  /** 是否显示全选按钮 */
  showSelectAll?: boolean;
  /** 列表样式 */
  listStyle?: React.CSSProperties;
  /** 选中项变化回调 */
  onSelectChange?: (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void;
  /** 数据在两栏之间转移时的回调 */
  onChange?: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
  /** 搜索框内容变化回调 */
  onSearch?: (direction: TransferDirection, value: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Transfer Component ============
export const Transfer: React.FC<TransferProps> = ({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys = [],
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  render,
  disabled = false,
  showSearch = false,
  searchPlaceholder = '请输入搜索内容',
  filterOption,
  titles = ['源列表', '目标列表'],
  operations = ['>', '<'],
  showSelectAll = true,
  listStyle,
  onSelectChange,
  onChange,
  onSearch,
  className = '',
  style,
}) => {
  const [internalTargetKeys, setInternalTargetKeys] = useState<string[]>(defaultTargetKeys);
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [leftSearch, setLeftSearch] = useState('');
  const [rightSearch, setRightSearch] = useState('');

  const targetKeys = controlledTargetKeys !== undefined ? controlledTargetKeys : internalTargetKeys;
  const selectedKeys = controlledSelectedKeys !== undefined ? controlledSelectedKeys : internalSelectedKeys;

  // 分离左右列表数据
  const { leftDataSource, rightDataSource } = useMemo(() => {
    const left: TransferItem[] = [];
    const right: TransferItem[] = [];

    dataSource.forEach((item) => {
      if (targetKeys.includes(item.key)) {
        right.push(item);
      } else {
        left.push(item);
      }
    });

    return { leftDataSource: left, rightDataSource: right };
  }, [dataSource, targetKeys]);

  // 默认过滤函数
  const defaultFilterOption = useCallback((inputValue: string, item: TransferItem): boolean => {
    return item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
           (item.description?.toLowerCase().includes(inputValue.toLowerCase()) ?? false);
  }, []);

  const actualFilterOption = filterOption || defaultFilterOption;

  // 过滤后的数据
  const filteredLeftDataSource = useMemo(() => {
    if (!leftSearch) return leftDataSource;
    return leftDataSource.filter((item) => actualFilterOption(leftSearch, item));
  }, [leftDataSource, leftSearch, actualFilterOption]);

  const filteredRightDataSource = useMemo(() => {
    if (!rightSearch) return rightDataSource;
    return rightDataSource.filter((item) => actualFilterOption(rightSearch, item));
  }, [rightDataSource, rightSearch, actualFilterOption]);

  // 获取某一侧的选中 keys
  const getSelectedKeysForDirection = useCallback((direction: TransferDirection): string[] => {
    const dataSource = direction === 'left' ? leftDataSource : rightDataSource;
    return selectedKeys.filter((key) => dataSource.some((item) => item.key === key));
  }, [selectedKeys, leftDataSource, rightDataSource]);

  const leftSelectedKeys = getSelectedKeysForDirection('left');
  const rightSelectedKeys = getSelectedKeysForDirection('right');

  // 切换选中状态
  const handleSelectChange = useCallback((direction: TransferDirection, key: string, checked: boolean) => {
    if (disabled) return;

    let newSelectedKeys: string[];
    if (checked) {
      newSelectedKeys = [...selectedKeys, key];
    } else {
      newSelectedKeys = selectedKeys.filter((k) => k !== key);
    }

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    const leftKeys = newSelectedKeys.filter((k) => leftDataSource.some((item) => item.key === k));
    const rightKeys = newSelectedKeys.filter((k) => rightDataSource.some((item) => item.key === k));
    onSelectChange?.(leftKeys, rightKeys);
  }, [disabled, selectedKeys, controlledSelectedKeys, leftDataSource, rightDataSource, onSelectChange]);

  // 全选/取消全选
  const handleSelectAll = useCallback((direction: TransferDirection, checked: boolean) => {
    if (disabled) return;

    const dataSource = direction === 'left' ? filteredLeftDataSource : filteredRightDataSource;
    const selectableKeys = dataSource.filter((item) => !item.disabled).map((item) => item.key);

    let newSelectedKeys: string[];
    if (checked) {
      // 添加当前列表的所有可选项
      const otherKeys = selectedKeys.filter((key) => !dataSource.some((item) => item.key === key));
      newSelectedKeys = [...otherKeys, ...selectableKeys];
    } else {
      // 移除当前列表的所有项
      newSelectedKeys = selectedKeys.filter((key) => !dataSource.some((item) => item.key === key));
    }

    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    const leftKeys = newSelectedKeys.filter((k) => leftDataSource.some((item) => item.key === k));
    const rightKeys = newSelectedKeys.filter((k) => rightDataSource.some((item) => item.key === k));
    onSelectChange?.(leftKeys, rightKeys);
  }, [disabled, filteredLeftDataSource, filteredRightDataSource, selectedKeys, controlledSelectedKeys, leftDataSource, rightDataSource, onSelectChange]);

  // 移动数据
  const handleMove = useCallback((direction: TransferDirection) => {
    if (disabled) return;

    const moveKeys = direction === 'left' ? rightSelectedKeys : leftSelectedKeys;
    if (moveKeys.length === 0) return;

    let newTargetKeys: string[];
    if (direction === 'left') {
      // 从右移到左（移除）
      newTargetKeys = targetKeys.filter((key) => !moveKeys.includes(key));
    } else {
      // 从左移到右（添加）
      newTargetKeys = [...targetKeys, ...moveKeys];
    }

    if (controlledTargetKeys === undefined) {
      setInternalTargetKeys(newTargetKeys);
    }

    // 清空移动的选中项
    const newSelectedKeys = selectedKeys.filter((key) => !moveKeys.includes(key));
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }

    onChange?.(newTargetKeys, direction, moveKeys);
  }, [disabled, leftSelectedKeys, rightSelectedKeys, targetKeys, selectedKeys, controlledTargetKeys, controlledSelectedKeys, onChange]);

  // 搜索
  const handleSearch = useCallback((direction: TransferDirection, value: string) => {
    if (direction === 'left') {
      setLeftSearch(value);
    } else {
      setRightSearch(value);
    }
    onSearch?.(direction, value);
  }, [onSearch]);

  // 渲染列表
  const renderList = (direction: TransferDirection, dataSource: TransferItem[], searchValue: string) => {
    const selectedKeysForDirection = direction === 'left' ? leftSelectedKeys : rightSelectedKeys;
    const selectableCount = dataSource.filter((item) => !item.disabled).length;
    const selectedCount = selectedKeysForDirection.length;
    const isAllSelected = selectableCount > 0 && selectedCount === selectableCount;
    const isIndeterminate = selectedCount > 0 && selectedCount < selectableCount;

    return (
      <div className="kage-transfer-list" style={listStyle}>
        {/* 头部 */}
        <div className="kage-transfer-list-header">
          {showSelectAll && (
            <label className="kage-transfer-checkbox-label">
              <input
                type="checkbox"
                className="kage-transfer-checkbox"
                checked={isAllSelected}
                ref={(el) => {
                  if (el) el.indeterminate = isIndeterminate;
                }}
                onChange={(e) => handleSelectAll(direction, e.target.checked)}
                disabled={disabled || selectableCount === 0}
              />
              <span className="kage-transfer-list-header-title">
                {titles[direction === 'left' ? 0 : 1]}
              </span>
            </label>
          )}
          {!showSelectAll && (
            <span className="kage-transfer-list-header-title">
              {titles[direction === 'left' ? 0 : 1]}
            </span>
          )}
          <span className="kage-transfer-list-header-count">
            {selectedCount > 0 ? `${selectedCount}/${dataSource.length}` : dataSource.length}
          </span>
        </div>

        {/* 搜索框 */}
        {showSearch && (
          <div className="kage-transfer-list-search">
            <input
              type="text"
              className="kage-transfer-search-input"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => handleSearch(direction, e.target.value)}
              disabled={disabled}
            />
          </div>
        )}

        {/* 列表内容 */}
        <div className="kage-transfer-list-body">
          {dataSource.length === 0 ? (
            <div className="kage-transfer-list-empty">暂无数据</div>
          ) : (
            dataSource.map((item) => {
              const isChecked = selectedKeysForDirection.includes(item.key);
              const isDisabled = disabled || item.disabled;

              return (
                <label
                  key={item.key}
                  className={`kage-transfer-list-item ${isDisabled ? 'kage-transfer-list-item-disabled' : ''}`}
                >
                  <input
                    type="checkbox"
                    className="kage-transfer-checkbox"
                    checked={isChecked}
                    onChange={(e) => handleSelectChange(direction, item.key, e.target.checked)}
                    disabled={isDisabled}
                  />
                  <span className="kage-transfer-list-item-content">
                    {render ? render(item) : (
                      <>
                        <div className="kage-transfer-list-item-title">{item.title}</div>
                        {item.description && (
                          <div className="kage-transfer-list-item-description">{item.description}</div>
                        )}
                      </>
                    )}
                  </span>
                </label>
              );
            })
          )}
        </div>
      </div>
    );
  };

  const classNames = ['kage-transfer', disabled && 'kage-transfer-disabled', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {/* 左侧列表 */}
      {renderList('left', filteredLeftDataSource, leftSearch)}

      {/* 操作按钮 */}
      <div className="kage-transfer-operations">
        <button
          className="kage-transfer-operation-btn"
          disabled={disabled || leftSelectedKeys.length === 0}
          onClick={() => handleMove('right')}
          title="移至右侧"
        >
          {operations[0]}
        </button>
        <button
          className="kage-transfer-operation-btn"
          disabled={disabled || rightSelectedKeys.length === 0}
          onClick={() => handleMove('left')}
          title="移至左侧"
        >
          {operations[1]}
        </button>
      </div>

      {/* 右侧列表 */}
      {renderList('right', filteredRightDataSource, rightSearch)}
    </div>
  );
};

export default Transfer;

