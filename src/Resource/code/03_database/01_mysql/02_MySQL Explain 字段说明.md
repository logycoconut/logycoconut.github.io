---
title:  MySQL Explain 字段说明
tag: [MySQL]
---

## Explain 字段中 type 字段效率对比

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/code/mysql/20230724212815.png)

### Const

主键或 UNIQUE 唯一索引，最多只会返回一条

### System

![](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/code/mysql/explain.png)
在 const 的基础上，如果表里只有一条数据，那就是 system

属于 const 的一种特殊情况

不会出现在 innoDB 中，在 MyISAM 中会出现

### Eq_ref

通常发生在联表查询中，关联的条件为某一张表的主键或 UNIQUE 唯一非空索引

效率仅次于 system 和 const

### Ref

满足索引的最左原则，同事并不走主键或者 UNIQUE

对于非聚簇索引，通常为 ref

### Ref_or_null

在 ref 的基础上增加 null 值的查询

由于查询 null 值需要扫描整个索引数中的行信息

### Index_merge

对于多个索引分别进行条件扫描，然后对结果进行并集、交集、或两者的组合

### Unique_subquery 和 index_subquery

在 MySQL 的 Service 服务层会对 SQL 进行优化，所以在存储引擎层不会在出现了

在这之后的 type 尽量不要出现，效率不高

### Range

范围查询

### Index 和 all

都是全表扫描，区别在于 index 值需要查询索引数就能拿到结果 all 还需要遍历所有行

## Explain 字段中 Extra

介绍几种常用的

![Untitled 2.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/code/mysql/20230724212858.png)

### Using index

想查找的数据都在索引树中，不需要回表再去查询聚簇索引

这样就可以减少不必要的查询，从而提升查询效率

### Using index condition

索引下推 ICP Index Condition Pushdown

主要用在联合索引中

如果搜索时需要大量回表，在回表之前，会先把处理过滤逻辑 “下推” 到存储引擎中进行，过滤整理后才发到 Server 层进行处理

减少了发给 Server 层的数据量和次数，提升效率

### Using where

和 ICP 相对所有过滤动作都由 Server 层处理，效率比较低

查询的列没有被索引覆盖

### Using MRR

Multi-Range Read

对二级索引查询时，会先对二级索引的查询结果缓存并进行排序，然后统一去聚簇索引中回表查询

这样就可以把随机 IO 优化成顺序 IO，提升效率

默认关闭，需要手动开启 mrr_cost_based

### Using join buffer (Block Nested Loop BNL)

主要发生在 A B 两表关联查询，A 的关联列上有索引而 B 的没有，就会发生 BNL 优化

步骤：

1. 从 A 表中取 10 条数据放在 Join Buffer 内存空间中
2. 全表扫描 B 表和 Join Buffer 中这 10行关联
3. 循环这一步，直到 A 表所有数据关联完

虽说减少了 B 表的扫描次数，但还是很慢

### Using join buffer (Batched Key Access BKA)

在 BNL 的基础上，如果 B 表有索引，则会配合 MRR 将 JoinBuffer 中的行进行排序后去 B 表对应索引中查，无需全表扫描

默认关闭

### Using union（indexs）

多个查询条件都是索引，就会对索引进行合并

### Using temporary

查询过程中用到了临时表

比如 group by、dinstinct、union

### Using filesort

通常出现在 order by 中

可以通过优化避免

比如条件和排序两个字端组成联合索引，定位到条件后，排序字端本身就是有序的，就不需要额外排序了
