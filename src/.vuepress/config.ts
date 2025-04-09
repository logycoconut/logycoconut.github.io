import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "logycoconut's k-lab",
  description: "logycoconut's k-lab",

  theme,
  // 和 PWA 一起启用
  // shouldPrefetch: false,
  
  // 用于预加载某些资源
  head: [
    // ["link", { rel: "preconnect", href: "https://cdn.jsdelivr.net/npm/@callmebill/lxgw-wenkai-web@latest", crossorigin: "anonymous" }],
    // 导入 LXGW Wenkai 字体样式表
    ["link", {
      rel: "stylesheet",
      href: "https://fontsapi.zeoseven.com/95/medium/result.css"
    }],
  ],

  markdown: {
    headers: {
      // 用到哪一级就提取哪一级
      level: [2, 3, 4],
    },
  },

});
