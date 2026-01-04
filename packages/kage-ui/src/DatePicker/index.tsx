import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.less';

// ============ 日期工具函数 ============
const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day);
};

const parseDate = (dateStr: string): Date | null => {
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? null : date;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

// ============ DatePicker Props ============
export interface DatePickerProps {
  /** 当前值 */
  value?: Date | string;
  /** 默认值 */
  defaultValue?: Date | string;
  /** 占位符 */
  placeholder?: string;
  /** 日期格式 */
  format?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 禁用日期函数 */
  disabledDate?: (date: Date) => boolean;
  /** 值变化回调 */
  onChange?: (date: Date | null, dateString: string) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ DatePicker Component ============
export const DatePicker: React.FC<DatePickerProps> = ({
  value: controlledValue,
  defaultValue,
  placeholder = '请选择日期',
  format = 'YYYY-MM-DD',
  disabled = false,
  allowClear = true,
  size = 'middle',
  status,
  disabledDate,
  onChange,
  onOpenChange,
  className = '',
  style,
}) => {
  // 解析初始值
  const parseInitialValue = (val?: Date | string): Date | null => {
    if (!val) return null;
    if (val instanceof Date) return val;
    return parseDate(val);
  };

  const [internalValue, setInternalValue] = useState<Date | null>(parseInitialValue(defaultValue));
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'date' | 'month' | 'year'>('date');
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? parseInitialValue(controlledValue) : internalValue;

  // 同步 viewDate
  useEffect(() => {
    if (value) {
      setViewDate(new Date(value));
    }
  }, [value]);

  // 打开/关闭面板
  const setOpen = useCallback((open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    onOpenChange?.(open);
    if (open) {
      setViewMode('date');
      if (value) {
        setViewDate(new Date(value));
      } else {
        setViewDate(new Date());
      }
    }
  }, [disabled, value, onOpenChange]);

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

  // 选择日期
  const handleSelectDate = useCallback((date: Date) => {
    if (disabledDate?.(date)) return;

    if (controlledValue === undefined) {
      setInternalValue(date);
    }
    onChange?.(date, formatDate(date, format));
    setOpen(false);
  }, [controlledValue, format, disabledDate, onChange, setOpen]);

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (controlledValue === undefined) {
      setInternalValue(null);
    }
    onChange?.(null, '');
  }, [controlledValue, onChange]);

  // 切换月份
  const handlePrevMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const handleNextMonth = useCallback(() => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  // 切换年份
  const handlePrevYear = useCallback(() => {
    if (viewMode === 'year') {
      setViewDate((prev) => new Date(prev.getFullYear() - 12, prev.getMonth(), 1));
    } else {
      setViewDate((prev) => new Date(prev.getFullYear() - 1, prev.getMonth(), 1));
    }
  }, [viewMode]);

  const handleNextYear = useCallback(() => {
    if (viewMode === 'year') {
      setViewDate((prev) => new Date(prev.getFullYear() + 12, prev.getMonth(), 1));
    } else {
      setViewDate((prev) => new Date(prev.getFullYear() + 1, prev.getMonth(), 1));
    }
  }, [viewMode]);

  // 选择月份
  const handleSelectMonth = useCallback((month: number) => {
    setViewDate((prev) => new Date(prev.getFullYear(), month, 1));
    setViewMode('date');
  }, []);

  // 选择年份
  const handleSelectYear = useCallback((year: number) => {
    setViewDate((prev) => new Date(year, prev.getMonth(), 1));
    setViewMode('month');
  }, []);

  // 选择今天
  const handleToday = useCallback(() => {
    const today = new Date();
    handleSelectDate(today);
  }, [handleSelectDate]);

  // 生成日期网格
  const generateDateGrid = useCallback(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const prevMonthDays = getDaysInMonth(year, month - 1);

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // 上个月的天数
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // 当前月的天数
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 下个月的天数
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  }, [viewDate]);

  // 生成月份网格
  const generateMonthGrid = useCallback(() => {
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return months.map((name, index) => ({ name, index }));
  }, []);

  // 生成年份网格
  const generateYearGrid = useCallback(() => {
    const currentYear = viewDate.getFullYear();
    const startYear = Math.floor(currentYear / 12) * 12;
    const years: number[] = [];
    for (let i = 0; i < 12; i++) {
      years.push(startYear + i);
    }
    return years;
  }, [viewDate]);

  const classNames = [
    'kage-datepicker',
    `kage-datepicker-${size}`,
    disabled && 'kage-datepicker-disabled',
    status && `kage-datepicker-status-${status}`,
    isOpen && 'kage-datepicker-open',
    className,
  ].filter(Boolean).join(' ');

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const today = new Date();

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {/* 输入框 */}
      <div className="kage-datepicker-input" onClick={() => setOpen(!isOpen)}>
        <span className={`kage-datepicker-value ${!value ? 'kage-datepicker-placeholder' : ''}`}>
          {value ? formatDate(value, format) : placeholder}
        </span>
        
        {allowClear && value && !disabled && (
          <span className="kage-datepicker-clear" onClick={handleClear}>×</span>
        )}
        
        <span className="kage-datepicker-icon">📅</span>
      </div>

      {/* 面板 */}
      {isOpen && (
        <div className="kage-datepicker-panel">
          {/* 头部 */}
          <div className="kage-datepicker-header">
            <button className="kage-datepicker-header-btn" onClick={handlePrevYear}>«</button>
            {viewMode === 'date' && (
              <button className="kage-datepicker-header-btn" onClick={handlePrevMonth}>‹</button>
            )}
            
            <div className="kage-datepicker-header-title">
              <span onClick={() => setViewMode('year')}>
                {viewMode === 'year'
                  ? `${generateYearGrid()[0]} - ${generateYearGrid()[11]}`
                  : viewDate.getFullYear()}年
              </span>
              {viewMode === 'date' && (
                <span onClick={() => setViewMode('month')}>
                  {viewDate.getMonth() + 1}月
                </span>
              )}
            </div>
            
            {viewMode === 'date' && (
              <button className="kage-datepicker-header-btn" onClick={handleNextMonth}>›</button>
            )}
            <button className="kage-datepicker-header-btn" onClick={handleNextYear}>»</button>
          </div>

          {/* 日期视图 */}
          {viewMode === 'date' && (
            <div className="kage-datepicker-body">
              <div className="kage-datepicker-weekdays">
                {weekDays.map((day) => (
                  <span key={day} className="kage-datepicker-weekday">{day}</span>
                ))}
              </div>
              <div className="kage-datepicker-dates">
                {generateDateGrid().map(({ date, isCurrentMonth }, index) => {
                  const isSelected = value && isSameDay(date, value);
                  const isToday = isSameDay(date, today);
                  const isDisabled = disabledDate?.(date);

                  const dayClassNames = [
                    'kage-datepicker-date',
                    !isCurrentMonth && 'kage-datepicker-date-other',
                    isSelected && 'kage-datepicker-date-selected',
                    isToday && 'kage-datepicker-date-today',
                    isDisabled && 'kage-datepicker-date-disabled',
                  ].filter(Boolean).join(' ');

                  return (
                    <span
                      key={index}
                      className={dayClassNames}
                      onClick={() => !isDisabled && handleSelectDate(date)}
                    >
                      {date.getDate()}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* 月份视图 */}
          {viewMode === 'month' && (
            <div className="kage-datepicker-months">
              {generateMonthGrid().map(({ name, index }) => (
                <span
                  key={index}
                  className={`kage-datepicker-month ${viewDate.getMonth() === index ? 'kage-datepicker-month-selected' : ''}`}
                  onClick={() => handleSelectMonth(index)}
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          {/* 年份视图 */}
          {viewMode === 'year' && (
            <div className="kage-datepicker-years">
              {generateYearGrid().map((year) => (
                <span
                  key={year}
                  className={`kage-datepicker-year ${viewDate.getFullYear() === year ? 'kage-datepicker-year-selected' : ''}`}
                  onClick={() => handleSelectYear(year)}
                >
                  {year}
                </span>
              ))}
            </div>
          )}

          {/* 底部 */}
          <div className="kage-datepicker-footer">
            <button className="kage-datepicker-today" onClick={handleToday}>
              今天
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

