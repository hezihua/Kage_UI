import React from 'react';
import { IconProps } from '../index';

export const RightOutlined: React.FC<IconProps> = ({
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
      <path d="M300 218.3v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.8 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.86 31.86 0 0 0 0-50.3L312.9 212c-5.2-4.1-12.9-.4-12.9 6.3z" />
    </svg>
  );
};
