---
title: 好玩的 Docker 项目
date: 2023-01-31
tag: [Docker]
---

> 推荐使用 Docker Compose 管理

## 系统

### [Portainer][]（Docker 容器管理）

```
version: "3"
services:
  portainer:
    image: portainer/portainer:latest
    container_name: portainer
    ports:
      - "9000:9000"
    volumes:
      - /home/app/portainer/data:/data
      - /var/run/docker.sock:/var/run/docker.sock
```

## 阅读

### [reader][]（小说阅读）

阅读3服务器版，填补 iOS 小说阅读空缺

搭建教程本站搜索

### [RSSHub][]（RSS 订阅）

RSS 生成器，适配程度很完整

​​<!-- +++++++++ 下面是引用式链接 +++++++++ -->

[Portainer]: https://github.com/portainer/portainer

[reader]: https://github.com/hectorqin/reader

[RSSHub]: https://github.com/DIYgod/RSSHub

[阅读3.0服务器版搭建]: /01_daliy/220820_阅读3.0Web版搭建.html
