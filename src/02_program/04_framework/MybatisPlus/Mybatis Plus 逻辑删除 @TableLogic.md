---
title: Mybatis Plus 逻辑删除 @TableLogic
tag: [Mybatis Plus]
---

> [官方文档说明](https://baomidou.com/pages/6b03c5/)

### 前提条件

#### 步骤 1: 逻辑删除配置项

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: flag # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```

#### 步骤 2: 类字段注解

```java
@TableLogic
private Integer deleted;
```

### 对 SQL 行为做更改

> ⚠️ 注意, Mybatis Plus 框架提供的逻辑删除能力只对自动注入的 SQL 生效
>
> 也就是说, 在 xml 文件中自己写的 SQL 还是需要加上 `deleted = 0` 的

- 查找、更新

  会在 where 条件后追加条件过滤已删除数据

- 删除

  delete 语句转变为 update 语句

```sql
update user set deleted=1 where id = 1 and deleted=0
```

### 修改逻辑已删除值

在某些场景下, deleted 字段可能会被编织进唯一索引中,

那么当唯一数据被多次删除时, 就会违反唯一约束

但是, 在 MySQL 中, 当唯一索引的字段存在 NULL 时, 不会发生唯一性冲突

所以, 有时我们需要将逻辑已删除值设置为 NULL

- 增加下列注解属性值

```java
@TableLogic(delval="NULL")
private Integer deleted;
```

- 修改全局逻辑已删除值
