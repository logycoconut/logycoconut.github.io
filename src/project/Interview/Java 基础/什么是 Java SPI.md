---
title: 什么是 Java SPI
tag: [Java, SPI] 
---

> 【10 分钟让你彻底明白 Java SPI，附实例代码演示】 https://www.bilibili.com/video/BV1RY4y1v7mN

### 简介

`SPI` 全称 `Service Provider Interface`

由三个组件构成

- Service
- Service Provider
- ServiceLoader

ServiceLoader（服务发现&加载） --> 加载 Service Provider

### 应用

`JDBC`（`Java DataBase Connectivity`）

一开始我们是这么使用数据库驱动的

```java
Class.forName("com.mysql.jdbc.Driver")

Class.forName("oracle.jdbc.driver.OracleDriver")
```

那能不能直接把这些写在配置文件中呢？那就不用修改代码了

```yaml
app.yaml:
    driver-name: com.mysql.jdbc.Driver
```

似乎还是有点麻烦，因为还得记住这些驱动的名字
能不能让驱动提供方提供配置文件（比方说将其放在 `Jar` 包中），我们约定好方式统一去一个地方加载这些配置呢？

呐，这就是 `SPI` 啦

### Java SPI 的三大规范要素

#### 规范的配置文件

- 文件路径
必须在 `Jar` 包中的 `META-INF/services` 目录下

- 文件名称
`Service` 接口的全限定名

- 文件内容
`Service` 实现类（即 `Service Provider`）的全限定名
如果有多个实现类，那么每一个实现类在文件中单独占据一行

#### `Service Provider` 类必须有无参的构造方法

因为需要通过反射技术实例化它时，是不带参数的

```java
Class.forName().newInstance()
```

#### 保证能加载到配置文件和 Service Provider 类

- 将 `Service Provider` 的 `Jar` 包放到 `classpath` 中（常用）

```xml
<dependencies>
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.28</version>
    </dependency>
</dependencies>

```

### Java SPI 与 SpringBoot 自动配置