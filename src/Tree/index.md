---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Tree 树形控件
---

# Tree 树形控件

多层次的结构列表。

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用 `Tree` 组件可以完整展现其中的层级关系，并具有展开、收起、选择等交互功能。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: '根节点 0',
    children: [
      {
        key: '0-0',
        title: '子节点 0-0',
        children: [
          { key: '0-0-0', title: '叶子节点 0-0-0' },
          { key: '0-0-1', title: '叶子节点 0-0-1' },
        ],
      },
      {
        key: '0-1',
        title: '子节点 0-1',
        children: [
          { key: '0-1-0', title: '叶子节点 0-1-0' },
          { key: '0-1-1', title: '叶子节点 0-1-1' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: '根节点 1',
    children: [
      { key: '1-0', title: '子节点 1-0' },
      { key: '1-1', title: '子节点 1-1' },
    ],
  },
];

export default () => <Tree treeData={treeData} />;
```

### 受控模式

通过 `selectedKeys` 和 `onSelect` 实现受控组件。

```tsx
import { Tree, Space, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Space direction="vertical">
      <Text>已选择: {selectedKeys.join(', ') || '无'}</Text>
      <Tree
        treeData={treeData}
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
    </Space>
  );
};
```

### 多选

通过 `multiple` 属性开启多选模式。

```tsx
import { Tree, Space, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Space direction="vertical">
      <Text>已选择: {selectedKeys.join(', ') || '无'}</Text>
      <Tree
        treeData={treeData}
        multiple
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
    </Space>
  );
};
```

### 复选框

通过 `checkable` 属性显示复选框。

```tsx
import { Tree, Space, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  return (
    <Space direction="vertical">
      <Text>已选择: {selectedKeys.join(', ') || '无'}</Text>
      <Tree
        treeData={treeData}
        checkable
        selectedKeys={selectedKeys}
        onSelect={(keys) => setSelectedKeys(keys)}
      />
    </Space>
  );
};
```

### 默认展开

通过 `defaultExpandAll` 或 `defaultExpandedKeys` 设置默认展开的节点。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => (
  <Tree treeData={treeData} defaultExpandAll />
);
```

### 显示连接线

通过 `showLine` 属性显示连接线。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => <Tree treeData={treeData} showLine />;
```

### 自定义图标

通过 `icon` 或节点的 `icon` 属性自定义图标。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: '文件夹 1',
    icon: '📁',
    children: [
      { key: '0-0', title: '文件 1-0', icon: '📄' },
      {
        key: '0-1',
        title: '文件夹 1-1',
        icon: '📁',
        children: [
          { key: '0-1-0', title: '文件 1-1-0', icon: '📄' },
          { key: '0-1-1', title: '文件 1-1-1', icon: '📄' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: '文件夹 2',
    icon: '📁',
    children: [
      { key: '1-0', title: '文件 2-0', icon: '📄' },
      { key: '1-1', title: '文件 2-1', icon: '📄' },
    ],
  },
];

export default () => <Tree treeData={treeData} showIcon />;
```

### 禁用节点

通过节点的 `disabled` 属性禁用节点。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0', disabled: true },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf', disabled: true },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
  {
    key: '1',
    title: 'parent 2',
    disabled: true,
    children: [
      { key: '1-0', title: 'parent 2-0' },
      { key: '1-1', title: 'parent 2-1' },
    ],
  },
];

export default () => <Tree treeData={treeData} checkable />;
```

### 自定义节点渲染

通过 `titleRender` 自定义节点标题渲染。

```tsx
import { Tree, Button, Space } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
];

export default () => (
  <Tree
    treeData={treeData}
    titleRender={(node) => (
      <Space>
        <span>{node.title}</span>
        <Button size="small" type="text">
          编辑
        </Button>
      </Space>
    )}
  />
);
```

### 块节点

通过 `blockNode` 属性使节点占据整行。

```tsx
import { Tree } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
];

export default () => <Tree treeData={treeData} blockNode />;
```

### 受控展开

通过 `expandedKeys` 和 `onExpand` 控制节点展开状态。

```tsx
import { Tree, Space, Button, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const treeData = [
  {
    key: '0',
    title: 'parent 1',
    children: [
      { key: '0-0', title: 'parent 1-0' },
      {
        key: '0-1',
        title: 'parent 1-1',
        children: [
          { key: '0-1-0', title: 'leaf' },
          { key: '0-1-1', title: 'leaf' },
        ],
      },
    ],
  },
];

export default () => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>(['0']);

  return (
    <Space direction="vertical">
      <Space>
        <Text>已展开: {expandedKeys.join(', ') || '无'}</Text>
        <Button size="small" onClick={() => setExpandedKeys([])}>
          全部收起
        </Button>
        <Button size="small" onClick={() => setExpandedKeys(['0', '0-1'])}>
          展开所有
        </Button>
      </Space>
      <Tree
        treeData={treeData}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
      />
    </Space>
  );
};
```

## API

### Tree

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | `TreeNode[]` | `[]` |
| selectedKeys | 当前选中的节点 key | `string[]` | - |
| defaultSelectedKeys | 默认选中的节点 key | `string[]` | `[]` |
| expandedKeys | 当前展开的节点 key | `string[]` | - |
| defaultExpandedKeys | 默认展开的节点 key | `string[]` | `[]` |
| defaultExpandAll | 是否默认展开所有节点 | `boolean` | `false` |
| checkable | 是否显示复选框 | `boolean` | `false` |
| multiple | 是否多选 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| showLine | 是否显示连接线 | `boolean` | `false` |
| showIcon | 是否显示图标 | `boolean` | `false` |
| icon | 自定义图标 | `(props: { expanded: boolean; isLeaf: boolean }) => ReactNode` | - |
| onSelect | 节点选择回调 | `(selectedKeys: string[], info: { node: TreeNode; selected: boolean; nativeEvent: MouseEvent }) => void` | - |
| onExpand | 节点展开/收起回调 | `(expandedKeys: string[], info: { node: TreeNode; expanded: boolean }) => void` | - |
| onDoubleClick | 节点双击回调 | `(e: React.MouseEvent, node: TreeNode) => void` | - |
| onRightClick | 节点右键回调 | `(e: React.MouseEvent, node: TreeNode) => void` | - |
| titleRender | 自定义节点标题渲染 | `(node: TreeNode) => ReactNode` | - |
| blockNode | 是否块节点 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TreeNode

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| title | 节点标题 | `ReactNode` | - |
| children | 子节点 | `TreeNode[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| selectable | 是否可选择 | `boolean` | `true` |
| isLeaf | 是否为叶子节点 | `boolean` | - |
| icon | 图标 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

