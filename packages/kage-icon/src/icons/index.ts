import React from 'react';

// 方向性图标
export { StepBackwardOutlined } from './StepBackwardOutlined';
export { StepForwardOutlined } from './StepForwardOutlined';
export { FastBackwardOutlined } from './FastBackwardOutlined';
export { FastForwardOutlined } from './FastForwardOutlined';
export { ShrinkOutlined } from './ShrinkOutlined';
export { ArrowsAltOutlined } from './ArrowsAltOutlined';
export { UpOutlined } from './UpOutlined';
export { CaretUpOutlined } from './CaretUpOutlined';
export { CaretDownOutlined } from './CaretDownOutlined';
export { CaretLeftOutlined } from './CaretLeftOutlined';
export { CaretRightOutlined } from './CaretRightOutlined';
export { UpCircleOutlined } from './UpCircleOutlined';

// 导入所有图标组件
import { StepBackwardOutlined } from './StepBackwardOutlined';
import { StepForwardOutlined } from './StepForwardOutlined';
import { FastBackwardOutlined } from './FastBackwardOutlined';
import { FastForwardOutlined } from './FastForwardOutlined';
import { ShrinkOutlined } from './ShrinkOutlined';
import { ArrowsAltOutlined } from './ArrowsAltOutlined';
import { UpOutlined } from './UpOutlined';
import { CaretUpOutlined } from './CaretUpOutlined';
import { CaretDownOutlined } from './CaretDownOutlined';
import { CaretLeftOutlined } from './CaretLeftOutlined';
import { CaretRightOutlined } from './CaretRightOutlined';
import { UpCircleOutlined } from './UpCircleOutlined';

// 图标映射表
export const iconMap: Record<string, React.ComponentType<any>> = {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
  UpOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UpCircleOutlined,
};

// 所有图标名称列表
export const iconNames = Object.keys(iconMap);
