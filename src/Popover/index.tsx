import React, { useState, useRef, useCallback, useEffect, ReactNode, CSSProperties } from 'react';
import './style.less';

export type PopoverPlacement =
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

export type PopoverTrigger = 'hover' | 'click' | 'focus';

// ============ Popover Props ============
export interface PopoverProps {
  /** 卡片内容 */
  content?: ReactNode;
  /** 卡片标题 */
  title?: ReactNode;
  /** 触发行为 */
  trigger?: PopoverTrigger;
  /** 气泡框位置 */
  placement?: PopoverPlacement;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 是否显示（受控） */
  open?: boolean;
  /** 默认是否显示 */
  defaultOpen?: boolean;
  /** 显示隐藏的回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 触发元素 */
  children?: ReactNode;
}

// ============ Popover Component ============
export const Popover: React.FC<PopoverProps> = ({
  content,
  title,
  trigger = 'hover',
  placement = 'top',
  arrow = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
  style,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const updateOpen = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [controlledOpen, onOpenChange]
  );

  const show = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    updateOpen(true);
  }, [updateOpen]);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      updateOpen(false);
    }, 100);
  }, [updateOpen]);

  const toggle = useCallback(() => {
    updateOpen(!isOpen);
  }, [isOpen, updateOpen]);

  // 点击外部关闭
  useEffect(() => {
    if (trigger === 'click' && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          popoverRef.current &&
          !popoverRef.current.contains(e.target as Node)
        ) {
          updateOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [trigger, isOpen, updateOpen]);

  const triggerProps: any = {};
  if (trigger === 'hover') {
    triggerProps.onMouseEnter = show;
    triggerProps.onMouseLeave = hide;
  } else if (trigger === 'click') {
    triggerProps.onClick = toggle;
  } else if (trigger === 'focus') {
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;
  }

  const popoverProps: any = {};
  if (trigger === 'hover') {
    popoverProps.onMouseEnter = show;
    popoverProps.onMouseLeave = hide;
  }

  const popoverClassNames = [
    'kage-popover',
    `kage-popover-placement-${placement}`,
    isOpen ? 'kage-popover-open' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="kage-popover-wrapper">
      <div ref={triggerRef} className="kage-popover-trigger" {...triggerProps}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={popoverRef}
          className={popoverClassNames}
          style={style}
          {...popoverProps}
        >
          {arrow && <div className="kage-popover-arrow" />}
          <div className="kage-popover-inner">
            {title && <div className="kage-popover-title">{title}</div>}
            <div className="kage-popover-content">{content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popover;

