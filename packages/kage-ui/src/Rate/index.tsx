import React, { useState, useCallback, useMemo } from 'react';
import './style.less';

export interface RateProps {
  /** 当前值 */
  value?: number;
  /** 默认值 */
  defaultValue?: number;
  /** star 总数 */
  count?: number;
  /** 是否允许半选 */
  allowHalf?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 只读模式 */
  readOnly?: boolean;
  /** 自定义字符 */
  character?: React.ReactNode;
  /** 自定义字符样式（根据索引） */
  characterRender?: (origin: React.ReactNode, props: { index: number; value: number }) => React.ReactNode;
  /** 辅助文字数组 */
  tooltips?: string[];
  /** 值变化回调 */
  onChange?: (value: number) => void;
  /** hover 时回调 */
  onHoverChange?: (value: number) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Rate: React.FC<RateProps> = ({
  value: controlledValue,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  readOnly = false,
  character = '★',
  characterRender,
  tooltips,
  onChange,
  onHoverChange,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : value;

  // 处理点击
  const handleClick = useCallback(
    (starValue: number) => {
      if (disabled || readOnly) return;

      let newValue = starValue;

      // 如果允许清除且点击的是当前值，则清除
      if (allowClear && starValue === value) {
        newValue = 0;
      }

      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [disabled, readOnly, allowClear, value, controlledValue, onChange],
  );

  // 处理 hover
  const handleMouseEnter = useCallback(
    (starValue: number) => {
      if (disabled || readOnly) return;
      setHoverValue(starValue);
      onHoverChange?.(starValue);
    },
    [disabled, readOnly, onHoverChange],
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled || readOnly) return;
    setHoverValue(null);
    onHoverChange?.(value);
  }, [disabled, readOnly, value, onHoverChange]);

  // 渲染星星
  const stars = useMemo(() => {
    const result = [];
    for (let i = 1; i <= count; i++) {
      const starValue = i;
      const isFull = displayValue >= starValue;
      const isHalf = allowHalf && displayValue >= starValue - 0.5 && displayValue < starValue;

      const starClass = [
        'kage-rate-star',
        isFull && 'kage-rate-star-full',
        isHalf && 'kage-rate-star-half',
        (!isFull && !isHalf) && 'kage-rate-star-zero',
      ]
        .filter(Boolean)
        .join(' ');

      // 渲染字符
      const renderCharacter = () => {
        const origin = character;
        if (characterRender) {
          return characterRender(origin, { index: i - 1, value: displayValue });
        }
        return origin;
      };

      result.push(
        <div
          key={i}
          className={starClass}
          onClick={() => handleClick(starValue)}
          onMouseEnter={() => handleMouseEnter(starValue)}
          title={tooltips?.[i - 1]}
        >
          {/* 第一个半星区域 */}
          {allowHalf && (
            <div
              className="kage-rate-star-first"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(starValue - 0.5);
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleMouseEnter(starValue - 0.5);
              }}
            />
          )}
          {/* 第二个半星区域 */}
          {allowHalf && (
            <div
              className="kage-rate-star-second"
              onClick={(e) => {
                e.stopPropagation();
                handleClick(starValue);
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                handleMouseEnter(starValue);
              }}
            />
          )}
          {/* 背景字符 */}
          <div className="kage-rate-star-character">{renderCharacter()}</div>
        </div>,
      );
    }
    return result;
  }, [
    count,
    displayValue,
    allowHalf,
    character,
    characterRender,
    tooltips,
    handleClick,
    handleMouseEnter,
  ]);

  const classNames = [
    'kage-rate',
    disabled && 'kage-rate-disabled',
    readOnly && 'kage-rate-readonly',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style} onMouseLeave={handleMouseLeave}>
      {stars}
      {tooltips && hoverValue !== null && (
        <span className="kage-rate-text">{tooltips[Math.ceil(hoverValue) - 1]}</span>
      )}
    </div>
  );
};

export default Rate;

