---
nav:
  title: 组件
  order: 2
group:
  title: 数据展示
  order: 6
title: Table 表格
---

# Table 表格

展示行列数据。

## 何时使用

- 当有大量结构化的数据需要展现时；
- 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时。

## 代码演示

### 基本使用

简单的表格，最后一列是各种操作。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <a onClick={() => alert(`查看 ${record.name}`)}>查看</a>
    ),
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

### 带边框

添加表格边框线，页头和页脚。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    bordered
    title={() => '用户列表'}
    footer={() => '共 2 条数据'}
  />
);
```

### 斑马纹

使用 `striped` 属性设置斑马纹表格。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
  { key: '4', name: '赵六', age: 35, address: '浙江省杭州市拱墅区' },
];

export default () => (
  <Table columns={columns} dataSource={dataSource} striped />
);
```

### 不同尺寸

通过 `size` 属性设置表格尺寸。

```tsx
import { Table, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
];

export default () => {
  const [size, setSize] = useState('default');

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
      <Table columns={columns} dataSource={dataSource} size={size} bordered />
    </Space>
  );
};
```

### 可选择

使用 `rowSelection` 属性配置行选择功能。

```tsx
import { Table } from 'wssf-kage-ui';
import { useState } from 'react';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, rows) => {
      setSelectedRowKeys(keys);
      console.log('选中的行:', keys, rows);
    },
  };

  return (
    <div>
      <p>已选择 {selectedRowKeys.length} 项</p>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowSelection={rowSelection}
      />
    </div>
  );
};
```

### 单选

配置 `type: 'radio'` 实现单选。

```tsx
import { Table } from 'wssf-kage-ui';
import { useState } from 'react';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
];

export default () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      rowSelection={{
        type: 'radio',
        selectedRowKeys,
        onChange: (keys) => setSelectedRowKeys(keys),
      }}
    />
  );
};
```

### 排序

对某一列数据进行排序。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: '年龄',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
    defaultSortOrder: 'descend',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
  { key: '4', name: '赵六', age: 35, address: '浙江省杭州市拱墅区' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    onChange={(pagination, filters, sorter) => {
      console.log('排序信息:', sorter);
    }}
  />
);
```

### 筛选

对某一列数据进行筛选。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    filters: [
      { text: '年轻 (< 30)', value: 'young' },
      { text: '中年 (30-40)', value: 'middle' },
      { text: '成熟 (> 40)', value: 'senior' },
    ],
    onFilter: (value, record) => {
      if (value === 'young') return record.age < 30;
      if (value === 'middle') return record.age >= 30 && record.age <= 40;
      if (value === 'senior') return record.age > 40;
      return true;
    },
  },
  {
    title: '地址',
    dataIndex: 'address',
    filters: [
      { text: '西湖区', value: '西湖区' },
      { text: '滨江区', value: '滨江区' },
      { text: '余杭区', value: '余杭区' },
    ],
    onFilter: (value, record) => record.address.includes(value),
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区' },
  { key: '4', name: '赵六', age: 35, address: '浙江省杭州市西湖区' },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

### 分页

表格默认带有分页功能，可以通过 `pagination` 属性进行配置。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 50 }, (_, i) => ({
  key: String(i + 1),
  name: `用户 ${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `浙江省杭州市 ${i + 1} 号`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    pagination={{
      pageSize: 5,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
    }}
  />
);
```

### 可展开

当表格内容较多不能一次性完全展示时，可使用展开行功能。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '浙江省杭州市西湖区',
    description: '张三是一名优秀的工程师，擅长前端开发。',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '浙江省杭州市滨江区',
    description: '李四是一名资深的产品经理，有丰富的项目管理经验。',
  },
  {
    key: '3',
    name: '王五',
    age: 28,
    address: '浙江省杭州市余杭区',
    description: '王五是一名设计师，专注于用户体验设计。',
  },
];

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    expandable={{
      expandedRowRender: (record) => (
        <p style={{ margin: 0 }}>{record.description}</p>
      ),
      rowExpandable: (record) => record.name !== '李四',
    }}
  />
);
```

### 加载中

使用 `loading` 属性显示加载状态。

