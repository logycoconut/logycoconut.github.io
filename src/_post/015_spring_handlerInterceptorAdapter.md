---
title: "SpringBoot实现自己的拦截器"
date: 2020-08-12T21:14:02+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringBoot"]
---

> 在Web开发中，我们经常需要对请求拦截并做一些动作，比如日志记录、权限检测或者性能检测等

## HandlerInterceptor

SpringMVC中提供了`HandlerInterceptor`接口, 我们来大致看一下它的源码 ( **省略参数和异常以方便阅读** )

```
public interface HandlerInterceptor {
    // 请求处理之前调用, 当此方法返回true时才执行后续代码, 否则流程中断
    default boolean preHandle() { return true; }

    // 请求处理之后调用
    default void postHandle() { }  
    
    // 请求完成之后调用, 一般用于资源的清理
    default void afterCompletion() { }
}
```

## HandlerInterceptorAdapter

有时候我们只需要在请求前拦截, 也就是只需要实现`preHandle`方法, 对于之后流程并不关心, 但是`HandlerInterceptor`接口需要我们同时实现三个接口, 所以Spring为我们提供了`HandlerInterceptorAdapter`类, 我们可以选择只复写需要的方法

**我们来看看源码 ( 省略参数和异常以方便阅读 )**

```
public abstract class HandlerInterceptorAdapter implements AsyncHandlerInterceptor {

	@Override
	public boolean preHandle() { return true; }

	@Override
	public void postHandle() {}

	@Override
	public void afterCompletion() {}

	@Override
	public void afterConcurrentHandlingStarted(){}

}
```

## 权限检测场景

项目中有些接口需要对请求方进行登录检测, 检测通过之后才能访问
所以我们可能需要写一个登录的拦截器, 在请求处理之前进行检测

```
// 伪代码，主要是为了演示
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String cookieValue = CookieUtils.getCookieValue(request, cookieName);

        try {
            // 用公钥解析cookie中携带的token信息
            JwtUtils.parseToken(configuration.getPublicKey(), cookieValue);
            return true;
        } catch (Exception e) {
            throw new CommonException(CodeStatus.FORBIDDEN);
        }
    }
    
}
```

---

## 还有最重要的一步

当然是将我们的拦截器交由给Spring管理, 不然不会生效

```
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Bean
    public LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor()).addPathPatterns("/**");
    }
}

```

