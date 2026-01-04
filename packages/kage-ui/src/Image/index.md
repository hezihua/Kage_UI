---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Image 图片
---

# Image 图片

可预览的图片展示组件。

## 何时使用

- 需要展示图片时使用。
- 加载大图时显示 loading 或自定义占位图。
- 加载失败时显示替代图片或错误提示。
- 支持点击预览放大图片。

## 代码演示

### 基本使用

基本的图片展示。

```tsx
import { Image } from 'wssf-kage-ui';

export default () => (
  <Image
    width={200}
    src="https://picsum.photos/200/300"
    alt="示例图片"
  />
);
```

### 容错处理

加载失败时显示默认错误提示。

```tsx
import { Image } from 'wssf-kage-ui';

export default () => (
  <Image
    width={200}
    height={200}
    src="error.png"
    alt="错误图片"
  />
);
```

### 自定义 fallback

加载失败时显示自定义的替代图片。

```tsx
import { Image } from 'wssf-kage-ui';

export default () => (
  <Image
    width={200}
    src="error.png"
    fallback="https://via.placeholder.com/200x200?text=Error"
    alt="自定义错误图片"
  />
);
```

### 渐进加载

大图使用占位图，提升加载体验。

```tsx
import { Image } from 'wssf-kage-ui';

export default () => (
  <Image
    width={200}
    src="https://picsum.photos/200/300?random=1"
    placeholder={
      <div style={{ 
        width: 200, 
        height: 300, 
        background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        加载中...
      </div>
    }
    alt="渐进加载"
  />
);
```

### 预览功能

点击图片可以预览。

```tsx
import { Image, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Image
      width={200}
      src="https://picsum.photos/400/300?random=2"
      alt="可预览图片1"
      preview
    />
    <Image
      width={200}
      src="https://picsum.photos/400/300?random=3"
      alt="可预览图片2"
      preview
    />
  </Space>
);
```

### 多种尺寸

不同尺寸的图片展示。

```tsx
import { Image, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Image
      width={100}
      src="https://picsum.photos/100/100?random=4"
      alt="小图"
      preview
    />
    <Image
      width={200}
      src="https://picsum.photos/200/200?random=5"
      alt="中图"
      preview
    />
    <Image
      width={300}
      src="https://picsum.photos/300/200?random=6"
      alt="大图"
      preview
    />
  </Space>
);
```

### 自定义样式

自定义图片样式。

```tsx
import { Image } from 'wssf-kage-ui';

export default () => (
  <Image
    width={200}
    src="https://picsum.photos/200/200?random=7"
    alt="圆形图片"
    style={{ borderRadius: '50%' }}
    preview
  />
);
```

### 固定宽高比

设置固定的宽高比。

```tsx
import { Image, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Image
      width={200}
      height={150}
      src="https://picsum.photos/400/300?random=8"
      alt="4:3 比例"
      style={{ objectFit: 'cover' }}
      preview
    />
    <Image
      width={200}
      height={200}
      src="https://picsum.photos/400/300?random=9"
      alt="1:1 比例"
      style={{ objectFit: 'cover' }}
      preview
    />
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| src | 图片地址 | `string` | - |
| alt | 图片描述 | `string` | - |
| width | 图片宽度 | `string \| number` | - |
| height | 图片高度 | `string \| number` | - |
| placeholder | 加载占位图 | `ReactNode` | - |
| fallback | 加载失败容错图 | `string` | - |
| preview | 是否支持预览 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onLoad | 加载完成回调 | `(event) => void` | - |
| onError | 加载失败回调 | `(event) => void` | - |

此外支持原生 `<img>` 标签的所有属性。

