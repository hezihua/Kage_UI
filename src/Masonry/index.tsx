import React, { useEffect, useRef, useState, useCallback } from 'react';
import './style.less';

export interface MasonryProps {
  /** 列数 */
  columns?: number;
  /** 列间距 */
  gutter?: number | [number, number];
  /** 是否顺序排列（从左到右，而不是按最短列） */
  sequential?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Masonry: React.FC<MasonryProps> = ({
  columns = 2,
  gutter = 16,
  sequential = false,
  children,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [columnHeights, setColumnHeights] = useState<number[]>([]);
  const [positions, setPositions] = useState<{ left: number; top: number }[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 解析 gutter
  const [gutterX, gutterY] = Array.isArray(gutter) ? gutter : [gutter, gutter];

  // 计算布局
  const calculateLayout = useCallback(() => {
    if (!containerRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const columnWidth = (containerWidth - gutterX * (columns - 1)) / columns;
    const heights = new Array(columns).fill(0);
    const newPositions: { left: number; top: number }[] = [];

    const childArray = React.Children.toArray(children);

    childArray.forEach((_, index) => {
      const itemEl = itemRefs.current[index];
      if (!itemEl) return;

      let columnIndex: number;

      if (sequential) {
        // 顺序排列
        columnIndex = index % columns;
      } else {
        // 按最短列排列
        columnIndex = heights.indexOf(Math.min(...heights));
      }

      const left = columnIndex * (columnWidth + gutterX);
      const top = heights[columnIndex];

      newPositions[index] = { left, top };

      // 更新列高度
      heights[columnIndex] += itemEl.offsetHeight + gutterY;
    });

    setColumnHeights(heights);
    setPositions(newPositions);
    setContainerHeight(Math.max(...heights) - gutterY);
  }, [children, columns, gutterX, gutterY, sequential]);

  // 监听尺寸变化
  useEffect(() => {
    calculateLayout();

    const resizeObserver = new ResizeObserver(() => {
      calculateLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [calculateLayout]);

  // 子元素变化时重新计算
  useEffect(() => {
    // 使用 setTimeout 确保 DOM 已更新
    const timer = setTimeout(() => {
      calculateLayout();
    }, 0);

    return () => clearTimeout(timer);
  }, [children, calculateLayout]);

  const childArray = React.Children.toArray(children);
  const columnWidth = containerRef.current
    ? (containerRef.current.offsetWidth - gutterX * (columns - 1)) / columns
    : 0;

  const classNames = ['kage-masonry', className].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      className={classNames}
      style={{
        ...style,
        height: containerHeight || 'auto',
      }}
    >
      {childArray.map((child, index) => (
        <div
          key={index}
          ref={(el) => (itemRefs.current[index] = el)}
          className="kage-masonry-item"
          style={{
            width: columnWidth || `calc((100% - ${gutterX * (columns - 1)}px) / ${columns})`,
            position: positions[index] ? 'absolute' : 'relative',
            left: positions[index]?.left ?? 0,
            top: positions[index]?.top ?? 0,
            opacity: positions[index] ? 1 : 0,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Masonry;

