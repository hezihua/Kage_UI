import React, { useState, useCallback, useRef, useMemo } from 'react';
import './style.less';

export type SliderValue = number | [number, number];

export interface SliderProps {
  /** 当前值 */
  value?: SliderValue;
  /** 默认值 */
  defaultValue?: SliderValue;
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长 */
  step?: number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为范围选择 */
  range?: boolean;
  /** 是否显示刻度 */
  dots?: boolean;
  /** 是否垂直布局 */
  vertical?: boolean;
  /** 刻度标记 */
  marks?: Record<number, React.ReactNode>;
  /** 是否包含 min、max */
  included?: boolean;
  /** 是否反向 */
  reverse?: boolean;
  /** 工具提示的格式化函数 */
  tipFormatter?: ((value: number) => React.ReactNode) | null;
  /** 值变化回调 */
  onChange?: (value: SliderValue) => void;
  /** 拖动开始回调 */
  onAfterChange?: (value: SliderValue) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Slider: React.FC<SliderProps> = ({
  value: controlledValue,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  range = false,
  dots = false,
  vertical = false,
  marks,
  included = true,
  reverse = false,
  tipFormatter = (val) => val.toString(),
  onChange,
  onAfterChange,
  className = '',
  style,
}) => {
  const getInitialValue = (): SliderValue => {
    if (defaultValue !== undefined) return defaultValue;
    if (range) return [min, min];
    return min;
  };

  const [internalValue, setInternalValue] = useState<SliderValue>(getInitialValue());
  const [dragging, setDragging] = useState<number | null>(null);
  const [hovering, setHovering] = useState<number | null>(null);

  const railRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // 标准化值到步长
  const normalizeValue = useCallback(
    (val: number): number => {
      let normalized = Math.round((val - min) / step) * step + min;
      normalized = Math.max(min, Math.min(max, normalized));
      return normalized;
    },
    [min, max, step],
  );

  // 获取百分比
  const getPercent = useCallback(
    (val: number): number => {
      return ((val - min) / (max - min)) * 100;
    },
    [min, max],
  );

  // 从百分比获取值
  const getValueFromPercent = useCallback(
    (percent: number): number => {
      let val = (percent / 100) * (max - min) + min;
      return normalizeValue(val);
    },
    [min, max, normalizeValue],
  );

  // 从鼠标位置获取百分比
  const getPercentFromEvent = useCallback(
    (e: React.MouseEvent | MouseEvent): number => {
      if (!railRef.current) return 0;

      const rect = railRef.current.getBoundingClientRect();
      let percent: number;

      if (vertical) {
        const y = e.clientY - rect.top;
        percent = ((rect.height - y) / rect.height) * 100;
      } else {
        const x = e.clientX - rect.left;
        percent = (x / rect.width) * 100;
      }

      if (reverse) {
        percent = 100 - percent;
      }

      return Math.max(0, Math.min(100, percent));
    },
    [vertical, reverse],
  );

  // 更新值
  const updateValue = useCallback(
    (newValue: SliderValue, triggerChange = true) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (triggerChange) {
        onChange?.(newValue);
      }
    },
    [controlledValue, onChange],
  );

  // 处理点击轨道
  const handleRailClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      const percent = getPercentFromEvent(e);
      const newVal = getValueFromPercent(percent);

