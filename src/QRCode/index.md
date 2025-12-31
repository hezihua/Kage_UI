---
title: QRCode 二维码
group:
  title: 数据展示
  order: 4
order: 18
---

# QRCode 二维码

用于将链接或文本转换为二维码。

## 基本使用

最简单的用法。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div>
      <QRCode value="https://github.com/yourusername/kage_ui" />
    </div>
  );
};
```

## 自定义链接

通过输入框输入链接，动态生成二维码。

```tsx
import React, { useState } from 'react';
import QRCode from '../QRCode';
import Input from '../Input';

export default () => {
  const [url, setUrl] = useState('https://github.com/yourusername/kage_ui');

  return (
    <div>
      <Input
        placeholder="请输入链接"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '400px', marginBottom: '16px' }}
      />
      <div>
        <QRCode value={url || 'https://github.com'} />
      </div>
    </div>
  );
};
```

## 自定义尺寸

通过 `size` 属性自定义二维码大小。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end' }}>
      <QRCode value="https://github.com" size={100} />
      <QRCode value="https://github.com" size={160} />
      <QRCode value="https://github.com" size={200} />
    </div>
  );
};
```

## 自定义颜色

通过 `color` 和 `bgColor` 自定义颜色。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <QRCode 
        value="https://github.com" 
        color="#1890ff"
      />
      <QRCode 
        value="https://github.com" 
        color="#52c41a"
      />
      <QRCode 
        value="https://github.com" 
        color="#fa8c16"
        bgColor="#fff7e6"
      />
    </div>
  );
};
```

## 带图标

通过 `icon` 属性添加中心图标。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <QRCode 
        value="https://github.com" 
        icon="https://avatars.githubusercontent.com/u/12592949"
        iconSize={40}
      />
      <QRCode 
        value="https://ant.design" 
        icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        iconSize={50}
        size={200}
      />
    </div>
  );
};
```

## 无边框

设置 `bordered={false}` 移除边框。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <QRCode value="https://github.com" bordered={false} />
      <QRCode value="https://github.com" />
    </div>
  );
};
```

## 不同状态

二维码支持三种状态：`active`（默认）、`loading`、`expired`。

```tsx
import React, { useState } from 'react';
import QRCode from '../QRCode';
import { Button } from '../Button';

export default () => {
  const [status, setStatus] = useState<'active' | 'loading' | 'expired'>('active');

  const handleRefresh = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('active');
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        <QRCode value="https://github.com" />
        <QRCode 
          value="https://github.com" 
          status="loading"
        />
        <QRCode 
          value="https://github.com" 
          status="expired"
          onRefresh={handleRefresh}
        />
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button onClick={() => setStatus('active')}>激活</Button>
        <Button onClick={() => setStatus('loading')}>加载中</Button>
        <Button onClick={() => setStatus('expired')}>过期</Button>
      </div>
    </div>
  );
};
```

## 下载二维码

点击下载按钮可以下载二维码图片。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <QRCode 
      value="https://github.com/yourusername/kage_ui"
      size={200}
    />
  );
};
```

## 纠错级别

通过 `errorLevel` 设置不同的纠错等级。

```tsx
import React from 'react';
import QRCode from '../QRCode';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://github.com" errorLevel="L" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>L (7%)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://github.com" errorLevel="M" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>M (15%)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://github.com" errorLevel="Q" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>Q (25%)</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <QRCode value="https://github.com" errorLevel="H" />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>H (30%)</div>
      </div>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 二维码内容 | `string` | - |
| size | 二维码大小 | `number` | `160` |
| color | 二维码颜色 | `string` | `#000` |
| bgColor | 背景颜色 | `string` | `#fff` |
| icon | 二维码中间的图标 | `string` | - |
| iconSize | 图标大小 | `number` | `40` |
| errorLevel | 纠错级别 | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` |
| bordered | 是否有边框 | `boolean` | `true` |
| status | 二维码状态 | `'active' \| 'expired' \| 'loading'` | `'active'` |
| onRefresh | 点击"刷新"的回调 | `() => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `React.CSSProperties` | - |

