---
title: 好玩的 Docker 项目
tags:
  - Docker
order: 7
---

> 推荐使用 `Docker Compose` 管理

## 面板

### `Portainer`（Docker 容器管理）

> [下载地址](https://github.com/portainer/portainer)

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

### `reader`（小说阅读）

> [下载地址](https://github.com/hectorqin/reader)

阅读3服务器版，填补 iOS 小说阅读空缺

搭建教程本站搜索

### [RSSHub][]（RSS 订阅）

> [下载地址](https://github.com/DIYgod/RSSHub)

RSS 生成器，适配程度很完整

## 参考链接

- [整理全网有趣好玩的 Docker](https://github.com/itgoyo/awesome-docker)
