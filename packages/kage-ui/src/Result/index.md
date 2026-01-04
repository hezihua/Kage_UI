---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Result 结果页
---

# Result 结果页

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## 代码演示

### 成功状态

展示成功状态。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="success"
    title="操作成功"
    subTitle="您的操作已成功完成，请继续后续操作。"
    extra={[
      <Button type="primary" key="console">
        返回首页
      </Button>,
      <Button key="buy">查看详情</Button>,
    ]}
  />
);
```

### 错误状态

展示错误状态。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="error"
    title="操作失败"
    subTitle="您的操作未能成功完成，请重试。"
    extra={[
      <Button type="primary" key="console">
        返回重试
      </Button>,
    ]}
  />
);
```

### 信息状态

展示信息状态。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="info"
    title="提示信息"
    subTitle="这是一条提示信息，请仔细阅读。"
    extra={[
      <Button type="primary" key="console">
        知道了
      </Button>,
    ]}
  />
);
```

### 警告状态

展示警告状态。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="warning"
    title="警告提示"
    subTitle="请注意相关风险，谨慎操作。"
    extra={[
      <Button type="primary" key="console">
        我知道了
      </Button>,
    ]}
  />
);
```

### 404 页面

展示 404 错误页面。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，您访问的页面不存在。"
    extra={[
      <Button type="primary" key="console">
        返回首页
      </Button>,
    ]}
  />
);
```

### 403 页面

展示 403 错误页面。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="403"
    title="403"
    subTitle="抱歉，您没有权限访问此页面。"
    extra={[
      <Button type="primary" key="console">
        返回首页
      </Button>,
    ]}
  />
);
```

### 500 页面

展示 500 错误页面。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="500"
    title="500"
    subTitle="抱歉，服务器出错了。"
    extra={[
      <Button type="primary" key="console">
        返回首页
      </Button>,
    ]}
  />
);
```

### 自定义图标

可以自定义图标。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    icon="🎉"
    title="自定义图标"
    subTitle="这是一个自定义图标的结果页。"
    extra={[
      <Button type="primary" key="console">
        知道了
      </Button>,
    ]}
  />
);
```

### 自定义内容

可以自定义内容区域。

```tsx
import { Result, Button } from 'wssf-kage-ui';

export default () => (
  <Result
    status="success"
    title="操作成功"
    subTitle="您的操作已成功完成。"
  >
    <div style={{ marginTop: 16 }}>
      <p>您可以：</p>
      <ul style={{ textAlign: 'left', display: 'inline-block' }}>
        <li>继续下一步操作</li>
        <li>查看详细信息</li>
        <li>返回上一页</li>
      </ul>
    </div>
    <div style={{ marginTop: 24 }}>
      <Button type="primary">继续操作</Button>
      <Button style={{ marginLeft: 8 }}>查看详情</Button>
    </div>
  </Result>
);
```

## API

### Result

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| status | 结果状态 | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` |
| title | 标题 | `ReactNode` | - |
| subTitle | 副标题 | `ReactNode` | - |
| icon | 自定义图标 | `ReactNode` | - |
| extra | 操作区 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 自定义内容 | `ReactNode` | - |

