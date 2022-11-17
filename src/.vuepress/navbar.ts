import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  {
    text: "主页",
    link: "/"
  },
  {
    text: "Program",
    link: "/program/",
  },
  {
    text: "日常",
    link: "/daliy/",
  },
  {
    text: "另外",
    children: [
      "/开发工具/",
    ],
  },
]);
