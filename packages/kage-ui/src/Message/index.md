---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Message 全局提示
---

# Message 全局提示

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告、错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Message.info('这是一条普通提示')}>显示普通提示</Button>
    <Button onClick={() => Message.success('这是一条成功提示')}>显示成功提示</Button>
    <Button onClick={() => Message.warning('这是一条警告提示')}>显示警告提示</Button>
    <Button onClick={() => Message.error('这是一条错误提示')}>显示错误提示</Button>
  </Space>
);
```

### 不同提示类型

包括成功、信息、警告、错误四种类型。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Message.success('操作成功')}>成功</Button>
    <Button onClick={() => Message.info('这是一条信息提示')}>信息</Button>
    <Button onClick={() => Message.warning('这是一条警告提示')}>警告</Button>
    <Button onClick={() => Message.error('操作失败')}>错误</Button>
  </Space>
);
```

### 自定义时长

自定义消息显示的时长，默认 3 秒。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Message.info('这条消息将在 1 秒后消失', 1)}>
      1 秒后消失
    </Button>
    <Button onClick={() => Message.info('这条消息将在 5 秒后消失', 5)}>
      5 秒后消失
    </Button>
    <Button onClick={() => Message.info('这条消息不会自动消失', 0)}>
      不自动消失
    </Button>
  </Space>
);
```

### 加载中

显示加载中的提示。

```tsx
import { Button } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      const hide = Message.loading('正在加载...', 0);
      setTimeout(() => {
        hide();
        Message.success('加载完成');
      }, 2000);
    }}
  >
    显示加载提示
  </Button>
);
```

### 自定义图标

可以自定义图标。

```tsx
import { Button } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Message.open({
        content: '自定义图标',
        icon: '🎉',
        duration: 3,
      });
    }}
  >
    自定义图标
  </Button>
);
```

### 手动关闭

通过 `duration` 设置为 0 来禁用自动关闭，然后手动调用 `destroy` 方法关闭。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => {
  const showMessage = () => {
    Message.info('这条消息不会自动消失', 0);
  };

  const closeAll = () => {
    Message.destroy();
  };

  return (
    <Space>
      <Button onClick={showMessage}>显示消息</Button>
      <Button onClick={closeAll}>关闭所有</Button>
    </Space>
  );
};
```

### 回调函数

可以通过回调函数在消息关闭时执行操作。

```tsx
import { Button } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Message.success('操作成功', 3, () => {
        console.log('消息已关闭');
      });
    }}
  >
    显示带回调的消息
  </Button>
);
```

### 使用 open 方法

使用 `open` 方法可以更灵活地配置消息。

```tsx
import { Button } from 'wssf-kage-ui';
import { Message } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Message.open({
        content: '这是一条自定义消息',
        type: 'success',
        duration: 3,
        icon: '✅',
        onClose: () => {
          console.log('消息已关闭');
        },
      });
    }}
  >
    使用 open 方法
  </Button>
);
```

## API

### Message

| 方法 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Message.success | 显示成功提示 | `(content: ReactNode, duration?: number, onClose?: () => void) => void` | - |
| Message.error | 显示错误提示 | `(content: ReactNode, duration?: number, onClose?: () => void) => void` | - |
| Message.info | 显示信息提示 | `(content: ReactNode, duration?: number, onClose?: () => void) => void` | - |
| Message.warning | 显示警告提示 | `(content: ReactNode, duration?: number, onClose?: () => void) => void` | - |
| Message.loading | 显示加载提示 | `(content: ReactNode, duration?: number, onClose?: () => void) => void` | - |
| Message.open | 显示提示 | `(config: MessageConfig) => void` | - |
| Message.destroy | 销毁提示 | `(key?: string \| number) => void` | - |

### MessageConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 提示内容 | `ReactNode` | - |
| type | 提示类型 | `'success' \| 'info' \| 'warning' \| 'error' \| 'loading'` | `'info'` |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | `number` | `3` |
| icon | 自定义图标 | `ReactNode` | - |
| onClose | 关闭时的回调 | `() => void` | - |
| key | 消息唯一标识 | `string \| number` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

