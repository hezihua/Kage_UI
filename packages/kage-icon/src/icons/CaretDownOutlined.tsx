import React from 'react';
import { IconProps } from '../index';

export const CaretDownOutlined: React.FC<IconProps> = ({
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
      <path d="M858.9 335L530.5 715.8c-9.4 10.9-27.5 10.9-37 0L165.1 335c-12.2-14.2-1.2-35 18.5-35h656.8c19.7 0 30.7 20.8 18.5 35z" />
    </svg>
  );
};

