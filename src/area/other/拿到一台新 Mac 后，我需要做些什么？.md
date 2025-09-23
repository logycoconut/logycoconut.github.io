---
title: 拿到一台新 Mac 后，我需要做些什么？（开荒）
tags:
  - 新电脑
---

# 拿到一台新 Mac 后，我需要做些什么？（开荒）

## App

#### Obsidian

用来写一些文档，输出自己的知识库
和 Notion 搭配使用
一个用于记录公开的想法，一个用于记录私人的笔记

## 安装有眼缘的字体

>  默认字体也蛮好看的，但是平淡的日子总要来点不一样
>  折腾字体，才能让我有兴趣码字

#### LXGW WenKai Mono GB Screen / 霞鹜文楷等宽 GB 屏幕阅读版

- 目前用于 Obsidian 以及 github.io 的文档字体
- 最近对方方正正的字体无感，开始喜欢楷体、斜体
- 下载地址： [https://github.com/lxgw/LxgwWenKai-Screen](https://github.com/lxgw/LxgwWenKai-Screen)
- [LXGW ZhenKai / 霞鹜臻楷](https://github.com/lxgw/LxgwZhenKai)是在该字体的基础上加粗衍生的，同样可以了解一下

#### LXGW Neo XiHei / 霞鹜新晰黑

- 用于比较正式的场合，方便阅读
- 感觉字体偏细的话可以选择[屏幕阅读版](https://github.com/lxgw/LxgwNeoXiZhi-Screen)
- 下载地址： [https://github.com/lxgw/LxgwNeoXiHei](https://github.com/lxgw/LxgwNeoXiHei)

#### Maple Mono

- 开源等宽编程字体，手工微调斜体、大量连字
- 作者审美相当哇塞，用在我的 iTerm 里面绝了
- 下载地址：[https://github.com/subframe7536/maple-font](https://github.com/subframe7536/maple-font)

## 配置开发环境

#### Java

这个不需要配了
Javaer 应该都会使用 IDEA 来开发，而 IDEA 可以很方便的配置 Java 环境，点点点的功夫啦～
*Android SDK 同理，Android Studio 里面啥都有*

#### pnpm

> 自从有了 C 老师（ ChatGPT ），我也可以自豪的说，我是一名前端开发！

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
source /Users/logycoconut/.zshrc
```

#### node

*使用 pnpm 来管理 node 环境*
*https://pnpm.io/zh/next/cli/env

```bash
pnpm env use --global lts
```
