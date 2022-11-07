import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({

  lang: "zh-CN",

  base: "/",

  theme,

  // 是否开启页面预拉取
  shouldPrefetch: false,

  // 禁止文件夹生成静态文件，参考 [VuePress 文档]（https://v2.vuepress.vuejs.org/zh/guide/page.html#routing）
  pagePatterns: ["**/*.md", "!_temp", "!.vuepress", "!node_modules"],

  plugins: [
    // 本地搜索：默认情况下，该插件会将页面标题和小标题作为搜索索引。
    searchPlugin({

    }),
  ],
});
