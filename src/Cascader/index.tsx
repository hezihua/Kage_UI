import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.less';

// ============ Option Type ============
export interface CascaderOption {
  /** 选项值 */
  value: string | number;
  /** 显示文本 */
  label: React.ReactNode;
  /** 子选项 */
  children?: CascaderOption[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
}

// ============ Cascader Props ============
export type CascaderValueType = (string | number)[];

export interface CascaderProps {
  /** 选项数据 */
  options: CascaderOption[];
  /** 当前值 */
  value?: CascaderValueType;
  /** 默认值 */
  defaultValue?: CascaderValueType;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 展开触发方式 */
  expandTrigger?: 'click' | 'hover';
  /** 选择即改变（选中即触发，不需选到最后一级） */
  changeOnSelect?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 自定义显示函数 */
  displayRender?: (labels: React.ReactNode[], selectedOptions?: CascaderOption[]) => React.ReactNode;
  /** 值改变回调 */
  onChange?: (value: CascaderValueType, selectedOptions?: CascaderOption[]) => void;
  /** 下拉菜单打开/关闭回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 无匹配时的内容 */
  notFoundContent?: React.ReactNode;
  /** 状态 */
  status?: 'error' | 'warning';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Cascader Component ============
export const Cascader: React.FC<CascaderProps> = ({
  options,
  value: controlledValue,
  defaultValue = [],
  placeholder = '请选择',
  disabled = false,
  allowClear = true,
  size = 'middle',
  expandTrigger = 'click',
  changeOnSelect = false,
  showSearch = false,
  displayRender,
  onChange,
  onDropdownVisibleChange,
  notFoundContent = '无匹配结果',
  status,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<CascaderValueType>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<CascaderValueType>([]);
  const [searchValue, setSearchValue] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const value = controlledValue ?? internalValue;

  // 获取选中的选项链
  const getSelectedOptions = useCallback((val: CascaderValueType): CascaderOption[] => {
    const result: CascaderOption[] = [];
    let currentOptions = options;

    for (const v of val) {
      const found = currentOptions.find((opt) => opt.value === v);
      if (found) {
        result.push(found);
        currentOptions = found.children || [];
      } else {
        break;
      }
    }

    return result;
  }, [options]);

  // 获取显示文本
  const getDisplayLabel = useCallback(() => {
    if (value.length === 0) return '';

    const selectedOptions = getSelectedOptions(value);
    const labels = selectedOptions.map((opt) => opt.label);

    if (displayRender) {
      return displayRender(labels, selectedOptions);
    }

    return labels.join(' / ');
  }, [value, getSelectedOptions, displayRender]);

  // 打开/关闭下拉
  const setOpen = useCallback((open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    onDropdownVisibleChange?.(open);
    if (open) {
      setActiveValue(value);
      setSearchValue('');
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [disabled, value, onDropdownVisibleChange]);

  // 选择选项
  const handleSelect = useCallback((option: CascaderOption, level: number) => {
    if (option.disabled) return;

    const newActiveValue = [...activeValue.slice(0, level), option.value];
    setActiveValue(newActiveValue);

    const hasChildren = option.children && option.children.length > 0;
    const isLeaf = option.isLeaf || !hasChildren;

    if (isLeaf || changeOnSelect) {
      if (controlledValue === undefined) {
        setInternalValue(newActiveValue);
      }
      onChange?.(newActiveValue, getSelectedOptions(newActiveValue));
      
      if (isLeaf) {
        setOpen(false);
      }
    }
  }, [activeValue, changeOnSelect, controlledValue, onChange, getSelectedOptions, setOpen]);

  // 鼠标悬浮展开
  const handleMouseEnter = useCallback((option: CascaderOption, level: number) => {
    if (expandTrigger !== 'hover' || option.disabled) return;
    
    const newActiveValue = [...activeValue.slice(0, level), option.value];
    setActiveValue(newActiveValue);
  }, [expandTrigger, activeValue]);

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue([]);
    }
    onChange?.([], []);
  }, [controlledValue, onChange]);

  // 搜索过滤（展平所有路径）
  const getFilteredOptions = useCallback((): { path: CascaderOption[]; value: CascaderValueType }[] => {
    if (!searchValue) return [];

    const results: { path: CascaderOption[]; value: CascaderValueType }[] = [];

    const traverse = (opts: CascaderOption[], path: CascaderOption[], valuePath: CascaderValueType) => {
      for (const opt of opts) {
        const currentPath = [...path, opt];
        const currentValuePath = [...valuePath, opt.value];
        const hasChildren = opt.children && opt.children.length > 0;

        // 检查是否匹配
        const labelStr = typeof opt.label === 'string' ? opt.label : '';
        if (labelStr.toLowerCase().includes(searchValue.toLowerCase())) {
          if (!hasChildren || changeOnSelect) {
            results.push({ path: currentPath, value: currentValuePath });
          }
        }

        if (hasChildren) {
          traverse(opt.children!, currentPath, currentValuePath);
        }
      }
    };

    traverse(options, [], []);
    return results;
  }, [options, searchValue, changeOnSelect]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  // 获取每一级的选项
  const getMenus = useCallback(() => {
    const menus: CascaderOption[][] = [options];
    let currentOptions = options;

    for (const v of activeValue) {
      const found = currentOptions.find((opt) => opt.value === v);
      if (found?.children && found.children.length > 0) {
        menus.push(found.children);
        currentOptions = found.children;
      } else {
        break;
      }
    }

    return menus;
  }, [options, activeValue]);

  const classNames = [
    'kage-cascader',
    `kage-cascader-${size}`,
    disabled && 'kage-cascader-disabled',
    status && `kage-cascader-status-${status}`,
    isOpen && 'kage-cascader-open',
    className,
  ].filter(Boolean).join(' ');

  const filteredOptions = showSearch && searchValue ? getFilteredOptions() : [];

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {/* 选择器 */}
      <div
        className="kage-cascader-selector"
        onClick={() => setOpen(!isOpen)}
      >
        <span className={`kage-cascader-selection ${value.length === 0 ? 'kage-cascader-selection-placeholder' : ''}`}>
          {value.length > 0 ? getDisplayLabel() : placeholder}
        </span>
        
        {/* 清除按钮 */}
        {allowClear && value.length > 0 && !disabled && (
          <span className="kage-cascader-clear" onClick={handleClear}>
            ×
          </span>
        )}
        
        {/* 箭头 */}
        <span className={`kage-cascader-arrow ${isOpen ? 'kage-cascader-arrow-open' : ''}`}>
          ▼
        </span>
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="kage-cascader-dropdown">
          {/* 搜索框 */}
          {showSearch && (
            <div className="kage-cascader-search">
              <input
                ref={searchInputRef}
                type="text"
                className="kage-cascader-search-input"
                placeholder="请输入搜索"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          )}

          {/* 搜索结果 */}
          {showSearch && searchValue ? (
            <div className="kage-cascader-search-result">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item, index) => (
                  <div
                    key={index}
                    className="kage-cascader-search-option"
                    onClick={() => {
                      if (controlledValue === undefined) {
                        setInternalValue(item.value);
                      }
                      onChange?.(item.value, item.path);
                      setOpen(false);
                    }}
                  >
                    {item.path.map((opt) => opt.label).join(' / ')}
                  </div>
                ))
              ) : (
                <div className="kage-cascader-empty">{notFoundContent}</div>
              )}
            </div>
          ) : (
            /* 级联菜单 */
            <div className="kage-cascader-menus">
              {getMenus().map((menu, level) => (
                <ul key={level} className="kage-cascader-menu">
                  {menu.map((option) => {
                    const isActive = activeValue[level] === option.value;
                    const isSelected = value[level] === option.value;
                    const hasChildren = option.children && option.children.length > 0;

                    const optionClassNames = [
                      'kage-cascader-menu-item',
                      isActive && 'kage-cascader-menu-item-active',
                      isSelected && 'kage-cascader-menu-item-selected',
                      option.disabled && 'kage-cascader-menu-item-disabled',
                    ].filter(Boolean).join(' ');

                    return (
                      <li
                        key={option.value}
                        className={optionClassNames}
                        onClick={() => handleSelect(option, level)}
                        onMouseEnter={() => handleMouseEnter(option, level)}
                      >
                        <span className="kage-cascader-menu-item-label">{option.label}</span>
                        {hasChildren && (
                          <span className="kage-cascader-menu-item-arrow">▶</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Cascader;

