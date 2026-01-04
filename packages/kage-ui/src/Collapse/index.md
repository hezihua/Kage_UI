---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Collapse 折叠面板
---

# Collapse 折叠面板

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- 手风琴 是一种特殊的折叠面板，只允许单个内容区域展开。

## 代码演示

### 基本使用

可以同时展开多个面板，这个例子默认展开了第一个。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1">
      <p>折叠面板的内容区域</p>
      <p>可以放置任意内容</p>
    </Item>
    <Item key="2" header="这是面板标题 2">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3">
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 手风琴

手风琴模式，每次只打开一个面板。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse accordion defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1">
      <p>折叠面板的内容区域</p>
      <p>手风琴模式下，一次只能展开一个面板</p>
    </Item>
    <Item key="2" header="这是面板标题 2">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3">
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 无边框

无边框风格。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse bordered={false} defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="2" header="这是面板标题 2">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3">
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 禁用状态

禁用某个面板。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="2" header="这是面板标题 2（禁用）" disabled>
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3">
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 自定义面板

自定义各个面板的背景色、圆角和边距。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

const customStyle = {
  background: '#f7f7f7',
  borderRadius: '8px',
  marginBottom: '16px',
  border: 'none',
  overflow: 'hidden',
};

export default () => (
  <Collapse bordered={false}>
    <Item key="1" header="这是面板标题 1" style={customStyle}>
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="2" header="这是面板标题 2" style={customStyle}>
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3" style={customStyle}>
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 额外内容

可以在面板头部添加额外的内容。

```tsx
import { Collapse } from 'wssf-kage-ui';
import { useState } from 'react';

const { Item } = Collapse;

export default () => {
  const [activeKey, setActiveKey] = useState(['1']);

  const genExtra = (key: string) => (
    <span
      onClick={(e) => {
        e.stopPropagation();
        alert(`点击了额外内容 ${key}`);
      }}
      style={{ color: '#1890ff', cursor: 'pointer' }}
    >
      更多
    </span>
  );

  return (
    <Collapse activeKey={activeKey} onChange={(key) => setActiveKey(key as string[])}>
      <Item key="1" header="这是面板标题 1" extra={genExtra('1')}>
        <p>折叠面板的内容区域</p>
      </Item>
      <Item key="2" header="这是面板标题 2" extra={genExtra('2')}>
        <p>折叠面板的内容区域</p>
      </Item>
      <Item key="3" header="这是面板标题 3" extra={genExtra('3')}>
        <p>折叠面板的内容区域</p>
      </Item>
    </Collapse>
  );
};
```

### 隐藏箭头

隐藏展开图标。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1" showArrow={false}>
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="2" header="这是面板标题 2" showArrow={false}>
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3" showArrow={false}>
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

### 图标位置

展开图标在右侧。

```tsx
import { Collapse } from 'wssf-kage-ui';

const { Item } = Collapse;

export default () => (
  <Collapse expandIconPosition="end" defaultActiveKey={['1']}>
    <Item key="1" header="这是面板标题 1">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="2" header="这是面板标题 2">
      <p>折叠面板的内容区域</p>
    </Item>
    <Item key="3" header="这是面板标题 3">
      <p>折叠面板的内容区域</p>
    </Item>
  </Collapse>
);
```

## API

### Collapse

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| activeKey | 当前激活的面板（受控） | `string \| string[] \| number \| number[]` | - |
| defaultActiveKey | 默认激活的面板 | `string \| string[] \| number \| number[]` | `[]` |
| accordion | 是否手风琴模式 | `boolean` | `false` |
| bordered | 是否显示边框 | `boolean` | `true` |
| onChange | 切换面板的回调 | `(key: string \| string[] \| number \| number[]) => void` | - |
| expandIconPosition | 展开图标位置 | `'start' \| 'end'` | `'start'` |
| collapsible | 是否可折叠或禁用折叠 | `'header' \| 'disabled'` | `'header'` |
| destroyInactivePanel | 销毁折叠隐藏的面板 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Collapse.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识符 | `string \| number` | - |
| header | 面板头内容 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| showArrow | 是否显示箭头 | `boolean` | `true` |
| extra | 额外的右侧内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

