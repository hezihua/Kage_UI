---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Anchor 锚点
---

# Anchor 锚点

用于跳转到页面指定位置。

## 何时使用

- 需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 代码演示

### 基本使用

最简单的锚点用法。

```tsx
import { Anchor, Typography } from 'wssf-kage-ui';

const { Title, Paragraph } = Typography;

export default () => (
  <div style={{ display: 'flex', gap: 48 }}>
    <Anchor
      targetOffset={80}
      items={[
        { key: '1', href: '#basic-demo-1', title: '基本介绍' },
        { key: '2', href: '#basic-demo-2', title: '使用方法' },
        { key: '3', href: '#basic-demo-3', title: '注意事项' },
      ]}
    />
    <div style={{ flex: 1 }}>
      <div id="basic-demo-1" style={{ height: 200, marginBottom: 16 }}>
        <Title level={4}>基本介绍</Title>
        <Paragraph>这是基本介绍部分的内容。Anchor 组件用于快速导航到页面的指定位置。</Paragraph>
      </div>
      <div id="basic-demo-2" style={{ height: 200, marginBottom: 16 }}>
        <Title level={4}>使用方法</Title>
        <Paragraph>通过配置 items 属性，设置锚点链接列表。href 属性指定目标元素的 id。</Paragraph>
      </div>
      <div id="basic-demo-3" style={{ height: 200 }}>
        <Title level={4}>注意事项</Title>
        <Paragraph>确保目标元素有对应的 id 属性，否则无法正确跳转。</Paragraph>
      </div>
    </div>
  </div>
);
```

### 水平方向

设置 `direction="horizontal"` 实现水平锚点导航。

```tsx
import { Anchor, Typography } from 'wssf-kage-ui';

const { Title, Paragraph } = Typography;

export default () => (
  <div>
    <Anchor
      direction="horizontal"
      targetOffset={80}
      items={[
        { key: '1', href: '#h-demo-1', title: '产品介绍' },
        { key: '2', href: '#h-demo-2', title: '功能特性' },
        { key: '3', href: '#h-demo-3', title: '使用指南' },
        { key: '4', href: '#h-demo-4', title: '常见问题' },
      ]}
      style={{ marginBottom: 24, background: '#fafafa', borderRadius: 8 }}
    />
    <div>
      <div id="h-demo-1" style={{ padding: '24px 0' }}>
        <Title level={4}>产品介绍</Title>
        <Paragraph>Kage UI 是一个现代化的 React 组件库，提供丰富的 UI 组件。</Paragraph>
      </div>
      <div id="h-demo-2" style={{ padding: '24px 0' }}>
        <Title level={4}>功能特性</Title>
        <Paragraph>支持 TypeScript、主题定制、按需加载等特性。</Paragraph>
      </div>
      <div id="h-demo-3" style={{ padding: '24px 0' }}>
        <Title level={4}>使用指南</Title>
        <Paragraph>通过 npm install 安装后即可使用，支持 Tree Shaking。</Paragraph>
      </div>
      <div id="h-demo-4" style={{ padding: '24px 0' }}>
        <Title level={4}>常见问题</Title>
        <Paragraph>如有问题请查阅文档或提交 Issue。</Paragraph>
      </div>
    </div>
  </div>
);
```

### 嵌套锚点

支持嵌套的锚点链接。

```tsx
import { Anchor, Typography } from 'wssf-kage-ui';

const { Title, Paragraph } = Typography;

export default () => (
  <div style={{ display: 'flex', gap: 48 }}>
    <Anchor
      targetOffset={80}
      items={[
        {
          key: '1',
          href: '#nested-1',
          title: '第一章',
          children: [
            { key: '1-1', href: '#nested-1-1', title: '1.1 节' },
            { key: '1-2', href: '#nested-1-2', title: '1.2 节' },
          ],
        },
        {
          key: '2',
          href: '#nested-2',
          title: '第二章',
          children: [
            { key: '2-1', href: '#nested-2-1', title: '2.1 节' },
            { key: '2-2', href: '#nested-2-2', title: '2.2 节' },
          ],
        },
      ]}
    />
    <div style={{ flex: 1 }}>
      <div id="nested-1" style={{ marginBottom: 16 }}>
        <Title level={3}>第一章</Title>
        <div id="nested-1-1" style={{ padding: '16px 0' }}>
          <Title level={5}>1.1 节</Title>
          <Paragraph>这是第一章第一节的内容。</Paragraph>
        </div>
        <div id="nested-1-2" style={{ padding: '16px 0' }}>
          <Title level={5}>1.2 节</Title>
          <Paragraph>这是第一章第二节的内容。</Paragraph>
        </div>
      </div>
      <div id="nested-2">
        <Title level={3}>第二章</Title>
        <div id="nested-2-1" style={{ padding: '16px 0' }}>
          <Title level={5}>2.1 节</Title>
          <Paragraph>这是第二章第一节的内容。</Paragraph>
        </div>
        <div id="nested-2-2" style={{ padding: '16px 0' }}>
          <Title level={5}>2.2 节</Title>
          <Paragraph>这是第二章第二节的内容。</Paragraph>
        </div>
      </div>
    </div>
  </div>
);
```

