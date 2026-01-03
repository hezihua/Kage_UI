import React, { ReactNode, CSSProperties, useState, useEffect } from 'react';
import './style.less';

// ============ 类型定义 ============

/** FloatButton 类型 */
export type FloatButtonType = 'default' | 'primary';

/** FloatButton 形状 */
export type FloatButtonShape = 'circle' | 'square';

/** FloatButton 触发方式 */
export type FloatButtonTrigger = 'click' | 'hover';

/** FloatButton 属性 */
export interface FloatButtonProps {
  /** 图标 */
  icon?: ReactNode;
  /** 描述文字 */
  description?: ReactNode;
  /** 按钮类型 */
  type?: FloatButtonType;
  /** 按钮形状 */
  shape?: FloatButtonShape;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /** 工具提示 */
  tooltip?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否危险按钮 */
  danger?: boolean;
  /** 子元素 */
  children?: ReactNode;
}

/** FloatButtonGroup 属性 */
export interface FloatButtonGroupProps {
  /** 触发方式 */
  trigger?: FloatButtonTrigger;
  /** 是否打开 */
  open?: boolean;
  /** 默认是否打开 */
  defaultOpen?: boolean;
  /** 打开状态改变回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
}

// ============ FloatButton 组件 ============
export const FloatButton: React.FC<FloatButtonProps> & {
  Group: React.FC<FloatButtonGroupProps>;
} = ({
  icon,
  description,
  type = 'default',
  shape = 'circle',
  className = '',
  style,
  onClick,
  tooltip,
  disabled = false,
  danger = false,
  children,
}) => {
  const classNames = [
    'kage-float-btn',
    `kage-float-btn-${type}`,
    `kage-float-btn-${shape}`,
    danger && 'kage-float-btn-danger',
    disabled && 'kage-float-btn-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const content = children || icon;

  return (
    <div className="kage-float-btn-wrapper">
      {tooltip && (
        <div className="kage-float-btn-tooltip">{tooltip}</div>
      )}
      <button
        type="button"
        className={classNames}
        style={style}
        onClick={onClick}
        disabled={disabled}
        aria-label={description || tooltip}
      >
        {content}
      </button>
      {description && (
        <div className="kage-float-btn-description">{description}</div>
      )}
    </div>
  );
};

// ============ FloatButtonGroup 组件 ============
const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  trigger = 'click',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  className = '',
  style,
  children,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const updateOpen = (newOpen: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      updateOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      updateOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      updateOpen(false);
    }
  };

  const classNames = [
    'kage-float-btn-group',
    isOpen && 'kage-float-btn-group-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const groupProps: any = {};
  if (trigger === 'click') {
    groupProps.onClick = handleClick;
  } else if (trigger === 'hover') {
    groupProps.onMouseEnter = handleMouseEnter;
    groupProps.onMouseLeave = handleMouseLeave;
  }

  return (
    <div className={classNames} style={style} {...groupProps}>
      {children}
    </div>
  );
};

FloatButton.Group = FloatButtonGroup;

export default FloatButton;

