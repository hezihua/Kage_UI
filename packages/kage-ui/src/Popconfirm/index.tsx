import React, { useState, useRef, useCallback, useEffect, ReactNode, CSSProperties, cloneElement, isValidElement } from 'react';
import { createPortal } from 'react-dom';
import './style.less';

export type PopconfirmPlacement =
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

export type PopconfirmTrigger = 'hover' | 'click' | 'focus';

// ============ Popconfirm Props ============
export interface PopconfirmProps {
  /** 确认框的描述 */
  title?: ReactNode;
  /** 确认框的描述 */
  description?: ReactNode;
  /** 触发行为 */
  trigger?: PopconfirmTrigger;
  /** 气泡框位置 */
  placement?: PopconfirmPlacement;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 是否显示（受控） */
  open?: boolean;
  /** 默认是否显示 */
  defaultOpen?: boolean;
  /** 显示隐藏的回调 */
  onOpenChange?: (open: boolean) => void;
  /** 点击确认的回调 */
  onConfirm?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 点击取消的回调 */
  onCancel?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  /** 确认按钮文字 */
  okText?: ReactNode;
  /** 取消按钮文字 */
  cancelText?: ReactNode;
  /** 确认按钮类型 */
  okType?: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  /** 确认按钮 loading */
  okButtonProps?: {
    loading?: boolean;
    disabled?: boolean;
    [key: string]: any;
  };
  /** 取消按钮 loading */
  cancelButtonProps?: {
    loading?: boolean;
    disabled?: boolean;
    [key: string]: any;
  };
  /** 自定义图标 */
  icon?: ReactNode;
  /** 是否显示图标 */
  showCancel?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 触发元素 */
  children?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
}

