import React, { useState, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './style.less';

// ============ 类型定义 ============

/** Drawer 位置 */
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

/** Drawer 属性 */
export interface DrawerProps {
  /** 是否显示 */
  open?: boolean;
  /** 默认是否显示 */
  defaultOpen?: boolean;
  /** 显示隐藏的回调 */
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /** 关闭后的回调 */
  afterOpenChange?: (open: boolean) => void;
  /** 标题 */
  title?: ReactNode;
  /** 内容 */
  children?: ReactNode;
  /** 抽屉的位置 */
  placement?: DrawerPlacement;
  /** 是否显示遮罩 */
  mask?: boolean;
  /** 点击遮罩是否关闭 */
  maskClosable?: boolean;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: ReactNode;
  /** 自定义遮罩样式 */
  maskStyle?: CSSProperties;
  /** 自定义主体内容样式 */
  bodyStyle?: CSSProperties;
  /** 自定义头部样式 */
  headerStyle?: CSSProperties;
  /** 自定义底部样式 */
  footerStyle?: CSSProperties;
  /** 底部内容 */
  footer?: ReactNode;
  /** 宽度（placement 为 left 或 right 时） */
  width?: number | string;
  /** 高度（placement 为 top 或 bottom 时） */
  height?: number | string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** z-index */
  zIndex?: number;
  /** 是否支持键盘 ESC 关闭 */
  keyboard?: boolean;
  /** 是否在关闭时销毁 Drawer 里的子元素 */
  destroyOnClose?: boolean;
  /** 是否显示遮罩背景 */
  maskClassName?: string;
}

// ============ Drawer 组件 ============
export const Drawer: React.FC<DrawerProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onClose,
  afterOpenChange,
  title,
  children,
  placement = 'right',
  mask = true,
  maskClosable = true,
  closable = true,
  closeIcon,
  maskStyle,
  bodyStyle,
  headerStyle,
  footerStyle,
  footer,
  width = 378,
  height = 378,
  className = '',
  style,
  zIndex = 1000,
  keyboard = true,
  destroyOnClose = false,
  maskClassName = '',
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [visible, setVisible] = useState(defaultOpen);
  const [mounted, setMounted] = useState(defaultOpen);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  // 更新打开状态
  const updateOpen = useCallback(
    (newOpen: boolean) => {
      if (controlledOpen === undefined) {
        setInternalOpen(newOpen);
      }
      setVisible(newOpen);
      if (newOpen) {
        setMounted(true);
      }
      afterOpenChange?.(newOpen);
    },
    [controlledOpen, afterOpenChange]
  );

  // 处理关闭
  const handleClose = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      onClose?.(e);
      if (!e.defaultPrevented) {
        updateOpen(false);
      }
    },
    [onClose, updateOpen]
  );

  // 处理遮罩点击
  const handleMaskClick = useCallback(
    (e: React.MouseEvent) => {
      if (maskClosable && e.target === e.currentTarget) {
        handleClose(e);
      }
    },
    [maskClosable, handleClose]
  );

  // 键盘 ESC 关闭
  useEffect(() => {
    if (keyboard && isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose(e as any);
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [keyboard, isOpen, handleClose]);

  // 监听 open 变化
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // 使用 requestAnimationFrame 确保 DOM 更新后再显示
      requestAnimationFrame(() => {
        setVisible(true);
      });
    } else {
      setVisible(false);
      // 等待动画完成后再卸载（如果 destroyOnClose）
      if (destroyOnClose) {
        const timer = setTimeout(() => {
          setMounted(false);
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, destroyOnClose]);

  // 阻止 body 滚动
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!mounted) {
    return null;
  }

  const drawerClassNames = [
    'kage-drawer',
    `kage-drawer-${placement}`,
    visible && 'kage-drawer-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const maskClassNames = [
    'kage-drawer-mask',
    visible && 'kage-drawer-mask-open',
    maskClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const sizeStyle: CSSProperties = {};
  if (placement === 'left' || placement === 'right') {
    sizeStyle.width = typeof width === 'number' ? `${width}px` : width;
  } else {
    sizeStyle.height = typeof height === 'number' ? `${height}px` : height;
  }

  const drawerContent = (
    <>
      {mask && (
        <div
          className={maskClassNames}
          style={{ zIndex, ...maskStyle }}
          onClick={handleMaskClick}
        />
      )}
      <div
        className={drawerClassNames}
        style={{ zIndex, ...sizeStyle, ...style }}
        role="dialog"
        aria-modal="true"
      >
        {title !== undefined || closable ? (
          <div className="kage-drawer-header" style={headerStyle}>
            {title && <div className="kage-drawer-title">{title}</div>}
            {closable && (
              <button
                type="button"
                className="kage-drawer-close"
                onClick={handleClose}
                aria-label="关闭"
              >
                {closeIcon || '×'}
              </button>
            )}
          </div>
        ) : null}
        <div className="kage-drawer-body" style={bodyStyle}>
          {children}
        </div>
        {footer && (
          <div className="kage-drawer-footer" style={footerStyle}>
            {footer}
          </div>
        )}
      </div>
    </>
  );

  return createPortal(drawerContent, document.body);
};

export default Drawer;

