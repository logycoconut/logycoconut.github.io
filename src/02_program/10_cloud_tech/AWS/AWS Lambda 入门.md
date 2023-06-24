---
title: AWS Lambda 入门
date: 2023-06-18
tag: [AWS, Serverless]
---

## 什么是 AWS Lambda

### 计算服务的演进

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230624223939.png)

**基础云架构 -> 容器技术兴起 -> Serverless 无服务器架构**

### AWS Lambda 应运而生

> Serverless 的概念最早提出于 2008 年 (Google APP Engine)
> 但直到 2014 年 Amazon 推出 AWS Lambda 才开始被关注

Serverless, 字面意思是 "无服务器"

本质上 Serverless 依然属于云服务的范畴, 但是 Serverless 直接将传统云服务的 "租算力" 变成了 "租服务"

#### AWS Lambda VS AWS EC 2

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230619015052.png)

#### Lambda 优势

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230620014235.png)

- 无需维护 (特指物理机器的维护)
  只关心你的代码, 不需要考虑服务器

- 天然高可用, 自动伸缩
  得益于 AWS 的高可用架构, Lambda 在监测到流量变大之后, 会自动扩展
  并且这一切都在处在账户的并发限制中, 不会无限制的扩张, 导致成本上升

- 按照调用付费, 降低成本, 不需要为闲置付费

- **用自定义逻辑扩展其他 AWS 服务**

#### Lambda 使用场景

| AWS 组件      | 参考场景           |
| ----------- | -------------- |
| S 3         | 图片压缩、视频转码、内容审查 |
| SQS         | 消息推送           |
| DynamoDB    | 数据校验、筛选        |
| API Gateway | 微服务接口提供        |
| ...         | ...            |

AWS Lambda 在 AWS 整个版图中占非常重要的位置

通过 Lambda 服务, 用户可以将 AWS 中的很多服务串在起来, 相互来调用

_Lambda 提供了 17 个官方应用的触发器以及几十个三方的触发器 (通过 Event Bridge 触发)_

#### [Lambda 的收费标准](https://aws.amazon.com/cn/lambda/pricing/)

> 使用 Lambda 的又一个很重要的理由

Lambda 的调用十分便宜, 收费主要取决于两个因素

- 为函数分配的内存量 (介于 128 MB - 10240 MB 之间)
- 函数的执行时间 (介于 1 s - 15 min 之间)

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230619012957.png)

## Lambda 编程模型、并发控制

### 编程模型

_以 Java 语言为例_
![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230619021142.png)

```xml
<dependency>
    <groupId>com.amazonaws</groupId>
    <artifactId>aws-lambda-java-core</artifactId>
</dependency>
```

### [并发控制](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/lambda-concurrency.html)

**并发**是 AWS Lambda 函数同时处理的正在进行的请求数

对于每个并发请求，Lambda 会预置单独的执行环境实例。当函数收到更多请求时，Lambda 会自动处理执行环境数量的扩展，直到达到账户的并发限制 (默认为单区域 1000),  并且也可以 [申请增加限额](http://aws.amazon.com/premiumsupport/knowledge-center/lambda-concurrency-limit-increase/)，或者为关键函数增加单独并发控制

#### 预留并发

预留并发保证了函数的最大并发实例数。当一个函数有预留并发时，任何其他函数都不可以使用该并发

#### 预置并发

预配置并发可初始化请求数量的执行环境，使其准备好立即响应函数的调用。该配置会让账户**产生费用**

#### 突增并发

对于最初的流量突增，在一个区域中的累积并发数量可以达到 1000 (不同区域数量不同) 的初始级别

在初始突增之后，函数的并发可按每分钟增加 500 个实例的速度扩展。这将一直持续到有足够的实例来服务所有请求，或者直到达到并发限制。当请求进入的速度超过函数可扩展的速度，或者当函数处于最大并发时，其他请求会因限制错误而失败。

![image.png](https://cdn.jsdelivr.net/gh/logycoconut/pic-repo/aws/lambda/20230619023009.png)

_请求减少，并且在空闲一段时间后，函数的未使用实例会停止。未使用的实例在等待请求时会被冻结，**且不会产生任何费用**_

## 使用展示

### 简单 String 处理

### 使用 Amazon S 3 触发器创建缩略图

- 创建定义 Lambda 函数权限的 IAM Policy, 该函数必须具有以下权限
  - 从指定 S 3 桶获取对象
  - 将对象写入到指定 S 3 桶
  - 将日志写入 Amazon CloudWatch Logs

_具体策略 Json 如下:_

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "logs:PutLogEvents",
                "logs:CreateLogGroup",
                "logs:CreateLogStream"
            ],
            "Resource": "arn:aws:logs:*:*:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject"
            ],
            "Resource": "arn:aws:s3:::demo-lambda-practise/*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::demo-lambda-practise-resized/*"
        }
    ]
}
```

### 通过 API Gateway 进行参数传递

模拟页面 crud 操作

_ [环境变量](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/configuration-envvars.html) _

## 参考链接

[AWS Lambda 官方文档](https://docs.aws.amazon.com/zh_cn/lambda/latest/dg/welcome.html)
