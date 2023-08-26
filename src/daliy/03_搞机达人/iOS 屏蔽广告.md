---
title: iOS 屏蔽广告
tag: [iOS]
---

### 写在之前

> _腾讯集团认为李跳跳 app 涉嫌不正当竞争，对腾讯集团旗下的 QQ 浏览器产生了影响。要求四十八小时内全网下架李跳跳_
> [吃瓜链接](https://www.v2ex.com/t/967813)

在感概大公司还有这种手段的同时, 同时也产生了一个思考

iOS 有没有类似李跳跳的 App ?

### 通过 Shadowrocket 屏蔽广告

_仓库地址: <https://github.com/Johnshall/Shadowrocket-ADBlock-Rules-Forever>_

原理很简单

- 首先搜集广告 (图文、视频) 对应的 ip

- 制定特殊的 Shadowrocket 规则, 规则定义了哪些网站可以直连, 哪些必须走代理, 哪些直接屏蔽

- 再通过 iOS 快捷指令的自动化能力, 定时地去拉取最新的规则
