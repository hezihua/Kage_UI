import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import './style.less';

// ============ Option Type ============
export interface SelectOption {
  /** 选项值 */
  value: string | number;
  /** 显示文本 */
  label?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

export type SelectValue = string | number | (string | number)[];

// ============ Select Props ============
export interface SelectProps {
  /** 当前值 */
  value?: SelectValue;
  /** 默认值 */
  defaultValue?: SelectValue;
  /** 选项数据 */
  options?: (SelectOption | string | number)[];
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否支持搜索 */
  showSearch?: boolean;
  /** 是否多选 */
  mode?: 'multiple' | 'tags';
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 下拉菜单是否与选择器同宽 */
  popupMatchSelectWidth?: boolean | number;
  /** 过滤选项 */
  filterOption?: boolean | ((input: string, option: SelectOption) => boolean);
  /** 无匹配时的内容 */
  notFoundContent?: React.ReactNode;
  /** 获取选项时的加载状态 */
  loading?: boolean;
  /** 最多显示多少个 tag */
  maxTagCount?: number;
  /** 隐藏 tag 时显示的内容 */
  maxTagPlaceholder?: React.ReactNode | ((omittedValues: SelectValue[]) => React.ReactNode);
  /** 最多显示多少个 tag 的文本长度 */
  maxTagTextLength?: number;
  /** 值变化回调 */
  onChange?: (value: SelectValue, option: SelectOption | SelectOption[]) => void;
  /** 选中回调 */
  onSelect?: (value: string | number, option: SelectOption) => void;
  /** 取消选中回调 */
  onDeselect?: (value: string | number, option: SelectOption) => void;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 下拉菜单打开/关闭回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent) => void;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Select Component ============
export const Select: React.FC<SelectProps> = ({
  value: controlledValue,
  defaultValue,
  options = [],
  placeholder = '请选择',
  disabled = false,
  allowClear = false,
  showSearch = false,
  mode,
  size = 'middle',
  status,
  popupMatchSelectWidth = true,
  filterOption = true,
  notFoundContent = '无匹配结果',
  loading = false,
  maxTagCount,
  maxTagPlaceholder,
  maxTagTextLength,
  onChange,
  onSelect,
  onDeselect,
  onSearch,
  onDropdownVisibleChange,
  onBlur,
  onFocus,
  className = '',
  style,
}) => {
  const isMultiple = mode === 'multiple' || mode === 'tags';
  
  const [internalValue, setInternalValue] = useState<SelectValue>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return isMultiple ? [] : '';
  });
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // 标准化选项
  const normalizedOptions: SelectOption[] = useMemo(
    () =>
      options.map((opt) => {
        if (typeof opt === 'string' || typeof opt === 'number') {
          return { value: opt, label: opt };
        }
        return opt;
      }),
    [options],
  );

  // 过滤选项
  const filteredOptions = useMemo(() => {
    if (!showSearch || !searchValue) return normalizedOptions;

    return normalizedOptions.filter((option) => {
      if (!filterOption) return true;
      if (typeof filterOption === 'function') {
        return filterOption(searchValue, option);
      }
      // 默认过滤
      const optionText = String(option.label || option.value).toLowerCase();
      return optionText.includes(searchValue.toLowerCase());
    });
  }, [normalizedOptions, showSearch, searchValue, filterOption]);

  // 获取选中的选项
  const getSelectedOptions = useCallback(
    (val: SelectValue): SelectOption[] => {
      if (!isMultiple) {
        const option = normalizedOptions.find((opt) => opt.value === val);
        return option ? [option] : [];
      }
      return (val as (string | number)[])
        .map((v) => normalizedOptions.find((opt) => opt.value === v))
        .filter(Boolean) as SelectOption[];
    },
    [normalizedOptions, isMultiple],
  );

  // 获取显示文本
  const getDisplayText = useCallback(() => {
    if (isMultiple) {
      const selectedOptions = getSelectedOptions(value);
      return selectedOptions.map((opt) => opt.label || opt.value);
    }
    const selectedOption = getSelectedOptions(value)[0];
    return selectedOption ? selectedOption.label || selectedOption.value : '';
  }, [value, isMultiple, getSelectedOptions]);

  // 打开/关闭下拉
  const setOpen = useCallback(
    (open: boolean) => {
      if (disabled) return;
      setIsOpen(open);
      onDropdownVisibleChange?.(open);
      if (!open) {
        setActiveIndex(-1);
        setSearchValue('');
      } else {
        setTimeout(() => searchInputRef.current?.focus(), 0);
      }
    },
    [disabled, onDropdownVisibleChange],
  );

  // 处理选择
  const handleSelect = useCallback(
    (option: SelectOption) => {
      if (option.disabled) return;

      if (isMultiple) {
        const currentValues = value as (string | number)[];
        const isSelected = currentValues.includes(option.value);

        let newValue: (string | number)[];
        if (isSelected) {
          newValue = currentValues.filter((v) => v !== option.value);
          onDeselect?.(option.value, option);
        } else {
          newValue = [...currentValues, option.value];
          onSelect?.(option.value, option);
        }

        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(newValue, getSelectedOptions(newValue));
      } else {
        if (controlledValue === undefined) {
          setInternalValue(option.value);
        }
        onChange?.(option.value, option);
        onSelect?.(option.value, option);
        setOpen(false);
      }

      setSearchValue('');
    },
    [
      isMultiple,
      value,
      controlledValue,
      onChange,
      onSelect,
      onDeselect,
      getSelectedOptions,
      setOpen,
    ],
  );

  // 移除标签
  const handleRemoveTag = useCallback(
    (tagValue: string | number, e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;

      const currentValues = value as (string | number)[];
      const newValue = currentValues.filter((v) => v !== tagValue);
      const option = normalizedOptions.find((opt) => opt.value === tagValue);

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue, getSelectedOptions(newValue));
      if (option) {
        onDeselect?.(tagValue, option);
      }
    },
    [
      disabled,
      value,
      controlledValue,
      normalizedOptions,
      onChange,
      onDeselect,
      getSelectedOptions,
    ],
  );

  // 清除
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const newValue = isMultiple ? [] : '';
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue, isMultiple ? [] : ({} as SelectOption));
      setSearchValue('');
    },
    [isMultiple, controlledValue, onChange],
  );

  // 搜索
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchValue(newValue);
      onSearch?.(newValue);
      setActiveIndex(-1);
    },
    [onSearch],
  );

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev + 1;
            return next >= filteredOptions.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev - 1;
            return next < 0 ? filteredOptions.length - 1 : next;
          });
          break;
        case 'Enter':
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < filteredOptions.length) {
            handleSelect(filteredOptions[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Backspace':
          if (isMultiple && !searchValue && (value as any[]).length > 0) {
            const currentValues = value as (string | number)[];
            const lastValue = currentValues[currentValues.length - 1];
            handleRemoveTag(lastValue, e as any);
          }
          break;
      }
    },
    [
      isOpen,
      filteredOptions,
      activeIndex,
      handleSelect,
      setOpen,
      isMultiple,
      searchValue,
      value,
      handleRemoveTag,
    ],
  );

  // 滚动到激活项
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector('.kage-select-option-active');
      activeItem?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

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

  const classNames = [
    'kage-select',
    `kage-select-${size}`,
    disabled && 'kage-select-disabled',
    status && `kage-select-status-${status}`,
    isOpen && 'kage-select-open',
    isMultiple && 'kage-select-multiple',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const showClear = allowClear && !disabled && (
    isMultiple ? (value as any[]).length > 0 : !!value
  );

  // 渲染选择器
  const renderSelector = () => {
    if (isMultiple) {
      const selectedValues = value as (string | number)[];
      const selectedOptions = getSelectedOptions(selectedValues);
      const displayTags = maxTagCount
        ? selectedOptions.slice(0, maxTagCount)
        : selectedOptions;
      const omittedCount = selectedOptions.length - displayTags.length;

      return (
        <div className="kage-select-selector">
          {displayTags.map((opt) => (
            <span key={opt.value} className="kage-select-tag">
              <span className="kage-select-tag-label">
                {maxTagTextLength && String(opt.label || opt.value).length > maxTagTextLength
                  ? String(opt.label || opt.value).slice(0, maxTagTextLength) + '...'
                  : opt.label || opt.value}
              </span>
              {!disabled && (
                <span
                  className="kage-select-tag-close"
                  onClick={(e) => handleRemoveTag(opt.value, e)}
                >
                  ×
                </span>
              )}
            </span>
          ))}
          {omittedCount > 0 && (
            <span className="kage-select-tag">
              {typeof maxTagPlaceholder === 'function'
                ? maxTagPlaceholder(selectedOptions.slice(maxTagCount))
                : maxTagPlaceholder || `+${omittedCount}`}
            </span>
          )}
          <input
            ref={searchInputRef}
            type="text"
            className="kage-select-search-input"
            value={searchValue}
            disabled={disabled}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        </div>
      );
    }

    const displayText = getDisplayText();

    return (
      <div className="kage-select-selector" onClick={() => setOpen(!isOpen)}>
        {showSearch && isOpen ? (
          <input
            ref={searchInputRef}
            type="text"
            className="kage-select-search-input"
            value={searchValue}
            placeholder={placeholder}
            disabled={disabled}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className={`kage-select-selection-item ${!displayText ? 'kage-select-placeholder' : ''}`}>
            {displayText || placeholder}
          </span>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className={classNames}
      style={style}
      onFocus={onFocus}
      onBlur={onBlur}
      tabIndex={disabled ? -1 : 0}
    >
      {renderSelector()}

      {/* 箭头 */}
      <span className="kage-select-arrow">▼</span>

      {/* 清除按钮 */}
      {showClear && (
        <span className="kage-select-clear" onClick={handleClear}>
          ×
        </span>
      )}

      {/* 下拉菜单 */}
      {isOpen && (
        <div ref={dropdownRef} className="kage-select-dropdown">
          {loading ? (
            <div className="kage-select-loading">加载中...</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const isSelected = isMultiple
                ? (value as (string | number)[]).includes(option.value)
                : value === option.value;
              
              const optionClassNames = [
                'kage-select-option',
                option.disabled && 'kage-select-option-disabled',
                index === activeIndex && 'kage-select-option-active',
                isSelected && 'kage-select-option-selected',
              ]
                .filter(Boolean)
                .join(' ');

              return (
                <div
                  key={option.value}
                  className={optionClassNames}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {isMultiple && (
                    <span className={`kage-select-checkbox ${isSelected ? 'checked' : ''}`}>
                      {isSelected && '✓'}
                    </span>
                  )}
                  <span className="kage-select-option-label">
                    {option.label || option.value}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="kage-select-empty">{notFoundContent}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Select;

