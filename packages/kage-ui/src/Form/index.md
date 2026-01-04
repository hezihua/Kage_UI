---
nav:
  title: 组件
  order: 2
group:
  title: 数据录入
  order: 5
title: Form 表单
---

# Form 表单

具有数据收集、校验和提交功能的表单。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## 代码演示

### 基本使用

基本的表单数据域控制展示。

```tsx
import { Form, Space } from 'wssf-kage-ui';

// 简单的输入框组件
const Input = ({ value = '', onChange, placeholder, ...props }) => (
  <input
    className="kage-input"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
    }}
    {...props}
  />
);

const Button = ({ children, type = 'default', htmlType, ...props }) => (
  <button
    type={htmlType}
    className="kage-dropdown-button"
    style={{
      background: type === 'primary' ? '#6366f1' : undefined,
      color: type === 'primary' ? '#fff' : undefined,
      borderColor: type === 'primary' ? '#6366f1' : undefined,
    }}
    {...props}
  >
    {children}
  </button>
);

export default () => {
  const onFinish = (values) => {
    console.log('表单提交:', values);
    alert('提交成功: ' + JSON.stringify(values));
  };

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 16 }} style={{ marginLeft: '16.67%' }}>
        <Space>
          <Button type="primary" htmlType="submit">提交</Button>
          <Button htmlType="reset">重置</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};
```

### 垂直布局

垂直排列的表单。

```tsx
import { Form, Space } from 'wssf-kage-ui';

const Input = ({ value = '', onChange, placeholder, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
    }}
    {...props}
  />
);

const Button = ({ children, type = 'default', htmlType, ...props }) => (
  <button
    type={htmlType}
    className="kage-dropdown-button"
    style={{
      background: type === 'primary' ? '#6366f1' : undefined,
      color: type === 'primary' ? '#fff' : undefined,
      borderColor: type === 'primary' ? '#6366f1' : undefined,
    }}
    {...props}
  >
    {children}
  </button>
);

export default () => {
  const onFinish = (values) => {
    alert('提交成功: ' + JSON.stringify(values));
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ maxWidth: 400 }}>
      <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email', message: '请输入有效的邮箱' }]}>
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item label="电话" name="phone">
        <Input placeholder="请输入电话" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">提交</Button>
      </Form.Item>
    </Form>
  );
};
```

### 内联布局

内联排列的表单。

```tsx
import { Form } from 'wssf-kage-ui';

const Input = ({ value = '', onChange, placeholder, style, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
      width: 150,
      ...style,
    }}
    {...props}
  />
);

const Button = ({ children, type = 'default', htmlType, ...props }) => (
  <button
    type={htmlType}
    className="kage-dropdown-button"
    style={{
      background: type === 'primary' ? '#6366f1' : undefined,
      color: type === 'primary' ? '#fff' : undefined,
      borderColor: type === 'primary' ? '#6366f1' : undefined,
    }}
    {...props}
  >
    {children}
  </button>
);

export default () => {
  const onFinish = (values) => {
    alert('搜索: ' + JSON.stringify(values));
  };

  return (
    <Form layout="inline" onFinish={onFinish}>
      <Form.Item label="关键词" name="keyword">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="分类" name="category">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">搜索</Button>
      </Form.Item>
    </Form>
  );
};
```

### 表单验证

表单验证功能。

```tsx
import { Form, Space } from 'wssf-kage-ui';

const Input = ({ value = '', onChange, placeholder, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
    }}
    {...props}
  />
);

const Button = ({ children, type = 'default', htmlType, ...props }) => (
  <button
    type={htmlType}
    className="kage-dropdown-button"
    style={{
      background: type === 'primary' ? '#6366f1' : undefined,
      color: type === 'primary' ? '#fff' : undefined,
      borderColor: type === 'primary' ? '#6366f1' : undefined,
    }}
    {...props}
  >
    {children}
  </button>
);

export default () => {
  const onFinish = (values) => {
    alert('注册成功: ' + JSON.stringify(values));
  };

  const onFinishFailed = (errors) => {
    console.log('验证失败:', errors);
  };

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ maxWidth: 400 }}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          { required: true, message: '请输入用户名' },
          { min: 3, message: '用户名至少 3 个字符' },
          { max: 20, message: '用户名最多 20 个字符' },
        ]}
      >
        <Input placeholder="3-20 个字符" />
      </Form.Item>
      
      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ]}
      >
        <Input placeholder="example@email.com" />
      </Form.Item>
      
      <Form.Item
        label="密码"
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码至少 6 个字符' },
          { pattern: /^(?=.*[a-z])(?=.*[A-Z])/, message: '密码需包含大小写字母' },
        ]}
      >
        <Input type="password" placeholder="至少 6 个字符，包含大小写" />
      </Form.Item>
      
      <Form.Item
        label="手机号"
        name="phone"
        rules={[
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
        ]}
      >
        <Input placeholder="选填" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  );
};
```

