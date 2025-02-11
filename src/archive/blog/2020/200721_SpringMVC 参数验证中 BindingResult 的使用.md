---
title: "SpringMVC 参数验证中 BindingResult 的使用"
date: 2020-07-21T21:53:43+08:00
draft: false
category: ["关于技术"]
tag: ["SpringMVC"]
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

![](https://i.loli.net/2020/07/22/yJE6iKFXaMrlwkp.png)

#### 控制台信息：

![](https://i.loli.net/2020/07/22/tGa2AP9plj8zhmM.png)

异常并没有被抛出，在 web 层中获取了参数验证错误信息并在控制台打印了出来

---

### ② 参数中没有BindingResult

#### 返回结果：

![](https://i.loli.net/2020/07/22/jtQ5w7zX1vLVRlZ.png)

#### 控制台信息：

![](https://i.loli.net/2020/07/22/NJ1xmvYwZXDIioM.png)

抛出参数校验异常，框架为我们返回了一段信息，平时我们可以通过捕获全局异常的方式将校验异常包装到我们自定义的异常中，取出错误信息并与错误代码一起返回
