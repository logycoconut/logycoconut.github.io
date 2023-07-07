---
title: 通过 GitHub Actions 完成知识库的发布
date: 2023-07-07
tag: [GitHub Action]
---

> 教程同样适用于使用 Hexo、Hugo 等工具维护个人网站的行为

正如 Github Actions 宣传的那样

_Automate your workflow from idea to production_

Github Actions 可以省去以前所需的 CICD 工作, 将网站发布变成一项自动化的工作

### 相关步骤

有了 Github Actions 以后, 网站发布流程可以**简化到一次 `push` 命令**

- 配置好 `deploy.yml` (只需一次), 在其中编写所有本应该手动完成的任务

- 正常书写 md 文件

- 提交代码并 push 到远程仓库

- 脚本自动执行, 进行文档编译并部署到 Github Pages

### 一个示例文件

逻辑很简单, 分为 4 步

1. 拉代码
2. 配置 node 环境
3. 使用 yarn 命令编译文档
4. 部署到 github pages

```
name: deploy
on:
  push:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '18'
      - name: yarn
        run:  |
          yarn 
          yarn vuepress build src
      - name: Deploy Github Page
        uses: peaceiris/actions-gh-pages@v3
        with:
         github_token: ${{ secrets.ACTION_TOKEN }}
         publish_dir: ./src/.vuepress/dist
```
