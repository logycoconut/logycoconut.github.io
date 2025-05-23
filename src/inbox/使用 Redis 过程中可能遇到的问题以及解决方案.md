---
title: 使用 Redis 过程中可能遇到的问题以及解决方案
tag: [Redis] 
---

# 使用 Redis 过程中可能遇到的问题以及解决方案

### 背景

假设运营一个热门的社交应用，其中一个特色功能是允许用户在特定的活动期间，如音乐节、体育赛事或重大社会事件，通过一个实时动态墙来分享他们的体验和感受
这个功能鼓励用户发表短文、图片或视频来分享他们的即时体验

在这种场景下，Redis 用户缓存这些动态内容，以确保快速的内容加载和良好的用户体验
（设定 Redis 内存大小为 8 GB）

在大型活动期间，用户参与度急剧上升，成千上万的用户可能会在短时间内发表动态
这些动态可能包含文本、图片链接、视频链接，每个动态的数据量从几百字节到几十 KB 不等，视媒体内容而定

由于事件的热度，用户不仅频繁发布自己的动态，也积极浏览和互动他人的动态
这导致了对特定动态的高访问频率，增加了缓存层的负担

### 缓存过大的原因

- 高频写入操作
    在活动期间，新的动态以极高的速度被创建并推送到缓存中，导致了大量的写入操作
- 大量的媒体链接
    每个动态可能包含图片和视频链接，这些媒体内容虽然不直接存储在 Redis 中，但动态的元数据和链接仍然占用可观的空间
- 过期策略不足
    如果动态内容被设置了较长的过期时间，或在高峰期间定期删除策略未能及时清理过期数据，会导致缓存中积累了大量旧动态
- 访问模式导致的内存碎片
    频繁的写入和删除操作可能导致内存碎片，进一步减少有效的缓存空间

### 如何解决

在这里，我们需要明确 Redis 中过期键删除的一个概念
Redis 当中包含两种删除模式，惰性删除（访问时检查是否过期）以及定期删除（周期性地检查一小部分键是否过期），通过这两种删除模式的集合进行删除数据

所以我们明白，为什么明明设置了过期时间，但是 Redis 的占用还是比较高

**解决方案**
-  *调整定期删除策略的参数*

    Redis 定期删除过期键的行为是配置可控的，通过调整相关配置，可以增加检查过期键的频率
    例如，可以调整 HZ 配置项，这是 Redis 定期任务的执行频率，包括过期键的检查
    默认值通常为 10，意味着每秒执行 10 次定期任务，可以根据实际情况适当增加这个值，但是需要注意过高的值可能会增加 CPU 使用率

- *设置内存淘汰机制*

    Redis 默认的内存淘汰机制是 `noeviction`
    当这个策略被设置时，如果 Redis 的内存使用达到了配置的最大值（由 maxmemory 指令配置），Redis 将不会进行任何键的淘汰操作
    
    这意味着，当尝试执行会增加内存使用的命令（如设置新键）时，如果已满，Redis 会返回异常

在内存达到限制时，即使提高了渐进式删除的效率，也应考虑合适的内存淘汰策略，如 volatile-lru（从已设置过期时间的数据集中挑选最近最少使用的数据淘汰） 或 allkeys-lru（从所有数据集中挑选最近最少使用的数据淘汰），这样即使是在过期键未被及时删除时，也能确保内存的有效利用