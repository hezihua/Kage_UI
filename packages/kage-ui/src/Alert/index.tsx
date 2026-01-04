import React, { useState, ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Alert 类型 */
export type AlertType = 'success' | 'info' | 'warning' | 'error';

/** Alert 属性 */
export interface AlertProps {
  /** 警告提示内容 */
  message?: ReactNode;
  /** 警告提示的辅助性文字介绍 */
  description?: ReactNode;
  /** 指定警告的样式类型 */
  type?: AlertType;
  /** 是否显示辅助图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: ReactNode;
  /** 自定义关闭按钮 */
  closeIcon?: ReactNode;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 关闭时触发的回调函数 */
  onClose?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 关闭动画结束后触发的回调函数 */
  afterClose?: () => void;
  /** 自定义操作项 */
  action?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 是否用图标和标题换行 */
  banner?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

// ============ 默认图标 ============
const defaultIcons: Record<AlertType, ReactNode> = {
  success: '✓',
  info: 'ℹ',
  warning: '⚠',
  error: '✕',
};

// ============ Alert 组件 ============
export const Alert: React.FC<AlertProps> = ({
  message,
  description,
  type = 'info',
  showIcon = false,
  icon,
  closeIcon,
  closable = false,
  onClose,
  afterClose,
  action,
  className = '',
  style,
  banner = false,
  children,
}) => {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  // 处理关闭
  const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClose?.(e);
    if (!e.defaultPrevented) {
      setClosing(true);
      setTimeout(() => {
        setVisible(false);
        afterClose?.();
      }, 300); // 等待动画完成
    }
  };

  if (!visible) {
    return null;
  }

  const classNames = [
    'kage-alert',
    `kage-alert-${type}`,
    showIcon && 'kage-alert-with-icon',
    closable && 'kage-alert-closable',
    banner && 'kage-alert-banner',
    closing && 'kage-alert-closing',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 渲染图标
  const renderIcon = () => {
    if (!showIcon && !icon) return null;
    const iconNode = icon || defaultIcons[type];
    return <span className="kage-alert-icon">{iconNode}</span>;
  };

  // 渲染关闭按钮
  const renderCloseIcon = () => {
    if (!closable) return null;
    return (
      <button
        type="button"
        className="kage-alert-close-icon"
        onClick={handleClose}
        aria-label="关闭"
      >
        {closeIcon || '×'}
      </button>
    );
  };

  // 渲染操作按钮
  const renderAction = () => {
    if (!action) return null;
    return <div className="kage-alert-action">{action}</div>;
  };

  // 使用 children 或 message
  const content = children || message;

  return (
    <div className={classNames} style={style} role="alert">
      {renderIcon()}
      <div className="kage-alert-content">
        {content && <div className="kage-alert-message">{content}</div>}
        {description && <div className="kage-alert-description">{description}</div>}
      </div>
      {renderAction()}
      {renderCloseIcon()}
    </div>
  );
};

export default Alert;

