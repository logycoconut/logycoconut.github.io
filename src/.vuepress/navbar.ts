import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
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
  {
    text: "另外",
    icon: "others",
    children: [
      "/03_tools/",
    ],
  },
  {
    text: "网站导航",
    link: "/02_program/",
  },
]);
