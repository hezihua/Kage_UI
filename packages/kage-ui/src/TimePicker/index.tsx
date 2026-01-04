import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './style.less';

// ============ 时间工具函数 ============
const formatTime = (hour: number, minute: number, second: number, format: string): string => {
  const h12 = hour % 12 || 12;
  const period = hour < 12 ? 'AM' : 'PM';

  return format
    .replace('HH', String(hour).padStart(2, '0'))
    .replace('H', String(hour))
    .replace('hh', String(h12).padStart(2, '0'))
    .replace('h', String(h12))
    .replace('mm', String(minute).padStart(2, '0'))
    .replace('m', String(minute))
    .replace('ss', String(second).padStart(2, '0'))
    .replace('s', String(second))
    .replace('A', period)
    .replace('a', period.toLowerCase());
};

const parseTime = (timeStr: string, format: string): { hour: number; minute: number; second: number } | null => {
  if (!timeStr) return null;

  const is12Hour = format.includes('h');
  const hasSecond = format.includes('s');
  const parts = timeStr.split(':');

  if (parts.length < 2) return null;

  let hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  let second = hasSecond && parts.length > 2 ? parseInt(parts[2], 10) : 0;

  // 处理 12 小时制
  if (is12Hour) {
    const isPM = timeStr.toLowerCase().includes('pm');
    if (isPM && hour < 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;
  }

  if (isNaN(hour) || isNaN(minute) || isNaN(second)) return null;
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59 || second < 0 || second > 59) return null;

  return { hour, minute, second };
};

export interface TimeValue {
  hour: number;
  minute: number;
  second: number;
}

