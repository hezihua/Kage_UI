---
nav:
  title: 组件
  order: 2
group:
  title: 通用
  order: 1
title: Icon 图标
---

# Icon 图标

语义化的矢量图形。

## 使用方法

使用图标组件，你需要安装 `wssf-kage-icon` 图标组件包：

```bash
npm install wssf-kage-icon --save
```

```bash
yarn add wssf-kage-icon
```

```bash
pnpm add wssf-kage-icon
```

```bash
bun add wssf-kage-icon
```

<!-- <code src="./usage-tip.tsx" /> -->

## 何时使用

- 需要使用图标时
- 需要自定义图标时

## 图标列表

```tsx
import React, { useState, useMemo } from 'react';
import {
  StepBackwardOutlined,
  StepForwardOutlined,
  FastBackwardOutlined,
  FastForwardOutlined,
  ShrinkOutlined,
  ArrowsAltOutlined,
  DownOutlined,
  UpOutlined,
  LeftOutlined,
  RightOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from '../../../kage-icon/src/icons';

const iconCategories = [
  {
    title: '方向性图标',
    icons: [
      { name: 'StepBackwardOutlined', component: StepBackwardOutlined },
      { name: 'StepForwardOutlined', component: StepForwardOutlined },
      { name: 'FastBackwardOutlined', component: FastBackwardOutlined },
      { name: 'FastForwardOutlined', component: FastForwardOutlined },
      { name: 'ShrinkOutlined', component: ShrinkOutlined },
      { name: 'ArrowsAltOutlined', component: ArrowsAltOutlined },
      { name: 'DownOutlined', component: DownOutlined },
      { name: 'UpOutlined', component: UpOutlined },
      { name: 'LeftOutlined', component: LeftOutlined },
      { name: 'RightOutlined', component: RightOutlined },
      { name: 'CaretUpOutlined', component: CaretUpOutlined },
      { name: 'CaretDownOutlined', component: CaretDownOutlined },
      { name: 'CaretLeftOutlined', component: CaretLeftOutlined },
      { name: 'CaretRightOutlined', component: CaretRightOutlined },
      { name: 'UpCircleOutlined', component: UpCircleOutlined },
      { name: 'DownCircleOutlined', component: DownCircleOutlined },
      { name: 'LeftCircleOutlined', component: LeftCircleOutlined },
      { name: 'RightCircleOutlined', component: RightCircleOutlined },
    ],
  },
];

export default () => {
  const [searchText, setSearchText] = useState('');
  const [copiedName, setCopiedName] = useState<string | null>(null);
  const [iconStyle, setIconStyle] = useState<'outlined' | 'filled' | 'twoTone'>('filled');
  const totalIcons = iconCategories.reduce((sum, cat) => sum + cat.icons.length, 0);
  const filteredCategories = useMemo(() => {
    if (!searchText) return iconCategories;
    return iconCategories.map((category) => ({
      ...category,
      icons: category.icons.filter((icon) =>
        icon.name.toLowerCase().includes(searchText.toLowerCase())
      ),
    })).filter((category) => category.icons.length > 0);
  }, [searchText]);
  const filteredCount = filteredCategories.reduce((sum, cat) => sum + cat.icons.length, 0);
  const handleCopy = (iconName: string) => {
    const code = `import { Icon } from 'wssf-kage-ui';\n\n<Icon name="${iconName}" />`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedName(iconName);
        setTimeout(() => setCopiedName(null), 2000);
      });
    }
  };
  return (
    <div style={{ padding: '24px 0' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: iconStyle === 'outlined' ? '#1890ff' : '#595959' }}>
            <input type="radio" name="iconStyle" value="outlined" checked={iconStyle === 'outlined'} onChange={(e) => setIconStyle(e.target.value as any)} style={{ marginRight: '4px' }} />
            <span style={{ marginRight: '4px' }}>□</span>线框风格
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: iconStyle === 'filled' ? '#1890ff' : '#595959' }}>
            <input type="radio" name="iconStyle" value="filled" checked={iconStyle === 'filled'} onChange={(e) => setIconStyle(e.target.value as any)} style={{ marginRight: '4px' }} />
            <span style={{ marginRight: '4px' }}>■</span>实底风格
          </label>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '14px', color: iconStyle === 'twoTone' ? '#1890ff' : '#595959' }}>
            <input type="radio" name="iconStyle" value="twoTone" checked={iconStyle === 'twoTone'} onChange={(e) => setIconStyle(e.target.value as any)} style={{ marginRight: '4px' }} />
            <span style={{ marginRight: '4px' }}>●</span>双色风格
          </label>
        </div>
        <div style={{ position: 'relative', flex: 1, minWidth: '300px', maxWidth: '500px' }}>
          <input type="text" placeholder={`在此搜索 ${totalIcons} 个图标，点击图标可复制代码`} value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{ width: '100%', padding: '8px 12px 8px 36px', fontSize: '14px', border: '1px solid #d9d9d9', borderRadius: '4px', outline: 'none', transition: 'border-color 0.2s' }} onFocus={(e) => { e.currentTarget.style.borderColor = '#1890ff'; }} onBlur={(e) => { e.currentTarget.style.borderColor = '#d9d9d9'; }} />
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8c8c8c', fontSize: '14px' }}>🔍</span>
        </div>
      </div>
      {filteredCategories.length > 0 ? (
        filteredCategories.map((category) => (
          <div key={category.title} style={{ marginBottom: '32px' }}>
            <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 500, color: '#262626' }}>{category.title}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}>
              {category.icons.map(({ name, component: IconComponent }) => (
                <div key={name} onClick={() => handleCopy(name)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px', border: '1px solid #f0f0f0', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: copiedName === name ? '#e6f7ff' : '#fff', position: 'relative' }} onMouseEnter={(e) => { if (copiedName !== name) { e.currentTarget.style.borderColor = '#1890ff'; e.currentTarget.style.backgroundColor = '#f0f8ff'; } }} onMouseLeave={(e) => { if (copiedName !== name) { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.backgroundColor = '#fff'; } }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', marginBottom: '8px', fontSize: '24px', color: iconStyle === 'filled' ? '#262626' : iconStyle === 'twoTone' ? '#1890ff' : '#595959' }}>
                    {IconComponent ? <IconComponent size={24} /> : <span>?</span>}
                  </div>
                  <div style={{ fontSize: '12px', color: '#8c8c8c', textAlign: 'center', wordBreak: 'break-word', lineHeight: '1.4' }}>{name}</div>
                  {copiedName === name && <div style={{ position: 'absolute', top: '8px', right: '8px', fontSize: '12px', color: '#52c41a', fontWeight: 500, backgroundColor: '#fff', padding: '2px 6px', borderRadius: '2px' }}>已复制</div>}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#8c8c8c' }}>{searchText ? '未找到匹配的图标' : '暂无图标'}</div>
      )}
    </div>
  );
};
```


## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="UpOutlined" />
    <Icon name="DownOutlined" size={24} />
    <Icon name="LeftOutlined" size={32} />
    <Icon name="RightOutlined" size={32} />
  </div>
);
```

### 自定义颜色

通过 `color` 属性自定义图标颜色。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="UpCircleOutlined" color="#ff4d4f" size={24} />
    <Icon name="DownCircleOutlined" color="#faad14" size={24} />
    <Icon name="LeftCircleOutlined" color="#52c41a" size={24} />
    <Icon name="RightCircleOutlined" color="#1890ff" size={24} />
  </div>
);
```

### 旋转

通过 `rotate` 属性旋转图标。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="ArrowsAltOutlined" rotate={90} size={24} />
    <Icon name="ArrowsAltOutlined" rotate={180} size={24} />
    <Icon name="ArrowsAltOutlined" rotate={270} size={24} />
  </div>
);
```

### 旋转动画

通过 `spin` 属性添加旋转动画。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="ArrowsAltOutlined" spin size={24} />
    <Icon name="ShrinkOutlined" spin size={24} />
  </div>
);
```

### 无限旋转

通过 `rotate="infinite"` 实现无限旋转。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="ArrowsAltOutlined" rotate="infinite" size={24} />
  </div>
);
```

### 点击事件

图标可以绑定点击事件。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon 
      name="UpCircleOutlined" 
      size={24} 
      color="#ff4d4f"
      onClick={() => alert('点击了图标')}
    />
    <Icon 
      name="DownCircleOutlined" 
      size={24} 
      color="#faad14"
      onClick={() => console.log('收藏')}
    />
  </div>
);
```

### 不同尺寸

通过 `size` 属性设置图标大小。

```tsx
import { Icon } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Icon name="UpOutlined" size={12} />
    <Icon name="UpOutlined" size={16} />
    <Icon name="UpOutlined" size={20} />
    <Icon name="UpOutlined" size={24} />
    <Icon name="UpOutlined" size={32} />
    <Icon name="UpOutlined" size={48} />
  </div>
);
```

### 在按钮中使用

图标可以配合按钮使用。

```tsx
import { Icon, Button } from 'wssf-kage-ui';

export default () => (
  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
    <Button>
      <Icon name="DownOutlined" /> 下载
    </Button>
    <Button type="primary">
      <Icon name="UpOutlined" /> 上传
    </Button>
    <Button>
      <Icon name="LeftOutlined" /> 删除
    </Button>
    <Button type="primary">
      <Icon name="RightOutlined" /> 保存
    </Button>
  </div>
);
```


## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 图标名称 | `string` | - |
| size | 图标大小 | `number \| string` | `16` |
| color | 图标颜色 | `string` | `'currentColor'` |
| rotate | 旋转角度（度）或 'infinite' | `number \| 'infinite'` | - |
| spin | 是否旋转动画 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| onClick | 点击事件 | `(e: MouseEvent) => void` | - |

## 注意事项

1. **依赖 wssf-kage-icon**: Icon 组件依赖 `wssf-kage-icon` 包，需要单独安装
2. **图标名称**: 使用 `name` 属性指定图标名称，图标名称需要与 wssf-kage-icon 中定义的名称一致
3. **颜色继承**: 默认使用 `currentColor`，图标颜色会继承父元素的文字颜色

