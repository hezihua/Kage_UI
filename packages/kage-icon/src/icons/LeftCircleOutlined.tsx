import React from 'react';
import { IconProps } from '../index';

export const LeftCircleOutlined: React.FC<IconProps> = ({
  size = 16,
  color = 'currentColor',
  style,
  className,
  onClick,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      fill={color}
      style={style}
      className={className}
      onClick={onClick}
    >
      {/* 圆形边框 */}
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      {/* 左箭头 - 与 Up/Down 箭头大小完全一致，使用相同的路径结构 */}
      <path d="M663.7 518.5a7.95 7.95 0 0 0-12.9 0l-246 178c-5.3 3.8 0 12.7 6.5 12.7h381c4.6 0 9 2 12.1 5.5L564 512l153.5 118.9c3.1 3.5 7.5 5.5 12.1 5.5h33.8c6.5 0 10.3-7.4 6.5-12.7l-246-178z" />
    </svg>
  );
};
