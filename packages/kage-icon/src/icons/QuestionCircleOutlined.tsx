import React from 'react';
import { IconProps } from '../index';

export const QuestionCircleOutlined: React.FC<IconProps> = ({
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
      <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
      <path d="M623.6 316.7C593.6 286.7 543 277 512 277s-81.6 9.7-111.6 39.7c-19.8 19.8-19.8 51.8 0 71.6 19.8 19.8 51.8 19.8 71.6 0 8.7-8.7 21.5-13.5 34.3-13.5 12.8 0 25.6 4.8 34.3 13.5 19.8 19.8 51.8 19.8 71.6 0 19.8-19.8 19.8-51.8 0-71.6zm-223.2 184c-19.8 19.8-19.8 51.8 0 71.6 19.8 19.8 51.8 19.8 71.6 0l111.6-111.6c19.8-19.8 19.8-51.8 0-71.6-19.8-19.8-51.8-19.8-71.6 0L400.4 500.7z" />
      <path d="M512 737c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z" />
    </svg>
  );
};

