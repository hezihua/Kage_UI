---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Dropdown 下拉菜单
---

# Dropdown 下拉菜单

向下弹出的列表。

## 何时使用

- 当页面上的操作命令过多时，用此组件可以收纳操作元素。
- 点击/鼠标移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

## 代码演示

### 基本使用

最简单的下拉菜单。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

export default () => (
  <Dropdown menu={{ items }}>
    <Link>悬停显示菜单 ▼</Link>
  </Dropdown>
);
```

### 点击触发

通过 `trigger` 设置点击触发。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

export default () => (
  <Dropdown menu={{ items }} trigger={['click']}>
    <Link>点击显示菜单 ▼</Link>
  </Dropdown>
);
```

### 带图标的菜单

菜单项可以带图标。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '个人中心', icon: '👤' },
  { key: '2', label: '账户设置', icon: '⚙️' },
  { key: '3', label: '退出登录', icon: '🚪' },
];

export default () => (
  <Dropdown menu={{ items }}>
    <Link>用户菜单 ▼</Link>
  </Dropdown>
);
```

### 分割线和禁用项

菜单支持分割线和禁用状态。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { type: 'divider', key: 'divider' },
  { key: '3', label: '菜单项三（禁用）', disabled: true },
  { key: '4', label: '危险操作', danger: true },
];

export default () => (
  <Dropdown menu={{ items }}>
    <Link>更多操作 ▼</Link>
  </Dropdown>
);
```

### 弹出位置

支持 6 种弹出位置。

```tsx
import { Dropdown, Space } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center', padding: 40 }}>
    <Space size="large">
      <Dropdown menu={{ items }} placement="topLeft">
        <button className="kage-dropdown-button">topLeft</button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="top">
        <button className="kage-dropdown-button">top</button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="topRight">
        <button className="kage-dropdown-button">topRight</button>
      </Dropdown>
    </Space>
    <Space size="large">
      <Dropdown menu={{ items }} placement="bottomLeft">
        <button className="kage-dropdown-button">bottomLeft</button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottom">
        <button className="kage-dropdown-button">bottom</button>
      </Dropdown>
      <Dropdown menu={{ items }} placement="bottomRight">
        <button className="kage-dropdown-button">bottomRight</button>
      </Dropdown>
    </Space>
  </div>
);
```

### 带箭头

通过 `arrow` 属性显示箭头。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

export default () => (
  <Dropdown menu={{ items }} arrow>
    <Link>带箭头的下拉菜单 ▼</Link>
  </Dropdown>
);
```

### 点击事件

点击菜单项触发事件回调。

```tsx
import { Dropdown, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Link, Text } = Typography;

export default () => {
  const [selected, setSelected] = useState('');

  const items = [
    { key: 'copy', label: '复制', icon: '📋' },
    { key: 'cut', label: '剪切', icon: '✂️' },
    { key: 'paste', label: '粘贴', icon: '📄' },
    { type: 'divider', key: 'divider' },
    { key: 'delete', label: '删除', icon: '🗑️', danger: true },
  ];

  return (
    <div>
      <Dropdown
        menu={{
          items,
          onClick: ({ key }) => setSelected(key),
        }}
      >
        <Link>编辑操作 ▼</Link>
      </Dropdown>
      <div style={{ marginTop: 16 }}>
        <Text>选中: <Text code>{selected || '无'}</Text></Text>
      </div>
    </div>
  );
};
```

### 右键菜单

通过 `contextMenu` 触发方式实现右键菜单。

```tsx
import { Dropdown } from 'wssf-kage-ui';

const items = [
  { key: 'copy', label: '复制' },
  { key: 'paste', label: '粘贴' },
  { key: 'cut', label: '剪切' },
  { type: 'divider', key: 'divider' },
  { key: 'delete', label: '删除', danger: true },
];

export default () => (
  <Dropdown menu={{ items }} trigger={['contextMenu']}>
    <div
      style={{
        padding: 40,
        textAlign: 'center',
        border: '1px dashed currentColor',
        borderRadius: 8,
        opacity: 0.6,
      }}
    >
      右键点击此区域
    </div>
  </Dropdown>
);
```

### 下拉按钮

带下拉菜单的按钮，左侧是主操作按钮，右侧是下拉菜单触发按钮。

```tsx
import { Dropdown, Space } from 'wssf-kage-ui';

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
  { key: '3', label: '菜单项三' },
];

const handleButtonClick = () => {
  alert('点击了主按钮');
};

export default () => (
  <Space>
    <Dropdown.Button
      menu={{ items }}
      onClick={handleButtonClick}
    >
      操作
    </Dropdown.Button>
    <Dropdown.Button
      menu={{ items }}
      type="primary"
      onClick={handleButtonClick}
    >
      主按钮
    </Dropdown.Button>
    <Dropdown.Button
      menu={{ items }}
      danger
      onClick={handleButtonClick}
    >
      危险
    </Dropdown.Button>
  </Space>
);
```

### 禁用状态

下拉菜单可以被禁用。

```tsx
import { Dropdown, Typography, Space } from 'wssf-kage-ui';

const { Link } = Typography;

const items = [
  { key: '1', label: '菜单项一' },
  { key: '2', label: '菜单项二' },
];

export default () => (
  <Space size="large">
    <Dropdown menu={{ items }} disabled>
      <Link>禁用的下拉菜单</Link>
    </Dropdown>
    <Dropdown.Button menu={{ items }} disabled>
      禁用按钮
    </Dropdown.Button>
  </Space>
);
```

## API

### Dropdown

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| menu | 菜单配置 | `{ items, onClick, selectedKeys }` | - |
| trigger | 触发方式 | `('hover' \| 'click' \| 'contextMenu')[]` | `['hover']` |
| placement | 弹出位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight'` | `'bottomLeft'` |
| arrow | 是否显示箭头 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| open | 受控的显示状态 | `boolean` | - |
| onOpenChange | 显示状态变化回调 | `(open: boolean) => void` | - |
| dropdownRender | 自定义下拉内容 | `(menu: ReactNode) => ReactNode` | - |
| destroyPopupOnHide | 关闭后是否销毁 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| overlayClassName | 下拉菜单类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| overlayStyle | 下拉菜单样式 | `CSSProperties` | - |

### Dropdown.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 按钮类型 | `'default' \| 'primary' \| 'dashed' \| 'text' \| 'link'` | `'default'` |
| size | 按钮大小 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| loading | 是否加载中 | `boolean` | `false` |
| danger | 是否危险按钮 | `boolean` | `false` |
| icon | 按钮图标 | `ReactNode` | - |
| onClick | 左侧按钮点击回调 | `(e: MouseEvent) => void` | - |

### MenuItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| label | 显示内容 | `ReactNode` | - |
| icon | 图标 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| danger | 是否危险操作 | `boolean` | `false` |
| type | 类型（分割线） | `'divider'` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |

