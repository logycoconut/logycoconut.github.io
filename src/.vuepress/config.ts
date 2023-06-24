import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { searchPlugin } from "@vuepress/plugin-search";
import { docsearchPlugin } from '@vuepress/plugin-docsearch'

export default defineUserConfig({

  lang: "zh-CN",

  base: "/",

  theme,

  // 是否开启页面预拉取
  shouldPrefetch: false,

  // 禁止文件夹生成静态文件，参考 [VuePress 文档]（https://v2.vuepress.vuejs.org/zh/guide/page.html#routing）
  pagePatterns: ["**/*.md", "!_temp", "!.vuepress", "!node_modules", "!**/Excalidraw/*.md"],

  // plugins: [
  //   // 本地搜索：默认情况下，该插件会将页面标题和小标题作为搜索索引。
  //   searchPlugin({
  //     // 最大推荐个数
  //     maxSuggestions: 8,
  //     // 热键支持
  //     hotKeys: ["commond", "k"],
  //   }),
  //   // PWA
  //   pwaPlugin({
  //     // 你的选项
  //   }),
  // ],
  plugins: [
    // https://docsearch.algolia.com/
    docsearchPlugin({
      appId: "JAPRDFN6CA",
      apiKey: "b711a29fa0b2f24741f3e2429cde7186",
      indexName: "logycoconutio",
      locales: {
        "/": {
          placeholder: "搜索文档",
          translations: {
            button: {
              buttonText: "搜索文档",
              buttonAriaLabel: "搜索文档",
            },
            modal: {
              searchBox: {
                resetButtonTitle: "清除查询条件",
                resetButtonAriaLabel: "清除查询条件",
                cancelButtonText: "取消",
                cancelButtonAriaLabel: "取消",
              },
              startScreen: {
                recentSearchesTitle: "搜索历史",
                noRecentSearchesText: "没有搜索历史",
                saveRecentSearchButtonTitle: "保存至搜索历史",
                removeRecentSearchButtonTitle: "从搜索历史中移除",
                favoriteSearchesTitle: "收藏",
                removeFavoriteSearchButtonTitle: "从收藏中移除",
              },
              errorScreen: {
                titleText: "无法获取结果",
                helpText: "你可能需要检查你的网络连接",
              },
              footer: {
                selectText: "选择",
                navigateText: "切换",
                closeText: "关闭",
                searchByText: "搜索提供者",
              },
              noResultsScreen: {
                noResultsText: "无法找到相关结果",
                suggestedQueryText: "你可以尝试查询",
                reportMissingResultsText: "你认为该查询应该有结果？",
                reportMissingResultsLinkText: "点击反馈",
              },
            },
          },
        },
      },
    }),
  ],
});
