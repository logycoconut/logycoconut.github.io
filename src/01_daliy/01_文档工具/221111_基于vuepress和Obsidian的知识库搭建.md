---
title: 基于 vuepress 和 Obsidian 的知识库搭建
tag: Obsidian
---

```
写在放弃语雀之后...
```

## 知识库搭建

经过几天的摸索，逐渐形成一个比较舒适的文档记录方式

`vuepress + vuepres-theme-hope + Obsidian`

### 工具集介绍

- 通过 vuepress 搭建网站

使用 vuepres-theme-hope 主题 搭建一个文档网站，使用 git 管理

- Obsidian 作为 Markdown 文件的编辑器，配合插件提高效率（ Typora 也可以）

- 利用 Github Action 在每次代码提交的时候部署到  Github Page（可以配合 Obsidian Git 插件）

### 图床选择

阿里云OSS、腾讯云COS之间可以任意选择一个

我目前使用的是腾讯云的[COS服务](https://console.cloud.tencent.com/cos) （新用户可以送50G半年 之后续费价格也不贵）

通过「PicGo」以及「 Obsidian Image Auto Upload Plugin」插件可以实现无缝贴图到Obsidian里面

### 图标管理

> 具体配置参考 [vuepress-theme-hope 图标支持](https://vuepress-theme-hope.github.io/v2/zh/guide/interface/icon.html)

使用 [iconfont](https://www.iconfont.cn/manage/index) 管理网站的图标（资源管理 - 我的项目）

可以在 iconfont 上寻找好看的图标并生成相应的 css 文件引入即可

## Obsidian 插件

| 插件名                      | 备注                |
| :----------------------- | :---------------- |
| Advanced Tables          | 格式化Mardown表格格式    |
| Image auto upload Plugin | 配合PicGo可以实现无缝粘贴图片 |
| Markdown prettifier      | 将md文件格式化为标准格式     |
| Obsidian Git             | 使用Git管理Obsidian仓库 |
| Paste URL into Selection | 改善超链接             |
