---
title: "Spring Cloud 之 配置中心Spring Cloud Config "
date: 2020-12-31T13:07:23+08:00
draft: true
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

使用 @EnableConfigServer 开启配置服务器。
```
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
```

通过 spring.profile.active=native 来配置 Config Server 从 本地读取配置，读取的路径为 Classpath 下的 shared 目录
```
server:
  port: 8769
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

在 resources 里新增一个 shared 文件夹


## 构建 Config-Client 

```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>


@EnableConfigServer
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

