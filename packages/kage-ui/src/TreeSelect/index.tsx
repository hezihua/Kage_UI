import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import './style.less';

// ============ TreeSelect 数据节点 ============
export interface TreeNode {
  key: string;
  title: string;
  value: string;
  children?: TreeNode[];
  disabled?: boolean;
  selectable?: boolean;
  isLeaf?: boolean;
  [key: string]: any;
}

// ============ TreeSelect Props ============
export interface TreeSelectProps {
  /** 树形数据 */
  treeData: TreeNode[];
  /** 当前选中的值 */
  value?: string | string[];
  /** 默认选中的值 */
  defaultValue?: string | string[];
  /** 占位符 */
  placeholder?: string;
  /** 是否多选 */
  multiple?: boolean;
  /** 是否显示复选框 */
  treeCheckable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 允许清除 */
  allowClear?: boolean;
  /** 是否显示搜索框 */
  showSearch?: boolean;
  /** 尺寸 */
  size?: 'large' | 'middle' | 'small';
  /** 状态 */
  status?: 'error' | 'warning';
  /** 默认展开所有 */
  defaultExpandAll?: boolean;
  /** 默认展开的节点 */
  defaultExpandedKeys?: string[];
  /** 自定义搜索函数 */
  filterTreeNode?: (inputValue: string, node: TreeNode) => boolean;
  /** 选中回调 */
  onChange?: (value: string | string[], label: string | string[], node: TreeNode | TreeNode[]) => void;
  /** 面板打开/关闭回调 */
  onDropdownVisibleChange?: (visible: boolean) => void;
  /** 搜索回调 */
  onSearch?: (value: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ============ TreeSelect Component ============
export const TreeSelect: React.FC<TreeSelectProps> = ({
  treeData,
  value: controlledValue,
  defaultValue,
  placeholder = '请选择',
  multiple = false,
  treeCheckable = false,
  disabled = false,
  allowClear = true,
  showSearch = false,
  size = 'middle',
  status,
  defaultExpandAll = false,
  defaultExpandedKeys = [],
  filterTreeNode,
  onChange,
  onDropdownVisibleChange,
  onSearch,
  className = '',
  style,
}) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(defaultValue ?? (multiple ? [] : ''));
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [expandedKeys, setExpandedKeys] = useState<string[]>(
    defaultExpandAll ? getAllKeys(treeData) : defaultExpandedKeys
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  // 获取所有节点的 key
  function getAllKeys(nodes: TreeNode[]): string[] {
    const keys: string[] = [];
    const traverse = (nodes: TreeNode[]) => {
      nodes.forEach((node) => {
        keys.push(node.key);
        if (node.children) {
          traverse(node.children);
        }
      });
    };
    traverse(nodes);
    return keys;
  }

  // 根据 key 查找节点
  const findNodeByKey = useCallback((key: string, nodes: TreeNode[] = treeData): TreeNode | null => {
    for (const node of nodes) {
      if (node.key === key) return node;
      if (node.children) {
        const found = findNodeByKey(key, node.children);
        if (found) return found;
      }
    }
    return null;
  }, [treeData]);

  // 获取显示的标签
  const getDisplayLabel = useMemo(() => {
    if (multiple && Array.isArray(value)) {
      return value.map((v) => findNodeByKey(v)?.title || v);
    }
    if (!multiple && typeof value === 'string') {
      return findNodeByKey(value)?.title || '';
    }
    return '';
  }, [value, multiple, findNodeByKey]);

  // 打开/关闭下拉
  const setOpen = useCallback((open: boolean) => {
    if (disabled) return;
    setIsOpen(open);
    onDropdownVisibleChange?.(open);
  }, [disabled, onDropdownVisibleChange]);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  // 切换展开状态
  const toggleExpand = useCallback((key: string) => {
    setExpandedKeys((prev) => {
      if (prev.includes(key)) {
        return prev.filter((k) => k !== key);
      } else {
        return [...prev, key];
      }
    });
  }, []);

  // 选择节点
  const handleSelect = useCallback((node: TreeNode) => {
    if (node.disabled || node.selectable === false) return;

    let newValue: string | string[];
    let newLabel: string | string[];
    let selectedNode: TreeNode | TreeNode[];

    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      if (currentValue.includes(node.value)) {
        newValue = currentValue.filter((v) => v !== node.value);
      } else {
        newValue = [...currentValue, node.value];
      }
      newLabel = newValue.map((v) => findNodeByKey(v)?.title || v);
      selectedNode = newValue.map((v) => findNodeByKey(v)).filter(Boolean) as TreeNode[];
    } else {
      newValue = node.value;
      newLabel = node.title;
      selectedNode = node;
      setOpen(false);
    }

    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue, newLabel, selectedNode);
  }, [multiple, value, controlledValue, findNodeByKey, onChange, setOpen]);

