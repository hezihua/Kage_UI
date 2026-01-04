---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Upload 上传
---

# Upload 上传

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。

## 代码演示

### 基本使用

最简单的用法。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

export default () => (
  <Upload>
    <Button>点击上传</Button>
  </Upload>
);
```

### 已上传的文件列表

使用 `defaultFileList` 设置已上传的内容。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

const defaultFileList = [
  {
    uid: '1',
    name: '文档.pdf',
    status: 'done' as const,
    size: 1024000,
  },
  {
    uid: '2',
    name: '图片.jpg',
    status: 'done' as const,
    size: 2048000,
  },
];

export default () => (
  <Upload defaultFileList={defaultFileList}>
    <Button>点击上传</Button>
  </Upload>
);
```

### 受控的上传列表

通过 `fileList` 对列表进行完全控制，可以实现各种自定义功能。

```tsx
import { Upload, Button, Typography } from 'wssf-kage-ui';
import { useState } from 'react';

const { Text } = Typography;

export default () => {
  const [fileList, setFileList] = useState([]);

  return (
    <div>
      <Upload
        fileList={fileList}
        onChange={(info) => setFileList(info.fileList)}
      >
        <Button>点击上传</Button>
      </Upload>
      <div style={{ marginTop: 16 }}>
        <Text>已上传: {fileList.length} 个文件</Text>
      </div>
    </div>
  );
};
```

### 图片列表样式

上传文件为图片，可展示本地缩略图。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

const defaultFileList = [
  {
    uid: '1',
    name: 'image1.png',
    status: 'done' as const,
    url: 'https://picsum.photos/200/200?random=1',
  },
  {
    uid: '2',
    name: 'image2.png',
    status: 'done' as const,
    url: 'https://picsum.photos/200/200?random=2',
  },
];

export default () => (
  <Upload listType="picture" defaultFileList={defaultFileList}>
    <Button>上传图片</Button>
  </Upload>
);
```

### 照片墙

用户可以上传图片并在列表中显示缩略图。当上传照片数到达限制后，上传按钮消失。

```tsx
import { Upload } from 'wssf-kage-ui';

const defaultFileList = [
  {
    uid: '1',
    name: 'image1.png',
    status: 'done' as const,
    url: 'https://picsum.photos/100/100?random=1',
  },
  {
    uid: '2',
    name: 'image2.png',
    status: 'done' as const,
    url: 'https://picsum.photos/100/100?random=2',
  },
];

export default () => (
  <Upload listType="picture-card" defaultFileList={defaultFileList} maxCount={4}>
    <div>
      <div style={{ fontSize: 24 }}>+</div>
      <div style={{ marginTop: 8, fontSize: 12 }}>上传</div>
    </div>
  </Upload>
);
```

### 拖拽上传

把文件拖入指定区域，完成上传，同样支持点击上传。

```tsx
import { Upload } from 'wssf-kage-ui';

export default () => (
  <Upload drag>
    <p>点击或拖拽文件到此处上传</p>
    <p style={{ color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
      支持单个或批量上传
    </p>
  </Upload>
);
```

### 多文件上传

设置 `multiple` 属性后，可以一次选择多个文件上传。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

export default () => (
  <Upload multiple>
    <Button>选择多个文件</Button>
  </Upload>
);
```

### 限制上传数量

通过 `maxCount` 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件。

```tsx
import { Upload, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Upload maxCount={1}>
      <Button>最多上传 1 个文件</Button>
    </Upload>
    <Upload maxCount={3}>
      <Button>最多上传 3 个文件</Button>
    </Upload>
  </Space>
);
```

### 文件类型限制

通过 `accept` 限制上传文件的类型。

```tsx
import { Upload, Button, Space } from 'wssf-kage-ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Upload accept="image/*">
      <Button>只能上传图片</Button>
    </Upload>
    <Upload accept=".pdf,.doc,.docx">
      <Button>只能上传文档</Button>
    </Upload>
  </Space>
);
```

### 上传前校验

使用 `beforeUpload` 在上传前对文件进行校验。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

export default () => (
  <Upload
    beforeUpload={(file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert('文件必须小于 2MB!');
      }
      return isLt2M;
    }}
  >
    <Button>上传文件（限制 2MB）</Button>
  </Upload>
);
```

### 禁用状态

禁用状态下无法上传。

```tsx
import { Upload, Button } from 'wssf-kage-ui';

const defaultFileList = [
  {
    uid: '1',
    name: 'document.pdf',
    status: 'done' as const,
    size: 1024000,
  },
];

export default () => (
  <Upload disabled defaultFileList={defaultFileList}>
    <Button disabled>禁用上传</Button>
  </Upload>
);
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型 | `string` | - |
| action | 上传的地址 | `string` | - |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| fileList | 已上传的文件列表（受控） | `UploadFile[]` | - |
| defaultFileList | 默认已上传的文件列表 | `UploadFile[]` | `[]` |
| listType | 上传列表的内建样式 | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| showUploadList | 是否显示上传列表 | `boolean` | `true` |
| beforeUpload | 上传文件之前的钩子 | `(file: File, fileList: File[]) => boolean \| Promise<boolean>` | - |
| customRequest | 自定义上传实现 | `(options) => void` | - |
| onChange | 上传文件改变时的回调 | `(info: { file: UploadFile; fileList: UploadFile[] }) => void` | - |
| onSuccess | 文件上传成功时的回调 | `(response: any, file: UploadFile) => void` | - |
| onError | 文件上传失败时的回调 | `(error: Error, file: UploadFile) => void` | - |
| onRemove | 点击移除文件时的回调 | `(file: UploadFile) => boolean \| Promise<boolean>` | - |
| maxCount | 限制上传数量 | `number` | - |
| drag | 是否支持拖拽上传 | `boolean` | `false` |
| children | 上传按钮/区域的内容 | `ReactNode` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### UploadFile

```typescript
interface UploadFile {
  uid: string;
  name: string;
  size?: number;
  type?: string;
  status?: 'uploading' | 'done' | 'error' | 'removed';
  percent?: number;
  response?: any;
  error?: any;
  url?: string;
  thumbUrl?: string;
}
```

