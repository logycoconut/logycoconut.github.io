---
title: "Spring Cloud 之 Spring Cloud Stream "
date: 2021-01-16T14:40:00+08:00
draft: true
categories: ["关于技术"]
tags: ["SpringCloud"]
---

> Spring Cloud Stream 是 Spring Cloud 体系中的消息中间件组件，它集成了 kafka 和 rabbitMQ
>
> 它屏蔽掉了底层不同消息中间件之间的差异，降低了学习成本和维护成本 (就像我们用 ORM 框架来取代直接操作数据库一样)

## 快速上手

编写代码之前我们需要搭建一个 rabbitMQ 环境，这里不再累述

### 构建消息生产者 stream-producer 

1. 引入依赖
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-stream-rabbit</artifactId>
</dependency>
```

2. 创建启动类
```
@SpringBootApplication
public class StreamProducerApplication {
    public static void main(String[] args) {
        SpringApplication.run(StreamProducerApplication.class, args);
    }
}
```

3. 配置文件
```
server:
  port: 10011
spring:
  application:
    name: stream-producer
  rabbitmq:  # 我们的 rabbitMQ 配置
    host: 47.96.146.241
    port: 5672
    username: guest
    password: guest
    virtual-host: /
  cloud:
    stream:
      bindings:
        output:  # 该属性的值就是 org.springframework.cloud.stream.messaging.Source 中的 @Output("output") 注解的 value 值
          destination: steam.message  # 绑定的交换机名称
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
```

4. 编写发送消息的类
```
@Component
@EnableBinding(Source.class)
public class MessageProducer {

    @Autowired
    private Source source;

    public void send(String message) {
        source.output().send(MessageBuilder.withPayload(message).build());
    }

}
```