// ============ Popconfirm Component ============
export const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  trigger = 'click',
  placement = 'top',
  arrow = true,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  onConfirm,
  onCancel,
  okText = '确定',
  cancelText = '取消',
  okType = 'primary',
  okButtonProps,
  cancelButtonProps,
  icon,
  showCancel = true,
  className = '',
  style,
  children,
  disabled = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popconfirmRef = useRef<HTMLDivElement>(null);
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
    if (disabled) return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
    updateOpen(true);
  }, [disabled, updateOpen]);

  const hide = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      updateOpen(false);
      timerRef.current = undefined;
    }, 100);
  }, [updateOpen]);

  const toggle = useCallback(() => {
    if (disabled) return;
    updateOpen(!isOpen);
  }, [disabled, isOpen, updateOpen]);

  // 处理确认
  const handleConfirm = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onConfirm?.(e);
      if (!e.defaultPrevented) {
        updateOpen(false);
      }
    },
    [onConfirm, updateOpen]
  );

  // 处理取消
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCancel?.(e);
      if (!e.defaultPrevented) {
        updateOpen(false);
      }
    },
    [onCancel, updateOpen]
  );

  // 点击外部关闭
  useEffect(() => {
    if (trigger === 'click' && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          triggerRef.current &&
          !triggerRef.current.contains(e.target as Node) &&
          popconfirmRef.current &&
          !popconfirmRef.current.contains(e.target as Node)
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

  // 计算位置（使用 fixed 定位，直接使用 getBoundingClientRect 的值）
  const getPosition = useCallback(() => {
    if (!triggerRef.current || !popconfirmRef.current) {
      return { top: 0, left: 0 };
    }

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popconfirmRect = popconfirmRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;

    const gap = arrow ? 12 : 8;
    const padding = 8; // 距离视口边缘的最小距离

    switch (placement) {
      case 'top':
        top = triggerRect.top - popconfirmRect.height - gap;
        left = triggerRect.left + (triggerRect.width - popconfirmRect.width) / 2;
        // 确保不超出视口
        if (left < padding) left = padding;
        if (left + popconfirmRect.width > viewportWidth - padding) {
          left = viewportWidth - popconfirmRect.width - padding;
        }
        break;
      case 'topLeft':
        top = triggerRect.top - popconfirmRect.height - gap;
        left = triggerRect.left;
        if (left < padding) left = padding;
        break;
      case 'topRight':
        top = triggerRect.top - popconfirmRect.height - gap;
        left = triggerRect.right - popconfirmRect.width;
        if (left + popconfirmRect.width > viewportWidth - padding) {
          left = viewportWidth - popconfirmRect.width - padding;
        }
        break;
      case 'bottom':
        top = triggerRect.bottom + gap;
        left = triggerRect.left + (triggerRect.width - popconfirmRect.width) / 2;
        // 确保不超出视口
        if (left < padding) left = padding;
        if (left + popconfirmRect.width > viewportWidth - padding) {
          left = viewportWidth - popconfirmRect.width - padding;
        }
        break;
      case 'bottomLeft':
        top = triggerRect.bottom + gap;
        left = triggerRect.left;
        if (left < padding) left = padding;
        break;
      case 'bottomRight':
        top = triggerRect.bottom + gap;
        left = triggerRect.right - popconfirmRect.width;
        if (left + popconfirmRect.width > viewportWidth - padding) {
          left = viewportWidth - popconfirmRect.width - padding;
        }
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - popconfirmRect.height) / 2;
        left = triggerRect.left - popconfirmRect.width - gap;
        // 确保不超出视口
        if (top < padding) top = padding;
        if (top + popconfirmRect.height > viewportHeight - padding) {
          top = viewportHeight - popconfirmRect.height - padding;
        }
        break;
      case 'leftTop':
        top = triggerRect.top;
        left = triggerRect.left - popconfirmRect.width - gap;
        if (top < padding) top = padding;
        break;
      case 'leftBottom':
        top = triggerRect.bottom - popconfirmRect.height;
        left = triggerRect.left - popconfirmRect.width - gap;
        if (top + popconfirmRect.height > viewportHeight - padding) {
          top = viewportHeight - popconfirmRect.height - padding;
        }
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - popconfirmRect.height) / 2;
        left = triggerRect.right + gap;
        // 确保不超出视口
        if (top < padding) top = padding;
        if (top + popconfirmRect.height > viewportHeight - padding) {
          top = viewportHeight - popconfirmRect.height - padding;
        }
        break;
      case 'rightTop':
        top = triggerRect.top;
        left = triggerRect.right + gap;
        if (top < padding) top = padding;
        break;
      case 'rightBottom':
        top = triggerRect.bottom - popconfirmRect.height;
        left = triggerRect.right + gap;
        if (top + popconfirmRect.height > viewportHeight - padding) {
          top = viewportHeight - popconfirmRect.height - padding;
        }
        break;
    }

    return { top, left };
  }, [placement, arrow]);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [positionCalculated, setPositionCalculated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPositionCalculated(false);
      // 使用 requestAnimationFrame 确保 DOM 已渲染
      const updatePosition = () => {
        if (triggerRef.current && popconfirmRef.current) {
          setPosition(getPosition());
          setPositionCalculated(true);
        }
      };

      // 延迟更新位置，确保元素已渲染
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          updatePosition();
        });
      });

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    } else {
      setPositionCalculated(false);
    }
  }, [isOpen, getPosition]);

  const triggerProps: any = {};
  // 只有 click 触发才绑定到 children 上
  if (trigger === 'click') {
    triggerProps.onClick = toggle;
  }

  const classNames = [
    'kage-popconfirm-wrapper',
    disabled && 'kage-popconfirm-wrapper-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const popconfirmClassNames = [
    'kage-popconfirm',
    `kage-popconfirm-placement-${placement}`,
    arrow && 'kage-popconfirm-arrow',
    isOpen && 'kage-popconfirm-open',
  ]
    .filter(Boolean)
    .join(' ');

  // 渲染触发元素
  const renderTrigger = () => {
    if (!children) return null;

    if (isValidElement(children)) {
      return cloneElement(children as React.ReactElement<any>, {
        ...triggerProps,
        disabled: disabled || (children.props as any)?.disabled,
      });
    }

    return (
      <span
        {...triggerProps}
        style={{ display: 'inline-block' }}
      >
        {children}
      </span>
    );
  };

  // 默认图标
  const defaultIcon = icon !== undefined ? icon : '⚠';

  // Popconfirm 的鼠标事件（用于 hover 触发）
  const popconfirmProps: any = {};
  if (trigger === 'hover') {
    popconfirmProps.onMouseEnter = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = undefined;
      }
    };
    popconfirmProps.onMouseLeave = hide;
  }

  const popconfirmNode = isOpen ? (
    <div
      ref={popconfirmRef}
      className={popconfirmClassNames}
      style={{
        position: 'fixed',
        top: positionCalculated ? `${position.top}px` : '-9999px',
        left: positionCalculated ? `${position.left}px` : '-9999px',
        zIndex: 1050,
        visibility: positionCalculated ? 'visible' : 'hidden',
      }}
      {...popconfirmProps}
    >
      {arrow && <div className="kage-popconfirm-arrow" />}
      <div className="kage-popconfirm-inner">
        {defaultIcon && <div className="kage-popconfirm-icon">{defaultIcon}</div>}
        <div className="kage-popconfirm-content">
          {title && <div className="kage-popconfirm-title">{title}</div>}
          {description && <div className="kage-popconfirm-description">{description}</div>}
          <div className="kage-popconfirm-buttons">
            {showCancel && (
              <button
                type="button"
                className="kage-popconfirm-cancel-btn"
                onClick={handleCancel}
                disabled={cancelButtonProps?.disabled}
              >
                {cancelText}
              </button>
            )}
            <button
              type="button"
              className={`kage-popconfirm-ok-btn kage-popconfirm-ok-btn-${okType}`}
              onClick={handleConfirm}
              disabled={okButtonProps?.disabled || okButtonProps?.loading}
            >
              {okButtonProps?.loading ? '加载中...' : okText}
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;

  // 在 wrapper 上绑定事件（用于 hover 和 focus 触发）
  const wrapperProps: any = {};
  if (trigger === 'hover') {
    wrapperProps.onMouseEnter = (e: React.MouseEvent) => {
      e.stopPropagation();
      show();
    };
    wrapperProps.onMouseLeave = (e: React.MouseEvent) => {
      e.stopPropagation();
      hide();
    };
  } else if (trigger === 'focus') {
    wrapperProps.onFocus = (e: React.FocusEvent) => {
      e.stopPropagation();
      show();
    };
    wrapperProps.onBlur = (e: React.FocusEvent) => {
      e.stopPropagation();
      // 延迟检查，确保焦点没有移动到 Popconfirm 内部
      setTimeout(() => {
        if (
          popconfirmRef.current &&
          !popconfirmRef.current.contains(document.activeElement)
        ) {
          hide();
        }
      }, 0);
    };
    wrapperProps.tabIndex = 0;
  }

  return (
    <>
      <div
        className={classNames}
        style={style}
        ref={triggerRef}
        {...wrapperProps}
      >
        {renderTrigger()}
      </div>
      {createPortal(popconfirmNode, document.body)}
    </>
  );
};

export default Popconfirm;

