---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 4
title: Tabs 标签页
---

# Tabs 标签页

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

## 代码演示

### 基本使用

默认选中第一项。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => <Tabs items={items} />;
```

### 受控模式

通过 `activeKey` 和 `onChange` 进行受控。

```tsx
import { Tabs, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => {
  const [activeKey, setActiveKey] = useState('1');

  return (
    <div>
      <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
      <Text>当前选中: <Text code>{activeKey}</Text></Text>
    </div>
  );
};
```

### 禁用标签

禁用某一项。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容', disabled: true },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => <Tabs items={items} />;
```

### 带图标

有图标的标签。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '首页', icon: '🏠', children: '首页的内容' },
  { key: '2', label: '设置', icon: '⚙️', children: '设置的内容' },
  { key: '3', label: '用户', icon: '👤', children: '用户的内容' },
];

export default () => <Tabs items={items} />;
```

### 居中

标签居中展示。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => <Tabs centered items={items} />;
```

### 卡片类型

另一种样式的页签，不提供对应的垂直样式。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => <Tabs type="card" items={items} />;
```

### 可编辑卡片

可新增和关闭选项卡。

```tsx
import { Tabs } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [items, setItems] = useState([
    { key: '1', label: '选项卡 1', children: '选项卡 1 的内容' },
    { key: '2', label: '选项卡 2', children: '选项卡 2 的内容' },
  ]);
  const [activeKey, setActiveKey] = useState('1');

  const onEdit = (targetKey, action) => {
    if (action === 'add') {
      const newKey = String(Date.now());
      setItems([
        ...items,
        { key: newKey, label: `新建标签`, children: `新建标签的内容` },
      ]);
      setActiveKey(newKey);
    } else if (action === 'remove') {
      const newItems = items.filter(item => item.key !== targetKey);
      setItems(newItems);
      if (activeKey === targetKey && newItems.length > 0) {
        setActiveKey(newItems[0].key);
      }
    }
  };

  return (
    <Tabs
      type="editable-card"
      activeKey={activeKey}
      onChange={setActiveKey}
      onEdit={onEdit}
      items={items}
    />
  );
};
```

### 尺寸

大号页签用在页头区域，小号用在弹出框等较狭窄的容器内。

```tsx
import { Tabs, Space } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <Tabs size="large" items={items} />
    <Tabs size="middle" items={items} />
    <Tabs size="small" items={items} />
  </Space>
);
```

### 位置

标签可以在上、下、左、右四个方向。

```tsx
import { Tabs, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容。这里是一些示例文字。' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容。这里是一些示例文字。' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容。这里是一些示例文字。' },
];

const positions = ['top', 'bottom', 'left', 'right'];

export default () => {
  const [position, setPosition] = useState('top');

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {positions.map((pos) => (
          <button
            key={pos}
            onClick={() => setPosition(pos)}
            className="kage-dropdown-button"
            style={{
              background: position === pos ? '#6366f1' : undefined,
              color: position === pos ? '#fff' : undefined,
              borderColor: position === pos ? '#6366f1' : undefined,
            }}
          >
            {pos}
          </button>
        ))}
      </Space>
      <Tabs tabPosition={position} items={items} />
    </div>
  );
};
```

### 额外内容

可以在标签栏右侧添加额外的操作。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => (
  <Tabs
    items={items}
    tabBarExtraContent={
      <button className="kage-dropdown-button">额外操作</button>
    }
  />
);
```

### 左右额外内容

在标签栏两侧添加额外内容。

```tsx
import { Tabs } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '选项卡一', children: '选项卡一的内容' },
  { key: '2', label: '选项卡二', children: '选项卡二的内容' },
  { key: '3', label: '选项卡三', children: '选项卡三的内容' },
];

export default () => (
  <Tabs
    items={items}
    tabBarExtraContent={{
      left: <span style={{ marginRight: 16 }}>左侧内容</span>,
      right: <button className="kage-dropdown-button">右侧操作</button>,
    }}
  />
);
```

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 标签项配置 | `TabItem[]` | - |
| activeKey | 当前激活的标签 key | `string` | - |
| defaultActiveKey | 默认激活的标签 key | `string` | 第一项的 key |
| type | 标签类型 | `'line' \| 'card' \| 'editable-card'` | `'line'` |
| tabPosition | 标签位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| centered | 是否居中 | `boolean` | `false` |
| onChange | 切换回调 | `(activeKey: string) => void` | - |
| onEdit | 新增/关闭回调 | `(targetKey, action) => void` | - |
| tabBarExtraContent | 额外内容 | `ReactNode \| { left?: ReactNode; right?: ReactNode }` | - |
| destroyInactiveTabPane | 销毁隐藏的标签页 | `boolean` | `false` |
| animated | 是否动画 | `boolean \| { inkBar?: boolean; tabPane?: boolean }` | `true` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TabItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| label | 标签页标题 | `ReactNode` | - |
| children | 标签页内容 | `ReactNode` | - |
| icon | 图标 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| closable | 是否可关闭 | `boolean` | `true` |
| forceRender | 强制渲染 | `boolean` | `false` |

