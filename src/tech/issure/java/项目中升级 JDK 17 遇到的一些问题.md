---
title: 项目中升级 JDK 17 遇到的一些问题
tag: [Java]
---

### 服务在容器中启动不了

升级到 `JDK 17` 后, 服务在 `K8S`  中启动遇到了一个问题

`java.lang.reflect.InaccessibleObjectException`

由于 `Java 17` 的模块化设计, 有些 `JDK` 的内部类不能被访问了, 例如 `lang` 包、`math` 包等

所以需要在 JVM Option 中增加特定参数

```java
--add-opens java.base/java.lang=ALL-UNNAMED
--add-opens java.base/java.util=ALL-UNNAMED
--add-opens java.base/java.nio=ALL-UNNAMED
--add-opens java.base/sun.nio.ch=ALL-UNNAMED
```

对于 `Docker` 应用来说, 则需要在启动的时候同样加上以上参数
_伪代码, 未经过测试_

```dockerfile
FROM openjdk11
COPY ./test.jar /test.jar
WORKDIR /app
ENV JAR_FILE="test.jar"
ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -jar --add-opens java.base/java.lang=ALL-UNNAMED --add-opens java.base/java.util=ALL-UNNAMED $JAR_FILE"  ]
```

### 一些框架对 JDK 17 的适配情况

- `Zookeeper:3.6.2`
