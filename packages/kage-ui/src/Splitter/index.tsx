import React, { useState, useRef, useCallback, useEffect } from 'react';
import './style.less';

// ============ Panel 面板组件 ============
export interface PanelProps {
  /** 默认大小（百分比或像素） */
  defaultSize?: number | string;
  /** 受控大小 */
  size?: number | string;
  /** 最小大小 */
  min?: number | string;
  /** 最大大小 */
  max?: number | string;
  /** 是否可调整大小 */
  resizable?: boolean;
  /** 是否可折叠 */
  collapsible?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({
  children,
  className = '',
  style,
}) => {
  return (
    <div className={`kage-splitter-panel ${className}`} style={style}>
      {children}
    </div>
  );
};

Panel.displayName = 'Panel';

// ============ Splitter 分割器组件 ============
export interface SplitterProps {
  /** 布局方向 */
  layout?: 'horizontal' | 'vertical';
  /** 尺寸变化回调 */
  onResize?: (sizes: number[]) => void;
  /** 拖拽开始回调 */
  onResizeStart?: () => void;
  /** 拖拽结束回调 */
  onResizeEnd?: (sizes: number[]) => void;
  /** 子元素（Panel） */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

interface PanelConfig {
  defaultSize?: number;
  min?: number;
  max?: number;
  resizable?: boolean;
  collapsible?: boolean;
}

export const Splitter: React.FC<SplitterProps> & { Panel: typeof Panel } = ({
  layout = 'horizontal',
  onResize,
  onResizeStart,
  onResizeEnd,
  children,
  className = '',
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const startPosRef = useRef(0);
  const startSizesRef = useRef<number[]>([]);

  // 解析子元素
  const panels = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child.type as any)?.displayName === 'Panel'
  ) as React.ReactElement<PanelProps>[];

  // 初始化尺寸
  useEffect(() => {
    if (sizes.length === 0 && panels.length > 0) {
      const initialSizes = panels.map((panel, index) => {
        const { defaultSize } = panel.props;
        if (defaultSize !== undefined) {
          return typeof defaultSize === 'string' 
            ? parseFloat(defaultSize) 
            : defaultSize;
        }
        return 100 / panels.length;
      });
      
      // 归一化到 100%
      const total = initialSizes.reduce((a, b) => a + b, 0);
      const normalized = initialSizes.map((s) => (s / total) * 100);
      setSizes(normalized);
    }
  }, [panels.length]);

  // 获取面板配置
  const getPanelConfig = (index: number): PanelConfig => {
    const panel = panels[index];
    if (!panel) return {};
    
    const { min, max, resizable = true, collapsible } = panel.props;
    return {
      min: min !== undefined ? (typeof min === 'string' ? parseFloat(min) : min) : 0,
      max: max !== undefined ? (typeof max === 'string' ? parseFloat(max) : max) : 100,
      resizable,
      collapsible,
    };
  };

  // 开始拖拽
  const handleMouseDown = useCallback((index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragIndex(index);
    startPosRef.current = layout === 'horizontal' ? e.clientX : e.clientY;
    startSizesRef.current = [...sizes];
    onResizeStart?.();
  }, [layout, sizes, onResizeStart]);

  // 拖拽中
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || dragIndex === null || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const containerSize = layout === 'horizontal' ? containerRect.width : containerRect.height;
    const currentPos = layout === 'horizontal' ? e.clientX : e.clientY;
    const delta = currentPos - startPosRef.current;
    const deltaPercent = (delta / containerSize) * 100;

    const newSizes = [...startSizesRef.current];
    const config1 = getPanelConfig(dragIndex);
    const config2 = getPanelConfig(dragIndex + 1);

    let newSize1 = startSizesRef.current[dragIndex] + deltaPercent;
    let newSize2 = startSizesRef.current[dragIndex + 1] - deltaPercent;

    // 应用限制
    const min1 = config1.min || 0;
    const max1 = config1.max || 100;
    const min2 = config2.min || 0;
    const max2 = config2.max || 100;

    if (newSize1 < min1) {
      newSize1 = min1;
      newSize2 = startSizesRef.current[dragIndex] + startSizesRef.current[dragIndex + 1] - min1;
    }
    if (newSize1 > max1) {
      newSize1 = max1;
      newSize2 = startSizesRef.current[dragIndex] + startSizesRef.current[dragIndex + 1] - max1;
    }
    if (newSize2 < min2) {
      newSize2 = min2;
      newSize1 = startSizesRef.current[dragIndex] + startSizesRef.current[dragIndex + 1] - min2;
    }
    if (newSize2 > max2) {
      newSize2 = max2;
      newSize1 = startSizesRef.current[dragIndex] + startSizesRef.current[dragIndex + 1] - max2;
    }

    newSizes[dragIndex] = newSize1;
    newSizes[dragIndex + 1] = newSize2;

    setSizes(newSizes);
    onResize?.(newSizes);
  }, [isDragging, dragIndex, layout, onResize]);

  // 结束拖拽
  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragIndex(null);
      onResizeEnd?.(sizes);
    }
  }, [isDragging, sizes, onResizeEnd]);

  // 绑定全局事件
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = layout === 'horizontal' ? 'col-resize' : 'row-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp, layout]);

  const classNames = [
    'kage-splitter',
    `kage-splitter-${layout}`,
    isDragging && 'kage-splitter-dragging',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {panels.map((panel, index) => {
        const isLast = index === panels.length - 1;
        const size = sizes[index] || (100 / panels.length);

        const panelStyle: React.CSSProperties = {
          [layout === 'horizontal' ? 'width' : 'height']: `${size}%`,
          ...panel.props.style,
        };

        return (
          <React.Fragment key={index}>
            <div
              className={`kage-splitter-panel ${panel.props.className || ''}`}
              style={panelStyle}
            >
              {panel.props.children}
            </div>
            {!isLast && (
              <div
                className={`kage-splitter-bar kage-splitter-bar-${layout}`}
                onMouseDown={(e) => handleMouseDown(index, e)}
              >
                <div className="kage-splitter-bar-dragger" />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

Splitter.Panel = Panel;
Splitter.displayName = 'Splitter';

export default Splitter;

