---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Select 选择器
---

# Select 选择器

下拉选择器，用于从多个选项中选择单个或多个选项。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 Radio 是更好的选择。

## 代码演示

### 基本使用

基本的单选选择器。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];

export default () => (
  <Select
    defaultValue="lucy"
    options={options}
    style={{ width: 200 }}
  />
);
```

### 禁用状态

整体禁用。

```tsx
import { Select, Space } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];

export default () => (
  <Space>
    <Select defaultValue="lucy" options={options} disabled style={{ width: 200 }} />
    <Select defaultValue="lucy" options={options} style={{ width: 200 }} />
  </Space>
);
```

### 禁用选项

禁用某个选项。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy', disabled: true },
  { value: 'tom', label: 'Tom' },
];

export default () => (
  <Select
    defaultValue="lucy"
    options={options}
    style={{ width: 200 }}
  />
);
```

### 清除

允许清除选择的内容。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];

export default () => (
  <Select
    defaultValue="lucy"
    options={options}
    allowClear
    style={{ width: 200 }}
  />
);
```

### 搜索

可搜索的选择器。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
  { value: 'jerry', label: 'Jerry' },
];

export default () => (
  <Select
    showSearch
    placeholder="请选择"
    options={options}
    style={{ width: 200 }}
  />
);
```

### 多选

多选模式，可以选择多个选项。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

export default () => (
  <Select
    mode="multiple"
    defaultValue={['react', 'vue']}
    options={options}
    placeholder="请选择"
    style={{ width: '100%' }}
  />
);
```

### 标签模式

标签模式，用户可以自由输入。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

export default () => (
  <Select
    mode="tags"
    defaultValue={['react']}
    options={options}
    placeholder="请选择或输入"
    style={{ width: '100%' }}
  />
);
```

### 限制标签数量

使用 `maxTagCount` 限制显示的标签数量。

```tsx
import { Select } from 'wssf-kage-ui';

const options = Array.from({ length: 20 }, (_, i) => ({
  value: `option${i + 1}`,
  label: `选项 ${i + 1}`,
}));

export default () => (
  <Select
    mode="multiple"
    maxTagCount={3}
    defaultValue={['option1', 'option2', 'option3', 'option4', 'option5']}
    options={options}
    placeholder="请选择"
    style={{ width: '100%' }}
  />
);
```

### 限制标签文本长度

使用 `maxTagTextLength` 限制标签文本的长度。

```tsx
import { Select } from 'wssf-kage-ui';

const options = [
  { value: 'option1', label: '这是一个非常长的选项名称1' },
  { value: 'option2', label: '这是一个非常长的选项名称2' },
  { value: 'option3', label: '这是一个非常长的选项名称3' },
];

export default () => (
  <Select
    mode="multiple"
    maxTagTextLength={10}
    defaultValue={['option1', 'option2']}
    options={options}
    placeholder="请选择"
    style={{ width: '100%' }}
  />
);
```

### 尺寸

三种大小的选择器。

```tsx
import { Select, Space } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
  { value: 'tom', label: 'Tom' },
];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Select size="large" defaultValue="lucy" options={options} />
    <Select size="middle" defaultValue="lucy" options={options} />
    <Select size="small" defaultValue="lucy" options={options} />
  </Space>
);
```

### 状态

不同的输入框状态。

```tsx
import { Select, Space } from 'wssf-kage-ui';

const options = [
  { value: 'jack', label: 'Jack' },
  { value: 'lucy', label: 'Lucy' },
];

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <Select defaultValue="lucy" options={options} placeholder="正常状态" />
    <Select defaultValue="lucy" options={options} status="warning" placeholder="警告状态" />
    <Select defaultValue="lucy" options={options} status="error" placeholder="错误状态" />
    <Select defaultValue="lucy" options={options} disabled placeholder="禁用状态" />
  </Space>
);
```

### 受控模式

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { Select, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

export default () => {
  const [value, setValue] = useState('react');

  return (
    <div>
      <Select
        value={value}
        options={options}
        onChange={setValue}
        style={{ width: 200 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>
          你选择了: <Text code>{value}</Text>
        </Text>
      </div>
    </div>
  );
};
```

### 回调事件

监听选择和取消选择事件。

```tsx
import { Select, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

export default () => {
  const [log, setLog] = useState('');

  return (
    <div>
      <Select
        mode="multiple"
        options={options}
        placeholder="请选择"
        style={{ width: '100%' }}
        onSelect={(value, option) => setLog(`选中: ${value}`)}
        onDeselect={(value, option) => setLog(`取消选中: ${value}`)}
      />
      {log && (
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">{log}</Text>
        </div>
      )}
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值（受控） | `string \| number \| (string \| number)[]` | - |
| defaultValue | 默认选中的值 | `string \| number \| (string \| number)[]` | - |
| options | 选项数据 | `{ value, label?, disabled? }[] \| string[] \| number[]` | `[]` |
| placeholder | 占位符 | `string` | `'请选择'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| showSearch | 是否支持搜索 | `boolean` | `false` |
| mode | 模式（多选或标签） | `'multiple' \| 'tags'` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| popupMatchSelectWidth | 下拉菜单是否与选择器同宽 | `boolean \| number` | `true` |
| filterOption | 过滤选项 | `boolean \| (input, option) => boolean` | `true` |
| notFoundContent | 无匹配时的内容 | `ReactNode` | `'无匹配结果'` |
| loading | 加载状态 | `boolean` | `false` |
| maxTagCount | 最多显示多少个 tag | `number` | - |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | `ReactNode \| (omittedValues) => ReactNode` | - |
| maxTagTextLength | 最多显示多少个 tag 的文本长度 | `number` | - |
| onChange | 值变化回调 | `(value, option) => void` | - |
| onSelect | 选中回调 | `(value, option) => void` | - |
| onDeselect | 取消选中回调 | `(value, option) => void` | - |
| onSearch | 搜索回调 | `(value) => void` | - |
| onDropdownVisibleChange | 下拉菜单显示回调 | `(open) => void` | - |
| onFocus | 聚焦回调 | `(e) => void` | - |
| onBlur | 失焦回调 | `(e) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

