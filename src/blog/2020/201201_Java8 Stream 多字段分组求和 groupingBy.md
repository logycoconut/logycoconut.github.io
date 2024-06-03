---
title: "Java8 Stream 多字段分组求和groupingBy"
date: 2020-12-01T10:33:55+08:00
draft: false
category: ["关于技术"]
tag: ["Java8", "Stream"]
---

> 对流中的数据进行分组求和

## 例子

`Collectors.groupingBy` 最重要的一个参数 `Function<? super T,? extends K> classifier` ，它代表了 map 的 key

```java
List<String> items = Arrays.asList("apple", "apple", "banana",
        "apple", "orange", "banana", "papaya");

Map<String, Long> result = items
        .stream()
        .collect(Collectors.groupingBy(Function.identity(),
                Collectors.counting()));

System.out.println(result);

// 运行结果
{papaya=1, orange=1, banana=2, apple=3}
```

比如说我们有 A、B、C 三个仓库，每个仓库都有货品的库存（比如桌子、凳子、数据线），现在我们需要统计所有货品的库存，我们就需要对三个仓库都进行统计

```java
// 伪代码，不可用于生产环境
List<Goods> goodslist = new ArrayList<>();

Map<String, Long> map = items.stream()
    .collect(Collectors.groupingBy(Goods::getName,
                                   Collectors.summingInt(good -> Goods::getStock)));
System.out.println(map);

// 运行结果
{
    "桌子": 23,
    "椅子": 46,
    "数据线": 46
}
```

## 参考资料

[Java8 Stream多字段分组求和groupingBy](https://www.jianshu.com/p/dd5121c8fa89)

[介绍 Java 8 groupingBy Collector](https://blog.csdn.net/neweastsun/article/details/89504811)
