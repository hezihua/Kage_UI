import React, { useState, useRef, useEffect, useCallback } from 'react';
import './style.less';

// ============ Menu Item Type ============
export interface DropdownMenuItem {
  /** 唯一标识 */
  key: string;
  /** 显示内容 */
  label: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否危险操作 */
  danger?: boolean;
  /** 分割线 */
  type?: 'divider';
  /** 子菜单 */
  children?: DropdownMenuItem[];
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
}

export interface DropdownMenuProps {
  /** 菜单项 */
  items: DropdownMenuItem[];
  /** 选中的key */
  selectedKeys?: string[];
  /** 点击菜单项回调 */
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
}

// ============ Dropdown Props ============
export type DropdownPlacement = 
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight';

export type DropdownTrigger = 'hover' | 'click' | 'contextMenu';

export interface DropdownProps {
  /** 菜单项 */
  menu?: DropdownMenuProps;
  /** 自定义下拉内容 */
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  /** 触发下拉的元素 */
  children: React.ReactNode;
  /** 触发方式 */
  trigger?: DropdownTrigger[];
  /** 弹出位置 */
  placement?: DropdownPlacement;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 受控的显示状态 */
  open?: boolean;
  /** 显示状态变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 下拉菜单类名 */
  overlayClassName?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 下拉菜单样式 */
  overlayStyle?: React.CSSProperties;
  /** 关闭后是否销毁 */
  destroyPopupOnHide?: boolean;
  /** 自动调整位置 */
  autoAdjustOverflow?: boolean;
}

// ============ Dropdown Menu Component ============
const DropdownMenu: React.FC<{
  items: DropdownMenuItem[];
  selectedKeys?: string[];
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
  onClose?: () => void;
}> = ({ items, selectedKeys = [], onClick, onClose }) => {
  const handleItemClick = (item: DropdownMenuItem, e: React.MouseEvent) => {
    if (item.disabled) return;
    
    item.onClick?.(e);
    onClick?.({ key: item.key, domEvent: e });
    
    // 如果没有子菜单，关闭下拉
    if (!item.children) {
      onClose?.();
    }
  };

  const renderMenuItem = (item: DropdownMenuItem) => {
    if (item.type === 'divider') {
      return <div key={item.key} className="kage-dropdown-menu-divider" />;
    }

    const isSelected = selectedKeys.includes(item.key);
    const classNames = [
      'kage-dropdown-menu-item',
      item.disabled && 'kage-dropdown-menu-item-disabled',
      item.danger && 'kage-dropdown-menu-item-danger',
      isSelected && 'kage-dropdown-menu-item-selected',
    ].filter(Boolean).join(' ');

    return (
      <div
        key={item.key}
        className={classNames}
        onClick={(e) => handleItemClick(item, e)}
      >
        {item.icon && <span className="kage-dropdown-menu-item-icon">{item.icon}</span>}
        <span className="kage-dropdown-menu-item-label">{item.label}</span>
        {item.children && <span className="kage-dropdown-menu-item-arrow">▶</span>}
      </div>
    );
  };

  return (
    <div className="kage-dropdown-menu">
      {items.map(renderMenuItem)}
    </div>
  );
};

// ============ Dropdown Component ============
export const Dropdown: React.FC<DropdownProps> = ({
  menu,
  dropdownRender,
  children,
  trigger = ['hover'],
  placement = 'bottomLeft',
  disabled = false,
  arrow = false,
  open: controlledOpen,
  onOpenChange,
  className = '',
  overlayClassName = '',
  style,
  overlayStyle,
  destroyPopupOnHide = false,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback((newOpen: boolean) => {
    if (disabled) return;
    
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [disabled, isControlled, onOpenChange]);

  const handleMouseEnter = useCallback(() => {
    if (!trigger.includes('hover')) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setOpen(true);
  }, [trigger, setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (!trigger.includes('hover')) return;
    
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 100);
  }, [trigger, setOpen]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (!trigger.includes('click')) return;
    e.stopPropagation();
    setOpen(!isOpen);
  }, [trigger, isOpen, setOpen]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (!trigger.includes('contextMenu')) return;
    e.preventDefault();
    setOpen(true);
  }, [trigger, setOpen]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setOpen]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const containerClassNames = [
    'kage-dropdown',
    disabled && 'kage-dropdown-disabled',
    className,
  ].filter(Boolean).join(' ');

  const overlayClassNames = [
    'kage-dropdown-overlay',
    `kage-dropdown-placement-${placement}`,
    arrow && 'kage-dropdown-overlay-arrow',
    isOpen && 'kage-dropdown-overlay-open',
    overlayClassName,
  ].filter(Boolean).join(' ');

  // 渲染菜单内容
  const renderMenuContent = () => {
    if (!menu?.items) return null;
    
    const menuNode = (
      <DropdownMenu
        items={menu.items}
        selectedKeys={menu.selectedKeys}
        onClick={menu.onClick}
        onClose={() => setOpen(false)}
      />
    );

    return dropdownRender ? dropdownRender(menuNode) : menuNode;
  };

  const shouldRenderOverlay = isOpen || !destroyPopupOnHide;

  return (
    <div
      ref={containerRef}
      className={containerClassNames}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="kage-dropdown-trigger"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
      >
        {children}
      </div>
      
      {shouldRenderOverlay && (
        <div
          ref={dropdownRef}
          className={overlayClassNames}
          style={overlayStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {arrow && <div className="kage-dropdown-arrow" />}
          {renderMenuContent()}
        </div>
      )}
    </div>
  );
};

// ============ Dropdown Button ============
export interface DropdownButtonProps extends Omit<DropdownProps, 'children'> {
  /** 按钮文字 */
  children?: React.ReactNode;
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  /** 按钮大小 */
  size?: 'small' | 'middle' | 'large';
  /** 是否加载中 */
  loading?: boolean;
  /** 是否危险按钮 */
  danger?: boolean;
  /** 左侧按钮点击回调 */
  onClick?: (e: React.MouseEvent) => void;
  /** 按钮图标 */
  icon?: React.ReactNode;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  children,
  type = 'default',
  size = 'middle',
  loading = false,
  danger = false,
  onClick,
  icon,
  ...dropdownProps
}) => {
  const buttonClassNames = [
    'kage-dropdown-button',
    `kage-dropdown-button-${type}`,
    `kage-dropdown-button-${size}`,
    danger && 'kage-dropdown-button-danger',
    loading && 'kage-dropdown-button-loading',
  ].filter(Boolean).join(' ');

  return (
    <div className="kage-dropdown-button-group">
      <button
        className={`${buttonClassNames} kage-dropdown-button-left`}
        onClick={onClick}
        disabled={loading || dropdownProps.disabled}
      >
        {loading && <span className="kage-dropdown-button-loading-icon">⏳</span>}
        {icon && <span className="kage-dropdown-button-icon">{icon}</span>}
        {children}
      </button>
      <Dropdown {...dropdownProps}>
        <button
          className={`${buttonClassNames} kage-dropdown-button-right`}
          disabled={loading || dropdownProps.disabled}
        >
          <span className="kage-dropdown-button-dropdown-icon">▼</span>
        </button>
      </Dropdown>
    </div>
  );
};

// 挂载子组件
type DropdownType = typeof Dropdown & {
  Button: typeof DropdownButton;
};

const ExportDropdown = Dropdown as DropdownType;
ExportDropdown.Button = DropdownButton;

export default ExportDropdown;

