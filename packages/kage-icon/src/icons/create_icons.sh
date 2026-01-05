#!/bin/bash

# Row 3
cat > ItalicOutlined.tsx << 'EOF'
import React from 'react';
import { IconProps } from '../index';
export const ItalicOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M798 160H366c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h181.2l-156 544H229c-4.4 0-8 3.6-8 8v64c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8H474.8l156-544H798c4.4 0 8-3.6 8-8v-64c0-4.4-3.6-8-8-8z"/></svg>;
};
EOF

cat > UnderlineOutlined.tsx << 'EOF'
import React from 'react';
import { IconProps } from '../index';
export const UnderlineOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M824 804H200c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h624c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8zm-312-196c-97.2 0-176-78.8-176-176V172c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v264c0 141.1 114.9 256 256 256s256-114.9 256-256V172c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v264c0 97.2-78.8 176-176 176z"/></svg>;
};
EOF

cat > StrikethroughOutlined.tsx << 'EOF'
import React from 'react';
import { IconProps } from '../index';
export const StrikethroughOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M536 232h-48c-4.4 0-8 3.6-8 8v144H200c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h280v144c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V448h280c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V240c0-4.4-3.6-8-8-8z"/></svg>;
};
EOF

cat > RedoOutlined.tsx << 'EOF'
import React from 'react';
import { IconProps } from '../index';
export const RedoOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M758.2 839.1C851.8 765.9 912 651.9 912 523.9c0-192.2-147.2-350-338.2-380.7v63.4c96.6 7.6 175.2 82.9 175.2 180.6 0 94.1-66.3 173.4-156.2 193.2l-50.9 13.8-11.1 50.2c-5.4 24.5-13.6 47.8-24.4 69.5 84.1 49.2 178.4 73.9 273.2 73.9 20.3 0 40.1-1.1 59.5-3.2v62.1c-22.9 2.5-45.5 3.7-68.1 3.7-120.8 0-235.2-47.1-320.7-133.2l-5.4-5.4 27.1-27.1c134.2-134.2 351-134.2 485.2 0l27.1 27.1-5.4 5.4z"/><path d="M573.9 600.2l-27.1 27.1 5.4 5.4c85.5 86.1 199.9 133.2 320.7 133.2 22.6 0 45.2-1.2 68.1-3.7v-62.1c-19.4 2.1-39.2 3.2-59.5 3.2-94.8 0-189.1-24.7-273.2-73.9 10.8-21.7 19-45 24.4-69.5l11.1-50.2 50.9-13.8c89.9-19.8 156.2-99.1 156.2-193.2 0-97.7-78.6-173-175.2-180.6V143.2C850.8 173.9 998 331.7 998 523.9c0 128-60.2 242-153.8 315.2l-5.4 5.4-27.1-27.1c-134.2-134.2-351-134.2-485.2 0l-27.1 27.1 5.4 5.4c85.5 86.1 199.9 133.2 320.7 133.2 22.6 0 45.2-1.2 68.1-3.7v-62.1c-19.4 2.1-39.2 3.2-59.5 3.2-94.8 0-189.1-24.7-273.2-73.9 10.8-21.7 19-45 24.4-69.5l11.1-50.2 50.9-13.8c89.9-19.8 156.2-99.1 156.2-193.2 0-97.7-78.6-173-175.2-180.6V143.2C850.8 173.9 998 331.7 998 523.9c0 128-60.2 242-153.8 315.2l-5.4 5.4-27.1-27.1c-134.2-134.2-351-134.2-485.2 0z"/></svg>;
};
EOF

cat > UndoOutlined.tsx << 'EOF'
import React from 'react';
import { IconProps } from '../index';
export const UndoOutlined: React.FC<IconProps> = ({ size = 16, color = 'currentColor', style, className, onClick }) => {
  return <svg width={size} height={size} viewBox="0 0 1024 1024" fill={color} style={style} className={className} onClick={onClick}><path d="M265.8 839.1C172.2 765.9 112 651.9 112 523.9c0-192.2 147.2-350 338.2-380.7v63.4c-96.6 7.6-175.2 82.9-175.2 180.6 0 94.1 66.3 173.4 156.2 193.2l50.9 13.8 11.1 50.2c5.4 24.5 13.6 47.8 24.4 69.5-84.1 49.2-178.4 73.9-273.2 73.9-20.3 0-40.1-1.1-59.5-3.2v62.1c22.9 2.5 45.5 3.7 68.1 3.7 120.8 0 235.2-47.1 320.7-133.2l5.4-5.4-27.1-27.1c-134.2-134.2-351-134.2-485.2 0l-27.1 27.1 5.4 5.4c85.5 86.1 199.9 133.2 320.7 133.2 22.6 0 45.2-1.2 68.1-3.7v-62.1c-19.4 2.1-39.2 3.2-59.5 3.2-94.8 0-189.1-24.7-273.2-73.9-10.8 21.7-19 45-24.4 69.5l-11.1 50.2-50.9 13.8c-89.9 19.8-156.2 99.1-156.2 193.2 0 97.7 78.6 173 175.2 180.6v63.4C259.2 173.9 112 331.7 112 523.9c0 128 60.2 242 153.8 315.2l5.4 5.4 27.1-27.1c134.2-134.2 351-134.2 485.2 0l27.1 27.1-5.4 5.4c-85.5 86.1-199.9 133.2-320.7 133.2-22.6 0-45.2-1.2-68.1-3.7v62.1c19.4-2.1 39.2-3.2 59.5-3.2 94.8 0 189.1 24.7 273.2 73.9-10.8-21.7-19-45-24.4-69.5l-11.1-50.2-50.9-13.8c-89.9-19.8-156.2-99.1-156.2-193.2 0-97.7-78.6-173-175.2-180.6v-63.4c191 30.7 338.2 188.5 338.2 380.7 0 128-60.2 242-153.8 315.2l-5.4 5.4-27.1-27.1c-134.2-134.2-351-134.2-485.2 0z"/></svg>;
};
EOF

