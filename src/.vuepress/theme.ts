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
  pure: true,

  // 是否全局启用路径导航
  breadcrumb: false,

  // 外观配置
  iconAssets: "iconfont",
  darkmode: "toggle",
  backToTop: true,

  // 自定义排序
  sidebarSorter: ["readme", "file-number"],

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
    },
  },

  // 页面信息
  pageInfo: ["Author", "Date", "Category", "Tag", "ReadingTime"],

  plugins: {

    blog: {
      // 自动摘要
      autoExcerpt: true,
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
    components: ["Badge", "BiliBili", "VideoPlayer", "YouTube"],

    // Disable features you don't want here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      flowchart: true,
      gfm: true,
      imageLazyload: true,
      imageTitle: true,
      imageSize: true,
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
          matcher: "Recommanded",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommanded",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vpre: true,
      vuePlayground: true,
    },

  },
});
