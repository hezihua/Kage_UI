---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: TimePicker 时间选择器
---

# TimePicker 时间选择器

输入或选择时间的控件。

## 何时使用

当用户需要输入一个时间，可以点击标准输入框，弹出时间面板进行选择。

## 代码演示

### 基本使用

最简单的用法，在浮层中可以选择某一时间。

```tsx
import { TimePicker } from 'wssf-kage-ui';

export default () => (
  <TimePicker defaultValue="12:30:00" style={{ width: 200 }} />
);
```

### 受控组件

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { TimePicker, Space, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [value, setValue] = useState<string>('12:30:00');

  return (
    <Space direction="vertical">
      <TimePicker value={value} onChange={(time, timeString) => setValue(timeString)} style={{ width: 200 }} />
      <Text>选中时间: <Text code>{value || '未选择'}</Text></Text>
    </Space>
  );
};
```

### 三种大小

三种大小的输入框，`large` `middle` `small`，默认为 `middle`。

```tsx
import { TimePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TimePicker size="large" defaultValue="12:30:00" style={{ width: 200 }} />
    <TimePicker defaultValue="12:30:00" style={{ width: 200 }} />
    <TimePicker size="small" defaultValue="12:30:00" style={{ width: 200 }} />
  </Space>
);
```

### 禁用

禁用时间选择。

```tsx
import { TimePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <TimePicker defaultValue="12:30:00" disabled style={{ width: 200 }} />
  </Space>
);
```

### 时间格式

使用 `format` 属性，可以自定义时间的显示格式。

```tsx
import { TimePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TimePicker format="HH:mm:ss" defaultValue="12:30:00" style={{ width: 200 }} />
    <TimePicker format="HH:mm" defaultValue="12:30" style={{ width: 200 }} />
    <TimePicker format="mm:ss" defaultValue="30:00" style={{ width: 200 }} />
  </Space>
);
```

### 步长

可以使用 `hourStep` `minuteStep` `secondStep` 按步长展示可选的时间。

```tsx
import { TimePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TimePicker hourStep={2} minuteStep={15} secondStep={10} defaultValue="12:30:00" style={{ width: 200 }} />
    <TimePicker format="HH:mm" minuteStep={30} defaultValue="12:30" style={{ width: 200 }} />
  </Space>
);
```

### 12 小时制

12 小时制的时间选择器，默认的 format 为 `h:mm:ss a`。

```tsx
import { TimePicker } from 'wssf-kage-ui';

export default () => (
  <TimePicker use12Hours format="h:mm:ss A" defaultValue="12:30:00" style={{ width: 200 }} />
);
```

### 状态

使用 `status` 为 TimePicker 添加状态，可选 `error` 或 `warning`。

```tsx
import { TimePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <TimePicker status="error" defaultValue="12:30:00" style={{ width: 200 }} />
    <TimePicker status="warning" defaultValue="12:30:00" style={{ width: 200 }} />
  </Space>
);
```

### 不允许清除

设置 `allowClear` 为 false 不显示清除按钮。

```tsx
import { TimePicker } from 'wssf-kage-ui';

export default () => (
  <TimePicker defaultValue="12:30:00" allowClear={false} style={{ width: 200 }} />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前时间（受控） | `string \| TimeValue` | - |
| defaultValue | 默认时间 | `string \| TimeValue` | - |
| placeholder | 输入框占位文本 | `string` | `'请选择时间'` |
| format | 时间格式 | `string` | `'HH:mm:ss'` |
| disabled | 禁用全部操作 | `boolean` | `false` |
| allowClear | 是否展示清除按钮 | `boolean` | `true` |
| size | 输入框大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 设置校验状态 | `'error' \| 'warning'` | - |
| hourStep | 小时选项间隔 | `number` | `1` |
| minuteStep | 分钟选项间隔 | `number` | `1` |
| secondStep | 秒选项间隔 | `number` | `1` |
| disabledHours | 禁止选择部分小时选项 | `() => number[]` | - |
| disabledMinutes | 禁止选择部分分钟选项 | `(hour: number) => number[]` | - |
| disabledSeconds | 禁止选择部分秒选项 | `(hour: number, minute: number) => number[]` | - |
| hideDisabledOptions | 隐藏禁止选择的选项 | `boolean` | `false` |
| use12Hours | 使用 12 小时制 | `boolean` | `false` |
| onChange | 时间发生变化的回调 | `(time: TimeValue \| null, timeString: string) => void` | - |
| onOpenChange | 面板打开/关闭时的回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TimeValue

```typescript
interface TimeValue {
  hour: number;
  minute: number;
  second: number;
}
```

### format 格式

| 格式 | 说明 | 示例 |
| --- | --- | --- |
| HH | 24 小时制，两位数 | 01, 13, 23 |
| H | 24 小时制 | 1, 13, 23 |
| hh | 12 小时制，两位数 | 01, 12 |
| h | 12 小时制 | 1, 12 |
| mm | 分钟，两位数 | 05, 30 |
| m | 分钟 | 5, 30 |
| ss | 秒，两位数 | 05, 30 |
| s | 秒 | 5, 30 |
| A | 上午/下午（大写） | AM, PM |
| a | 上午/下午（小写） | am, pm |

