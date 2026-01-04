import React, { useState, useEffect, useCallback, useRef } from 'react';
import './style.less';

// ============ Anchor Link 锚点链接 ============
export interface AnchorLinkProps {
  /** 锚点链接 */
  href: string;
  /** 显示文字 */
  title: React.ReactNode;
  /** 子链接 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  title,
  children,
  className = '',
}) => {
  // 这个组件主要用于声明式配置，实际渲染在 Anchor 中处理
  return null;
};

AnchorLink.displayName = 'AnchorLink';

// ============ Anchor 锚点组件 ============
export interface AnchorItem {
  key: string;
  href: string;
  title: React.ReactNode;
  children?: AnchorItem[];
}

export interface AnchorProps {
  /** 锚点配置列表 */
  items?: AnchorItem[];
  /** 固定模式 */
  affix?: boolean;
  /** 距离窗口顶部达到指定偏移量后触发 */
  offsetTop?: number;
  /** 锚点滚动偏移量 */
  targetOffset?: number;
  /** 滚动容器 */
  getContainer?: () => HTMLElement | Window;
  /** 是否显示小圆点 */
  showInkInFixed?: boolean;
  /** 点击锚点回调 */
  onClick?: (e: React.MouseEvent, link: { title: React.ReactNode; href: string }) => void;
  /** 滚动变化回调 */
  onChange?: (currentActiveLink: string) => void;
  /** 当前激活的锚点 */
  getCurrentAnchor?: (activeLink: string) => string;
  /** 方向 */
  direction?: 'vertical' | 'horizontal';
  /** 是否禁用滚动监听（静态模式） */
  replace?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// 获取元素距离顶部的距离
const getOffsetTop = (element: HTMLElement, container: HTMLElement | Window): number => {
  if (!element || typeof window === 'undefined') return 0;
  
  const rect = element.getBoundingClientRect();
  
  if (container === window) {
    return rect.top + window.scrollY;
  }
  
  const containerEl = container as HTMLElement;
  return rect.top - containerEl.getBoundingClientRect().top + containerEl.scrollTop;
};

// 获取当前滚动位置
const getScrollTop = (container: HTMLElement | Window): number => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return 0;
  
  if (container === window) {
    return window.scrollY || document.documentElement.scrollTop;
  }
  return (container as HTMLElement).scrollTop;
};

// 滚动到指定元素
const scrollToElement = (
  element: HTMLElement,
  container: HTMLElement | Window,
  offset: number = 0
) => {
  if (typeof window === 'undefined') return;
  
  const rect = element.getBoundingClientRect();
  
  if (container === window) {
    const targetTop = rect.top + window.scrollY - offset;
    window.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  } else {
    const containerEl = container as HTMLElement;
    const targetTop = rect.top - containerEl.getBoundingClientRect().top + containerEl.scrollTop - offset;
    containerEl.scrollTo({
      top: targetTop,
      behavior: 'smooth',
    });
  }
};

