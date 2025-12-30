---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Calendar 日历
---

# Calendar 日历

按照日历形式展示数据的容器。

## 何时使用

当数据是日期或按照日期划分时，例如日程、课表、价格日历等，农历等。目前支持年/月切换。

## 代码演示

### 基本使用

一个通用的日历面板，支持年/月切换。

```tsx
import { Calendar } from 'wssf-kage-ui';

export default () => <Calendar />;
```

### 卡片模式

用于嵌套在空间有限的容器中。

```tsx
import { Calendar } from 'wssf-kage-ui';

export default () => <Calendar fullscreen={false} />;
```

### 选择日期

受控模式下，选择日期。

```tsx
import { Calendar, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [value, setValue] = useState(new Date());

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text>选中日期: {value.toLocaleDateString()}</Text>
      </div>
      <Calendar value={value} onSelect={setValue} fullscreen={false} />
    </div>
  );
};
```

### 自定义渲染

使用 `dateCellRender` 自定义渲染日期单元格。

```tsx
import { Calendar, Badge } from 'wssf-kage-ui';

const getListData = (date: Date) => {
  const day = date.getDate();
  
  if (day === 8) {
    return [
      { type: 'warning' as const, content: '重要会议' },
      { type: 'success' as const, content: '项目上线' },
    ];
  }
  if (day === 10) {
    return [
      { type: 'error' as const, content: '紧急' },
    ];
  }
  if (day === 15) {
    return [
      { type: 'success' as const, content: '完成任务' },
      { type: 'processing' as const, content: '进行中' },
      { type: 'default' as const, content: '待处理' },
    ];
  }
  return [];
};

export default () => {
  const dateCellRender = (date: Date) => {
    const listData = getListData(date);
    return (
      <div>
        {listData.map((item, index) => (
          <div key={index} style={{ marginBottom: 4 }}>
            <Badge status={item.type} text={item.content} />
          </div>
        ))}
      </div>
    );
  };

  return <Calendar dateCellRender={dateCellRender} />;
};
```

### 禁用日期

通过 `disabledDate` 禁用某些日期。

```tsx
import { Calendar } from 'wssf-kage-ui';

export default () => {
  const disabledDate = (date: Date) => {
    // 禁用周末
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  return <Calendar disabledDate={disabledDate} fullscreen={false} />;
};
```

### 年视图

通过设置 `mode` 切换到年视图。

```tsx
import { Calendar } from 'wssf-kage-ui';
import { useState } from 'react';

export default () => {
  const [mode, setMode] = useState<'month' | 'year'>('year');

  return (
    <Calendar 
      mode={mode} 
      onPanelChange={(date, newMode) => setMode(newMode)}
      fullscreen={false}
    />
  );
};
```

### 月份自定义渲染

使用 `monthCellRender` 自定义渲染月份单元格。

```tsx
import { Calendar } from 'wssf-kage-ui';

export default () => {
  const monthCellRender = (date: Date) => {
    const month = date.getMonth() + 1;
    const data = Math.floor(Math.random() * 100);
    
    return (
      <div style={{ fontSize: 12, color: '#999' }}>
        {data} 个任务
      </div>
    );
  };

  return (
    <Calendar 
      mode="year"
      monthCellRender={monthCellRender}
      fullscreen={false}
    />
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前选中的日期（受控） | `Date` | - |
| defaultValue | 默认选中的日期 | `Date` | `new Date()` |
| mode | 显示模式 | `'month' \| 'year'` | `'month'` |
| fullscreen | 是否全屏显示 | `boolean` | `true` |
| dateCellRender | 自定义渲染日期单元格 | `(date: Date) => ReactNode` | - |
| dateFullCellRender | 自定义渲染日期单元格（完全自定义） | `(date: Date) => ReactNode` | - |
| monthCellRender | 自定义渲染月单元格 | `(date: Date) => ReactNode` | - |
| monthFullCellRender | 自定义渲染月单元格（完全自定义） | `(date: Date) => ReactNode` | - |
| disabledDate | 不可选择的日期 | `(date: Date) => boolean` | - |
| onSelect | 日期选择回调 | `(date: Date) => void` | - |
| onPanelChange | 面板变化回调 | `(date: Date, mode: 'month' \| 'year') => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

