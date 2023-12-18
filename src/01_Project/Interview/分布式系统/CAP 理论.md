---
title: CAP 理论
tag: [CAP] 
---

> 【面试官：什么是 CAP 理论？为什么C.A.P 不能同时有？】 https://www.bilibili.com/video/BV1YM41197XX

分布式计算领域的公认定理

- C：Consistency

- A： Availability

- P： Partition Tolerance

#### 分区容错性 Partition Tolerance

```
"the system continues to operate despite arbitrary message loss or failure of part of the system"
```

一个节点挂掉不影响另一个节点对外提供服务

也就是说**分区容错性是分布式系统具备的基本能力**

#### 一致性 Consistency

```
"all nodes see the same data at the same time"
```

一旦数据更新完成并成功返回客户端，那么所有节点在同一时间的数据完全一致 

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/20231218142920.png)

*为了实现 C 并不是因为锁阻塞，而是因为等待从节点返回的 `ack` 阻塞
即使是单机架构多线程写的时候也要加锁，但是不用等待 `ack` 所以可以同时实现 CA

**存在的问题**

1. 由于存在数据同步的过程，写操作的响应会有一定的延迟（因为没有得到 `ACK` 响应）
3. 为了保证数据一致性会对资源暂时锁定，带数据同步完成释放锁定资源，此时有请求对该数据的操作会阻塞

#### 可用性 Availability

```
"Reads and writes always succeed"
```

所有请求都有响应，且不会出现响应超时或响应错误

### 为什么不能同时满足 ？

因为存在分区间的网络或者其他问题，C 和 A 不能同时满足，除非不采用集群

- 如果想满足 C（Consistency）
假设现在成功往 A 节点写入数据，但是两节点间通信出现问题，最新数据同步不到 B 节点，那么为了满足一致性，其他往 B 节点发起的请求就不能得到响应，此时满足不了**可用性**

- 如果想满足 A（Availability）
假设现在成功往 A 节点写入数据，但是两节点间通信出现问题，最新数据同步不到 B 节点，那么为了满足可用性，其他往 B 节点发起的请求就会立即得到响应，返回未更新的旧数据，此时满足不了**一致性**
