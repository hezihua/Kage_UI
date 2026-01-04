---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Masonry 瀑布流
---

# Masonry 瀑布流

瀑布流布局组件，适用于图片墙、卡片列表等场景。

## 何时使用

- 需要展示不同高度的卡片或图片列表时
- 希望充分利用空间，减少留白
- 图片墙、作品集、商品列表等场景

## 代码演示

### 基本使用

基本的瀑布流布局。

```tsx
import { Masonry } from 'wssf-kage-ui';

const items = [
  { height: 150, color: '#6366f1' },
  { height: 200, color: '#8b5cf6' },
  { height: 120, color: '#a855f7' },
  { height: 180, color: '#d946ef' },
  { height: 140, color: '#ec4899' },
  { height: 220, color: '#f43f5e' },
  { height: 160, color: '#ef4444' },
  { height: 190, color: '#f97316' },
];

export default () => (
  <Masonry columns={3} gutter={16}>
    {items.map((item, index) => (
      <div
        key={index}
        style={{
          height: item.height,
          background: item.color,
          borderRadius: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {index + 1}
      </div>
    ))}
  </Masonry>
);
```

### 不同列数

通过 `columns` 属性设置列数。

```tsx
import { Masonry, Flex, Button } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { height: 120, color: '#6366f1' },
  { height: 180, color: '#8b5cf6' },
  { height: 140, color: '#a855f7' },
  { height: 200, color: '#d946ef' },
  { height: 160, color: '#ec4899' },
  { height: 130, color: '#f43f5e' },
  { height: 190, color: '#ef4444' },
  { height: 150, color: '#f97316' },
  { height: 170, color: '#eab308' },
  { height: 145, color: '#22c55e' },
];

export default () => {
  const [columns, setColumns] = useState(4);

  return (
    <div>
      <Flex gap="small" style={{ marginBottom: 16 }}>
        <Button type={columns === 2 ? 'primary' : 'default'} onClick={() => setColumns(2)}>2 列</Button>
        <Button type={columns === 3 ? 'primary' : 'default'} onClick={() => setColumns(3)}>3 列</Button>
        <Button type={columns === 4 ? 'primary' : 'default'} onClick={() => setColumns(4)}>4 列</Button>
        <Button type={columns === 5 ? 'primary' : 'default'} onClick={() => setColumns(5)}>5 列</Button>
      </Flex>
      <Masonry columns={columns} gutter={12}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              height: item.height,
              background: item.color,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 600,
            }}
          >
            {index + 1}
          </div>
        ))}
      </Masonry>
    </div>
  );
};
```

### 顺序排列

使用 `sequential` 属性让元素按顺序从左到右排列，而不是按最短列排列。

```tsx
import { Masonry, Typography, Divider } from 'wssf-kage-ui';

const { Text } = Typography;

const items = [
  { height: 100, color: '#6366f1' },
  { height: 150, color: '#8b5cf6' },
  { height: 120, color: '#a855f7' },
  { height: 180, color: '#d946ef' },
  { height: 90, color: '#ec4899' },
  { height: 160, color: '#f43f5e' },
];

export default () => (
  <div>
    <Text strong>默认（按最短列排列）：</Text>
    <Masonry columns={3} gutter={12} style={{ marginTop: 12 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>

    <Divider />

    <Text strong>顺序排列（sequential）：</Text>
    <Masonry columns={3} gutter={12} sequential style={{ marginTop: 12 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>
  </div>
);
```

### 不同间距

使用 `gutter` 属性设置间距，可以是数字或数组 `[水平间距, 垂直间距]`。

```tsx
import { Masonry, Divider, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const items = [
  { height: 100, color: '#6366f1' },
  { height: 140, color: '#8b5cf6' },
  { height: 110, color: '#a855f7' },
  { height: 130, color: '#d946ef' },
  { height: 120, color: '#ec4899' },
  { height: 150, color: '#f43f5e' },
];

export default () => (
  <div>
    <Text strong>间距 8px：</Text>
    <Masonry columns={3} gutter={8} style={{ marginTop: 12 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>

    <Divider />

    <Text strong>间距 [24, 12]（水平 24px，垂直 12px）：</Text>
    <Masonry columns={3} gutter={[24, 12]} style={{ marginTop: 12 }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            height: item.height,
            background: item.color,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          {index + 1}
        </div>
      ))}
    </Masonry>
  </div>
);
```

### 图片瀑布流

常见的图片瀑布流场景。

```tsx
import { Masonry } from 'wssf-kage-ui';

const images = [
  { src: 'https://picsum.photos/300/200?random=1', height: 200 },
  { src: 'https://picsum.photos/300/350?random=2', height: 350 },
  { src: 'https://picsum.photos/300/250?random=3', height: 250 },
  { src: 'https://picsum.photos/300/180?random=4', height: 180 },
  { src: 'https://picsum.photos/300/300?random=5', height: 300 },
  { src: 'https://picsum.photos/300/220?random=6', height: 220 },
  { src: 'https://picsum.photos/300/280?random=7', height: 280 },
  { src: 'https://picsum.photos/300/190?random=8', height: 190 },
];

export default () => (
  <Masonry columns={4} gutter={8}>
    {images.map((image, index) => (
      <div
        key={index}
        style={{
          borderRadius: 8,
          overflow: 'hidden',
          background: '#f5f5f5',
        }}
      >
        <img
          src={image.src}
          alt={`Image ${index + 1}`}
          style={{
            width: '100%',
            height: image.height,
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    ))}
  </Masonry>
);
```

### 卡片瀑布流

包含卡片内容的瀑布流。

```tsx
import { Masonry, Typography } from 'wssf-kage-ui';

const { Title, Text, Paragraph } = Typography;

const cards = [
  {
    title: '项目一',
    desc: '这是一段简短的描述文字。',
    color: '#6366f1',
  },
  {
    title: '项目二',
    desc: '这是一段较长的描述文字，包含了更多的内容信息，用来展示不同高度的卡片效果。',
    color: '#8b5cf6',
  },
  {
    title: '项目三',
    desc: '中等长度的描述。',
    color: '#a855f7',
  },
  {
    title: '项目四',
    desc: '这是一段非常长的描述文字，它包含了很多内容，可以用来测试卡片在瀑布流中的显示效果。这段文字足够长，可以让卡片的高度明显大于其他卡片。',
    color: '#d946ef',
  },
  {
    title: '项目五',
    desc: '简短描述。',
    color: '#ec4899',
  },
  {
    title: '项目六',
    desc: '这也是一段中等长度的描述文字，用于展示效果。',
    color: '#f43f5e',
  },
];

export default () => (
  <Masonry columns={3} gutter={16}>
    {cards.map((card, index) => (
      <div
        key={index}
        style={{
          background: '#fff',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: card.color,
            marginBottom: 12,
          }}
        />
        <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
          {card.title}
        </Title>
        <Text type="secondary">{card.desc}</Text>
      </div>
    ))}
  </Masonry>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 列数 | `number` | `2` |
| gutter | 间距，可以是数字或 [水平间距, 垂直间距] | `number \| [number, number]` | `16` |
| sequential | 是否顺序排列（从左到右） | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

