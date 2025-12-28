import React from 'react';
import './style.less';

// ============ Breadcrumb Item ============
export interface BreadcrumbItemType {
  /** 唯一标识 */
  key?: string;
  /** 链接地址 */
  href?: string;
  /** 显示文字 */
  title: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 点击回调 */
  onClick?: (e: React.MouseEvent) => void;
  /** 下拉菜单项 */
  menu?: {
    items: { key: string; title: React.ReactNode; href?: string; onClick?: () => void }[];
  };
  /** 自定义类名 */
  className?: string;
}

export interface BreadcrumbItemProps extends BreadcrumbItemType {
  /** 子元素 */
  children?: React.ReactNode;
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href,
  title,
  icon,
  onClick,
  children,
  className = '',
}) => {
  const content = children || (
    <>
      {icon && <span className="kage-breadcrumb-icon">{icon}</span>}
      {title}
    </>
  );

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e);
  };

  if (href) {
    return (
      <a
        href={href}
        className={`kage-breadcrumb-link ${className}`}
        onClick={handleClick}
      >
        {content}
      </a>
    );
  }

  return (
    <span
      className={`kage-breadcrumb-link ${className}`}
      onClick={handleClick}
    >
      {content}
    </span>
  );
};

BreadcrumbItem.displayName = 'BreadcrumbItem';

// ============ Breadcrumb Separator ============
export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
}

export const BreadcrumbSeparator: React.FC<BreadcrumbSeparatorProps> = ({
  children = '/',
}) => {
  return <span className="kage-breadcrumb-separator">{children}</span>;
};

BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ============ Breadcrumb ============
export interface BreadcrumbProps {
  /** 面包屑配置项 */
  items?: BreadcrumbItemType[];
  /** 分隔符 */
  separator?: React.ReactNode;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: typeof BreadcrumbItem;
  Separator: typeof BreadcrumbSeparator;
} = ({
  items,
  separator = '/',
  children,
  className = '',
  style,
}) => {
  const classNames = ['kage-breadcrumb', className].filter(Boolean).join(' ');

  // 如果有 items 配置，使用配置渲染
  if (items && items.length > 0) {
    return (
      <nav className={classNames} style={style} aria-label="breadcrumb">
        <ol className="kage-breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const key = item.key || index;

            return (
              <li key={key} className="kage-breadcrumb-item">
                <BreadcrumbItem
                  href={isLast ? undefined : item.href}
                  title={item.title}
                  icon={item.icon}
                  onClick={item.onClick}
                  className={isLast ? 'kage-breadcrumb-link-current' : ''}
                />
                {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // 使用 children 渲染
  const childArray = React.Children.toArray(children);
  
  return (
    <nav className={classNames} style={style} aria-label="breadcrumb">
      <ol className="kage-breadcrumb-list">
        {childArray.map((child, index) => {
          const isLast = index === childArray.length - 1;
          
          // 如果是 Separator，直接渲染
          if (React.isValidElement(child) && (child.type as any)?.displayName === 'BreadcrumbSeparator') {
            return child;
          }

          return (
            <li key={index} className="kage-breadcrumb-item">
              {React.isValidElement(child) 
                ? React.cloneElement(child as React.ReactElement<any>, {
                    className: `${(child.props as any).className || ''} ${isLast ? 'kage-breadcrumb-link-current' : ''}`.trim(),
                  })
                : child
              }
              {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;

