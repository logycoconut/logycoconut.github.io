---
title: "Zuul的鉴权以及微服务的跨域问题"
date: 2020-02-02T20:56:41+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringBoot"]
---

> * SpringCloud采用了Zuul作为微服务的网口
> * Zuul网关为全部微服务提供唯一入口, 避免直接暴露接口, 后台服务更加安全
> * 对每个请求鉴权
> * 处理跨域请求

## 跨域请求处理

关于跨域问题, 现在一般都采用CORS方案(一个W3C标准)解决, 需要服务器和浏览器同时支持,但是开发者只需要关心服务器实现即可, 其他的都由浏览器完成

浏览器会在请求中加上一些头信息，例如Origin, 我们需要以此判断是否允许其跨域，然后在响应头中加入一些信息

SpringMVC内部实现了CORS的跨域过滤器 `CorsFilter` , 我们可以直接用, 编写代码将其注入到容器中即可


```
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        // 1.添加Cors配置信息
        CorsConfiguration config = new CorsConfiguration();
        // 1.1 允许的域
        config.addAllowedOrigin("http://example.com");
        // 1.2 是否发送Cookie信息
        config.setAllowCredentials(true);
        // 1.3 允许的请求方式
        config.addAllowedMethod("OPTIONS");
        config.addAllowedMethod("HEAD");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("DELETE");
        config.addAllowedMethod("PATCH");
        // 1.4允许的头信息
        config.addAllowedHeader("*");

        //2.添加映射路径，我们拦截一切请求
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration("/**", config);

        //3.返回新的CorsFilter.
        return new CorsFilter(configSource);
    }

}
```

---

## 请求鉴权

### 继承 ZuulFilter

原理就是对于每个经过网关的请求都进行过滤

编写Component继承 `ZuulFilter` 并实现接口方法

```
@Component
public class ExampleFilter extends ZuulFilter {

    /**
     * 过滤类别,:
     * pre：在请求被路由之前调用
     * routing: 路由请求时被调用
     * post: 在routing和error过滤器之后被调用
     * error: 处理请求时发生错误后被调用
     */
    @Override
    public String filterType() {
        return null;
    }

    /**
     * 过滤优先级
     */
    @Override
    public int filterOrder() {
        return 0;
    }

    /**
     * 判断是否进行过滤
     */
    @Override
    public boolean shouldFilter() {
        return false;
    }

    /**
     * 处理主要逻辑的地方, 例如进行登录判断, 日志记录等
     */
    @Override
    public Object run() throws ZuulException {
        return null;
    }
}
```

### Zuul配置中的一处坑

在鉴权服务中, 我们通常使用jwt来实现客户端的无状态登录, 所以需要向客户端中设置cookie信息

但是zuul内部有默认的过滤器, 会将请求和响应头信息过滤, 不允许设置敏感信息 ( 比如set-cookie )

**解决方案:**

在application.yml中配置

```
zuul:
  sensitive-headers:  # 配置禁止使用的头信息, 设置为null代表不禁止任何头信息
```