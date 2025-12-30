import React, { CSSProperties } from 'react';
import './style.less';

export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

// ============ Badge Props ============
export interface BadgeProps {
  /** 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+ */
  count?: number | React.ReactNode;
  /** 展示封顶的数字值 */
  overflowCount?: number;
  /** 不展示数字，只有一个小红点 */
  dot?: boolean;
  /** 设置状态点 */
  status?: BadgeStatus;
  /** 设置状态点的文本 */
  text?: React.ReactNode;
  /** 自定义小圆点的颜色 */
  color?: string;
  /** 是否显示 Badge */
  showZero?: boolean;
  /** 设置 Badge 为状态点 */
  offset?: [number, number];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// ============ Badge Component ============
export const Badge: React.FC<BadgeProps> = ({
  count = 0,
  overflowCount = 99,
  dot = false,
  status,
  text,
  color,
  showZero = false,
  offset,
  className = '',
  style,
  children,
}) => {
  // 计算显示的内容
  const getDisplayCount = () => {
    if (typeof count === 'number') {
      if (count === 0 && !showZero) {
        return null;
      }
      if (count > overflowCount) {
        return `${overflowCount}+`;
      }
      return count;
    }
    return count;
  };

  const displayCount = getDisplayCount();
  const shouldShowBadge = dot || displayCount !== null;

  // 状态点样式
  if (status || (!children && text)) {
    const statusClassNames = [
      'kage-badge-status',
      status && `kage-badge-status-${status}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const dotStyle: CSSProperties = color ? { backgroundColor: color } : {};

    return (
      <span className={statusClassNames} style={style}>
        <span className="kage-badge-status-dot" style={dotStyle} />
        {text && <span className="kage-badge-status-text">{text}</span>}
      </span>
    );
  }

  // 如果没有子元素，直接显示数字
  if (!children) {
    if (!shouldShowBadge) return null;

    const standaloneClassNames = [
      'kage-badge-standalone',
      dot && 'kage-badge-dot',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const badgeStyle: CSSProperties = color ? { backgroundColor: color } : {};

    return (
      <span className={standaloneClassNames} style={{ ...badgeStyle, ...style }}>
        {!dot && displayCount}
      </span>
    );
  }

  // 带子元素的徽章
  const wrapperClassNames = ['kage-badge', className].filter(Boolean).join(' ');

  const supClassNames = [
    'kage-badge-count',
    dot && 'kage-badge-dot',
    !shouldShowBadge && 'kage-badge-hidden',
  ]
    .filter(Boolean)
    .join(' ');

  const supStyle: CSSProperties = {
    ...(color ? { backgroundColor: color } : {}),
    ...(offset ? { right: -offset[0], top: offset[1] } : {}),
  };

  return (
    <span className={wrapperClassNames} style={style}>
      {children}
      {shouldShowBadge && (
        <sup className={supClassNames} style={supStyle}>
          {!dot && displayCount}
        </sup>
      )}
    </span>
  );
};

// ============ Badge.Ribbon Props ============
export interface BadgeRibbonProps {
  /** 缎带的文本 */
  text?: React.ReactNode;
  /** 缎带的颜色 */
  color?: string;
  /** 缎带的位置 */
  placement?: 'start' | 'end';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// ============ Badge.Ribbon Component ============
const BadgeRibbon: React.FC<BadgeRibbonProps> = ({
  text,
  color,
  placement = 'end',
  className = '',
  style,
  children,
}) => {
  const ribbonClassNames = [
    'kage-badge-ribbon',
    `kage-badge-ribbon-${placement}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ribbonStyle: CSSProperties = color ? { backgroundColor: color } : {};

  return (
    <div className="kage-badge-ribbon-wrapper" style={style}>
      {children}
      <div className={ribbonClassNames} style={ribbonStyle}>
        <span className="kage-badge-ribbon-text">{text}</span>
        <div className="kage-badge-ribbon-corner" style={ribbonStyle} />
      </div>
    </div>
  );
};

// 将 Ribbon 组件附加到 Badge 上
Badge.displayName = 'Badge';

export interface BadgeComponent extends React.FC<BadgeProps> {
  Ribbon: typeof BadgeRibbon;
}

const BadgeWithRibbon = Badge as BadgeComponent;
BadgeWithRibbon.Ribbon = BadgeRibbon;

export default BadgeWithRibbon;

