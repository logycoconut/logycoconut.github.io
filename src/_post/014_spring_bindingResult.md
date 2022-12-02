---
title: "SpringMVC的参数验证中BindingResult的使用"
date: 2020-07-21T21:53:43+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringMVC"]
---

> 在不需要统一处理异常时使用

## 代码示例

### 创建实体类

```
@Data
public class User {
    @NotNull(message = "用户名不能为空")
    private String name;
    @NotEmpty(message = "密码不能是空值")
    private String password;
}
```

### 编写WEB层代码

```
@Slf4j
@RestController
@RequestMapping("user")
public class UserController {

    @GetMapping("login1")
    public String login1(@Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            result.getAllErrors()
                    .forEach(error -> log.info(error.getDefaultMessage()));
        }
        return "登录成功";
    }

    @GetMapping("login2")
    public String login2(@Valid User user) {
        return "登录成功";
    }
    
}
```

## 结果对比

### ① 参数中有BindingResult

#### 返回结果：

![yJE6iKFXaMrlwkp](https://i.loli.net/2020/07/22/yJE6iKFXaMrlwkp.png)

#### 控制台信息：

![tGa2AP9plj8zhmM](https://i.loli.net/2020/07/22/tGa2AP9plj8zhmM.png)

异常并没有被捕获，我们在web层中获取了参数验证错误信息并在控制台打印了出来

---

### ② 参数中没有BindingResult

#### 返回结果：

![jtQ5w7zX1vLVRlZ](https://i.loli.net/2020/07/22/jtQ5w7zX1vLVRlZ.png)

#### 控制台信息：

![NJ1xmvYwZXDIioM](https://i.loli.net/2020/07/22/NJ1xmvYwZXDIioM.png)

抛出参数校验异常，框架为我们返回了一段信息，平时我们可以通过捕获全局异常的方式将校验异常包装到我们自定义的异常中，取出错误信息并与错误代码一起返回
