---
title: ConcurrentHashMap 实现线程安全
date: 2022-04-20
tag: [Java]
---

### 原理图

#### JDK1.7中的ConcurrentHashMap

采用了分段锁的思想，将HashMap进行分隔，把HashMap中的哈希数组切分成小数组，每个小数组有n个HashEntry组成，其中小数组继承自`ReentrantLock`，这个小数组名叫`Segment`

![](https://knowledge-img-1304942245.cos.ap-shanghai.myqcloud.com/1650806954360-e2db8e3c-d9f0-4ab6-a1af-ac826e4d503f.png)

#### JDK1.8中的改动

JDK1.8对HashMap做了改动，**当冲突链表长度超过8时，会将链表转化成红黑树**

1.8后取消了分段锁，采用CAS + synchronized来保证并发安全

synchronized只锁定当前链表或者红黑树的首节点，只存节点Hash不冲突，就不会产生并发

![](https://knowledge-img-1304942245.cos.ap-shanghai.myqcloud.com/1650807133890-eb0bf7b7-416e-45e9-89e2-7977412fdaa1.png)

### 参考链接

[面试必问之 ConcurrentHashMap 线程安全的具体实现方式](http://www.justdojava.com/2019/12/18/java-collection-15.1/)
