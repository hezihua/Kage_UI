---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Rate 评分
---

# Rate 评分

评分组件，对事物进行快速的评级操作。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Rate } from 'wssf-kage-ui';

export default () => <Rate defaultValue={3} />;
```

### 半星

支持选择半星。

```tsx
import { Rate } from 'wssf-kage-ui';

export default () => <Rate allowHalf defaultValue={2.5} />;
```

### 只读

只读模式，无法进行鼠标交互。

```tsx
import { Rate } from 'wssf-kage-ui';

export default () => <Rate disabled defaultValue={3} />;
```

### 清除

支持允许或者禁用清除。

```tsx
import { Rate, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Rate defaultValue={3} />
    <Rate allowClear={false} defaultValue={3} />
  </Space>
);
```

### 其他字符

可以将星星替换为其他字符，比如字母，数字，字体图标甚至中文。

```tsx
import { Rate, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Rate character="A" allowHalf defaultValue={2.5} />
    <Rate character="好" allowHalf defaultValue={3} />
    <Rate character="❤" allowHalf defaultValue={2.5} />
    <Rate character="😊" defaultValue={3} />
  </Space>
);
```

### 自定义字符

可以使用 `characterRender` 自定义每个字符的渲染。

```tsx
import { Rate } from 'wssf-kage-ui';

const characterRender = (node, { index, value }) => {
  const emojis = ['😭', '😞', '😐', '😊', '😍'];
  const currentValue = Math.ceil(value);
  
  return (
    <span style={{ fontSize: index < currentValue ? 24 : 20 }}>
      {emojis[index]}
    </span>
  );
};

export default () => (
  <Rate characterRender={characterRender} defaultValue={3} />
);
```

### 辅助文字

给评分增加辅助文字提示。

```tsx
import { Rate } from 'wssf-kage-ui';

const tooltips = ['极差', '失望', '一般', '满意', '惊喜'];

export default () => <Rate tooltips={tooltips} defaultValue={3} />;
```

### 自定义星星数量

通过 `count` 自定义星星总数。

```tsx
import { Rate, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Rate count={3} defaultValue={2} />
    <Rate count={6} defaultValue={3} />
    <Rate count={10} allowHalf defaultValue={5.5} />
  </Space>
);
```

### 受控组件

通过 `value` 和 `onChange` 实现受控组件。

```tsx
import { Rate, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const tooltips = ['极差', '失望', '一般', '满意', '惊喜'];

export default () => {
  const [value, setValue] = useState(3);

  return (
    <div>
      <Rate tooltips={tooltips} value={value} onChange={setValue} />
      <div style={{ marginTop: 16 }}>
        <Text>
          当前评分: <Text code>{value}</Text> {tooltips[value - 1] && `(${tooltips[value - 1]})`}
        </Text>
      </div>
    </div>
  );
};
```

### Hover 事件

监听 hover 变化。

```tsx
import { Rate, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

const tooltips = ['极差', '失望', '一般', '满意', '惊喜'];

export default () => {
  const [hoverValue, setHoverValue] = useState(null);

  return (
    <div>
      <Rate
        tooltips={tooltips}
        defaultValue={3}
        onHoverChange={setHoverValue}
      />
      {hoverValue !== null && (
        <div style={{ marginTop: 16 }}>
          <Text type="secondary">
            Hover 在: <Text code>{hoverValue}</Text> 星
          </Text>
        </div>
      )}
    </div>
  );
};
```

### 半星展示

使用 `allowHalf` 展示精确的评分。

```tsx
import { Rate, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical">
    <Rate allowHalf defaultValue={2.5} readOnly />
    <Rate allowHalf defaultValue={3.5} readOnly />
    <Rate allowHalf defaultValue={4.5} readOnly />
  </Space>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前值（受控） | `number` | - |
| defaultValue | 默认值 | `number` | `0` |
| count | star 总数 | `number` | `5` |
| allowHalf | 是否允许半选 | `boolean` | `false` |
| allowClear | 是否允许再次点击后清除 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| readOnly | 只读模式，无法交互 | `boolean` | `false` |
| character | 自定义字符 | `ReactNode` | `'★'` |
| characterRender | 自定义字符渲染 | `(origin, props) => ReactNode` | - |
| tooltips | 自定义辅助文字数组 | `string[]` | - |
| onChange | 值变化回调 | `(value: number) => void` | - |
| onHoverChange | hover 时回调 | `(value: number) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### characterRender

```typescript
(origin: ReactNode, props: { index: number; value: number }) => ReactNode
```

- `origin`: 原始字符（即 `character` 属性）
- `index`: 当前星星的索引（从 0 开始）
- `value`: 当前显示的值（包括 hover 值）

