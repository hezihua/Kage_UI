import React, { useState, useCallback, CSSProperties, ReactNode } from 'react';
import './style.less';

// ============ Collapse Item Props ============
export interface CollapseItemProps {
  /** 唯一标识符 */
  key?: string | number;
  /** 面板头内容 */
  header: ReactNode;
  /** 面板内容 */
  children?: ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外的类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义展开图标 */
  showArrow?: boolean;
  /** 额外的右侧内容 */
  extra?: ReactNode;
}

// ============ Collapse Props ============
export interface CollapseProps {
  /** 当前激活的面板 */
  activeKey?: string | string[] | number | number[];
  /** 默认激活的面板 */
  defaultActiveKey?: string | string[] | number | number[];
  /** 是否手风琴模式 */
  accordion?: boolean;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 切换面板的回调 */
  onChange?: (key: string | string[] | number | number[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 子元素 */
  children?: ReactNode;
  /** 展开图标位置 */
  expandIconPosition?: 'start' | 'end';
  /** 是否可折叠 */
  collapsible?: 'header' | 'disabled';
  /** 销毁隐藏的面板 */
  destroyInactivePanel?: boolean;
}

// ============ Collapse Item Component ============
export const CollapseItem: React.FC<CollapseItemProps & {
  isActive?: boolean;
  onToggle?: () => void;
  expandIconPosition?: 'start' | 'end';
  collapsible?: 'header' | 'disabled';
  destroyInactivePanel?: boolean;
}> = ({
  header,
  children,
  disabled = false,
  className = '',
  style,
  showArrow = true,
  extra,
  isActive = false,
  onToggle,
  expandIconPosition = 'start',
  collapsible = 'header',
  destroyInactivePanel = false,
}) => {
  const handleClick = useCallback(() => {
    if (disabled || collapsible === 'disabled') return;
    onToggle?.();
  }, [disabled, collapsible, onToggle]);

  const classNames = [
    'kage-collapse-item',
    isActive ? 'kage-collapse-item-active' : '',
    disabled ? 'kage-collapse-item-disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const headerClassNames = [
    'kage-collapse-header',
    expandIconPosition === 'end' ? 'kage-collapse-header-icon-end' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      <div className={headerClassNames} onClick={handleClick}>
        {showArrow && (
          <span className={`kage-collapse-arrow ${isActive ? 'kage-collapse-arrow-active' : ''}`}>
            ▸
          </span>
        )}
        <div className="kage-collapse-header-text">{header}</div>
        {extra && <div className="kage-collapse-extra">{extra}</div>}
      </div>
      <div
        className={`kage-collapse-content ${isActive ? 'kage-collapse-content-active' : ''}`}
      >
        <div className="kage-collapse-content-box">
          {destroyInactivePanel ? (isActive ? children : null) : children}
        </div>
      </div>
    </div>
  );
};

// ============ Collapse Component ============
export const Collapse: React.FC<CollapseProps> & {
  Item: typeof CollapseItem;
} = ({
  activeKey: controlledActiveKey,
  defaultActiveKey = [],
  accordion = false,
  bordered = true,
  onChange,
  className = '',
  style,
  children,
  expandIconPosition = 'start',
  collapsible = 'header',
  destroyInactivePanel = false,
}) => {
  // 内部状态
  const [internalActiveKey, setInternalActiveKey] = useState<string | string[] | number | number[]>(
    defaultActiveKey
  );

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  // 规范化 activeKey 为数组
  const activeKeys = Array.isArray(activeKey) ? activeKey : [activeKey];
  const activeKeysSet = new Set(activeKeys.map(String));

  // 切换面板
  const togglePanel = useCallback(
    (key: string | number) => {
      const keyStr = String(key);
      let newActiveKey: string | string[] | number | number[];

      if (accordion) {
        // 手风琴模式：只允许一个面板展开
        newActiveKey = activeKeysSet.has(keyStr) ? [] : [key];
      } else {
        // 普通模式：允许多个面板展开
        if (activeKeysSet.has(keyStr)) {
          newActiveKey = activeKeys.filter((k) => String(k) !== keyStr);
        } else {
          newActiveKey = [...activeKeys, key];
        }
      }

      if (controlledActiveKey === undefined) {
        setInternalActiveKey(newActiveKey);
      }

      onChange?.(newActiveKey);
    },
    [accordion, activeKeys, activeKeysSet, controlledActiveKey, onChange]
  );

  const classNames = [
    'kage-collapse',
    bordered ? 'kage-collapse-bordered' : 'kage-collapse-borderless',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 处理子元素
  const items = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;

    const key = child.key ?? index;
    const isActive = activeKeysSet.has(String(key));

    return React.cloneElement(child as React.ReactElement<any>, {
      isActive,
      onToggle: () => togglePanel(key),
      expandIconPosition,
      collapsible,
      destroyInactivePanel,
    });
  });

  return (
    <div className={classNames} style={style}>
      {items}
    </div>
  );
};

// 绑定子组件
Collapse.Item = CollapseItem;

export default Collapse;

