---
title: Docker 镜像
tag: [Docker] 
aliases: [Docker 镜像？]
---

# Docker 镜像

> 安装容器之前先去 [`docker hub`](https://hub.docker.com/) 看看 `tag`、版本号

### `Portainer` 容器监控、管家

- `Portainer` 新版重命名为 `Portainer CE`，老的不维护了，别找错仓库！
- [安装教程](https://docs.portainer.io/start/install-ce/server/docker/linux)也很简单明了

#### 部署

```bash
# 创建Portainer Server将用于存储其数据库的卷
docker volume create portainer_data

# 安装容器
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

#### 登录

- 默认的端口号为 9443 `https://localhost:9443`
- 设置用户名密码，例如

```
user：admin
password：password+portainer 
```

### `Emby` 影视库

> 可以选择官方版本或网友分享的版本

```bash
# 官方版本
docker run -d --name emby-server -p 8096:8096 -p 8920:8920 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data emby/embyserver

# 解锁版
docker run -d -e PUID=1000 -e PGID=1000 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data -p 8096:8096 -p 8920:8920 --name=emby xinjiawei1/emby_unlockd:latest
```

还有其他版本，可以根据自己需要多尝试一下再选择

- https://hub.docker.com/r/amilys/embyserver
- https://hub.docker.com/r/xinjiawei1/emby_unlockd
- https://hub.docker.com/r/zishuo/embyserver/
- https://hub.docker.com/r/lovechen/embyserver
- ...

