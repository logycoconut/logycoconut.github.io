---
title: MySQL 如何实现 ACID
tag: [MySQL] 
---

> 针对 `InnoDB` 引擎

`ACID`（`Atomicity`，`Consistency`，`Isolation`， `Durability` ） 是关系型数据库的重要特性
`MySQL` 也通过各种手段来实现了 `ACID`

### Isolation 隔离性

> 解释：并发访问数据库时，一个事务不被其他事务干扰

数据库中存在不同的隔离级别，不同的隔离级别也分别解决了脏读、不可重复读、幻读等问题
- 读未提交
- 读提交 `RC`
- 可重复读 `RR`（`InnoDB` 默认隔离级别）
- 串行化

**读请求的隔离**

在 `RC`、`RR` 隔离级别下，`InnoDB` 引擎通过 `MVCC` 来实现事务间数据的

**写请求的隔离**

### Atomicity 原子性

### Durability 持久性

主要是靠 `redo log`

`redo log` 有两个特点
- 大小固定，循环写
- crash-safe

`MySQL` 中有一个 `WAL`（`Write-Ahead Logging`） 技术

当有记录更新时，InnoDB 引擎就会把记录写到 redo log 中并更新内存，这个时候更新已经完成

### Consistency 一致性