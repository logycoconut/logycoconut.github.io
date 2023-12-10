---
title: MySQL 中的 distinct 和 group by 哪个效率更高
index: false
date: 2023-03-06
tag: [MySQL]
---

### 先说结论

- 在语义相同，有索引的情况下：group by 和 distinct 都能使用索引，效率相同
- 在语义相同，无索引的情况下：distinct 效率高于 group by。原因是 distinct 和 group by都会进行分组操作，但是group by可能会进行排序，触发 filesort，导致 sql 执行效率低下

### distinct 和 group by 的语法区别

group by 可以进行单列去重，group by 的原理是先对结果进行分组排序，然后返回每组的第一条数据。且是根据 group by 的后续字段进行去重的

### 为什么在语义相同，有索引的情况下，`group by` 和 `distinct` 效率相同？

在大多数情况下， distinct 可以被看作是特殊的 group by ，它们的实现都基于分组操作，且都可以通过松散索引扫描、紧凑索引扫描来实现

### 在什么情况下，`group by`会进行排序操作？

在 MySQL8.0 之前，group by 默认会一句字段进行隐式排序

对于能利用索引的情况下，group by 不需要额外进行排序；但当无法利用索引排序时，MySQL 优化器就不得不选择通过使用临时表然后在排序的方式实现group by

当结果集的大小超过系统设置的临时表的大小时，MySQL会将临时表数据 copy 到磁盘上面在进行操作，语句的执行效率会变得很低

这也是MySQL 选择将此操作弃用的原因

同时也可以通过 order by null 的方式禁止隐式排序

[京东一面：MySQL 中的 distinct 和 group by 哪个效率更高？太刁钻了吧！](https://mp.weixin.qq.com/s/pyJ6g1qOadbjus6Ri7y1Xg)

[](https://mp.weixin.qq.com/s/pyJ6g1qOadbjus6Ri7y1Xg)<https://mp.weixin.qq.com/s/pyJ6g1qOadbjus6Ri7y1Xg>
