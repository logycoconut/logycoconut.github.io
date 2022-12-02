---
title: "Spring Cloud 之 OpenFeign的使用"
date: 2020-12-25T13:28:54+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringCloud"]
---

> 我们知道 RestTemplate 可以通过 url 甚至服务名进行消费，但是如果对于服务提供者的每一个服务都需要写上这么一段代码，不仅麻烦还很容易产生混乱，所以本文将要介绍Spring Cloud中的服务调用组件`Feign`

## 创建微服务中必要的三类角色

注册中心之前在[Spring Cloud 之 Eureka实现服务注册和发现](/2020/023_spring_cloud_notes_eureka/)中有过介绍，这里就不再累述

服务提供者和消费者模块有些变动，接下来开始展示

### 在服务提供服务中增加一个Api模块

里面放置公用的部分，比如说entity、api接口等

一般都是由服务提供方编写，毕竟服务提供方最熟悉自己的接口
```
public interface ProviderApi {

    /**
     * 提供服务模拟
     * @return String
     */
    @GetMapping("info")
    String info();
}
```

### 消费方增加FeignClient

1. 在 Application 上增加 @EnableFeignClients 注解开启 Feign 支持

2. 增加 UserClient，我们可以看到注解中有服务提供方的 application name， 以及请求地址的前缀

前缀和 @GetMapping 中的值结合起来就是服务提供方的请求路径

```
@FeignClient(value = "feign-provider", path = "user")
public interface ProviderClient extends ProviderApi { }
```

3. 现在我们可以在服务中消费`feign-provider`的服务啦

```
@RestController
@RequestMapping("user")
public class ConsumerController {

    @Autowired
    private ProviderClient providerClient;

    @GetMapping("consume")
    public String consume() {
        return providerClient.info();
    }

}
```

## 相关源码地址

仅供参考

https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign