import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "🥳 成为一个有趣的人",
    link: "/area/lifestyle/",
  },
  {
    text: "🏞️ 记录生活",
    children: [
      "/area/log_for_life/weekly/", 
      "/area/log_for_life/travel/",
    ],
  },
  {
    text: "🧭 网站导航",
    link: "/area/other/website_navigation.md",
  },
]);
