---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Menu 导航菜单
---

# Menu 导航菜单

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

## 代码演示

### 基本使用

水平的顶部导航菜单。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'products', label: '产品', icon: '📦' },
  { key: 'about', label: '关于', icon: 'ℹ️' },
  { key: 'contact', label: '联系我们', icon: '📞' },
];

export default () => {
  const [current, setCurrent] = useState('home');

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      onSelect={({ key }) => setCurrent(key)}
      items={items}
    />
  );
};
```

### 垂直菜单

垂直菜单，子菜单内嵌在菜单区域。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'home', label: '首页', icon: '🏠' },
  {
    key: 'products',
    label: '产品中心',
    icon: '📦',
    children: [
      { key: 'product-1', label: '产品一' },
      { key: 'product-2', label: '产品二' },
      { key: 'product-3', label: '产品三' },
    ],
  },
  {
    key: 'services',
    label: '服务',
    icon: '🛠️',
    children: [
      { key: 'service-1', label: '咨询服务' },
      { key: 'service-2', label: '技术支持' },
    ],
  },
  { key: 'about', label: '关于我们', icon: 'ℹ️' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const [openKeys, setOpenKeys] = useState(['products']);

  return (
    <Menu
      mode="vertical"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};
```

### 内嵌菜单

内嵌模式，子菜单内嵌在菜单中展开。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'dashboard', label: '仪表盘', icon: '📊' },
  {
    key: 'user',
    label: '用户管理',
    icon: '👥',
    children: [
      { key: 'user-list', label: '用户列表' },
      { key: 'user-add', label: '添加用户' },
      { key: 'user-role', label: '角色管理' },
    ],
  },
  {
    key: 'system',
    label: '系统设置',
    icon: '⚙️',
    children: [
      { key: 'system-basic', label: '基础设置' },
      { key: 'system-security', label: '安全设置' },
      {
        key: 'system-advanced',
        label: '高级设置',
        children: [
          { key: 'system-advanced-1', label: '缓存配置' },
          { key: 'system-advanced-2', label: '日志配置' },
        ],
      },
    ],
  },
  { key: 'help', label: '帮助中心', icon: '❓' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['dashboard']);
  const [openKeys, setOpenKeys] = useState(['user']);

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};
```

### 收起菜单

内嵌菜单可以收起。

```tsx
import { Menu, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'home', label: '首页', icon: '🏠' },
  { key: 'inbox', label: '收件箱', icon: '📥' },
  { key: 'sent', label: '已发送', icon: '📤' },
  { key: 'trash', label: '回收站', icon: '🗑️' },
  { key: 'settings', label: '设置', icon: '⚙️' },
];

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(['home']);

  return (
    <div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          marginBottom: 16,
          padding: '6px 16px',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          background: '#fff',
          cursor: 'pointer',
        }}
        className="kage-dropdown-button"
      >
        {collapsed ? '展开菜单' : '收起菜单'}
      </button>
      <Menu
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        onSelect={({ key }) => setSelectedKeys([key])}
        items={items}
      />
    </div>
  );
};
```

### 分组菜单

使用 `type: 'group'` 进行菜单分组。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  {
    type: 'group',
    key: 'group-1',
    label: '分组一',
    children: [
      { key: 'option-1', label: '选项一' },
      { key: 'option-2', label: '选项二' },
    ],
  },
  { type: 'divider', key: 'divider-1' },
  {
    type: 'group',
    key: 'group-2',
    label: '分组二',
    children: [
      { key: 'option-3', label: '选项三' },
      { key: 'option-4', label: '选项四' },
    ],
  },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['option-1']);

  return (
    <Menu
      mode="vertical"
      selectedKeys={selectedKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      items={items}
    />
  );
};
```

### 禁用和危险项

菜单项支持禁用和危险样式。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'normal', label: '正常选项', icon: '✅' },
  { key: 'disabled', label: '禁用选项', icon: '🚫', disabled: true },
  { key: 'danger', label: '危险操作', icon: '⚠️', danger: true },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['normal']);

  return (
    <Menu
      mode="vertical"
      selectedKeys={selectedKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      items={items}
    />
  );
};
```

### 暗色主题

内建的暗色主题。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'home', label: '首页', icon: '🏠' },
  {
    key: 'products',
    label: '产品中心',
    icon: '📦',
    children: [
      { key: 'product-1', label: '产品一' },
      { key: 'product-2', label: '产品二' },
    ],
  },
  { key: 'about', label: '关于我们', icon: 'ℹ️' },
  { key: 'contact', label: '联系我们', icon: '📞' },
];

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['home']);
  const [openKeys, setOpenKeys] = useState(['products']);

  return (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onSelect={({ key }) => setSelectedKeys([key])}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};
```

### 水平菜单带子菜单

水平菜单可以包含下拉子菜单。

```tsx
import { Menu } from 'wssf-kage-ui';
import { useState } from 'react';

const items = [
  { key: 'home', label: '首页' },
  {
    key: 'products',
    label: '产品',
    children: [
      { key: 'product-1', label: '企业版' },
      { key: 'product-2', label: '专业版' },
      { key: 'product-3', label: '个人版' },
    ],
  },
  {
    key: 'solutions',
    label: '解决方案',
    children: [
      { key: 'solution-1', label: '电商解决方案' },
      { key: 'solution-2', label: '金融解决方案' },
      { key: 'solution-3', label: '医疗解决方案' },
    ],
  },
  { key: 'pricing', label: '价格' },
  { key: 'docs', label: '文档' },
];

export default () => {
  const [current, setCurrent] = useState('home');
  const [openKeys, setOpenKeys] = useState([]);

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[current]}
      openKeys={openKeys}
      onSelect={({ key }) => setCurrent(key)}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};
```

## API

### Menu

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项配置 | `MenuItemType[]` | - |
| mode | 菜单模式 | `'vertical' \| 'horizontal' \| 'inline'` | `'vertical'` |
| theme | 主题 | `'light' \| 'dark'` | `'light'` |
| selectedKeys | 选中的菜单项 key | `string[]` | - |
| defaultSelectedKeys | 默认选中的菜单项 key | `string[]` | `[]` |
| openKeys | 展开的子菜单 key | `string[]` | - |
| defaultOpenKeys | 默认展开的子菜单 key | `string[]` | `[]` |
| inlineCollapsed | inline 模式下收起菜单 | `boolean` | `false` |
| onSelect | 选中菜单项回调 | `({ key, selectedKeys }) => void` | - |
| onOpenChange | 展开/收起子菜单回调 | `(openKeys: string[]) => void` | - |
| onClick | 点击菜单项回调 | `({ key, domEvent }) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### MenuItemType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| label | 显示内容 | `ReactNode` | - |
| icon | 图标 | `ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| danger | 是否危险操作 | `boolean` | `false` |
| children | 子菜单 | `MenuItemType[]` | - |
| type | 类型 | `'group' \| 'divider'` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |

