---
nav:
  title: 组件
  order: 2
group:
  title: 通用
  order: 1
title: FloatButton 悬浮按钮
---

# FloatButton 悬浮按钮

悬浮在页面固定位置的按钮。

## 何时使用

- 需要全局性的操作按钮。
- 返回顶部、快捷操作等场景。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { FloatButton } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <FloatButton icon="↑" />
  </div>
);
```

### 不同类型

支持不同类型。

```tsx
import { FloatButton, Space } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <Space direction="vertical" style={{ position: 'absolute', right: 24, bottom: 24, gap: 16 }}>
      <FloatButton icon="↑" type="default" />
      <FloatButton icon="↑" type="primary" />
      <FloatButton icon="✕" type="primary" danger />
    </Space>
  </div>
);
```

### 不同形状

支持圆形和方形。

```tsx
import { FloatButton, Space } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <Space direction="vertical" style={{ position: 'absolute', right: 24, bottom: 24, gap: 16 }}>
      <FloatButton icon="↑" shape="circle" />
      <FloatButton icon="↑" shape="square" />
    </Space>
  </div>
);
```

### 带描述

可以添加描述文字。

```tsx
import { FloatButton } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <FloatButton icon="↑" description="返回顶部" />
  </div>
);
```

### 带工具提示

可以添加工具提示。

```tsx
import { FloatButton } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <FloatButton icon="↑" tooltip="返回顶部" />
  </div>
);
```

### 按钮组

可以组合多个按钮。

```tsx
import { FloatButton } from 'wssf-kage-ui';

const { Group } = FloatButton;

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <Group trigger="click" style={{ position: 'absolute', right: 24, bottom: 24 }}>
      <FloatButton icon="↑" description="返回顶部" />
      <FloatButton icon="💬" description="客服" />
      <FloatButton icon="📝" description="反馈" />
    </Group>
  </div>
);
```

### 悬停触发

按钮组支持悬停触发。

```tsx
import { FloatButton } from 'wssf-kage-ui';

const { Group } = FloatButton;

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <Group trigger="hover" style={{ position: 'absolute', right: 24, bottom: 24 }}>
      <FloatButton icon="↑" description="返回顶部" />
      <FloatButton icon="💬" description="客服" />
      <FloatButton icon="📝" description="反馈" />
    </Group>
  </div>
);
```

### 自定义位置

可以通过样式自定义位置。

```tsx
import { FloatButton } from 'wssf-kage-ui';

export default () => (
  <div style={{ height: 400, position: 'relative' }}>
    <FloatButton
      icon="↑"
      style={{ position: 'absolute', right: 24, bottom: 24 }}
    />
  </div>
);
```

## API

### FloatButton

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 图标 | `ReactNode` | - |
| description | 描述文字 | `ReactNode` | - |
| type | 按钮类型 | `'default' \| 'primary'` | `'default'` |
| shape | 按钮形状 | `'circle' \| 'square'` | `'circle'` |
| tooltip | 工具提示 | `ReactNode` | - |
| danger | 是否危险按钮 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| onClick | 点击回调 | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发方式 | `'click' \| 'hover'` | `'click'` |
| open | 是否打开（受控） | `boolean` | - |
| defaultOpen | 默认是否打开 | `boolean` | `false` |
| onOpenChange | 打开状态改变回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

