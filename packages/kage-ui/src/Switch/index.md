---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Switch 开关
---

# Switch 开关

开关选择器，表示两种相互对立的状态间的切换。

## 何时使用

- 需要表示开关状态/两种状态之间的切换时。
- 和 Checkbox 的区别是，切换 Switch 会直接触发状态改变，而 Checkbox 一般用于状态标记，需要和提交操作配合。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Switch } from 'wssf-kage-ui';

export default () => <Switch defaultChecked />;
```

### 禁用

禁用状态。

```tsx
import { Switch, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Switch defaultChecked disabled />
    <Switch disabled />
  </Space>
);
```

### 文字和图标

带有文字和图标。

```tsx
import { Switch, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
    <Switch checkedChildren="✓" unCheckedChildren="✕" defaultChecked />
    <Switch checkedChildren="ON" unCheckedChildren="OFF" />
  </Space>
);
```

### 两种大小

`size="small"` 表示小号开关。

```tsx
import { Switch, Space } from 'wssf-kage-ui';

export default () => (
  <Space>
    <Switch defaultChecked />
    <Switch size="small" defaultChecked />
  </Space>
);
```

### 加载中

标识开关操作仍在执行中。

```tsx
import { Switch, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Switch loading defaultChecked />
    <Switch loading />
    <Switch loading size="small" />
  </Space>
);
```

### 受控组件

通过 `checked` 和 `onChange` 实现受控组件。

```tsx
import { Switch, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [checked, setChecked] = useState(false);

  return (
    <Space>
      <Switch checked={checked} onChange={setChecked} />
      <Button onClick={() => setChecked(!checked)}>
        {checked ? '关闭' : '开启'}
      </Button>
    </Space>
  );
};
```

### 异步控制

需要异步控制开关时。

```tsx
import { Switch, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (newChecked) => {
    setLoading(true);
    
    // 模拟异步操作
    setTimeout(() => {
      setChecked(newChecked);
      setLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Switch
        checked={checked}
        loading={loading}
        onChange={handleChange}
        checkedChildren="开"
        unCheckedChildren="关"
      />
      <div style={{ marginTop: 16 }}>
        <Text>
          状态: <Text code>{checked ? '开启' : '关闭'}</Text>
        </Text>
      </div>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| loading | 是否加载中 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| checkedChildren | 选中时的内容 | `ReactNode` | - |
| unCheckedChildren | 非选中时的内容 | `ReactNode` | - |
| onChange | 变化时的回调 | `(checked: boolean, event) => void` | - |
| onClick | 点击回调 | `(checked: boolean, event) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

