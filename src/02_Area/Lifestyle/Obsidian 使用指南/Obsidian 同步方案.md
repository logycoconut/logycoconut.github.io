---
title: Obsidian 同步方案
tags:
  - Obsidian
---

# Obsidian 同步方案

> 一款优秀的文档编辑器, 应该不仅有良好的码字体验, 也需要完善的同步/备份机制
> 得益于 Obsidian 繁荣的**生态**, 官方 / 社区提供了许多同步解决方案

一个好的同步方案需要满足以下目标
- PC 端完成文档输出、同步功能
- 移动端至少满足**阅读**的需求
- 最好有版本控制

## 实现思路

### ~~Obsidian Sync (官方插件)~~

官方方案，省力不省钱
只是提一嘴, 暂不考虑

### ~~Remotely Save 插件（放弃）~~

很方便的插件，支持 `Amazon S3`、`Dropbox`、`OneDrive`、`Webdav` 等方式同步文档

但是, 不支持**过滤指定文件夹**功能（ps: 我没找到😢）, 这意味着它只适合纯文档型 (.md) 的仓库

像一些类 `vuepress` 的文档库, 它其中还含有 `node_modules` 等文件夹, 也会被插件一起同步, 遂放弃

### ⭐️ Git 云端仓库 (推荐)

将 Obsidian 的 Vault 当成 Git Repo 来管理
*前提: 确保本机 `Git` 环境正常, 且在 `GitHub` 上成功配置 `SSH` 密钥*

1. 安装 `Obsidian Git` 插件
2. 熟悉右侧功能栏按钮 ( 对应的 `storage`、`commit` 等命令)
