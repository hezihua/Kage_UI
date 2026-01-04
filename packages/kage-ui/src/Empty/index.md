---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Empty 空状态
---

# Empty 空状态

空状态时的占位提示。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## 代码演示

### 基本使用

简单的展示。

```tsx
import { Empty } from 'wssf-kage-ui';

export default () => <Empty />;
```

### 自定义描述

自定义描述文字。

```tsx
import { Empty } from 'wssf-kage-ui';

export default () => <Empty description="暂无数据，请稍后再试" />;
```

### 自定义图片

自定义图片链接或元素。

```tsx
import { Empty } from 'wssf-kage-ui';

export default () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ height: 60 }}
    description="自定义图片"
  />
);
```

### 简单图片

使用预设的简单图片。

```tsx
import { Empty } from 'wssf-kage-ui';

export default () => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description="暂无数据"
  />
);
```

### 无描述

没有描述文字。

```tsx
import { Empty } from 'wssf-kage-ui';

export default () => <Empty description={false} />;
```

### 底部内容

可以在底部添加操作按钮。

```tsx
import { Empty, Button } from 'wssf-kage-ui';

export default () => (
  <Empty description="暂无数据">
    <Button type="primary">立即创建</Button>
  </Empty>
);
```

### 卡片中使用

在卡片中使用空状态。

```tsx
import { Empty, Card } from 'wssf-kage-ui';

export default () => (
  <Card title="数据列表" style={{ width: 400 }}>
    <Empty description="暂无数据" />
  </Card>
);
```

### 自定义样式

自定义样式。

```tsx
import { Empty, Button } from 'wssf-kage-ui';

export default () => (
  <Empty
    imageStyle={{ height: 80 }}
    description={
      <span style={{ color: '#999' }}>
        暂无数据，<a href="#" style={{ color: '#1890ff' }}>点击创建</a>
      </span>
    }
  >
    <Button type="primary">立即创建</Button>
  </Empty>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| image | 图片地址或自定义图片元素 | `ReactNode \| string` | - |
| imageStyle | 图片样式 | `CSSProperties` | - |
| description | 描述文字 | `ReactNode` | `'暂无数据'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### 内置图片

- `Empty.PRESENTED_IMAGE_DEFAULT` - 默认图片
- `Empty.PRESENTED_IMAGE_SIMPLE` - 简单图片

