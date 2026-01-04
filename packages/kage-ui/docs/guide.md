---
nav:
  title: 指南
  order: 1
---

# 快速开始

## 安装

使用 npm 或 yarn 安装

```bash
# npm
npm install wssf-kage-ui

# yarn
yarn add wssf-kage-ui

# pnpm
pnpm add wssf-kage-ui
```

## 使用

```tsx | pure
import { Button } from 'wssf-kage-ui';

function App() {
  return (
    <Button type="primary" onClick={() => alert('Hello Kage UI!')}>
      点击我
    </Button>
  );
}
```

## 按需加载

Kage UI 默认支持基于 ES Modules 的 Tree Shaking，直接引入即可享受按需加载的效果。

## 浏览器兼容性

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions |

