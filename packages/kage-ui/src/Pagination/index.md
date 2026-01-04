---
nav:
  title: 组件
  order: 2
group:
  title: 导航
  order: 3
title: Pagination 分页
---

# Pagination 分页

采用分页的形式分隔长列表，每次只加载一个页面。

## 何时使用

- 当加载/渲染所有数据将花费很多时间时。
- 可切换页码浏览数据。

## 代码演示

### 基本使用

基础分页。

```tsx
import { Pagination } from 'wssf-kage-ui';

export default () => <Pagination total={50} />;
```

### 更多页码

当数据量较多时会自动显示省略号。

```tsx
import { Pagination } from 'wssf-kage-ui';

export default () => <Pagination total={500} />;
```

### 受控分页

通过 `current` 和 `onChange` 进行受控。

```tsx
import { Pagination, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [current, setCurrent] = useState(1);

  return (
    <div>
      <Pagination
        current={current}
        total={100}
        onChange={(page) => setCurrent(page)}
      />
      <div style={{ marginTop: 16 }}>
        <Text>当前页: <Text code>{current}</Text></Text>
      </div>
    </div>
  );
};
```

### 显示总数

通过 `showTotal` 显示数据总量。

```tsx
import { Pagination, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="large">
    <Pagination
      total={85}
      showTotal={(total) => `共 ${total} 条`}
    />
    <Pagination
      total={85}
      showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
    />
  </Space>
);
```

### 每页条数选择器

通过 `showSizeChanger` 显示每页条数选择器。

```tsx
import { Pagination, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [pageSize, setPageSize] = useState(10);

  return (
    <div>
      <Pagination
        total={200}
        pageSize={pageSize}
        showSizeChanger
        onShowSizeChange={(current, size) => setPageSize(size)}
      />
      <div style={{ marginTop: 16 }}>
        <Text>每页条数: <Text code>{pageSize}</Text></Text>
      </div>
    </div>
  );
};
```

### 快速跳转

通过 `showQuickJumper` 显示快速跳转输入框。

```tsx
import { Pagination } from 'wssf-kage-ui';

export default () => (
  <Pagination
    total={500}
    showQuickJumper
    showSizeChanger
    showTotal={(total) => `共 ${total} 条`}
  />
);
```

### 完整功能

包含所有功能的分页组件。

```tsx
import { Pagination, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const total = 256;

  return (
    <div>
      <Pagination
        current={current}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`}
        onChange={(page, size) => {
          setCurrent(page);
          setPageSize(size);
        }}
        onShowSizeChange={(current, size) => setPageSize(size)}
      />
      <div style={{ marginTop: 16 }}>
        <Text>当前页: <Text code>{current}</Text>，每页: <Text code>{pageSize}</Text> 条</Text>
      </div>
    </div>
  );
};
```

### 简洁模式

简洁版本的分页。

```tsx
import { Pagination } from 'wssf-kage-ui';

export default () => <Pagination simple total={50} />;
```

### 小尺寸

小尺寸分页。

```tsx
import { Pagination, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="large">
    <Pagination total={50} size="small" />
    <Pagination
      total={100}
      size="small"
      showSizeChanger
      showQuickJumper
    />
    <Pagination total={50} size="small" simple />
  </Space>
);
```

### 禁用状态

禁用分页。

```tsx
import { Pagination, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" size="large">
    <Pagination total={50} disabled />
    <Pagination
      total={100}
      disabled
      showSizeChanger
      showQuickJumper
    />
    <Pagination total={50} disabled simple />
  </Space>
);
```

### 自定义每页条数选项

自定义每页条数选项。

```tsx
import { Pagination } from 'wssf-kage-ui';

export default () => (
  <Pagination
    total={500}
    showSizeChanger
    pageSizeOptions={[5, 10, 15, 20, 50]}
    defaultPageSize={5}
  />
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页码 | `number` | - |
| defaultCurrent | 默认当前页码 | `number` | `1` |
| total | 数据总数 | `number` | - |
| pageSize | 每页条数 | `number` | - |
| defaultPageSize | 默认每页条数 | `number` | `10` |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showSizeChanger | 显示每页条数选择器 | `boolean` | `false` |
| showQuickJumper | 显示快速跳转 | `boolean` | `false` |
| showTotal | 显示总数 | `(total, range) => ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| simple | 简洁模式 | `boolean` | `false` |
| size | 尺寸 | `'default' \| 'small'` | `'default'` |
| onChange | 页码改变回调 | `(page, pageSize) => void` | - |
| onShowSizeChange | 每页条数改变回调 | `(current, size) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

