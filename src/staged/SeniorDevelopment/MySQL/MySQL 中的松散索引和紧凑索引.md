---
title: MySQL 中的松散索引和紧凑索引
date: 2023-03-06T00:00:00.000Z
tag: [MySQL]
---

### 松散索引

根据官方文档的描述，当语句满足索引"最左原则"时就可以用到松散索引

在 explain 的 Extra 字段中出现了 using index for group-by 就代表了使用了松散索引

数据都是有序的，可以不进行排序直接 distinct，然后过滤其他字段

**例如**
`SELECT c1, c2 FROM t1 WHERE c3 = const GROUP BY c1, c2`
其中，索引为 `c1 c2 c3` 的联合索引
那我们在根据 c1 c2 的规则分组时，根据联合索引，我们有 c 1 c 2 的索引树

![](https://pic1.zhimg.com/v2-5fbf97a9cfa7ad2f14dfa6018c97a76c_b.jpg)

当查询初始化后，首先查询第一条索引记录，然后查询下一条prefix不同的记录，直到最后一条为止

#### 松散索引的使用条件

- 只能用于单表查询
- group by 中只能包含索引的 prefix
- 如果有 min、max，并且指向同一列，同时这列紧跟在 group list 之后
- 索引列中包含 varchar，并且索引定义中并未包含完整的 varchar 字段的，不能使用
- 组合索引是主键索引，则不能使用

### 紧凑索引

就像是进行了索引全表扫描

<https://donghy-coredumped.github.io/2019/08/15/MySQL%E4%B8%AD%E7%9A%84%E6%9D%BE%E6%95%A3%E7%B4%A2%E5%BC%95%E5%92%8C%E7%B4%A7%E5%87%91%E7%B4%A2%E5%BC%95/>

<https://zhuanlan.zhihu.com/p/486031152>
