---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Popconfirm 气泡确认框
---

# Popconfirm 气泡确认框

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Popconfirm, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Popconfirm
    title="确定要删除吗？"
    onConfirm={() => console.log('确认')}
    onCancel={() => console.log('取消')}
  >
    <Button danger>删除</Button>
  </Popconfirm>
);
```

### 不同位置

气泡框可以设置不同的位置。

```tsx
import { Popconfirm, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Popconfirm
      title="确定要删除吗？"
      placement="top"
      onConfirm={() => console.log('确认')}
    >
      <Button>上</Button>
    </Popconfirm>
    <Popconfirm
      title="确定要删除吗？"
      placement="bottom"
      onConfirm={() => console.log('确认')}
    >
      <Button>下</Button>
    </Popconfirm>
    <Popconfirm
      title="确定要删除吗？"
      placement="left"
      onConfirm={() => console.log('确认')}
    >
      <Button>左</Button>
    </Popconfirm>
    <Popconfirm
      title="确定要删除吗？"
      placement="right"
      onConfirm={() => console.log('确认')}
    >
      <Button>右</Button>
    </Popconfirm>
  </Space>
);
```

### 自定义描述

可以自定义描述内容。

```tsx
import { Popconfirm, Button } from 'wssf-kage-ui';

export default () => (
  <Popconfirm
    title="确定要删除吗？"
    description="删除后无法恢复"
    onConfirm={() => console.log('确认')}
  >
    <Button danger>删除</Button>
  </Popconfirm>
);
```

### 自定义按钮文字

可以自定义确认和取消按钮的文字。

```tsx
import { Popconfirm, Button } from 'wssf-kage-ui';

export default () => (
  <Popconfirm
    title="确定要删除吗？"
    okText="是的"
    cancelText="不了"
    onConfirm={() => console.log('确认')}
  >
    <Button danger>删除</Button>
  </Popconfirm>
);
```

### 自定义图标

可以自定义图标。

```tsx
import { Popconfirm, Button } from 'wssf-kage-ui';

export default () => (
  <Popconfirm
    title="确定要删除吗？"
    icon="❌"
    onConfirm={() => console.log('确认')}
  >
    <Button danger>删除</Button>
  </Popconfirm>
);
```

### 不显示取消按钮

设置 `showCancel={false}` 不显示取消按钮。

```tsx
import { Popconfirm, Button } from 'wssf-kage-ui';

export default () => (
  <Popconfirm
    title="确定要删除吗？"
    showCancel={false}
    onConfirm={() => console.log('确认')}
  >
    <Button danger>删除</Button>
  </Popconfirm>
);
```

### 确认按钮 loading

使用 `okButtonProps` 设置确认按钮的 loading 状态。

```tsx
import { Popconfirm, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <Popconfirm
      title="确定要删除吗？"
      onConfirm={handleConfirm}
      okButtonProps={{ loading }}
    >
      <Button danger>删除</Button>
    </Popconfirm>
  );
};
```

### 受控模式

通过 `open` 和 `onOpenChange` 实现受控模式。

```tsx
import { Popconfirm, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen(true)}>打开确认框</Button>
      <Popconfirm
        title="确定要删除吗？"
        open={open}
        onOpenChange={setOpen}
        onConfirm={() => {
          console.log('确认');
          setOpen(false);
        }}
      >
        <Button danger>删除</Button>
      </Popconfirm>
    </Space>
  );
};
```

### 不同触发方式

可以设置不同的触发方式。

```tsx
import { Popconfirm, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Popconfirm
      title="确定要删除吗？"
      trigger="hover"
      onConfirm={() => console.log('确认')}
    >
      <Button>悬停触发</Button>
    </Popconfirm>
    <Popconfirm
      title="确定要删除吗？"
      trigger="click"
      onConfirm={() => console.log('确认')}
    >
      <Button>点击触发</Button>
    </Popconfirm>
    <Popconfirm
      title="确定要删除吗？"
      trigger="focus"
      onConfirm={() => console.log('确认')}
    >
      <Button>聚焦触发</Button>
    </Popconfirm>
  </Space>
);
```

## API

### Popconfirm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 确认框的描述 | `ReactNode` | - |
| description | 确认框的详细描述 | `ReactNode` | - |
| trigger | 触发行为 | `'hover' \| 'click' \| 'focus'` | `'click'` |
| placement | 气泡框位置 | `PopconfirmPlacement` | `'top'` |
| arrow | 是否显示箭头 | `boolean` | `true` |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| onOpenChange | 显示隐藏的回调 | `(open: boolean) => void` | - |
| onConfirm | 点击确认的回调 | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | - |
| onCancel | 点击取消的回调 | `(e?: React.MouseEvent<HTMLButtonElement>) => void` | - |
| okText | 确认按钮文字 | `ReactNode` | `'确定'` |
| cancelText | 取消按钮文字 | `ReactNode` | `'取消'` |
| okType | 确认按钮类型 | `'default' \| 'primary' \| 'dashed' \| 'text' \| 'link'` | `'primary'` |
| okButtonProps | 确认按钮属性 | `{ loading?: boolean; disabled?: boolean; [key: string]: any }` | - |
| cancelButtonProps | 取消按钮属性 | `{ loading?: boolean; disabled?: boolean; [key: string]: any }` | - |
| icon | 自定义图标 | `ReactNode` | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 触发元素 | `ReactNode` | - |

