---
title: Spring 循环依赖
tag: [Spring] 
---

> 【第二次讲 Spring 循环依赖，时长 16 分钟，我保证每一秒都是精华】 https://www.bilibili.com/video/BV1ET4y1N7Sp
> 
> 大叔讲的非常清楚 !！
> 听不懂的建议反复观看

### 基本概念

- 在哪里获取 `Bean`？`Bean` 工厂 （`ObjectFactory`）

- `Bean` 工厂的 `Bean` 哪里来？从 `Bean` 仓库（单例池  `SingletonBeanRegistry`）中获取

### 一个简单 Bean 的创建和管理

- 获取 Bean，查看单例池中是否存在 A
- 单例池中存在，直接返回 A，不存在则实例化一个 A
- 为 A 对象填充属性（在例子中为 id 属性）
- 完成初始化，并放入单例池中

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231219183133.png)

### 稍复杂 Bean 的创建

- 获取 Bean，查看单例池中是否存在 A
- 单例池中存在，直接返回 A，不存在则实例化一个 A
- 为 A 对象填充属性（在例子中为 id 属性）
- A 中有 B 对象，查看单例池中是否存在 B
- 存在则直接返回 B，不存在则实例化一个 B
- 为 B 对象填充属性（在例子中为 name 属性）
- 完成 B 的初始化，并放入单例池中
- 完成 A 的初始化，并放入单例池中

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231219183201.png)

### 循环依赖

> 先前两个例子只需要一个单例池就可以完成 Bean 的创建与管理，下面来看一个稍微复杂的例子

`Object A` 与 `Object B` 存在相互引用的情况
如果还是按照上述步骤执行的话，那将会陷入无限实例化 `Object` 的循环中（因为单例池中始终没有所需要的 `Bean`）

***此时，我们增加一个半成品池子（二级缓存）***

- 获取 Bean，查看单例池中是否存在 A
- 单例池中存在，直接返回 A，不存在则实例化一个 A，将 A 放入半成品池子中
- 为 A 对象填充属性（在例子中为 id 属性）
- A 中有 B 对象，查看单例池中是否存在 B
- 存在则直接返回 B，不存在则实例化一个 B，将 B 放入半成品池子中
- 为 B 对象填充属性（在例子中为 name 属性）
- 为 B 对象填充属性 A，B 先在单例池中查找 A，ok 没有找到，继续在半成品池子中查找 A，此时可以查找到，完成填充
- 完成 B 的初始化，并放入单例池中，并移除半成品池中的 B
- 完成 A 的初始化，并放入单例池中，并移除半成品池中的 A

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231219183255.png)

### AOP 对象处理

> 按照上述的理论，我们已经成功地解决了 `Bean` 的循环依赖
> 但是为什么 `Spring` 中使用了三级缓存来解决循环依赖呢
> 
> 对咯，还存在着 `AOP` 代理的情况～

在存在代理的情况下，`Object A ` 中的属性 b 不应该真的是 `Object B`，而应该是 `Proxy B`

而二级缓存解决不了这个问题，所以引入了三级缓存

- *AOP 代理发生在 Bean 的初始化中，在 Bean 的后置处理中生成一个代理对象
（ BeanPostProcessor 的 postProcessAfterInitialization，调用 createProxy ）
- *AOP  处理器中还存在着方法 getEarlyBeanReference，在提前用到 A 对象时调用方法获取代理对象（不提前引用的情况下不会调用）*

**存在 AOP 代理的情况下，单例池中存放的是代理对象，而不是 Bean 本身!!!**

**具体步骤**
- 获取 Bean，查看单例池中是否存在 A
- 单例池中存在，直接返回 A，不存在则实例化一个 A，并创建一个 `Factory A` 放入工厂池中（`Factory A` 的作用就是用来调用 `getEarlyBeanReference` 方法获取代理对象）
- 为 A 对象填充属性（在例子中为 id 属性）
- A 中有 B 对象，查看单例池中是否存在 B
- 存在则直接返回 B，不存在则实例化一个 B，并创建一个 `Factory B` 放入工厂池中
- 为 B 对象填充属性（在例子中为 name 属性）
- 为 B 对象填充属性 A，B 先在单例池中查找 A，ok 没有找到，继续在半成品池子中查找 A，也没有，最终在工厂池中发现了 `Factory A`
- 此时满足了 `Proxy A` 提前引用的条件，调用 `getEarlyBeanReference` 方法获取代理对象 `Proxy A` 并放入半成品池子中，并且移除工厂池中的  `Factory A`
- 完成 B 的初始化，并放入单例池中，并移除工厂池中的  `Factory B`
- 完成 A 的初始化，并放入单例池中，并移除半成品池中的 `Proxy A`

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/tech/20231219183319.png)
