import React, { ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** Skeleton 属性 */
export interface SkeletonProps {
  /** 是否显示动画效果 */
  active?: boolean;
  /** 是否显示头像占位图 */
  avatar?: boolean | { size?: 'large' | 'small' | 'default'; shape?: 'circle' | 'square' };
  /** 是否显示段落占位图 */
  paragraph?: boolean | { rows?: number; width?: number | string | (number | string)[] };
  /** 是否显示标题占位图 */
  title?: boolean | { width?: number | string };
  /** 是否加载中 */
  loading?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素（当 loading 为 false 时显示） */
  children?: ReactNode;
  /** 是否圆角 */
  round?: boolean;
}

/** SkeletonButton 属性 */
export interface SkeletonButtonProps {
  /** 按钮大小 */
  size?: 'large' | 'small' | 'default';
  /** 是否块级按钮 */
  block?: boolean;
  /** 是否显示动画效果 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/** SkeletonInput 属性 */
export interface SkeletonInputProps {
  /** 输入框大小 */
  size?: 'large' | 'small' | 'default';
  /** 是否块级输入框 */
  block?: boolean;
  /** 是否显示动画效果 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/** SkeletonImage 属性 */
export interface SkeletonImageProps {
  /** 图片大小 */
  size?: number | 'large' | 'small' | 'default';
  /** 是否显示动画效果 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

/** SkeletonAvatar 属性 */
export interface SkeletonAvatarProps {
  /** 头像大小 */
  size?: 'large' | 'small' | 'default' | number;
  /** 头像形状 */
  shape?: 'circle' | 'square';
  /** 是否显示动画效果 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

// ============ Skeleton 组件 ============
export const Skeleton: React.FC<SkeletonProps> & {
  Button: React.FC<SkeletonButtonProps>;
  Input: React.FC<SkeletonInputProps>;
  Image: React.FC<SkeletonImageProps>;
  Avatar: React.FC<SkeletonAvatarProps>;
} = ({
  active = false,
  avatar = false,
  paragraph = true,
  title = true,
  loading = true,
  className = '',
  style,
  children,
  round = false,
}) => {
  if (!loading && children) {
    return <>{children}</>;
  }

  // 解析 avatar 配置
  const avatarConfig = typeof avatar === 'boolean' ? { size: 'default' as const, shape: 'circle' as const } : avatar;
  const avatarSize = avatarConfig.size || 'default';
  const avatarShape = avatarConfig.shape || 'circle';

  // 解析 title 配置
  const titleConfig = typeof title === 'boolean' ? { width: '38%' } : title;
  const titleWidth = titleConfig.width || '38%';

  // 解析 paragraph 配置
  const paragraphConfig = typeof paragraph === 'boolean' ? { rows: 3, width: '100%' } : paragraph;
  const paragraphRows = paragraphConfig.rows || 3;
  const paragraphWidth = paragraphConfig.width || '100%';
  const paragraphWidths = Array.isArray(paragraphWidth) ? paragraphWidth : [paragraphWidth];

  const classNames = [
    'kage-skeleton',
    active && 'kage-skeleton-active',
    round && 'kage-skeleton-round',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {avatar && (
        <div className={`kage-skeleton-avatar kage-skeleton-avatar-${avatarSize} kage-skeleton-avatar-${avatarShape}`}>
          <span className="kage-skeleton-avatar-content" />
        </div>
      )}
      <div className="kage-skeleton-content">
        {title && (
          <div className="kage-skeleton-title" style={{ width: typeof titleWidth === 'number' ? `${titleWidth}px` : titleWidth }}>
            <span className="kage-skeleton-title-content" />
          </div>
        )}
        {paragraph && (
          <div className="kage-skeleton-paragraph">
            {Array.from({ length: paragraphRows }).map((_, index) => {
              const width = paragraphWidths[index] || paragraphWidths[paragraphWidths.length - 1] || '100%';
              return (
                <div key={index} className="kage-skeleton-paragraph-line" style={{ width: typeof width === 'number' ? `${width}px` : width }}>
                  <span className="kage-skeleton-paragraph-line-content" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

// ============ SkeletonButton 组件 ============
const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'default',
  block = false,
  active = false,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-skeleton-button',
    `kage-skeleton-button-${size}`,
    block && 'kage-skeleton-button-block',
    active && 'kage-skeleton-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <span className="kage-skeleton-button-content" />
    </div>
  );
};

// ============ SkeletonInput 组件 ============
const SkeletonInput: React.FC<SkeletonInputProps> = ({
  size = 'default',
  block = false,
  active = false,
  className = '',
  style,
}) => {
  const classNames = [
    'kage-skeleton-input',
    `kage-skeleton-input-${size}`,
    block && 'kage-skeleton-input-block',
    active && 'kage-skeleton-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <span className="kage-skeleton-input-content" />
    </div>
  );
};

// ============ SkeletonImage 组件 ============
const SkeletonImage: React.FC<SkeletonImageProps> = ({
  size = 'default',
  active = false,
  className = '',
  style,
}) => {
  const sizeMap = {
    default: 96,
    small: 64,
    large: 128,
  };
  const imageSize = typeof size === 'number' ? size : sizeMap[size] || 96;

  const classNames = [
    'kage-skeleton-image',
    active && 'kage-skeleton-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={{ width: imageSize, height: imageSize, ...style }}>
      <span className="kage-skeleton-image-content" />
    </div>
  );
};

// ============ SkeletonAvatar 组件 ============
const SkeletonAvatar: React.FC<SkeletonAvatarProps> = ({
  size = 'default',
  shape = 'circle',
  active = false,
  className = '',
  style,
}) => {
  const sizeMap = {
    default: 32,
    small: 24,
    large: 40,
  };
  const avatarSize = typeof size === 'number' ? size : sizeMap[size] || 32;

  const classNames = [
    'kage-skeleton-avatar',
    `kage-skeleton-avatar-${shape}`,
    active && 'kage-skeleton-active',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={{ width: avatarSize, height: avatarSize, ...style }}>
      <span className="kage-skeleton-avatar-content" />
    </div>
  );
};

Skeleton.Button = SkeletonButton;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Avatar = SkeletonAvatar;

export default Skeleton;

