---
title: Obsidian 文件同步规范
tags:
  - Obsidian
date: 2024-12-06
---

# Obsidian 文件同步规范

这篇文章的初衷非常简单
在长时间的 Obsidian 使用过程中（或者说知识库构建过程中），Git 在其中只是扮演了文件同步的角色
但是 Git 本身是一个非常优秀的版本控制工具
那么，是否需要以一种规范的方式来管理我的文档？就像管理代码一样？

答案是肯定的，规范使用 Git 能够让提交记录更清晰，清楚地看到每一次提交做出的改变

这里可以参考一份 Git 规范，***[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/)***
***Angular 规范*** 将一次 Commit 信息分为 Header、Body、Footer 三部分
对于文档管理来说，只使用 Header 部分就足以表明本次改动的内容了
- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

**举个例子**
- feat：新笔记
- fix: 对笔记内容进行比较大的修改
- refactor：对笔记内容进行修饰
- style：对笔记格式进行修改
- chore：Obsidian 的插件、主题更新
