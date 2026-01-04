---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: ColorPicker 颜色选择器
---

# ColorPicker 颜色选择器

提供颜色选取的组件。

## 何时使用

当需要选择自定义颜色时使用。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { ColorPicker } from 'wssf-kage-ui';

export default () => <ColorPicker defaultValue="#6366f1" />;
```

### 受控模式

通过 `value` 和 `onChange` 进行受控。

```tsx
import { ColorPicker, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [color, setColor] = useState('#6366f1');

  return (
    <div>
      <ColorPicker value={color} onChange={setColor} />
      <div style={{ marginTop: 16 }}>
        <Text>当前颜色: <Text code>{color}</Text></Text>
      </div>
      <div
        style={{
          marginTop: 8,
          width: 100,
          height: 40,
          borderRadius: 8,
          backgroundColor: color,
        }}
      />
    </div>
  );
};
```

### 不同尺寸

三种尺寸的颜色选择器。

```tsx
import { ColorPicker, Space } from 'wssf-kage-ui';

export default () => (
  <Space size="middle">
    <ColorPicker size="small" defaultValue="#f5222d" />
    <ColorPicker size="middle" defaultValue="#52c41a" />
    <ColorPicker size="large" defaultValue="#1890ff" />
  </Space>
);
```

### 禁用状态

禁用的颜色选择器。

```tsx
import { ColorPicker } from 'wssf-kage-ui';

export default () => <ColorPicker defaultValue="#6366f1" disabled />;
```

### 自定义预设颜色

通过 `presets` 自定义预设颜色。

```tsx
import { ColorPicker } from 'wssf-kage-ui';

const presets = [
  '#ff4d4f', '#ff7a45', '#ffa940', '#ffc53d', '#ffec3d',
  '#bae637', '#73d13d', '#36cfc9', '#40a9ff', '#597ef7',
  '#9254de', '#f759ab',
];

export default () => <ColorPicker presets={presets} />;
```

### 品牌色预设

常见品牌色预设示例。

```tsx
import { ColorPicker } from 'wssf-kage-ui';

const brandColors = [
  '#1877F2', // Facebook
  '#1DA1F2', // Twitter
  '#0A66C2', // LinkedIn
  '#FF0000', // YouTube
  '#E4405F', // Instagram
  '#25D366', // WhatsApp
  '#7289DA', // Discord
  '#FF4500', // Reddit
  '#00AFF0', // Skype
  '#BD081C', // Pinterest
  '#6441A5', // Twitch
  '#1DB954', // Spotify
];

export default () => (
  <ColorPicker
    presets={brandColors}
    defaultValue="#1877F2"
  />
);
```

### 无预设颜色

设置 `presets={[]}` 隐藏预设颜色。

```tsx
import { ColorPicker } from 'wssf-kage-ui';

export default () => <ColorPicker presets={[]} defaultValue="#6366f1" />;
```

### 监听面板打开/关闭

通过 `onOpenChange` 监听面板的打开和关闭。

```tsx
import { ColorPicker, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <ColorPicker onOpenChange={setOpen} />
      <div style={{ marginTop: 16 }}>
        <Text>面板状态: <Text code>{open ? '打开' : '关闭'}</Text></Text>
      </div>
    </div>
  );
};
```

### 配合表单使用

在表单中使用颜色选择器。

```tsx
import { ColorPicker, Typography, Space } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [theme, setTheme] = useState({
    primary: '#6366f1',
    success: '#52c41a',
    warning: '#faad14',
    error: '#ff4d4f',
  });

  return (
    <div>
      <Space direction="vertical" size="middle">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ width: 80 }}>主色：</Text>
          <ColorPicker
            value={theme.primary}
            onChange={(color) => setTheme({ ...theme, primary: color })}
          />
          <Text code>{theme.primary}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ width: 80 }}>成功色：</Text>
          <ColorPicker
            value={theme.success}
            onChange={(color) => setTheme({ ...theme, success: color })}
          />
          <Text code>{theme.success}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ width: 80 }}>警告色：</Text>
          <ColorPicker
            value={theme.warning}
            onChange={(color) => setTheme({ ...theme, warning: color })}
          />
          <Text code>{theme.warning}</Text>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Text style={{ width: 80 }}>错误色：</Text>
          <ColorPicker
            value={theme.error}
            onChange={(color) => setTheme({ ...theme, error: color })}
          />
          <Text code>{theme.error}</Text>
        </div>
      </Space>
      
      <div style={{ marginTop: 24 }}>
        <Text strong>预览：</Text>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <div style={{ width: 60, height: 32, borderRadius: 6, backgroundColor: theme.primary }} />
          <div style={{ width: 60, height: 32, borderRadius: 6, backgroundColor: theme.success }} />
          <div style={{ width: 60, height: 32, borderRadius: 6, backgroundColor: theme.warning }} />
          <div style={{ width: 60, height: 32, borderRadius: 6, backgroundColor: theme.error }} />
        </div>
      </div>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 当前颜色值 | `string` | - |
| defaultValue | 默认颜色值 | `string` | `'#6366f1'` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` |
| presets | 预设颜色 | `string[]` | 内置预设色 |
| format | 颜色格式 | `'hex' \| 'rgb'` | `'hex'` |
| showAlpha | 是否显示透明度 | `boolean` | `false` |
| onChange | 颜色变化回调 | `(color: string) => void` | - |
| onOpenChange | 面板打开/关闭回调 | `(open: boolean) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

