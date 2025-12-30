---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Avatar 头像
---

# Avatar 头像

用来代表用户或事物，支持图片、图标或字符展示。

## 何时使用

用来展示用户或事物的信息。

## 代码演示

### 基本使用

头像有四种尺寸，两种形状可选。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Avatar size={48} icon="👤" />
    <Avatar size="large" icon="👤" />
    <Avatar icon="👤" />
    <Avatar size="small" icon="👤" />
  </Space>
);
```

### 类型

支持三种类型：图片、Icon 以及字符。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Avatar icon="👤" />
    <Avatar>U</Avatar>
    <Avatar>USER</Avatar>
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
  </Space>
);
```

### 形状

支持两种形状：圆形和方形。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Avatar shape="circle" icon="👤" />
    <Avatar shape="circle">A</Avatar>
    <Avatar shape="square" icon="👤" />
    <Avatar shape="square">B</Avatar>
  </Space>
);
```

### 图片头像

使用 `src` 属性指定图片地址。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
  </Space>
);
```

### 自定义尺寸

对于大于或小于默认尺寸的头像，可以使用数字来自定义大小。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large" align="center">
    <Avatar size={64} icon="👤" />
    <Avatar size={48} icon="👤" />
    <Avatar size={40} icon="👤" />
    <Avatar size={32} icon="👤" />
    <Avatar size={24} icon="👤" />
  </Space>
);
```

### 头像组

头像组合展示。

```tsx
import { Avatar } from 'wssf-kage-ui';

const { Group } = Avatar;

export default () => (
  <Group>
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
  </Group>
);
```

### 头像组最大数量

头像组可以设置最多显示的头像数量。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

const { Group } = Avatar;

export default () => (
  <Space direction="vertical">
    <Group maxCount={3}>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=4" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=5" />
    </Group>
    
    <Group maxCount={2}>
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
      <Avatar>C</Avatar>
      <Avatar>D</Avatar>
    </Group>
  </Space>
);
```

### 头像组尺寸

可以通过 `size` 属性统一设置头像组中所有头像的大小。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

const { Group } = Avatar;

export default () => (
  <Space direction="vertical">
    <Group size="large">
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    </Group>
    
    <Group>
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    </Group>
    
    <Group size="small">
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=2" />
      <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=3" />
    </Group>
  </Space>
);
```

### 字母头像

使用文字作为头像。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Avatar>A</Avatar>
    <Avatar>AB</Avatar>
    <Avatar>张</Avatar>
    <Avatar>张三</Avatar>
  </Space>
);
```

### 响应式尺寸

Avatar 头像的尺寸也可以是响应式的。

```tsx
import { Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="large">
    <div>
      <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>预设尺寸：</div>
      <Space size="large">
        <Avatar size="large">Large</Avatar>
        <Avatar>Default</Avatar>
        <Avatar size="small">Small</Avatar>
      </Space>
    </div>
    
    <div>
      <div style={{ marginBottom: 8, color: 'rgba(0,0,0,0.65)' }}>自定义尺寸：</div>
      <Space size="large" align="center">
        <Avatar size={80}>80</Avatar>
        <Avatar size={64}>64</Avatar>
        <Avatar size={48}>48</Avatar>
        <Avatar size={32}>32</Avatar>
        <Avatar size={24}>24</Avatar>
      </Space>
    </div>
  </Space>
);
```

## API

### Avatar

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片无法显示时的替代文本 | `string` | - |
| icon | 设置头像的图标 | `ReactNode` | - |
| shape | 头像的形状 | `'circle' \| 'square'` | `'circle'` |
| size | 头像的大小 | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| onError | 图片加载失败的事件 | `() => boolean` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 文本内容 | `ReactNode` | - |

### Avatar.Group

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| maxCount | 最多显示的头像数量 | `number` | - |
| maxPopoverPlacement | 多余头像的提示位置 | `'top' \| 'bottom'` | `'top'` |
| maxStyle | 多余头像的样式 | `CSSProperties` | - |
| size | 头像的大小（统一设置） | `number \| 'large' \| 'default' \| 'small'` | `'default'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

