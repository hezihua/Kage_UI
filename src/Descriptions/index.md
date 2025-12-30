---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Descriptions 描述列表
---

# Descriptions 描述列表

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## 代码演示

### 基本使用

简单的展示。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions title="用户信息">
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注">无</Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

### 带边框

带边框和背景颜色的列表。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions title="用户信息" bordered>
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注">无</Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

### 自定义尺寸

自定义尺寸，适应在各种容器中展示。

```tsx
import { Descriptions, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const { Item } = Descriptions;

type SizeType = 'default' | 'middle' | 'small';

export default () => {
  const [size, setSize] = useState<SizeType>('default');

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Space>
        <Button type={size === 'default' ? 'primary' : 'default'} onClick={() => setSize('default')}>
          Default
        </Button>
        <Button type={size === 'middle' ? 'primary' : 'default'} onClick={() => setSize('middle')}>
          Middle
        </Button>
        <Button type={size === 'small' ? 'primary' : 'default'} onClick={() => setSize('small')}>
          Small
        </Button>
      </Space>
      <Descriptions title="用户信息" bordered size={size}>
        <Item label="姓名">张三</Item>
        <Item label="手机号">1810000000</Item>
        <Item label="居住地">浙江省杭州市西湖区</Item>
        <Item label="备注">无</Item>
        <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
      </Descriptions>
    </Space>
  );
};
```

### 自定义标签样式

自定义标签样式，适应在各种背景下展示。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions
    title="自定义样式"
    bordered
    labelStyle={{ background: '#e6f7ff', fontWeight: 'bold' }}
    contentStyle={{ background: '#fff' }}
  >
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注" contentStyle={{ color: '#1890ff' }}>
      这是一条重要备注
    </Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

### 响应式

响应式配置列数。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions
    title="响应式"
    bordered
    column={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
  >
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注">无</Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

### 设置列数

通过 `column` 属性设置一行展示的列数。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions title="用户信息" bordered column={2}>
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注">无</Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

### 自定义 span

通过 `span` 属性设置列的占位数量。

```tsx
import { Descriptions } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions title="用户信息" bordered column={3}>
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地" span={2}>
      浙江省杭州市西湖区
    </Item>
    <Item label="备注">无</Item>
    <Item label="地址" span={3}>
      浙江省杭州市西湖区古翠路 1 号
    </Item>
  </Descriptions>
);
```

### 额外操作

可以在右上角添加额外的操作按钮。

```tsx
import { Descriptions, Button } from 'wssf-kage-ui';

const { Item } = Descriptions;

export default () => (
  <Descriptions
    title="用户信息"
    bordered
    extra={<Button type="primary">编辑</Button>}
  >
    <Item label="姓名">张三</Item>
    <Item label="手机号">1810000000</Item>
    <Item label="居住地">浙江省杭州市西湖区</Item>
    <Item label="备注">无</Item>
    <Item label="地址">浙江省杭州市西湖区古翠路 1 号</Item>
  </Descriptions>
);
```

## API

### Descriptions

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `ReactNode` | - |
| extra | 额外的操作区域 | `ReactNode` | - |
| bordered | 是否显示边框 | `boolean` | `false` |
| column | 一行显示几列 | `number \| object` | `3` |
| size | 描述列表的大小 | `'default' \| 'middle' \| 'small'` | `'default'` |
| colon | 是否显示冒号 | `boolean` | `true` |
| labelStyle | 标签样式 | `CSSProperties` | - |
| contentStyle | 内容样式 | `CSSProperties` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Descriptions.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标签内容 | `ReactNode` | - |
| span | 包含列的数量 | `number` | `1` |
| labelStyle | 自定义标签样式 | `CSSProperties` | - |
| contentStyle | 自定义内容样式 | `CSSProperties` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

