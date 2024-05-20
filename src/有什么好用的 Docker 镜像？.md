---
title: 有什么好用的 Docker 镜像？
tag: [Docker] 
---

安装容器之前先去 docker hub 看看 tag、版本号
https://hub.docker.com/

### Portainer

https://docs.portainer.io/start/install-ce/server/docker/linux
部署

```bash
# 创建Portainer Server将用于存储其数据库的卷
docker volume create portainer_data

# 安装容器
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

登录
https://localhost:9443
例如

```
user：admin
password： 
```

### Emby

```bash
docker run -d --name emby-server -p 8096:8096 -p 8920:8920 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data emby/embyserver
```

```
docker run -d -e PUID=1000 -e PGID=1000 -v /Users/hall/Documents/ForDocker/config/emby:/config -v /Users/hall/Documents/Media:/data -p 8096:8096 -p 8920:8920 --name=emby xinjiawei1/emby_unlockd:latest
```

docker pull amilys/embyserver

- https://hub.docker.com/r/xinjiawei1/emby_unlockd
- https://hub.docker.com/r/amilys/embyserver
- https://hub.docker.com/r/zishuo/embyserver/
- https://hub.docker.com/r/lovechen/embyserver

### qB

```dockerfile
services:
  qbittorrent:
    image: lscr.io/linuxserver/qbittorrent:latest
    container_name: qbittorrent
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Etc/UTC
      - WEBUI_PORT=8080
      - TORRENTING_PORT=6881
    volumes:
      - /Users/hall/Documents/ForDocker/config/qbittorrent:/config
      - /Users/hall/Documents/media:/downloads
    ports:
      - 8080:8080
      - 6881:6881
      - 6881:6881/udp
    restart: unless-stopped
```

### gopeed

```
 docker run --name gopeed -d -p 9999:9999 -v /Users/hall/Documents/Media:/app/Downloads -v /Users/hall/Documents/ForDocker/config/gopeed:/app/storage liwei2633/gopeed
```