---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Progress 进度条
---

# Progress 进度条

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过 2 秒时。
- 当需要显示一个操作完成的百分比时。

## 代码演示

### 基本使用

标准的进度条。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Progress percent={30} />
    <Progress percent={50} />
    <Progress percent={70} />
    <Progress percent={100} />
  </div>
);
```

### 不同状态

进度条有成功、异常、正常等状态。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Progress percent={30} status="normal" />
    <Progress percent={50} status="active" />
    <Progress percent={70} status="exception" />
    <Progress percent={100} status="success" />
  </div>
);
```

### 圆形进度条

支持圆形进度条。

```tsx
import { Progress, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Progress type="circle" percent={75} />
    <Progress type="circle" percent={70} status="exception" />
    <Progress type="circle" percent={100} status="success" />
  </Space>
);
```

### 不同尺寸

可以设置不同的尺寸。

```tsx
import { Progress, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Progress percent={50} strokeWidth={6} />
    <Progress percent={50} strokeWidth={8} />
    <Progress percent={50} strokeWidth={10} />
    <Space>
      <Progress type="circle" percent={75} size="small" />
      <Progress type="circle" percent={75} size="default" />
      <Progress type="circle" percent={75} size={160} />
    </Space>
  </Space>
);
```

### 自定义颜色

可以自定义进度条的颜色。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Progress percent={50} strokeColor="#ff4d4f" />
    <Progress percent={50} strokeColor="#52c41a" />
    <Progress percent={50} strokeColor={{ from: '#108ee9', to: '#87d068' }} />
  </div>
);
```

### 步骤进度条

支持步骤进度条。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Progress percent={50} steps={5} />
    <Progress percent={100} steps={5} />
    <Progress
      percent={60}
      steps={5}
      success={{ percent: 30, strokeColor: '#52c41a' }}
    />
  </div>
);
```

### 仪表盘进度条

支持仪表盘样式的圆形进度条。

```tsx
import { Progress, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={100} status="success" />
  </Space>
);
```

### 不显示百分比

可以隐藏百分比显示。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Progress percent={50} showInfo={false} />
    <Progress type="circle" percent={75} showInfo={false} />
  </div>
);
```

### 自定义格式

可以自定义百分比显示格式。

```tsx
import { Progress } from 'wssf-kage-ui';

export default () => (
  <Progress
    percent={50}
    format={(percent) => `${percent} 完成`}
  />
);
```

## API

### Progress

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| percent | 百分比，范围 0-100 | `number` | `0` |
| showInfo | 是否显示进度数值或状态图标 | `boolean` | `true` |
| status | 进度条状态 | `'success' \| 'exception' \| 'active' \| 'normal'` | `'normal'` |
| type | 进度条类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` |
| size | 进度条尺寸（仅对 circle 和 dashboard 类型有效） | `number \| 'default' \| 'small'` | `'default'` |
| strokeColor | 进度条颜色 | `string \| { from: string; to: string }` | - |
| trailColor | 未完成部分的颜色 | `string` | - |
| strokeWidth | 进度条宽度（仅对 line 类型有效） | `number` | - |
| format | 自定义格式函数 | `(percent?: number) => ReactNode` | - |
| steps | 是否显示步骤进度 | `number` | - |
| success | 步骤进度条中成功的步数 | `{ percent: number; strokeColor?: string }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

