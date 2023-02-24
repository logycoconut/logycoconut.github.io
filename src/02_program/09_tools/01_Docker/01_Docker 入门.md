---
title: 基础教程
date: 2021-05-17
tag: [Docker]
---

```
强大的容器技术，前后端都用得着
```

## 教程

### 配置加速器

在 `Docker daemon configuration file` 中写入

`{"registry-mirrors":["http://hub-mirror.c.163.com"]}`

```bash
# docker 官方中国区镜像
https://registry.docker-cn.com
# 网易镜像
http://hub-mirror.c.163.com
# 阿里云镜像（专属加速）
https://cr.console.aliyun.com/cn-hangzhou/instances/mirrors
```

### 容器使用

```bash
# 启动一个 alpine 镜像并指定 name
# -i 交互式操作
# -t 终端
# -d 后台运行
docker run -itd --name alpine_local alpine /bin/sh

# 进入容器
docker exec -it eb4e5f3d4f71 /bin/sh
```

### 创建镜像

#### 基于已有的镜像创建

```bash
# 在 eb4e5f3d4f71 容器中新增 test.txt 文件，退出容器并提交
docker commit -m "add test.txt" -a "hall" eb4e5f3d4f71 test:0.1
```

#### 基于Dockerfile来创建（推荐）

```docker
FROM docker.io/alpine:latest

LABEL version="1.0" maintainer="Hall <logycoconut@github>"

RUN apk upgrade && \\
    apk add python3

------------------------------------------------------------

# 注意最后有个点 .
docker image build -t alpine-python3:1 .
```

### 导出、加载镜像

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E5%AF%BC%E5%87%BA%E9%95%9C%E5%83%8F.png)

```bash
# 导出 alpine-python3:1 镜像到当前目录
docker save -o alpine-py3.tar alpine-python3:1
```

#### 加载镜像

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E5%8A%A0%E8%BD%BD%E9%95%9C%E5%83%8F.png)

```bash
# 加载当前目录的 tar 包
docker load -i alpine-py3.tar
```

### 上传镜像

- 创建自己的仓库

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E5%88%9B%E5%BB%BA%E4%BB%93%E5%BA%93.png)

- 查看现有的镜像

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E6%9F%A5%E7%9C%8B%E7%8E%B0%E6%9C%89%E7%9A%84%E9%95%9C%E5%83%8F.png)

- 为 `alpine-python3`打个标签

`docker tag alpine-python3:1 logycoconut/test:0.1`

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E6%89%93%E6%A0%87%E7%AD%BE.png)

- 推到远程仓库

`docker push logycoconut/test:0.1`

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/%E6%8E%A8%E5%88%B0%E8%BF%9C%E7%A8%8B%E4%BB%93%E5%BA%93.png)

- 现在任何人都可以下载你上传的镜像了

`docker pull logycoconut/test:0.1`

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tools/docker/20221115235714.png)

### 清理镜像

```bash
# 参数可以是 name 或 id
docker rmi [image]

# 删除所有未被容器使用的镜像
docker image prune -a

# 删除所有未被使用的容器
docker container prune -a
```

## 常用镜像安装

- Docker安装Alpine

  `docker run -itd --name alpine-local alpine`

- Docker安装Redis

  `docker run -d --name redis-local -p 6379:6379 redis`

- Docker安装MySQL

  `docker run -d --name mysql-local -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql`

- Docker安装Nginx

  `docker run --name nginx-local -p 8080:80 -d nginx`

## 镜像管理 Portainer

### Portainer容器更新

```docker
# 停止旧容器
docker stop portainer
# 删除旧容器
docker rm portainer
# 删除旧镜像
docker rmi portainer/portainer
# 拉取新镜像
docker pull portainer/portainer-ce
# 使用新的镜像启动新的容器
docker run -d -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock --restart=always --name portainer portainer/portainer-ce
```

## 参考资料

- [易百教程](https://www.yiibai.com/docker)
- [菜鸟教程-Docker](https://www.runoob.com/docker/docker-tutorial.html)
- [异常教程-Docker](https://www.exception.site/docker)
- [Docker官方镜像仓库](https://hub.docker.com/)
- [Docker — 从入门到实践](https://yeasy.gitbook.io/docker_practice/)（⭐️⭐️⭐️）