      if (range) {
        const [start, end] = value as [number, number];
        const distToStart = Math.abs(newVal - start);
        const distToEnd = Math.abs(newVal - end);

        let newValue: [number, number];
        if (distToStart < distToEnd) {
          newValue = [newVal, end];
        } else {
          newValue = [start, newVal];
        }
        newValue.sort((a, b) => a - b);
        updateValue(newValue);
      } else {
        updateValue(newVal);
      }
    },
    [disabled, range, value, getPercentFromEvent, getValueFromPercent, updateValue],
  );

  // 开始拖动
  const handleMouseDown = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(index);
    },
    [disabled],
  );

  // 拖动中
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging === null || disabled) return;

      const percent = getPercentFromEvent(e);
      const newVal = getValueFromPercent(percent);

      if (range) {
        const [start, end] = value as [number, number];
        let newValue: [number, number];

        if (dragging === 0) {
          newValue = [Math.min(newVal, end), end];
        } else {
          newValue = [start, Math.max(newVal, start)];
        }

        updateValue(newValue, true);
      } else {
        updateValue(newVal, true);
      }
    },
    [dragging, disabled, range, value, getPercentFromEvent, getValueFromPercent, updateValue],
  );

  // 结束拖动
  const handleMouseUp = useCallback(() => {
    if (dragging !== null) {
      setDragging(null);
      onAfterChange?.(value);
    }
  }, [dragging, value, onAfterChange]);

  // 绑定全局事件
  React.useEffect(() => {
    if (dragging !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  // 生成刻度点
  const dotsList = useMemo(() => {
    if (!dots && !marks) return [];

    const points: number[] = [];
    const totalSteps = (max - min) / step;

    for (let i = 0; i <= totalSteps; i++) {
      const val = min + i * step;
      points.push(val);
    }

    if (marks) {
      Object.keys(marks).forEach((key) => {
        const val = Number(key);
        if (val >= min && val <= max && !points.includes(val)) {
          points.push(val);
        }
      });
    }

    return points.sort((a, b) => a - b);
  }, [dots, marks, min, max, step]);

  // 渲染句柄
  const renderHandle = (val: number, index: number) => {
    const percent = getPercent(val);
    const isActive = dragging === index || hovering === index;

    const handleStyle: React.CSSProperties = vertical
      ? { bottom: `${percent}%` }
      : { left: `${percent}%` };

    return (
      <div
        key={index}
        className={`kage-slider-handle ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
        style={handleStyle}
        onMouseDown={handleMouseDown(index)}
        onMouseEnter={() => setHovering(index)}
        onMouseLeave={() => setHovering(null)}
      >
        {tipFormatter && isActive && (
          <div className="kage-slider-tooltip">{tipFormatter(val)}</div>
        )}
      </div>
    );
  };

  // 渲染轨道
  const renderTrack = () => {
    if (!included) return null;

    let startPercent: number;
    let endPercent: number;

    if (range) {
      const [start, end] = value as [number, number];
      startPercent = getPercent(start);
      endPercent = getPercent(end);
    } else {
      startPercent = 0;
      endPercent = getPercent(value as number);
    }

    const trackStyle: React.CSSProperties = vertical
      ? { bottom: `${startPercent}%`, height: `${endPercent - startPercent}%` }
      : { left: `${startPercent}%`, width: `${endPercent - startPercent}%` };

    return <div className="kage-slider-track" style={trackStyle} />;
  };

  const classNames = [
    'kage-slider',
    disabled && 'kage-slider-disabled',
    vertical && 'kage-slider-vertical',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <div ref={railRef} className="kage-slider-rail" onClick={handleRailClick}>
        {renderTrack()}

        {/* 刻度点 */}
        {dotsList.map((val) => {
          const percent = getPercent(val);
          const dotStyle: React.CSSProperties = vertical
            ? { bottom: `${percent}%` }
            : { left: `${percent}%` };

          return (
            <div key={val} className="kage-slider-dot" style={dotStyle} />
          );
        })}

        {/* 句柄 */}
        {range
          ? (value as [number, number]).map((val, idx) => renderHandle(val, idx))
          : renderHandle(value as number, 0)}
      </div>

      {/* 刻度标记 */}
      {marks && (
        <div className="kage-slider-marks">
          {Object.entries(marks).map(([key, mark]) => {
            const val = Number(key);
            if (val < min || val > max) return null;

            const percent = getPercent(val);
            const markStyle: React.CSSProperties = vertical
              ? { bottom: `${percent}%` }
              : { left: `${percent}%` };

            // 处理 mark 可能是对象的情况
            const isMarkObject = typeof mark === 'object' && mark !== null && 'label' in mark;
            const label = isMarkObject ? (mark as any).label : mark;
            const customStyle = isMarkObject ? (mark as any).style : undefined;

            return (
              <div key={key} className="kage-slider-mark" style={markStyle}>
                <span className="kage-slider-mark-text" style={customStyle}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;

