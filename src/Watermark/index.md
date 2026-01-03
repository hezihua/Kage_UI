---
nav:
  title: 组件
  order: 2
group:
  title: 反馈
  order: 7
title: Watermark 水印
---

# Watermark 水印

给页面添加水印。

## 何时使用

- 需要给页面或内容添加版权标识时。
- 需要防止内容被复制或截图时。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark content="Watermark">
    <div style={{ height: 300, padding: 20 }}>
      <h1>这是内容区域</h1>
      <p>水印会显示在内容上方</p>
    </div>
  </Watermark>
);
```

### 多行文字

可以设置多行文字。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark content={['Watermark', '2024']}>
    <div style={{ height: 300, padding: 20 }}>
      <h1>这是内容区域</h1>
      <p>水印会显示在内容上方</p>
    </div>
  </Watermark>
);
```

### 图片水印

可以使用图片作为水印。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark
    image="https://via.placeholder.com/120x64"
    width={120}
    height={64}
  >
    <div style={{ height: 300, padding: 20 }}>
      <h1>这是内容区域</h1>
      <p>使用图片作为水印</p>
    </div>
  </Watermark>
);
```

### 自定义样式

可以自定义水印的样式。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark
    content="Custom Watermark"
    fontSize={20}
    fontColor="rgba(255, 0, 0, 0.3)"
    rotate={-45}
    opacity={0.3}
    gapX={150}
    gapY={150}
  >
    <div style={{ height: 300, padding: 20 }}>
      <h1>这是内容区域</h1>
      <p>自定义水印样式</p>
    </div>
  </Watermark>
);
```

### 偏移量

可以设置水印的偏移量。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark
    content="Watermark"
    offsetLeft={50}
    offsetTop={50}
  >
    <div style={{ height: 300, padding: 20 }}>
      <h1>这是内容区域</h1>
      <p>水印有偏移量</p>
    </div>
  </Watermark>
);
```

### 全页面水印

可以在整个页面上添加水印。

```tsx
import { Watermark } from 'wssf-kage-ui';

export default () => (
  <Watermark
    content="Page Watermark"
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
    }}
  >
    <div style={{ minHeight: '100vh', padding: 20 }}>
      <h1>这是页面内容</h1>
      <p>水印会覆盖整个页面</p>
    </div>
  </Watermark>
);
```

## API

### Watermark

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 水印内容（文字或文字数组） | `string \| string[]` | `'Watermark'` |
| image | 图片地址（优先级高于 content） | `string` | - |
| width | 水印宽度 | `number` | `120` |
| height | 水印高度 | `number` | `64` |
| rotate | 水印旋转角度 | `number` | `-22` |
| opacity | 水印透明度 | `number` | `0.15` |
| fontSize | 水印字体大小 | `number` | `16` |
| fontColor | 水印字体颜色 | `string` | 自动（亮色模式：`rgba(0, 0, 0, 0.6)`，深色模式：`rgba(255, 255, 255, 0.4)`） |
| fontFamily | 水印字体 | `string` | `'sans-serif'` |
| gapX | 水印之间的水平间距 | `number` | `100` |
| gapY | 水印之间的垂直间距 | `number` | `100` |
| offsetLeft | 水印距离容器左边的偏移量 | `number` | `0` |
| offsetTop | 水印距离容器上边的偏移量 | `number` | `0` |
| zIndex | 水印层级 | `number` | `9` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| children | 子元素 | `ReactNode` | - |

