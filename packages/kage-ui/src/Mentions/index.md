---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Mentions 提及
---

# Mentions 提及

提及组件，用于在输入中提及某人或某事，常见于发送消息、评论等场景。

## 何时使用

- 需要在文本输入中提及用户、话题等。
- 需要快速插入预设内容。

## 代码演示

### 基本使用

基本的提及功能，输入 `@` 触发提及列表。

```tsx
import { Mentions } from 'wssf-kage-ui';

const options = ['Alice', 'Bob', 'Charlie', 'David', 'Eva'];

export default () => (
  <Mentions
    options={options}
    placeholder="输入 @ 提及某人"
    style={{ width: '100%' }}
  />
);
```

### 自定义选项

可以自定义选项的显示内容。

```tsx
import { Mentions } from 'wssf-kage-ui';

const options = [
  { value: 'alice', label: '👩 Alice (产品经理)' },
  { value: 'bob', label: '👨 Bob (开发工程师)' },
  { value: 'charlie', label: '👨 Charlie (设计师)' },
  { value: 'david', label: '👨 David (测试工程师)' },
];

export default () => (
  <Mentions
    options={options}
    placeholder="输入 @ 提及团队成员"
    style={{ width: '100%' }}
  />
);
```

### 自定义触发字符

通过 `prefix` 自定义触发字符，支持多个触发字符。

```tsx
import { Mentions } from 'wssf-kage-ui';

const userOptions = ['Alice', 'Bob', 'Charlie'];
const topicOptions = ['React', 'Vue', 'Angular'];

export default () => {
  const [options, setOptions] = React.useState(userOptions);

  const handleSearch = (text, prefix) => {
    if (prefix === '@') {
      setOptions(userOptions);
    } else if (prefix === '#') {
      setOptions(topicOptions);
    }
  };

  return (
    <Mentions
      options={options}
      prefix={['@', '#']}
      placeholder="输入 @ 提及用户，输入 # 提及话题"
      style={{ width: '100%' }}
      onSearch={handleSearch}
    />
  );
};
```

### 受控模式

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { Mentions, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = ['Alice', 'Bob', 'Charlie', 'David'];

export default () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Mentions
        value={value}
        options={options}
        placeholder="输入 @ 提及某人"
        style={{ width: '100%' }}
        onChange={setValue}
      />
      <div style={{ marginTop: 16 }}>
        <Text type="secondary">当前内容: </Text>
        <Text code>{value || '(空)'}</Text>
      </div>
    </div>
  );
};
```

### 动态搜索

根据输入动态加载选项。

```tsx
import { Mentions } from 'wssf-kage-ui';
import { useState } from 'react';

const allUsers = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eva',
  'Frank',
  'Grace',
  'Henry',
];

export default () => {
  const [options, setOptions] = useState(allUsers);
  const [loading, setLoading] = useState(false);

  const handleSearch = (text) => {
    setLoading(true);
    // 模拟异步搜索
    setTimeout(() => {
      const filtered = allUsers.filter((user) =>
        user.toLowerCase().includes(text.toLowerCase())
      );
      setOptions(filtered);
      setLoading(false);
    }, 300);
  };

  return (
    <Mentions
      options={options}
      loading={loading}
      placeholder="输入 @ 搜索用户"
      style={{ width: '100%' }}
      onSearch={handleSearch}
    />
  );
};
```

### 禁用选项

某些选项可以设置为禁用状态。

```tsx
import { Mentions } from 'wssf-kage-ui';

const options = [
  { value: 'alice', label: 'Alice (在线)' },
  { value: 'bob', label: 'Bob (忙碌)', disabled: true },
  { value: 'charlie', label: 'Charlie (在线)' },
  { value: 'david', label: 'David (离线)', disabled: true },
];

export default () => (
  <Mentions
    options={options}
    placeholder="输入 @ 提及在线用户"
    style={{ width: '100%' }}
  />
);
```

### 自定义分隔符

通过 `split` 自定义插入提及后的分隔符。

```tsx
import { Mentions, Space } from 'wssf-kage-ui';

const options = ['Alice', 'Bob', 'Charlie'];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>
      <div style={{ marginBottom: 8 }}>默认分隔符（空格）：</div>
      <Mentions options={options} placeholder="@Alice " />
    </div>
    <div>
      <div style={{ marginBottom: 8 }}>无分隔符：</div>
      <Mentions options={options} split="" placeholder="@Alice" />
    </div>
    <div>
      <div style={{ marginBottom: 8 }}>逗号分隔：</div>
      <Mentions options={options} split=", " placeholder="@Alice, " />
    </div>
  </Space>
);
```

### 尺寸

三种大小的提及组件。

```tsx
import { Mentions, Space } from 'wssf-kage-ui';

const options = ['Alice', 'Bob', 'Charlie'];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Mentions size="large" options={options} placeholder="大尺寸" />
    <Mentions size="middle" options={options} placeholder="默认尺寸" />
    <Mentions size="small" options={options} placeholder="小尺寸" />
  </Space>
);
```

### 状态

不同的输入框状态。

```tsx
import { Mentions, Space } from 'wssf-kage-ui';

const options = ['Alice', 'Bob', 'Charlie'];

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Mentions options={options} placeholder="正常状态" />
    <Mentions options={options} status="warning" placeholder="警告状态" />
    <Mentions options={options} status="error" placeholder="错误状态" />
    <Mentions options={options} disabled placeholder="禁用状态" />
  </Space>
);
```

### 选中回调

监听选中事件。

```tsx
import { Mentions, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { value: 'alice', label: 'Alice' },
  { value: 'bob', label: 'Bob' },
  { value: 'charlie', label: 'Charlie' },
];

export default () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <Mentions
        options={options}
        placeholder="输入 @ 提及某人"
        style={{ width: '100%' }}
        onSelect={(option, prefix) => {
          setSelected({ value: option.value, prefix });
        }}
      />
      {selected && (
        <div style={{ marginTop: 16 }}>
          <Text>
            选中了: <Text code>{selected.prefix}{selected.value}</Text>
          </Text>
        </div>
      )}
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 受控值 | `string` | - |
| defaultValue | 默认值（非受控） | `string` | `''` |
| options | 提及选项 | `{ value, label?, disabled? }[] \| string[]` | `[]` |
| prefix | 触发字符 | `string \| string[]` | `'@'` |
| split | 分隔符 | `string` | `' '` |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| autoSize | 自动调整高度 | `boolean \| { minRows?, maxRows? }` | `false` |
| filterOption | 过滤选项 | `boolean \| (input, option) => boolean` | `true` |
| notFoundContent | 无匹配时的内容 | `ReactNode` | `'无匹配结果'` |
| loading | 加载状态 | `boolean` | `false` |
| rows | 默认行数 | `number` | `3` |
| onChange | 值变化回调 | `(value: string) => void` | - |
| onSelect | 选中回调 | `(option, prefix) => void` | - |
| onSearch | 搜索回调 | `(text, prefix) => void` | - |
| onFocus | 聚焦回调 | `(e) => void` | - |
| onBlur | 失焦回调 | `(e) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| 其他 | 原生 `textarea` 支持的属性 | `TextareaHTMLAttributes` | - |

