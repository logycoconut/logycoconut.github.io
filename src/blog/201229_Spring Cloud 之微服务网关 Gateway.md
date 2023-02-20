---
title: Spring Cloud 之微服务网关 Gateway
date: 2020-12-29T11:03:06+08:00
draft: false
category: ["关于技术"]
tag: ["SpringCloud"]
---

> Spring Cloud Gateway 作为 Spring Cloud 生态系统中的网关，比 Netflix 的 Zuul 组件更加适合 Spring Cloud体系
>
> 大家一定要多看官方文档啊！！文档比我详细多了，本文只是一些简单的应用

## 为什么要用网关

网关是介于客户端和服务器之间的一层，外部请求会先经过网关这一层再转发到其他功能模块中

所以，我们可以在网关上进行鉴权、监控等操作，让业务模块更加专注于业务

- 只将网关对外暴露，隐藏微服务真实地址，保护微服务
- 在网关中进行鉴权操作，无须在业务代码中鉴权
- 避免了客户端和微服务直接接触 （ 在微服务变更时，重构难度会变大 ）

## 快速上手

### 添加依赖

网关本质上也是一个微服务，也需要在注册中心注册

```
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-gateway</artifactId>
    </dependency>
</dependencies>
```

### 相关代码

启动类代码

```
@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
```

application.yml 配置

```
server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true  # 是否要通过服务中心自动根据 serviceId 创建路由
          lower-case-service-id: true  #是否将服务id转换为小写
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
logging:
  level:
    org.springframework.cloud.gateway: debug
```

### 测试

#### 是否正确代理

网关转发的语法为`网关地址:端口/服务中心注册serviceId/具体的url`

我们通过访问 <http://localhost:10011/feign-provider/user/info> 发现可以得到正确结果

_feign-provider 是之前文章中创建的一个服务提供方_

#### 负载均衡

复制一份 provider 的启动配置并且对返回值进行适当的修改，我们可以看到不同的结果是交替出现的

## 路由规则匹配

我们现在知道了 gateway 自动根据 serviceId 创建路由的方式，但是怎么自定义路由规则呢

我们需要先清楚三个概念

- Route（路由）：它由一个 ID，一个目标 URI，一组断言和一组过滤器定义。如果断言为真，则路由匹配。
- Predicate（断言）：这是一个 Java 8 的 Predicate。输入类型是一个 ServerWebExchange。我们可以使用它来匹配来自 HTTP 请求的任何内容，例如 headers 或参数。
- Filter（过滤器）：GatewayFilter的实例，我们可以使用它修改请求和响应。

_[上述概念原文地址](https://cloud.spring.io/spring-cloud-gateway/reference/html/#glossary)，我是可耻的搬运工_

### 简单实现

```
server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      routes:
        - id: provider-service  # 路由的唯一Id
          uri: https://github.com/  # 目标服务地址
          predicates:  # 路由条件，接受一个输入参数，返回一个布尔值结果
            - Path=/logycoconut
```

上述配置的意思是：配置了一个名为`provider-service`的规则，当访问地址`http://localhost:10011/logycoconut`时会自动转发到地址`https://github.com/logycoconut`

这是路由匹配规则的一种，还有其他的可以参照文档，包括通过时间、Cookie、请求方式、请求参数等匹配

[路由规则拓展](https://cloud.spring.io/spring-cloud-gateway/reference/html/#gateway-request-predicates-factories)

## Gateway 中的 Filter

### 简单实现

#### 更改网关的配置文件

```
server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: false  # 是否要通过服务中心自动根据 serviceId 创建路由
          lower-case-service-id: false  #是否将服务id转换为小写
      routes:
        - id: provider-service  # 路由的唯一Id
          uri: lb://feign-provider  # 目标服务地址
          predicates:  # 路由条件，接受一个输入参数，返回一个布尔值结果
            - Path=/user/info
          filters:
            - AddRequestParameter=name, zhangsan
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
logging:
  level:
    org.springframework.cloud.gateway: debug
```

上述配置的意思是：将符合路径`/user/info`的请求都添加了`name=zhangsan`的请求参数

`lb://feign-provider`是Gateway Global Filter的一种运用，如果 URL 中具有 lb，就使用负载均衡客户端将 URL 解析成实际的地址加端口

#### 修改 provider 服务验证请求

```
@RestController
@RequestMapping("user")
public class ProviderController {

    @GetMapping("info")
    public String info(String name) {
        return "我叫张三，今年二十三" + name;
    }
}
```

## 相关源码地址

仅供参考

<https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/gateway>

## 参考资料

[Spring Cloud Gateway官方文档](https://cloud.spring.io/spring-cloud-gateway/reference/html/)

[spring cloud gateway 2 深入了解 - filter](https://www.jianshu.com/p/5e40bbc95eb9)  常用网关过滤器和全局过滤器介绍

[Spring Cloud Gateway 过滤器](https://www.haoyizebo.com/posts/1e919f7d/)  自定义过滤器
