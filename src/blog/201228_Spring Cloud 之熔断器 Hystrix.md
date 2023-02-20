---
title: Spring Cloud 之熔断器 Hystrix
date: 2020-12-28T16:25:28+08:00
draft: false
category: ["关于技术"]
tag: ["SpringCloud"]
---

> 在微服务架构中，通常会使用 Feign 来进行服务间的相互调用，一个请求，可能需要调用多个微服务接口才能实现，会形成非常复杂的调用链路
>
> 我们假设以下场景，如果服务提供方突然宕机或者出现网络问题，那消费方就会迟迟收不到回应，处理的线程得不到释放，随着请求的增加，服务器的资源也会逐渐耗尽，导致服务瘫痪
>
> 因为服务间的依赖性，整个微服务体系就会发生雪崩

Hystix 应运而生，它可以在服务提供方故障的时候，隔离远程服务，快速响应结果，防止出现级联失败

## 在 Feign 上使用熔断器

在不使用 Feign 的前提下也是可以使用 Hystrix 的，需要的可以自行了解，本文介绍的是 Feign 和 Hystrix 结合使用的情况

1. 开启 Hystrix 配置

```
feign:
  hystrix:
    enabled: true
```

2. 为 client 指定一个失败回调的类

```
@FeignClient(value = "feign-provider", path = "user", fallback = ProviderClientFallback.class)
public interface ProviderClient extends ProviderApi { }
```

3. 当发生服务熔断或者降级的情况时，会返回回调类中相同签名的方法的值

```
@Component
public class ProviderClientFallback implements ProviderClient {
    @Override
    public String info() {
        return "调用失败";
    }
}
```

## 相关源码地址

仅供参考

<https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign>
