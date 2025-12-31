---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Tag 标签
---

# Tag 标签

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## 代码演示

### 基本使用

基本标签的用法。

```tsx
import { Tag, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tag>标签一</Tag>
    <Tag>标签二</Tag>
    <Tag>标签三</Tag>
    <Tag>链接标签</Tag>
  </Space>
);
```

### 多彩标签

提供多种预设色彩的标签样式。

```tsx
import { Tag, Space, Divider } from 'wssf-kage-ui';

export default () => (
  <>
    <Divider orientation="left">预设颜色</Divider>
    <Space wrap>
      <Tag color="magenta">magenta</Tag>
      <Tag color="red">red</Tag>
      <Tag color="volcano">volcano</Tag>
      <Tag color="orange">orange</Tag>
      <Tag color="gold">gold</Tag>
      <Tag color="lime">lime</Tag>
      <Tag color="green">green</Tag>
      <Tag color="cyan">cyan</Tag>
      <Tag color="blue">blue</Tag>
      <Tag color="geekblue">geekblue</Tag>
      <Tag color="purple">purple</Tag>
      <Tag color="pink">pink</Tag>
    </Space>

    <Divider orientation="left">自定义颜色</Divider>
    <Space wrap>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </Space>
  </>
);
```

### 状态标签

预设五种状态颜色，用于信息状态提示。

```tsx
import { Tag, Space, Divider } from 'wssf-kage-ui';

export default () => (
  <>
    <Divider orientation="left">无图标</Divider>
    <Space>
      <Tag color="success">success</Tag>
      <Tag color="processing">processing</Tag>
      <Tag color="error">error</Tag>
      <Tag color="warning">warning</Tag>
      <Tag color="default">default</Tag>
    </Space>

    <Divider orientation="left">带图标</Divider>
    <Space>
      <Tag color="success" icon="✓">success</Tag>
      <Tag color="processing" icon="⟳">processing</Tag>
      <Tag color="error" icon="✕">error</Tag>
      <Tag color="warning" icon="!">warning</Tag>
    </Space>
  </>
);
```

### 可关闭标签

点击关闭按钮可以关闭标签。

```tsx
import { Tag, Space } from 'wssf-kage-ui';

const handleClose = (e) => {
  console.log('标签关闭', e);
};

const preventDefault = (e) => {
  e.preventDefault();
  console.log('阻止了关闭');
};

export default () => (
  <Space>
    <Tag closable onClose={handleClose}>
      标签一
    </Tag>
    <Tag closable onClose={handleClose}>
      标签二
    </Tag>
    <Tag closable onClose={preventDefault}>
      阻止关闭
    </Tag>
  </Space>
);
```

### 动态添加和删除

动态添加和删除标签。

```tsx
import { Tag, Space, Button } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [tags, setTags] = useState(['标签一', '标签二', '标签三']);

  const handleClose = (removedTag) => {
    setTags(tags.filter((tag) => tag !== removedTag));
  };

  const handleAdd = () => {
    const newTag = `新标签${tags.length + 1}`;
    setTags([...tags, newTag]);
  };

  return (
    <Space direction="vertical">
      <Space wrap>
        {tags.map((tag) => (
          <Tag key={tag} closable onClose={() => handleClose(tag)}>
            {tag}
          </Tag>
        ))}
      </Space>
      <Button size="small" onClick={handleAdd}>
        + 添加标签
      </Button>
    </Space>
  );
};
```

### 可选择标签

可以通过 `CheckableTag` 实现类似 Checkbox 的效果。

```tsx
import { Tag, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const { CheckableTag } = Tag;

const tagsData = ['电影', '书籍', '音乐', '运动'];

export default () => {
  const [selectedTags, setSelectedTags] = useState(['书籍']);

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  return (
    <>
      <span style={{ marginRight: 8 }}>分类:</span>
      <Space>
        {tagsData.map((tag) => (
          <CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </Space>
    </>
  );
};
```

### 带图标的标签

可以在标签中添加图标。

```tsx
import { Tag, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tag icon="📍" color="blue">
      位置
    </Tag>
    <Tag icon="⏰" color="green">
      时间
    </Tag>
    <Tag icon="👤" color="purple">
      用户
    </Tag>
    <Tag icon="🏷️" color="orange">
      分类
    </Tag>
  </Space>
);
```

### 无边框

不包含边框的标签。

```tsx
import { Tag, Space, Divider } from 'wssf-kage-ui';

export default () => (
  <>
    <Divider orientation="left">预设颜色</Divider>
    <Space wrap>
      <Tag bordered={false}>默认</Tag>
      <Tag bordered={false} color="magenta">magenta</Tag>
      <Tag bordered={false} color="red">red</Tag>
      <Tag bordered={false} color="volcano">volcano</Tag>
      <Tag bordered={false} color="orange">orange</Tag>
      <Tag bordered={false} color="gold">gold</Tag>
      <Tag bordered={false} color="lime">lime</Tag>
      <Tag bordered={false} color="green">green</Tag>
      <Tag bordered={false} color="cyan">cyan</Tag>
      <Tag bordered={false} color="blue">blue</Tag>
      <Tag bordered={false} color="geekblue">geekblue</Tag>
      <Tag bordered={false} color="purple">purple</Tag>
    </Space>

    <Divider orientation="left">状态颜色</Divider>
    <Space wrap>
      <Tag bordered={false} color="success">success</Tag>
      <Tag bordered={false} color="processing">processing</Tag>
      <Tag bordered={false} color="error">error</Tag>
      <Tag bordered={false} color="warning">warning</Tag>
      <Tag bordered={false} color="default">default</Tag>
    </Space>
  </>
);
```

### 自定义关闭图标

可以自定义关闭图标。

```tsx
import { Tag, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Tag closable closeIcon="🗑️">
      删除
    </Tag>
    <Tag closable closeIcon="❌">
      清除
    </Tag>
    <Tag closable closeIcon={<span style={{ color: 'red' }}>✖</span>}>
      移除
    </Tag>
  </Space>
);
```

## API

### Tag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 标签内容 | `ReactNode` | - |
| color | 标签色 | `PresetColor \| PresetStatus \| string` | - |
| closable | 是否可关闭 | `boolean` | `false` |
| onClose | 关闭时的回调（可通过 `e.preventDefault()` 阻止关闭） | `(e: MouseEvent) => void` | - |
| bordered | 是否有边框 | `boolean` | `true` |
| icon | 设置图标 | `ReactNode` | - |
| closeIcon | 自定义关闭图标 | `ReactNode` | `×` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |

### Tag.CheckableTag

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 选中状态 | `boolean` | - |
| defaultChecked | 默认选中状态 | `boolean` | `false` |
| onChange | 选中状态变化回调 | `(checked: boolean) => void` | - |
| children | 标签内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onClick | 点击回调 | `(e: MouseEvent) => void` | - |

### 预设颜色

```ts
type PresetColor =
  | 'magenta'
  | 'red'
  | 'volcano'
  | 'orange'
  | 'gold'
  | 'lime'
  | 'green'
  | 'cyan'
  | 'blue'
  | 'geekblue'
  | 'purple'
  | 'pink';

type PresetStatus = 'success' | 'processing' | 'error' | 'warning' | 'default';
```

