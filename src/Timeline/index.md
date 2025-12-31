---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Timeline 时间轴
---

# Timeline 时间轴

垂直展示的时间流信息。

## 何时使用

- 当有一系列信息需按时间排列时，可正序和倒序。
- 需要有一条时间轴进行视觉上的串联时。

## 代码演示

### 基本使用

基本的时间轴。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline>
    <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item>初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item>技术测试异常 2023-09-01</Timeline.Item>
    <Timeline.Item>网络异常正在修复 2023-09-01</Timeline.Item>
  </Timeline>
);
```

### 圆点颜色

使用 `color` 属性设置圆点的颜色。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline>
    <Timeline.Item color="green">创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item color="green">初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item color="red">
      <p>技术测试异常 2023-09-01</p>
      <p>问题原因：网络连接超时</p>
      <p>解决方案：重新配置网络参数</p>
    </Timeline.Item>
    <Timeline.Item>
      <p>网络异常正在修复 2023-09-01</p>
      <p>预计完成时间：2023-09-02</p>
    </Timeline.Item>
    <Timeline.Item color="gray">
      <p>等待进一步操作</p>
    </Timeline.Item>
  </Timeline>
);
```

### 自定义圆点

可以使用 `dot` 属性自定义时间轴圆点。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline>
    <Timeline.Item dot="🚀">发布新版本 v2.0.0</Timeline.Item>
    <Timeline.Item dot="🔧">修复了若干 bug</Timeline.Item>
    <Timeline.Item dot="✨">新增了多个功能</Timeline.Item>
    <Timeline.Item dot="📝">更新了文档</Timeline.Item>
  </Timeline>
);
```

### 最后一个及排序

当任务状态正在发生，还在记录过程中，使用 `pending` 表示未完成或正在进行中的状态。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline pending="正在记录中...">
    <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item>初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item>技术测试异常 2023-09-01</Timeline.Item>
  </Timeline>
);
```

### 自定义 pending 圆点

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline pending="加载中..." pendingDot="⏳">
    <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item>初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item>技术测试异常 2023-09-01</Timeline.Item>
  </Timeline>
);
```

### 倒序

使用 `reverse` 属性使时间轴倒序展示。

```tsx
import { Timeline, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [reverse, setReverse] = useState(false);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={() => setReverse(!reverse)}>
        {reverse ? '正序' : '倒序'}
      </Button>
      <Timeline reverse={reverse} pending="等待处理中...">
        <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
        <Timeline.Item>初步排查问题 2023-09-02</Timeline.Item>
        <Timeline.Item>技术测试异常 2023-09-03</Timeline.Item>
      </Timeline>
    </Space>
  );
};
```

### 交替展示

使用 `mode="alternate"` 使内容交替展示在时间轴两侧。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline mode="alternate">
    <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item color="green">初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item dot="🔧">
      <p>技术测试异常 2023-09-01</p>
      <p>问题详情：数据库连接失败</p>
    </Timeline.Item>
    <Timeline.Item color="red">网络异常正在修复 2023-09-01</Timeline.Item>
    <Timeline.Item>问题已解决 2023-09-02</Timeline.Item>
  </Timeline>
);
```

### 右侧展示

使用 `mode="right"` 使时间轴内容靠右展示。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline mode="right">
    <Timeline.Item>创建服务现场 2023-09-01</Timeline.Item>
    <Timeline.Item>初步排查问题 2023-09-01</Timeline.Item>
    <Timeline.Item dot="🔍">技术测试异常 2023-09-01</Timeline.Item>
    <Timeline.Item color="red">网络异常正在修复 2023-09-01</Timeline.Item>
  </Timeline>
);
```

### 带标签的节点

使用 `label` 属性可以在节点另一侧添加标签，适用于 `alternate` 和 `right` 模式。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline mode="alternate">
    <Timeline.Item label="2023-09-01 09:00">创建服务现场</Timeline.Item>
    <Timeline.Item label="2023-09-01 10:30">初步排查问题</Timeline.Item>
    <Timeline.Item label="2023-09-01 14:00" color="red">
      技术测试异常
    </Timeline.Item>
    <Timeline.Item label="2023-09-01 16:00">网络异常正在修复</Timeline.Item>
    <Timeline.Item label="2023-09-02 09:00" color="green">
      问题已解决
    </Timeline.Item>
  </Timeline>
);
```

### 自定义颜色

除了预设颜色，还可以使用自定义颜色。

```tsx
import { Timeline } from 'wssf-kage-ui';

export default () => (
  <Timeline>
    <Timeline.Item color="#1890ff">蓝色</Timeline.Item>
    <Timeline.Item color="#52c41a">绿色</Timeline.Item>
    <Timeline.Item color="#faad14">橙色</Timeline.Item>
    <Timeline.Item color="#eb2f96">粉色</Timeline.Item>
    <Timeline.Item color="#722ed1">紫色</Timeline.Item>
  </Timeline>
);
```

## API

### Timeline

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 时间轴点的位置模式 | `'left' \| 'alternate' \| 'right'` | `'left'` |
| pending | 指定最后一个幽灵节点的内容 | `ReactNode \| boolean` | - |
| pendingDot | 当最后一个幽灵节点存在时，指定其圆点 | `ReactNode` | - |
| reverse | 是否倒序排列 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Timeline.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 圆点颜色，可以是预设颜色或自定义颜色 | `'blue' \| 'green' \| 'red' \| 'gray' \| string` | `'blue'` |
| dot | 自定义时间轴点 | `ReactNode` | - |
| label | 设置标签（在 alternate 和 right 模式下显示在另一侧） | `ReactNode` | - |
| position | 自定义节点位置（仅在 alternate 模式下生效） | `'left' \| 'right'` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### 预设颜色

- `blue` - 蓝色（默认）
- `green` - 绿色
- `red` - 红色
- `gray` - 灰色

