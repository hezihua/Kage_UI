---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: AutoComplete 自动完成
---

# AutoComplete 自动完成

输入框自动完成功能。

## 何时使用

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。

和 Select 的区别是：

- AutoComplete 是一个带提示的文本输入框，用户可以自由输入，关键词是辅助**输入**。
- Select 是在限定的可选项中进行选择，关键词是**选择**。

## 代码演示

### 基本使用

基本使用，通过 `options` 设置自动完成的数据源。

```tsx
import { AutoComplete } from 'wssf-kage-ui';

const options = [
  { value: 'react' },
  { value: 'vue' },
  { value: 'angular' },
  { value: 'svelte' },
  { value: 'solid' },
];

export default () => (
  <AutoComplete
    options={options}
    placeholder="输入关键词搜索"
    style={{ width: 300 }}
  />
);
```

### 自定义选项

可以自定义选项的显示内容。

```tsx
import { AutoComplete } from 'wssf-kage-ui';

const options = [
  { value: 'react', label: '⚛️ React' },
  { value: 'vue', label: '💚 Vue' },
  { value: 'angular', label: '🅰️ Angular' },
  { value: 'svelte', label: '🔥 Svelte' },
];

export default () => (
  <AutoComplete
    options={options}
    placeholder="选择一个框架"
    style={{ width: 300 }}
  />
);
```

### 搜索建议

根据输入内容动态生成建议。

```tsx
import { AutoComplete, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const mockSearch = (value) => {
  if (!value) return [];
  return [
    { value: `${value}` },
    { value: `${value}${value}` },
    { value: `${value}${value}${value}` },
  ];
};

export default () => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');

  const handleSearch = (searchText) => {
    setOptions(mockSearch(searchText));
  };

  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        placeholder="输入内容获取建议"
        style={{ width: 300 }}
        onSearch={handleSearch}
        onChange={setValue}
      />
      <div style={{ marginTop: 16 }}>
        <Text>当前值: <Text code>{value || '空'}</Text></Text>
      </div>
    </div>
  );
};
```

### 邮箱自动补全

常见的邮箱后缀自动补全示例。

```tsx
import { AutoComplete } from 'wssf-kage-ui';
import { useState } from 'react';

const emailSuffixes = ['@gmail.com', '@163.com', '@qq.com', '@outlook.com', '@icloud.com'];

export default () => {
  const [options, setOptions] = useState([]);

  const handleSearch = (value) => {
    if (!value || value.includes('@')) {
      setOptions([]);
      return;
    }
    setOptions(
      emailSuffixes.map((suffix) => ({
        value: `${value}${suffix}`,
        label: `${value}${suffix}`,
      }))
    );
  };

  return (
    <AutoComplete
      options={options}
      placeholder="请输入邮箱"
      style={{ width: 300 }}
      onSearch={handleSearch}
    />
  );
};
```

### 自定义过滤

使用 `filterOption` 自定义过滤逻辑。

```tsx
import { AutoComplete } from 'wssf-kage-ui';

const options = [
  { value: 'React', label: 'React - Facebook' },
  { value: 'Vue', label: 'Vue - 尤雨溪' },
  { value: 'Angular', label: 'Angular - Google' },
  { value: 'Svelte', label: 'Svelte - Rich Harris' },
];

export default () => (
  <AutoComplete
    options={options}
    placeholder="输入框架名称或作者"
    style={{ width: 300 }}
    filterOption={(inputValue, option) =>
      option.value.toLowerCase().includes(inputValue.toLowerCase()) ||
      (option.label?.toString() || '').toLowerCase().includes(inputValue.toLowerCase())
    }
  />
);
```

### 禁用过滤

设置 `filterOption={false}` 关闭本地过滤，用于远程搜索场景。

```tsx
import { AutoComplete } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (!value) {
      setOptions([]);
      return;
    }
    
    // 模拟远程搜索
    setLoading(true);
    setTimeout(() => {
      setOptions([
        { value: `${value} - 结果 1` },
        { value: `${value} - 结果 2` },
        { value: `${value} - 结果 3` },
      ]);
      setLoading(false);
    }, 500);
  };

  return (
    <AutoComplete
      options={options}
      placeholder="远程搜索"
      style={{ width: 300 }}
      filterOption={false}
      onSearch={handleSearch}
      notFoundContent={loading ? '搜索中...' : '无匹配结果'}
    />
  );
};
```

### 允许清除

设置 `allowClear` 允许清除输入内容。

```tsx
import { AutoComplete } from 'wssf-kage-ui';

const options = [
  { value: 'react' },
  { value: 'vue' },
  { value: 'angular' },
];

export default () => (
  <AutoComplete
    options={options}
    placeholder="可清除的输入框"
    style={{ width: 300 }}
    allowClear
  />
);
```

### 不同尺寸

三种尺寸的输入框。

```tsx
import { AutoComplete, Space } from 'wssf-kage-ui';

const options = [
  { value: 'react' },
  { value: 'vue' },
  { value: 'angular' },
];

export default () => (
  <Space direction="vertical" size="middle" style={{ width: 300 }}>
    <AutoComplete options={options} placeholder="大尺寸" size="large" />
    <AutoComplete options={options} placeholder="默认尺寸" size="middle" />
    <AutoComplete options={options} placeholder="小尺寸" size="small" />
  </Space>
);
```

### 状态

不同的输入框状态。

```tsx
import { AutoComplete, Space } from 'wssf-kage-ui';

const options = [{ value: 'react' }, { value: 'vue' }];

export default () => (
  <Space direction="vertical" size="middle" style={{ width: 300 }}>
    <AutoComplete options={options} placeholder="正常状态" />
    <AutoComplete options={options} placeholder="错误状态" status="error" />
    <AutoComplete options={options} placeholder="警告状态" status="warning" />
    <AutoComplete options={options} placeholder="禁用状态" disabled />
  </Space>
);
```

### 选中事件

监听选中事件获取选中的值和选项。

```tsx
import { AutoComplete, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const options = [
  { value: 'react', label: 'React 框架' },
  { value: 'vue', label: 'Vue 框架' },
  { value: 'angular', label: 'Angular 框架' },
];

export default () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <AutoComplete
        options={options}
        placeholder="选择一个框架"
        style={{ width: 300 }}
        onSelect={(value, option) => setSelected({ value, label: option.label })}
      />
      {selected && (
        <div style={{ marginTop: 16 }}>
          <Text>
            选中了: <Text code>{selected.value}</Text> ({selected.label})
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
| options | 选项数据 | `{ value, label?, disabled? }[] \| string[]` | `[]` |
| value | 当前值 | `string` | - |
| defaultValue | 默认值 | `string` | `''` |
| placeholder | 占位符 | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 允许清除 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| filterOption | 过滤选项 | `boolean \| (inputValue, option) => boolean` | `true` |
| notFoundContent | 无匹配时的内容 | `ReactNode` | `'无匹配结果'` |
| popupMatchSelectWidth | 下拉菜单宽度 | `boolean \| number` | `true` |
| onSelect | 选中回调 | `(value, option) => void` | - |
| onSearch | 搜索回调 | `(value) => void` | - |
| onChange | 值改变回调 | `(value) => void` | - |
| onFocus | 聚焦回调 | `(e) => void` | - |
| onBlur | 失焦回调 | `(e) => void` | - |
| onDropdownVisibleChange | 下拉菜单显示回调 | `(open) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

