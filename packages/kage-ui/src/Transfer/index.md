---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Transfer 穿梭框
---

# Transfer 穿梭框

双栏穿梭选择框，用于在多个可选项中进行选择。

## 何时使用

- 需要在多个可选项中进行多选时。
- 比起 Select 和 Checkbox，穿梭框占据更多的空间，可以更直观地展示可选项的状态。

## 代码演示

### 基本使用

最基本的用法，展示了 `dataSource`、`targetKeys`、`onChange` 的使用。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `选项 ${i + 1} 的描述信息`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['item-2', 'item-4']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
    />
  );
};
```

### 带搜索框

带搜索框的穿梭框，可以自定义搜索函数。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 20 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `这是选项 ${i + 1} 的详细描述`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['item-1', 'item-3', 'item-5']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      showSearch
      searchPlaceholder="搜索选项"
    />
  );
};
```

### 自定义渲染

可以通过 `render` 属性自定义每个选项的展示内容。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: `user-${i}`,
  title: `用户 ${i + 1}`,
  description: `user${i + 1}@example.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['user-0', 'user-2']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      render={(item) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img 
            src={item.avatar} 
            alt={item.title}
            style={{ width: 24, height: 24, borderRadius: '50%' }}
          />
          <div>
            <div style={{ fontWeight: 500 }}>{item.title}</div>
            <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
              {item.description}
            </div>
          </div>
        </div>
      )}
    />
  );
};
```

### 禁用选项

可以通过设置 `disabled` 属性禁用某些选项。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `选项 ${i + 1} 的描述`,
  disabled: i % 4 === 0, // 每4个禁用一个
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['item-1', 'item-5']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      showSearch
    />
  );
};
```

### 全部禁用

设置 `disabled` 属性可以禁用整个穿梭框。

```tsx
import { Transfer } from 'wssf-kage-ui';

const mockData = Array.from({ length: 10 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `选项 ${i + 1} 的描述`,
}));

export default () => (
  <Transfer
    dataSource={mockData}
    targetKeys={['item-1', 'item-3', 'item-5']}
    disabled
  />
);
```

### 自定义标题和按钮

可以自定义标题和操作按钮的文案。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 15 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `选项 ${i + 1} 的描述`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['item-2', 'item-4']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      titles={['可选列表', '已选列表']}
      operations={['添加 ➜', '➜ 移除']}
      showSearch
    />
  );
};
```

### 自定义样式

可以通过 `listStyle` 自定义列表的样式。

```tsx
import { Transfer } from 'wssf-kage-ui';
import { useState } from 'react';

const mockData = Array.from({ length: 30 }).map((_, i) => ({
  key: `item-${i}`,
  title: `选项 ${i + 1}`,
  description: `选项描述 ${i + 1}`,
}));

export default () => {
  const [targetKeys, setTargetKeys] = useState(['item-5', 'item-8', 'item-12']);

  return (
    <Transfer
      dataSource={mockData}
      targetKeys={targetKeys}
      onChange={setTargetKeys}
      showSearch
      listStyle={{
        width: 300,
        height: 400,
      }}
    />
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源 | `TransferItem[]` | `[]` |
| targetKeys | 显示在右侧框数据的 key 集合（受控） | `string[]` | - |
| defaultTargetKeys | 默认显示在右侧框数据的 key 集合 | `string[]` | `[]` |
| selectedKeys | 设置哪些项应该被选中（受控） | `string[]` | - |
| defaultSelectedKeys | 默认选中的项 | `string[]` | `[]` |
| render | 自定义渲染每一项 | `(item: TransferItem) => ReactNode` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| showSearch | 是否显示搜索框 | `boolean` | `false` |
| searchPlaceholder | 搜索框占位符 | `string` | `'请输入搜索内容'` |
| filterOption | 自定义搜索函数 | `(inputValue: string, item: TransferItem) => boolean` | - |
| titles | 标题集合 | `[ReactNode, ReactNode]` | `['源列表', '目标列表']` |
| operations | 操作按钮文案集合 | `[ReactNode, ReactNode]` | `['>', '<']` |
| showSelectAll | 是否展示全选勾选框 | `boolean` | `true` |
| listStyle | 两个穿梭框的自定义样式 | `CSSProperties` | - |
| onSelectChange | 选中项发生改变时的回调 | `(sourceSelectedKeys: string[], targetSelectedKeys: string[]) => void` | - |
| onChange | 选项在两栏之间转移时的回调 | `(targetKeys: string[], direction: 'left' \| 'right', moveKeys: string[]) => void` | - |
| onSearch | 搜索框内容时改变时的回调 | `(direction: 'left' \| 'right', value: string) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TransferItem

```typescript
interface TransferItem {
  key: string;
  title: string;
  description?: string;
  disabled?: boolean;
  [key: string]: any;
}
```

