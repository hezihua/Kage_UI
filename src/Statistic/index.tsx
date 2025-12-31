import React from 'react';
import './style.less';

export interface StatisticProps {
  /** 数值内容 */
  value?: string | number;
  /** 标题 */
  title?: React.ReactNode;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 数值精度 */
  precision?: number;
  /** 设置数值的前缀 */
  valueStyle?: React.CSSProperties;
  /** 数值渲染函数 */
  formatter?: (value: string | number | undefined) => React.ReactNode;
  /** 是否加载中 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const formatValue = (
  value: string | number | undefined,
  precision?: number
): string => {
  if (value === undefined || value === null) {
    return '-';
  }

  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  
  if (isNaN(numValue)) {
    return String(value);
  }

  if (precision !== undefined) {
    return numValue.toFixed(precision);
  }

  return String(value);
};

export const Statistic: React.FC<StatisticProps> = ({
  value,
  title,
  prefix,
  suffix,
  precision,
  valueStyle,
  formatter,
  loading = false,
  className,
  style,
}) => {
  const prefixCls = 'kage-statistic';

  const renderValue = () => {
    if (loading) {
      return (
        <div className={`${prefixCls}-skeleton`}>
          <div className={`${prefixCls}-skeleton-line`}></div>
        </div>
      );
    }

    const formattedValue = formatter
      ? formatter(value)
      : formatValue(value, precision);

    return (
      <div className={`${prefixCls}-content`}>
        {prefix && (
          <span className={`${prefixCls}-content-prefix`}>{prefix}</span>
        )}
        <span className={`${prefixCls}-content-value`} style={valueStyle}>
          {formattedValue}
        </span>
        {suffix && (
          <span className={`${prefixCls}-content-suffix`}>{suffix}</span>
        )}
      </div>
    );
  };

  return (
    <div className={`${prefixCls} ${className || ''}`} style={style}>
      {title && <div className={`${prefixCls}-title`}>{title}</div>}
      {renderValue()}
    </div>
  );
};

export default Statistic;

