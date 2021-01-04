---
title: "Spring Cloud 之 配置中心 Spring Cloud Config "
date: 2020-12-31T13:07:23+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringCloud"]
---

> 对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱
>
> 为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息


## 构建配置中心，从本地读取配置

新建一个 SpringBoot 项目，并导入依赖
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

使用 @EnableConfigServer 开启配置服务器
```
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

通过配置 spring.profile.active=native 来使配置中心从本地读取配置，读取的路径为 classpath 下的 shared 目录
```
server:
  port: 10013
spring:
  application:
    name: config-server
  profiles:
    active: native
  cloud:
    config:
      server:
        native:
          search-locations: classpath:/shared
```

在 resources 目录下新建 shared 文件夹，在 shared 文件夹下新建一个 config-client-dev.yml 文件
```
user:
  username: zhangsan
server:
  port: 8989
```

## 构建 Config Client 

新建一个 SpringBoot 项目，并导入依赖
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

在 resources 目录下新建 bootstrap.yml 文件

*bootstrap 由父 ApplicationContext 加载，比 applicaton 优先加载*

*boostrap 里面的属性不能被覆盖*
```
spring:
  application:
    name: config-client
  cloud:
    config:
      uri: http://localhost:10013
  profiles:
    active: dev
```

写一个测试接口，通过 @Value 注入配置中的信息，就像配置文件在本地一样，该怎么用就怎么用
```
@SpringBootApplication
@RestController
public class ConfigClientApplication {

    @Value("${user.username}")
    private String username;

    @GetMapping("/")
    public String home() {
        return username;
    }
    
    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication.class, args);
    }
}
```

启动服务，我们可以发现 client 服务的端口是 我们随意编写的 8989，访问 localhost:8989，可以得到结果 `zhangsan`

可见 config-client 成功地从 config-server 应用的 shared 目录 读取到 配置文件 config-client-dev.yml 中的 user.username 变量


## 构建配置中心，从Git仓库中读取配置

修改 config server 的配置文件 application.yml

仔细观察可以发现就是将配置文件路径换成 git 仓库

```
server:
  port: 10013
spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/logycoconut/config-example
```

上面是最简单的一种方式，这个仓库是公开仓库，配置信息不需要任何其他信息就可以读取到

但是，如果仓库是私有的话就得加入用户名密码等配置信息，相关信息如下表

| 配置 | 解释 |
|  ---  | ---  |
| spring.cloud.config.server.git.uri | git仓库地址 |
| spring.cloud.config.server.git.username | 访问仓库的用户名 |
| spring.cloud.config.server.git.password | 访问仓库的用户密码 |
| spring.cloud.config.server.git.search-paths | 仓库路径 |
| spring.cloud.config.server.git.basedir | 本地仓库路径 |
| spring.cloud.config.label | 仓库的分支 |

将我们的配置信息上传到仓库中，重启服务测试结果
![c1uxoH8veXEUR6K](https://i.loli.net/2021/01/04/c1uxoH8veXEUR6K.png)

## 将配置中心注册到Eureka

未完待续...