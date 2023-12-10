---
title: Docker Compose定义及示例
date: 2021-08-10
tag: [Docker]
---

```
💡 通过一个 YAML 文件定义（编排）应用所需要的所有服务，一键启动所有服务
```

## 示例

从《Docker — 从入门到实践》的 [一个小例子][一个小例子 - 《Docker - 从入门到实践》] 开始

1. 用 Python 来建立一个能够记录页面访问次数的 web 应用

```python
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis', port=6379)  # 通过host:redis访问到Redis服务, 具体原因下文解释

@app.route('/')
def hello():
    count = redis.incr('hits')
    return 'Hello World! 该页面已被访问 {} 次。\\n'.format(count)

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
```

1. 编写 Dockerfile 文件

```docker
FROM python:3.6-alpine
ADD . /code
WORKDIR /code
RUN pip install redis flask
CMD ["python", "app.py"]
```

1. 编写 docker-compose.yml 文件

```docker
version: '3'
services:

  web:
    build: .
    ports:
     - "5000:5000"

  redis:
    image: "redis:alpine"
```

1. 命令行输入 `docker-compose up` 运行

## 进阶示例

来自 [wopen的Docker Compose 零基础入门][] 的详细解释

```docker
version: '3' # 定义版本，不指定默认为版本 1，新版本功能更多

services: # 容器，就像 docker run
   db: # 名称，它也是 network 中 DNS 名称
     image: mysql:5.7 # 镜像，如果像自定义镜像可以不指定这个参数，而用 build
     volumes: # 定义数据卷，类似 -v
       - db_data:/var/lib/mysql
       - .:/aaa # 挂载当前目录到容器中的 /aaa 无需使用绝对路径
     restart: always # 类似 --restart
     environment: # 定义环境变量，类似 -e
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress: # 第二个容器
     labels: # 为容器添加 Docker 元数据（metadata）信息。例如可以为容器添加辅助说明信息。
       com.example.description: "This label will appear on all containers for the web service"
     depends_on: # 帮助 compose 理解容器之间的关系
     # db 将会在 wordpress 之前被启动
     # 关闭时 wordpress 将会在 db 之前关闭
     # 我们指定只启动 wordpress，db 也会跟着启动
       - db
     image: wordpress:latest
     ports: # 端口，类似 -p
       - "8000:80"
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress

volumes: # 可选，需要创建的数据卷，类似 docker volume create
  db_data:

networks: # 可选，需要创建的网络，类似 docker network create
```

## docker-compose自动构建虚拟网络

1. 查看docker-compose为我们创建的网络

**docker-compose_default**

```docker
docker-compose docker network ls
···
NETWORK ID     NAME                     DRIVER    SCOPE
3251676092c7   bridge                   bridge    local
9a85b86e70cb   docker-compose_default   bridge    local
6dac529699da   host                     host      local
1c4082e10a1c   none                     null      local
```

2. 自动将两个容器加入到网络中

```docker
docker-compose docker network inspect docker-compose_default
···
[
    {
        "Name": "docker-compose_default",
        "Id": "9a85b86e70cb004f15928910bd63c951a8ac5f1d473833d5ede23594d45621a1",
        "Created": "2021-08-02T14:47:29.126203857Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": true,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "f4c400171510046fad301a90051695159a43b6211550cfa40243c4574da46195": {
                "Name": "docker-compose_web_1",
                "EndpointID": "da8745e36f5288d2f65f11b6f5bd556628958a54ade7442a3d97626ddeb9f105",
                "MacAddress": "02:42:ac:12:00:03",
                "IPv4Address": "172.18.0.3/16",
                "IPv6Address": ""
            },
            "fe51d456ec193dfaafba10565d3a9c78901c179d57dcf56ff052d15f1099dfaa": {
                "Name": "docker-compose_redis_1",
                "EndpointID": "b4aa1d780eaaa40c8ded9673f2588e3181acec3fedaa0acae42f228d547bfa73",
                "MacAddress": "02:42:ac:12:00:02",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "default",
            "com.docker.compose.project": "docker-compose",
            "com.docker.compose.version": "1.29.1"
        }
    }
]
```

3. 可以看到redis服务的网络id就是虚拟网络的id，并且别名为redis，这就是为什么上文中直接把redis当成host参数

   关注 `Networks - docker-compose_default - Aliases`

```docker
"NetworkSettings": {
            "Bridge": "",
            "SandboxID": "de03aaddff43be0dd3baeca06eaff7120cfdc6541b05ad09fefb1336db9c5733",
            "HairpinMode": false,
            "LinkLocalIPv6Address": "",
            "LinkLocalIPv6PrefixLen": 0,
            "Ports": {
                "6379/tcp": null
            },
            "SandboxKey": "/var/run/docker/netns/de03aaddff43",
            "SecondaryIPAddresses": null,
            "SecondaryIPv6Addresses": null,
            "EndpointID": "",
            "Gateway": "",
            "GlobalIPv6Address": "",
            "GlobalIPv6PrefixLen": 0,
            "IPAddress": "",
            "IPPrefixLen": 0,
            "IPv6Gateway": "",
            "MacAddress": "",
            "Networks": {
                "docker-compose_default": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "fe51d456ec19",
                        "redis"
                    ],
                    "NetworkID": "9a85b86e70cb004f15928910bd63c951a8ac5f1d473833d5ede23594d45621a1",
                    "EndpointID": "b4aa1d780eaaa40c8ded9673f2588e3181acec3fedaa0acae42f228d547bfa73",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "MacAddress": "02:42:ac:12:00:02",
                    "DriverOpts": null
                }
            }
        }
```

​​<!-- +++++++++ 下面是引用式链接 +++++++++ -->

[一个小例子 - 《Docker - 从入门到实践》]: https://yeasy.gitbook.io/docker_practice/compose/usage

[wopen的Docker Compose 零基础入门]: https://juejin.cn/post/6844903891977371662
