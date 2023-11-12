---
title: PostgreSQL 中 distinct on 用法
tag: [PostgreSQL]
---

### 背景

根据某列的数据进行去重之后的查询

### distinct on 用法

可以简单的理解成 `group by` 之后然后取分组第一行?

#### 准备 SQL

```SQL
create table class_teacher_info  
(  
    id serial not null primary key,  
    class_id int not null,  
    teacher_id int not null  
);  
  
insert into class_teacher_info (class_id, teacher_id) values (1, 1);  
insert into class_teacher_info (class_id, teacher_id) values (1, 2);  
insert into class_teacher_info (class_id, teacher_id) values (1, 3);  
insert into class_teacher_info (class_id, teacher_id) values (1, 4);  
insert into class_teacher_info (class_id, teacher_id) values (1, 5);  
insert into class_teacher_info (class_id, teacher_id) values (2, 6);  
insert into class_teacher_info (class_id, teacher_id) values (2, 7);  
insert into class_teacher_info (class_id, teacher_id) values (2, 8);  
insert into class_teacher_info (class_id, teacher_id) values (2, 9);  
insert into class_teacher_info (class_id, teacher_id) values (2, 10);
```

#### 查询语句

```sql
SELECT distinct on (class_id) teacher_id FROM class_teacher_info;

SELECT distinct on (class_id) teacher_id FROM class_teacher_info order by class_id, teacher_id desc
```

诶? 我怎么写了两条 `SQL`, 这两条 `SQL` 有区别吗?

那当然有, 先读一下 `PostgreSQL` 的[官方文档](https://www.postgresql.org/docs/12/queries-select-lists.html#QUERIES-DISTINCT)

从文档中可知, 输出中只保留以`  distinct on ` 条件分组的该组行的第一行, **但是第一行是不可预测的**

如果我们想确定结果, 可以在 `SQL` 后面拼接各种 `where`、`order` 条件
