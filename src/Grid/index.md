---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Grid 栅格
---

# Grid 栅格

24 栅格系统。

## 设计理念

在多数业务情况下，需要在设计区域内解决大量信息收纳的问题，因此在 12 栅格系统的基础上，我们将整个设计建议区域按照 24 等分的原则进行划分。

## 概述

布局的栅格化系统，我们是基于行（row）和列（col）来定义信息区块的外部框架，以保证页面的每个区域能够稳健地排布起来。

- 通过 `Row` 在水平方向建立一组 `Col`
- 内容应当放置于 `Col` 内，并且只有 `Col` 可以作为 `Row` 的直接子元素
- 栅格系统中的列是指 1 到 24 的值来表示其跨越的范围
- 如果一个 `Row` 中的 `Col` 总和超过 24，那么多余的 `Col` 会作为一个整体另起一行排列

## 代码演示

### 基础栅格

从堆叠到水平排列。使用单一的一组 `Row` 和 `Col` 栅格组件，就可以创建一个基本的栅格系统。

```tsx
import { Grid } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

const colStyleLight: React.CSSProperties = {
  ...colStyle,
  background: '#818cf8',
};

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Row>
      <Col span={24}><div style={colStyle}>col-24</div></Col>
    </Row>
    <Row>
      <Col span={12}><div style={colStyle}>col-12</div></Col>
      <Col span={12}><div style={colStyleLight}>col-12</div></Col>
    </Row>
    <Row>
      <Col span={8}><div style={colStyle}>col-8</div></Col>
      <Col span={8}><div style={colStyleLight}>col-8</div></Col>
      <Col span={8}><div style={colStyle}>col-8</div></Col>
    </Row>
    <Row>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyleLight}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyleLight}>col-6</div></Col>
    </Row>
  </div>
);
```

### 区块间隔

通过 `gutter` 属性设置栅格间隔，推荐使用 `(16+8n)px` 作为间隔。

```tsx
import { Grid } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Row gutter={16}>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
    </Row>
    <Row gutter={[16, 24]}>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
      <Col span={6}><div style={colStyle}>col-6</div></Col>
    </Row>
  </div>
);
```

### 左右偏移

使用 `offset` 可以将列向右侧偏移。

```tsx
import { Grid } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Row>
      <Col span={8}><div style={colStyle}>col-8</div></Col>
      <Col span={8} offset={8}><div style={colStyle}>col-8 offset-8</div></Col>
    </Row>
    <Row>
      <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
      <Col span={6} offset={6}><div style={colStyle}>col-6 offset-6</div></Col>
    </Row>
    <Row>
      <Col span={12} offset={6}><div style={colStyle}>col-12 offset-6</div></Col>
    </Row>
  </div>
);
```

### 排列方式

通过 `justify` 设置子元素水平排列方式。

```tsx
import { Grid, Divider } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

export default () => (
  <div>
    <Divider orientation="left">start</Divider>
    <Row justify="start">
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
    </Row>

    <Divider orientation="left">center</Divider>
    <Row justify="center">
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
    </Row>

    <Divider orientation="left">end</Divider>
    <Row justify="end">
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
    </Row>

    <Divider orientation="left">space-between</Divider>
    <Row justify="space-between">
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
    </Row>

    <Divider orientation="left">space-around</Divider>
    <Row justify="space-around">
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
      <Col span={4}><div style={colStyle}>col-4</div></Col>
    </Row>
  </div>
);
```

### 垂直对齐

通过 `align` 设置子元素垂直对齐方式。

```tsx
import { Grid, Divider } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const rowStyle: React.CSSProperties = {
  background: 'rgba(99, 102, 241, 0.1)',
  padding: '8px 0',
};

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

export default () => (
  <div>
    <Divider orientation="left">top</Divider>
    <Row justify="center" align="top" style={rowStyle}>
      <Col span={4}><div style={{ ...colStyle, height: 100 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 50 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 120 }}>col-4</div></Col>
    </Row>

    <Divider orientation="left">middle</Divider>
    <Row justify="center" align="middle" style={rowStyle}>
      <Col span={4}><div style={{ ...colStyle, height: 100 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 50 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 120 }}>col-4</div></Col>
    </Row>

    <Divider orientation="left">bottom</Divider>
    <Row justify="center" align="bottom" style={rowStyle}>
      <Col span={4}><div style={{ ...colStyle, height: 100 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 50 }}>col-4</div></Col>
      <Col span={4}><div style={{ ...colStyle, height: 120 }}>col-4</div></Col>
    </Row>
  </div>
);
```

### Flex 填充

Col 提供 `flex` 属性以支持填充。

```tsx
import { Grid, Divider } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
};

export default () => (
  <div>
    <Divider orientation="left">百分比</Divider>
    <Row>
      <Col flex={2}><div style={colStyle}>2 / 5</div></Col>
      <Col flex={3}><div style={{ ...colStyle, background: '#818cf8' }}>3 / 5</div></Col>
    </Row>

    <Divider orientation="left">填充剩余</Divider>
    <Row>
      <Col flex="100px"><div style={colStyle}>100px</div></Col>
      <Col flex="auto"><div style={{ ...colStyle, background: '#818cf8' }}>auto</div></Col>
    </Row>

    <Divider orientation="left">原始写法</Divider>
    <Row>
      <Col flex="1 1 200px"><div style={colStyle}>1 1 200px</div></Col>
      <Col flex="0 1 300px"><div style={{ ...colStyle, background: '#818cf8' }}>0 1 300px</div></Col>
    </Row>
  </div>
);
```

### 响应式布局

参照 Bootstrap 的响应式设计，预设六个响应尺寸：`xs` `sm` `md` `lg` `xl` `xxl`。

```tsx
import { Grid } from 'wssf-kage-ui';

const { Row, Col } = Grid;

const colStyle: React.CSSProperties = {
  background: '#6366f1',
  color: '#fff',
  padding: '16px 0',
  textAlign: 'center',
  borderRadius: 4,
  marginBottom: 8,
};

export default () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <div style={colStyle}>Col</div>
    </Col>
  </Row>
);
```

## API

### Row

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| gutter | 栅格间隔 | `number \| [number, number]` | `0` |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | - |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | - |
| wrap | 是否自动换行 | `boolean` | `true` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Col

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| span | 栅格占位格数 | `number` | - |
| offset | 栅格左侧偏移格数 | `number` | `0` |
| order | 栅格顺序 | `number` | - |
| pull | 栅格向左移动格数 | `number` | - |
| push | 栅格向右移动格数 | `number` | - |
| flex | flex 布局属性 | `string \| number` | - |
| xs | `<576px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| sm | `≥576px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| md | `≥768px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| lg | `≥992px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| xl | `≥1200px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| xxl | `≥1600px` 响应式栅格 | `number \| { span, offset, order, pull, push }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

