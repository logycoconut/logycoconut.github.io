---
title: "SpringMVC之HandlerMethodArgumentResolver实现数据绑定"
date: 2020-06-30T22:47:48+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringMVC"]
---

> 更优雅的将传入的信息转化成自定义的实体

## SpringMVC数据绑定

先贴一段代码 ( 需要`Lombok`包 )

```
// User实体类
@Data
@AllArgsConstructor
public class User {
    String name;
    String password;
}

// UserController
// http://localhost:8888/user/info?name=jack&password=123
@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping("info")
    public void getUser(User user) {
        System.out.println(user);
    }

}
```

SpringMVC会自动将请求中的参数赋值给对象中的同名属性, 实现数据绑定

## 对方法参数处理

### 实现`HandlerMethodArgumentResolver`接口对参数处理

> 数据绑定很好用, 但是我们不可能每次请求都带上User的参数, 在日常开发中, 我们一般是根据cookie来判断请求的身份

```
// 用于演示的伪代码, 不可用于生产环境
public class UserArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        // 当参数类型等于User类型时执行下面的resolveArgument方法
        return User.class == methodParameter.getParameterType();
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        HttpServletRequest request = nativeWebRequest.getNativeRequest(HttpServletRequest.class);

        // 获取token值
        String token = getCookieValue(request, cookieName);
        
        // 根据token获取对应用户
        return userService.getByToken(token);
    }
}
```

这样就能通过cookie获得user对象, 并传入controller的方法参数中

### 对带有特定注解的参数处理

```
// 新增一个注解类
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface UserAnno {
}

// 将UserArgumentResolver中的supportsParameter方法改造
@Override
public boolean supportsParameter(MethodParameter methodParameter) {
    return methodParameter.hasParameterAnnotation(UserAnno.class);
}

// 在Controller层方法参数前加@UserAnno注解
@GetMapping("info")
public void getUser(@UserAnno User user) {
    System.out.println(user);
}
```

这样会获得和上述一样的效果

### 将解析器添加到WebConfig 
**不然SpringMVC不知道这个解析器, 导致参数处理不生效**
```
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public UserArgumentResolver userArgumentResolver() {
        return new UserArgumentResolver();
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
        argumentResolvers.add(userArgumentResolver());
    }
```

