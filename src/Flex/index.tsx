import React from 'react';
import './style.less';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
type JustifyContent = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'space-between' 
  | 'space-around' 
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'normal';
type AlignItems = 
  | 'flex-start' 
  | 'flex-end' 
  | 'center' 
  | 'baseline' 
  | 'stretch'
  | 'start'
  | 'end'
  | 'normal';
type AlignContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch'
  | 'start'
  | 'end'
  | 'normal';

export interface FlexProps {
  /** 是否垂直布局 */
  vertical?: boolean;
  /** 主轴方向 */
  direction?: FlexDirection;
  /** 是否换行 */
  wrap?: FlexWrap | boolean;
  /** 主轴对齐方式 */
  justify?: JustifyContent;
  /** 交叉轴对齐方式 */
  align?: AlignItems;
  /** 多行对齐方式 */
  alignContent?: AlignContent;
  /** 间距，可以是数字或 'small' | 'middle' | 'large' */
  gap?: number | 'small' | 'middle' | 'large' | [number, number];
  /** 是否为行内元素 */
  inline?: boolean;
  /** flex CSS 属性 */
  flex?: string | number;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义组件标签 */
  component?: keyof JSX.IntrinsicElements;
}

const gapSizeMap = {
  small: 8,
  middle: 16,
  large: 24,
};

export const Flex: React.FC<FlexProps> = ({
  vertical = false,
  direction,
  wrap,
  justify,
  align,
  alignContent,
  gap,
  inline = false,
  flex,
  children,
  className = '',
  style,
  component: Component = 'div',
}) => {
  // 处理 direction
  const flexDirection = direction || (vertical ? 'column' : 'row');

  // 处理 wrap
  const flexWrap = typeof wrap === 'boolean' 
    ? (wrap ? 'wrap' : 'nowrap') 
    : wrap;

  // 处理 gap
  const getGap = (): string | undefined => {
    if (gap === undefined) return undefined;
    
    if (typeof gap === 'string') {
      return `${gapSizeMap[gap]}px`;
    }
    
    if (typeof gap === 'number') {
      return `${gap}px`;
    }
    
    if (Array.isArray(gap)) {
      return `${gap[0]}px ${gap[1]}px`;
    }
    
    return undefined;
  };

  const classNames = [
    'kage-flex',
    inline && 'kage-flex-inline',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const flexStyle: React.CSSProperties = {
    flexDirection,
    flexWrap,
    justifyContent: justify,
    alignItems: align,
    alignContent,
    gap: getGap(),
    flex,
    ...style,
  };

  return (
    <Component className={classNames} style={flexStyle}>
      {children}
    </Component>
  );
};

export default Flex;

