---
title: MySQL 是怎样运行的：从根儿上理解 MySQL
tag: [MySQL]
---

> 《MySQL 是怎样运行的：从根儿上理解 MySQL》
> 电子版: <https://relph1119.github.io/mysql-learning-notes>

MySQL 中除了自己定义的列以外, 会为每个记录默认的添加一些列 (隐藏列)
Row_id
Transaction_id
Roll_pointer

MySQL 默认的行格式?

### 问题

#### 为什么一个页至少存放两条数据?

正常情况下, `B+ 树` 只需要很少的层级就可以存放千万级别数据, 并且有很快的查询速度

但是如果最底层那个存放真实数据的目录只存放了一条数据的话, 就会导致目录层级特别特别多, 费半天劲不停地深入只有一条记录

所以, `InnoDB` 规定, 一个数据页至少可以存放两条记录

> 🙋 _提问: 表中只有一个列时, 该列在不发生行溢出的情况下最多能存储多少字节? ([参考](https://relph1119.github.io/mysql-learning-notes/#/mysql/04-%E4%BB%8E%E4%B8%80%E6%9D%A1%E8%AE%B0%E5%BD%95%E8%AF%B4%E8%B5%B7-InnoDB%E8%AE%B0%E5%BD%95%E7%BB%93%E6%9E%84??id=%E8%A1%8C%E6%BA%A2%E5%87%BA%E7%9A%84%E4%B8%B4%E7%95%8C%E7%82%B9))_
