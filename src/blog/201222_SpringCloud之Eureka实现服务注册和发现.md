---
title: "Spring Cloud 之 Eureka实现服务注册和发现"
date: 2020-12-22T21:27:30+08:00
draft: false
category: ["关于技术"]
tag: ["SpringCloud"]
---

> 如果我们要去租房，我们可能首先要去找中介，中介手上有很多房源，我们能在中介这里找到自己需要的房源
>
> 而微服务体系中，也存在这么一个中介，就是服务注册与发现中心，它为服务的提供者和服务的消费者提供一个交流的平台，Provider可以在注册中心注册供其他服务使用，Consumer可以在注册中心中寻找自己需要的服务
>
> Eureka 是 Netflix 开发的服务发现组件，Spring Cloud 将它集成在其子项目spring-cloud-netflix中，以实现 Spring Cloud 的服务发现功能

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

3. 运行 Application.java 文件，并访问 <http://localhost:10010> （没有任何后缀）

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

3. 运行 Application.java 文件，并查看 <http://localhost:10010> 是否有提供商的注册信息

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

1. 给启动文件加上注解并注入RestTemplate

```Java
@EnableEurekaClient
@SpringBootApplication
public class EurekaConsumerApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(EurekaConsumerApplication.class, args);
    }

    /**
     * 启用负载均衡, 使得 RestTemplate 可以直接通过服务名找到对应的IP地址
     */
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
```

2. 新建 application.yml

```yml
server:
  port: 10012
spring:
  application:
    name: eureka-consumer
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
```

3. 创建一个简单的接口来模拟消费服务

```Java
@RestController
@RequestMapping("user")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String APPLICATION_NAME = "eureka-provider";

    @GetMapping("consume")
    public String consume() {
        String providerUrl = "http://" + APPLICATION_NAME + "/user/info";
        return this.restTemplate.getForObject(providerUrl, String.class);
    }

}
```

4. 请求consume方法可以看到成功返回数据

5. 我们可以provider服务的方法中加入打印日志，并同时启动两个provider服务，查看控制台信息，验证负载均衡功能

![GXPeplQ4VS79CTW](https://i.loli.net/2020/12/24/GXPeplQ4VS79CTW.png)

![oDFIB4sjkuTezyL](https://i.loli.net/2020/12/24/oDFIB4sjkuTezyL.png)

## Eureka实现高可用

实现高可用的关建就是运行多台Eureka服务器并让他们相互注册，并让其他服务都注册到这些注册中心

### 修改注册中心配置

```
spring:
  profiles: eureka-registry1
  application:
    name: eureka-registry1
server:
  port: 10010
eureka:
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://localhost:10009/eureka  # 注册到 eureka-registry2 上

---

spring:
  profiles: eureka-registry2
  application:
    name: eureka-registry2
server:
  port: 10009
eureka:
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://localhost:10010/eureka  # 注册到 eureka-registry1 上
```

在idea的Services栏中复制一份注册中心的启动配置

![微信截图_20201225113543.png](https://i.loli.net/2020/12/25/6xjV4yhogvaYmHL.png)

修改profiles参数

![微信截图_20201225113610.png](https://i.loli.net/2020/12/25/qZGuwPynCVR1mbM.png)

### 修改服务提供者和消费者的配置

就是在client服务中添加所有的server地址, 但是要注意的是client1配置server1, server2，client2配置server2, server1

client会优先从第一个开始找，找到能连通的就从那里同步数据，找不到会继续找一直到最后。如果前面的server挂掉了，就找后面的server， 这样才能达到高可用的目的

```
eureka:
  client:
    service-url:
      defaultZone: http://localhost:10010/eureka, http://localhost:10009/eureka
```

## 相关源码地址

仅供参考

<https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/eureka>
