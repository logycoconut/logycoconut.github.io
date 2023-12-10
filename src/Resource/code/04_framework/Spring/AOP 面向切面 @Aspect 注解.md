---
title: AOP 面向切面 @Aspect 注解
tag: [ Spring, AOP, Aspect]
index: false
---

### @Pointcut 切面表达式的几种写法

> 只列我使用多的

#### 通配符表达式

#### execution

```java
@AfterReturning(pointcut="execution(* co.logycoconut.java.cheat.web.*.*(..))", returning = "result")
```

#### @annotation

```java
@AfterReturning(pointcut = "@annotation(controllerLog)", returning = "result")
```

### 切面表达式的参数匹配

Spring AOP 还提供了 AspectJ 的表达式语法,可以通过 argNames 直接获取注解参数

下列代码展示了两种不同的方式来获取注解上的信息

```java
@Slf4j
@Aspect
@Component
public class LogAspect {

    @Before(value = "@annotation(co.logycoconut.java.cheat.annotation.Log)")
    public void doAfterReturning(JoinPoint joinPoint) {
        MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
        Method method = methodSignature.getMethod();
        Log logAnno = method.getAnnotation(Log.class);

        log.info("before, title:{}", logAnno.title());
    }

    @AfterReturning(pointcut = "@annotation(controllerLog)", returning = "result")
    public void doAfterReturning(JoinPoint joinPoint, Log controllerLog, Object result) {
        log.info("after, title:{}", controllerLog.title());
        log.info("after, result:{}", result);
    }

}
```

### 参考链接

- [springboot 之 aop 切面 execution 表达式，@args，@annotation](https://juejin.cn/post/7031058380261163038)
