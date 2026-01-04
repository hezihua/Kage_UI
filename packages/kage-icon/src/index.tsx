import React from 'react';
import { iconMap } from './icons';

// Kage Icon - Icon library
export * from './icons';

// 图标属性
export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<SVGSVGElement>) => void;
}

// 通用 Icon 组件，通过 name 动态加载图标
export const Icon: React.FC<IconProps & { name: string }> = ({
  name,
  size = 16,
  color = 'currentColor',
  className,
  style,
  onClick,
}) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      color={color}
      className={className}
      style={style}
      onClick={onClick}
    />
  );
};

export default Icon;

