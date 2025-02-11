---
title: Spring Cloud 之配置中心 Spring Cloud Config
date: 2020-12-31T13:07:23+08:00
draft: false
category: ["关于技术"]
tag: ["SpringCloud"]
---

> 对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱
>
> 为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息

## 构建配置中心，从本地读取配置

1、新建一个 SpringBoot 项目，并导入依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

2、使用 @EnableConfigServer 开启配置服务器

```
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

3、通过配置 spring.profile.active=native 来使配置中心从本地读取配置，读取的路径为 classpath 下的 shared 目录

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

4、在 resources 目录下新建 shared 文件夹，在 shared 文件夹下新建一个 config-client-dev.yml 文件

```
user:
  username: zhangsan
server:
  port: 8989
```

## 构建 Config Client

1、新建一个 SpringBoot 项目，并导入依赖

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

2、在 resources 目录下新建 bootstrap.yml 文件

_bootstrap 由父 ApplicationContext 加载，比 applicaton 优先加载_

_boostrap 里面的属性不能被覆盖_

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

3、写一个测试接口，通过 @Value 注入配置中的信息，就像配置文件在本地一样，该怎么用就怎么用

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

4、启动服务，我们可以发现 client 服务的端口是 我们随意编写的 8989，访问 localhost:8989，可以得到结果 `zhangsan`

可见 config-client 成功地从 config-server 应用的 shared 目录 读取到 配置文件 config-client-dev.yml 中的 user.username 变量

## 构建配置中心，从Git仓库中读取配置

1、修改 config server 的配置文件 application.yml

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

| 配置                                          | 解释        |
| ------------------------------------------- | --------- |
| spring.cloud.config.server.git.uri          | git仓库地址   |
| spring.cloud.config.server.git.username     | 访问仓库的用户名  |
| spring.cloud.config.server.git.password     | 访问仓库的用户密码 |
| spring.cloud.config.server.git.search-paths | 仓库路径      |
| spring.cloud.config.server.git.basedir      | 本地仓库路径    |
| spring.cloud.config.label                   | 仓库的分支     |

2、将我们的配置信息上传到仓库中，重启服务测试结果
![c1uxoH8veXEUR6K](https://i.loli.net/2021/01/04/c1uxoH8veXEUR6K.png)

## 实现自动刷新

目前，我们只实现了对配置文件的统一管理，但是还没有实现实时更新，如果我们在 git 仓库里面的配置文件有改动，本地还是需要重启服务才能接收到最新配置，那和我们在本地修改有啥区别呢？

所以我们来修改 config-client 项目以达到刷新的效果

1、引入 spring-boot-starter-actuator 包

```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

2、增加相关配置

```
management:
  endpoint:
    shutdown:
      enabled: true  # 开启这个之后，我们向 /actuator/shutdown 发送 POST 请求可以优雅的关闭应用
  endpoints:
    web:
      exposure:
        include: "*"  # 需要开启的端点，* 表示开启所有端口，这里主要用到的是 refresh 这个端点，我们可以访问 /actuator 查看开启的节点
```

3、在需要读取配置的类上增加 @RefreshScope 注解

```
@SpringBootApplication
@RestController
@RefreshScope
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

4、最后一步，我们修改一下放在仓库中的配置文件，并向 <http://127.0.0.1:8989/actuator/refresh> 发送一个 POST 请求，这个接口就是用来触发加载新配置的

![zOAYjbc6EW4qRfo](https://i.loli.net/2021/01/06/zOAYjbc6EW4qRfo.png)

好，我们可以访问 localhost:8989 发现结果已经变了，但是好像还是有点不对，说好的自动刷新呢，这不是手动发送一个请求吗

别急，以 Gitee 为例，我们可以通过这个钩子函数在仓库有 push 操作后向 actuator/refresh 发送 POST 请求，但是这个地址要是可以被 gitee 访问到的。同样的，github 也有类似的webhook可供调用

![AnJxOZU4vtcThmr](https://i.loli.net/2021/01/06/AnJxOZU4vtcThmr.png)

## 使用 Spring Cloud Bus 来刷新多个客户端

单个服务我们可以为其配置 Webhook，但是应用多了之后再一个个配置未免太麻烦，Spring Cloud Bus 就是为此而生，它可以在微服务节点之间进行广播，通知状态的更改（例如配置更改）

我们通过 Spring Cloud Bus 将所有节点连接在一起，当有一个节点触发了更新配置后，Spring Cloud Bus 就会将此事件更新到其他节点

以下步骤都是在 client 端操作

1、搭建 RabbitMQ 环境

我是通过 docker 快速搭了一个

2、在 client 引入依赖

```
<dependency>
   <groupId>org.springframework.cloud</groupId>
   <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

3、增加 RabbitMQ 相关配置

```
spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
```

4、启动两个 client 服务进行测试

复制一份 client 的启动配置，并且加上不同的启动端口

![23BUPtn9KmVvONk](https://i.loli.net/2021/01/06/23BUPtn9KmVvONk.png)

5、POST 访问任意一个 client 的 actuator/bus-refresh 地址

查看控制台输出，会看到这两个服务都有类似的日志输出，表示配置已经刷新

![z4l8VoaCj965mEf](https://i.loli.net/2021/01/06/z4l8VoaCj965mEf.png)

## 将配置中心注册到Eureka

1、启动一个 Eureka 注册中心

之前我们已经介绍过 Eureka 的相关知识，所以这里不再累述

2、配置 Config 服务端

加入 Eureka 依赖

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

加入配置

```
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
```

启动类增加 @EnableEurekaClient 注解

```
@EnableEurekaClient
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

3、配置 Config 客户端

前三步和 Config 服务端类似，现在我们的 client 配置文件是这样的

```
spring:
  application:
    name: config-client
  cloud:
    config:
      uri: http://localhost:10013
  profiles:
    active: dev
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
management:
  endpoint:
    shutdown:
      enabled: true  # 开启这个之后，我们向 /actuator/shutdown 发送 POST 请求可以优雅的关闭应用
  endpoints:
    web:
      exposure:
        include: "*"  # 需要开启的端点，* 表示开启所有端口，这里主要用到的是 refresh 这个端点，我们可以访问 /actuator 查看开启的节点
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
```

接入注册中心后，配置客户端和配置服务端不应该再通过固定的 http 地址通信了，而是应该通过服务名

改造 spring.cloud.config 配置

```
  cloud:
    config:
      discovery:
        enabled: true  # 开启Config服务发现支持
        service-id: config-server  # 配置中心服务器的服务名
```

ok，重启服务试试是不是和之前一样呢

## 相关源码地址

仅供参考

<https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/config>
