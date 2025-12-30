import React, { useState, useCallback } from 'react';
import './style.less';

export type AvatarSize = number | 'large' | 'default' | 'small';
export type AvatarShape = 'circle' | 'square';

// ============ Avatar Props ============
export interface AvatarProps {
  /** 头像的图片地址 */
  src?: string;
  /** 图片无法显示时的替代文本 */
  alt?: string;
  /** 头像的图标 */
  icon?: React.ReactNode;
  /** 头像的形状 */
  shape?: AvatarShape;
  /** 头像的大小 */
  size?: AvatarSize;
  /** 图片加载失败的事件 */
  onError?: () => boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 文本内容 */
  children?: React.ReactNode;
}

// ============ Avatar Component ============
export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  icon,
  shape = 'circle',
  size = 'default',
  onError,
  className = '',
  style,
  children,
}) => {
  const [isImgError, setIsImgError] = useState(false);

  const handleImgError = useCallback(() => {
    const errorHandled = onError?.();
    if (errorHandled !== false) {
      setIsImgError(true);
    }
  }, [onError]);

  // 计算尺寸
  const sizeStyle: React.CSSProperties = {};
  if (typeof size === 'number') {
    sizeStyle.width = size;
    sizeStyle.height = size;
    sizeStyle.fontSize = size / 2;
    sizeStyle.lineHeight = `${size}px`;
  }

  const classNames = [
    'kage-avatar',
    `kage-avatar-${shape}`,
    typeof size === 'string' ? `kage-avatar-${size}` : '',
    !src && !icon && children ? 'kage-avatar-text' : '',
    src && !isImgError ? 'kage-avatar-image' : '',
    icon ? 'kage-avatar-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle = { ...sizeStyle, ...style };

  // 渲染头像内容
  const renderAvatar = () => {
    // 优先显示图片
    if (src && !isImgError) {
      return <img src={src} alt={alt} onError={handleImgError} />;
    }

    // 其次显示图标
    if (icon) {
      return <span className="kage-avatar-icon-content">{icon}</span>;
    }

    // 最后显示文本
    if (children) {
      return <span className="kage-avatar-text-content">{children}</span>;
    }

    // 默认显示用户图标
    return <span className="kage-avatar-icon-content">👤</span>;
  };

  return (
    <span className={classNames} style={mergedStyle}>
      {renderAvatar()}
    </span>
  );
};

// ============ Avatar.Group Props ============
export interface AvatarGroupProps {
  /** 头像列表 */
  children: React.ReactNode;
  /** 最多显示的头像数量 */
  maxCount?: number;
  /** 多余头像的提示 */
  maxPopoverPlacement?: 'top' | 'bottom';
  /** 多余头像样式 */
  maxStyle?: React.CSSProperties;
  /** 头像的大小 */
  size?: AvatarSize;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Avatar.Group Component ============
const AvatarGroup: React.FC<AvatarGroupProps> = ({
  children,
  maxCount,
  maxPopoverPlacement = 'top',
  maxStyle,
  size,
  className = '',
  style,
}) => {
  const childrenArray = React.Children.toArray(children);
  const numOfChildren = childrenArray.length;

  // 如果没有设置 maxCount 或者子元素数量小于等于 maxCount，直接显示所有
  const visibleChildren =
    maxCount && numOfChildren > maxCount
      ? childrenArray.slice(0, maxCount)
      : childrenArray;

  const excessCount = maxCount && numOfChildren > maxCount ? numOfChildren - maxCount : 0;

  // 为子元素添加 size 属性
  const childrenWithSize = visibleChildren.map((child, index) => {
    if (React.isValidElement<AvatarProps>(child)) {
      return React.cloneElement(child, {
        size: child.props.size || size,
        key: index,
      });
    }
    return child;
  });

  const classNames = ['kage-avatar-group', className].filter(Boolean).join(' ');

  return (
    <div className={classNames} style={style}>
      {childrenWithSize}
      {excessCount > 0 && (
        <Avatar size={size} className="kage-avatar-group-excess" style={maxStyle}>
          +{excessCount}
        </Avatar>
      )}
    </div>
  );
};

// 将 Group 组件附加到 Avatar 上
Avatar.displayName = 'Avatar';

export interface AvatarComponent extends React.FC<AvatarProps> {
  Group: typeof AvatarGroup;
}

const AvatarWithGroup = Avatar as AvatarComponent;
AvatarWithGroup.Group = AvatarGroup;

export default AvatarWithGroup;

