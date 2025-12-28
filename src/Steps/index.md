---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Steps 步骤条
---

# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## 代码演示

### 基本使用

简单的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是描述' },
  { title: '进行中', description: '这是描述' },
  { title: '待处理', description: '这是描述' },
];

export default () => <Steps current={1} items={items} />;
```

### 带图标的步骤条

通过 `icon` 自定义步骤图标。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '登录', icon: '👤' },
  { title: '验证', icon: '🔐' },
  { title: '支付', icon: '💳' },
  { title: '完成', icon: '✅' },
];

export default () => <Steps current={1} items={items} />;
```

### 步骤切换

通过 `onChange` 实现可点击切换的步骤条。

```tsx
import { Steps, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const items = [
  { title: '第一步', description: '填写基本信息' },
  { title: '第二步', description: '上传材料' },
  { title: '第三步', description: '审核中' },
  { title: '第四步', description: '完成' },
];

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Steps current={current} onChange={setCurrent} items={items} />
      <div style={{ marginTop: 24, padding: 16, background: 'var(--dumi-default-border-color, #f5f5f5)', borderRadius: 8 }}>
        <Text>当前步骤内容: {items[current].description}</Text>
      </div>
    </div>
  );
};
```

### 垂直步骤条

垂直方向的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是第一步的描述信息' },
  { title: '进行中', description: '这是第二步的描述信息' },
  { title: '待处理', description: '这是第三步的描述信息' },
  { title: '待处理', description: '这是第四步的描述信息' },
];

export default () => <Steps direction="vertical" current={1} items={items} />;
```

### 小尺寸

小尺寸的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成' },
  { title: '进行中' },
  { title: '待处理' },
];

export default () => <Steps size="small" current={1} items={items} />;
```

### 错误状态

步骤运行错误时的状态。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是描述' },
  { title: '进行中', description: '这是描述' },
  { title: '待处理', description: '这是描述' },
];

export default () => <Steps current={1} status="error" items={items} />;
```

### 点状步骤条

包含步骤点的进度条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是描述' },
  { title: '进行中', description: '这是描述' },
  { title: '待处理', description: '这是描述' },
  { title: '待处理', description: '这是描述' },
];

export default () => <Steps progressDot current={1} items={items} />;
```

### 垂直点状步骤条

垂直方向的点状步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是描述信息' },
  { title: '进行中', description: '这是描述信息' },
  { title: '待处理', description: '这是描述信息' },
];

export default () => (
  <Steps direction="vertical" progressDot current={1} items={items} />
);
```

### 带子标题

带有子标题的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', subTitle: '00:00:05' },
  { title: '进行中', subTitle: '00:01:02' },
  { title: '待处理', subTitle: '等待中' },
];

export default () => <Steps current={1} items={items} />;
```

### 标签垂直布局

标签垂直放置的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', description: '这是描述' },
  { title: '进行中', description: '这是描述' },
  { title: '待处理', description: '这是描述' },
];

export default () => (
  <Steps current={1} labelPlacement="vertical" items={items} />
);
```

### 导航类型

导航类型的步骤条。

```tsx
import { Steps } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { title: '步骤一' },
  { title: '步骤二' },
  { title: '步骤三' },
];

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <Steps
      type="navigation"
      current={current}
      onChange={setCurrent}
      items={items}
    />
  );
};
```

### 自定义状态

为每个步骤单独设置状态。

```tsx
import { Steps } from 'wssf-kage-ui';

const items = [
  { title: '已完成', status: 'finish' },
  { title: '错误', status: 'error' },
  { title: '进行中', status: 'process' },
  { title: '待处理', status: 'wait' },
];

export default () => <Steps items={items} />;
```

## API

### Steps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 步骤项配置 | `StepItem[]` | - |
| current | 当前步骤 | `number` | `0` |
| direction | 方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| type | 类型 | `'default' \| 'navigation' \| 'inline'` | `'default'` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| status | 全局状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | `'process'` |
| progressDot | 点状步骤条 | `boolean \| (dot, { index, status }) => ReactNode` | `false` |
| labelPlacement | 标签位置 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| initial | 起始序号 | `number` | `0` |
| onChange | 点击回调 | `(current: number) => void` | - |
| clickable | 是否可点击 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### StepItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| subTitle | 子标题 | `ReactNode` | - |
| icon | 图标 | `ReactNode` | - |
| status | 状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | - |
| disabled | 是否禁用 | `boolean` | `false` |

