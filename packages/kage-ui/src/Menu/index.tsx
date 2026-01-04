import React, { useState, useCallback, createContext, useContext } from 'react';
import './style.less';

// ============ Menu Item Types ============
export interface MenuItemType {
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
  /** 子菜单 */
  children?: MenuItemType[];
  /** 类型 */
  type?: 'group' | 'divider';
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
}

// ============ Menu Context ============
interface MenuContextType {
  mode: 'vertical' | 'horizontal' | 'inline';
  selectedKeys: string[];
  openKeys: string[];
  inlineCollapsed: boolean;
  onSelect: (key: string) => void;
  onOpenChange: (keys: string[]) => void;
}

const MenuContext = createContext<MenuContextType>({
  mode: 'vertical',
  selectedKeys: [],
  openKeys: [],
  inlineCollapsed: false,
  onSelect: () => {},
  onOpenChange: () => {},
});

// ============ Menu Item Component ============
interface MenuItemProps {
  item: MenuItemType;
  level?: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, level = 0 }) => {
  const { mode, selectedKeys, openKeys, inlineCollapsed, onSelect, onOpenChange } = useContext(MenuContext);
  
  const isSelected = selectedKeys.includes(item.key);
  const isOpen = openKeys.includes(item.key);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (item.disabled) return;
    
    if (hasChildren) {
      // 切换子菜单展开状态
      const newOpenKeys = isOpen
        ? openKeys.filter(k => k !== item.key)
        : [...openKeys, item.key];
      onOpenChange(newOpenKeys);
    } else {
      item.onClick?.(e);
      onSelect(item.key);
    }
  };

  // 分割线
  if (item.type === 'divider') {
    return <div className="kage-menu-divider" />;
  }

  // 分组
  if (item.type === 'group') {
    return (
      <div className="kage-menu-item-group">
        <div className="kage-menu-item-group-title">{item.label}</div>
        <div className="kage-menu-item-group-list">
          {item.children?.map(child => (
            <MenuItem key={child.key} item={child} level={level} />
          ))}
        </div>
      </div>
    );
  }

  const classNames = [
    'kage-menu-item',
    isSelected && 'kage-menu-item-selected',
    item.disabled && 'kage-menu-item-disabled',
    item.danger && 'kage-menu-item-danger',
    hasChildren && 'kage-menu-submenu',
    hasChildren && isOpen && 'kage-menu-submenu-open',
  ].filter(Boolean).join(' ');

  const paddingLeft = mode === 'inline' && !inlineCollapsed ? 24 + level * 24 : undefined;

  return (
    <div className={classNames}>
      <div
        className="kage-menu-item-content"
        style={{ paddingLeft }}
        onClick={handleClick}
      >
        {item.icon && <span className="kage-menu-item-icon">{item.icon}</span>}
        {(!inlineCollapsed || mode !== 'inline') && (
          <span className="kage-menu-item-label">{item.label}</span>
        )}
        {hasChildren && !inlineCollapsed && (
          <span className={`kage-menu-item-arrow ${isOpen ? 'kage-menu-item-arrow-open' : ''}`}>
            {mode === 'horizontal' ? '▼' : '▶'}
          </span>
        )}
      </div>
      
      {/* 子菜单 */}
      {hasChildren && (
        <div className={`kage-menu-submenu-content ${isOpen ? 'kage-menu-submenu-content-open' : ''}`}>
          {item.children?.map(child => (
            <MenuItem key={child.key} item={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

// ============ Menu Props ============
export interface MenuProps {
  /** 菜单项 */
  items?: MenuItemType[];
  /** 菜单模式 */
  mode?: 'vertical' | 'horizontal' | 'inline';
  /** 选中的菜单项 key */
  selectedKeys?: string[];
  /** 默认选中的菜单项 key */
  defaultSelectedKeys?: string[];
  /** 展开的子菜单 key */
  openKeys?: string[];
  /** 默认展开的子菜单 key */
  defaultOpenKeys?: string[];
  /** inline 模式下是否收起菜单 */
  inlineCollapsed?: boolean;
  /** 选中菜单项回调 */
  onSelect?: (info: { key: string; selectedKeys: string[] }) => void;
  /** 展开/收起子菜单回调 */
  onOpenChange?: (openKeys: string[]) => void;
  /** 点击菜单项回调 */
  onClick?: (info: { key: string; domEvent: React.MouseEvent }) => void;
  /** 主题 */
  theme?: 'light' | 'dark';
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// ============ Menu Component ============
export const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItemComponent;
  SubMenu: typeof SubMenuComponent;
  ItemGroup: typeof ItemGroupComponent;
  Divider: typeof DividerComponent;
} = ({
  items,
  mode = 'vertical',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  inlineCollapsed = false,
  onSelect,
  onOpenChange,
  onClick,
  theme = 'light',
  className = '',
  style,
  children,
}) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys);

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const openKeys = controlledOpenKeys ?? internalOpenKeys;

  const handleSelect = useCallback((key: string) => {
    const newSelectedKeys = [key];
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys(newSelectedKeys);
    }
    onSelect?.({ key, selectedKeys: newSelectedKeys });
  }, [controlledSelectedKeys, onSelect]);

  const handleOpenChange = useCallback((keys: string[]) => {
    if (controlledOpenKeys === undefined) {
      setInternalOpenKeys(keys);
    }
    onOpenChange?.(keys);
  }, [controlledOpenKeys, onOpenChange]);

  const classNames = [
    'kage-menu',
    `kage-menu-${mode}`,
    `kage-menu-${theme}`,
    inlineCollapsed && 'kage-menu-inline-collapsed',
    className,
  ].filter(Boolean).join(' ');

  const contextValue: MenuContextType = {
    mode,
    selectedKeys,
    openKeys,
    inlineCollapsed,
    onSelect: handleSelect,
    onOpenChange: handleOpenChange,
  };

  return (
    <MenuContext.Provider value={contextValue}>
      <div className={classNames} style={style}>
        {items?.map(item => (
          <MenuItem key={item.key} item={item} />
        ))}
        {children}
      </div>
    </MenuContext.Provider>
  );
};

// ============ Menu.Item Component ============
export interface MenuItemComponentProps {
  key?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
  className?: string;
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
  icon,
  disabled,
  danger,
  onClick,
  children,
  className = '',
}) => {
  const { selectedKeys, onSelect } = useContext(MenuContext);
  const key = (children as any)?.key || String(Math.random());
  const isSelected = selectedKeys.includes(key);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;
    onClick?.(e);
    onSelect(key);
  };

  const classNames = [
    'kage-menu-item',
    isSelected && 'kage-menu-item-selected',
    disabled && 'kage-menu-item-disabled',
    danger && 'kage-menu-item-danger',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="kage-menu-item-content" onClick={handleClick}>
        {icon && <span className="kage-menu-item-icon">{icon}</span>}
        <span className="kage-menu-item-label">{children}</span>
      </div>
    </div>
  );
};

// ============ Menu.SubMenu Component ============
export interface SubMenuComponentProps {
  key?: string;
  title: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
}

const SubMenuComponent: React.FC<SubMenuComponentProps> = ({
  title,
  icon,
  disabled,
  children,
}) => {
  const { openKeys, onOpenChange, inlineCollapsed, mode } = useContext(MenuContext);
  const key = String(Math.random());
  const isOpen = openKeys.includes(key);

  const handleClick = () => {
    if (disabled) return;
    const newOpenKeys = isOpen
      ? openKeys.filter(k => k !== key)
      : [...openKeys, key];
    onOpenChange(newOpenKeys);
  };

  const classNames = [
    'kage-menu-item',
    'kage-menu-submenu',
    isOpen && 'kage-menu-submenu-open',
    disabled && 'kage-menu-item-disabled',
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      <div className="kage-menu-item-content" onClick={handleClick}>
        {icon && <span className="kage-menu-item-icon">{icon}</span>}
        {(!inlineCollapsed || mode !== 'inline') && (
          <span className="kage-menu-item-label">{title}</span>
        )}
        {!inlineCollapsed && (
          <span className={`kage-menu-item-arrow ${isOpen ? 'kage-menu-item-arrow-open' : ''}`}>
            ▶
          </span>
        )}
      </div>
      <div className={`kage-menu-submenu-content ${isOpen ? 'kage-menu-submenu-content-open' : ''}`}>
        {children}
      </div>
    </div>
  );
};

// ============ Menu.ItemGroup Component ============
export interface ItemGroupComponentProps {
  title: React.ReactNode;
  children?: React.ReactNode;
}

const ItemGroupComponent: React.FC<ItemGroupComponentProps> = ({ title, children }) => {
  return (
    <div className="kage-menu-item-group">
      <div className="kage-menu-item-group-title">{title}</div>
      <div className="kage-menu-item-group-list">{children}</div>
    </div>
  );
};

// ============ Menu.Divider Component ============
const DividerComponent: React.FC = () => {
  return <div className="kage-menu-divider" />;
};

// 挂载子组件
Menu.Item = MenuItemComponent;
Menu.SubMenu = SubMenuComponent;
Menu.ItemGroup = ItemGroupComponent;
Menu.Divider = DividerComponent;

export default Menu;