### 帮助信息和额外提示

为表单项添加帮助信息和额外提示。

```tsx
import { Form } from 'wssf-kage-ui';

const Input = ({ value = '', onChange, placeholder, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
    }}
    {...props}
  />
);

const Button = ({ children, type = 'default', htmlType, ...props }) => (
  <button
    type={htmlType}
    className="kage-dropdown-button"
    style={{
      background: type === 'primary' ? '#6366f1' : undefined,
      color: type === 'primary' ? '#fff' : undefined,
      borderColor: type === 'primary' ? '#6366f1' : undefined,
    }}
    {...props}
  >
    {children}
  </button>
);

export default () => (
  <Form layout="vertical" style={{ maxWidth: 400 }}>
    <Form.Item
      label="用户名"
      name="username"
      help="用户名将作为您的唯一标识"
      extra="支持字母、数字和下划线"
      rules={[{ required: true }]}
    >
      <Input placeholder="请输入用户名" />
    </Form.Item>
    
    <Form.Item
      label="个人简介"
      name="bio"
      extra="最多 200 字"
    >
      <textarea
        placeholder="介绍一下自己"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: 6,
          fontSize: 14,
          outline: 'none',
          minHeight: 80,
          resize: 'vertical',
        }}
      />
    </Form.Item>
    
    <Form.Item>
      <Button type="primary" htmlType="submit">保存</Button>
    </Form.Item>
  </Form>
);
```

### 禁用表单

禁用整个表单。

```tsx
import { Form, Checkbox } from 'wssf-kage-ui';
import { useState } from 'react';

const Input = ({ value = '', onChange, placeholder, disabled, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    style={{
      width: '100%',
      padding: '8px 12px',
      border: '1px solid #d9d9d9',
      borderRadius: 6,
      fontSize: 14,
      outline: 'none',
      background: disabled ? '#f5f5f5' : '#fff',
      cursor: disabled ? 'not-allowed' : 'text',
    }}
    {...props}
  />
);

export default () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <div>
      <Checkbox
        checked={disabled}
        onChange={(e) => setDisabled(e.target.checked)}
        style={{ marginBottom: 16 }}
      >
        禁用表单
      </Checkbox>
      
      <Form
        layout="vertical"
        disabled={disabled}
        initialValues={{ name: '张三', email: 'zhangsan@example.com' }}
        style={{ maxWidth: 400 }}
      >
        <Form.Item label="姓名" name="name">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入邮箱" />
        </Form.Item>
      </Form>
    </div>
  );
};
```

## API

### Form

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialValues | 初始值 | `Record<string, any>` | `{}` |
| layout | 表单布局 | `'horizontal' \| 'vertical' \| 'inline'` | `'horizontal'` |
| labelCol | label 布局 | `{ span?: number }` | - |
| wrapperCol | 内容布局 | `{ span?: number }` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| onFinish | 提交回调 | `(values) => void` | - |
| onFinishFailed | 提交失败回调 | `(errors) => void` | - |
| onValuesChange | 值变化回调 | `(changedValues, allValues) => void` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Form.Item

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名 | `string` | - |
| label | 标签 | `ReactNode` | - |
| rules | 验证规则 | `Rule[]` | `[]` |
| required | 是否必填（显示星号） | `boolean` | - |
| help | 帮助信息 | `ReactNode` | - |
| extra | 额外提示 | `ReactNode` | - |
| labelCol | label 布局 | `{ span?: number }` | - |
| wrapperCol | 内容布局 | `{ span?: number }` | - |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### Rule

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| required | 是否必填 | `boolean` |
| min | 最小长度 | `number` |
| max | 最大长度 | `number` |
| pattern | 正则表达式 | `RegExp` |
| type | 类型 | `'email' \| 'url' \| 'number'` |
| validator | 自定义验证函数 | `(value) => Promise<void> \| void` |
| message | 错误提示 | `string` |

