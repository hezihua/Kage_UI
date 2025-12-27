import React from 'react';
import './style.less';

export interface ButtonProps {
  /** 按钮类型 */
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link';
  /** 按钮尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 是否块级按钮 */
  block?: boolean;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({
  type = 'default',
  size = 'middle',
  disabled = false,
  loading = false,
  block = false,
  onClick,
  children,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-btn',
    `kage-btn-${type}`,
    `kage-btn-${size}`,
    block && 'kage-btn-block',
    disabled && 'kage-btn-disabled',
    loading && 'kage-btn-loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      className={classNames}
      style={style}
      disabled={disabled || loading}
      onClick={handleClick}
    >
      {loading && <span className="kage-btn-loading-icon">⏳</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;

