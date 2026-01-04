---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Slider 滑动输入条
---

# Slider 滑动输入条

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间内进行选择时。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Slider } from 'wssf-kage-ui';

export default () => <Slider defaultValue={30} style={{ width: '100%' }} />;
```

### 带有输入框

和数字输入框组件配合使用。

```tsx
import { Slider, InputNumber, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState(30);

  return (
    <div style={{ display: 'flex', gap: '16px', width: '100%', alignItems: 'center' }}>
      <Slider value={value} onChange={setValue} style={{ flex: 1 }} />
      <InputNumber value={value} onChange={setValue} style={{ width: 80 }} />
    </div>
  );
};
```

### 自定义步长

可以通过设置 `step` 来改变步长。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Slider defaultValue={30} step={10} style={{ width: '100%' }} />
    <Slider defaultValue={0.5} min={0} max={1} step={0.1} style={{ width: '100%' }} />
  </Space>
);
```

### 带刻度

使用 `dots` 显示刻度。

```tsx
import { Slider } from 'wssf-kage-ui';

export default () => <Slider defaultValue={30} dots step={10} style={{ width: '100%' }} />;
```

### 刻度标记

使用 `marks` 显示刻度标记。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

const marks = {
  0: '0°C',
  50: '50°C',
  100: '100°C',
};

const customMarks = {
  0: '0°C',
  50: {
    style: { color: '#f50' },
    label: <strong>50°C</strong>,
  },
  100: '100°C',
};

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>基本刻度标记：</div>
      <Slider marks={marks} defaultValue={50} style={{ width: '100%' }} />
    </div>
    <div style={{ marginBottom: 24 }}>
      <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>自定义样式标记：</div>
      <Slider marks={customMarks} defaultValue={50} style={{ width: '100%' }} />
    </div>
    <div>
      <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>不包含关系（并列）：</div>
      <Slider marks={marks} included={false} defaultValue={50} style={{ width: '100%' }} />
    </div>
  </Space>
);
```

### 范围选择

双滑块模式，用 `range` 开启。

```tsx
import { Slider } from 'wssf-kage-ui';

export default () => <Slider range defaultValue={[20, 50]} style={{ width: '100%' }} />;
```

### 范围选择与刻度

范围选择配合刻度使用。

```tsx
import { Slider } from 'wssf-kage-ui';

const marks = {
  0: '0°C',
  50: '50°C',
  100: '100°C',
};

export default () => (
  <Slider range marks={marks} defaultValue={[25, 75]} style={{ width: '100%' }} />
);
```

### 垂直

垂直方向的 Slider。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

const marks = {
  0: '0°C',
  50: '50°C',
  100: '100°C',
};

export default () => (
  <Space size="large" style={{ height: 300 }}>
    <Slider vertical defaultValue={30} />
    <Slider vertical range defaultValue={[20, 50]} />
    <Slider vertical marks={marks} defaultValue={50} />
  </Space>
);
```

### 禁用

禁用状态下，滑块不可拖动。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Slider defaultValue={30} disabled style={{ width: '100%' }} />
    <Slider range defaultValue={[20, 50]} disabled style={{ width: '100%' }} />
  </Space>
);
```

### 反向

通过 `reverse` 可以将滑块方向反转。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Slider defaultValue={30} reverse style={{ width: '100%' }} />
    <Slider range defaultValue={[20, 50]} reverse style={{ width: '100%' }} />
  </Space>
);
```

### 自定义提示

使用 `tipFormatter` 自定义提示内容，设置为 `null` 可以隐藏提示。

```tsx
import { Slider, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Slider tipFormatter={(value) => `${value}%`} defaultValue={30} style={{ width: '100%' }} />
    <Slider tipFormatter={(value) => `¥${value}`} defaultValue={100} max={1000} style={{ width: '100%' }} />
    <Slider tipFormatter={null} defaultValue={30} style={{ width: '100%' }} />
  </Space>
);
```

### 事件回调

监听值变化和拖动完成事件。

```tsx
import { Slider, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [value, setValue] = useState(30);
  const [afterChangeValue, setAfterChangeValue] = useState(30);

  return (
    <div>
      <Slider
        value={value}
        onChange={setValue}
        onAfterChange={setAfterChangeValue}
        style={{ width: '100%' }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>当前值: <Text code>{value}</Text></Text>
        <br />
        <Text>拖动完成值: <Text code>{afterChangeValue}</Text></Text>
      </div>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `number \| [number, number]` | - |
| defaultValue | 默认值 | `number \| [number, number]` | `0` 或 `[0, 0]` |
| min | 最小值 | `number` | `0` |
| max | 最大值 | `number` | `100` |
| step | 步长 | `number` | `1` |
| disabled | 是否禁用 | `boolean` | `false` |
| range | 是否为范围选择 | `boolean` | `false` |
| dots | 是否显示刻度点 | `boolean` | `false` |
| vertical | 是否垂直布局 | `boolean` | `false` |
| marks | 刻度标记 | `Record<number, ReactNode>` | - |
| included | 是否包含关系，`false` 时为并列关系 | `boolean` | `true` |
| reverse | 是否反向 | `boolean` | `false` |
| tipFormatter | 工具提示的格式化函数，设为 `null` 隐藏 | `(value) => ReactNode \| null` | `(val) => val.toString()` |
| onChange | 值变化回调 | `(value) => void` | - |
| onAfterChange | 拖动完成回调 | `(value) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

