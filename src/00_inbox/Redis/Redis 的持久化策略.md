---
title: Redis 的持久化策略
index: false
date: 2023-03-28T00:00:00.000Z
tag: []
---

## RDB

默认配置
1 10 10000
900 300 60

fork 一个子进程进行

## AOF

记录所有的写入操作

统一都记录到 aof_buf 里面最后在写入 aof 文件中

appendfsync 配置

- always
- everysec
- no 由操作系统决定什么时候写入

## AOF 重写

用于以下场景

- 精简多余操作

```
set key 1
set key 2
set key 3
```

其实最终结果就是

```
set key 3
```

- 将多个指令合并为一个

```
rpush key1 1
rpush key1 2
```

```
rpush key1 1，2
```

但是，在重写 AOF 的过程中，可能会有新的指令进来，所以需要一个 aof 重写缓冲区，把后来进来的写命令同时 copy 一份到重写缓冲区中
在 aof 文件重写完成后，将 aof 重写缓冲区的命令再写入新的 aof 文件中，最后重命名新的 aof 文件，替换掉旧的 aof 文件

### AOF 重写步骤

1. fork 子进程进行重写工作
2. 重写过程中如果有写命令，需要同时 copy 一份到 aof 重写缓冲区中
3. 重写完成后，将 aof 重写缓冲区的命令写到新 aof 文件中
4. 重命名新 aof 文件，替换掉旧的 aof 文件

<https://www.cnblogs.com/xuanyuan/p/13689484.html>
