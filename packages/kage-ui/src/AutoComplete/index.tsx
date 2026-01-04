import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.less';

// ============ Option Type ============
export interface AutoCompleteOption {
  /** 选项值 */
  value: string;
  /** 显示文本 */
  label?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============ AutoComplete Props ============
export interface AutoCompleteProps {
  /** 选项数据 */
  options?: AutoCompleteOption[] | string[];
  /** 当前值 */
  value?: string;
  /** 默认值 */
  defaultValue?: string;
  /** 占位符 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 下拉菜单是否与输入框同宽 */
  popupMatchSelectWidth?: boolean | number;
  /** 选中回调 */
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 值改变回调 */
  onChange?: (value: string) => void;
  /** 失焦回调 */
  onBlur?: (e: React.FocusEvent) => void;
  /** 聚焦回调 */
  onFocus?: (e: React.FocusEvent) => void;
  /** 下拉菜单打开/关闭回调 */
  onDropdownVisibleChange?: (open: boolean) => void;
  /** 自定义过滤 */
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  /** 无匹配时的内容 */
  notFoundContent?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义输入框 */
  children?: React.ReactElement;
}

// ============ AutoComplete Component ============
export const AutoComplete: React.FC<AutoCompleteProps> = ({
  options = [],
  value: controlledValue,
  defaultValue = '',
  placeholder,
  disabled = false,
  allowClear = false,
  size = 'middle',
  status,
  popupMatchSelectWidth = true,
  onSelect,
  onSearch,
  onChange,
  onBlur,
  onFocus,
  onDropdownVisibleChange,
  filterOption = true,
  notFoundContent = '无匹配结果',
  className = '',
  style,
  children,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const value = controlledValue ?? internalValue;

  // 标准化选项
  const normalizedOptions: AutoCompleteOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  // 过滤选项
  const filteredOptions = normalizedOptions.filter((option) => {
    if (!filterOption) return true;
    if (typeof filterOption === 'function') {
      return filterOption(value, option);
    }
    // 默认过滤：值包含输入内容（不区分大小写）
    return option.value.toLowerCase().includes(value.toLowerCase());
  });

  // 打开/关闭下拉
  const setOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    onDropdownVisibleChange?.(open);
    if (!open) {
      setActiveIndex(-1);
    }
  }, [onDropdownVisibleChange]);

  // 输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    onSearch?.(newValue);
    setOpen(true);
    setActiveIndex(-1);
  }, [controlledValue, onChange, onSearch, setOpen]);

  // 选择选项
  const handleSelect = useCallback((option: AutoCompleteOption) => {
    if (option.disabled) return;

    if (controlledValue === undefined) {
      setInternalValue(option.value);
    }
    onChange?.(option.value);
    onSelect?.(option.value, option);
    setOpen(false);
    inputRef.current?.blur();
  }, [controlledValue, onChange, onSelect, setOpen]);

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue('');
    }
    onChange?.('');
    onSearch?.('');
    inputRef.current?.focus();
  }, [controlledValue, onChange, onSearch]);

  // 聚焦
  const handleFocus = useCallback((e: React.FocusEvent) => {
    setOpen(true);
    onFocus?.(e);
  }, [setOpen, onFocus]);

  // 失焦
  const handleBlur = useCallback((e: React.FocusEvent) => {
    // 延迟关闭，允许点击选项
    setTimeout(() => {
      setOpen(false);
    }, 150);
    onBlur?.(e);
  }, [setOpen, onBlur]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
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
        setOpen(false);
        break;
    }
  }, [isOpen, setOpen, activeIndex, filteredOptions, handleSelect]);

  // 滚动到激活项
  useEffect(() => {
    if (activeIndex >= 0 && dropdownRef.current) {
      const activeItem = dropdownRef.current.querySelector('.kage-autocomplete-option-active');
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
    'kage-autocomplete',
    `kage-autocomplete-${size}`,
    disabled && 'kage-autocomplete-disabled',
    status && `kage-autocomplete-status-${status}`,
    isOpen && 'kage-autocomplete-open',
    className,
  ].filter(Boolean).join(' ');

  const dropdownStyle: React.CSSProperties = {};
  if (typeof popupMatchSelectWidth === 'number') {
    dropdownStyle.width = popupMatchSelectWidth;
  } else if (popupMatchSelectWidth === false) {
    dropdownStyle.minWidth = containerRef.current?.offsetWidth;
  }

  // 渲染输入框
  const renderInput = () => {
    if (children) {
      return React.cloneElement(children, {
        ref: inputRef,
        value,
        disabled,
        onChange: handleInputChange,
        onFocus: handleFocus,
        onBlur: handleBlur,
        onKeyDown: handleKeyDown,
      });
    }

    return (
      <input
        ref={inputRef}
        type="text"
        className="kage-autocomplete-input"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  };

  return (
    <div ref={containerRef} className={classNames} style={style}>
      <div className="kage-autocomplete-selector">
        {renderInput()}
        
        {/* 清除按钮 */}
        {allowClear && value && !disabled && (
          <span className="kage-autocomplete-clear" onClick={handleClear}>
            ×
          </span>
        )}
      </div>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="kage-autocomplete-dropdown"
          style={dropdownStyle}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => {
              const optionClassNames = [
                'kage-autocomplete-option',
                option.disabled && 'kage-autocomplete-option-disabled',
                index === activeIndex && 'kage-autocomplete-option-active',
                option.value === value && 'kage-autocomplete-option-selected',
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={option.value}
                  className={optionClassNames}
                  onClick={() => handleSelect(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {option.label || option.value}
                </div>
              );
            })
          ) : (
            <div className="kage-autocomplete-empty">{notFoundContent}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;

