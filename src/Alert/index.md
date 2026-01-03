---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Alert 警告提示
---

# Alert 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## 代码演示

### 基本使用

最简单的用法，适用于简短的警告提示。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="成功提示的文案" type="success" />
    <Alert message="消息提示的文案" type="info" />
    <Alert message="警告提示的文案" type="warning" />
    <Alert message="错误提示的文案" type="error" />
  </>
);
```

### 四种样式

共有四种样式 `success`、`info`、`warning`、`error`。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="成功提示的文案" type="success" />
    <Alert message="消息提示的文案" type="info" />
    <Alert message="警告提示的文案" type="warning" />
    <Alert message="错误提示的文案" type="error" />
  </>
);
```

### 含有辅助性文字介绍

含有标题和辅助性文字介绍。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert
      message="成功提示的文案"
      description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
      type="success"
    />
    <Alert
      message="消息提示的文案"
      description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
      type="info"
    />
    <Alert
      message="警告提示的文案"
      description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
      type="warning"
    />
    <Alert
      message="错误提示的文案"
      description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
      type="error"
    />
  </>
);
```

### 图标

可显示图标。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="成功提示的文案" type="success" showIcon />
    <Alert message="消息提示的文案" type="info" showIcon />
    <Alert message="警告提示的文案" type="warning" showIcon />
    <Alert message="错误提示的文案" type="error" showIcon />
    <Alert
      message="成功提示的文案"
      description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
      type="success"
      showIcon
    />
    <Alert
      message="消息提示的文案"
      description="消息提示的辅助性文字介绍消息提示的辅助性文字介绍"
      type="info"
      showIcon
    />
    <Alert
      message="警告提示的文案"
      description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
      type="warning"
      showIcon
    />
    <Alert
      message="错误提示的文案"
      description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
      type="error"
      showIcon
    />
  </>
);
```

### 可关闭的警告提示

显示关闭按钮，点击可关闭警告提示。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="警告提示的文案" type="warning" closable />
    <Alert
      message="警告提示的文案"
      description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
      type="warning"
      closable
    />
  </>
);
```

### 自定义关闭

可以自定义关闭按钮。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <Alert
    message="警告提示的文案"
    type="warning"
    closable
    closeIcon="关闭"
    onClose={() => console.log('关闭了')}
  />
);
```

### 自定义图标

可以自定义图标。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="成功提示的文案" type="success" showIcon icon="✅" />
    <Alert message="消息提示的文案" type="info" showIcon icon="ℹ️" />
    <Alert message="警告提示的文案" type="warning" showIcon icon="⚠️" />
    <Alert message="错误提示的文案" type="error" showIcon icon="❌" />
  </>
);
```

### 自定义操作

自定义操作项。

```tsx
import { Alert, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Alert
    message="成功提示的文案"
    description="成功提示的辅助性文字介绍成功提示的辅助性文字介绍"
    type="success"
    showIcon
    action={
      <Space>
        <Button size="small">撤销</Button>
        <Button size="small" type="primary">
          确定
        </Button>
      </Space>
    }
    closable
  />
);
```

### Banner 模式

用于页面顶部展示。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <>
    <Alert message="警告提示的文案" type="warning" banner />
    <Alert
      message="警告提示的文案"
      description="警告提示的辅助性文字介绍警告提示的辅助性文字介绍"
      type="warning"
      banner
      closable
    />
  </>
);
```

### 使用 children

使用 `children` 自定义内容。

```tsx
import { Alert } from 'wssf-kage-ui';

export default () => (
  <Alert type="info" showIcon>
    <div>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>自定义标题</div>
      <div>自定义内容描述</div>
    </div>
  </Alert>
);
```

## API

### Alert

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 警告提示内容 | `ReactNode` | - |
| description | 警告提示的辅助性文字介绍 | `ReactNode` | - |
| type | 指定警告的样式类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `'info'` |
| showIcon | 是否显示辅助图标 | `boolean` | `false` |
| icon | 自定义图标 | `ReactNode` | - |
| closeIcon | 自定义关闭按钮 | `ReactNode` | - |
| closable | 是否显示关闭按钮 | `boolean` | `false` |
| onClose | 关闭时触发的回调函数 | `(e: React.MouseEvent<HTMLButtonElement>) => void` | - |
| afterClose | 关闭动画结束后触发的回调函数 | `() => void` | - |
| action | 自定义操作项 | `ReactNode` | - |
| banner | 是否用图标和标题换行 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

