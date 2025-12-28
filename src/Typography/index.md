---
nav:
  title: 组件
  order: 2
group:
  title: 通用
  order: 1
title: Typography 排版
---

# Typography 排版

文本的基本格式。

## 何时使用

- 当需要展示标题、段落、列表内容时使用。
- 当需要一列基于文本的基础操作时，如拷贝、省略等。

## 代码演示

### 标题组件

展示不同级别的标题。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Title } = Typography;

export default () => (
  <div>
    <Title level={1}>h1. Kage UI 一级标题</Title>
    <Title level={2}>h2. Kage UI 二级标题</Title>
    <Title level={3}>h3. Kage UI 三级标题</Title>
    <Title level={4}>h4. Kage UI 四级标题</Title>
    <Title level={5}>h5. Kage UI 五级标题</Title>
  </div>
);
```

### 文本与超链接组件

内置不同样式的文本以及超链接组件。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Text, Link } = Typography;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Text>默认文本 (default)</Text>
    <Text type="secondary">次要文本 (secondary)</Text>
    <Text type="success">成功文本 (success)</Text>
    <Text type="warning">警告文本 (warning)</Text>
    <Text type="danger">危险文本 (danger)</Text>
    <Text disabled>禁用文本 (disabled)</Text>
    <Link href="https://github.com" target="_blank">链接 (Link)</Link>
  </div>
);
```

### 文本样式

支持多种文本样式。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Text strong>加粗文本 (strong)</Text>
    <Text italic>斜体文本 (italic)</Text>
    <Text underline>下划线文本 (underline)</Text>
    <Text delete>删除线文本 (delete)</Text>
    <Text mark>标记文本 (mark)</Text>
    <Text code>代码文本 (code)</Text>
    <Text keyboard>键盘文本 (keyboard)</Text>
    <div>
      <Text strong italic underline>组合样式：加粗 + 斜体 + 下划线</Text>
    </div>
  </div>
);
```

### 段落组件

段落组件用于展示长文本。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Title, Paragraph } = Typography;

export default () => (
  <div>
    <Title level={3}>关于 Kage UI</Title>
    <Paragraph>
      Kage UI 是一个现代化的 React 组件库，致力于提供优雅且高效的用户界面组件。
      它采用 TypeScript 编写，提供完整的类型定义，让开发更加顺畅。
    </Paragraph>
    <Paragraph type="secondary">
      组件库支持主题定制和按需加载，适用于各种类型的 Web 应用程序开发。
      无论是企业级应用还是个人项目，Kage UI 都能满足你的需求。
    </Paragraph>
  </div>
);
```

### 标题类型

标题也支持不同的文本类型。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Title } = Typography;

export default () => (
  <div>
    <Title level={4}>默认标题</Title>
    <Title level={4} type="secondary">次要标题</Title>
    <Title level={4} type="success">成功标题</Title>
    <Title level={4} type="warning">警告标题</Title>
    <Title level={4} type="danger">危险标题</Title>
    <Title level={4} disabled>禁用标题</Title>
  </div>
);
```

### 链接样式

链接支持多种状态和样式。

```tsx
import { Typography } from 'wssf-kage-ui';

const { Link } = Typography;

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Link href="#">默认链接</Link>
    <Link href="#" type="success">成功链接</Link>
    <Link href="#" type="warning">警告链接</Link>
    <Link href="#" type="danger">危险链接</Link>
    <Link href="#" underline={false}>无下划线链接</Link>
    <Link href="#" disabled>禁用链接</Link>
  </div>
);
```

## API

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| level | 标题等级 | `1 \| 2 \| 3 \| 4 \| 5` | `1` |
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| delete | 添加删除线 | `boolean` | `false` |
| mark | 添加标记 | `boolean` | `false` |
| underline | 添加下划线 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| code | 代码样式 | `boolean` | `false` |
| keyboard | 键盘样式 | `boolean` | `false` |
| delete | 添加删除线 | `boolean` | `false` |
| mark | 添加标记 | `boolean` | `false` |
| underline | 添加下划线 | `boolean` | `false` |
| strong | 加粗 | `boolean` | `false` |
| italic | 斜体 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| delete | 添加删除线 | `boolean` | `false` |
| underline | 添加下划线 | `boolean` | `false` |
| strong | 加粗 | `boolean` | `false` |
| italic | 斜体 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Typography.Link

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| href | 链接地址 | `string` | - |
| target | 打开方式 | `'_blank' \| '_self' \| '_parent' \| '_top'` | - |
| type | 文本类型 | `'secondary' \| 'success' \| 'warning' \| 'danger'` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| underline | 是否显示下划线 | `boolean` | `true` |
| onClick | 点击事件 | `(e: MouseEvent) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

