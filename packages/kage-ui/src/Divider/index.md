---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Divider 分割线
---

# Divider 分割线

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## 代码演示

### 水平分割线

默认为水平分割线。

```tsx
import { Divider, Typography } from 'wssf-kage-ui';

const { Paragraph } = Typography;

export default () => (
  <div>
    <Paragraph>
      这是第一段文字。Kage UI 是一个现代化的 React 组件库，致力于提供优雅且高效的用户界面组件。
    </Paragraph>
    <Divider />
    <Paragraph>
      这是第二段文字。组件库支持主题定制和按需加载，适用于各种类型的 Web 应用程序开发。
    </Paragraph>
    <Divider dashed />
    <Paragraph>
      这是第三段文字。无论是企业级应用还是个人项目，Kage UI 都能满足你的需求。
    </Paragraph>
  </div>
);
```

### 带文字的分割线

分割线中带有文字，可以用 `orientation` 指定文字位置。

```tsx
import { Divider, Typography } from 'wssf-kage-ui';

const { Paragraph } = Typography;

export default () => (
  <div>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider>默认居中</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider orientation="left">左侧文字</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider orientation="right">右侧文字</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
  </div>
);
```

### 文字位置偏移

使用 `orientationMargin` 设置文字与边缘的距离。

```tsx
import { Divider, Typography } from 'wssf-kage-ui';

const { Paragraph } = Typography;

export default () => (
  <div>
    <Divider orientation="left" orientationMargin="0">左侧 0 边距</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider orientation="left" orientationMargin={50}>左侧 50px 边距</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider orientation="right" orientationMargin={50}>右侧 50px 边距</Divider>
  </div>
);
```

### 分割线样式

支持实线、虚线和点线三种样式。

```tsx
import { Divider } from 'wssf-kage-ui';

export default () => (
  <div>
    <Divider variant="solid">实线 Solid</Divider>
    <Divider variant="dashed">虚线 Dashed</Divider>
    <Divider variant="dotted">点线 Dotted</Divider>
  </div>
);
```

### 垂直分割线

使用 `type="vertical"` 设置为行内的垂直分割线。

```tsx
import { Divider, Typography } from 'wssf-kage-ui';

const { Text, Link } = Typography;

export default () => (
  <div>
    <Text>文字</Text>
    <Divider type="vertical" />
    <Link href="#">链接</Link>
    <Divider type="vertical" />
    <Link href="#">链接</Link>
    <Divider type="vertical" variant="dashed" />
    <Link href="#">虚线分隔</Link>
  </div>
);
```

### 纯净模式

使用 `plain` 可以设置为更轻量的分割线文字样式。

```tsx
import { Divider, Typography } from 'wssf-kage-ui';

const { Paragraph } = Typography;

export default () => (
  <div>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider plain>普通文字</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
    <Divider plain dashed>普通虚线文字</Divider>
    <Paragraph>这是一段文字内容</Paragraph>
  </div>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 分割线方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| dashed | 是否虚线 | `boolean` | `false` |
| variant | 分割线样式 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| orientation | 文字位置 | `'left' \| 'center' \| 'right'` | `'center'` |
| orientationMargin | 文字与边缘距离 | `number \| string` | - |
| plain | 纯净模式（文字更轻量） | `boolean` | `false` |
| children | 分割线中的文字 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

