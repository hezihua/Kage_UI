import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  ReactNode,
  CSSProperties,
  cloneElement,
  isValidElement,
} from 'react';
import { createPortal } from 'react-dom';
import './style.less';

// ============ 类型定义 ============

/** 提示框位置 */
export type TooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

/** 触发方式 */
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';

/** 颜色预设 */
export type TooltipColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | string;

/** Tooltip 属性 */
export interface TooltipProps {
  /** 提示文字 */
  title?: ReactNode;
  /** 触发行为 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 气泡位置 */
  placement?: TooltipPlacement;
  /** 默认是否显示 */
  defaultOpen?: boolean;
  /** 用于手动控制浮层显隐 */
  open?: boolean;
  /** 显示隐藏的回调 */
  onOpenChange?: (open: boolean) => void;
  /** 背景颜色 */
  color?: TooltipColor;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 鼠标移入后延时多少才显示 Tooltip（秒） */
  mouseEnterDelay?: number;
  /** 鼠标移出后延时多少才隐藏 Tooltip（秒） */
  mouseLeaveDelay?: number;
  /** 关闭后是否销毁 Tooltip */
  destroyTooltipOnHide?: boolean;
  /** 浮层渲染父节点，默认渲染到 body 上 */
  getPopupContainer?: () => HTMLElement;
  /** 卡片样式 */
  overlayStyle?: CSSProperties;
  /** 卡片类名 */
  overlayClassName?: string;
  /** 卡片内容区域的样式 */
  overlayInnerStyle?: CSSProperties;
  /** 气泡被遮挡时自动调整位置 */
  autoAdjustOverflow?: boolean;
  /** z-index */
  zIndex?: number;
  /** 子元素 */
  children?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

// ============ 预设颜色 ============

const PRESET_COLORS = ['default', 'primary', 'success', 'warning', 'error'];

function isPresetColor(color?: string): boolean {
  return PRESET_COLORS.includes(color || '');
}

// ============ 位置计算 ============

interface Position {
  top: number;
  left: number;
}

function getPlacementStyle(
  triggerRect: DOMRect,
  tooltipRect: DOMRect,
  placement: TooltipPlacement,
  arrow: boolean
): Position {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return { top: 0, left: 0 };
  }
  
  const gap = arrow ? 12 : 8;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

  const positions: Record<TooltipPlacement, Position> = {
    top: {
      top: triggerRect.top + scrollTop - tooltipRect.height - gap,
      left: triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2,
    },
    topLeft: {
      top: triggerRect.top + scrollTop - tooltipRect.height - gap,
      left: triggerRect.left + scrollLeft,
    },
    topRight: {
      top: triggerRect.top + scrollTop - tooltipRect.height - gap,
      left: triggerRect.right + scrollLeft - tooltipRect.width,
    },
    bottom: {
      top: triggerRect.bottom + scrollTop + gap,
      left: triggerRect.left + scrollLeft + (triggerRect.width - tooltipRect.width) / 2,
    },
    bottomLeft: {
      top: triggerRect.bottom + scrollTop + gap,
      left: triggerRect.left + scrollLeft,
    },
    bottomRight: {
      top: triggerRect.bottom + scrollTop + gap,
      left: triggerRect.right + scrollLeft - tooltipRect.width,
    },
    left: {
      top: triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2,
      left: triggerRect.left + scrollLeft - tooltipRect.width - gap,
    },
    leftTop: {
      top: triggerRect.top + scrollTop,
      left: triggerRect.left + scrollLeft - tooltipRect.width - gap,
    },
    leftBottom: {
      top: triggerRect.bottom + scrollTop - tooltipRect.height,
      left: triggerRect.left + scrollLeft - tooltipRect.width - gap,
    },
    right: {
      top: triggerRect.top + scrollTop + (triggerRect.height - tooltipRect.height) / 2,
      left: triggerRect.right + scrollLeft + gap,
    },
    rightTop: {
      top: triggerRect.top + scrollTop,
      left: triggerRect.right + scrollLeft + gap,
    },
    rightBottom: {
      top: triggerRect.bottom + scrollTop - tooltipRect.height,
      left: triggerRect.right + scrollLeft + gap,
    },
  };

  return positions[placement];
}

// ============ Tooltip 组件 ============

