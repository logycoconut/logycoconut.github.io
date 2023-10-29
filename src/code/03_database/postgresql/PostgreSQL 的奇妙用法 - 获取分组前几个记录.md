---
title: PostgreSQL 的奇妙用法 - 获取分组前几个记录
tag: []
---

### 背景

在以某列为 group 条件分组下获取随机个记录

### 数据构造

```sql
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
insert into class_teacher_info (class_id, teacher_id) values (2, 1);  
insert into class_teacher_info (class_id, teacher_id) values (2, 2);  
insert into class_teacher_info (class_id, teacher_id) values (2, 3);  
insert into class_teacher_info (class_id, teacher_id) values (2, 4);  
insert into class_teacher_info (class_id, teacher_id) values (2, 5);
```

### 获取分组前 n 个记录

```sql
SELECT class_id, teacher_id  
FROM (SELECT class_id,  
             teacher_id,  
             ROW_NUMBER() OVER(PARTITION BY class_id ORDER BY RANDOM()) AS rn  
      FROM class_teacher_info  
      WHERE class_id IN (1, 2)) t  
WHERE rn <= 3  
ORDER BY class_id;
```
