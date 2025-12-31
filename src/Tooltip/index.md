---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Tooltip 文字提示
---

# Tooltip 文字提示

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Tooltip, Button } from 'wssf-kage-ui';

export default () => (
  <Tooltip title="提示文字">
    <Button>鼠标移入</Button>
  </Tooltip>
);
```

### 位置

位置有 12 个方向。

```tsx
import { Tooltip, Button, Space } from 'wssf-kage-ui';

const text = '提示文字';

export default () => (
  <div style={{ padding: '60px 100px' }}>
    <div style={{ marginLeft: 70, whiteSpace: 'nowrap' }}>
      <Space>
        <Tooltip placement="topLeft" title={text}>
          <Button>TL</Button>
        </Tooltip>
        <Tooltip placement="top" title={text}>
          <Button>Top</Button>
        </Tooltip>
        <Tooltip placement="topRight" title={text}>
          <Button>TR</Button>
        </Tooltip>
      </Space>
    </div>
    <div style={{ width: 70, float: 'left' }}>
      <Space direction="vertical">
        <Tooltip placement="leftTop" title={text}>
          <Button>LT</Button>
        </Tooltip>
        <Tooltip placement="left" title={text}>
          <Button>Left</Button>
        </Tooltip>
        <Tooltip placement="leftBottom" title={text}>
          <Button>LB</Button>
        </Tooltip>
      </Space>
    </div>
    <div style={{ width: 70, marginLeft: 304 }}>
      <Space direction="vertical">
        <Tooltip placement="rightTop" title={text}>
          <Button>RT</Button>
        </Tooltip>
        <Tooltip placement="right" title={text}>
          <Button>Right</Button>
        </Tooltip>
        <Tooltip placement="rightBottom" title={text}>
          <Button>RB</Button>
        </Tooltip>
      </Space>
    </div>
    <div style={{ marginLeft: 70, clear: 'both', whiteSpace: 'nowrap' }}>
      <Space>
        <Tooltip placement="bottomLeft" title={text}>
          <Button>BL</Button>
        </Tooltip>
        <Tooltip placement="bottom" title={text}>
          <Button>Bottom</Button>
        </Tooltip>
        <Tooltip placement="bottomRight" title={text}>
          <Button>BR</Button>
        </Tooltip>
      </Space>
    </div>
  </div>
);
```

### 触发方式

鼠标移入、聚焦、点击、右键点击。

```tsx
import { Tooltip, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tooltip title="鼠标移入触发" trigger="hover">
      <Button>Hover</Button>
    </Tooltip>
    <Tooltip title="聚焦触发" trigger="focus">
      <Button>Focus</Button>
    </Tooltip>
    <Tooltip title="点击触发" trigger="click">
      <Button>Click</Button>
    </Tooltip>
    <Tooltip title="右键点击触发" trigger="contextMenu">
      <Button>Context Menu</Button>
    </Tooltip>
  </Space>
);
```

### 多种触发方式

支持多种触发方式组合。

```tsx
import { Tooltip, Button } from 'wssf-kage-ui';

export default () => (
  <Tooltip title="多触发方式" trigger={['hover', 'click']}>
    <Button>Hover 或 Click</Button>
  </Tooltip>
);
```

### 箭头

通过 `arrow` 属性隐藏箭头。

```tsx
import { Tooltip, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tooltip title="有箭头" arrow>
      <Button>有箭头</Button>
    </Tooltip>
    <Tooltip title="无箭头" arrow={false}>
      <Button>无箭头</Button>
    </Tooltip>
  </Space>
);
```

### 颜色

使用 `color` 属性设置预设颜色或自定义颜色。

```tsx
import { Tooltip, Button, Space, Divider } from 'wssf-kage-ui';

