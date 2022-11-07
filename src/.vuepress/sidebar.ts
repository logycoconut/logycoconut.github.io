import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
    "/demo/": "structure", 
    
    "/": [
        // "",
        {
            icon: "discover",
            text: "案例",
            prefix: "demo/",
            link: "demo/",
            children: "structure",

        }
    ],
});
