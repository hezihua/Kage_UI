import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  outputPath: 'docs-dist',
  // 禁用代码分割，避免 chunk 加载错误
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  themeConfig: {
    name: 'Kage UI',
    logo: false,  // 暂时不使用 logo 图片
    nav: [
      { title: '指南', link: '/guide' },
      { title: '组件', link: '/components/button' },
    ],
    footer: `Open-source MIT Licensed | Copyright © ${new Date().getFullYear()} Kage UI`,
    socialLinks: {
      github: 'https://github.com/hezihua/Kage_UI',
    },
  },
  // 配置 sass 支持
  // sass: {},
  // 配置别名
  alias: {
    'kage-ui': path.resolve(__dirname, './src'),
    'wssf-kage-ui': path.resolve(__dirname, './src'), // 兼容旧名称
    'kage-icon': path.resolve(__dirname, '../kage-icon/src'), // 指向 kage-icon 源码（相对于 kage-ui 目录）
    'wssf-kage-icon': path.resolve(__dirname, '../kage-icon/src'), // 指向 wssf-kage-icon 源码（相对于 kage-ui 目录）
  },
  // 配置 demo 的全局包裹组件
  // mountElementId: 'root',
  styles: [
    `.dumi-default-header-left {
       width: 320px;
    }
    .dumi-default-sidebar {
      width: 320px !important;
    }
    .dumi-default-doc-layout-content {
      padding-left: 0 !important;
      padding-right: 0 !important;
      max-width: 100% !important;
    }
    .dumi-default-doc-layout > main {
      max-width: 100% !important;
      padding: 0 !important;
    }
    .markdown {
      max-width: 100% !important;
      padding: 0 24px !important;
    }
    .dumi-default-previewer {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }`,
  ],
});

