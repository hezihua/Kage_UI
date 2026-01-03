---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Modal 对话框
---

# Modal 对话框

模态对话框。

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="基本对话框"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>这是对话框内容</p>
        <p>这是对话框内容</p>
        <p>这是对话框内容</p>
      </Modal>
    </>
  );
};
```

### 自定义宽度

使用 `width` 自定义对话框宽度。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开大对话框
      </Button>
      <Modal
        title="自定义宽度"
        width={800}
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>这是一个宽度为 800px 的对话框</p>
      </Modal>
    </>
  );
};
```

### 无标题

没有标题栏的对话框。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无标题对话框
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closable={false}
      >
        <p>这是没有标题的对话框内容</p>
      </Modal>
    </>
  );
};
```

### 自定义关闭按钮

自定义关闭按钮的图标和文字。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="自定义关闭按钮"
        open={open}
        onClose={() => setOpen(false)}
        closeIcon="关闭"
      >
        <p>这是对话框内容</p>
      </Modal>
    </>
  );
};
```

### 不显示遮罩

不显示遮罩层的对话框。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无遮罩对话框
      </Button>
      <Modal
        title="无遮罩对话框"
        open={open}
        onClose={() => setOpen(false)}
        mask={false}
      >
        <p>这是没有遮罩的对话框内容</p>
      </Modal>
    </>
  );
};
```

### 点击遮罩不关闭

设置 `maskClosable={false}` 后，点击遮罩不会关闭对话框。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="点击遮罩不关闭"
        open={open}
        onClose={() => setOpen(false)}
        maskClosable={false}
      >
        <p>点击遮罩不会关闭此对话框</p>
      </Modal>
    </>
  );
};
```

### 自定义底部

自定义底部操作栏。

```tsx
import { Modal, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="自定义底部"
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
        <p>这是对话框内容</p>
      </Modal>
    </>
  );
};
```

### 无底部

设置 `footer={null}` 不显示底部。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开无底部对话框
      </Button>
      <Modal
        title="无底部对话框"
        open={open}
        onClose={() => setOpen(false)}
        footer={null}
      >
        <p>这是没有底部的对话框内容</p>
      </Modal>
    </>
  );
};
```

### 确认对话框

使用 `onOk` 和 `onCancel` 处理确认和取消操作。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  const handleOk = () => {
    console.log('点击了确定');
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('点击了取消');
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开确认对话框
      </Button>
      <Modal
        title="确认对话框"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>确定要执行此操作吗？</p>
      </Modal>
    </>
  );
};
```

### 加载状态

使用 `confirmLoading` 显示确认按钮的加载状态。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Modal
        title="加载状态"
        open={open}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
        confirmLoading={loading}
      >
        <p>点击确定按钮后，按钮会显示加载状态</p>
      </Modal>
    </>
  );
};
```

### 居中显示

使用 `centered` 使对话框垂直居中显示。

```tsx
import { Modal, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开居中对话框
      </Button>
      <Modal
        title="居中对话框"
        open={open}
        onClose={() => setOpen(false)}
        centered
      >
        <p>这是居中显示的对话框</p>
      </Modal>
    </>
  );
};
```

## API

### Modal

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示 | `boolean` | `false` |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| onClose | 显示隐藏的回调 | `(e: React.MouseEvent \| React.KeyboardEvent) => void` | - |
| afterOpenChange | 关闭后的回调 | `(open: boolean) => void` | - |
| title | 标题 | `ReactNode` | - |
| children | 内容 | `ReactNode` | - |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否关闭 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| maskStyle | 自定义遮罩样式 | `CSSProperties` | - |
| bodyStyle | 自定义主体内容样式 | `CSSProperties` | - |
| headerStyle | 自定义头部样式 | `CSSProperties` | - |
| footerStyle | 自定义底部样式 | `CSSProperties` | - |
| footer | 底部内容，设置为 `null` 时不显示 | `ReactNode` | - |
| width | 宽度 | `number \| string` | `520` |
| centered | 是否居中显示 | `boolean` | `false` |
| zIndex | z-index | `number` | `1000` |
| keyboard | 是否支持键盘 ESC 关闭 | `boolean` | `true` |
| destroyOnClose | 是否在关闭时销毁 Modal 里的子元素 | `boolean` | `false` |
| maskClassName | 遮罩类名 | `string` | - |
| okText | 确认按钮文字 | `ReactNode` | `'确定'` |
| cancelText | 取消按钮文字 | `ReactNode` | `'取消'` |
| confirmLoading | 确认按钮 loading | `boolean` | `false` |
| onOk | 点击确定回调 | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - |
| onCancel | 点击取消回调 | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

