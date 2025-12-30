---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Carousel 走马灯
---

# Carousel 走马灯

旋转木马，一组轮播的区域。

## 何时使用

- 当有一组平级的内容。
- 当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现。
- 常用于一组图片或卡片轮播。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Carousel } from 'wssf-kage-ui';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

export default () => (
  <Carousel style={{ width: '100%', height: '300px' }}>
    <div>
      <div style={contentStyle}>1</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#6366f1' }}>2</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#818cf8' }}>3</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div>
    </div>
  </Carousel>
);
```

### 自动切换

定时切换下一张。

```tsx
import { Carousel } from 'wssf-kage-ui';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

export default () => (
  <Carousel autoplay style={{ width: '100%', height: '300px' }}>
    <div>
      <div style={contentStyle}>1</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#6366f1' }}>2</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#818cf8' }}>3</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div>
    </div>
  </Carousel>
);
```

### 渐显效果

切换效果为渐显。

```tsx
import { Carousel } from 'wssf-kage-ui';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

export default () => (
  <Carousel effect="fade" autoplay style={{ width: '100%', height: '300px' }}>
    <div>
      <div style={contentStyle}>1</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#6366f1' }}>2</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#818cf8' }}>3</div>
    </div>
    <div>
      <div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div>
    </div>
  </Carousel>
);
```

### 位置

位置有 4 个方向。

```tsx
import { Carousel, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
  fontSize: '48px',
  fontWeight: 'bold',
};

type DotPosition = 'top' | 'bottom' | 'left' | 'right';

export default () => {
  const [position, setPosition] = useState<DotPosition>('bottom');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Button 
          type={position === 'top' ? 'primary' : 'default'}
          onClick={() => setPosition('top')}
        >
          Top
        </Button>
        <Button 
          type={position === 'bottom' ? 'primary' : 'default'}
          onClick={() => setPosition('bottom')}
        >
          Bottom
        </Button>
        <Button 
          type={position === 'left' ? 'primary' : 'default'}
          onClick={() => setPosition('left')}
        >
          Start
        </Button>
        <Button 
          type={position === 'right' ? 'primary' : 'default'}
          onClick={() => setPosition('right')}
        >
          End
        </Button>
      </Space>
      <Carousel dotPosition={position} style={{ width: '100%', height: '300px' }}>
        <div><div style={contentStyle}>1</div></div>
        <div><div style={{ ...contentStyle, background: '#6366f1' }}>2</div></div>
        <div><div style={{ ...contentStyle, background: '#818cf8' }}>3</div></div>
        <div><div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div></div>
      </Carousel>
    </Space>
  );
};
```

### 受控模式

通过 `activeIndex` 和 `onChange` 控制当前显示的项。

```tsx
import { Carousel, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Button onClick={() => setCurrent(0)}>第 1 项</Button>
        <Button onClick={() => setCurrent(1)}>第 2 项</Button>
        <Button onClick={() => setCurrent(2)}>第 3 项</Button>
        <Button onClick={() => setCurrent(3)}>第 4 项</Button>
      </Space>
      <Carousel activeIndex={current} onChange={setCurrent} style={{ width: '100%', height: '300px' }}>
        <div><div style={contentStyle}>1</div></div>
        <div><div style={{ ...contentStyle, background: '#6366f1' }}>2</div></div>
        <div><div style={{ ...contentStyle, background: '#818cf8' }}>3</div></div>
        <div><div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div></div>
      </Carousel>
    </Space>
  );
};
```

### 图片轮播

常用的图片轮播场景。

```tsx
import { Carousel } from 'wssf-kage-ui';

export default () => (
  <Carousel autoplay style={{ width: '100%', height: '400px' }}>
    <div>
      <img 
        src="https://picsum.photos/800/400?random=1" 
        alt="1" 
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
    </div>
    <div>
      <img 
        src="https://picsum.photos/800/400?random=2" 
        alt="2" 
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
    </div>
    <div>
      <img 
        src="https://picsum.photos/800/400?random=3" 
        alt="3" 
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
    </div>
    <div>
      <img 
        src="https://picsum.photos/800/400?random=4" 
        alt="4" 
        style={{ width: '100%', height: '400px', objectFit: 'cover' }}
      />
    </div>
  </Carousel>
);
```

### 不循环

设置 `infinite` 为 false 禁用循环轮播。

```tsx
import { Carousel } from 'wssf-kage-ui';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

export default () => (
  <Carousel infinite={false} style={{ width: '100%', height: '300px' }}>
    <div><div style={contentStyle}>1</div></div>
    <div><div style={{ ...contentStyle, background: '#6366f1' }}>2</div></div>
    <div><div style={{ ...contentStyle, background: '#818cf8' }}>3</div></div>
    <div><div style={{ ...contentStyle, background: '#a5b4fc' }}>4</div></div>
  </Carousel>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoplay | 是否自动切换 | `boolean` | `false` |
| autoplaySpeed | 自动切换的时间间隔（毫秒） | `number` | `3000` |
| dotPosition | 面板指示点位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` |
| dots | 是否显示面板指示点 | `boolean` | `true` |
| effect | 切换效果 | `'scrollx' \| 'fade'` | `'scrollx'` |
| infinite | 是否无限循环 | `boolean` | `true` |
| activeIndex | 当前激活的索引（受控） | `number` | - |
| defaultActiveIndex | 默认激活的索引 | `number` | `0` |
| onChange | 切换面板的回调 | `(current: number) => void` | - |
| beforeChange | 切换面板前的回调 | `(from: number, to: number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

