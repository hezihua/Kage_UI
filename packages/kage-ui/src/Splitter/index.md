---
nav:
  title: 组件
  order: 2
group:
  title: 布局
  order: 2
title: Splitter 分割面板
---

# Splitter 分割面板

可拖拽调整大小的分割面板。

## 何时使用

- 需要将页面分割成多个可调整大小的区域
- IDE、后台管理系统的布局
- 需要灵活调整各区域比例的场景

## 代码演示

### 基本使用

最基本的水平分割面板。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const panelStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(99, 102, 241, 0.1)',
};

export default () => (
  <Splitter style={{ height: 200, borderRadius: 8, overflow: 'hidden' }}>
    <Splitter.Panel defaultSize={30}>
      <div style={panelStyle}>
        <Text>面板 1</Text>
      </div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={panelStyle}>
        <Text>面板 2</Text>
      </div>
    </Splitter.Panel>
  </Splitter>
);
```

### 垂直分割

设置 `layout="vertical"` 实现垂直分割。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const panelStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(99, 102, 241, 0.1)',
};

export default () => (
  <Splitter layout="vertical" style={{ height: 300, borderRadius: 8, overflow: 'hidden' }}>
    <Splitter.Panel defaultSize={40}>
      <div style={panelStyle}>
        <Text>上方面板</Text>
      </div>
    </Splitter.Panel>
    <Splitter.Panel>
      <div style={panelStyle}>
        <Text>下方面板</Text>
      </div>
    </Splitter.Panel>
  </Splitter>
);
```

### 多面板

支持多个面板分割。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef'];

export default () => (
  <Splitter style={{ height: 200, borderRadius: 8, overflow: 'hidden' }}>
    {colors.map((color, index) => (
      <Splitter.Panel key={index} defaultSize={25}>
        <div
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: color,
            color: '#fff',
            fontWeight: 500,
          }}
        >
          <Text style={{ color: '#fff' }}>面板 {index + 1}</Text>
        </div>
      </Splitter.Panel>
    ))}
  </Splitter>
);
```

### 尺寸限制

使用 `min` 和 `max` 属性限制面板的最小/最大尺寸。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text, Paragraph } = Typography;

const panelStyle: React.CSSProperties = {
  height: '100%',
  padding: 16,
  background: 'rgba(99, 102, 241, 0.1)',
};

export default () => (
  <Splitter style={{ height: 200, borderRadius: 8, overflow: 'hidden' }}>
    <Splitter.Panel defaultSize={30} min={20} max={50}>
      <div style={panelStyle}>
        <Text strong>侧边栏</Text>
        <Paragraph type="secondary" style={{ marginTop: 8, fontSize: 12 }}>
          min: 20%, max: 50%
        </Paragraph>
      </div>
    </Splitter.Panel>
    <Splitter.Panel min={30}>
      <div style={panelStyle}>
        <Text strong>主内容区</Text>
        <Paragraph type="secondary" style={{ marginTop: 8, fontSize: 12 }}>
          min: 30%
        </Paragraph>
      </div>
    </Splitter.Panel>
  </Splitter>
);
```

### 嵌套使用

可以嵌套使用实现复杂布局。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

const panelStyle: React.CSSProperties = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(99, 102, 241, 0.1)',
};

export default () => (
  <Splitter style={{ height: 400, borderRadius: 8, overflow: 'hidden' }}>
    <Splitter.Panel defaultSize={25} min={15} max={40}>
      <div style={{ ...panelStyle, background: '#6366f1', color: '#fff' }}>
        <Text style={{ color: '#fff' }}>侧边栏</Text>
      </div>
    </Splitter.Panel>
    <Splitter.Panel>
      <Splitter layout="vertical" style={{ height: '100%' }}>
        <Splitter.Panel defaultSize={30}>
          <div style={panelStyle}>
            <Text>顶部区域</Text>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={panelStyle}>
            <Text>主内容区</Text>
          </div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize={20} min={10}>
          <div style={panelStyle}>
            <Text>底部区域</Text>
          </div>
        </Splitter.Panel>
      </Splitter>
    </Splitter.Panel>
  </Splitter>
);
```

### 事件回调

监听拖拽事件。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text, Paragraph } = Typography;

const panelStyle: React.CSSProperties = {
  height: '100%',
  padding: 16,
  background: 'rgba(99, 102, 241, 0.1)',
};

export default () => {
  const [sizes, setSizes] = useState<number[]>([50, 50]);
  const [status, setStatus] = useState('idle');

  return (
    <div>
      <Paragraph style={{ marginBottom: 16 }}>
        状态: <Text strong>{status}</Text> | 
        尺寸: <Text code>[{sizes.map(s => s.toFixed(1) + '%').join(', ')}]</Text>
      </Paragraph>
      <Splitter
        style={{ height: 200, borderRadius: 8, overflow: 'hidden' }}
        onResizeStart={() => setStatus('dragging')}
        onResize={(newSizes) => setSizes(newSizes)}
        onResizeEnd={() => setStatus('idle')}
      >
        <Splitter.Panel>
          <div style={panelStyle}>
            <Text>面板 1</Text>
          </div>
        </Splitter.Panel>
        <Splitter.Panel>
          <div style={panelStyle}>
            <Text>面板 2</Text>
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
};
```

