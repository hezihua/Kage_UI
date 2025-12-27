import { defineConfig } from 'father';

export default defineConfig({
  // 配置 ESM 格式输出
  esm: {
    output: 'dist/esm',
  },
  // 配置 CJS 格式输出
  cjs: {
    output: 'dist/cjs',
  },
  // 配置 UMD 格式输出（可选，用于 CDN 引入）
  // umd: {
  //   name: 'KageUI',
  //   output: 'dist/umd',
  //   externals: {
  //     react: 'React',
  //     'react-dom': 'ReactDOM',
  //   },
  // },
  // 配置平台
  platform: 'browser',
  // 配置额外的 babel 插件
  // extraBabelPlugins: [],
});

