import React from 'react';
import './style.less';

type SpaceSize = 'small' | 'middle' | 'large' | number;
type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps {
  /** 间距方向 */
  direction?: 'horizontal' | 'vertical';
  /** 间距大小 */
  size?: SpaceSize | [SpaceSize, SpaceSize];
  /** 对齐方式 */
  align?: SpaceAlign;
  /** 是否自动换行（仅在 horizontal 有效） */
  wrap?: boolean;
  /** 设置分隔符 */
  split?: React.ReactNode;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const sizeMap: Record<string, number> = {
  small: 8,
  middle: 16,
  large: 24,
};

const getSize = (size: SpaceSize): number => {
  if (typeof size === 'number') {
    return size;
  }
  return sizeMap[size] || 8;
};

export const Space: React.FC<SpaceProps> = ({
  direction = 'horizontal',
  size = 'small',
  align,
  wrap = false,
  split,
  children,
  className = '',
  style,
}) => {
  // 处理 size
  const [horizontalSize, verticalSize] = Array.isArray(size)
    ? [getSize(size[0]), getSize(size[1])]
    : [getSize(size), getSize(size)];

  // 对齐方式映射
  const alignMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    baseline: 'baseline',
  };

  const classNames = [
    'kage-space',
    `kage-space-${direction}`,
    wrap && 'kage-space-wrap',
    align && `kage-space-align-${align}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const spaceStyle: React.CSSProperties = {
    alignItems: align ? alignMap[align] : undefined,
    ...style,
  };

  // 过滤有效的子元素
  const childArray = React.Children.toArray(children).filter(
    (child) => child !== null && child !== undefined && child !== ''
  );

  if (childArray.length === 0) {
    return null;
  }

  return (
    <div className={classNames} style={spaceStyle}>
      {childArray.map((child, index) => {
        const isLast = index === childArray.length - 1;

        const itemStyle: React.CSSProperties = {
          marginRight: direction === 'horizontal' && !isLast ? horizontalSize : undefined,
          marginBottom: direction === 'vertical' && !isLast ? verticalSize : undefined,
          paddingRight: direction === 'horizontal' && wrap ? horizontalSize : undefined,
          paddingBottom: wrap ? verticalSize : undefined,
        };

        // 如果有 wrap，使用 gap 方式
        if (wrap) {
          return (
            <React.Fragment key={index}>
              <div className="kage-space-item">{child}</div>
              {split && !isLast && (
                <div className="kage-space-split">{split}</div>
              )}
            </React.Fragment>
          );
        }

        return (
          <React.Fragment key={index}>
            <div className="kage-space-item" style={itemStyle}>
              {child}
            </div>
            {split && !isLast && (
              <div
                className="kage-space-split"
                style={{
                  marginRight: direction === 'horizontal' ? horizontalSize : undefined,
                  marginBottom: direction === 'vertical' ? verticalSize : undefined,
                }}
              >
                {split}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Compact 紧凑组件
export interface CompactProps {
  /** 排列方向 */
  direction?: 'horizontal' | 'vertical';
  /** 是否为块级元素 */
  block?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Compact: React.FC<CompactProps> = ({
  direction = 'horizontal',
  block = false,
  children,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-space-compact',
    `kage-space-compact-${direction}`,
    block && 'kage-space-compact-block',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

// 添加 Compact 到 Space
type SpaceType = React.FC<SpaceProps> & {
  Compact: typeof Compact;
};

const SpaceWithCompact = Space as SpaceType;
SpaceWithCompact.Compact = Compact;

export default SpaceWithCompact;

