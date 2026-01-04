---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: InputNumber 数字输入框
---

# InputNumber 数字输入框

通过鼠标或键盘，输入范围内的数值。

## 何时使用

- 当需要获取标准数值时。
- 需要限定输入范围，并支持步进操作时。

## 代码演示

### 基本使用

最基本的数字输入框。

```tsx
import { InputNumber } from 'wssf-kage-ui';

export default () => <InputNumber defaultValue={3} style={{ width: 200 }} />;
```

### 尺寸

三种大小的数字输入框，当 size 分别为 `large`、`middle` 和 `small` 时。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber size="large" defaultValue={100} />
    <InputNumber size="middle" defaultValue={100} />
    <InputNumber size="small" defaultValue={100} />
  </Space>
);
```

### 最小最大值

通过 `min` 和 `max` 限制数值范围。

```tsx
import { InputNumber } from 'wssf-kage-ui';

export default () => (
  <InputNumber min={1} max={10} defaultValue={3} style={{ width: 200 }} />
);
```

### 步长

通过 `step` 设置每次改变的步长，可以为小数。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber step={1} defaultValue={3} />
    <InputNumber step={0.1} defaultValue={0.3} />
    <InputNumber step={5} defaultValue={10} />
  </Space>
);
```

### 小数精度

通过 `precision` 设置小数精度。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber precision={0} step={1} defaultValue={100} />
    <InputNumber precision={2} step={0.01} defaultValue={100.12} />
  </Space>
);
```

### 格式化展示

通过 `formatter` 格式化数字，配合 `parser` 解析输入。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber
      defaultValue={1000}
      formatter={(value) => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={(value) => value!.replace(/¥\s?|(,*)/g, '')}
    />
    <InputNumber
      defaultValue={100}
      formatter={(value) => `${value}%`}
      parser={(value) => value!.replace('%', '')}
    />
  </Space>
);
```

### 前后缀

通过 `prefix` 和 `suffix` 添加前后缀，如单位图标。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 220 }}>
    <InputNumber prefix="💰" defaultValue={1000} style={{ width: '100%' }} />
    <InputNumber suffix="元" defaultValue={100} style={{ width: '100%' }} />
    <InputNumber prefix="$" suffix="USD" defaultValue={100} style={{ width: '100%' }} />
  </Space>
);
```

### 前后附加元素

通过 `addonBefore` 和 `addonAfter` 添加前后附加元素。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 240 }}>
    <InputNumber addonBefore="价格" addonAfter="元" defaultValue={100} />
    <InputNumber addonBefore="+" addonAfter="℃" defaultValue={25} />
  </Space>
);
```

### 控制按钮位置

通过 `controlsPosition` 设置增减按钮的位置，可选 `default`（默认上下）或 `right`（右侧）。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber controlsPosition="default" defaultValue={100} />
    <InputNumber controlsPosition="right" defaultValue={100} />
  </Space>
);
```

### 隐藏控制按钮

设置 `controls={false}` 隐藏增减按钮，仍可通过键盘上下键操作。

```tsx
import { InputNumber } from 'wssf-kage-ui';

export default () => (
  <InputNumber controls={false} defaultValue={100} style={{ width: 200 }} />
);
```

### 状态

设置不同的状态：正常、错误、警告、禁用。

```tsx
import { InputNumber, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 200 }}>
    <InputNumber placeholder="正常" />
    <InputNumber status="warning" placeholder="警告状态" defaultValue={10} />
    <InputNumber status="error" placeholder="错误状态" defaultValue={20} />
    <InputNumber disabled placeholder="禁用状态" defaultValue={30} />
  </Space>
);
```

### 受控模式

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { InputNumber, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [value, setValue] = useState<number | null>(100);

  return (
    <div>
      <InputNumber
        value={value}
        onChange={setValue}
        style={{ width: 200 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>当前值: <Text code>{value ?? 'null'}</Text></Text>
      </div>
    </div>
  );
};
```

### 步进回调

监听步进操作，获取步进方向和偏移量。

```tsx
import { InputNumber, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [info, setInfo] = useState('');

  return (
    <div>
      <InputNumber
        defaultValue={5}
        style={{ width: 200 }}
        onStep={(value, { type, offset }) => {
          setInfo(`${type === 'up' ? '增加' : '减少'} ${offset}，当前值: ${value}`);
        }}
      />
      {info && (
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">{info}</Text>
        </div>
      )}
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `number \| null` | - |
| defaultValue | 默认值（非受控） | `number \| null` | - |
| min | 最小值 | `number` | `-Infinity` |
| max | 最大值 | `number` | `Infinity` |
| step | 步长 | `number` | `1` |
| precision | 小数精度 | `number` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| controls | 是否显示增减按钮 | `boolean` | `true` |
| controlsPosition | 增减按钮位置 | `'default' \| 'right'` | `'default'` |
| prefix | 前缀内容 | `ReactNode` | - |
| suffix | 后缀内容 | `ReactNode` | - |
| addonBefore | 前置标签 | `ReactNode` | - |
| addonAfter | 后置标签 | `ReactNode` | - |
| formatter | 格式化显示 | `(value) => string` | - |
| parser | 解析输入 | `(value) => string` | - |
| placeholder | 占位符 | `string` | - |
| onChange | 值变化回调 | `(value: number \| null) => void` | - |
| onPressEnter | 按下 Enter 回调 | `(e) => void` | - |
| onStep | 步进回调 | `(value, info) => void` | - |
| onFocus | 聚焦回调 | `(e) => void` | - |
| onBlur | 失焦回调 | `(e) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| 其他 | 原生 `input` 支持的属性（除 size、type 外） | `InputHTMLAttributes` | - |

