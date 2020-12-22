---
title: "Spring Cloud 之 Eureka实现服务注册和发现"
date: 2020-12-22T21:27:30+08:00
draft: true
categories: ["关于技术"]
tags: ["SpringCloud"]
---

> 如果我们要去租房，我们可能首先要去找中介，中介手上有很多房源，我们能在中介这里找到自己需要的房源
>
> 而微服务体系中，也存在这么一个中介，就是服务注册与发现中心，它为服务的提供者和服务的消费者提供一个交流的平台，Provider可以在注册中心注册供其他服务使用，Consumer可以在注册中心中寻找自己需要的服务
>
> Eureka是Netflix开发的服务发现组件，Spring Cloud将它集成在其子项目spring-cloud-netflix中，以实现Spring Cloud的服务发现功能

## 简单实现

### 版本说明和依赖

- Java: 1.8
- Spring Boot: 2.3.2.RELEASE
- Spring Cloud: Hoxton.SR8

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>Hoxton.SR8</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    </dependency>
</dependencies>
```

### 创建注册中心

1. 给启动文件加上注解

```Java
@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
```

`@EnableEurekaServer` 表明启动一个注册中心节点

2. 新建 application.yml

```yml
spring:
  application:
    name: eureka-registry
server:
  port: 10010
eureka:
  client:
    register-with-eureka: false  # 不将自己注册到注册中心
    fetch-registry: false  # 不从eureka获取注册信息
    service-url:
      defaultZone: http://localhost:10010/eureka/  # 注册中心的访问地址
```

3. 运行 Application.java 文件，并访问 http://localhost:10010 （没有任何后缀）

### 创建服务提供者

1. 给启动文件加上注解

```Java
@EnableEurekaClient
@SpringBootApplication
public class EurekaProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaProviderApplication.class, args);
    }
}
```

`@EnableEurekaServer` 表明启动一个注册中心节点

2. 新建 application.yml

```yml
server:
  port: 10011
spring:
  application:
    name: eureka-provider
eureka:
  client:
    service-url:
      defaultZone: http://localhost:10010/eureka
```

3. 运行 Application.java 文件，并查看 http://localhost:10010 是否有提供商的注册信息

4. 创建一个简单的接口来模拟我们提供的服务

```Java
@RestController
@RequestMapping("user")
public class ProviderController {

    @GetMapping("info")
    public String info() {
        return "我叫张三，今年二十三";
    }
}
```

### 创建服务服务消费者

未完待续....
