---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Skeleton 骨架屏
---

# Skeleton 骨架屏

在需要等待加载内容的位置设置一个骨架屏，某些场景下比 Loading 的视觉效果更好。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下。
- 图文信息内容较多的列表/卡片中。
- 只在第一次加载数据的时候使用。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Skeleton } from 'wssf-kage-ui';

export default () => <Skeleton />;
```

### 包含头像

显示头像占位图。

```tsx
import { Skeleton } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Skeleton avatar />
    <Skeleton avatar={{ size: 'large' }} />
    <Skeleton avatar={{ size: 'small', shape: 'square' }} />
  </div>
);
```

### 自定义段落

自定义段落行数和宽度。

```tsx
import { Skeleton } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Skeleton paragraph={{ rows: 4 }} />
    <Skeleton paragraph={{ rows: 2, width: ['60%', '80%'] }} />
    <Skeleton paragraph={{ rows: 1, width: '50%' }} />
  </div>
);
```

### 动画效果

显示动画效果。

```tsx
import { Skeleton } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Skeleton active />
    <Skeleton avatar active />
    <Skeleton avatar active paragraph={{ rows: 4 }} />
  </div>
);
```

### 加载状态

可以控制加载状态。

```tsx
import { useState } from 'react';
import { Skeleton, Button } from 'wssf-kage-ui';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 16 }}>
        {loading ? '显示内容' : '显示骨架屏'}
      </Button>
      <Skeleton loading={loading}>
        <div>
          <h3>这是实际内容</h3>
          <p>当 loading 为 false 时，会显示这里的内容。</p>
        </div>
      </Skeleton>
    </div>
  );
};
```

### 按钮骨架屏

按钮样式的骨架屏。

```tsx
import { Skeleton, Space } from 'wssf-kage-ui';

const { Button } = Skeleton;

export default () => (
  <Space>
    <Button size="small" />
    <Button size="default" />
    <Button size="large" />
    <Button size="default" block />
  </Space>
);
```

### 输入框骨架屏

输入框样式的骨架屏。

```tsx
import { Skeleton, Space } from 'wssf-kage-ui';

const { Input } = Skeleton;

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Input size="small" />
    <Input size="default" />
    <Input size="large" />
    <Input size="default" block />
  </Space>
);
```

### 图片骨架屏

图片样式的骨架屏。

```tsx
import { Skeleton, Space } from 'wssf-kage-ui';

const { Image } = Skeleton;

export default () => (
  <Space>
    <Image size="small" />
    <Image size="default" />
    <Image size="large" />
    <Image size={200} />
  </Space>
);
```

### 头像骨架屏

头像样式的骨架屏。

```tsx
import { Skeleton, Space } from 'wssf-kage-ui';

const { Avatar } = Skeleton;

export default () => (
  <Space>
    <Avatar size="small" />
    <Avatar size="default" />
    <Avatar size="large" />
    <Avatar size={60} shape="square" />
  </Space>
);
```

### 组合使用

可以组合使用多个骨架屏组件。

```tsx
import { Skeleton, Space } from 'wssf-kage-ui';

const { Avatar, Button, Input } = Skeleton;

export default () => (
  <div style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8 }}>
    <Space direction="vertical" style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Avatar size="large" active />
        <div style={{ flex: 1 }}>
          <Skeleton title={{ width: '60%' }} paragraph={{ rows: 1 }} active />
        </div>
      </div>
      <Input block active />
      <Space>
        <Button active />
        <Button active />
      </Space>
    </Space>
  </div>
);
```

## API

### Skeleton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| active | 是否显示动画效果 | `boolean` | `false` |
| avatar | 是否显示头像占位图 | `boolean \| { size?: 'large' \| 'small' \| 'default'; shape?: 'circle' \| 'square' }` | `false` |
| paragraph | 是否显示段落占位图 | `boolean \| { rows?: number; width?: number \| string \| (number \| string)[] }` | `true` |
| title | 是否显示标题占位图 | `boolean \| { width?: number \| string }` | `true` |
| loading | 是否加载中 | `boolean` | `true` |
| round | 是否圆角 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素（当 loading 为 false 时显示） | `ReactNode` | - |

### Skeleton.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 按钮大小 | `'large' \| 'small' \| 'default'` | `'default'` |
| block | 是否块级按钮 | `boolean` | `false` |
| active | 是否显示动画效果 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Input

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 输入框大小 | `'large' \| 'small' \| 'default'` | `'default'` |
| block | 是否块级输入框 | `boolean` | `false` |
| active | 是否显示动画效果 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Image

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 图片大小 | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| active | 是否显示动画效果 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Skeleton.Avatar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 头像大小 | `number \| 'large' \| 'small' \| 'default'` | `'default'` |
| shape | 头像形状 | `'circle' \| 'square'` | `'circle'` |
| active | 是否显示动画效果 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

