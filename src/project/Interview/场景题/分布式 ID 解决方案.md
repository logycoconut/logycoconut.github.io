---
title: 分布式 ID 解决方案
tag: [分布式ID] 
---

>  [京东二面：为什么需要分布式ID？你项目中是怎么做的？](https://mp.weixin.qq.com/s/GRi2zP-7nlWHFFBzl3G2YQ)

## 什么是分布式 ID

`ID` 就是数据的唯一标识，而 `分布式 ID` 就是分布式系统下的 `ID`

举一个简单的例子
业务初期使用的是单机的 `MySQL`，随着用户的增长，后期可能需要进行分库分表
在分库分表之后，数据就遍布在不同服务器上的数据库了，数据库的自增主键已经没办法满足生成的 `主键唯一` 了

这个时候，就需要 `分布式 ID` 了，保障业务 `ID` 不冲突

**分布式 ID 需要满足以下几点要求：**
- `全局唯一`
- `高性能`：生成速度要快，对本地资源消耗要小
- `高可用`：生成 `分布式 ID` 的服务要保证可用性无限接近 `100%`
- `安全`：不包含敏感信息
- `有序递增`：如果要把 `ID` 存放在数据库的话，`ID` 的有序性可以提升数据库的写入速度
    有时我们可能需要根据 `ID` 进行排序
- `有具体的业务含义`：方便问题定位
- `独立部署`：生成 `ID` 的服务可以和业务相关的服务解耦（虽然带来了网络调用消耗增加的问题，但是总体来说还是很有必要的）

## 分布式 ID 常见解决方案

### 数据库

#### 数据库主键自增

通过数据库自带的能力来生成 `ID`，通过一台 `MySQL` 机器来生成多系统的 `分布式 ID`

优点在于实现起来简单并且 `ID` 有序递增
但是缺点也显而易见，支持的并发量不大，每次获取 `ID` 都要访问一次数据库，增加了对数据库的压力，获取速度也慢，还会暴露自己业务的量级（`ID` 是数字、有序递增的）

#### 数据库号段模式

数据库主键自增这种模式在 ID 需求量大的时候，肯定是不行的
那如果我们批量获取，存在内存里面，需要用的时候直接在内存中拿不就快了吗？

这就是 `基于数据库的号段模式来生成分布式 ID`

**例如**

- 创建一个数据库表

```mysql
CREATE TABLE `sequence_id_generator` (  
  `id` int(10) NOT NULL,  
  `current_max_id` bigint(20) NOT NULL COMMENT '当前最大id',  
  `step` int(10) NOT NULL COMMENT '号段的长度',  
  `version` int(20) NOT NULL COMMENT '版本号',  
  `biz_type`    int(20) NOT NULL COMMENT '业务类型',  
   PRIMARY KEY (`id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

主要通过 `current_max_id` 和 `step` 字段来批量获取 `ID`
一次性获取的 `ID` 范围是：`current_max_id ～ current_max_id + step`

- 先插入一行数据

```mysql
INSERT INTO `sequence_id_generator` (`id`, `current_max_id`, `step`, `version`, `biz_type`)  
VALUES 
(1, 0, 100, 0, 101);
```

- 通过 `SELECT` 获取指定业务下的批量唯一 `ID`

```mysql
SELECT `current_max_id`, `step`,`version` FROM `sequence_id_generator` where `biz_type` = 101
```

```bash
id current_max_id step version biz_type  
1 0 100 0 101
```

- 不够用的话更新一下即可

```mysql

UPDATE sequence_id_generator SET current_max_id = current_max_id+100, version=version+1 WHERE version = 0  AND `biz_type` = 101  
SELECT `current_max_id`, `step`,`version` FROM `sequence_id_generator` where `biz_type` = 101

```

```bash
id current_max_id step version biz_type  
1 100 100 1 101
```

可以看出号段模式对于数据库的访问次数更少，所以数据库的压力也更小

#### NoSQL（Redis）

通过 `Redis` 的 `incr` 命令即可对 `id` 进行原子顺序递增

```bash
127.0.0.1:6379> set sequence_id_biz_type 1  
OK  
127.0.0.1:6379> incr sequence_id_biz_type  
(integer) 2  
127.0.0.1:6379> get sequence_id_biz_type  
"2"
```

### 算法

#### UUID

`UUID` 是 128 位的 16 进制数字（32 个字符），生成规则包含 `MAC` 地址、时间戳、名字空间（Namespace）、随机数、时序等元素，计算机基于这些规则生成的 `UUID` 是肯定不会重复的

看似 `UUID` 是一个不错的`分布式 ID`解决方案对吗，但实际上我们很少用它

- `UUID` 的位数太大，需要消耗 128 位，太占空间
- `UUID` 是无顺序的, 插入数据库时会造成很大的压力（*主键无序严重影响索引* ）

#### Snowflake（雪花算法）

雪花算法是推特开源的分布式 ID 生成算法，由 64 位的 2 进制数字组成

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20240118162826.png)

除了基本的时间戳、机器信息之外，还有 12 位的序列号，代表了每毫秒可以产生 4096（2^12） 个 `ID`

雪花算法生成速度快、生成的 ID 有序递增、比较灵活（可以对算法进行简单的改造，例如加入业务 ID），但是可能会有重复 ID 问题（ID 生成依赖时间，但是服务器可能存在时间回拨问题，倒退到之前的时间）

*可以了解一下 `改良版雪花算法`，对上述问题做了一些优化*

### 开源框架

- `UidGenerator` 百度
- `Leaf` 美团
- `Tinyid` 滴滴
- IdGenerator