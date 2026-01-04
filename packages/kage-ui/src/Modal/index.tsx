import React, { useState, useEffect, useCallback, ReactNode, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import './style.less';

// ============ 类型定义 ============

/** Modal 属性 */
export interface ModalProps {
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
  /** 宽度 */
  width?: number | string;
  /** 是否居中显示 */
  centered?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** z-index */
  zIndex?: number;
  /** 是否支持键盘 ESC 关闭 */
  keyboard?: boolean;
  /** 是否在关闭时销毁 Modal 里的子元素 */
  destroyOnClose?: boolean;
  /** 是否显示遮罩背景 */
  maskClassName?: string;
  /** 确认按钮文字 */
  okText?: ReactNode;
  /** 取消按钮文字 */
  cancelText?: ReactNode;
  /** 确认按钮 loading */
  confirmLoading?: boolean;
  /** 点击确定回调 */
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 点击取消回调 */
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ============ Modal 组件 ============
export const Modal: React.FC<ModalProps> = ({
  open: controlledOpen,
  defaultOpen = false,
  onClose,
  afterOpenChange,
  title,
  children,
  mask = true,
  maskClosable = true,
  closable = true,
  closeIcon,
  maskStyle,
  bodyStyle,
  headerStyle,
  footerStyle,
  footer,
  width = 520,
  centered = false,
  className = '',
  style,
  zIndex = 1000,
  keyboard = true,
  destroyOnClose = false,
  maskClassName = '',
  okText = '确定',
  cancelText = '取消',
  confirmLoading = false,
  onOk,
  onCancel,
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

  // 处理取消
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCancel?.(e);
      if (!e.defaultPrevented) {
        handleClose(e);
      }
    },
    [onCancel, handleClose]
  );

  // 处理确定
  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOk?.(e);
      // 如果 onOk 阻止了默认行为，则不关闭
      if (e.defaultPrevented) {
        return;
      }
      // 默认情况下，点击确定后自动关闭
      handleClose(e);
    },
    [onOk, handleClose]
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

  const modalClassNames = [
    'kage-modal',
    visible && 'kage-modal-open',
    centered && 'kage-modal-centered',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const maskClassNames = [
    'kage-modal-mask',
    visible && 'kage-modal-mask-open',
    maskClassName,
  ]
    .filter(Boolean)
    .join(' ');

  const widthStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
  };

  // 渲染默认底部
  const renderDefaultFooter = () => {
    if (footer !== undefined) {
      return footer;
    }
    return (
      <div className="kage-modal-footer">
        <button
          type="button"
          className="kage-modal-cancel-btn"
          onClick={handleCancel}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className="kage-modal-ok-btn"
          onClick={handleOk}
          disabled={confirmLoading}
        >
          {confirmLoading ? '加载中...' : okText}
        </button>
      </div>
    );
  };

  const modalContent = (
    <>
      {mask && (
        <div
          className={maskClassNames}
          style={{ zIndex, ...maskStyle }}
          onClick={handleMaskClick}
        />
      )}
      <div
        className={modalClassNames}
        style={{ zIndex, ...style }}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kage-modal-wrap" style={widthStyle}>
          {title !== undefined || closable ? (
            <div className="kage-modal-header" style={headerStyle}>
              {title && <div className="kage-modal-title">{title}</div>}
              {closable && (
                <button
                  type="button"
                  className="kage-modal-close"
                  onClick={handleClose}
                  aria-label="关闭"
                >
                  {closeIcon || '×'}
                </button>
              )}
            </div>
          ) : null}
          <div className="kage-modal-body" style={bodyStyle}>
            {children}
          </div>
          {footer !== null && (
            <div className="kage-modal-footer-wrapper" style={footerStyle}>
              {renderDefaultFooter()}
            </div>
          )}
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;

