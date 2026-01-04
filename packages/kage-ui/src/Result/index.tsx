import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Result 状态类型 */
export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

/** Result 属性 */
export interface ResultProps {
  /** 结果状态 */
  status?: ResultStatus;
  /** 标题 */
  title?: ReactNode;
  /** 副标题 */
  subTitle?: ReactNode;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 操作区 */
  extra?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ============ 默认图标 ============
const defaultIcons: Record<ResultStatus, ReactNode> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
  404: '404',
  403: '403',
  500: '500',
};

// ============ Result 组件 ============
export const Result: React.FC<ResultProps> = ({
  status = 'info',
  title,
  subTitle,
  icon,
  extra,
  className = '',
  style,
  children,
}) => {
  const iconNode = icon !== undefined ? icon : defaultIcons[status];

  const classNames = [
    'kage-result',
    `kage-result-${status}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <div className="kage-result-icon">
        {iconNode}
      </div>
      {title && <div className="kage-result-title">{title}</div>}
      {subTitle && <div className="kage-result-subtitle">{subTitle}</div>}
      {children && <div className="kage-result-content">{children}</div>}
      {extra && <div className="kage-result-extra">{extra}</div>}
    </div>
  );
};

export default Result;

