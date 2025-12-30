---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: TreeSelect 树选择
---

# TreeSelect 树选择

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { TreeSelect } from 'wssf-kage-ui';

const treeData = [
  {
    key: '0',
    value: '0',
    title: '根节点 0',
    children: [
      {
        key: '0-0',
        value: '0-0',
        title: '子节点 0-0',
        children: [
          { key: '0-0-0', value: '0-0-0', title: '叶子节点 0-0-0' },
          { key: '0-0-1', value: '0-0-1', title: '叶子节点 0-0-1' },
        ],
      },
      {
        key: '0-1',
        value: '0-1',
        title: '子节点 0-1',
        children: [
          { key: '0-1-0', value: '0-1-0', title: '叶子节点 0-1-0' },
          { key: '0-1-1', value: '0-1-1', title: '叶子节点 0-1-1' },
        ],
      },
    ],
  },
  {
    key: '1',
    value: '1',
    title: '根节点 1',
    children: [
      { key: '1-0', value: '1-0', title: '子节点 1-0' },
      { key: '1-1', value: '1-1', title: '子节点 1-1' },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    placeholder="请选择"
    style={{ width: 300 }}
  />
);
```

### 受控组件

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { TreeSelect, Space, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const treeData = [
  {
    key: 'beijing',
    value: 'beijing',
    title: '北京',
    children: [
      { key: 'haidian', value: 'haidian', title: '海淀区' },
      { key: 'chaoyang', value: 'chaoyang', title: '朝阳区' },
      { key: 'dongcheng', value: 'dongcheng', title: '东城区' },
    ],
  },
  {
    key: 'shanghai',
    value: 'shanghai',
    title: '上海',
    children: [
      { key: 'pudong', value: 'pudong', title: '浦东新区' },
      { key: 'huangpu', value: 'huangpu', title: '黄浦区' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState('haidian');

  return (
    <Space direction="vertical">
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={setValue}
        style={{ width: 300 }}
      />
      <Text>选中值: <Text code>{value || '未选择'}</Text></Text>
    </Space>
  );
};
```

### 多选

设置 `multiple` 或 `treeCheckable` 支持多选。

```tsx
import { TreeSelect, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const treeData = [
  {
    key: 'frontend',
    value: 'frontend',
    title: '前端',
    children: [
      { key: 'react', value: 'react', title: 'React' },
      { key: 'vue', value: 'vue', title: 'Vue' },
      { key: 'angular', value: 'angular', title: 'Angular' },
    ],
  },
  {
    key: 'backend',
    value: 'backend',
    title: '后端',
    children: [
      { key: 'nodejs', value: 'nodejs', title: 'Node.js' },
      { key: 'python', value: 'python', title: 'Python' },
      { key: 'java', value: 'java', title: 'Java' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState(['react', 'vue']);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={setValue}
        multiple
        placeholder="请选择技术栈"
        style={{ width: 300 }}
      />
      <TreeSelect
        treeData={treeData}
        value={value}
        onChange={setValue}
        treeCheckable
        placeholder="请选择技术栈（复选框）"
        style={{ width: 300 }}
      />
    </Space>
  );
};
```

### 带搜索

通过 `showSearch` 开启搜索功能。

```tsx
import { TreeSelect } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'fruit',
    value: 'fruit',
    title: '水果',
    children: [
      { key: 'apple', value: 'apple', title: '苹果' },
      { key: 'banana', value: 'banana', title: '香蕉' },
      { key: 'orange', value: 'orange', title: '橙子' },
    ],
  },
  {
    key: 'vegetable',
    value: 'vegetable',
    title: '蔬菜',
    children: [
      { key: 'tomato', value: 'tomato', title: '番茄' },
      { key: 'potato', value: 'potato', title: '土豆' },
      { key: 'carrot', value: 'carrot', title: '胡萝卜' },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    showSearch
    placeholder="搜索并选择"
    style={{ width: 300 }}
  />
);
```

### 禁用选项

通过设置 `disabled` 属性禁用某些节点。

```tsx
import { TreeSelect } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'china',
    value: 'china',
    title: '中国',
    children: [
      { key: 'beijing', value: 'beijing', title: '北京', disabled: true },
      { key: 'shanghai', value: 'shanghai', title: '上海' },
      { key: 'guangzhou', value: 'guangzhou', title: '广州' },
    ],
  },
  {
    key: 'usa',
    value: 'usa',
    title: '美国',
    disabled: true,
    children: [
      { key: 'newyork', value: 'newyork', title: '纽约' },
      { key: 'la', value: 'la', title: '洛杉矶' },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    placeholder="请选择城市"
    style={{ width: 300 }}
  />
);
```

### 全部禁用

设置 `disabled` 属性禁用整个选择器。

```tsx
import { TreeSelect } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'dept1',
    value: 'dept1',
    title: '技术部',
    children: [
      { key: 'team1', value: 'team1', title: '前端组' },
      { key: 'team2', value: 'team2', title: '后端组' },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    defaultValue="team1"
    disabled
    style={{ width: 300 }}
  />
);
```

### 三种大小

三种大小的选择器，`large` `middle` `small`，默认为 `middle`。

```tsx
import { TreeSelect, Space } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'root',
    value: 'root',
    title: '根节点',
    children: [
      { key: 'child1', value: 'child1', title: '子节点 1' },
      { key: 'child2', value: 'child2', title: '子节点 2' },
    ],
  },
];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TreeSelect treeData={treeData} size="large" placeholder="Large" style={{ width: 300 }} />
    <TreeSelect treeData={treeData} placeholder="Middle (默认)" style={{ width: 300 }} />
    <TreeSelect treeData={treeData} size="small" placeholder="Small" style={{ width: 300 }} />
  </Space>
);
```

### 状态

使用 `status` 为 TreeSelect 添加状态，可选 `error` 或 `warning`。

```tsx
import { TreeSelect, Space } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'root',
    value: 'root',
    title: '根节点',
    children: [
      { key: 'child1', value: 'child1', title: '子节点 1' },
      { key: 'child2', value: 'child2', title: '子节点 2' },
    ],
  },
];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TreeSelect treeData={treeData} status="error" placeholder="Error" style={{ width: 300 }} />
    <TreeSelect treeData={treeData} status="warning" placeholder="Warning" style={{ width: 300 }} />
  </Space>
);
```

### 默认展开所有

通过 `defaultExpandAll` 默认展开所有节点。

```tsx
import { TreeSelect } from 'wssf-kage-ui';

const treeData = [
  {
    key: 'company',
    value: 'company',
    title: '公司',
    children: [
      {
        key: 'dept1',
        value: 'dept1',
        title: '技术部',
        children: [
          { key: 'team1', value: 'team1', title: '前端组' },
          { key: 'team2', value: 'team2', title: '后端组' },
        ],
      },
      {
        key: 'dept2',
        value: 'dept2',
        title: '产品部',
        children: [
          { key: 'team3', value: 'team3', title: '产品组' },
          { key: 'team4', value: 'team4', title: '设计组' },
        ],
      },
    ],
  },
];

export default () => (
  <TreeSelect
    treeData={treeData}
    defaultExpandAll
    placeholder="请选择部门"
    style={{ width: 300 }}
  />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| treeData | 树形数据 | `TreeNode[]` | `[]` |
| value | 当前选中的值（受控） | `string \| string[]` | - |
| defaultValue | 默认选中的值 | `string \| string[]` | - |
| placeholder | 选择框占位文本 | `string` | `'请选择'` |
| multiple | 支持多选 | `boolean` | `false` |
| treeCheckable | 显示复选框 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否显示清除按钮 | `boolean` | `true` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| size | 选择框大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 设置校验状态 | `'error' \| 'warning'` | - |
| defaultExpandAll | 默认展开所有树节点 | `boolean` | `false` |
| defaultExpandedKeys | 默认展开的树节点 | `string[]` | `[]` |
| filterTreeNode | 自定义搜索函数 | `(inputValue: string, node: TreeNode) => boolean` | - |
| onChange | 选中树节点时调用 | `(value: string \| string[], label: string \| string[], node: TreeNode \| TreeNode[]) => void` | - |
| onDropdownVisibleChange | 下拉框显示/隐藏时调用 | `(visible: boolean) => void` | - |
| onSearch | 搜索时调用 | `(value: string) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TreeNode

```typescript
interface TreeNode {
  key: string;
  title: string;
  value: string;
  children?: TreeNode[];
  disabled?: boolean;
  selectable?: boolean;
  isLeaf?: boolean;
  [key: string]: any;
}
```

