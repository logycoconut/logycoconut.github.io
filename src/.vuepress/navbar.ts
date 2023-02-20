import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    icon: "zhuye",
    link: "/"
  },
  {
    text: "生活",
    icon: "shenghuo",
    link: "/01_daliy/",
  },
  {
    text: "代码人生",
    icon: "ziyuan",
    link: "/02_program/",
  },
  // {
  //   text: "另外",
  //   icon: "gengduo1",
  //   children: [
  //     "/03_tools/",
  //   ],
  // },
  {
    text: "博客",
    icon: "blog1",
    link: "/article/",
  },
  {
    text: "网站导航",
    icon: "daohang",
    link: "/04_single_page/221203_网站导航.md",
  },
]);
