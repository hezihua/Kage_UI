import React, { useState, useRef, useEffect, useMemo } from 'react';
import './style.less';

export type SegmentedValue = string | number;

export interface SegmentedOption {
  label: React.ReactNode;
  value: SegmentedValue;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedProps {
  /** 选项数据 */
  options: (SegmentedValue | SegmentedOption)[];
  /** 当前选中的值 */
  value?: SegmentedValue;
  /** 默认选中的值 */
  defaultValue?: SegmentedValue;
  /** 变化时的回调函数 */
  onChange?: (value: SegmentedValue) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否块级显示 */
  block?: boolean;
  /** 大小 */
  size?: 'large' | 'middle' | 'small';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const normalizeOptions = (
  options: (SegmentedValue | SegmentedOption)[]
): SegmentedOption[] => {
  return options.map((option) => {
    if (typeof option === 'string' || typeof option === 'number') {
      return {
        label: option,
        value: option,
      };
    }
    return option;
  });
};

export const Segmented: React.FC<SegmentedProps> = ({
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  disabled = false,
  block = false,
  size = 'middle',
  className,
  style,
}) => {
  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);
  
  const [internalValue, setInternalValue] = useState<SegmentedValue>(() => {
    return (
      controlledValue ??
      defaultValue ??
      normalizedOptions[0]?.value
    );
  });

  const value = controlledValue ?? internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  // 更新滑块位置
  useEffect(() => {
    const activeIndex = normalizedOptions.findIndex(
      (option) => option.value === value
    );
    
    if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
      const activeItem = itemRefs.current[activeIndex];
      const container = containerRef.current;
      
      if (activeItem && container) {
        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        
        setThumbStyle({
          width: `${itemRect.width}px`,
          height: `${itemRect.height}px`,
          transform: `translateX(${itemRect.left - containerRect.left}px)`,
        });
      }
    }
  }, [value, normalizedOptions]);

  const handleClick = (option: SegmentedOption) => {
    if (disabled || option.disabled) return;

    const newValue = option.value;
    
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    
    onChange?.(newValue);
  };

  const prefixCls = 'kage-segmented';

  return (
    <div
      ref={containerRef}
      className={`${prefixCls} ${prefixCls}-${size} ${
        block ? `${prefixCls}-block` : ''
      } ${disabled ? `${prefixCls}-disabled` : ''} ${className || ''}`}
      style={style}
    >
      <div className={`${prefixCls}-group`}>
        {/* 滑动背景 */}
        <div className={`${prefixCls}-thumb`} style={thumbStyle} />

        {/* 选项 */}
        {normalizedOptions.map((option, index) => {
          const isActive = option.value === value;
          const isDisabled = disabled || option.disabled;

          return (
            <div
              key={option.value}
              ref={(el) => (itemRefs.current[index] = el)}
              className={`${prefixCls}-item ${
                isActive ? `${prefixCls}-item-selected` : ''
              } ${isDisabled ? `${prefixCls}-item-disabled` : ''}`}
              onClick={() => handleClick(option)}
            >
              <div className={`${prefixCls}-item-label`}>
                {option.icon && (
                  <span className={`${prefixCls}-item-icon`}>
                    {option.icon}
                  </span>
                )}
                {option.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Segmented;

