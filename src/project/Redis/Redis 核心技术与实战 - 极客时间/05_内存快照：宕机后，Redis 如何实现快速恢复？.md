---
title: 05_内存快照：宕机后，Redis 如何实现快速恢复？
tag: [Redis] 
category: [Redis 核心技术与实战] 
---

之前谈论过 Redis 避免数据丢失的 AOF 方法，这个方法的好处是，每次执行只需要记录操作命令，需要持久化的数据量不大
一般来说，只要采用的不是 `always` 持久化策略，就不会对性能造成太大影响

但是，也正因为记录的是操作命令，而不是实际的数据，所以，用 AOF 方法进行故障恢复的时候，需要逐一把操作日志都执行一遍。如果操作日志非常多，Redis 就会恢复的很慢很慢，影响到正常使用
这当然不是理想的结果，那么有没有既可以保证可靠性，还能在宕机时实现快速恢复的其他方法呢？

这就是今天要一起学习的另一种持久化方法：**内存快照**
所谓内存快照，就是指内存中的数据在某一个时刻的状态记录
类似于照片，当你给朋友拍照时，一张照片就能把朋友一瞬间的形象完全记下来

对 Redis 来说，它实现类似照片记录效果的方式，就是把某一时刻的状态以文件的形式写到磁盘上，也就是快照。这样一来，即使宕机，快照文件也不会丢失，数据的可靠性也就得到了保证
这个快照文件就称为 RDB 文件（Redis DataBase）

与 AOF 相比，RDB 记录的是某一时刻的数据，并不是操作，所以，在做数据恢复时，我们可以直接把 RDB 文件读入内存，很快地完成恢复
听起来好像很不错，但内存快照也并不是最优选项

我们还要考虑两个关键问题
- 对哪些数据做快照？这关系到快照的执行效率问题
- 做快照时，数据还能被增删改吗？这关系到 Redis 是否被阻塞，能否同时正常处理请求

### 给那些内存数据做快照？

Redis 的数据都在内存中，为了提供所有数据的可靠性保证，它执行的是**全量快照**
也就是说，把内存中的所有数据都记录到磁盘中，这样做的好处是一次性记录所有数据，一个都不少

但是，给内存中的全量数据做快照，把它们全部写入磁盘也会花费很多时间，而且，全量数据越多，RDB 文件就越大，往磁盘上写数据的时间开销就越大

对于 Redis 而言，它的单线程模型就决定了，我们要尽量避免所有会阻塞主线程的操作，所以，针对任何操作，我们都会提一个灵魂问题："它会阻塞主线程吗"
RDB 文件的生成是否会阻塞主线程，这就关系到是否会降低 Redis 的性能

Redis 提供了两个命令来生成 RDB 文件，分别是 save 和 bgsave
- save：在主线程中执行，会导致阻塞
- bgsave：创建一个子进程，专门用于写入 RDB 文件，避免了主线程的阻塞，这也是 Redis RDB 文件生成的默认配置

我们通过 bgsave 命令来执行全量快照，这既提供了数据的可靠性保证，也避免了对 Redis 的性能影响

接下来我们要关注的问题是，在对内存数据做快照时，这些数据还能动吗？也就是说，这些数据还能被修改吗？
如果数据能够被修改，那就意味着 Redis 还能正常处理写操作，否则，所有写操作都得等到快照完了才能执行，性能一下子就降低了

### 快照时数据能修改吗？

在给别人拍照时，一旦对方动了，那么这张照片就拍糊了，我们就需要重拍，所以我们当然希望对方保持不动。对于内存快照而言，我们也不希望数据“动”

举个例子，我们在时刻 t 给内存做快照，假设内存数据量是 4GB，磁盘的写入带宽是 0.2GB/s，简单来说，至少需要 20s 才能做完
如果在时刻 t+5s 时，一个还没有被写入磁盘的内存数据 A，被修改成了 A’，那么就会破坏快照的完整性，因为 A’不是时刻 t 时的状态
因此，和拍照类似，我们在做快照时也不希望数据“动”，也就是不能被修改

但是，如果快照执行期间数据不能被修改，是会有潜在问题的
对于刚才的例子来说，在做快照的 20s 时间里，如果这 4GB 的数据都不能被修改，Redis 就不能处理对这些数据的写操作，那无疑就会给业务服务造成巨大的影响

我们可能会想，可以用 `bgsave` 避免阻塞啊
这里就有一个常见的误区，**避免阻塞和正常处理读写操作并不是一回事**
此时，主线程的确没有阻塞，可以正常接收请求，但是为了保证快照完整性，它只能处理读操作，因为不能修改正在执行的快照数据

