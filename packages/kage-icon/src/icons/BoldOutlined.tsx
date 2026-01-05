import React from 'react';
import { IconProps } from '../index';

export const BoldOutlined: React.FC<IconProps> = ({
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
      <path d="M624 706c-28.5 0-51.4-22.9-51.4-51.4s22.9-51.4 51.4-51.4h208V706H624zm0-206c-28.5 0-51.4-22.9-51.4-51.4s22.9-51.4 51.4-51.4h208v102.8H624zm0-206c-28.5 0-51.4-22.9-51.4-51.4s22.9-51.4 51.4-51.4h208v102.8H624z" />
      <path d="M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-40 824H232V136h560v752z" />
    </svg>
  );
};
