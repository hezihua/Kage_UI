---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Badge 徽章
---

# Badge 徽章

图标右上角的圆形徽章数字。

## 何时使用

一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## 代码演示

### 基本使用

简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 showZero 修改为显示。

```tsx
import { Badge, Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge count={5}>
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={0} showZero>
      <Avatar shape="square" icon="📧" />
    </Badge>
  </Space>
);
```

### 独立使用

不包裹任何元素即是独立使用，可自定样式展现。

```tsx
import { Badge, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge count={25} />
    <Badge count={100} />
    <Badge count={99} overflowCount={10} />
  </Space>
);
```

### 封顶数字

超过 `overflowCount` 的会显示为 `${overflowCount}+`，默认的 overflowCount 为 99。

```tsx
import { Badge, Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge count={99}>
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={100}>
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={99} overflowCount={10}>
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={1000} overflowCount={999}>
      <Avatar shape="square" icon="📧" />
    </Badge>
  </Space>
);
```

### 小红点

没有具体的数字，只展示一个小红点。

```tsx
import { Badge, Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge dot>
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge dot>
      <Avatar shape="square" icon="🔔" />
    </Badge>
  </Space>
);
```

### 状态点

用于表示状态的小圆点。

```tsx
import { Badge, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Badge status="success" text="成功" />
    <Badge status="error" text="失败" />
    <Badge status="default" text="默认" />
    <Badge status="processing" text="进行中" />
    <Badge status="warning" text="警告" />
  </Space>
);
```

### 自定义颜色

可以使用自定义颜色。

```tsx
import { Badge, Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge count={5} color="#52c41a">
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={5} color="#faad14">
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge count={5} color="#1890ff">
      <Avatar shape="square" icon="📧" />
    </Badge>
    <Badge dot color="#52c41a">
      <Avatar shape="square" icon="🔔" />
    </Badge>
  </Space>
);
```

### 偏移设置

设置徽章的位置偏移。

```tsx
import { Badge, Avatar, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="large">
    <Badge count={5}>
      <Avatar shape="square" icon="📧" size={48} />
    </Badge>
    <Badge count={5} offset={[10, 10]}>
      <Avatar shape="square" icon="📧" size={48} />
    </Badge>
    <Badge count={5} offset={[-10, 10]}>
      <Avatar shape="square" icon="📧" size={48} />
    </Badge>
  </Space>
);
```

### 缎带徽章

使用缎带样式的徽章。

```tsx
import { Badge } from 'wssf-kage-ui';

const { Ribbon } = Badge;

export default () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Ribbon text="Hippies">
      <div style={{ width: 200, height: 100, background: '#f0f0f0', padding: 16 }}>
        推荐内容
      </div>
    </Ribbon>
    
    <Ribbon text="Hot" color="#ff4d4f">
      <div style={{ width: 200, height: 100, background: '#f0f0f0', padding: 16 }}>
        热门内容
      </div>
    </Ribbon>
    
    <Ribbon text="New" color="#52c41a" placement="start">
      <div style={{ width: 200, height: 100, background: '#f0f0f0', padding: 16 }}>
        新品上市
      </div>
    </Ribbon>
  </div>
);
```

### 多种状态

展示不同状态的徽章。

```tsx
import { Badge, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Space size="large">
      <Badge status="success" />
      <Badge status="error" />
      <Badge status="default" />
      <Badge status="processing" />
      <Badge status="warning" />
    </Space>
    
    <Space direction="vertical">
      <Badge status="success" text="Success" />
      <Badge status="error" text="Error" />
      <Badge status="default" text="Default" />
      <Badge status="processing" text="Processing" />
      <Badge status="warning" text="Warning" />
    </Space>
  </Space>
);
```

## API

### Badge

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示的数字 | `number \| ReactNode` | - |
| overflowCount | 展示封顶的数字值 | `number` | `99` |
| dot | 不展示数字，只有一个小红点 | `boolean` | `false` |
| status | 设置 Badge 为状态点 | `'success' \| 'processing' \| 'default' \| 'error' \| 'warning'` | - |
| text | 在设置了 status 的前提下有效，设置状态点的文本 | `ReactNode` | - |
| color | 自定义小圆点的颜色 | `string` | - |
| showZero | 当数值为 0 时，是否展示 Badge | `boolean` | `false` |
| offset | 设置状态点的位置偏移 | `[number, number]` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

### Badge.Ribbon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| text | 缎带中填入的内容 | `ReactNode` | - |
| color | 自定义缎带的颜色 | `string` | - |
| placement | 缎带的位置 | `'start' \| 'end'` | `'end'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

