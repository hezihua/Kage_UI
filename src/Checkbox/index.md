---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Checkbox 多选框
---

# Checkbox 多选框

多选框。

## 何时使用

- 在一组可选项中进行多项选择时。
- 单独使用可以表示两种状态之间的切换。

## 代码演示

### 基本使用

简单的 checkbox。

```tsx
import { Checkbox } from 'wssf-kage-ui';

export default () => <Checkbox>Checkbox</Checkbox>;
```

### 受控模式

通过 `checked` 和 `onChange` 进行受控。

```tsx
import { Checkbox, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      >
        选项
      </Checkbox>
      <div style={{ marginTop: 16 }}>
        <Text>选中状态: <Text code>{checked ? 'true' : 'false'}</Text></Text>
      </div>
    </div>
  );
};
```

### 禁用状态

禁用的 checkbox。

```tsx
import { Checkbox, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Checkbox disabled>未选中禁用</Checkbox>
    <Checkbox disabled checked>选中禁用</Checkbox>
  </Space>
);
```

### Checkbox 组

一组 checkbox，使用 `Checkbox.Group` 组件。

```tsx
import { Checkbox, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [value, setValue] = useState(['apple']);

  return (
    <div>
      <Checkbox.Group value={value} onChange={setValue}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="pear">梨</Checkbox>
        <Checkbox value="orange">橙子</Checkbox>
        <Checkbox value="banana">香蕉</Checkbox>
      </Checkbox.Group>
      <div style={{ marginTop: 16 }}>
        <Text>选中值: <Text code>{JSON.stringify(value)}</Text></Text>
      </div>
    </div>
  );
};
```

### 使用 options 配置

通过 `options` 配置选项。

```tsx
import { Checkbox, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { label: '选项 A', value: 'A' },
  { label: '选项 B', value: 'B' },
  { label: '选项 C', value: 'C' },
  { label: '选项 D（禁用）', value: 'D', disabled: true },
];

export default () => {
  const [value, setValue] = useState(['A']);

  return (
    <div>
      <Checkbox.Group options={options} value={value} onChange={setValue} />
      <div style={{ marginTop: 16 }}>
        <Text>选中值: <Text code>{JSON.stringify(value)}</Text></Text>
      </div>
    </div>
  );
};
```

### 简单数组选项

也可以使用简单的字符串/数字数组作为选项。

```tsx
import { Checkbox } from 'wssf-kage-ui';

const options = ['React', 'Vue', 'Angular', 'Svelte'];

export default () => (
  <Checkbox.Group options={options} defaultValue={['React']} />
);
```

### 垂直方向

使用 `direction="vertical"` 设置垂直排列。

```tsx
import { Checkbox } from 'wssf-kage-ui';

const options = [
  { label: '选项一', value: 1 },
  { label: '选项二', value: 2 },
  { label: '选项三', value: 3 },
];

export default () => (
  <Checkbox.Group options={options} direction="vertical" defaultValue={[1]} />
);
```

### 全选

实现全选效果。

```tsx
import { Checkbox, Divider, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const allOptions = ['苹果', '梨', '橙子', '香蕉'];

export default () => {
  const [checkedList, setCheckedList] = useState(['苹果', '梨']);

  const checkAll = allOptions.length === checkedList.length;
  const indeterminate = checkedList.length > 0 && checkedList.length < allOptions.length;

  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? allOptions : []);
  };

  return (
    <div>
      <Checkbox
        indeterminate={indeterminate}
        checked={checkAll}
        onChange={onCheckAllChange}
      >
        全选
      </Checkbox>
      <Divider style={{ margin: '12px 0' }} />
      <Checkbox.Group
        options={allOptions}
        value={checkedList}
        onChange={setCheckedList}
      />
      <div style={{ marginTop: 16 }}>
        <Text>选中: <Text code>{JSON.stringify(checkedList)}</Text></Text>
      </div>
    </div>
  );
};
```

### 禁用整组

禁用整个 Checkbox.Group。

```tsx
import { Checkbox } from 'wssf-kage-ui';

const options = [
  { label: '选项 A', value: 'A' },
  { label: '选项 B', value: 'B' },
  { label: '选项 C', value: 'C' },
];

export default () => (
  <Checkbox.Group
    options={options}
    defaultValue={['A']}
    disabled
  />
);
```

## API

### Checkbox

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| indeterminate | 半选状态 | `boolean` | `false` |
| value | 值（在 Group 中使用） | `string \| number` | - |
| onChange | 选中状态变化回调 | `(e: ChangeEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Checkbox.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项配置 | `(Option \| string \| number)[]` | - |
| value | 当前值 | `(string \| number)[]` | - |
| defaultValue | 默认值 | `(string \| number)[]` | `[]` |
| disabled | 是否禁用 | `boolean` | `false` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| onChange | 值变化回调 | `(checkedValue) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Option

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| label | 显示文本 | `ReactNode` |
| value | 选项值 | `string \| number` |
| disabled | 是否禁用 | `boolean` |

