import React from 'react';
import { IconProps } from '../index';

export const MinusOutlined: React.FC<IconProps> = ({
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
      <path d="M176 474h672c4.4 0 8 3.6 8 8v60c0 4.4-3.6 8-8 8H176c-4.4 0-8-3.6-8-8v-60c0-4.4 3.6-8 8-8z" />
    </svg>
  );
};

