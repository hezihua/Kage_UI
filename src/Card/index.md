---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Card 卡片
---

# Card 卡片

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## 代码演示

### 基本使用

包含标题、内容、操作区域。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card title="卡片标题" extra={<a href="#">更多</a>} style={{ width: 300 }}>
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </Card>
);
```

### 无边框

在灰色背景上使用无边框的卡片。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <div style={{ background: '#f0f0f0', padding: 24 }}>
    <Card title="无边框卡片" bordered={false} style={{ width: 300 }}>
      <p>卡片内容</p>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </Card>
  </div>
);
```

### 简洁卡片

只包含内容区域。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card style={{ width: 300 }}>
    <p>卡片内容</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </Card>
);
```

### 带封面

可以通过 `cover` 设置封面图片。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card
    cover={
      <img
        alt="example"
        src="https://picsum.photos/400/200"
        style={{ width: '100%', display: 'block' }}
      />
    }
    style={{ width: 300 }}
  >
    <Card.Meta
      title="卡片标题"
      description="这是卡片的描述信息，可以是多行文本内容。"
    />
  </Card>
);
```

### 支持更多内容配置

一种支持封面、头像、标题和描述信息的卡片。

```tsx
import { Card, Avatar } from 'wssf-kage-ui';

const { Meta } = Card;

export default () => (
  <Card
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src="https://picsum.photos/400/200?random=1"
      />
    }
    actions={[
      <span key="like">❤️ 点赞</span>,
      <span key="comment">💬 评论</span>,
      <span key="share">🔗 分享</span>,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=1" />}
      title="卡片标题"
      description="这是一段描述信息"
    />
  </Card>
);
```

### 栅格卡片

在系统概览页面常常和栅格进行配合。

```tsx
import { Card, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
      <Card title="卡片标题" bordered={false}>
        <p>卡片内容</p>
      </Card>
      <Card title="卡片标题" bordered={false}>
        <p>卡片内容</p>
      </Card>
      <Card title="卡片标题" bordered={false}>
        <p>卡片内容</p>
      </Card>
    </div>
  </Space>
);
```

### 内部卡片

可以放在普通卡片内部，展示多层级结构的信息。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card title="外部卡片" style={{ width: 400 }}>
    <p style={{ marginBottom: 16 }}>外部卡片内容</p>
    <Card type="inner" title="内部卡片" extra={<a href="#">更多</a>}>
      内部卡片内容
    </Card>
    <Card type="inner" title="内部卡片" extra={<a href="#">更多</a>} style={{ marginTop: 16 }}>
      内部卡片内容
    </Card>
  </Card>
);
```

### 网格型内嵌卡片

一种常见的卡片内容区隔模式。

```tsx
import { Card } from 'wssf-kage-ui';

const { Grid } = Card;

export default () => (
  <Card title="网格卡片" style={{ width: 600 }}>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
    <Grid style={{ width: '25%', textAlign: 'center' }}>Content</Grid>
  </Card>
);
```

### 加载中

数据读入前会有文本块样式。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card loading title="卡片标题" style={{ width: 300 }}>
    这些内容在加载时不会显示
  </Card>
);
```

### 可悬浮

鼠标移过时可浮起。

```tsx
import { Card } from 'wssf-kage-ui';

export default () => (
  <Card hoverable title="可悬浮卡片" style={{ width: 300 }}>
    <p>鼠标移过时会有浮起效果</p>
    <p>卡片内容</p>
    <p>卡片内容</p>
  </Card>
);
```

### 尺寸

卡片提供两种尺寸。

```tsx
import { Card, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Card title="默认尺寸卡片" extra={<a href="#">更多</a>} style={{ width: 300 }}>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </Card>
    
    <Card size="small" title="小尺寸卡片" extra={<a href="#">更多</a>} style={{ width: 300 }}>
      <p>卡片内容</p>
      <p>卡片内容</p>
    </Card>
  </Space>
);
```

## API

### Card

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 卡片标题 | `ReactNode` | - |
| extra | 卡片右上角的操作区域 | `ReactNode` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| hoverable | 鼠标移过时可浮起 | `boolean` | `false` |
| loading | 当卡片内容还在加载中时，可以用 loading 展示一个占位 | `boolean` | `false` |
| size | 卡片的尺寸 | `'default' \| 'small'` | `'default'` |
| type | 卡片类型 | `'inner'` | - |
| cover | 卡片封面 | `ReactNode` | - |
| actions | 卡片操作组 | `ReactNode[]` | - |
| headStyle | 自定义标题区域样式 | `CSSProperties` | - |
| bodyStyle | 自定义内容区域样式 | `CSSProperties` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onClick | 点击事件 | `() => void` | - |

### Card.Meta

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| avatar | 头像 | `ReactNode` | - |
| title | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Card.Grid

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hoverable | 是否可悬浮 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onClick | 点击事件 | `() => void` | - |

