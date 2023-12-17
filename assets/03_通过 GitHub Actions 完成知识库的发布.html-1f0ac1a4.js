import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as l,o as t,c,a as e,b as n,d as o,f as i}from"./app-2b520869.js";const a={},r=i('<blockquote><p>教程同样适用于使用 Hexo、Hugo 等工具维护个人网站的行为</p></blockquote><p>正如 <code>Github Actions</code> 宣传的那样</p><p><strong><em>Automate your workflow from idea to production</em></strong></p><p><code>Github Actions</code> 可以省去以前所需的 <code>CI / CD</code> 工作, 将网站发布变成一项自动化的工作</p><h3 id="相关步骤" tabindex="-1"><a class="header-anchor" href="#相关步骤" aria-hidden="true">#</a> 相关步骤</h3><blockquote><p>🥳 有了 <code>Github Actions</code> 以后, 网站发布流程可以<strong>简化到一次 <code>push</code> 命令</strong><br> (<em>当然，肯定还有 add、commit 操作啦</em>)</p></blockquote>',6),u=i("<li><p>配置好 <code>deploy.yml</code> (只需一次), 在其中编写所有本应该手动完成的任务</p></li><li><p>正常输出 <code>markdown</code> 文档</p></li><li><p>提交变更并 <code>push</code> 到位于 <code>Github</code> 的远程仓库</p></li>",3),v={href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"},p=i('<h3 id="进入实战" tabindex="-1"><a class="header-anchor" href="#进入实战" aria-hidden="true">#</a> 进入实战</h3><blockquote><p>通过以下示例文件学习基本用法<br> 有编程基础的小伙伴应该理解起来很快，没有的可以看下文字解释，应该也能理解</p></blockquote><p>下面 <code>yaml</code> 文件的逻辑很简单, 分为 4 步</p><p><strong>前提</strong>: 每次 <code>push</code></p>',4),b=e("li",null,"拉代码",-1),m=e("li",null,[n("设置 "),e("code",null,"node"),n(" 环境")],-1),_=e("li",null,[n("使用 "),e("code",null,"yarn"),n(" 命令拉包 + 编译文档")],-1),h={href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"},g=i(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: deploy
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function f(k,x){const s=l("ExternalLinkIcon");return t(),c("div",null,[r,e("ul",null,[u,e("li",null,[e("p",null,[n("脚本自动执行, 进行文档编译并部署到 "),e("a",v,[n("Github Pages"),o(s)])])])]),p,e("ol",null,[b,m,_,e("li",null,[n("部署到 "),e("a",h,[n("Github Pages"),o(s)])])]),g])}const A=d(a,[["render",f],["__file","03_通过 GitHub Actions 完成知识库的发布.html.vue"]]);export{A as default};
