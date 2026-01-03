---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Spin 加载中
---

# Spin 加载中

用于页面和区块的加载中状态。

## 何时使用

- 页面局部处于等待异步数据或正在渲染过程时，合适的加载动效会有效缓解用户的焦虑。
- 当操作需要较长时间才能完成时，应该显示加载状态。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Spin } from 'wssf-kage-ui';

export default () => <Spin />;
```

### 不同尺寸

可以设置不同的尺寸。

```tsx
import { Spin, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Spin size="small" />
    <Spin size="default" />
    <Spin size="large" />
  </Space>
);
```

### 提示文字

可以添加提示文字。

```tsx
import { Spin } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Spin tip="加载中..." />
    <Spin size="small" tip="加载中..." />
    <Spin size="large" tip="加载中..." />
  </div>
);
```

### 包装内容

可以包装内容，当 `spinning` 为 `true` 时显示加载状态。

```tsx
import { useState } from 'react';
import { Spin, Button } from 'wssf-kage-ui';

export default () => {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  return (
    <div>
      <Button onClick={handleClick} style={{ marginBottom: 16 }}>
        开始加载
      </Button>
      <Spin spinning={spinning} tip="加载中...">
        <div style={{ padding: 50, background: '#f5f5f5', borderRadius: 4 }}>
          <p>这是内容区域</p>
          <p>当 spinning 为 true 时，内容会被模糊并显示加载动画</p>
        </div>
      </Spin>
    </div>
  );
};
```

### 延迟显示

可以设置延迟显示时间，避免闪烁。

```tsx
import { useState } from 'react';
import { Spin, Button } from 'wssf-kage-ui';

export default () => {
  const [spinning, setSpinning] = useState(false);

  const handleClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  return (
    <div>
      <Button onClick={handleClick} style={{ marginBottom: 16 }}>
        开始加载（延迟 500ms）
      </Button>
      <Spin spinning={spinning} delay={500} tip="加载中...">
        <div style={{ padding: 50, background: '#f5f5f5', borderRadius: 4 }}>
          <p>如果加载在 500ms 内完成，将不会显示加载动画</p>
        </div>
      </Spin>
    </div>
  );
};
```

### 自定义指示符

可以自定义加载指示符。

```tsx
import { Spin } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Spin indicator={<span style={{ fontSize: 24 }}>⟳</span>} />
    <Spin indicator={<span style={{ fontSize: 24 }}>⏳</span>} />
    <Spin indicator={<div style={{ width: 24, height: 24, border: '3px solid #1890ff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />} />
    <style>{`
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);
```

### 嵌套使用

可以在其他组件中嵌套使用。

```tsx
import { Spin, Card } from 'wssf-kage-ui';

export default () => (
  <Spin spinning tip="加载中...">
    <Card title="卡片标题" style={{ width: 300 }}>
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </Card>
  </Spin>
);
```

## API

### Spin

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| spinning | 是否显示加载中 | `boolean` | `true` |
| indicator | 自定义指示符 | `ReactNode` | - |
| size | 尺寸 | `'small' \| 'default' \| 'large'` | `'default'` |
| tip | 提示文字 | `ReactNode` | - |
| delay | 延迟显示时间（毫秒） | `number` | `0` |
| wrapperClassName | 包装器类名 | `string` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