  // 清除
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = multiple ? [] : '';
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue, newValue, multiple ? [] : {} as TreeNode);
  }, [multiple, controlledValue, onChange]);

  // 搜索
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchValue(val);
    onSearch?.(val);

    // 搜索时展开所有匹配节点的父节点
    if (val) {
      const matchedKeys = getAllKeys(treeData).filter((key) => {
        const node = findNodeByKey(key);
        if (!node) return false;
        if (filterTreeNode) {
          return filterTreeNode(val, node);
        }
        return node.title.toLowerCase().includes(val.toLowerCase());
      });
      
      // 收集所有匹配节点的父节点
      const parentsToExpand: string[] = [];
      const collectParents = (nodes: TreeNode[], path: string[] = []) => {
        nodes.forEach((node) => {
          const currentPath = [...path, node.key];
          if (matchedKeys.includes(node.key) && path.length > 0) {
            parentsToExpand.push(...path);
          }
          if (node.children) {
            collectParents(node.children, currentPath);
          }
        });
      };
      collectParents(treeData);
      
      setExpandedKeys([...new Set([...expandedKeys, ...parentsToExpand])]);
    }
  }, [treeData, expandedKeys, filterTreeNode, findNodeByKey, onSearch]);

  // 过滤树节点
  const filterTree = useCallback((nodes: TreeNode[]): TreeNode[] => {
    if (!searchValue) return nodes;

    const filter = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        const matches = filterTreeNode
          ? filterTreeNode(searchValue, node)
          : node.title.toLowerCase().includes(searchValue.toLowerCase());

        if (node.children) {
          const filteredChildren = filter(node.children);
          if (filteredChildren.length > 0 || matches) {
            acc.push({ ...node, children: filteredChildren });
          }
        } else if (matches) {
          acc.push(node);
        }

        return acc;
      }, []);
    };

    return filter(nodes);
  }, [searchValue, filterTreeNode]);

  const filteredTreeData = useMemo(() => filterTree(treeData), [treeData, filterTree]);

  // 渲染树节点
  const renderTreeNode = (node: TreeNode, level: number = 0): React.ReactNode => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedKeys.includes(node.key);
    const isSelected = multiple
      ? Array.isArray(value) && value.includes(node.value)
      : value === node.value;
    const isDisabled = node.disabled || node.selectable === false;

    return (
      <div key={node.key} className="kage-treeselect-node">
        <div
          className={`kage-treeselect-node-content ${isSelected ? 'kage-treeselect-node-selected' : ''} ${isDisabled ? 'kage-treeselect-node-disabled' : ''}`}
          style={{ paddingLeft: `${level * 24 + 8}px` }}
        >
          {hasChildren && (
            <span
              className={`kage-treeselect-switcher ${isExpanded ? 'kage-treeselect-switcher-open' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.key);
              }}
            >
              ▸
            </span>
          )}
          {!hasChildren && <span className="kage-treeselect-switcher-noop" />}

          {treeCheckable && (
            <input
              type="checkbox"
              className="kage-treeselect-checkbox"
              checked={isSelected}
              disabled={isDisabled}
              onChange={() => handleSelect(node)}
            />
          )}

          <span
            className="kage-treeselect-node-title"
            onClick={() => !treeCheckable && handleSelect(node)}
          >
            {node.title}
          </span>
        </div>

        {hasChildren && isExpanded && (
          <div className="kage-treeselect-node-children">
            {node.children!.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const classNames = [
    'kage-treeselect',
    `kage-treeselect-${size}`,
    disabled && 'kage-treeselect-disabled',
    status && `kage-treeselect-status-${status}`,
    isOpen && 'kage-treeselect-open',
    className,
  ].filter(Boolean).join(' ');

  const displayText = useMemo(() => {
    if (multiple && Array.isArray(getDisplayLabel) && getDisplayLabel.length > 0) {
      return getDisplayLabel.join(', ');
    }
    if (!multiple && getDisplayLabel) {
      return getDisplayLabel;
    }
    return '';
  }, [multiple, getDisplayLabel]);

  const showClearIcon = allowClear && !disabled && displayText;

  return (
    <div ref={containerRef} className={classNames} style={style}>
      {/* 选择框 */}
      <div className="kage-treeselect-selector" onClick={() => setOpen(!isOpen)}>
        <span className={`kage-treeselect-selection ${!displayText ? 'kage-treeselect-placeholder' : ''}`}>
          {displayText || placeholder}
        </span>

        {showClearIcon && (
          <span className="kage-treeselect-clear" onClick={handleClear}>×</span>
        )}

        <span className={`kage-treeselect-arrow ${isOpen ? 'kage-treeselect-arrow-open' : ''}`}>
          ▼
        </span>
      </div>

      {/* 下拉面板 */}
      {isOpen && (
        <div className="kage-treeselect-dropdown">
          {showSearch && (
            <div className="kage-treeselect-search">
              <input
                type="text"
                className="kage-treeselect-search-input"
                placeholder="搜索"
                value={searchValue}
                onChange={handleSearch}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className="kage-treeselect-tree">
            {filteredTreeData.length > 0 ? (
              filteredTreeData.map((node) => renderTreeNode(node))
            ) : (
              <div className="kage-treeselect-empty">暂无数据</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeSelect;

