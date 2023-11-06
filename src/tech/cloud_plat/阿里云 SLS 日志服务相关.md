---
title: 阿里云 SLS 日志服务相关
tag: [阿里云, SLS]
---

### 基础查询语法

> <https://help.aliyun.com/zh/sls/user-guide/query-syntax-and-functions/>

#### 精准查询

- 查询请求方法为 GET 以及状态码为 200 的日志

`request_method:GET and status:200`

- 查询设备 id 为 `device_9999` 的相关日志

`"deviceId:device_9999"`
