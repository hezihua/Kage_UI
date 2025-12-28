import React, { useState, useCallback, useRef, useEffect } from 'react';
import './style.less';

// ============ Tab Item Type ============
export interface TabItem {
  /** 唯一标识 */
  key: string;
  /** 标签页标题 */
  label: React.ReactNode;
  /** 标签页内容 */
  children?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可关闭（editable-card 模式下生效） */
  closable?: boolean;
  /** 强制渲染（即使未激活也渲染） */
  forceRender?: boolean;
}

// ============ Tabs Props ============
export type TabsType = 'line' | 'card' | 'editable-card';
export type TabsPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TabsProps {
  /** 标签项 */
  items: TabItem[];
  /** 当前激活的标签 key */
  activeKey?: string;
  /** 默认激活的标签 key */
  defaultActiveKey?: string;
  /** 标签类型 */
  type?: TabsType;
  /** 标签位置 */
  tabPosition?: TabsPosition;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 是否居中 */
  centered?: boolean;
  /** 切换回调 */
  onChange?: (activeKey: string) => void;
  /** 新增标签回调（editable-card 模式下生效） */
  onEdit?: (targetKey: string | React.MouseEvent, action: 'add' | 'remove') => void;
  /** 右侧额外内容 */
  tabBarExtraContent?: React.ReactNode | { left?: React.ReactNode; right?: React.ReactNode };
  /** 销毁隐藏的标签页 */
  destroyInactiveTabPane?: boolean;
  /** 是否动画 */
  animated?: boolean | { inkBar?: boolean; tabPane?: boolean };
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ Tabs Component ============
export const Tabs: React.FC<TabsProps> = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  type = 'line',
  tabPosition = 'top',
  size = 'middle',
  centered = false,
  onChange,
  onEdit,
  tabBarExtraContent,
  destroyInactiveTabPane = false,
  animated = true,
  className = '',
  style,
}) => {
  const [internalActiveKey, setInternalActiveKey] = useState(
    defaultActiveKey || items[0]?.key || ''
  );
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  const activeKey = controlledActiveKey ?? internalActiveKey;

  // 更新 ink bar 位置
  const updateInkBar = useCallback(() => {
    if (!tabListRef.current) return;

    const activeTab = tabListRef.current.querySelector(
      `.kage-tabs-tab-active`
    ) as HTMLElement;

    if (activeTab) {
      const isVertical = tabPosition === 'left' || tabPosition === 'right';
      
      if (isVertical) {
        setInkStyle({
          top: activeTab.offsetTop,
          height: activeTab.offsetHeight,
        });
      } else {
        setInkStyle({
          left: activeTab.offsetLeft,
          width: activeTab.offsetWidth,
        });
      }
    }
  }, [tabPosition]);

  useEffect(() => {
    updateInkBar();
  }, [activeKey, items, updateInkBar]);

  useEffect(() => {
    window.addEventListener('resize', updateInkBar);
    return () => window.removeEventListener('resize', updateInkBar);
  }, [updateInkBar]);

  // 切换标签
  const handleTabClick = useCallback((key: string, disabled?: boolean) => {
    if (disabled) return;
    
    if (controlledActiveKey === undefined) {
      setInternalActiveKey(key);
    }
    onChange?.(key);
  }, [controlledActiveKey, onChange]);

  // 删除标签
  const handleRemove = useCallback((e: React.MouseEvent, key: string) => {
    e.stopPropagation();
    onEdit?.(key, 'remove');
  }, [onEdit]);

  // 新增标签
  const handleAdd = useCallback((e: React.MouseEvent) => {
    onEdit?.(e, 'add');
  }, [onEdit]);

  // 渲染额外内容
  const renderExtraContent = () => {
    if (!tabBarExtraContent) return null;

    if (typeof tabBarExtraContent === 'object' && ('left' in tabBarExtraContent || 'right' in tabBarExtraContent)) {
      return (
        <>
          {tabBarExtraContent.left && (
            <div className="kage-tabs-extra-left">{tabBarExtraContent.left}</div>
          )}
          {tabBarExtraContent.right && (
            <div className="kage-tabs-extra-right">{tabBarExtraContent.right}</div>
          )}
        </>
      );
    }

    return <div className="kage-tabs-extra-right">{tabBarExtraContent}</div>;
  };

  const classNames = [
    'kage-tabs',
    `kage-tabs-${type}`,
    `kage-tabs-${tabPosition}`,
    `kage-tabs-${size}`,
    centered && 'kage-tabs-centered',
    className,
  ].filter(Boolean).join(' ');

  const showInkBar = type === 'line' && (animated === true || (typeof animated === 'object' && animated.inkBar !== false));

  return (
    <div ref={tabsRef} className={classNames} style={style}>
      {/* 标签栏 */}
      <div className="kage-tabs-nav">
        {typeof tabBarExtraContent === 'object' && 'left' in tabBarExtraContent && (
          <div className="kage-tabs-extra-left">{tabBarExtraContent.left}</div>
        )}
        
        <div className="kage-tabs-nav-wrap">
          <div ref={tabListRef} className="kage-tabs-nav-list">
            {items.map((item) => {
              const isActive = item.key === activeKey;
              const tabClassNames = [
                'kage-tabs-tab',
                isActive && 'kage-tabs-tab-active',
                item.disabled && 'kage-tabs-tab-disabled',
              ].filter(Boolean).join(' ');

              return (
                <div
                  key={item.key}
                  className={tabClassNames}
                  onClick={() => handleTabClick(item.key, item.disabled)}
                >
                  {item.icon && <span className="kage-tabs-tab-icon">{item.icon}</span>}
                  <span className="kage-tabs-tab-label">{item.label}</span>
                  {type === 'editable-card' && item.closable !== false && (
                    <span
                      className="kage-tabs-tab-remove"
                      onClick={(e) => handleRemove(e, item.key)}
                    >
                      ×
                    </span>
                  )}
                </div>
              );
            })}

            {/* Ink Bar */}
            {showInkBar && (
              <div className="kage-tabs-ink-bar" style={inkStyle} />
            )}
          </div>
        </div>

        {/* 新增按钮 */}
        {type === 'editable-card' && (
          <button className="kage-tabs-nav-add" onClick={handleAdd}>
            +
          </button>
        )}

        {/* 额外内容 */}
        {tabBarExtraContent && !(typeof tabBarExtraContent === 'object' && 'left' in tabBarExtraContent) && (
          <div className="kage-tabs-extra-right">{tabBarExtraContent}</div>
        )}
        {typeof tabBarExtraContent === 'object' && 'right' in tabBarExtraContent && (
          <div className="kage-tabs-extra-right">{tabBarExtraContent.right}</div>
        )}
      </div>

      {/* 内容区域 */}
      <div className="kage-tabs-content">
        {items.map((item) => {
          const isActive = item.key === activeKey;
          const shouldRender = isActive || item.forceRender || !destroyInactiveTabPane;

          if (!shouldRender) return null;

          return (
            <div
              key={item.key}
              className={`kage-tabs-tabpane ${isActive ? 'kage-tabs-tabpane-active' : ''}`}
              style={{ display: isActive ? 'block' : 'none' }}
            >
              {item.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;

