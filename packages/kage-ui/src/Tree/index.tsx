import React, { useState, useCallback, useMemo, ReactNode, CSSProperties } from 'react';
import './style.less';

// ============ 类型定义 ============

/** 树节点数据 */
export interface TreeNode {
  /** 唯一标识 */
  key: string;
  /** 节点标题 */
  title: ReactNode;
  /** 子节点 */
  children?: TreeNode[];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否可选择 */
  selectable?: boolean;
  /** 是否为叶子节点 */
  isLeaf?: boolean;
  /** 图标 */
  icon?: ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 其他属性 */
  [key: string]: any;
}

/** 选择模式 */
export type TreeSelectMode = 'single' | 'multiple' | 'checkbox';

/** Tree 属性 */
export interface TreeProps {
  /** 树形数据 */
  treeData?: TreeNode[];
  /** 当前选中的节点 key */
  selectedKeys?: string[];
  /** 默认选中的节点 key */
  defaultSelectedKeys?: string[];
  /** 当前展开的节点 key */
  expandedKeys?: string[];
  /** 默认展开的节点 key */
  defaultExpandedKeys?: string[];
  /** 是否默认展开所有节点 */
  defaultExpandAll?: boolean;
  /** 是否显示复选框 */
  checkable?: boolean;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示连接线 */
  showLine?: boolean;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 自定义图标 */
  icon?: (props: { expanded: boolean; isLeaf: boolean }) => ReactNode;
  /** 节点点击回调 */
  onSelect?: (selectedKeys: string[], info: { node: TreeNode; selected: boolean; nativeEvent: MouseEvent }) => void;
  /** 节点展开/收起回调 */
  onExpand?: (expandedKeys: string[], info: { node: TreeNode; expanded: boolean }) => void;
  /** 节点双击回调 */
  onDoubleClick?: (e: React.MouseEvent, node: TreeNode) => void;
  /** 节点右键回调 */
  onRightClick?: (e: React.MouseEvent, node: TreeNode) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
  /** 自定义节点渲染 */
  titleRender?: (node: TreeNode) => ReactNode;
  /** 块节点 */
  blockNode?: boolean;
}

// ============ Tree 组件 ============

