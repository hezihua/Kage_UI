# Changesets

这个 monorepo 使用 [Changesets](https://github.com/changesets/changesets) 来管理版本和发布。

## 工作流程

### 1. 创建变更集

当你修改了代码并想要发布新版本时，运行：

```bash
pnpm changeset
```

这会引导你：
- 选择要更新的包（kage-ui 或 kage-icon）
- 选择版本类型（patch、minor、major）
- 描述变更内容

### 2. 版本更新

当你准备好发布时，运行：

```bash
pnpm version
```

这会：
- 根据变更集更新版本号
- 更新 CHANGELOG
- 提交变更

### 3. 发布

```bash
pnpm release
```

这会：
- 构建所有包
- 发布到 npm

## 独立版本管理

每个包（kage-ui 和 kage-icon）都有独立的版本号，可以单独发布。

### 单独发布 kage-ui

```bash
pnpm release:ui
```

### 单独发布 kage-icon

```bash
pnpm release:icon
```

## 注意事项

- 确保在发布前运行 `pnpm build`
- 确保已登录 npm：`npm login`
- 发布前检查 `.changeset` 目录中的变更集文件
