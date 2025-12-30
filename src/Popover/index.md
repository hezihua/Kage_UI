---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Popover 气泡卡片
---

# Popover 气泡卡片

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 Tooltip 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Popover, Button } from 'wssf-kage-ui';

const content = (
  <div>
    <p>这是气泡卡片的内容</p>
    <p>可以包含更多信息</p>
  </div>
);

export default () => (
  <Popover content={content}>
    <Button>悬停显示</Button>
  </Popover>
);
```

### 三种触发方式

鼠标移入、聚焦、点击。

```tsx
import { Popover, Button, Space } from 'wssf-kage-ui';

const content = <div>这是气泡卡片的内容</div>;

export default () => (
  <Space>
    <Popover content={content} trigger="hover">
      <Button>悬停触发</Button>
    </Popover>
    <Popover content={content} trigger="focus">
      <Button>聚焦触发</Button>
    </Popover>
    <Popover content={content} trigger="click">
      <Button>点击触发</Button>
    </Popover>
  </Space>
);
```

### 位置

位置有 12 个方向。

```tsx
import { Popover, Button, Space } from 'wssf-kage-ui';

const content = <div>这是气泡卡片的内容</div>;

const buttonWidth = 80;

export default () => (
  <div style={{ width: 400 }}>
    <div style={{ marginLeft: buttonWidth, whiteSpace: 'nowrap' }}>
      <Space>
        <Popover placement="topLeft" content={content}>
          <Button style={{ width: buttonWidth }}>TL</Button>
        </Popover>
        <Popover placement="top" content={content}>
          <Button style={{ width: buttonWidth }}>Top</Button>
        </Popover>
        <Popover placement="topRight" content={content}>
          <Button style={{ width: buttonWidth }}>TR</Button>
        </Popover>
      </Space>
    </div>
    <div style={{ width: buttonWidth, float: 'left' }}>
      <Space direction="vertical">
        <Popover placement="leftTop" content={content}>
          <Button style={{ width: buttonWidth }}>LT</Button>
        </Popover>
        <Popover placement="left" content={content}>
          <Button style={{ width: buttonWidth }}>Left</Button>
        </Popover>
        <Popover placement="leftBottom" content={content}>
          <Button style={{ width: buttonWidth }}>LB</Button>
        </Popover>
      </Space>
    </div>
    <div style={{ width: buttonWidth, marginLeft: buttonWidth * 4 }}>
      <Space direction="vertical">
        <Popover placement="rightTop" content={content}>
          <Button style={{ width: buttonWidth }}>RT</Button>
        </Popover>
        <Popover placement="right" content={content}>
          <Button style={{ width: buttonWidth }}>Right</Button>
        </Popover>
        <Popover placement="rightBottom" content={content}>
          <Button style={{ width: buttonWidth }}>RB</Button>
        </Popover>
      </Space>
    </div>
    <div style={{ marginLeft: buttonWidth, clear: 'both', whiteSpace: 'nowrap' }}>
      <Space>
        <Popover placement="bottomLeft" content={content}>
          <Button style={{ width: buttonWidth }}>BL</Button>
        </Popover>
        <Popover placement="bottom" content={content}>
          <Button style={{ width: buttonWidth }}>Bottom</Button>
        </Popover>
        <Popover placement="bottomRight" content={content}>
          <Button style={{ width: buttonWidth }}>BR</Button>
        </Popover>
      </Space>
    </div>
  </div>
);
```

### 带标题

可以设置标题。

```tsx
import { Popover, Button } from 'wssf-kage-ui';

const content = (
  <div>
    <p>这是气泡卡片的内容</p>
    <p>可以有多行信息</p>
  </div>
);

export default () => (
  <Popover title="标题" content={content}>
    <Button>悬停显示</Button>
  </Popover>
);
```

### 卡片内容

可以在卡片中添加更多内容。

```tsx
import { Popover, Button } from 'wssf-kage-ui';

const content = (
  <div>
    <p style={{ margin: '8px 0' }}>Content</p>
    <p style={{ margin: '8px 0' }}>Content</p>
    <div style={{ marginTop: 16, textAlign: 'right' }}>
      <Button size="small" type="primary">
        确定
      </Button>
    </div>
  </div>
);

export default () => (
  <Popover title="操作提示" content={content} trigger="click">
    <Button>点击显示</Button>
  </Popover>
);
```

### 受控模式

通过 open 属性控制显示。

```tsx
import { Popover, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Popover
        content="这是气泡卡片的内容"
        open={open}
        onOpenChange={setOpen}
      >
        <Button>受控气泡卡片</Button>
      </Popover>
      <Button onClick={() => setOpen(!open)}>
        {open ? '关闭' : '打开'}
      </Button>
    </Space>
  );
};
```

### 箭头显示

可以隐藏箭头。

```tsx
import { Popover, Button, Space } from 'wssf-kage-ui';

const content = <div>这是气泡卡片的内容</div>;

export default () => (
  <Space>
    <Popover content={content} arrow>
      <Button>有箭头</Button>
    </Popover>
    <Popover content={content} arrow={false}>
      <Button>无箭头</Button>
    </Popover>
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 卡片内容 | `ReactNode` | - |
| title | 卡片标题 | `ReactNode` | - |
| trigger | 触发行为 | `'hover' \| 'click' \| 'focus'` | `'hover'` |
| placement | 气泡框位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| arrow | 是否显示箭头 | `boolean` | `true` |
| open | 是否显示（受控） | `boolean` | - |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| onOpenChange | 显示隐藏的回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

