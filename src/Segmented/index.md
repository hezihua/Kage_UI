---
title: Segmented 分段控制器
group:
  title: 数据展示
  order: 4
order: 19
---

# Segmented 分段控制器

分段控制器，用于在一组相关选项中进行单选。

## 基本使用

最简单的用法。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <Segmented
      options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}
      onChange={(value) => console.log(value)}
    />
  );
};
```

## 块级显示

设置 `block` 可以将分段控制器撑满父容器宽度。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <div>
      <Segmented
        options={['Daily', 'Weekly', 'Monthly']}
        block
        style={{ marginBottom: '16px' }}
      />
      <Segmented
        options={['List', 'Kanban', 'Calendar']}
        block
      />
    </div>
  );
};
```

## 禁用状态

通过 `disabled` 禁用整个组件，或在 `options` 中禁用单个选项。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented
        options={['Map', 'Transit', 'Satellite']}
        disabled
      />
      <Segmented
        options={[
          'Map',
          { label: 'Transit', value: 'Transit', disabled: true },
          'Satellite',
        ]}
      />
    </div>
  );
};
```

## 不同尺寸

提供三种尺寸：`large`、`middle`（默认）、`small`。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented
        options={['Daily', 'Weekly', 'Monthly']}
        size="large"
      />
      <Segmented
        options={['Daily', 'Weekly', 'Monthly']}
        size="middle"
      />
      <Segmented
        options={['Daily', 'Weekly', 'Monthly']}
        size="small"
      />
    </div>
  );
};
```

## 带图标

可以在选项中添加图标。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Segmented
        options={[
          {
            label: '列表',
            value: 'list',
            icon: '☰',
          },
          {
            label: '看板',
            value: 'kanban',
            icon: '▦',
          },
          {
            label: '日历',
            value: 'calendar',
            icon: '📅',
          },
        ]}
      />
      <Segmented
        options={[
          {
            label: '地图',
            value: 'map',
            icon: '🗺️',
          },
          {
            label: '中转',
            value: 'transit',
            icon: '🚇',
          },
          {
            label: '卫星',
            value: 'satellite',
            icon: '🛰️',
          },
        ]}
        size="large"
      />
    </div>
  );
};
```

## 仅图标

可以只显示图标，不显示文字。

```tsx
import React from 'react';
import Segmented from '../Segmented';

export default () => {
  return (
    <Segmented
      options={[
        {
          label: '',
          value: 'list',
          icon: '☰',
        },
        {
          label: '',
          value: 'kanban',
          icon: '▦',
        },
        {
          label: '',
          value: 'calendar',
          icon: '📅',
        },
      ]}
    />
  );
};
```

## 受控模式

通过 `value` 和 `onChange` 实现受控。

```tsx
import React, { useState } from 'react';
import Segmented from '../Segmented';

export default () => {
  const [value, setValue] = useState<string | number>('map');

  return (
    <div>
      <Segmented
        options={['地图', '中转', '卫星']}
        value={value}
        onChange={setValue}
        style={{ marginBottom: '16px' }}
      />
      <div style={{ 
        padding: '16px', 
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        当前选中: {value}
      </div>
    </div>
  );
};
```

## 动态选项

动态改变选项内容。

```tsx
import React, { useState } from 'react';
import Segmented from '../Segmented';
import { Button } from '../Button';

export default () => {
  const [options, setOptions] = useState(['Daily', 'Weekly', 'Monthly']);
  const [moreLoaded, setMoreLoaded] = useState(false);

  const handleLoadMore = () => {
    setOptions(['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']);
    setMoreLoaded(true);
  };

  return (
    <div>
      <Segmented
        options={options}
        style={{ marginBottom: '16px' }}
      />
      <Button 
        onClick={handleLoadMore}
        disabled={moreLoaded}
      >
        {moreLoaded ? '已加载全部' : '加载更多选项'}
      </Button>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 选项数据 | `(string \| number \| SegmentedOption)[]` | `[]` |
| value | 当前选中的值（受控） | `string \| number` | - |
| defaultValue | 默认选中的值 | `string \| number` | - |
| onChange | 选项变化时的回调 | `(value: string \| number) => void` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| block | 是否撑满容器宽度 | `boolean` | `false` |
| size | 尺寸大小 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### SegmentedOption

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 选项显示的文字 | `React.ReactNode` | - |
| value | 选项的值 | `string \| number` | - |
| icon | 选项的图标 | `React.ReactNode` | - |
| disabled | 是否禁用该选项 | `boolean` | `false` |

