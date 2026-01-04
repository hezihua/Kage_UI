import React from 'react';
import './style.less';

export interface DividerProps {
  /** 分割线方向 */
  type?: 'horizontal' | 'vertical';
  /** 是否虚线 */
  dashed?: boolean;
  /** 分割线样式 */
  variant?: 'solid' | 'dashed' | 'dotted';
  /** 文字位置（仅水平分割线有效） */
  orientation?: 'left' | 'center' | 'right';
  /** 文字与边缘的距离，取值 0-1 */
  orientationMargin?: number | string;
  /** 是否为纯净模式（无文字时更窄的边距） */
  plain?: boolean;
  /** 子元素（分割线中的文字） */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  dashed = false,
  variant,
  orientation = 'center',
  orientationMargin,
  plain = false,
  children,
  className = '',
  style,
}) => {
  const hasChildren = children !== undefined && children !== null;
  const lineStyle = variant || (dashed ? 'dashed' : 'solid');

  const classNames = [
    'kage-divider',
    `kage-divider-${type}`,
    `kage-divider-${lineStyle}`,
    hasChildren && `kage-divider-with-text`,
    hasChildren && `kage-divider-with-text-${orientation}`,
    plain && 'kage-divider-plain',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 计算文字位置的边距
  const getOrientationMarginStyle = () => {
    if (!hasChildren || orientation === 'center' || !orientationMargin) {
      return {};
    }

    const margin = typeof orientationMargin === 'number' 
      ? `${orientationMargin}px` 
      : orientationMargin;

    if (orientation === 'left') {
      return { '--divider-text-margin-left': margin } as React.CSSProperties;
    }
    if (orientation === 'right') {
      return { '--divider-text-margin-right': margin } as React.CSSProperties;
    }
    return {};
  };

  // 垂直分割线
  if (type === 'vertical') {
    return <span className={classNames} style={style} role="separator" />;
  }

  // 水平分割线
  return (
    <div 
      className={classNames} 
      style={{ ...style, ...getOrientationMarginStyle() }} 
      role="separator"
    >
      {hasChildren && (
        <span className="kage-divider-inner-text">{children}</span>
      )}
    </div>
  );
};

export default Divider;