export const Tree: React.FC<TreeProps> = ({
  treeData = [],
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  expandedKeys: controlledExpandedKeys,
  defaultExpandedKeys = [],
  defaultExpandAll = false,
  checkable = false,
  multiple = false,
  disabled = false,
  showLine = false,
  showIcon = false,
  icon,
  onSelect,
  onExpand,
  onDoubleClick,
  onRightClick,
  className = '',
  style,
  titleRender,
  blockNode = false,
}) => {
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalExpandedKeys, setInternalExpandedKeys] = useState<string[]>(() => {
    if (defaultExpandAll) {
      const getAllKeys = (nodes: TreeNode[]): string[] => {
        const keys: string[] = [];
        nodes.forEach((node) => {
          if (node.children && node.children.length > 0) {
            keys.push(node.key);
            keys.push(...getAllKeys(node.children));
          }
        });
        return keys;
      };
      return getAllKeys(treeData);
    }
    return defaultExpandedKeys;
  });

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const expandedKeys = controlledExpandedKeys ?? internalExpandedKeys;

  // 处理节点选择
  const handleSelect = useCallback(
    (node: TreeNode, e: React.MouseEvent) => {
      if (node.disabled || node.selectable === false || disabled) return;

      const isSelected = selectedKeys.includes(node.key);
      let newSelectedKeys: string[];

      if (checkable || multiple) {
        // 多选模式
        if (isSelected) {
          newSelectedKeys = selectedKeys.filter((key) => key !== node.key);
        } else {
          newSelectedKeys = [...selectedKeys, node.key];
        }
      } else {
        // 单选模式
        newSelectedKeys = isSelected ? [] : [node.key];
      }

      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys(newSelectedKeys);
      }

      onSelect?.(newSelectedKeys, {
        node,
        selected: !isSelected,
        nativeEvent: e.nativeEvent,
      });
    },
    [selectedKeys, checkable, multiple, disabled, controlledSelectedKeys, onSelect]
  );

  // 处理节点展开/收起
  const handleExpand = useCallback(
    (node: TreeNode, e: React.MouseEvent) => {
      e.stopPropagation();
      if (node.disabled || disabled) return;

      const isExpanded = expandedKeys.includes(node.key);
      const newExpandedKeys = isExpanded
        ? expandedKeys.filter((key) => key !== node.key)
        : [...expandedKeys, node.key];

      if (controlledExpandedKeys === undefined) {
        setInternalExpandedKeys(newExpandedKeys);
      }

      onExpand?.(newExpandedKeys, {
        node,
        expanded: !isExpanded,
      });
    },
    [expandedKeys, disabled, controlledExpandedKeys, onExpand]
  );

  // 渲染树节点
  const renderTreeNode = useCallback(
    (node: TreeNode, level: number = 0): ReactNode => {
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedKeys.includes(node.key);
      const isSelected = selectedKeys.includes(node.key);
      const isDisabled = node.disabled || disabled;
      const isLeaf = node.isLeaf ?? !hasChildren;

      const nodeClassNames = [
        'kage-tree-treenode',
        isSelected && 'kage-tree-treenode-selected',
        isDisabled && 'kage-tree-treenode-disabled',
        blockNode && 'kage-tree-treenode-block-node',
        node.className,
      ]
        .filter(Boolean)
        .join(' ');

      // 渲染图标
      const renderIcon = () => {
        if (showIcon && icon) {
          return <span className="kage-tree-icon">{icon({ expanded: isExpanded, isLeaf })}</span>;
        }
        if (showIcon && node.icon) {
          return <span className="kage-tree-icon">{node.icon}</span>;
        }
        return null;
      };

      // 渲染展开/收起图标
      const renderSwitcher = () => {
        if (isLeaf) {
          return <span className="kage-tree-switcher kage-tree-switcher-noop" />;
        }
        return (
          <span
            className={`kage-tree-switcher ${isExpanded ? 'kage-tree-switcher-open' : 'kage-tree-switcher-close'}`}
            onClick={(e) => handleExpand(node, e)}
          >
            {showLine ? (isExpanded ? '▼' : '▶') : (isExpanded ? '▼' : '▶')}
          </span>
        );
      };

      // 渲染复选框
      const renderCheckbox = () => {
        if (!checkable) return null;
        return (
          <span
            className={`kage-tree-checkbox ${isSelected ? 'kage-tree-checkbox-checked' : ''} ${isDisabled ? 'kage-tree-checkbox-disabled' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect(node, e);
            }}
          >
            {isSelected && '✓'}
          </span>
        );
      };

      return (
        <div key={node.key} className={nodeClassNames} style={node.style}>
          <div
            className="kage-tree-node-content"
            style={{ paddingLeft: `${level * 24}px` }}
            onClick={(e) => !checkable && handleSelect(node, e)}
            onDoubleClick={(e) => onDoubleClick?.(e, node)}
            onContextMenu={(e) => onRightClick?.(e, node)}
          >
            {renderSwitcher()}
            {renderCheckbox()}
            {renderIcon()}
            <span className="kage-tree-title">
              {titleRender ? titleRender(node) : node.title}
            </span>
          </div>

          {hasChildren && isExpanded && (
            <div className="kage-tree-child-tree">
              {node.children!.map((child) => renderTreeNode(child, level + 1))}
            </div>
          )}
        </div>
      );
    },
    [
      expandedKeys,
      selectedKeys,
      disabled,
      checkable,
      showIcon,
      icon,
      showLine,
      blockNode,
      titleRender,
      handleSelect,
      handleExpand,
      onDoubleClick,
      onRightClick,
    ]
  );

  const classNames = ['kage-tree', showLine && 'kage-tree-show-line', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} style={style}>
      {treeData.map((node) => renderTreeNode(node, 0))}
    </div>
  );
};

export default Tree;

