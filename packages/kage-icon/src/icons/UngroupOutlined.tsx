import React from 'react';
import { IconProps } from '../index';

export const UngroupOutlined: React.FC<IconProps> = ({
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
      <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
      <path d="M304 304h80v80h-80zm0 160h80v80h-80zm160-160h80v80h-80zm0 160h80v80h-80zm160-160h80v80h-80zm0 160h80v80h-80z" />
    </svg>
  );
};
