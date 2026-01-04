---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Cascader 级联选择
---

# Cascader 级联选择

级联选择框。

## 何时使用

- 需要从一组相关联的数据集合进行选择，例如省市区，公司层级，事物分类等。
- 从一个较大的数据集合中进行选择时，用多级分类进行分隔，方便选择。

## 代码演示

### 基本使用

省市区级联选择。

```tsx
import { Cascader, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
          { value: 'gongshu', label: '拱墅区' },
        ],
      },
      {
        value: 'ningbo',
        label: '宁波',
        children: [
          { value: 'haishu', label: '海曙区' },
          { value: 'jiangbei', label: '江北区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
          { value: 'qinhuai', label: '秦淮区' },
        ],
      },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);

  return (
    <div>
      <Cascader
        options={options}
        value={value}
        onChange={(val) => setValue(val)}
        placeholder="请选择地区"
        style={{ width: 300 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>选中值: <Text code>{JSON.stringify(value)}</Text></Text>
      </div>
    </div>
  );
};
```

### 默认值

指定默认选中的值。

```tsx
import { Cascader } from 'wssf-kage-ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    children: [
      {
        value: 'nanjing',
        label: '南京',
        children: [
          { value: 'xuanwu', label: '玄武区' },
        ],
      },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    placeholder="请选择地区"
    style={{ width: 300 }}
  />
);
```

### 悬浮展开

通过 `expandTrigger="hover"` 使用悬浮方式展开子级菜单。

```tsx
import { Cascader } from 'wssf-kage-ui';

const options = [
  {
    value: 'light',
    label: '光源',
    children: [
      { value: 'led', label: 'LED' },
      { value: 'halogen', label: '卤素灯' },
      { value: 'fluorescent', label: '荧光灯' },
    ],
  },
  {
    value: 'furniture',
    label: '家具',
    children: [
      { value: 'table', label: '桌子' },
      { value: 'chair', label: '椅子' },
      { value: 'sofa', label: '沙发' },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    expandTrigger="hover"
    placeholder="悬浮展开"
    style={{ width: 300 }}
  />
);
```

### 选择即改变

设置 `changeOnSelect` 后，点选每级菜单选项值都会发生变化。

```tsx
import { Cascader, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  {
    value: 'category1',
    label: '分类一',
    children: [
      {
        value: 'sub1',
        label: '子分类1',
        children: [
          { value: 'item1', label: '选项1' },
          { value: 'item2', label: '选项2' },
        ],
      },
    ],
  },
  {
    value: 'category2',
    label: '分类二',
    children: [
      { value: 'sub2', label: '子分类2' },
    ],
  },
];

export default () => {
  const [value, setValue] = useState([]);

  return (
    <div>
      <Cascader
        options={options}
        value={value}
        onChange={(val) => setValue(val)}
        changeOnSelect
        placeholder="选择即改变"
        style={{ width: 300 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>选中值: <Text code>{JSON.stringify(value)}</Text></Text>
      </div>
    </div>
  );
};
```

### 搜索

可以通过 `showSearch` 开启搜索功能。

```tsx
import { Cascader } from 'wssf-kage-ui';

const options = [
  {
    value: 'fruit',
    label: '水果',
    children: [
      { value: 'apple', label: '苹果' },
      { value: 'banana', label: '香蕉' },
      { value: 'orange', label: '橙子' },
    ],
  },
  {
    value: 'vegetable',
    label: '蔬菜',
    children: [
      { value: 'tomato', label: '番茄' },
      { value: 'potato', label: '土豆' },
      { value: 'carrot', label: '胡萝卜' },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    showSearch
    placeholder="请输入搜索"
    style={{ width: 300 }}
  />
);
```

### 禁用选项

通过设置 `disabled` 禁用选项。

```tsx
import { Cascader } from 'wssf-kage-ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      { value: 'hangzhou', label: '杭州' },
      { value: 'ningbo', label: '宁波', disabled: true },
    ],
  },
  {
    value: 'jiangsu',
    label: '江苏',
    disabled: true,
    children: [
      { value: 'nanjing', label: '南京' },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    placeholder="请选择"
    style={{ width: 300 }}
  />
);
```

### 自定义显示

使用 `displayRender` 自定义显示内容。

```tsx
import { Cascader } from 'wssf-kage-ui';

const options = [
  {
    value: 'zhejiang',
    label: '浙江',
    children: [
      {
        value: 'hangzhou',
        label: '杭州',
        children: [
          { value: 'xihu', label: '西湖区' },
        ],
      },
    ],
  },
];

export default () => (
  <Cascader
    options={options}
    defaultValue={['zhejiang', 'hangzhou', 'xihu']}
    displayRender={(labels) => labels.join(' > ')}
    placeholder="请选择"
    style={{ width: 300 }}
  />
);
```

### 不同尺寸

三种尺寸的级联选择器。

```tsx
import { Cascader, Space } from 'wssf-kage-ui';

const options = [
  {
    value: 'option1',
    label: '选项一',
    children: [{ value: 'sub1', label: '子选项1' }],
  },
  {
    value: 'option2',
    label: '选项二',
    children: [{ value: 'sub2', label: '子选项2' }],
  },
];

export default () => (
  <Space direction="vertical" size="middle" style={{ width: 300 }}>
    <Cascader options={options} placeholder="大尺寸" size="large" />
    <Cascader options={options} placeholder="默认尺寸" size="middle" />
    <Cascader options={options} placeholder="小尺寸" size="small" />
  </Space>
);
```

### 状态

不同的状态。

```tsx
import { Cascader, Space } from 'wssf-kage-ui';

const options = [
  {
    value: 'option1',
    label: '选项一',
    children: [{ value: 'sub1', label: '子选项1' }],
  },
];

export default () => (
  <Space direction="vertical" size="middle" style={{ width: 300 }}>
    <Cascader options={options} placeholder="正常状态" />
    <Cascader options={options} placeholder="错误状态" status="error" />
    <Cascader options={options} placeholder="警告状态" status="warning" />
    <Cascader options={options} placeholder="禁用状态" disabled />
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据 | `CascaderOption[]` | `[]` |
| value | 当前值 | `(string \| number)[]` | - |
| defaultValue | 默认值 | `(string \| number)[]` | `[]` |
| placeholder | 占位符 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 允许清除 | `boolean` | `true` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| expandTrigger | 展开触发方式 | `'click' \| 'hover'` | `'click'` |
| changeOnSelect | 选择即改变 | `boolean` | `false` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| displayRender | 自定义显示函数 | `(labels, options) => ReactNode` | - |
| onChange | 值改变回调 | `(value, selectedOptions) => void` | - |
| onDropdownVisibleChange | 下拉菜单显示回调 | `(open) => void` | - |
| notFoundContent | 无匹配时的内容 | `ReactNode` | `'无匹配结果'` |
| status | 状态 | `'error' \| 'warning'` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### CascaderOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 选项值 | `string \| number` | - |
| label | 显示文本 | `ReactNode` | - |
| children | 子选项 | `CascaderOption[]` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| isLeaf | 是否为叶子节点 | `boolean` | - |

