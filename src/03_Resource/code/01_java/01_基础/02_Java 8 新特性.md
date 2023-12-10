---
title: Java 8 新特性
date: 2021-08-12
tag: [Java]
---

### **Lambda 表达式** 

也可称为闭包、Lambda 允许把函数作为一个方法的参数（函数作为参数传递到方法中）

```java
// 语法格式
( param ) -> expression 或 ( param ) -> { statements; }
```

### **方法引用** 

方法引用提供了非常有用的语法，可以直接引用已有 Java 类或对象（实例）的方法或构造器。与 Lambda 联合使用，方法引用可以使语言的构造更紧凑简洁，减少冗余代码

- **默认方法** − 默认方法就是一个在接口里面有了一个实现的方法

- **Stream API** −新添加的Stream API（java.util.stream） 把真正的函数式编程风格引入到Java中

  ```java
  // 集合元素通过管道的方式处理并得到最终结果
  +--------------------+       +------+   +------+   +---+   +-------+
  | stream of elements +-----> |filter+-> |sorted+-> |map+-> |collect|
  +--------------------+       +------+   +------+   +---+   +-------+
  ```

### **Date Time API** 

加强对日期与时间的处理

### **Optional 类** 

Optional 类已经成为 Java 8 类库的一部分，用来解决空指针异常

## 参考资料

[菜鸟教程 - Java8新特性](https://www.runoob.com/java/java8-new-features.html)
