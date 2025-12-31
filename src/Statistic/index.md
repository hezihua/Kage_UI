---
title: Statistic 统计数值
group:
  title: 数据展示
  order: 4
order: 20
---

# Statistic 统计数值

展示统计数值。

## 基本使用

最简单的用法。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Statistic title="活跃用户" value={112893} />
      <Statistic title="账户余额" value={93274.5} precision={2} prefix="¥" />
    </div>
  );
};
```

## 前缀和后缀

在数值前后添加前缀和后缀。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Statistic title="反馈" value={1128} prefix="👍" />
      <Statistic title="点赞" value={93} suffix="/ 100" />
      <Statistic title="账户余额" value={112893} precision={2} prefix="$" />
      <Statistic title="增长率" value={8.5} precision={1} suffix="%" />
    </div>
  );
};
```

## 数值精度

通过 `precision` 设置数值精度。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Statistic title="无精度" value={112893.12345} />
      <Statistic title="2位精度" value={112893.12345} precision={2} />
      <Statistic title="4位精度" value={112893.12345} precision={4} />
    </div>
  );
};
```

## 自定义样式

通过 `valueStyle` 自定义数值样式。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '32px' }}>
      <Statistic
        title="增长"
        value={11.28}
        precision={2}
        suffix="%"
        valueStyle={{ color: '#52c41a' }}
      />
      <Statistic
        title="下降"
        value={9.3}
        precision={2}
        suffix="%"
        valueStyle={{ color: '#ff4d4f' }}
      />
      <Statistic
        title="收入"
        value={128930}
        prefix="¥"
        valueStyle={{ color: '#1890ff' }}
      />
    </div>
  );
};
```

## 自定义格式化

通过 `formatter` 自定义数值展示。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      <Statistic
        title="用户数"
        value={1234567}
        formatter={(value) => {
          return new Intl.NumberFormat('zh-CN').format(value as number);
        }}
      />
      <Statistic
        title="金额"
        value={123456.789}
        formatter={(value) => {
          return new Intl.NumberFormat('zh-CN', {
            style: 'currency',
            currency: 'CNY',
          }).format(value as number);
        }}
      />
      <Statistic
        title="完成率"
        value={0.857}
        formatter={(value) => {
          return `${((value as number) * 100).toFixed(1)}%`;
        }}
      />
    </div>
  );
};
```

## 加载状态

通过 `loading` 显示加载状态。

```tsx
import React, { useState } from 'react';
import Statistic from '../Statistic';
import { Button } from '../Button';

export default () => {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '32px', marginBottom: '16px' }}>
        <Statistic title="总销售额" value={112893} loading={loading} prefix="¥" />
        <Statistic title="订单数" value={8846} loading={loading} />
        <Statistic title="转化率" value={12.5} loading={loading} precision={1} suffix="%" />
      </div>
      <Button onClick={handleLoad} disabled={loading}>
        {loading ? '加载中...' : '重新加载'}
      </Button>
    </div>
  );
};
```

## 卡片组合

在卡片中展示统计数据。

```tsx
import React from 'react';
import Statistic from '../Statistic';

export default () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <div style={{
        padding: '24px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <Statistic
          title="总销售额"
          value={126560}
          precision={2}
          prefix="¥"
          valueStyle={{ color: '#1890ff' }}
        />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          周同比 12% ↑
        </div>
      </div>
      
      <div style={{
        padding: '24px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <Statistic
          title="订单量"
          value={8846}
          valueStyle={{ color: '#52c41a' }}
        />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          日同比 8% ↑
        </div>
      </div>
      
      <div style={{
        padding: '24px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}>
        <Statistic
          title="转化率"
          value={12.85}
          precision={2}
          suffix="%"
          valueStyle={{ color: '#faad14' }}
        />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          周同比 3% ↓
        </div>
      </div>
    </div>
  );
};
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 数值内容 | `string \| number` | - |
| title | 标题 | `ReactNode` | - |
| prefix | 前缀 | `ReactNode` | - |
| suffix | 后缀 | `ReactNode` | - |
| precision | 数值精度 | `number` | - |
| valueStyle | 数值样式 | `CSSProperties` | - |
| formatter | 自定义数值展示 | `(value) => ReactNode` | - |
| loading | 是否加载中 | `boolean` | `false` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

