---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Space 间距
---

# Space 间距

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。
- 需要表单组件之间紧凑连接且合并边框时，使用 `Space.Compact`。

## 代码演示

### 基本使用

相邻组件水平间距。

```tsx
import { Space, Button } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button type="primary">按钮</Button>
    <Button>默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="link">链接按钮</Button>
  </Space>
);
```

### 垂直间距

可以设置 `direction="vertical"` 实现垂直方向间距。

```tsx
import { Space, Button } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Button type="primary">按钮 1</Button>
    <Button>按钮 2</Button>
    <Button type="dashed">按钮 3</Button>
  </Space>
);
```

### 间距大小

间距预设大、中、小三种大小。也可以自定义间距数值。

```tsx
import { Space, Button, Divider } from 'wssf-kage-ui';

export default () => (
  <div>
    <Space size="small">
      <Button type="primary">Small</Button>
      <Button>Small</Button>
      <Button>Small</Button>
    </Space>

    <Divider />

    <Space size="middle">
      <Button type="primary">Middle</Button>
      <Button>Middle</Button>
      <Button>Middle</Button>
    </Space>

    <Divider />

    <Space size="large">
      <Button type="primary">Large</Button>
      <Button>Large</Button>
      <Button>Large</Button>
    </Space>

    <Divider />

    <Space size={32}>
      <Button type="primary">32px</Button>
      <Button>32px</Button>
      <Button>32px</Button>
    </Space>
  </div>
);
```

### 对齐方式

设置 `align` 属性控制对齐方式。注意观察不同高度元素的对齐效果。

```tsx
import { Space, Button, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const boxStyle: React.CSSProperties = {
  padding: '16px',
  background: 'rgba(99, 102, 241, 0.1)',
  borderRadius: 8,
};

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <div>
      <Text strong>start (顶部对齐):</Text>
      <Space align="start" style={{ ...boxStyle, marginTop: 8 }}>
        <div style={{ height: 40, width: 60, background: '#6366f1', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>40px</div>
        <div style={{ height: 80, width: 60, background: '#8b5cf6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>80px</div>
        <div style={{ height: 60, width: 60, background: '#a855f7', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>60px</div>
      </Space>
    </div>

    <div>
      <Text strong>center (垂直居中):</Text>
      <Space align="center" style={{ ...boxStyle, marginTop: 8 }}>
        <div style={{ height: 40, width: 60, background: '#6366f1', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>40px</div>
        <div style={{ height: 80, width: 60, background: '#8b5cf6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>80px</div>
        <div style={{ height: 60, width: 60, background: '#a855f7', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>60px</div>
      </Space>
    </div>

    <div>
      <Text strong>end (底部对齐):</Text>
      <Space align="end" style={{ ...boxStyle, marginTop: 8 }}>
        <div style={{ height: 40, width: 60, background: '#6366f1', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>40px</div>
        <div style={{ height: 80, width: 60, background: '#8b5cf6', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>80px</div>
        <div style={{ height: 60, width: 60, background: '#a855f7', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>60px</div>
      </Space>
    </div>

    <div>
      <Text strong>baseline (文字基线对齐):</Text>
      <Space align="baseline" style={{ ...boxStyle, marginTop: 8 }}>
        <span style={{ fontSize: 12 }}>小字</span>
        <span style={{ fontSize: 24 }}>中字</span>
        <span style={{ fontSize: 36 }}>大字</span>
        <Button>按钮</Button>
      </Space>
    </div>
  </div>
);
```

### 自动换行

通过 `wrap` 属性设置自动换行。

```tsx
import { Space, Button } from 'wssf-kage-ui';

export default () => (
  <Space wrap size={[8, 16]} style={{ width: 300 }}>
    <Button>按钮 1</Button>
    <Button>按钮 2</Button>
    <Button>按钮 3</Button>
    <Button>按钮 4</Button>
    <Button>按钮 5</Button>
    <Button>按钮 6</Button>
    <Button>按钮 7</Button>
    <Button>按钮 8</Button>
  </Space>
);
```

### 分隔符

使用 `split` 属性设置分隔符。

```tsx
import { Space, Typography, Divider } from 'wssf-kage-ui';

const { Link } = Typography;

export default () => (
  <Space split={<Divider type="vertical" />}>
    <Link href="#">链接 1</Link>
    <Link href="#">链接 2</Link>
    <Link href="#">链接 3</Link>
  </Space>
);
```

### 紧凑布局

使用 `Space.Compact` 让子组件紧凑排列，合并边框。

```tsx
import { Space, Button } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Space.Compact>
      <Button>按钮 1</Button>
      <Button>按钮 2</Button>
      <Button>按钮 3</Button>
    </Space.Compact>

    <Space.Compact>
      <Button type="primary">搜索</Button>
      <Button>重置</Button>
    </Space.Compact>

    <Space.Compact direction="vertical">
      <Button>上</Button>
      <Button>中</Button>
      <Button>下</Button>
    </Space.Compact>
  </div>
);
```

## API

### Space

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 间距方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| size | 间距大小 | `'small' \| 'middle' \| 'large' \| number \| [SpaceSize, SpaceSize]` | `'small'` |
| align | 对齐方式 | `'start' \| 'end' \| 'center' \| 'baseline'` | - |
| wrap | 是否自动换行 | `boolean` | `false` |
| split | 分隔符 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Space.Compact

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| direction | 排列方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| block | 是否为块级元素 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

