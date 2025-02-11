---
title: 什么是 MVCC？
tag: [MySQL] 
---

> 针对 `MySQL` 数据库的 `innodb` 引擎
> 详细分析请看《MySQL 是怎么运行的：从根儿上理解 MySQL》中的 [MVCC 部分](https://relph1119.github.io/mysql-learning-notes/#/mysql/24-%E4%B8%80%E6%9D%A1%E8%AE%B0%E5%BD%95%E7%9A%84%E5%A4%9A%E5%B9%85%E9%9D%A2%E5%AD%94-%E4%BA%8B%E5%8A%A1%E7%9A%84%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E4%B8%8EMVCC)

### 基本概念

`MVCC`（`Multi-Version Concurrency Control` ，多版本并发控制）
指的是在 `RC`、`RR` 隔离级别下执行普通 `SELECT` 操作时访问记录的版本链的过程，这样子可以使不同事务的 `读-写`、`写-读` 操作并发执行，从而提高系统性能

### 实现原理

核心就在于 `undo log` 和 `ReadView`（一致性视图）
- 通过` undo log` 来保存多版本的数据
- 通过 `ReadView` 保存当前活跃的事务列表

首先我们知道使用 `innodb` 引擎的表中，它的聚簇索引记录会包含 3 个隐藏列
- `row_id`: 非必需，表中如果存在主键或非 `Null` 的 `Unique` 键时不包含：
- `trx_id`：当有事务对某条聚簇索引记录进行改动时，会把该事务的`事务 id` 赋值给 `trx_id`
- `roll_pointer`：每次对聚簇索引记录进行改动时，都会把旧的版本写入到 `undo 日志` 中，通过 `roll_pointer` 这个指针就可以找到该记录修改前的信息
*行的每一次改动都会生成 `undo log`，久而久之，就会形成一条版本链*
![图片来自 《MySQL是怎么运行的：从根儿上理解 MySQL》](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231221143106.png)

而 `ReadView` 呢，它最主要的目的就是**判断版本链中的哪个版本是当前事务可见的**
它包含 4 个重要的内容
- `m_ids`：生成 `ReadView` 时，活跃的读写事务的`事务 id` 列表
- `min_trx_id`：生成 `ReadView` 时，活跃的读写事务中最小的 `事务 id`，也就是 `m_ids` 的最新值
- `max_trx_id`：生成 `ReadView` 时，系统应该分配给下一个事务的 `id` 值
  max_trx_id并不是m_ids中的最大值
- `creator_trx_id`：生成该 `ReadView` 的事务的 `事务 id`
  只有在对表中的记录做改动时（执行 INSERT、DELETE、UPDATE 这些语句时）才会为事务分配事务 id，否则在一个只读事务中的事务 id 值都默认为 0
![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231221144107.png)

在执行 `SELECT` 语句时，`innodb` 引擎会生成一个 `ReadView`，随后按照特定的规则决定具体能看到数据的哪个版本
- 如果被访问记录的 `trx_id` 等于 `creator_trx_id`，则意味着当前事务在访问自己修改过的版本，可以被当前事务访问
- 如果被访问记录的 `trx_id` 小于 `min_trx_id`，则意味着在查询前事务已经提交，可以被当前事务访问
- 如果被访问记录的 `trx_id` 大于等于 `max_trx_id`，则意味着在生成 `ReaView` 后事务才开启，不可以被当前事务访问
- 如果被访问记录的 `trx_id` 在 `min_trx_id` 与 `max_trx_id` 之间
    - 在 `m_ids` 中，事务仍然活跃，不能被访问
    - 不在 `m_ids` 中，事务已经被提交，可以被访问

按照这个规则，如果某个版本的数据对当前事务不可见的话，那就顺着版本链找到上一个版本的数据，继续按照上述规则判断可见性，直到最后一个版本

### RC 和 RR 事务隔离级别的区别

直接说结论
- `RC`：每次读取数据前都生成一个 `ReadView`
- `RR`：只在事务第一次执行查询语句时才会生成一个 `ReadView`

所以，`RR` 隔离级别下，每次查询数据时用的都是同一个 `ReadView`，才能做到可重复读
而在 `RC` 隔离级别下，每次查询时，都可能有其他事务正常提交，导致 `ReadView` 中的 `max_trx_id` ，`m_ids` 发生变化，于是可以读取到已经提交的数据