export const Anchor: React.FC<AnchorProps> & { Link: typeof AnchorLink } = ({
  items,
  affix = false,
  offsetTop = 0,
  targetOffset = 0,
  getContainer = () => window,
  showInkInFixed = false,
  onClick,
  onChange,
  getCurrentAnchor,
  direction = 'vertical',
  replace = false,
  children,
  className = '',
  style,
}) => {
  const [activeLink, setActiveLink] = useState<string>('');
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>({});
  const anchorRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Map<string, HTMLElement>>(new Map());

  // 从 children 解析 items
  const getItemsFromChildren = useCallback((): AnchorItem[] => {
    if (items) return items;
    
    const result: AnchorItem[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && (child.type as any)?.displayName === 'AnchorLink') {
        const { href, title, children: subChildren } = child.props as AnchorLinkProps;
        const item: AnchorItem = {
          key: href,
          href,
          title,
        };
        
        if (subChildren) {
          item.children = [];
          React.Children.forEach(subChildren, (subChild) => {
            if (React.isValidElement(subChild) && (subChild.type as any)?.displayName === 'AnchorLink') {
              const subProps = subChild.props as AnchorLinkProps;
              item.children!.push({
                key: subProps.href,
                href: subProps.href,
                title: subProps.title,
              });
            }
          });
        }
        
        result.push(item);
      }
    });
    
    return result;
  }, [items, children]);

  const anchorItems = getItemsFromChildren();

  // 获取所有链接
  const getAllLinks = useCallback((itemList: AnchorItem[]): string[] => {
    const links: string[] = [];
    itemList.forEach((item) => {
      links.push(item.href);
      if (item.children) {
        links.push(...getAllLinks(item.children));
      }
    });
    return links;
  }, []);

  // 更新墨点位置
  const updateInk = useCallback((href: string) => {
    if (!href) {
      setInkStyle({ opacity: 0 });
      return;
    }

    const linkEl = linksRef.current.get(href);
    if (!linkEl || !anchorRef.current) return;

    const anchorRect = anchorRef.current.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    if (direction === 'vertical') {
      setInkStyle({
        top: linkRect.top - anchorRect.top + linkRect.height / 2 - 4,
        opacity: 1,
      });
    } else {
      // 水平方向：墨点在链接下方居中
      setInkStyle({
        left: linkRect.left - anchorRect.left + (linkRect.width - 20) / 2,
        opacity: 1,
      });
    }
  }, [direction]);

  // 滚动监听（replace 模式下不监听）
  useEffect(() => {
    if (replace) return;

    const container = getContainer();
    const links = getAllLinks(anchorItems);

    const handleScroll = () => {
      let currentActive = '';
      
      // 找到当前视口中最靠近顶部的锚点
      if (typeof document === 'undefined') return;
      
      for (const href of links) {
        const targetId = href.startsWith('#') ? href.slice(1) : href;
        const element = document.getElementById(targetId);
        
        if (element) {
          const rect = element.getBoundingClientRect();
          // 元素顶部在视口顶部 + 偏移量之上，说明已经滚动过了这个锚点
          if (rect.top <= targetOffset + 100) {
            currentActive = href;
          }
        }
      }

      if (currentActive !== activeLink) {
        const finalActive = getCurrentAnchor ? getCurrentAnchor(currentActive) : currentActive;
        setActiveLink(finalActive);
        onChange?.(finalActive);
        updateInk(finalActive);
      }
    };

    container.addEventListener('scroll', handleScroll);
    // 初始化时延迟执行，确保 DOM 已渲染
    const timer = setTimeout(handleScroll, 100);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [anchorItems, getContainer, targetOffset, activeLink, onChange, getCurrentAnchor, getAllLinks, updateInk, replace]);

  // 处理点击
  const handleClick = (e: React.MouseEvent, item: AnchorItem) => {
    e.preventDefault();
    
    // replace 模式下不滚动，只更新状态
    if (!replace && typeof document !== 'undefined') {
      const targetId = item.href.startsWith('#') ? item.href.slice(1) : item.href;
      const element = document.getElementById(targetId);
      const container = getContainer();

      if (element) {
        scrollToElement(element, container, targetOffset);
      }
    }

    setActiveLink(item.href);
    updateInk(item.href);
    onClick?.(e, { title: item.title, href: item.href });
  };

  // 渲染链接
  const renderLink = (item: AnchorItem, level: number = 0) => {
    const isActive = activeLink === item.href;
    
    return (
      <div key={item.key} className="kage-anchor-link-wrapper">
        <a
          ref={(el) => {
            if (el) linksRef.current.set(item.href, el);
          }}
          className={`kage-anchor-link ${isActive ? 'kage-anchor-link-active' : ''}`}
          href={item.href}
          title={typeof item.title === 'string' ? item.title : undefined}
          onClick={(e) => handleClick(e, item)}
          style={{ paddingLeft: direction === 'vertical' ? 16 + level * 16 : undefined }}
        >
          {item.title}
        </a>
        {item.children && item.children.length > 0 && (
          <div className="kage-anchor-link-children">
            {item.children.map((child) => renderLink(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const classNames = [
    'kage-anchor',
    `kage-anchor-${direction}`,
    affix && 'kage-anchor-fixed',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const anchorStyle: React.CSSProperties = {
    ...style,
    ...(affix ? { position: 'fixed', top: offsetTop } : {}),
  };

  return (
    <div ref={anchorRef} className={classNames} style={anchorStyle}>
      {(showInkInFixed || !affix) && (
        <span
          className={`kage-anchor-ink ${activeLink ? 'kage-anchor-ink-visible' : ''}`}
          style={inkStyle}
        />
      )}
      <div className="kage-anchor-content">
        {anchorItems.map((item) => renderLink(item))}
      </div>
    </div>
  );
};

Anchor.Link = AnchorLink;
Anchor.displayName = 'Anchor';

export default Anchor;

