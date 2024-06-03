---
title: "SpringBoot 中定时任务的异步执行"
date: 2020-08-18T22:25:31+08:00
draft: false
category: ["关于技术"]
tag: ["SpringBoot", "Async"]
---

> Spring 的定时任务默认是单线程串行执行的, 那假设第一个任务比较耗时长, 直到超过任务二的设定时间之后才完成, 那么就会造成任务二不能及时完成, 进而造成其他问题

## 先来说说定时任务

开启对定时任务的支持, 在启动类上加上`@EnableScheduling`

```
// 启动类
@EnableScheduling
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 定时任务类
@Slf4j
@Service
public class ScheduledService {
    @Scheduled(fixedRate = 5000)
    public void scheduled1() {
        log.info("----{}----", Thread.currentThread().getName());
    }

    @Scheduled(cron = "0/5 * * * * *")
    public void scheduled2() {
        log.info("----{}----", Thread.currentThread().getName());
    }
}
```

运行可以看到定时任务都已经执行，并且使同一个线程中串行执行

![image.png](https://i.loli.net/2020/08/20/36FeR7hJVqcsmlf.png)

_注 : cron表达式的配置非常灵活, 但是刚接触的话会产生困惑, 可以用工具生成_

[在线生成cron表达式](https://www.bejson.com/othertools/cron/)

## 开启异步支持

`@EnableAsync`开启异步支持, 并在方法上加上`@Async`注解

```
// 启动类
@EnableAsync
@EnableScheduling
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 定时任务类
@Slf4j
@Service
public class ScheduledService {

    @Async
    @Scheduled(fixedRate = 5000)
    public void scheduled1() {
        log.info("----{}----", Thread.currentThread().getName());
    }

    @Async
    @Scheduled(cron = "0/5 * * * * *")
    public void scheduled2() {
        log.info("----{}----", Thread.currentThread().getName());
    }
}
```

重启项目，会发现每一个任务都是在不同的线程中运行

![image.png](https://i.loli.net/2020/08/20/IUnLSZ7xW5hN3qJ.png)