### IDE 风格布局

模拟 IDE 的三栏布局。

```tsx
import { Splitter, Typography } from 'wssf-kage-ui';

const { Text } = Typography;

export default () => (
  <div style={{ height: 500, border: '1px solid #e5e5e5', borderRadius: 8, overflow: 'hidden' }}>
    {/* 顶部工具栏 */}
    <div style={{ 
      height: 40, 
      background: '#1e1e1e', 
      display: 'flex', 
      alignItems: 'center', 
      padding: '0 16px',
      color: '#fff',
      fontSize: 14,
    }}>
      <Text style={{ color: '#fff' }}>📁 Kage IDE</Text>
    </div>
    
    <Splitter style={{ height: 'calc(100% - 40px)' }}>
      {/* 文件树 */}
      <Splitter.Panel defaultSize={20} min={15} max={30}>
        <div style={{ height: '100%', background: '#252526', padding: 12 }}>
          <Text style={{ color: '#ccc', fontSize: 12 }}>📂 src</Text>
          <div style={{ paddingLeft: 16, marginTop: 8, color: '#aaa', fontSize: 12 }}>
            <div style={{ padding: '4px 0' }}>📄 index.tsx</div>
            <div style={{ padding: '4px 0' }}>📄 App.tsx</div>
            <div style={{ padding: '4px 0' }}>📄 style.less</div>
          </div>
        </div>
      </Splitter.Panel>

      {/* 编辑器区域 */}
      <Splitter.Panel>
        <Splitter layout="vertical" style={{ height: '100%' }}>
          <Splitter.Panel>
            <div style={{ height: '100%', background: '#1e1e1e', padding: 16 }}>
              <Text style={{ color: '#569cd6' }}>const</Text>
              <Text style={{ color: '#dcdcaa' }}> App</Text>
              <Text style={{ color: '#fff' }}> = () </Text>
              <Text style={{ color: '#569cd6' }}>=&gt;</Text>
              <Text style={{ color: '#fff' }}> {'{'}</Text>
              <br />
              <Text style={{ color: '#fff', paddingLeft: 16 }}>  return </Text>
              <Text style={{ color: '#808080' }}>&lt;</Text>
              <Text style={{ color: '#4ec9b0' }}>div</Text>
              <Text style={{ color: '#808080' }}>&gt;</Text>
              <Text style={{ color: '#ce9178' }}>Hello World</Text>
              <Text style={{ color: '#808080' }}>&lt;/</Text>
              <Text style={{ color: '#4ec9b0' }}>div</Text>
              <Text style={{ color: '#808080' }}>&gt;</Text>
            </div>
          </Splitter.Panel>
          <Splitter.Panel defaultSize={25} min={15}>
            <div style={{ height: '100%', background: '#1e1e1e', borderTop: '1px solid #333', padding: 12 }}>
              <Text style={{ color: '#fff', fontSize: 12 }}>终端</Text>
              <div style={{ marginTop: 8, color: '#0f0', fontSize: 12, fontFamily: 'monospace' }}>
                $ npm run dev<br />
                <span style={{ color: '#888' }}>Ready on http://localhost:3000</span>
              </div>
            </div>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>

      {/* 侧边面板 */}
      <Splitter.Panel defaultSize={20} min={15} max={30}>
        <div style={{ height: '100%', background: '#252526', padding: 12 }}>
          <Text style={{ color: '#fff', fontSize: 12 }}>🔍 搜索</Text>
          <div style={{ marginTop: 12 }}>
            <input 
              placeholder="搜索..."
              style={{ 
                width: '100%', 
                background: '#3c3c3c', 
                border: 'none', 
                padding: 8, 
                borderRadius: 4,
                color: '#fff',
                fontSize: 12,
              }} 
            />
          </div>
        </div>
      </Splitter.Panel>
    </Splitter>
  </div>
);
```

## API

### Splitter

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 布局方向 | `'horizontal' \| 'vertical'` | `'horizontal'` |
| onResize | 尺寸变化时回调 | `(sizes: number[]) => void` | - |
| onResizeStart | 开始拖拽时回调 | `() => void` | - |
| onResizeEnd | 结束拖拽时回调 | `(sizes: number[]) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

### Splitter.Panel

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| defaultSize | 默认大小（百分比） | `number` | - |
| min | 最小大小（百分比） | `number` | `0` |
| max | 最大大小（百分比） | `number` | `100` |
| resizable | 是否可调整大小 | `boolean` | `true` |
| collapsible | 是否可折叠 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

