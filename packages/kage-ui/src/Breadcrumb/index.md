---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Breadcrumb 面包屑
---

# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时。
- 当需要告知用户"你在哪里"时。
- 当需要向上导航的功能时。

## 代码演示

### 基本使用

最简单的用法，通过 `items` 配置面包屑。

```tsx
import { Breadcrumb } from 'wssf-kage-ui';

export default () => (
  <Breadcrumb
    items={[
      { title: '首页', href: '#' },
      { title: '应用中心', href: '#' },
      { title: '应用列表', href: '#' },
      { title: '详情' },
    ]}
  />
);
```

### 带图标

图标放在文字前面。

```tsx
import { Breadcrumb } from 'wssf-kage-ui';

export default () => (
  <Breadcrumb
    items={[
      { title: '首页', href: '#', icon: '🏠' },
      { title: '用户管理', href: '#', icon: '👥' },
      { title: '用户详情', icon: '👤' },
    ]}
  />
);
```

### 自定义分隔符

使用 `separator` 属性自定义分隔符。

```tsx
import { Breadcrumb } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <Breadcrumb
      separator=">"
      items={[
        { title: '首页', href: '#' },
        { title: '一级菜单', href: '#' },
        { title: '当前页面' },
      ]}
    />
    <Breadcrumb
      separator="→"
      items={[
        { title: '首页', href: '#' },
        { title: '一级菜单', href: '#' },
        { title: '当前页面' },
      ]}
    />
    <Breadcrumb
      separator="|"
      items={[
        { title: '首页', href: '#' },
        { title: '一级菜单', href: '#' },
        { title: '当前页面' },
      ]}
    />
  </div>
);
```

### JSX 子元素用法

也可以通过 JSX 子元素的方式使用。

```tsx
import { Breadcrumb } from 'wssf-kage-ui';

export default () => (
  <Breadcrumb>
    <Breadcrumb.Item href="#">首页</Breadcrumb.Item>
    <Breadcrumb.Item href="#">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item>当前页面</Breadcrumb.Item>
  </Breadcrumb>
);
```

### 点击事件

通过 `onClick` 处理点击事件。

```tsx
import { Breadcrumb, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [clicked, setClicked] = useState('');

  return (
    <div>
      <Breadcrumb
        items={[
          { title: '首页', onClick: () => setClicked('首页') },
          { title: '应用中心', onClick: () => setClicked('应用中心') },
          { title: '应用列表', onClick: () => setClicked('应用列表') },
          { title: '详情' },
        ]}
      />
      <div style={{ marginTop: 16 }}>
        <Text>点击了: <Text code>{clicked || '无'}</Text></Text>
      </div>
    </div>
  );
};
```

### 导航路径示例

常见的后台管理系统导航示例。

```tsx
import { Breadcrumb, Typography } from 'wssf-kage-ui';

const { Title } = Typography;

export default () => (
  <div>
    <Breadcrumb
      items={[
        { title: '🏠 控制台', href: '#' },
        { title: '📊 数据分析', href: '#' },
        { title: '📈 用户增长' },
      ]}
    />
    <Title level={3} style={{ marginTop: 16, marginBottom: 0 }}>用户增长分析</Title>
  </div>
);
```

### 长路径省略

当路径较长时的展示方式。

```tsx
import { Breadcrumb } from 'wssf-kage-ui';

export default () => (
  <Breadcrumb
    items={[
      { title: '首页', href: '#' },
      { title: '一级分类一级分类', href: '#' },
      { title: '二级分类二级分类', href: '#' },
      { title: '三级分类三级分类', href: '#' },
      { title: '当前页面当前页面' },
    ]}
  />
);
```

## API

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 面包屑配置项 | `BreadcrumbItemType[]` | - |
| separator | 分隔符 | `ReactNode` | `'/'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### BreadcrumbItemType

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| key | 唯一标识 | `string` | - |
| href | 链接地址 | `string` | - |
| title | 显示文字 | `ReactNode` | - |
| icon | 图标 | `ReactNode` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |
| className | 自定义类名 | `string` | - |

### Breadcrumb.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 链接地址 | `string` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |
| className | 自定义类名 | `string` | - |

