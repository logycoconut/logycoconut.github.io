import { hopeTheme } from "vuepress-theme-hope";
import { zhNavbar } from "./navbar.js";
import { zhSidebar } from "./sidebar.js";

export default hopeTheme({

  hostname: "https://logycoconut.github.io",

  author: {
    name: "logycoconut",
    url: "https://github.com/logycoconut",
  },

  repo: "logycoconut/logycoconut.github.io",
  logo: "/logo.svg",

  // 纯净模式
  // pure: true,

  // 是否全局启用路径导航
  breadcrumb: false,

  // 外观配置
  iconAssets: "//at.alicdn.com/t/c/font_3777794_rh0nwcvkdfh.css",
  darkmode: "toggle",
  backToTop: true,

  // 自定义排序
  sidebarSorter: ["readme", "order", "filename"],

  locales: {
    "/": {
      // 导航栏组件
      navbar: zhNavbar,
      // 侧边栏组件
      sidebar: zhSidebar,
      // 页脚
      footer: "",
      displayFooter: false,
      // page meta
      metaLocales: {
        editLink: "在 GitHub 上编辑此页",
      },
      // 是否展示贡献者
      contributors :  false,
    },
  },

  // 页面信息
  pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime"],

  plugins: {

    blog: {
      // 自动摘要
      excerpt: true,
      // 筛选出博客
      filter: (page) => Boolean(page.filePathRelative?.startsWith("blog")) && !page.frontmatter.home,
    },

    // 评论配置
    comment: {
      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    // 组件库
    components: {
      components: ["Badge", "BiliBili", "VideoPlayer", "YouTube"],
    },

    // Disable features you don’t want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "Demo",
            short_name: "Demo",
            url: "/demo/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
    
  },
});
