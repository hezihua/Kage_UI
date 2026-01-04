---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Layout 布局
---

# Layout 布局

协助进行页面级整体布局。

## 设计规则

### 尺寸

一级导航项偏左靠近 logo 放置，辅助菜单偏右放置。

- 顶部导航（大部分系统）：一级导航高度 `64px`，二级导航 `48px`。
- 顶部导航（展示类页面）：一级导航高度 `80px`，二级导航 `56px`。
- 顶部导航高度的范围计算公式为：`48+8n`。
- 侧边导航宽度的范围计算公式：`200+8n`。

## 组件概述

- `Layout`：布局容器，其下可嵌套 `Header` `Sider` `Content` `Footer` 或 `Layout` 本身，可以放在任何父容器中。
- `Header`：顶部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Sider`：侧边栏，自带默认样式及基本功能，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Content`：内容部分，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。
- `Footer`：底部布局，自带默认样式，其下可嵌套任何元素，只能放在 `Layout` 中。

## 代码演示

### 基本结构

典型的页面布局。

```tsx
import { Layout, Typography } from 'wssf-kage-ui';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#6366f1',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#818cf8',
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#a855f7',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#6366f1',
};

const layoutStyle: React.CSSProperties = {
  borderRadius: 8,
  overflow: 'hidden',
  width: '100%',
};

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>Sider</Sider>
        <Content style={contentStyle}>Content</Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

    <Layout style={layoutStyle}>
      <Header style={headerStyle}>Header</Header>
      <Layout>
        <Content style={contentStyle}>Content</Content>
        <Sider width="25%" style={siderStyle}>Sider</Sider>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </Layout>

    <Layout style={layoutStyle}>
      <Sider width="25%" style={siderStyle}>Sider</Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Layout>
  </div>
);
```

### 侧边布局

侧边两列式布局。页面横向空间有限时，侧边导航可收起。

```tsx
import { Layout, Typography } from 'wssf-kage-ui';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

export default () => (
  <Layout style={{ minHeight: 400, borderRadius: 8, overflow: 'hidden' }}>
    <Sider
      collapsible
      theme="dark"
      width={200}
      collapsedWidth={80}
    >
      <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
      <div style={{ padding: '0 16px', color: 'rgba(255,255,255,0.65)' }}>
        <div style={{ padding: '12px 0', cursor: 'pointer' }}>📊 Dashboard</div>
        <div style={{ padding: '12px 0', cursor: 'pointer' }}>👤 Users</div>
        <div style={{ padding: '12px 0', cursor: 'pointer' }}>⚙️ Settings</div>
      </div>
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px' }}>
        <Title level={4} style={{ margin: 0, lineHeight: '64px' }}>页面标题</Title>
      </Header>
      <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
        <Text>这里是内容区域</Text>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Kage UI ©2024 Created by You
      </Footer>
    </Layout>
  </Layout>
);
```

### 顶部-侧边布局

拥有顶部导航及侧边栏的页面，多用于展示类网站。

```tsx
import { Layout, Typography } from 'wssf-kage-ui';

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text, Link } = Typography;

export default () => (
  <Layout style={{ minHeight: 400, borderRadius: 8, overflow: 'hidden' }}>
    <Header style={{ display: 'flex', alignItems: 'center', padding: '0 24px' }}>
      <div style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginRight: 40 }}>
        Kage UI
      </div>
      <div style={{ display: 'flex', gap: 24, color: 'rgba(255,255,255,0.65)' }}>
        <span style={{ cursor: 'pointer' }}>首页</span>
        <span style={{ cursor: 'pointer' }}>产品</span>
        <span style={{ cursor: 'pointer' }}>关于</span>
      </div>
    </Header>
    <Layout>
      <Sider theme="light" width={200}>
        <div style={{ padding: 16 }}>
          <div style={{ padding: '8px 0', cursor: 'pointer' }}>选项 1</div>
          <div style={{ padding: '8px 0', cursor: 'pointer' }}>选项 2</div>
          <div style={{ padding: '8px 0', cursor: 'pointer' }}>选项 3</div>
          <div style={{ padding: '8px 0', cursor: 'pointer' }}>选项 4</div>
        </div>
      </Sider>
      <Layout style={{ padding: 24 }}>
        <Content style={{ padding: 24, background: '#fff', borderRadius: 8, minHeight: 200 }}>
          <Title level={4}>内容标题</Title>
          <Text>这里是主要内容区域，可以放置各种组件和内容。</Text>
        </Content>
      </Layout>
    </Layout>
  </Layout>
);
```

### 响应式布局

Sider 支持响应式布局。

```tsx
import { Layout, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Header, Footer, Sider, Content } = Layout;
const { Text } = Typography;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: 360, borderRadius: 8, overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="dark"
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
        <div style={{ padding: '0 16px', color: 'rgba(255,255,255,0.65)' }}>
          {!collapsed ? (
            <>
              <div style={{ padding: '12px 0' }}>导航菜单 1</div>
              <div style={{ padding: '12px 0' }}>导航菜单 2</div>
              <div style={{ padding: '12px 0' }}>导航菜单 3</div>
            </>
          ) : (
            <>
              <div style={{ padding: '12px 0', textAlign: 'center' }}>📊</div>
              <div style={{ padding: '12px 0', textAlign: 'center' }}>👤</div>
              <div style={{ padding: '12px 0', textAlign: 'center' }}>⚙️</div>
            </>
          )}
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: '#fff' }}>
          <Text strong>当前状态: {collapsed ? '收起' : '展开'}</Text>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: '#fff', borderRadius: 8 }}>
          <Text>点击侧边栏底部的按钮可以收起/展开侧边栏</Text>
        </Content>
      </Layout>
    </Layout>
  );
};
```

## API

### Layout

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| hasSider | 是否包含侧边栏 | `boolean` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Layout.Header / Layout.Footer / Layout.Content

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Layout.Sider

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 宽度 | `number \| string` | `200` |
| collapsedWidth | 收缩宽度 | `number \| string` | `80` |
| collapsible | 是否可收起 | `boolean` | `false` |
| collapsed | 是否收起 | `boolean` | - |
| defaultCollapsed | 默认收起状态 | `boolean` | `false` |
| onCollapse | 收起时回调 | `(collapsed: boolean) => void` | - |
| trigger | 自定义 trigger，设置为 null 隐藏 | `ReactNode` | - |
| theme | 主题颜色 | `'light' \| 'dark'` | `'dark'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