为了快照而暂停写操作，肯定是不能接受的
所以这个时候，Redis 就会借助操作系统提供的**写时复制技术（Copy-On-Write， COW）**，在执行快照的同时，正常处理写操作

简单来说，bgsave 子进程是由主线程 fork 生成的，可以共享主线程的所有内存数据
bgsave 子进程运行后，开始读取主线程的内存数据，并把它们写入 RDB 文件

此时，如果主线程对这些数据也都是读操作，那么主线程和 bgsave 子进程互不影响，但是如果主线程要修改一块数据，那么，这块数据就会被复制一份，生成该数据的副本。然后，主线程在这个数据副本上进行修改。同时，bgsave 子进程可以继续把原来的数据写入 RDB 文件

![写时复制机制保证快照期间数据可修改](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20240229141532.png)

这既保证了快照的完整性，也允许主线程同时对数据进行修改，避免了对正常业务的影响

### 可以每秒做一次快照吗？

对于快照来说，所谓"连拍"就是指连续地做快照，这样一来，快照时间间隔就会变得很短，即使某一时刻发生宕机了，因为上一时刻快照刚执行，丢失的数据也不会太多
但是，这其中的快照间隔时间就很关键了

如下图所示，我们先在 T0 时刻做了一次快照，然后又在 T0+t 时刻做了一次快照，在这期间，数据块 5 和 9 被修改了。如果在 t 这段时间内，机器宕机了，那么只能按照 T0 时刻的快照进行恢复
此时数据块 5 和 9 的修改值因为没有快照记录，就无法恢复了

![快照机制下的数据丢失](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20240229142156.png)

所以，要想尽可能恢复数据，t 值就要尽可能小
那么 t 值可以小到什么程度呢？比如说是不是可以每秒做一次快照？毕竟每次快照都是由 bgsave 子进程在后台执行，也不会阻塞主线程

虽然 bgsave 执行时不阻塞主线程，但是如果频繁地执行全量快照，也会带来两方面的开销
- 频繁地将全量数据写入磁盘，会给磁盘带来很大压力，多个快照竞争有限的磁盘带宽，前一个快照还没有做完，后一个又开始做了，容易造成恶性循环
- bgsave 子进程需要通过 fork 操作从主线程创建出来。虽然子进程在创建后不会再阻塞主线程，但是，fork 这个创建过程本身会阻塞主线程，而且主线程的内存越大，阻塞时间越长。如果频繁 fork 出 bgsave 子进程，这就会频繁阻塞主线程了
    *所以，在 Redis 中如果有一个 bgsave 在运行，就不会再启动第二个 bgsave 子进程*

那么，有什么其他好方法吗？

此时我们可以做增量快照，所谓增量快照，就是指做了一次全量快照后，后续的快照只对修改的数据进行快照记录，这样就可以避免每次全量快照的开销

在第一次做完全量快照后，T1 和 T2 时刻如果再做快照，我们只需要将被修改的数据写入快照文件就行
但是这么做的前提是，我们需要记住哪些数据被修改了，它需要我们使用额外的元数据去记录哪些数据被修改了，这会带来额外的空间开销

如果我们对每一个键值对的修改，都做个记录，那么如果有 1 万个被修改的键值对，我们就需要 1 万条额外的记录
有时候键值对非常小，比如只有 32 字节，而记录它被修改的元数据信息，可能就需要 8 字节
为了记住"修改"，引入的额外空间开销比较大，这对于内存宝贵的 Redis 来说，有些得不偿失

![增量快照示意图](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20240229143241.png)

到这里，我们发现，虽然和 AOF 相比，快照的恢复速度快，但是，快照的频率不好把握
如果频率太低，两次快照间一旦宕机，就可能有比较多的数据丢失
如果频率太高，又会产生额外开销

那么，还有什么方法既可以利用 RDB 的快速恢复，又能以较小的开销做到尽量少丢数据呢？

Redis 4.0 提出了一个**混合使用 AOF 日志和内存快照**的方法，即内存快照以一定的频率执行，在两次快照之间，使用 AOF 日志记录这期间的所有命令操作

这样一来，快照不用很频繁地执行，这就避免了频繁 fork 对主线程的影响，而且 AOF 日志也只用记录两次快照间的操作，也就是说，不需要记录所有操作了，因此，就不会出现文件过大的情况了，也可以避免重写开销

如下图所示，T1 和 T2 时刻的修改，用 AOF 日志记录，等到第二次做全量快照时，就可以清空 AOF 日志，因为此时的修改都已经记录到快照中了，恢复时就不用再用日志了

![内存快照和AOF混合使用](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20240229144356.png)