// ============ TimePicker Props ============
export interface TimePickerProps {
  /** 当前值 */
  value?: string | TimeValue;
  /** 默认值 */
  defaultValue?: string | TimeValue;
  /** 占位符 */
  placeholder?: string;
  /** 时间格式 */
  format?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 小时步长 */
  hourStep?: number;
  /** 分钟步长 */
  minuteStep?: number;
  /** 秒步长 */
  secondStep?: number;
  /** 禁用小时 */
  disabledHours?: () => number[];
  /** 禁用分钟 */
  disabledMinutes?: (hour: number) => number[];
  /** 禁用秒 */
  disabledSeconds?: (hour: number, minute: number) => number[];
  /** 隐藏禁用选项 */
  hideDisabledOptions?: boolean;
  /** 使用 12 小时制 */
  use12Hours?: boolean;
  /** 值变化回调 */
  onChange?: (time: TimeValue | null, timeString: string) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ TimePicker Component ============
export const TimePicker: React.FC<TimePickerProps> = ({
  value: controlledValue,
  defaultValue,
  placeholder = '请选择时间',
  format = 'HH:mm:ss',
  disabled = false,
  allowClear = true,
  size = 'middle',
  status,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  hideDisabledOptions = false,
  use12Hours = false,
  onChange,
  onOpenChange,
  className = '',
  style,
}) => {
  const showSecond = format.includes('s');
  const actualFormat = use12Hours && !format.includes('h') ? format.replace('HH', 'hh') + ' A' : format;

  // 解析初始值
  const parseInitialValue = (val?: string | TimeValue): TimeValue | null => {
    if (!val) return null;
    if (typeof val === 'object') return val;
    return parseTime(val, actualFormat);
  };

  const [internalValue, setInternalValue] = useState<TimeValue | null>(parseInitialValue(defaultValue));
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? parseInitialValue(controlledValue) : internalValue;

  // 打开/关闭面板
  const setOpen = useCallback((open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    onOpenChange?.(open);
  }, [disabled, onOpenChange]);

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

  // 滚动到选中项
  useEffect(() => {
    if (isOpen && value) {
      setTimeout(() => {
        const scrollToValue = (ref: React.RefObject<HTMLDivElement>, targetValue: number) => {
          if (ref.current) {
            const item = ref.current.querySelector(`[data-value="${targetValue}"]`) as HTMLElement;
            if (item) {
              ref.current.scrollTop = item.offsetTop - ref.current.offsetHeight / 2 + item.offsetHeight / 2;
            }
          }
        };

        scrollToValue(hourRef, value.hour);
        scrollToValue(minuteRef, value.minute);
        if (showSecond) {
          scrollToValue(secondRef, value.second);
        }
      }, 0);
    }
  }, [isOpen, value, showSecond]);

  // 生成选项列表
  const generateOptions = useCallback((
    max: number,
    step: number,
    disabledFn?: (() => number[]) | ((h: number) => number[]) | ((h: number, m: number) => number[]),
    currentHour?: number,
    currentMinute?: number,
  ): number[] => {
    const options: number[] = [];
    for (let i = 0; i < max; i += step) {
      let isDisabled = false;
      
      if (disabledFn) {
        if (typeof disabledFn === 'function') {
          let disabled: number[] = [];
          if (disabledFn.length === 0) {
            disabled = (disabledFn as () => number[])();
          } else if (disabledFn.length === 1) {
            disabled = (disabledFn as (h: number) => number[])(currentHour!);
          } else {
            disabled = (disabledFn as (h: number, m: number) => number[])(currentHour!, currentMinute!);
          }
          isDisabled = Array.isArray(disabled) && disabled.includes(i);
        }
      }

      if (!hideDisabledOptions || !isDisabled) {
        options.push(i);
      }
    }
    return options;
  }, [hideDisabledOptions]);

  // 小时选项
  const hourOptions = useMemo(() => {
    const max = use12Hours ? 12 : 24;
    const options = generateOptions(max, hourStep);
    if (use12Hours && !options.includes(12)) {
      options.push(12);
    }
    
    if (disabledHours) {
      const disabled = disabledHours();
      return options.filter(h => !disabled.includes(h));
    }
    
    return options;
  }, [use12Hours, hourStep, disabledHours, generateOptions]);

  // 分钟选项
  const minuteOptions = useMemo(() => {
    const options = generateOptions(60, minuteStep);
    
    if (disabledMinutes && value) {
      const disabled = disabledMinutes(value.hour);
      return options.filter(m => !disabled.includes(m));
    }
    
    return options;
  }, [minuteStep, disabledMinutes, value, generateOptions]);

  // 秒选项
  const secondOptions = useMemo(() => {
    const options = generateOptions(60, secondStep);
    
    if (disabledSeconds && value) {
      const disabled = disabledSeconds(value.hour, value.minute);
      return options.filter(s => !disabled.includes(s));
    }
    
    return options;
  }, [secondStep, disabledSeconds, value, generateOptions]);

  // 选择时间
  const handleSelectTime = useCallback((type: 'hour' | 'minute' | 'second', val: number) => {
    const newValue: TimeValue = {
      hour: value?.hour ?? 0,
      minute: value?.minute ?? 0,
      second: value?.second ?? 0,
      [type]: val,
    };

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    const timeString = formatTime(newValue.hour, newValue.minute, newValue.second, actualFormat);
    onChange?.(newValue, timeString);
  }, [value, controlledValue, actualFormat, onChange]);

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue(null);
    }
    onChange?.(null, '');
  }, [controlledValue, onChange]);

  // 当前时间
  const handleNow = useCallback(() => {
    const now = new Date();
    const newValue: TimeValue = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
    };

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    const timeString = formatTime(newValue.hour, newValue.minute, newValue.second, actualFormat);
    onChange?.(newValue, timeString);
    setOpen(false);
  }, [controlledValue, actualFormat, onChange, setOpen]);

  const classNames = [
    'kage-timepicker',
    `kage-timepicker-${size}`,
    disabled && 'kage-timepicker-disabled',
    status && `kage-timepicker-status-${status}`,
    isOpen && 'kage-timepicker-open',
    className,
  ].filter(Boolean).join(' ');

  const displayValue = value
    ? formatTime(value.hour, value.minute, value.second, actualFormat)
    : '';

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {/* 输入框 */}
      <div className="kage-timepicker-input" onClick={() => setOpen(!isOpen)}>
        <span className={`kage-timepicker-value ${!value ? 'kage-timepicker-placeholder' : ''}`}>
          {value ? displayValue : placeholder}
        </span>
        
        {allowClear && value && !disabled && (
          <span className="kage-timepicker-clear" onClick={handleClear}>×</span>
        )}
        
        <span className="kage-timepicker-icon">🕐</span>
      </div>

      {/* 面板 */}
      {isOpen && (
        <div className="kage-timepicker-panel">
          <div className="kage-timepicker-panel-inner">
            {/* 小时列 */}
            <div className="kage-timepicker-column" ref={hourRef}>
              {hourOptions.map((hour) => (
                <div
                  key={hour}
                  data-value={hour}
                  className={`kage-timepicker-cell ${value?.hour === hour ? 'kage-timepicker-cell-selected' : ''}`}
                  onClick={() => handleSelectTime('hour', hour)}
                >
                  {String(hour).padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* 分钟列 */}
            <div className="kage-timepicker-column" ref={minuteRef}>
              {minuteOptions.map((minute) => (
                <div
                  key={minute}
                  data-value={minute}
                  className={`kage-timepicker-cell ${value?.minute === minute ? 'kage-timepicker-cell-selected' : ''}`}
                  onClick={() => handleSelectTime('minute', minute)}
                >
                  {String(minute).padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* 秒列 */}
            {showSecond && (
              <div className="kage-timepicker-column" ref={secondRef}>
                {secondOptions.map((second) => (
                  <div
                    key={second}
                    data-value={second}
                    className={`kage-timepicker-cell ${value?.second === second ? 'kage-timepicker-cell-selected' : ''}`}
                    onClick={() => handleSelectTime('second', second)}
                  >
                    {String(second).padStart(2, '0')}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 底部 */}
          <div className="kage-timepicker-footer">
            <button className="kage-timepicker-now" onClick={handleNow}>
              此刻
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;