```tsx
import { Table, Button, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区' },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区' },
];

export default () => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Button onClick={handleLoad}>加载数据</Button>
      <Table columns={columns} dataSource={dataSource} loading={loading} />
    </Space>
  );
};
```

### 固定表头

方便一页内展示大量数据。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name', width: 150 },
  { title: '年龄', dataIndex: 'age', width: 100 },
  { title: '地址', dataIndex: 'address' },
];

const dataSource = Array.from({ length: 100 }, (_, i) => ({
  key: String(i + 1),
  name: `用户 ${i + 1}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `浙江省杭州市 ${i + 1} 号`,
}));

export default () => (
  <Table
    columns={columns}
    dataSource={dataSource}
    scroll={{ y: 300 }}
    pagination={false}
    sticky
  />
);
```

### 自定义渲染

自定义单元格渲染内容。

```tsx
import { Table, Button, Space } from 'wssf-kage-ui';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    render: (age) => (
      <span style={{ color: age > 35 ? '#ff4d4f' : '#52c41a' }}>
        {age} 岁
      </span>
    ),
  },
  {
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    render: (tags) => (
      <Space>
        {tags.map((tag) => (
          <span
            key={tag}
            style={{
              padding: '2px 8px',
              background: tag === 'VIP' ? '#fff7e6' : '#e6f7ff',
              border: `1px solid ${tag === 'VIP' ? '#ffc069' : '#91d5ff'}`,
              borderRadius: 4,
              fontSize: 12,
            }}
          >
            {tag}
          </span>
        ))}
      </Space>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space>
        <Button type="primary" size="small">
          编辑
        </Button>
        <Button size="small">删除</Button>
      </Space>
    ),
  },
];

const dataSource = [
  { key: '1', name: '张三', age: 32, address: '浙江省杭州市西湖区古翠路 1 号创业园区', tags: ['VIP', '开发者'] },
  { key: '2', name: '李四', age: 42, address: '浙江省杭州市滨江区网商路 699 号', tags: ['管理员'] },
  { key: '3', name: '王五', age: 28, address: '浙江省杭州市余杭区文一西路 969 号', tags: ['设计师', 'VIP'] },
];

export default () => <Table columns={columns} dataSource={dataSource} />;
```

### 空状态

当数据为空时显示空状态。

```tsx
import { Table } from 'wssf-kage-ui';

const columns = [
  { title: '姓名', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '地址', dataIndex: 'address' },
];

export default () => (
  <Table
    columns={columns}
    dataSource={[]}
    locale={{ emptyText: '没有找到数据' }}
  />
);
```

## API

### Table

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| columns | 表格列的配置描述 | `ColumnType[]` | - |
| dataSource | 数据数组 | `T[]` | - |
| rowKey | 表格行 key 的取值 | `string \| ((record: T) => React.Key)` | `'key'` |
| showHeader | 是否显示表头 | `boolean` | `true` |
| bordered | 是否展示外边框和列边框 | `boolean` | `false` |
| size | 表格大小 | `'default' \| 'middle' \| 'small'` | `'default'` |
| loading | 页面是否加载中 | `boolean` | `false` |
| loadingText | 加载文案 | `string` | `'加载中...'` |
| locale | 默认文案设置 | `{ emptyText?: ReactNode }` | - |
| pagination | 分页配置，false 禁用分页 | `TablePagination \| false` | `{}` |
| rowSelection | 行选择配置 | `RowSelection` | - |
| rowClassName | 表格行的类名 | `string \| ((record: T, index: number) => string)` | - |
| onRow | 设置行属性 | `(record: T, index: number) => HTMLAttributes` | - |
| title | 表格标题 | `() => ReactNode` | - |
| footer | 表格尾部 | `() => ReactNode` | - |
| scroll | 表格滚动配置 | `{ x?: number \| string \| true; y?: number \| string }` | - |
| onChange | 分页、排序、筛选变化时触发 | `(pagination, filters, sorter) => void` | - |
| expandable | 展开行配置 | `ExpandableConfig` | - |
| striped | 是否显示斑马纹 | `boolean` | `false` |
| hoverable | 悬浮行高亮 | `boolean` | `true` |
| sticky | 粘性头部 | `boolean` | `false` |
| summary | 表格总结栏 | `(data: readonly T[]) => ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Column

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 列头显示文字 | `ReactNode` | - |
| dataIndex | 列数据在数据项中对应的字段名 | `string` | - |
| key | React 需要的 key | `string` | - |
| width | 列宽度 | `number \| string` | - |
| minWidth | 最小列宽度 | `number` | - |
| align | 对齐方式 | `'left' \| 'center' \| 'right'` | `'left'` |
| fixed | 是否固定列 | `'left' \| 'right'` | - |
| sorter | 排序函数 | `boolean \| ((a: T, b: T) => number)` | - |
| defaultSortOrder | 默认排序顺序 | `'ascend' \| 'descend' \| null` | - |
| sortOrder | 排序顺序（受控） | `'ascend' \| 'descend' \| null` | - |
| filters | 筛选菜单项 | `{ text: string; value: any }[]` | - |
| onFilter | 筛选方法 | `(value, record) => boolean` | - |
| defaultFilteredValue | 默认筛选值 | `any[]` | - |
| filteredValue | 筛选值（受控） | `any[]` | - |
| render | 自定义渲染函数 | `(value, record, index) => ReactNode` | - |
| ellipsis | 文字省略 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| onCell | 设置单元格属性 | `(record, index) => CSSProperties` | - |
| onHeaderCell | 设置表头单元格属性 | `() => CSSProperties` | - |

### RowSelection

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 选择类型 | `'checkbox' \| 'radio'` | `'checkbox'` |
| selectedRowKeys | 指定选中项的 key 数组 | `React.Key[]` | - |
| onChange | 选中项发生变化时的回调 | `(selectedRowKeys, selectedRows) => void` | - |
| onSelect | 用户手动选择某行的回调 | `(record, selected, selectedRows, e) => void` | - |
| onSelectAll | 用户手动全选的回调 | `(selected, selectedRows, changeRows) => void` | - |
| getCheckboxProps | 选择框的默认属性配置 | `(record) => { disabled, name }` | - |
| fixed | 固定选择列 | `boolean` | `false` |
| columnWidth | 选择列的宽度 | `number \| string` | `48` |
| columnTitle | 选择列的标题 | `ReactNode` | - |
| renderCell | 自定义渲染勾选框 | `(checked, record, index, originNode) => ReactNode` | - |
| hideSelectAll | 隐藏全选按钮 | `boolean` | `false` |

### Pagination

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 当前页码 | `number` | `1` |
| pageSize | 每页条数 | `number` | `10` |
| total | 数据总数 | `number` | - |
| pageSizeOptions | 每页条数选项 | `number[]` | `[10, 20, 50, 100]` |
| showSizeChanger | 是否显示每页条数选择器 | `boolean` | `false` |
| showQuickJumper | 是否显示快速跳转 | `boolean` | `false` |
| showTotal | 显示总数 | `(total, range) => ReactNode` | - |
| position | 分页位置 | `'topLeft' \| 'topCenter' \| 'topRight' \| 'bottomLeft' \| 'bottomCenter' \| 'bottomRight'` | `'bottomRight'` |
| disabled | 是否禁用 | `boolean` | `false` |
| simple | 简洁模式 | `boolean` | `false` |

### Expandable

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| expandedRowRender | 展开行渲染函数 | `(record, index, indent, expanded) => ReactNode` | - |
| rowExpandable | 行是否可展开 | `(record) => boolean` | - |
| expandedRowKeys | 展开的行（受控） | `React.Key[]` | - |
| defaultExpandedRowKeys | 默认展开的行 | `React.Key[]` | - |
| onExpand | 展开/收起时的回调 | `(expanded, record) => void` | - |
| onExpandedRowsChange | 展开的行变化时的回调 | `(expandedKeys) => void` | - |
| expandIcon | 自定义展开图标 | `(props) => ReactNode` | - |
| expandRowByClick | 点击行展开 | `boolean` | `false` |
| indentSize | 展开的缩进大小 | `number` | `15` |
| showExpandColumn | 是否显示展开列 | `boolean` | `true` |

