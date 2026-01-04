import React, { createContext, useContext, useState } from 'react';
import './style.less';

// ============ Layout Context ============
interface LayoutContextValue {
  siderCollapsed?: boolean;
  siderWidth?: number | string;
}

const LayoutContext = createContext<LayoutContextValue>({});

// ============ Layout 布局容器 ============
export interface LayoutProps {
  /** 是否有侧边栏（自动检测子组件） */
  hasSider?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

interface LayoutComponent extends React.FC<LayoutProps> {
  Header: typeof Header;
  Sider: typeof Sider;
  Content: typeof Content;
  Footer: typeof Footer;
}

const InternalLayout: React.FC<LayoutProps> = ({
  hasSider,
  children,
  className = '',
  style,
}) => {
  // 自动检测是否有 Sider
  const detectSider = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && (child.type as any)?.displayName === 'Sider'
  );

  const classNames = [
    'kage-layout',
    (hasSider || detectSider) && 'kage-layout-has-sider',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classNames} style={style}>
      {children}
    </section>
  );
};

// ============ Header 顶部布局 ============
export interface HeaderProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Header: React.FC<HeaderProps> = ({
  children,
  className = '',
  style,
}) => {
  const classNames = ['kage-layout-header', className].filter(Boolean).join(' ');

  return (
    <header className={classNames} style={style}>
      {children}
    </header>
  );
};

Header.displayName = 'Header';

// ============ Sider 侧边栏 ============
export interface SiderProps {
  /** 宽度 */
  width?: number | string;
  /** 收缩后的宽度 */
  collapsedWidth?: number | string;
  /** 是否可收起 */
  collapsible?: boolean;
  /** 是否收起状态 */
  collapsed?: boolean;
  /** 默认收起状态 */
  defaultCollapsed?: boolean;
  /** 收起时触发 */
  onCollapse?: (collapsed: boolean) => void;
  /** 触发器位置 */
  trigger?: React.ReactNode | null;
  /** 主题颜色 */
  theme?: 'light' | 'dark';
  /** 断点，触发响应式布局 */
  breakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Sider: React.FC<SiderProps> = ({
  width = 200,
  collapsedWidth = 80,
  collapsible = false,
  collapsed: controlledCollapsed,
  defaultCollapsed = false,
  onCollapse,
  trigger,
  theme = 'dark',
  children,
  className = '',
  style,
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  
  const isCollapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const currentWidth = isCollapsed ? collapsedWidth : width;

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapse?.(newCollapsed);
  };

  const classNames = [
    'kage-layout-sider',
    `kage-layout-sider-${theme}`,
    isCollapsed && 'kage-layout-sider-collapsed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const siderStyle: React.CSSProperties = {
    flex: `0 0 ${typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth}`,
    maxWidth: typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth,
    minWidth: typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth,
    width: typeof currentWidth === 'number' ? `${currentWidth}px` : currentWidth,
    ...style,
  };

  const defaultTrigger = (
    <div className="kage-layout-sider-trigger" onClick={handleCollapse}>
      <span className="kage-layout-sider-trigger-icon">
        {isCollapsed ? '▶' : '◀'}
      </span>
    </div>
  );

  return (
    <LayoutContext.Provider value={{ siderCollapsed: isCollapsed, siderWidth: currentWidth }}>
      <aside className={classNames} style={siderStyle}>
        <div className="kage-layout-sider-children">{children}</div>
        {collapsible && (trigger !== null ? (trigger || defaultTrigger) : null)}
      </aside>
    </LayoutContext.Provider>
  );
};

Sider.displayName = 'Sider';

// ============ Content 内容区 ============
export interface ContentProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Content: React.FC<ContentProps> = ({
  children,
  className = '',
  style,
}) => {
  const classNames = ['kage-layout-content', className].filter(Boolean).join(' ');

  return (
    <main className={classNames} style={style}>
      {children}
    </main>
  );
};

Content.displayName = 'Content';

// ============ Footer 底部布局 ============
export interface FooterProps {
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className = '',
  style,
}) => {
  const classNames = ['kage-layout-footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classNames} style={style}>
      {children}
    </footer>
  );
};

Footer.displayName = 'Footer';

// ============ 导出 ============
const Layout = InternalLayout as LayoutComponent;
Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;

export default Layout;

