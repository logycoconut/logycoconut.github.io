---
title: Dockerfile常用指令介绍与示例
date updated: 2022-11-16 23:13
index: false
---

```
💡 Dockerfile 是一个用来构建镜像的文本文件, 文本内容包含了一条条构建镜像所需的指令和说明
```

## 举个🌰

### 构建一个 `nginx` 镜像，并初始化一个 `index` 文件

```docker
# 指定基础镜像为 nginx
FROM nginx

# 在上层基础之上在 /usr/share/nginx/html 目录增加一个 index.html 文件
RUN echo '这是一个本地构建的nginx镜像' > /usr/share/nginx/html/index.html
```

### 构建一个 `Java8` 镜像

```docker
# 指定基础镜像为 java8
FROM java:8

# 拷贝当前目录到镜像中的 /var/my/java 目录
COPY . /var/my/java  

# 设置工作目录为 /var/my/java
WORKDIR /var/my/java  

# 编译 Hello.java 文件
RUN javac Hello.java

# 容器启动时运行 java Hello
CMD ["java", "Hello"]
```

## 指令作用

![](https://knowledge-img-1304942245.cos.ap-shanghai.myqcloud.com/20221116000420.png)

### 上下文路径

`docker build -t nginx:v .`

由于 docker 的运行模式是 C/S。我们本机是 C，docker 引擎是 S。实际的构建过程是在 docker 引擎下完成的，所以这个时候无法用到我们本机的文件。这就需要把我们本机的指定目录下的文件一起打包提供给 docker 引擎使用。

如果未说明最后一个参数，那么默认上下文路径就是 Dockerfile 所在的位置

上下文路径下不要放无用的文件，因为会一起打包发送给 docker 引擎，如果文件过多会造成过程缓慢

### FROM

指定基础镜像，后续的操作都是基于基础镜像（ `Dockerfile`文件必须以 `FROM` 作为第一行）

### LABEL

为镜像添加标签

`LABEL <key>=<value> <key>=<value> <key>=<value> ...`

例如 `LABEL author="logycoconut" version=0.1`

### RUN

`RUN` 指令有两种形式

- `RUN <command> (shell form, the command is run in a shell, which by default is /bin/sh -c on Linux or cmd /S /C on Windows)`
- `RUN ["executable", "param1", "param2"]`

每一个 `RUN` 指令都会构建新的一层

```docker
# 应该避免下面这种形式，会产生非常多层的镜像，增加构建部署的时间
RUN apk upgrade
RUN apk add python3

# 推荐的形式，以 && 符号连接命令
RUN apk upgrade && \\
    apk add python3
```

### CMD

`CMD` 命令类似于 `RUN`，不同点在于运行的时间点

- `CMD` 在docker run 时运行。
- `RUN` 是在 docker build 时运行

`CMD` 命令有三种形式

- `CMD ["executable","param1","param2"]` (_exec_ form, this is the preferred form)

- `CMD command param1 param2` (_shell_ form)

- `CMD ["param1","param2"]` (作为 _ENTRYPOINT 的默认参数_)

- CPOY

  _ADD 指令和 COPY 的使用格式一致（同样需求下，官方推荐使用 COPY）_

  `COPY` 命令有两种形式

  - `COPY [--chown=<user>:<group>] <src>... <dest>`
  - `COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]`

  **注意：**

  1. source路径必须在构建的上下文之内。不能使用 `COPY ../a/b`的形式，因为docker构建的第一步是将上下文路径发送到docker引擎
  2. 如果source是目录，则会复制目录的全部内容，包括文件系统元数据

  **ADD指令与CPOY指令对比**

  - ADD 的优点：在执行 `<src>` 为 tar 压缩文件，压缩格式为 gzip, bzip2 以及 xz 的情况下，会自动复制并解压到 `<dest>`

- ADD 的缺点：在不解压的前提下，无法复制 tar 压缩文件。会令镜像构建缓存失效，从而可能会令镜像构建变得比较缓慢。具体是否使用，可以根据是否需要自动解压来决定。

### ENV、ARG

设置环境变量, `ENV <key1>=<value1> <key2>=<value2>...`

```docker
# Dockerfile 设置了 VERSION=0.1
ENV VERSION=0.1

# 在镜像启动的容器中 echo
root@caa46eb11ab6:/# echo $VERSION
0.1
```

### ARG指令

`ARG` 与`ENV` 作用一致，作用域不同

ARG 设置的环境变量仅对 Dockerfile 内有效，也就是说只有 docker build 的过程中有效，构建好的镜像内不存在此环境变量

## 参考资料

- [Docker官方文档](https://docs.docker.com/engine/reference/builder/#environment-replacement)
- [你必须知道的Dockerfile - Edison Zhou](https://www.cnblogs.com/edisonchou/p/dockerfile_inside_introduction.html)
- [Dockerfile示例与解析 - 易百教程](https://www.yiibai.com/docker/docker-dockerfile.html)
