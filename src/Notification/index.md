---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Notification 通知提醒框
---

# Notification 通知提醒框

全局展示通知提醒信息。

## 何时使用

在系统右上角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Notification.info('这是一条通知')}>显示通知</Button>
    <Button onClick={() => Notification.success('操作成功')}>成功</Button>
    <Button onClick={() => Notification.warning('这是一条警告')}>警告</Button>
    <Button onClick={() => Notification.error('操作失败')}>错误</Button>
  </Space>
);
```

### 不同提示类型

包括成功、信息、警告、错误四种类型。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Notification.success('操作成功')}>成功</Button>
    <Button onClick={() => Notification.info('这是一条信息提示')}>信息</Button>
    <Button onClick={() => Notification.warning('这是一条警告提示')}>警告</Button>
    <Button onClick={() => Notification.error('操作失败')}>错误</Button>
  </Space>
);
```

### 带描述的通知

通知提醒框左侧有图标，通知内容为标题和描述。

```tsx
import { Button } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Notification.open({
        message: '通知标题',
        description: '这是通知的描述内容，可以很长很长。',
        type: 'info',
      });
    }}
  >
    显示带描述的通知
  </Button>
);
```

### 自定义时长

自定义通知显示的时长，默认 4.5 秒。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Button onClick={() => Notification.info('这条通知将在 1 秒后消失', 1)}>
      1 秒后消失
    </Button>
    <Button onClick={() => Notification.info('这条通知将在 10 秒后消失', 10)}>
      10 秒后消失
    </Button>
    <Button onClick={() => Notification.info('这条通知不会自动消失', 0)}>
      不自动消失
    </Button>
  </Space>
);
```

### 自定义图标

可以自定义图标。

```tsx
import { Button } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Notification.open({
        message: '自定义图标',
        description: '这是一条带自定义图标的通知',
        icon: '🎉',
        duration: 3,
      });
    }}
  >
    自定义图标
  </Button>
);
```

### 不同位置

通知可以从四个方向弹出，通过 `placement` 属性设置。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Space>
      <Button
        onClick={() => {
          Notification.open({
            message: '左上角通知',
            description: '这是从左上角弹出的通知',
            placement: 'topLeft',
          });
        }}
      >
        左上
      </Button>
      <Button
        onClick={() => {
          Notification.open({
            message: '右上角通知',
            description: '这是从右上角弹出的通知',
            placement: 'topRight',
          });
        }}
      >
        右上
      </Button>
    </Space>
    <Space>
      <Button
        onClick={() => {
          Notification.open({
            message: '左下角通知',
            description: '这是从左下角弹出的通知',
            placement: 'bottomLeft',
          });
        }}
      >
        左下
      </Button>
      <Button
        onClick={() => {
          Notification.open({
            message: '右下角通知',
            description: '这是从右下角弹出的通知',
            placement: 'bottomRight',
          });
        }}
      >
        右下
      </Button>
    </Space>
  </Space>
);
```

### 手动关闭

通过 `duration` 设置为 0 来禁用自动关闭，然后手动调用 `close` 方法关闭。

```tsx
import { Button, Space } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => {
  const showNotification = () => {
    Notification.info('这条通知不会自动消失', 0);
  };

  const closeAll = () => {
    Notification.destroy();
  };

  return (
    <Space>
      <Button onClick={showNotification}>显示通知</Button>
      <Button onClick={closeAll}>关闭所有</Button>
    </Space>
  );
};
```

### 不显示关闭按钮

设置 `closable={false}` 不显示关闭按钮。

```tsx
import { Button } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Notification.open({
        message: '无关闭按钮',
        description: '这条通知没有关闭按钮',
        closable: false,
        duration: 0,
      });
    }}
  >
    显示无关闭按钮的通知
  </Button>
);
```

### 回调函数

可以通过回调函数在通知关闭时执行操作。

```tsx
import { Button } from 'wssf-kage-ui';
import { Notification } from 'wssf-kage-ui';

export default () => (
  <Button
    onClick={() => {
      Notification.success('操作成功', 3, () => {
        console.log('通知已关闭');
      });
    }}
  >
    显示带回调的通知
  </Button>
);
```

## API

### Notification

| 方法 | 说明 | 参数 | 返回值 |
| --- | --- | --- | --- |
| Notification.success | 显示成功通知 | `(config: NotificationConfig \| ReactNode, description?: ReactNode) => void` | - |
| Notification.error | 显示错误通知 | `(config: NotificationConfig \| ReactNode, description?: ReactNode) => void` | - |
| Notification.info | 显示信息通知 | `(config: NotificationConfig \| ReactNode, description?: ReactNode) => void` | - |
| Notification.warning | 显示警告通知 | `(config: NotificationConfig \| ReactNode, description?: ReactNode) => void` | - |
| Notification.open | 显示通知 | `(config: NotificationConfig) => void` | - |
| Notification.close | 关闭通知 | `(key: string \| number) => void` | - |
| Notification.destroy | 销毁通知 | `(key?: string \| number) => void` | - |

### NotificationConfig

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 通知标题 | `ReactNode` | - |
| description | 通知内容 | `ReactNode` | - |
| type | 通知类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | `number` | `4.5` |
| icon | 自定义图标 | `ReactNode` | - |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| onClose | 关闭时的回调 | `() => void` | - |
| key | 通知唯一标识 | `string \| number` | - |
| placement | 通知位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `'topRight'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

