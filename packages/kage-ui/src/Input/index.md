---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Input 输入框
---

# Input 输入框

通过键盘输入字符的基础表单控件。

## 何时使用

- 需要在表单中录入、编辑文本时。
- 与 Form 组件结合，承载常规的文本输入、搜索、表单校验等场景。

## 代码演示

### 基本使用

最常见的单行输入框。

```tsx
import { Input } from 'wssf-kage-ui';

export default () => <Input placeholder="请输入内容" style={{ width: 320 }} />;
```

### 允许清除

设置 `allowClear` 可以快速清空内容。

```tsx
import { Input, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input allowClear placeholder="可清除的输入框" />
    <Input allowClear status="error" placeholder="错误状态并可清除" />
  </Space>
);
```

### 尺寸

提供大、中、小三种尺寸。

```tsx
import { Input, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input size="large" placeholder="大尺寸" />
    <Input size="middle" placeholder="默认尺寸" />
    <Input size="small" placeholder="小尺寸" />
  </Space>
);
```

### 前后缀

通过 `prefix` 和 `suffix` 添加装饰性元素，例如图标或单位。

```tsx
import { Input, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input prefix="🔍" placeholder="搜索内容" />
    <Input suffix="RMB" placeholder="金额" type="number" />
  </Space>
);
```

### 前后附加元素

`addonBefore` 和 `addonAfter` 适合放置协议、域名等固定内容。

```tsx
import { Input } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: 12, flexDirection: 'column', width: 360 }}>
    <Input addonBefore="https://" addonAfter=".com" placeholder="输入域名" />
    <Input addonBefore="+86" placeholder="手机号" />
  </div>
);
```

### 字数统计

当设置 `showCount` 时会展示当前字符数，结合 `maxLength` 可限制长度。

```tsx
import { Input, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input showCount maxLength={20} placeholder="最多 20 字" />
    <Input showCount placeholder="仅统计，不限制长度" />
  </Space>
);
```

### 状态

输入框支持错误和警告两种状态，与表单校验配合使用。

```tsx
import { Input, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: 320 }}>
    <Input placeholder="正常" />
    <Input status="warning" placeholder="警告状态" />
    <Input status="error" placeholder="错误状态" />
    <Input disabled placeholder="禁用状态" />
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | - |
| defaultValue | 默认值（非受控） | `string` | `''` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| allowClear | 是否显示清除按钮 | `boolean` | `false` |
| prefix | 前缀内容 | `ReactNode` | - |
| suffix | 后缀内容 | `ReactNode` | - |
| addonBefore | 前置标签 | `ReactNode` | - |
| addonAfter | 后置标签 | `ReactNode` | - |
| showCount | 显示字数统计 | `boolean` | `false` |
| onPressEnter | 按下 Enter 回调 | `(e) => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| maxLength | 最大长度 | `number` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| 其他 | 原生 `input` 支持的属性 | `InputHTMLAttributes` | - |

