---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Drawer 抽屉
---

# Drawer 抽屉

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，详情页、设置页、表单页。
- 当需要在当前任务流中插入临时任务，创建或编辑内容。

## 代码演示

### 基本使用

基础抽屉，点击触发按钮抽屉从右侧滑出，点击遮罩区关闭。

```tsx
import { Drawer, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer
        title="基本抽屉"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>这是抽屉内容</p>
        <p>这是抽屉内容</p>
        <p>这是抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 不同位置

抽屉可以从四个方向滑出，通过 `placement` 属性设置。

```tsx
import { Drawer, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [top, setTop] = useState(false);
  const [right, setRight] = useState(false);
  const [bottom, setBottom] = useState(false);
  const [left, setLeft] = useState(false);

  return (
    <>
      <Space>
        <Button onClick={() => setTop(true)}>上</Button>
        <Button onClick={() => setRight(true)}>右</Button>
        <Button onClick={() => setBottom(true)}>下</Button>
        <Button onClick={() => setLeft(true)}>左</Button>
      </Space>
      <Drawer
        title="顶部抽屉"
        placement="top"
        open={top}
        onClose={() => setTop(false)}
      >
        <p>这是顶部抽屉内容</p>
      </Drawer>
      <Drawer
        title="右侧抽屉"
        placement="right"
        open={right}
        onClose={() => setRight(false)}
      >
        <p>这是右侧抽屉内容</p>
      </Drawer>
      <Drawer
        title="底部抽屉"
        placement="bottom"
        open={bottom}
        onClose={() => setBottom(false)}
      >
        <p>这是底部抽屉内容</p>
      </Drawer>
      <Drawer
        title="左侧抽屉"
        placement="left"
        open={left}
        onClose={() => setLeft(false)}
      >
        <p>这是左侧抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 自定义宽度/高度

自定义抽屉的宽度（左右方向）或高度（上下方向）。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开大抽屉
      </Button>
      <Drawer
        title="大抽屉"
        width={600}
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>这是一个宽度为 600px 的抽屉</p>
      </Drawer>
    </>
  );
};
```

### 无标题

没有标题栏的抽屉。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无标题抽屉
      </Button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
      >
        <p>这是没有标题的抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 自定义关闭按钮

自定义关闭按钮的图标和文字。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer
        title="自定义关闭按钮"
        open={open}
        onClose={() => setOpen(false)}
        closeIcon="关闭"
      >
        <p>这是抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 不显示遮罩

不显示遮罩层的抽屉。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无遮罩抽屉
      </Button>
      <Drawer
        title="无遮罩抽屉"
        open={open}
        onClose={() => setOpen(false)}
        mask={false}
      >
        <p>这是没有遮罩的抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 点击遮罩不关闭

设置 `maskClosable={false}` 后，点击遮罩不会关闭抽屉。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer
        title="点击遮罩不关闭"
        open={open}
        onClose={() => setOpen(false)}
        maskClosable={false}
      >
        <p>点击遮罩不会关闭此抽屉</p>
      </Drawer>
    </>
  );
};
```

### 带底部操作栏

在抽屉底部添加操作栏。

```tsx
import { Drawer, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer
        title="带底部操作栏"
        open={open}
        onClose={() => setOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              确定
            </Button>
          </Space>
        }
      >
        <p>这是抽屉内容</p>
      </Drawer>
    </>
  );
};
```

### 自定义样式

自定义抽屉的样式。

```tsx
import { Drawer, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开自定义样式抽屉
      </Button>
      <Drawer
        title="自定义样式"
        open={open}
        onClose={() => setOpen(false)}
        bodyStyle={{ padding: 0 }}
        headerStyle={{ background: '#f0f0f0' }}
      >
        <div style={{ padding: 24 }}>
          <p>这是抽屉内容</p>
        </div>
      </Drawer>
    </>
  );
};
```

## API

### Drawer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| onClose | 显示隐藏的回调 | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | - |
| afterOpenChange | 关闭后的回调 | `(open: boolean) => void` | - |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| placement | 抽屉的位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'right'` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| maskStyle | 自定义遮罩样式 | `CSSProperties` | - |
| bodyStyle | 自定义主体内容样式 | `CSSProperties` | - |
| headerStyle | 自定义头部样式 | `CSSProperties` | - |
| footerStyle | 自定义底部样式 | `CSSProperties` | - |
| footer | 底部内容 | `ReactNode` | - |
| width | 宽度（placement 为 left 或 right 时） | `number \| string` | `378` |
| height | 高度（placement 为 top 或 bottom 时） | `number \| string` | `378` |
| zIndex | z-index | `number` | `1000` |
| keyboard | 是否支持键盘 ESC 关闭 | `boolean` | `true` |
| destroyOnClose | 是否在关闭时销毁 Drawer 里的子元素 | `boolean` | `false` |
| maskClassName | 是否显示遮罩背景 | `string` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