export default () => (
  <>
    <Divider orientation="left">预设颜色</Divider>
    <Space wrap>
      <Tooltip title="Default" color="default">
        <Button>Default</Button>
      </Tooltip>
      <Tooltip title="Primary" color="primary">
        <Button>Primary</Button>
      </Tooltip>
      <Tooltip title="Success" color="success">
        <Button>Success</Button>
      </Tooltip>
      <Tooltip title="Warning" color="warning">
        <Button>Warning</Button>
      </Tooltip>
      <Tooltip title="Error" color="error">
        <Button>Error</Button>
      </Tooltip>
    </Space>

    <Divider orientation="left">自定义颜色</Divider>
    <Space wrap>
      <Tooltip title="#f50" color="#f50">
        <Button>#f50</Button>
      </Tooltip>
      <Tooltip title="#2db7f5" color="#2db7f5">
        <Button>#2db7f5</Button>
      </Tooltip>
      <Tooltip title="#87d068" color="#87d068">
        <Button>#87d068</Button>
      </Tooltip>
      <Tooltip title="#108ee9" color="#108ee9">
        <Button>#108ee9</Button>
      </Tooltip>
      <Tooltip title="pink" color="pink">
        <Button>pink</Button>
      </Tooltip>
      <Tooltip title="purple" color="purple">
        <Button>purple</Button>
      </Tooltip>
    </Space>
  </>
);
```

### 延迟

鼠标移入后延时显示，移出后延时隐藏。

```tsx
import { Tooltip, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tooltip title="延时 1 秒显示" mouseEnterDelay={1}>
      <Button>延时显示</Button>
    </Tooltip>
    <Tooltip title="延时 1 秒隐藏" mouseLeaveDelay={1}>
      <Button>延时隐藏</Button>
    </Tooltip>
  </Space>
);
```

### 受控模式

通过 `open` 属性手动控制显示隐藏。

```tsx
import { Tooltip, Button, Space, Switch } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Switch checked={open} onChange={setOpen} />
      <Tooltip title="受控的 Tooltip" open={open} onOpenChange={setOpen}>
        <Button>受控模式</Button>
      </Tooltip>
    </Space>
  );
};
```

### 复杂内容

可以在 `title` 中放置复杂的 ReactNode。

```tsx
import { Tooltip, Button } from 'wssf-kage-ui';

const content = (
  <div>
    <p style={{ margin: 0 }}>内容</p>
    <p style={{ margin: 0 }}>更多内容</p>
  </div>
);

export default () => (
  <Tooltip title={content}>
    <Button>复杂内容</Button>
  </Tooltip>
);
```

### 包裹文字

直接包裹文字。

```tsx
import { Tooltip, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tooltip title="提示文字">
      <span>鼠标移入显示提示</span>
    </Tooltip>
    <Tooltip title="链接提示">
      <a href="#">链接文字</a>
    </Tooltip>
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 提示文字 | `ReactNode` | - |
| trigger | 触发行为 | `'hover' \| 'focus' \| 'click' \| 'contextMenu' \| Array` | `'hover'` |
| placement | 气泡位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'` | `'top'` |
| defaultOpen | 默认是否显示 | `boolean` | `false` |
| open | 用于手动控制浮层显隐 | `boolean` | - |
| onOpenChange | 显示隐藏的回调 | `(open: boolean) => void` | - |
| color | 背景颜色 | `'default' \| 'primary' \| 'success' \| 'warning' \| 'error' \| string` | `'default'` |
| arrow | 是否显示箭头 | `boolean` | `true` |
| mouseEnterDelay | 鼠标移入后延时多少才显示（秒） | `number` | `0.1` |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏（秒） | `number` | `0.1` |
| destroyTooltipOnHide | 关闭后是否销毁 Tooltip | `boolean` | `false` |
| getPopupContainer | 浮层渲染父节点 | `() => HTMLElement` | `() => document.body` |
| overlayStyle | 卡片样式 | `CSSProperties` | - |
| overlayClassName | 卡片类名 | `string` | - |
| overlayInnerStyle | 卡片内容区域的样式 | `CSSProperties` | - |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | `boolean` | `true` |
| zIndex | z-index | `number` | `1070` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

