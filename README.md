# Kage Monorepo

Kage UI 的 monorepo 仓库，包含组件库和图标库。

## 📦 包列表

- **[kage-ui](./packages/kage-ui)** - React 组件库
- **[kage-icon](./packages/kage-icon)** - 图标库

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动 kage-ui 文档开发服务器
pnpm dev

# 或单独启动
pnpm --filter kage-ui start
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建指定包
pnpm build:ui
pnpm build:icon
```

## 📝 版本管理

本项目使用 [Changesets](https://github.com/changesets/changesets) 进行版本管理。

### 创建变更集

```bash
pnpm changeset
```

### 版本更新

```bash
pnpm version
```

### 发布

```bash
pnpm release
```

## 📁 目录结构

```
.
├── packages/
│   ├── kage-ui/      # 组件库
│   └── kage-icon/    # 图标库
├── .changeset/       # Changesets 配置
├── pnpm-workspace.yaml
└── package.json
```

## 🔗 相关链接

- [kage-ui 文档](https://github.com/hezihua/Kage_UI)
- [kage-icon npm](https://www.npmjs.com/package/wssf-kage-icon)
- [kage-ui npm](https://www.npmjs.com/package/wssf-kage-ui)

## 📄 License

MIT

