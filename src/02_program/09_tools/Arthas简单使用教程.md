---
title: Arthas简单使用教程
date: 2021-10-17
tag: [Arthas]
---

## 常用命令

### `cls` 命令行清空

### `jad` 反编译代码

可以查看运行的代码是否是最新的代码

- `jad --source-only {package}.{ClassName}` 只打印出反编译后的源代码

- `jad {package}.{ClassName}` 打印出反编译后的源代码以及ClassLoader、Location

### `watch` 观察函数

举个例子

```bash
# 观察 UserController 的所有函数, 返回值为 {入参、抛出异常}, 当第一个入参为0时打印, 默认展开2层
watch com.example.demo.arthas.user.UserController * '{params, throwExp}' 'params[0]==0' -x 2

1. 第一个参数是类名，支持通配
2. 第二个参数是函数名，支持通配
3. 第三个参数是返回值表达式
4. 第四个参数是条件表达式
```

- 返回值表达式 （ `ognl` 表达式）

  具体含义 [](https://arthas.aliyun.com/doc/advice-class.html)<https://arthas.aliyun.com/doc/advice-class.html>

  - loader
  - clazz
  - method
  - target
  - params
  - returnObj
  - throwExp
  - isBefore
  - isThrow
  - isReturn

### 热部署代码

适用于一些简单的代码改动，无需重新提交代码并发布

1. 反编译代码并输出到tmp目录

   `jad --source-only com.example.demo.arthas.user.UserController > /tmp/UserController.java`

2. 通过 vim 修改 `/tmp/UserController.java` 文件

3. 查询 `UserController` 的 `ClassLoader`

   ```bash
   $ sc -d *UserController | grep classLoaderHash
    classLoaderHash   1be6f5c3
   ```

   由此可知 `classLoaderHash` 为 1be6f5c3

4. 使用mc(Memory Compiler)命令来编译，并且通过-c或者--classLoaderClass参数指定ClassLoader

   ```bash
   # 指定 classLoaderClass
   mc --classLoaderClass org.springframework.boot.loader.LaunchedURLClassLoader /tmp/UserController.java -d /tmp
   # 指定 classLoaderHash
   mc -c 1be6f5c3 /tmp/UserController.java -d /tmp

   # -d 指定编译后的Class文件路径（Class存在全路径包名下）
   ```

5. 重新加载编译好的Class文件

   `redefine /tmp/com/example/demo/arthas/user/UserController.class`

### `tt` 时空隧道

`tt` 命令可以理解为 `watch` 命令的增强，它可以将一组方法的调用都记录下来，通过索引查看当时的调用情况

官方的文档已经很详细了，我就不再抄一遍了 😊

- 查看调用信息 `tt -id INDEX`
- 重做一次调用 `tt -i INDEX -p`

## 常用参数

```bash
-x 表示输出结果的属性遍历深度， 默认为1，最大为4
```

## Idea插件

arthas-idea 汪小哥

生成arthas命令的神器

## 参考资料

[Arthas 官方文档][]

​​<!-- +++++++++ 下面是引用式链接 +++++++++ -->

[Arthas 官方文档][<https://arthas.aliyun.com/doc/quick-start.html>]
