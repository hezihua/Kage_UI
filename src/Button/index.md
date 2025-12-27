---
nav:
  title: 组件
  order: 2
group:
  title: 通用
  order: 1
title: Button 按钮
---

# Button 按钮

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

## 代码演示

### 按钮类型

按钮有五种类型：主按钮、默认按钮、虚线按钮、文本按钮和链接按钮。

```tsx
import { Button } from 'kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <Button type="primary">主按钮</Button>
    <Button type="default">默认按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="text">文本按钮</Button>
    <Button type="link">链接按钮</Button>
  </div>
);
```

### 按钮尺寸

按钮有大、中、小三种尺寸。

```tsx
import { Button } from 'kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
    <Button type="primary" size="large">大号按钮</Button>
    <Button type="primary" size="middle">中号按钮</Button>
    <Button type="primary" size="small">小号按钮</Button>
  </div>
);
```

### 禁用状态

添加 `disabled` 属性即可让按钮处于不可用状态。

```tsx
import { Button } from 'kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <Button type="primary" disabled>禁用主按钮</Button>
    <Button disabled>禁用默认按钮</Button>
    <Button type="dashed" disabled>禁用虚线按钮</Button>
  </div>
);
```

### 加载中状态

添加 `loading` 属性即可让按钮处于加载状态。

```tsx
import { Button } from 'kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '12px' }}>
    <Button type="primary" loading>加载中</Button>
    <Button loading>加载中</Button>
  </div>
);
```

### 块级按钮

`block` 属性将使按钮适合其父宽度。

```tsx
import { Button } from 'kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
    <Button type="primary" block>主按钮</Button>
    <Button block>默认按钮</Button>
  </div>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| block | 是否为块级按钮 | `boolean` | `false` |
| onClick | 点击事件 | `(event: MouseEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

