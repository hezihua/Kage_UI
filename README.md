# Kage UI

🎨 一个现代化的 React 组件库，优雅且高效。

## ✨ 特性

- 📦 开箱即用的高质量 React 组件
- 💎 使用 TypeScript 开发，提供完整的类型定义
- 🎨 支持主题定制
- 🚀 支持 Tree Shaking，按需加载

## 📦 安装

```bash
npm install wssf-kage-ui
# 或
yarn add wssf-kage-ui
# 或
pnpm add wssf-kage-ui
```

## 🔨 使用

```tsx
import { Button } from 'wssf-kage-ui';

function App() {
  return <Button type="primary">Hello Kage UI</Button>;
}
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动文档开发服务器
npm start

# 构建组件库
npm run build

# 构建文档站点
npm run docs:build
```

## 📁 目录结构

```
kage-ui/
├── docs/                   # 文档目录
│   ├── index.md           # 首页
│   └── guide.md           # 指南
├── src/                    # 组件源码
│   ├── Button/            # Button 组件
│   │   ├── index.tsx      # 组件实现
│   │   ├── index.less     # 组件样式
│   │   ├── index.ts       # 组件导出
│   │   └── index.md       # 组件文档
│   └── index.ts           # 入口文件
├── .dumirc.ts             # dumi 配置
├── .fatherrc.ts           # father 打包配置
├── package.json
└── tsconfig.json
```

## 🤝 贡献

欢迎贡献代码，请先阅读贡献指南。

## 📄 License

MIT © Kage UI

