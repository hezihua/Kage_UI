import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Progress 类型 */
export type ProgressType = 'line' | 'circle' | 'dashboard';

/** Progress 状态 */
export type ProgressStatus = 'success' | 'exception' | 'active' | 'normal';

/** Progress 属性 */
export interface ProgressProps {
  /** 进度百分比，范围 0-100 */
  percent?: number;
  /** 是否显示进度数值或状态图标 */
  showInfo?: boolean;
  /** 进度条状态 */
  status?: ProgressStatus;
  /** 进度条类型 */
  type?: ProgressType;
  /** 进度条尺寸（仅对 circle 和 dashboard 类型有效） */
  size?: number | 'default' | 'small';
  /** 进度条颜色 */
  strokeColor?: string | { from: string; to: string };
  /** 未完成部分的颜色 */
  trailColor?: string;
  /** 进度条宽度（仅对 line 类型有效） */
  strokeWidth?: number;
  /** 自定义格式函数 */
  format?: (percent?: number) => ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 是否显示步骤进度 */
  steps?: number;
  /** 步骤进度条中成功的步数 */
  success?: { percent: number; strokeColor?: string };
}

// ============ Progress 组件 ============
export const Progress: React.FC<ProgressProps> = ({
  percent = 0,
  showInfo = true,
  status = 'normal',
  type = 'line',
  size = 'default',
  strokeColor,
  trailColor,
  strokeWidth,
  format,
  className = '',
  style,
  steps,
  success,
}) => {
  // 计算实际百分比
  const validPercent = Math.min(Math.max(percent, 0), 100);
  const successPercent = success ? Math.min(Math.max(success.percent, 0), 100) : 0;

  // 格式化显示内容
  const renderInfo = () => {
    if (!showInfo) return null;

    if (format) {
      return <span className="kage-progress-text">{format(validPercent)}</span>;
    }

    if (status === 'success') {
      return <span className="kage-progress-text">✓</span>;
    }

    if (status === 'exception') {
      return <span className="kage-progress-text">✕</span>;
    }

    return <span className="kage-progress-text">{validPercent}%</span>;
  };

  // 获取状态颜色
  const getStatusColor = (): string => {
    if (strokeColor) {
      if (typeof strokeColor === 'string') {
        return strokeColor;
      }
      // 渐变颜色，返回第一个颜色
      return strokeColor.from;
    }

    switch (status) {
      case 'success':
        return '#52c41a';
      case 'exception':
        return '#ff4d4f';
      default:
        return '#1890ff';
    }
  };

  // 线形进度条
  const renderLine = () => {
    const sizeMap = {
      default: 8,
      small: 6,
    };
    const width = strokeWidth || sizeMap[size as keyof typeof sizeMap] || 8;

    // 步骤进度条
    if (steps) {
      const stepWidth = 100 / steps;
      return (
        <div className="kage-progress-steps">
          {Array.from({ length: steps }).map((_, index) => {
            const stepPercent = ((index + 1) * stepWidth) / 100;
            const isActive = validPercent >= stepPercent * 100;
            const isSuccess = successPercent >= stepPercent * 100;

            return (
              <div
                key={index}
                className={`kage-progress-step ${
                  isSuccess
                    ? 'kage-progress-step-success'
                    : isActive
                    ? 'kage-progress-step-active'
                    : ''
                }`}
                style={{
                  width: `${stepWidth}%`,
                  backgroundColor: isSuccess
                    ? success?.strokeColor || '#52c41a'
                    : isActive
                    ? getStatusColor()
                    : trailColor || '#f0f0f0',
                }}
              />
            );
          })}
        </div>
      );
    }

    // 普通线形进度条
    return (
      <div className="kage-progress-outer" style={{ height: width }}>
        <div
          className="kage-progress-inner"
          style={{
            backgroundColor: trailColor || '#f0f0f0',
          }}
        >
          <div
            className={`kage-progress-bg ${
              status === 'active' ? 'kage-progress-bg-active' : ''
            }`}
            style={{
              width: `${validPercent}%`,
              backgroundColor: getStatusColor(),
            }}
          />
          {success && success.percent > 0 && (
            <div
              className="kage-progress-success-bg"
              style={{
                width: `${success.percent}%`,
                backgroundColor: success.strokeColor || '#52c41a',
              }}
            />
          )}
        </div>
      </div>
    );
  };

  // 圆形进度条
  const renderCircle = () => {
    const sizeMap = {
      default: 120,
      small: 80,
    };
    const circleSize = typeof size === 'number' ? size : sizeMap[size] || 120;
    const strokeWidthValue = strokeWidth || 6;
    const radius = (circleSize - strokeWidthValue) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (validPercent / 100) * circumference;

    const isDashboard = type === 'dashboard';
    const dashArray = isDashboard ? circumference * 0.75 : circumference;
    const dashOffset = isDashboard
      ? circumference * 0.75 - (validPercent / 100) * circumference * 0.75
      : offset;

    return (
      <div className="kage-progress-circle" style={{ width: circleSize, height: circleSize }}>
        <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
          <circle
            className="kage-progress-circle-trail"
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={trailColor || '#f0f0f0'}
            strokeWidth={strokeWidthValue}
            strokeDasharray={isDashboard ? `${dashArray} ${circumference}` : undefined}
            transform={isDashboard ? `rotate(-90 ${circleSize / 2} ${circleSize / 2})` : undefined}
          />
          <circle
            className="kage-progress-circle-path"
            cx={circleSize / 2}
            cy={circleSize / 2}
            r={radius}
            fill="none"
            stroke={getStatusColor()}
            strokeWidth={strokeWidthValue}
            strokeLinecap="round"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            transform={isDashboard ? `rotate(-90 ${circleSize / 2} ${circleSize / 2})` : `rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
          />
        </svg>
        {showInfo && (
          <div className="kage-progress-circle-text">{renderInfo()}</div>
        )}
      </div>
    );
  };

  const classNames = [
    'kage-progress',
    `kage-progress-${type}`,
    `kage-progress-status-${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {type === 'line' ? (
        <>
          {renderLine()}
          {showInfo && <div className="kage-progress-text">{renderInfo()}</div>}
        </>
      ) : (
        renderCircle()
      )}
    </div>
  );
};

export default Progress;

