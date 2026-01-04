import React, { CSSProperties } from 'react';
import { Icon as KageIcon } from 'wssf-kage-icon';
import type { IconProps as KageIconProps } from 'wssf-kage-icon';
import './style.less';

// ============ 类型定义 ============

/** 图标旋转角度 */
export type IconRotate = number | 'infinite';

/** Icon 属性 */
export interface IconProps extends Omit<KageIconProps, 'name'> {
  /** 图标名称 */
  name: string;
  /** 图标大小 */
  size?: number | string;
  /** 图标颜色 */
  color?: string;
  /** 旋转角度（度）或 'infinite' 无限旋转 */
  rotate?: IconRotate;
  /** 是否旋转动画 */
  spin?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击事件 */
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

// ============ Icon 组件 ============

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = 'currentColor',
  rotate,
  spin = false,
  className = '',
  style,
  onClick,
  ...restProps
}) => {
  // 计算旋转样式
  const rotationStyle: CSSProperties = {};
  if (rotate !== undefined) {
    if (rotate === 'infinite') {
      rotationStyle.animation = 'kage-icon-spin 1s linear infinite';
    } else {
      rotationStyle.transform = `rotate(${rotate}deg)`;
    }
  } else if (spin) {
    rotationStyle.animation = 'kage-icon-spin 1s linear infinite';
  }

  const classNames = [
    'kage-icon',
    spin && 'kage-icon-spin',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconStyle: CSSProperties = {
    ...rotationStyle,
    ...style,
  };

  return (
    <KageIcon
      name={name}
      size={size}
      color={color}
      className={classNames}
      style={iconStyle}
      onClick={onClick}
      {...restProps}
    />
  );
};

export default Icon;

