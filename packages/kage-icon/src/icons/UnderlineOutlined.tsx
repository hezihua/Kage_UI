import React from 'react';
import { IconProps } from '../index';
export const UnderlineOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M824 804H200c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-312-196c-97.2 0-176-78.8-176-176V172c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v264c0 141.1 114.9 256 256 256s256-114.9 256-256V172c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v264c0 97.2-78.8 176-176 176z"/></svg>;
};
