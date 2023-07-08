import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as i,c as n,f as s}from"./app-f715486c.js";const l={},d=s(`<blockquote><p>教程同样适用于使用 Hexo、Hugo 等工具维护个人网站的行为</p></blockquote><p>正如 Github Actions 宣传的那样</p><p><em>Automate your workflow from idea to production</em></p><p>Github Actions 可以省去以前所需的 CICD 工作, 将网站发布变成一项自动化的工作</p><h3 id="相关步骤" tabindex="-1"><a class="header-anchor" href="#相关步骤" aria-hidden="true">#</a> 相关步骤</h3><p>有了 Github Actions 以后, 网站发布流程可以<strong>简化到一次 <code>push</code> 命令</strong></p><ul><li><p>配置好 <code>deploy.yml</code> (只需一次), 在其中编写所有本应该手动完成的任务</p></li><li><p>正常书写 md 文件</p></li><li><p>提交代码并 push 到远程仓库</p></li><li><p>脚本自动执行, 进行文档编译并部署到 Github Pages</p></li></ul><h3 id="一个示例文件" tabindex="-1"><a class="header-anchor" href="#一个示例文件" aria-hidden="true">#</a> 一个示例文件</h3><p>逻辑很简单, 分为 4 步</p><ol><li>拉代码</li><li>配置 node 环境</li><li>使用 yarn 命令编译文档</li><li>部署到 github pages</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: deploy
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
          node-version: &#39;18&#39;
      - name: yarn
        run:  |
          yarn 
          yarn vuepress build src
      - name: Deploy Github Page
        uses: peaceiris/actions-gh-pages@v3
        with:
         github_token: \${{ secrets.ACTION_TOKEN }}
         publish_dir: ./src/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),a=[d];function t(r,c){return i(),n("div",null,a)}const v=e(l,[["render",t],["__file","03_通过 GitHub Actions 完成知识库的发布.html.vue"]]);export{v as default};
