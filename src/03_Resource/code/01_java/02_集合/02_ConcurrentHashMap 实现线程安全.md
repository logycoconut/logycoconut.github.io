---
title: ConcurrentHashMap 实现线程安全
date: 2022-04-20
tag: [Java]
---

### 原理图

#### JDK1.7中的 ConcurrentHashMap

采用了分段锁的思想，将 HashMap 进行分隔，把 HashMap 中的哈希数组切分成小数组，每个小数组有 n 个 HashEntry 组成，其中小数组继承自 `ReentrantLock`，这个小数组名叫 `Segment`

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/java/ConcurrentHashMap%20java7%20%E9%94%81%E5%9B%BE.png)

#### JDK1.8中的改动

JDK1.8对 HashMap 做了改动，**当冲突链表长度超过8时，会将链表转化成红黑树**

1.8后取消了分段锁，采用 CAS + synchronized 来保证并发安全

synchronized 只锁定当前链表或者红黑树的首节点，只存节点 Hash 不冲突，就不会产生并发

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/java/ConcurrentHashMap%20java8%20%E9%94%81%E5%9B%BE.png)

### 参考链接

[面试必问之 ConcurrentHashMap 线程安全的具体实现方式](http://www.justdojava.com/2019/12/18/java-collection-15.1/)