### 静态锚点

使用 `replace` 属性禁用滚动监听，用于纯展示锚点列表。

```tsx
import { Anchor, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <div style={{ padding: 16, background: '#f5f5f5', borderRadius: 8 }}>
      <Text strong style={{ display: 'block', marginBottom: 12 }}>目录</Text>
      <Anchor
        replace
        items={[
          { key: '1', href: '#intro', title: '简介' },
          { key: '2', href: '#install', title: '安装' },
          { key: '3', href: '#usage', title: '使用' },
          { key: '4', href: '#api', title: 'API' },
          { key: '5', href: '#faq', title: 'FAQ' },
        ]}
      />
    </div>
  </div>
);
```

### JSX 声明式用法

也支持通过 JSX 子元素的方式声明锚点。

```tsx
import { Anchor } from 'wssf-kage-ui';

export default () => (
  <Anchor>
    <Anchor.Link href="#jsx-1" title="第一部分" />
    <Anchor.Link href="#jsx-2" title="第二部分">
      <Anchor.Link href="#jsx-2-1" title="2.1 小节" />
      <Anchor.Link href="#jsx-2-2" title="2.2 小节" />
    </Anchor.Link>
    <Anchor.Link href="#jsx-3" title="第三部分" />
  </Anchor>
);
```

### 事件回调

监听点击和滚动变化事件。

```tsx
import { Anchor, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text, Paragraph } = Typography;

export default () => {
  const [currentLink, setCurrentLink] = useState('');
  const [clickedLink, setClickedLink] = useState('');

  return (
    <div>
      <Paragraph style={{ marginBottom: 16 }}>
        当前激活: <Text code>{currentLink || '无'}</Text> | 
        最近点击: <Text code>{clickedLink || '无'}</Text>
      </Paragraph>
      <Anchor
        direction="horizontal"
        items={[
          { key: '1', href: '#event-1', title: '链接一' },
          { key: '2', href: '#event-2', title: '链接二' },
          { key: '3', href: '#event-3', title: '链接三' },
        ]}
        onChange={(link) => setCurrentLink(link)}
        onClick={(e, { href }) => setClickedLink(href)}
      />
    </div>
  );
};
```

## API

### Anchor

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 锚点配置列表 | `AnchorItem[]` | - |
| direction | 方向 | `'vertical' \| 'horizontal'` | `'vertical'` |
| affix | 固定模式 | `boolean` | `false` |
| offsetTop | 固定时距离顶部的偏移 | `number` | `0` |
| targetOffset | 锚点滚动偏移量 | `number` | `0` |
| getContainer | 滚动容器 | `() => HTMLElement \| Window` | `() => window` |
| showInkInFixed | 固定模式是否显示小圆点 | `boolean` | `false` |
| onClick | 点击锚点回调 | `(e, link) => void` | - |
| onChange | 滚动变化回调 | `(currentActiveLink: string) => void` | - |
| getCurrentAnchor | 自定义高亮的锚点 | `(activeLink: string) => string` | - |
| replace | 禁用滚动监听（静态模式） | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### AnchorItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| href | 锚点链接 | `string` | - |
| title | 显示文字 | `ReactNode` | - |
| children | 子锚点 | `AnchorItem[]` | - |

### Anchor.Link (JSX 用法)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 锚点链接 | `string` | - |
| title | 显示文字 | `ReactNode` | - |
| children | 子链接 | `ReactNode` | - |

