---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: DatePicker 日期选择器
---

# DatePicker 日期选择器

输入或选择日期的控件。

## 何时使用

当用户需要输入一个日期时使用。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { DatePicker } from 'wssf-kage-ui';

export default () => <DatePicker style={{ width: 240 }} />;
```

### 受控模式

通过 `value` 和 `onChange` 进行受控。

```tsx
import { DatePicker, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [date, setDate] = useState(null);

  return (
    <div>
      <DatePicker
        value={date}
        onChange={(d, dateStr) => setDate(d)}
        style={{ width: 240 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text>选中日期: <Text code>{date ? date.toLocaleDateString() : '未选择'}</Text></Text>
      </div>
    </div>
  );
};
```

### 默认值

设置默认日期。

```tsx
import { DatePicker } from 'wssf-kage-ui';

export default () => (
  <DatePicker
    defaultValue={new Date()}
    style={{ width: 240 }}
  />
);
```

### 日期格式

使用 `format` 自定义日期格式。

```tsx
import { DatePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="middle">
    <DatePicker
      defaultValue={new Date()}
      format="YYYY-MM-DD"
      style={{ width: 240 }}
    />
    <DatePicker
      defaultValue={new Date()}
      format="YYYY/MM/DD"
      style={{ width: 240 }}
    />
    <DatePicker
      defaultValue={new Date()}
      format="MM-DD-YYYY"
      style={{ width: 240 }}
    />
  </Space>
);
```

### 禁用日期

通过 `disabledDate` 禁用特定日期。

```tsx
import { DatePicker, Space } from 'wssf-kage-ui';

// 禁用今天之前的日期
const disablePastDates = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

// 禁用周末
const disableWeekends = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

export default () => (
  <Space direction="vertical" size="middle">
    <div>
      <div style={{ marginBottom: 8 }}>禁用过去的日期：</div>
      <DatePicker disabledDate={disablePastDates} style={{ width: 240 }} />
    </div>
    <div>
      <div style={{ marginBottom: 8 }}>禁用周末：</div>
      <DatePicker disabledDate={disableWeekends} style={{ width: 240 }} />
    </div>
  </Space>
);
```

### 不同尺寸

三种尺寸的日期选择器。

```tsx
import { DatePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="middle">
    <DatePicker size="large" placeholder="大尺寸" style={{ width: 240 }} />
    <DatePicker size="middle" placeholder="默认尺寸" style={{ width: 240 }} />
    <DatePicker size="small" placeholder="小尺寸" style={{ width: 240 }} />
  </Space>
);
```

### 状态

不同的状态。

```tsx
import { DatePicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="middle">
    <DatePicker placeholder="正常状态" style={{ width: 240 }} />
    <DatePicker placeholder="错误状态" status="error" style={{ width: 240 }} />
    <DatePicker placeholder="警告状态" status="warning" style={{ width: 240 }} />
    <DatePicker placeholder="禁用状态" disabled style={{ width: 240 }} />
  </Space>
);
```

### 禁用清除

设置 `allowClear={false}` 禁用清除按钮。

```tsx
import { DatePicker } from 'wssf-kage-ui';

export default () => (
  <DatePicker
    defaultValue={new Date()}
    allowClear={false}
    style={{ width: 240 }}
  />
);
```

### 监听事件

监听日期选择和面板打开事件。

```tsx
import { DatePicker, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [log, setLog] = useState([]);

  const addLog = (msg) => {
    setLog((prev) => [...prev.slice(-4), msg]);
  };

  return (
    <div>
      <DatePicker
        onChange={(date, dateStr) => addLog(`选择日期: ${dateStr || '清空'}`)}
        onOpenChange={(open) => addLog(`面板${open ? '打开' : '关闭'}`)}
        style={{ width: 240 }}
      />
      <div style={{ marginTop: 16 }}>
        <Text strong>操作日志：</Text>
        {log.map((msg, i) => (
          <div key={i} style={{ color: 'rgba(0,0,0,0.65)', fontSize: 12 }}>
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 选择生日

一个简单的生日选择示例。

```tsx
import { DatePicker, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text, Title } = Typography;

export default () => {
  const [birthday, setBirthday] = useState(null);

  // 禁用未来的日期
  const disableFuture = (date) => date > new Date();

  // 计算年龄
  const calculateAge = (birth) => {
    if (!birth) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge(birthday);

  return (
    <div>
      <Title level={5}>请选择您的生日</Title>
      <DatePicker
        value={birthday}
        onChange={(date) => setBirthday(date)}
        disabledDate={disableFuture}
        placeholder="选择生日"
        style={{ width: 240 }}
      />
      {age !== null && (
        <div style={{ marginTop: 16 }}>
          <Text>您今年 <Text strong style={{ fontSize: 20, color: '#6366f1' }}>{age}</Text> 岁</Text>
        </div>
      )}
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值 | `Date \| string` | - |
| defaultValue | 默认值 | `Date \| string` | - |
| placeholder | 占位符 | `string` | `'请选择日期'` |
| format | 日期格式 | `string` | `'YYYY-MM-DD'` |
| disabled | 是否禁用 | `boolean` | `false` |
| allowClear | 允许清除 | `boolean` | `true` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| status | 状态 | `'error' \| 'warning'` | - |
| disabledDate | 禁用日期函数 | `(date: Date) => boolean` | - |
| onChange | 值变化回调 | `(date, dateString) => void` | - |
| onOpenChange | 面板打开/关闭回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

