# Monorepo 使用指南

## 📁 项目结构

```
Kage_UI/
├── packages/
│   ├── kage-ui/          # React 组件库
│   │   ├── src/          # 组件源码
│   │   ├── docs/         # 文档
│   │   └── package.json
│   └── kage-icon/        # 图标库
│       ├── src/          # 图标源码
│       └── package.json
├── .changeset/           # Changesets 配置
├── pnpm-workspace.yaml   # pnpm workspace 配置
└── package.json          # 根 package.json
```

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 启动 kage-ui 文档开发服务器
pnpm dev

# 或直接进入子项目
cd packages/kage-ui
pnpm start
```

### 构建

```bash
# 构建所有包
pnpm build

# 构建指定包
pnpm build:ui      # 只构建 kage-ui
pnpm build:icon    # 只构建 kage-icon
```

## 📦 包管理

### 安装依赖到特定包

```bash
# 安装到 kage-ui
pnpm --filter kage-ui add <package>

# 安装到 kage-icon
pnpm --filter kage-icon add <package>

# 安装到根目录（开发依赖）
pnpm add -Dw <package>
```

### 运行特定包的脚本

```bash
# 运行 kage-ui 的脚本
pnpm --filter kage-ui <script>

# 运行 kage-icon 的脚本
pnpm --filter kage-icon <script>
```

## 📝 版本管理

### 创建变更集

当你修改了代码并想要发布新版本时：

```bash
pnpm changeset
```

选择要更新的包和版本类型（patch/minor/major）。

### 更新版本

```bash
pnpm version
```

这会根据变更集自动更新版本号和 CHANGELOG。

### 发布

```bash
# 发布所有包
pnpm release

# 单独发布
pnpm release:ui    # 只发布 kage-ui
pnpm release:icon  # 只发布 kage-icon
```

## 📚 文档集成

在 `kage-ui` 的文档中，`kage-icon` 作为一个独立模块展示：

- 文档位置：`packages/kage-ui/docs/icon.md`
- 使用方式：需要单独安装 `kage-icon`
- 版本管理：`kage-icon` 有独立的版本号

## 🔗 包信息

### kage-ui

- **包名**: `kage-ui`
- **npm**: https://www.npmjs.com/package/kage-ui
- **文档**: 运行 `pnpm dev` 查看本地文档

### kage-icon

- **包名**: `kage-icon`
- **npm**: https://www.npmjs.com/package/kage-icon
- **独立版本**: 可以单独更新和发布

## ⚙️ 配置说明

### pnpm-workspace.yaml

定义了 workspace 的包路径：

```yaml
packages:
  - 'packages/*'
```

### Changesets 配置

`.changeset/config.json` 配置了版本管理策略：
- `access: "public"` - 公开包
- `updateInternalDependencies: "patch"` - 内部依赖更新策略

## 🛠️ 开发工作流

1. **开发新功能**
   ```bash
   pnpm dev  # 启动开发服务器
   ```

2. **提交代码**
   ```bash
   git add .
   git commit -m "feat: 新功能"
   ```

3. **创建变更集**
   ```bash
   pnpm changeset
   ```

4. **更新版本并发布**
   ```bash
   pnpm version
   pnpm release
   ```

## 📋 常用命令

```bash
# 开发
pnpm dev              # 启动文档开发服务器
pnpm build            # 构建所有包
pnpm lint             # 检查代码

# 版本管理
pnpm changeset        # 创建变更集
pnpm version          # 更新版本
pnpm release          # 发布到 npm

# 清理
pnpm clean            # 清理构建产物和 node_modules
```

## 🔍 故障排除

### 依赖问题

如果遇到依赖问题，尝试：

```bash
rm -rf node_modules packages/*/node_modules
pnpm install
```

### 构建失败

检查各包的配置：
- `packages/kage-ui/.fatherrc.ts`
- `packages/kage-icon/.fatherrc.ts`

### 发布失败

确保：
1. 已登录 npm：`npm login`
2. 有发布权限
3. 版本号已更新

## 📖 更多信息

- [pnpm workspace 文档](https://pnpm.io/workspaces)
- [Changesets 文档](https://github.com/changesets/changesets)

