---
title: Redis 的大 Key 问题
tag: [] 
---

# Redis 的大 Key 问题

### 大 Key 标准

在一般的业务场景下（并发和容量要求都不大）
- 单个 String 的 value > 1MB 
-  容器 ds 元素数量超过  10000

