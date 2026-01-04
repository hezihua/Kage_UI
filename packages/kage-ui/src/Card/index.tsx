import React, { CSSProperties } from 'react';
import './style.less';

export type CardSize = 'default' | 'small';

// ============ Card Props ============
export interface CardProps {
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 卡片右上角的操作区域 */
  extra?: React.ReactNode;
  /** 是否有边框 */
  bordered?: boolean;
  /** 鼠标移过时可浮起 */
  hoverable?: boolean;
  /** 当卡片内容还在加载中时，可以用 loading 展示一个占位 */
  loading?: boolean;
  /** card 的尺寸 */
  size?: CardSize;
  /** 卡片类型 */
  type?: 'inner';
  /** 封面 */
  cover?: React.ReactNode;
  /** 卡片操作组 */
  actions?: React.ReactNode[];
  /** 自定义标题区域样式 */
  headStyle?: CSSProperties;
  /** 自定义内容区域样式 */
  bodyStyle?: CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 卡片内容 */
  children?: React.ReactNode;
  /** 点击事件 */
  onClick?: () => void;
}

// ============ Card Component ============
export const Card: React.FC<CardProps> = ({
  title,
  extra,
  bordered = true,
  hoverable = false,
  loading = false,
  size = 'default',
  type,
  cover,
  actions,
  headStyle,
  bodyStyle,
  className = '',
  style,
  children,
  onClick,
}) => {
  const classNames = [
    'kage-card',
    `kage-card-${size}`,
    !bordered && 'kage-card-borderless',
    hoverable && 'kage-card-hoverable',
    loading && 'kage-card-loading',
    type === 'inner' && 'kage-card-inner',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 加载状态骨架屏
  if (loading) {
    return (
      <div className={classNames} style={style}>
        {(title || extra) && (
          <div className="kage-card-head" style={headStyle}>
            <div className="kage-card-skeleton-title" />
          </div>
        )}
        <div className="kage-card-body" style={bodyStyle}>
          <div className="kage-card-skeleton-paragraph">
            <div className="kage-card-skeleton-line" />
            <div className="kage-card-skeleton-line" />
            <div className="kage-card-skeleton-line" style={{ width: '60%' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={classNames} style={style} onClick={onClick}>
      {/* 封面 */}
      {cover && <div className="kage-card-cover">{cover}</div>}

      {/* 头部 */}
      {(title || extra) && (
        <div className="kage-card-head" style={headStyle}>
          {title && <div className="kage-card-head-title">{title}</div>}
          {extra && <div className="kage-card-head-extra">{extra}</div>}
        </div>
      )}

      {/* 内容 */}
      <div className="kage-card-body" style={bodyStyle}>{children}</div>

      {/* 操作区 */}
      {actions && actions.length > 0 && (
        <div className="kage-card-actions">
          {actions.map((action, index) => (
            <div key={index} className="kage-card-actions-item">
              {action}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============ Card.Meta Props ============
export interface CardMetaProps {
  /** 头像 */
  avatar?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

// ============ Card.Meta Component ============
const CardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className = '',
  style,
}) => {
  const classNames = ['kage-card-meta', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {avatar && <div className="kage-card-meta-avatar">{avatar}</div>}
      <div className="kage-card-meta-detail">
        {title && <div className="kage-card-meta-title">{title}</div>}
        {description && <div className="kage-card-meta-description">{description}</div>}
      </div>
    </div>
  );
};

// ============ Card.Grid Props ============
export interface CardGridProps {
  /** 是否可悬浮 */
  hoverable?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 内容 */
  children?: React.ReactNode;
  /** 点击事件 */
  onClick?: () => void;
}

// ============ Card.Grid Component ============
const CardGrid: React.FC<CardGridProps> = ({
  hoverable = true,
  className = '',
  style,
  children,
  onClick,
}) => {
  const classNames = [
    'kage-card-grid',
    hoverable && 'kage-card-grid-hoverable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style} onClick={onClick}>
      {children}
    </div>
  );
};

// 将子组件附加到 Card 上
Card.displayName = 'Card';

export interface CardComponent extends React.FC<CardProps> {
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
}

const CardWithSubComponents = Card as CardComponent;
CardWithSubComponents.Meta = CardMeta;
CardWithSubComponents.Grid = CardGrid;

export default CardWithSubComponents;