export const Tooltip: React.FC<TooltipProps> = ({
  title,
  trigger = 'hover',
  placement = 'top',
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  color = 'default',
  arrow = true,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  destroyTooltipOnHide = false,
  getPopupContainer,
  overlayStyle,
  overlayClassName = '',
  overlayInnerStyle,
  autoAdjustOverflow = true,
  zIndex = 1070,
  children,
  className = '',
  style,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  // 如果 defaultOpen 为 true，初始时就应该 mounted
  const [mounted, setMounted] = useState(defaultOpen);
  const [positionCalculated, setPositionCalculated] = useState(false);

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const enterTimerRef = useRef<number>();
  const leaveTimerRef = useRef<number>();

  const isOpen = controlledOpen ?? internalOpen;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  // 更新显示状态
  const updateOpen = useCallback(
    (nextOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [controlledOpen, onOpenChange]
  );

  // 计算位置
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let finalPlacement = placement;

    // 自动调整位置
    if (autoAdjustOverflow) {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 检查是否需要翻转
      if (placement.startsWith('top') && triggerRect.top < tooltipRect.height + 12) {
        finalPlacement = placement.replace('top', 'bottom') as TooltipPlacement;
      } else if (placement.startsWith('bottom') && viewportHeight - triggerRect.bottom < tooltipRect.height + 12) {
        finalPlacement = placement.replace('bottom', 'top') as TooltipPlacement;
      } else if (placement.startsWith('left') && triggerRect.left < tooltipRect.width + 12) {
        finalPlacement = placement.replace('left', 'right') as TooltipPlacement;
      } else if (placement.startsWith('right') && viewportWidth - triggerRect.right < tooltipRect.width + 12) {
        finalPlacement = placement.replace('right', 'left') as TooltipPlacement;
      }

      setActualPlacement(finalPlacement);
    }

    const pos = getPlacementStyle(triggerRect, tooltipRect, finalPlacement, arrow);
    setPosition(pos);
    setPositionCalculated(true);
  }, [placement, arrow, autoAdjustOverflow]);

  // 显示
  const handleShow = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    enterTimerRef.current = window.setTimeout(() => {
      updateOpen(true);
    }, mouseEnterDelay * 1000);
  }, [mouseEnterDelay, updateOpen]);

  // 隐藏
  const handleHide = useCallback(() => {
    clearTimeout(enterTimerRef.current);
    leaveTimerRef.current = window.setTimeout(() => {
      updateOpen(false);
    }, mouseLeaveDelay * 1000);
  }, [mouseLeaveDelay, updateOpen]);

  // 立即显示（用于点击触发）
  const handleShowImmediate = useCallback(() => {
    clearTimeout(leaveTimerRef.current);
    clearTimeout(enterTimerRef.current);
    updateOpen(true);
  }, [updateOpen]);

  // 切换
  const handleToggle = useCallback(() => {
    if (isOpen) {
      handleHide();
    } else {
      handleShowImmediate();
    }
  }, [isOpen, handleShowImmediate, handleHide]);

  // 绑定触发事件
  const getTriggerProps = () => {
    const props: Record<string, any> = {};

    if (triggers.includes('hover')) {
      props.onMouseEnter = handleShow;
      props.onMouseLeave = handleHide;
    }

    if (triggers.includes('focus')) {
      props.onFocus = handleShow;
      props.onBlur = handleHide;
    }

    if (triggers.includes('click')) {
      props.onClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleToggle();
      };
    }

    if (triggers.includes('contextMenu')) {
      props.onContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        handleToggle();
      };
    }

    return props;
  };

  // 点击外部关闭
  useEffect(() => {
    if (!isOpen || !triggers.includes('click')) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        updateOpen(false);
      }
    };

    // 使用 click 事件而不是 mousedown，避免在显示之前就关闭
    // 延迟执行，确保点击触发的事件先执行
    const timer = setTimeout(() => {
      document.addEventListener('click', handleClickOutside, true);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen, triggers, updateOpen]);

  // 当 isOpen 变化时，更新 mounted 状态
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    } else {
      setPositionCalculated(false);
      // 如果 destroyTooltipOnHide 为 true，关闭时重置 mounted
      if (destroyTooltipOnHide) {
        setMounted(false);
      }
    }
  }, [isOpen, destroyTooltipOnHide]);

  // 更新位置
  useEffect(() => {
    if (isOpen && mounted) {
      setPositionCalculated(false); // 重置位置计算标志
      // 等待 DOM 渲染完成后再计算位置
      // 使用双重 requestAnimationFrame 确保 DOM 已完全渲染
      const rafId1 = requestAnimationFrame(() => {
        const rafId2 = requestAnimationFrame(() => {
          if (tooltipRef.current && triggerRef.current) {
            updatePosition();
          }
        });
        return () => cancelAnimationFrame(rafId2);
      });
      return () => cancelAnimationFrame(rafId1);
    }
  }, [isOpen, mounted, updatePosition]);

  // 当 tooltip 挂载后立即更新位置（用于确保位置正确）
  useEffect(() => {
    if (mounted && isOpen) {
      // 多次尝试更新位置，确保 tooltip 已完全渲染
      const timer1 = setTimeout(() => {
        if (tooltipRef.current && triggerRef.current) {
          updatePosition();
        }
      }, 0);
      
      const timer2 = setTimeout(() => {
        if (tooltipRef.current && triggerRef.current) {
          updatePosition();
        }
      }, 10);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [mounted, isOpen, updatePosition]);

  // 窗口变化时更新位置
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => updatePosition();
    const handleScroll = () => updatePosition();

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, [isOpen, updatePosition]);

  // 清理定时器
  useEffect(() => {
    return () => {
      clearTimeout(enterTimerRef.current);
      clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // 如果没有 title，直接返回 children
  if (title === undefined || title === null || title === '') {
    return <>{children}</>;
  }

  // 检查子元素是否是原生 DOM 元素（如 button, span, a 等）
  const child = isValidElement(children) ? children : <span>{children}</span>;
  const isNativeElement = typeof (child as React.ReactElement).type === 'string';
  
  const triggerProps = getTriggerProps();
  
  let triggerElement: React.ReactElement;
  
  if (isNativeElement) {
    // 如果是原生 DOM 元素，直接克隆并添加事件
    const childProps = (child as React.ReactElement).props;
    const mergedProps: any = {
      ref: triggerRef,
      ...triggerProps,
      className: [
        childProps.className,
        className,
      ]
        .filter(Boolean)
        .join(' '),
      style: { ...style, ...childProps.style },
    };

    // 合并事件处理函数
    const mergeEventHandler = (
      tooltipHandler?: (e: any) => void,
      childHandler?: (e: any) => void
    ) => {
      if (tooltipHandler && childHandler) {
        return (e: any) => {
          tooltipHandler(e);
          childHandler(e);
        };
      }
      return tooltipHandler || childHandler;
    };

    mergedProps.onClick = mergeEventHandler(triggerProps.onClick, childProps.onClick);
    mergedProps.onMouseEnter = mergeEventHandler(triggerProps.onMouseEnter, childProps.onMouseEnter);
    mergedProps.onMouseLeave = mergeEventHandler(triggerProps.onMouseLeave, childProps.onMouseLeave);
    mergedProps.onFocus = mergeEventHandler(triggerProps.onFocus, childProps.onFocus);
    mergedProps.onBlur = mergeEventHandler(triggerProps.onBlur, childProps.onBlur);
    mergedProps.onContextMenu = mergeEventHandler(triggerProps.onContextMenu, childProps.onContextMenu);

    triggerElement = cloneElement(child as React.ReactElement, mergedProps);
  } else {
    // 如果是 React 组件（如 Button），用 span 包裹并绑定事件
    const childProps = (child as React.ReactElement).props;
    triggerElement = (
      <span
        ref={triggerRef}
        className={className}
        style={{ display: 'inline-block', ...style }}
        {...triggerProps}
      >
        {cloneElement(child as React.ReactElement, {
          ...childProps,
          // 合并子组件的 onClick（如果有）
          onClick: triggerProps.onClick && childProps.onClick
            ? (e: React.MouseEvent) => {
                triggerProps.onClick?.(e);
                childProps.onClick?.(e);
              }
            : childProps.onClick,
        })}
      </span>
    );
  }

  // 是否使用预设颜色
  const isPreset = isPresetColor(color);

  // Tooltip 内容
  const tooltipClassNames = [
    'kage-tooltip',
    `kage-tooltip-placement-${actualPlacement}`,
    isPreset && `kage-tooltip-${color}`,
    !isPreset && 'kage-tooltip-custom-color',
    !arrow && 'kage-tooltip-no-arrow',
    overlayClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const tooltipStyle: CSSProperties = {
    ...overlayStyle,
    position: 'absolute',
    top: position.top,
    left: position.left,
    zIndex,
    // 先渲染 tooltip（即使位置还没计算），这样 updatePosition 才能获取到 tooltip 的尺寸
    // 使用 opacity 控制显示，但保持 visibility: visible 以便 getBoundingClientRect 能获取到尺寸
    ...(isOpen ? { opacity: positionCalculated ? 1 : 0, visibility: 'visible' } : { opacity: 0, visibility: 'hidden' }),
  };

  const innerStyle: CSSProperties = {
    ...overlayInnerStyle,
    ...(!isPreset && color ? { backgroundColor: color } : {}),
  };

  const arrowStyle: CSSProperties = !isPreset && color ? { '--arrow-color': color } as CSSProperties : {};

  // 是否需要渲染
  // 简化：只要 isOpen 为 true 就渲染，不依赖其他状态
  // mounted 用于控制 tooltip 的显示状态（opacity），而不是渲染状态
  const shouldRender = isOpen;

  // 获取容器
  const container = getPopupContainer?.() || document.body;

  // 渲染 Tooltip
  const tooltipNode = shouldRender ? (
    <div
      ref={tooltipRef}
      className={tooltipClassNames}
      style={tooltipStyle}
      onMouseEnter={triggers.includes('hover') ? handleShow : undefined}
      onMouseLeave={triggers.includes('hover') ? handleHide : undefined}
    >
      {arrow && <div className="kage-tooltip-arrow" style={arrowStyle} />}
      <div className="kage-tooltip-inner" style={innerStyle}>
        {title}
      </div>
    </div>
  ) : null;

  return (
    <>
      {triggerElement}
      {createPortal(tooltipNode, container)}
    </>
  );
};

export default Tooltip;

