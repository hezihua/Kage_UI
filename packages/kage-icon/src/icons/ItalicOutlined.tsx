import React from 'react';
import { IconProps } from '../index';
export const ItalicOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M798 160H366c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h181.2l-156 544H229c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8H474.8l156-544H798c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/></svg>;
};
