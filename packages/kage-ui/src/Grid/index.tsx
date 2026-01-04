import React, { createContext, useContext } from 'react';
import './style.less';

// ============ Row Context ============
interface RowContextValue {
  gutter: [number, number];
}

const RowContext = createContext<RowContextValue>({ gutter: [0, 0] });

// ============ Row 行组件 ============
type Gutter = number | [number, number];
type JustifyContent = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
type AlignItems = 'top' | 'middle' | 'bottom' | 'stretch';

export interface RowProps {
  /** 栅格间隔，可以是数字或数组 [水平间距, 垂直间距] */
  gutter?: Gutter;
  /** 水平排列方式 */
  justify?: JustifyContent;
  /** 垂直对齐方式 */
  align?: AlignItems;
  /** 是否自动换行 */
  wrap?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Row: React.FC<RowProps> = ({
  gutter = 0,
  justify,
  align,
  wrap = true,
  children,
  className = '',
  style,
}) => {
  // 处理 gutter
  const gutterValue: [number, number] = Array.isArray(gutter) 
    ? gutter 
    : [gutter, 0];

  const [horizontalGutter, verticalGutter] = gutterValue;

  // justify 映射
  const justifyMap: Record<string, string> = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-around': 'space-around',
    'space-between': 'space-between',
    'space-evenly': 'space-evenly',
  };

  // align 映射
  const alignMap: Record<string, string> = {
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    stretch: 'stretch',
  };

  const classNames = [
    'kage-row',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rowStyle: React.CSSProperties = {
    marginLeft: horizontalGutter ? -horizontalGutter / 2 : undefined,
    marginRight: horizontalGutter ? -horizontalGutter / 2 : undefined,
    rowGap: verticalGutter || undefined,
    justifyContent: justify ? justifyMap[justify] : undefined,
    alignItems: align ? alignMap[align] : undefined,
    flexWrap: wrap ? 'wrap' : 'nowrap',
    ...style,
  };

  return (
    <RowContext.Provider value={{ gutter: gutterValue }}>
      <div className={classNames} style={rowStyle}>
        {children}
      </div>
    </RowContext.Provider>
  );
};

// ============ Col 列组件 ============
type ColSpan = number;

interface ColSize {
  span?: ColSpan;
  offset?: number;
  order?: number;
  pull?: number;
  push?: number;
}

export interface ColProps {
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: ColSpan;
  /** 栅格左侧偏移格数 */
  offset?: number;
  /** 栅格顺序 */
  order?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** flex 布局属性 */
  flex?: string | number;
  /** <576px 响应式栅格 */
  xs?: ColSpan | ColSize;
  /** ≥576px 响应式栅格 */
  sm?: ColSpan | ColSize;
  /** ≥768px 响应式栅格 */
  md?: ColSpan | ColSize;
  /** ≥992px 响应式栅格 */
  lg?: ColSpan | ColSize;
  /** ≥1200px 响应式栅格 */
  xl?: ColSpan | ColSize;
  /** ≥1600px 响应式栅格 */
  xxl?: ColSpan | ColSize;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Col: React.FC<ColProps> = ({
  span,
  offset,
  order,
  pull,
  push,
  flex,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  children,
  className = '',
  style,
}) => {
  const { gutter } = useContext(RowContext);
  const [horizontalGutter] = gutter;

  // 构建响应式类名
  const getResponsiveClasses = () => {
    const classes: string[] = [];
    const sizes = { xs, sm, md, lg, xl, xxl };

    Object.entries(sizes).forEach(([size, value]) => {
      if (value !== undefined) {
        if (typeof value === 'number') {
          classes.push(`kage-col-${size}-${value}`);
        } else if (typeof value === 'object') {
          if (value.span !== undefined) {
            classes.push(`kage-col-${size}-${value.span}`);
          }
          if (value.offset !== undefined) {
            classes.push(`kage-col-${size}-offset-${value.offset}`);
          }
          if (value.order !== undefined) {
            classes.push(`kage-col-${size}-order-${value.order}`);
          }
          if (value.pull !== undefined) {
            classes.push(`kage-col-${size}-pull-${value.pull}`);
          }
          if (value.push !== undefined) {
            classes.push(`kage-col-${size}-push-${value.push}`);
          }
        }
      }
    });

    return classes;
  };

  const classNames = [
    'kage-col',
    span !== undefined && `kage-col-${span}`,
    offset !== undefined && `kage-col-offset-${offset}`,
    order !== undefined && `kage-col-order-${order}`,
    pull !== undefined && `kage-col-pull-${pull}`,
    push !== undefined && `kage-col-push-${push}`,
    ...getResponsiveClasses(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const colStyle: React.CSSProperties = {
    paddingLeft: horizontalGutter ? horizontalGutter / 2 : undefined,
    paddingRight: horizontalGutter ? horizontalGutter / 2 : undefined,
    flex: flex !== undefined 
      ? (typeof flex === 'number' ? `${flex} ${flex} auto` : flex)
      : undefined,
    ...style,
  };

  return (
    <div className={classNames} style={colStyle}>
      {children}
    </div>
  );
};

// ============ Grid 命名空间导出 ============
type GridType = {
  Row: typeof Row;
  Col: typeof Col;
};

const Grid: GridType = {
  Row,
  Col,
};

export default Grid;

