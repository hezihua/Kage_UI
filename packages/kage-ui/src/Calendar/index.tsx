import React, { useState, useCallback, useMemo } from 'react';
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

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export type CalendarMode = 'month' | 'year';

// ============ Calendar Props ============
export interface CalendarProps {
  /** 当前选中的日期 */
  value?: Date;
  /** 默认选中的日期 */
  defaultValue?: Date;
  /** 模式 */
  mode?: CalendarMode;
  /** 是否全屏显示 */
  fullscreen?: boolean;
  /** 自定义渲染日期单元格 */
  dateCellRender?: (date: Date) => React.ReactNode;
  /** 自定义渲染日期单元格内容 */
  dateFullCellRender?: (date: Date) => React.ReactNode;
  /** 自定义渲染月单元格 */
  monthCellRender?: (date: Date) => React.ReactNode;
  /** 自定义渲染月单元格内容 */
  monthFullCellRender?: (date: Date) => React.ReactNode;
  /** 不可选择的日期 */
  disabledDate?: (date: Date) => boolean;
  /** 日期选择回调 */
  onSelect?: (date: Date) => void;
  /** 面板变化回调 */
  onPanelChange?: (date: Date, mode: CalendarMode) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Calendar Component ============
export const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue = new Date(),
  mode: controlledMode,
  fullscreen = true,
  dateCellRender,
  dateFullCellRender,
  monthCellRender,
  monthFullCellRender,
  disabledDate,
  onSelect,
  onPanelChange,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<Date>(defaultValue);
  const [internalMode, setInternalMode] = useState<CalendarMode>('month');
  const [viewDate, setViewDate] = useState<Date>(defaultValue);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const mode = controlledMode !== undefined ? controlledMode : internalMode;

  // 切换模式
  const handleModeChange = useCallback((newMode: CalendarMode) => {
    if (controlledMode === undefined) {
      setInternalMode(newMode);
    }
    onPanelChange?.(viewDate, newMode);
  }, [controlledMode, viewDate, onPanelChange]);

  // 选择日期
  const handleSelectDate = useCallback((date: Date) => {
    if (disabledDate?.(date)) return;

    if (controlledValue === undefined) {
      setInternalValue(date);
    }
    setViewDate(date);
    onSelect?.(date);
  }, [controlledValue, disabledDate, onSelect]);

  // 选择月份
  const handleSelectMonth = useCallback((monthIndex: number) => {
    const newDate = new Date(viewDate.getFullYear(), monthIndex, 1);
    setViewDate(newDate);
    handleModeChange('month');
    onPanelChange?.(newDate, 'month');
  }, [viewDate, handleModeChange, onPanelChange]);

  // 切换到上一月/年
  const handlePrev = useCallback(() => {
    if (mode === 'month') {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
      setViewDate(newDate);
      onPanelChange?.(newDate, mode);
    } else {
      const newDate = new Date(viewDate.getFullYear() - 1, viewDate.getMonth(), 1);
      setViewDate(newDate);
      onPanelChange?.(newDate, mode);
    }
  }, [mode, viewDate, onPanelChange]);

  // 切换到下一月/年
  const handleNext = useCallback(() => {
    if (mode === 'month') {
      const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
      setViewDate(newDate);
      onPanelChange?.(newDate, mode);
    } else {
      const newDate = new Date(viewDate.getFullYear() + 1, viewDate.getMonth(), 1);
      setViewDate(newDate);
      onPanelChange?.(newDate, mode);
    }
  }, [mode, viewDate, onPanelChange]);

  // 回到今天
  const handleToday = useCallback(() => {
    const today = new Date();
    setViewDate(today);
    handleSelectDate(today);
  }, [handleSelectDate]);

  // 生成日期网格
  const dateGrid = useMemo(() => {
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
  const monthGrid = useMemo(() => {
    const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    return months.map((name, index) => ({
      name,
      index,
      date: new Date(viewDate.getFullYear(), index, 1),
    }));
  }, [viewDate]);

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const today = new Date();

  const classNames = [
    'kage-calendar',
    fullscreen ? 'kage-calendar-fullscreen' : 'kage-calendar-card',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {/* 头部 */}
      <div className="kage-calendar-header">
        <div className="kage-calendar-header-left">
          <button className="kage-calendar-header-btn" onClick={handlePrev}>‹</button>
          <button className="kage-calendar-header-btn" onClick={handleNext}>›</button>
          <span className="kage-calendar-header-title" onClick={() => handleModeChange('year')}>
            {viewDate.getFullYear()}年
            {mode === 'month' && (
              <span onClick={(e) => { e.stopPropagation(); handleModeChange('month'); }}>
                {viewDate.getMonth() + 1}月
              </span>
            )}
          </span>
        </div>
        <div className="kage-calendar-header-right">
          <button className="kage-calendar-today-btn" onClick={handleToday}>
            今天
          </button>
          <select
            className="kage-calendar-mode-select"
            value={mode}
            onChange={(e) => handleModeChange(e.target.value as CalendarMode)}
          >
            <option value="month">月</option>
            <option value="year">年</option>
          </select>
        </div>
      </div>

      {/* 日历主体 */}
      {mode === 'month' ? (
        <div className="kage-calendar-body">
          {/* 星期标题 */}
          <div className="kage-calendar-weekdays">
            {weekDays.map((day) => (
              <div key={day} className="kage-calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="kage-calendar-dates">
            {dateGrid.map(({ date, isCurrentMonth }, index) => {
              const isSelected = isSameDay(date, value);
              const isToday = isSameDay(date, today);
              const isDisabled = disabledDate?.(date);

              const cellClassNames = [
                'kage-calendar-date',
                !isCurrentMonth && 'kage-calendar-date-other',
                isSelected && 'kage-calendar-date-selected',
                isToday && 'kage-calendar-date-today',
                isDisabled && 'kage-calendar-date-disabled',
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={index}
                  className={cellClassNames}
                  onClick={() => !isDisabled && handleSelectDate(date)}
                >
                  {dateFullCellRender ? (
                    dateFullCellRender(date)
                  ) : (
                    <>
                      <div className="kage-calendar-date-value">{date.getDate()}</div>
                      {dateCellRender && (
                        <div className="kage-calendar-date-content">
                          {dateCellRender(date)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="kage-calendar-months">
          {monthGrid.map(({ name, index, date }) => {
            const isSelected = isSameMonth(date, value);
            const isCurrentMonth = isSameMonth(date, today);

            const cellClassNames = [
              'kage-calendar-month',
              isSelected && 'kage-calendar-month-selected',
              isCurrentMonth && 'kage-calendar-month-current',
            ].filter(Boolean).join(' ');

            return (
              <div
                key={index}
                className={cellClassNames}
                onClick={() => handleSelectMonth(index)}
              >
                {monthFullCellRender ? (
                  monthFullCellRender(date)
                ) : (
                  <>
                    <div className="kage-calendar-month-value">{name}</div>
                    {monthCellRender && (
                      <div className="kage-calendar-month-content">
                        {monthCellRender(date)}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Calendar;

