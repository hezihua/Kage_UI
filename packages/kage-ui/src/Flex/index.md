---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Flex 弹性布局
---

# Flex 弹性布局

弹性布局容器，基于 CSS Flexbox 实现。

## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。
- 作为 CSS Flex 布局的快捷使用方式。

## 代码演示

### 基本使用

最基本的用法，设置子元素水平排列。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex gap="middle">
    <Button type="primary">按钮 1</Button>
    <Button>按钮 2</Button>
    <Button>按钮 3</Button>
    <Button>按钮 4</Button>
  </Flex>
);
```

### 垂直布局

使用 `vertical` 属性设置垂直布局。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex vertical gap="middle">
    <Button type="primary">按钮 1</Button>
    <Button>按钮 2</Button>
    <Button>按钮 3</Button>
  </Flex>
);
```

### 对齐方式

设置 `justify` 和 `align` 调整对齐方式。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex vertical gap="large">
    <Flex justify="flex-start" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>flex-start</Button>
      <Button>flex-start</Button>
    </Flex>
    <Flex justify="center" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>center</Button>
      <Button>center</Button>
    </Flex>
    <Flex justify="flex-end" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>flex-end</Button>
      <Button>flex-end</Button>
    </Flex>
    <Flex justify="space-between" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>space-between</Button>
      <Button>space-between</Button>
    </Flex>
    <Flex justify="space-around" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>space-around</Button>
      <Button>space-around</Button>
    </Flex>
    <Flex justify="space-evenly" style={{ background: '#f5f5f5', padding: 16 }}>
      <Button>space-evenly</Button>
      <Button>space-evenly</Button>
    </Flex>
  </Flex>
);
```

### 间距

通过 `gap` 设置元素之间的间距，预设了 `small`、`middle`、`large` 三种尺寸，也可以自定义数值。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex vertical gap="large">
    <Flex gap="small">
      <Button type="primary">small</Button>
      <Button>small</Button>
      <Button>small</Button>
    </Flex>
    <Flex gap="middle">
      <Button type="primary">middle</Button>
      <Button>middle</Button>
      <Button>middle</Button>
    </Flex>
    <Flex gap="large">
      <Button type="primary">large</Button>
      <Button>large</Button>
      <Button>large</Button>
    </Flex>
    <Flex gap={32}>
      <Button type="primary">32px</Button>
      <Button>32px</Button>
      <Button>32px</Button>
    </Flex>
  </Flex>
);
```

### 自动换行

设置 `wrap` 属性开启自动换行。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex wrap gap="small" style={{ width: 300 }}>
    <Button type="primary">按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
    <Button>按钮</Button>
  </Flex>
);
```

### 垂直对齐

设置 `align` 属性控制垂直方向对齐。

```tsx
import { Flex, Button } from 'wssf-kage-ui';

export default () => (
  <Flex vertical gap="middle">
    <Flex align="flex-start" gap="middle" style={{ background: '#f5f5f5', padding: 16, height: 80 }}>
      <Button>flex-start</Button>
      <Button type="primary" style={{ height: 50 }}>高按钮</Button>
    </Flex>
    <Flex align="center" gap="middle" style={{ background: '#f5f5f5', padding: 16, height: 80 }}>
      <Button>center</Button>
      <Button type="primary" style={{ height: 50 }}>高按钮</Button>
    </Flex>
    <Flex align="flex-end" gap="middle" style={{ background: '#f5f5f5', padding: 16, height: 80 }}>
      <Button>flex-end</Button>
      <Button type="primary" style={{ height: 50 }}>高按钮</Button>
    </Flex>
  </Flex>
);
```

### 组合使用

结合 `flex` 属性分配空间。

```tsx
import { Flex, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const boxStyle: React.CSSProperties = {
  height: 60,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  color: '#fff',
  fontWeight: 500,
};

export default () => (
  <Flex gap="middle">
    <div style={{ ...boxStyle, flex: 1, background: '#6366f1' }}>
      <Text style={{ color: '#fff' }}>flex: 1</Text>
    </div>
    <div style={{ ...boxStyle, flex: 2, background: '#8b5cf6' }}>
      <Text style={{ color: '#fff' }}>flex: 2</Text>
    </div>
    <div style={{ ...boxStyle, flex: 1, background: '#a855f7' }}>
      <Text style={{ color: '#fff' }}>flex: 1</Text>
    </div>
  </Flex>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| vertical | 是否垂直布局 | `boolean` | `false` |
| direction | 主轴方向 | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` |
| wrap | 是否自动换行 | `boolean \| 'nowrap' \| 'wrap' \| 'wrap-reverse'` | `'nowrap'` |
| justify | 主轴对齐方式 | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'space-evenly'` | - |
| align | 交叉轴对齐方式 | `'flex-start' \| 'flex-end' \| 'center' \| 'baseline' \| 'stretch'` | - |
| alignContent | 多行对齐方式 | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| 'space-around' \| 'stretch'` | - |
| gap | 间距 | `'small' \| 'middle' \| 'large' \| number \| [number, number]` | - |
| inline | 是否为行内元素 | `boolean` | `false` |
| flex | flex CSS 属性 | `string \| number` | - |
| component | 自定义元素标签 | `keyof JSX.IntrinsicElements` | `'div'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

