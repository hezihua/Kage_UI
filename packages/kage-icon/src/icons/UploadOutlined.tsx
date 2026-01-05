import React from 'react';
import { IconProps } from '../index';

export const UploadOutlined: React.FC<IconProps> = ({
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
      <path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 0 0-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13z" />
      <path d="M878.6 512h-60c-4.4 0-8 3.6-8 8v354H213.4V520c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v382c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V520c0-4.4-3.6-8-8-8z" />
    </svg>
  );
};
