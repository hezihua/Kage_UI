---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Radio 单选框
---

# Radio 单选框

单选框，用于在多个选项中选择单个结果。

## 何时使用

- 用于在多个备选项中选中单个状态。
- 和 Select 的区别是，Radio 所有选项默认可见，方便用户在比较中选择，因此选项不宜过多。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Radio } from 'wssf-kage-ui';

export default () => <Radio>Radio</Radio>;
```

### 单选组合

一组互斥的 Radio 配合使用。

```tsx
import { Radio, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(1);

  return (
    <Radio.Group onChange={setValue} value={value}>
      <Space direction="vertical">
        <Radio value={1}>选项 A</Radio>
        <Radio value={2}>选项 B</Radio>
        <Radio value={3}>选项 C</Radio>
        <Radio value={4}>选项 D</Radio>
      </Space>
    </Radio.Group>
  );
};
```

### 垂直的 Radio.Group

垂直排列的单选组合。

```tsx
import { Radio } from 'wssf-kage-ui';

const options = [
  { label: '选项 A', value: 'A' },
  { label: '选项 B', value: 'B' },
  { label: '选项 C', value: 'C' },
];

export default () => (
  <Radio.Group options={options} direction="vertical" defaultValue="A" />
);
```

### Radio.Group 组合 - 配置方式

通过配置 `options` 参数来渲染单选框。

```tsx
import { Radio } from 'wssf-kage-ui';

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];

export default () => <Radio.Group options={options} defaultValue="Apple" />;
```

### 按钮样式

按钮样式的单选组合。

```tsx
import { Radio, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Radio.Group defaultValue="a" buttonStyle="outline">
      <Radio.Button value="a">杭州</Radio.Button>
      <Radio.Button value="b">上海</Radio.Button>
      <Radio.Button value="c">北京</Radio.Button>
      <Radio.Button value="d">成都</Radio.Button>
    </Radio.Group>
    
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">杭州</Radio.Button>
      <Radio.Button value="b">上海</Radio.Button>
      <Radio.Button value="c">北京</Radio.Button>
      <Radio.Button value="d">成都</Radio.Button>
    </Radio.Group>
  </Space>
);
```

### 按钮样式 - 配置方式

通过 `optionType="button"` 使用按钮样式的单选组合。

```tsx
import { Radio, Space } from 'wssf-kage-ui';

const options = [
  { label: '北京', value: 'Beijing' },
  { label: '上海', value: 'Shanghai' },
  { label: '广州', value: 'Guangzhou' },
  { label: '深圳', value: 'Shenzhen' },
];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Radio.Group
      options={options}
      defaultValue="Beijing"
      optionType="button"
      buttonStyle="outline"
    />
    <Radio.Group
      options={options}
      defaultValue="Beijing"
      optionType="button"
      buttonStyle="solid"
    />
  </Space>
);
```

### 按钮样式大小

按钮样式的单选组合支持三种尺寸。

```tsx
import { Radio, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Radio.Group defaultValue="a" size="large">
      <Radio.Button value="a">大号</Radio.Button>
      <Radio.Button value="b">按钮</Radio.Button>
      <Radio.Button value="c">样式</Radio.Button>
    </Radio.Group>
    
    <Radio.Group defaultValue="a" size="middle">
      <Radio.Button value="a">默认</Radio.Button>
      <Radio.Button value="b">按钮</Radio.Button>
      <Radio.Button value="c">样式</Radio.Button>
    </Radio.Group>
    
    <Radio.Group defaultValue="a" size="small">
      <Radio.Button value="a">小号</Radio.Button>
      <Radio.Button value="b">按钮</Radio.Button>
      <Radio.Button value="c">样式</Radio.Button>
    </Radio.Group>
  </Space>
);
```

### 禁用

单选框禁用状态。

```tsx
import { Radio, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Radio defaultChecked={false} disabled>禁用</Radio>
    <Radio defaultChecked disabled>禁用选中</Radio>
    <div style={{ marginTop: 16 }}>
      <Radio.Group disabled defaultValue="Apple">
        <Radio value="Apple">Apple</Radio>
        <Radio value="Pear">Pear</Radio>
        <Radio value="Orange">Orange</Radio>
      </Radio.Group>
    </div>
  </Space>
);
```

### 禁用某项

禁用单选组合中的某个选项。

```tsx
import { Radio } from 'wssf-kage-ui';

const options = [
  { label: '选项 A', value: 'A' },
  { label: '选项 B', value: 'B', disabled: true },
  { label: '选项 C', value: 'C' },
  { label: '选项 D', value: 'D', disabled: true },
];

export default () => <Radio.Group options={options} defaultValue="A" />;
```

### 受控的 Radio.Group

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { Radio, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export default () => {
  const [value, setValue] = useState('react');

  return (
    <div>
      <Radio.Group options={options} value={value} onChange={setValue} />
      <div style={{ marginTop: 16 }}>
        <Text>
          你选择了: <Text code>{value}</Text>
        </Text>
      </div>
    </div>
  );
};
```

## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中 | `boolean` | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| value | 根据 value 进行比较，判断是否选中 | `string \| number` | - |
| onChange | 值变化回调 | `(e) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Radio.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的值 | `string \| number \| null` | - |
| defaultValue | 默认选中的值 | `string \| number \| null` | `null` |
| options | 选项配置 | `{ label, value, disabled? }[] \| string[] \| number[]` | - |
| disabled | 是否禁用所有单选框 | `boolean` | `false` |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| optionType | 选项类型 | `'default' \| 'button'` | `'default'` |
| buttonStyle | 按钮样式（仅 optionType 为 button 时有效） | `'solid' \| 'outline'` | `'outline'` |
| size | 按钮大小（仅 optionType 为 button 时有效） | `'large' \| 'middle' \| 'small'` | `'middle'` |
| onChange | 值变化回调 | `(value: string \| number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Radio.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 根据 value 进行比较，判断是否选中 | `string \| number` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

