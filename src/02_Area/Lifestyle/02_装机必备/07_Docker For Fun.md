---
title: 好玩的 Docker 项目
tags: [Docker] 
---

# 好玩的 Docker 项目

安装容器之前先去 [`docker hub`](https://hub.docker.com/) 看看 `tag`、版本号

## 目前使用频率较多的容器

### `Portainer` 容器管家

- `Portainer` 新版重命名为 `Portainer CE`，老的不维护了，别找错仓库！

- 安装教程： https://docs.portainer.io/start/install-ce/server/docker/linux

```bash
#  创建 Portainer Server 将用于存储其数据库的卷
docker volume create portainer_data

docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

- 安装完成后进入初始化界面，设置一个帐号名密码即可，例如

```yml
username：admin
password：password+portainer 
```

### `Emby` 影视库

- 与 `Jellyfin` 相比界面更加美观、用户更多

- 在镜像选择上有很多，官方版本 or 网友分享的版本
    *注意 config 文件以及媒体库的映射*

```bash
# Offical
docker run -d --name emby-server -p 8096:8096 -p 8920:8920 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data emby/embyserver

# amilys（目前在用）
docker run -d -e PUID=1000 -e PGID=1000 -v /Users/hall/Documents/ForDocker/config/emby-amilys:/config -v /Users/hall/Documents/Media:/data -p 8096:8096 -p 8920:8920 --name=emby-server-amilys-1011 amilys/embyserver:4.8.9.0

# xinjiawei1
docker run -d -e PUID=1000 -e PGID=1000 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data -p 8096:8096 -p 8920:8920 --name=emby xinjiawei1/emby_unlockd:latest
```

还有其他版本，可以根据自己需要多尝试一下再选择

- https://hub.docker.com/r/amilys/embyserver
- https://hub.docker.com/r/xinjiawei1/emby_unlockd
- https://hub.docker.com/r/zishuo/embyserver/
- https://hub.docker.com/r/lovechen/embyserver
- ...

## 更新策略

目前网上有一种方案，就是使用 `watchtower` 来进行自动化的更新
但在我的实践下，不知是否是因为墙的缘故，老能遇到问题

而且目前我的容器数量并不多，同时他们并不是需要频繁更新的类型
所以还是采用**手动更新**的方案

- 停止当前容器
    `docker stop xxx`
- 在 docker hub 中找到最新的容器 tag 并 pull 到本地
- 使用 run 命令启动最新镜像