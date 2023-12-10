---
title: Java 的逃逸分析
tag: [JVM, 逃逸分析]
---

> 请看原文: [深入理解Java中的逃逸分析](https://juejin.cn/post/6844903639308304397)

Java 源代码变成计算机可执行的机器指令的过程中, 会经过两段编译

1. 将 .java 文件转化成 .class 文件
2. .class 文件转换成机器指令

在新版 JDK 中, Java 代码的编译引入了 JIT 技术

当 JVM 发现某个方法、代码块运行特别频繁时, 会认定这是 "热点代码", JIT 就会将这部分代码翻译成机器码, 并进行优化, 然后再把翻译后的机器码缓存起来, 以备下次使用

### 逃逸分析

编译器可以做如下优化

- 同步省略

  如果一个对象被发现只能从一个线程被访问到, 那么对于这个对象的操作可以不考虑同步

- 将堆分配转化为栈分配

  如果一个对象在方法中被分配, 不会逃逸出方法, 那么就可能被优化成栈上分配

- 分离对象 / 标量替换

  > 标量: 指一个无法再分解成更小的数据的数据
  > 可以将 Java 对象理解成一个聚合量

  如果对象不会逃逸, JIT 就不会创建对象, 而是直接使用标量

  例如

```java
// before
private static void alloc() { 
    Point point = new Point（1,2）; 
    System.out.println("point.x="+point.x+"; point.y="+point.y); 
}

// after
private static void alloc() {
   int x = 1;
   int y = 2;
   System.out.println("point.x="+x+"; point.y="+y);
}
```
