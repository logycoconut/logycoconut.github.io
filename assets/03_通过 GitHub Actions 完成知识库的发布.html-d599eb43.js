import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as o,o as d,c as a,a as e,b as n,d as i,f as l}from"./app-d4eb8940.js";const r={},u=l('<blockquote><p>教程同样适用于使用 Hexo、Hugo 等工具维护个人网站的行为</p></blockquote><p>正如 Github Actions 宣传的那样</p><p><strong><em>Automate your workflow from idea to production</em></strong></p><p>Github Actions 可以省去以前所需的 CI / CD 工作, 将网站发布变成一项自动化的工作</p><h3 id="相关步骤" tabindex="-1"><a class="header-anchor" href="#相关步骤" aria-hidden="true">#</a> 相关步骤</h3><p>🥳 有了 Github Actions 以后, 网站发布流程可以<strong>简化到一次 <code>push</code> 命令</strong></p>',6),c=e("li",null,[e("p",null,[n("配置好 "),e("code",null,"deploy.yml"),n(" (只需一次), 在其中编写所有本应该手动完成的任务")])],-1),_=e("li",null,[e("p",null,"正常输出 markdown 文档")],-1),v=e("li",null,[e("p",null,"提交变更并 push 到位于 Github 的远程仓库")],-1),h={href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"},m=e("h3",{id:"进入实战",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#进入实战","aria-hidden":"true"},"#"),n(" 进入实战")],-1),b=e("blockquote",null,[e("p",null,"通过以下示例文件学习基本用法")],-1),p=e("p",null,"下面 yaml 文件的逻辑很简单, 分为 4 步",-1),g=e("p",null,[e("strong",null,"前提"),n(": 每次 push")],-1),f=e("li",null,"拉代码",-1),k=e("li",null,"设置 node 环境",-1),x=e("li",null,"使用 yarn 命令拉包 + 编译文档",-1),y={href:"https://pages.github.com/",target:"_blank",rel:"noopener noreferrer"},G=l(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>name: deploy
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1);function A(N,w){const s=o("ExternalLinkIcon");return d(),a("div",null,[u,e("ul",null,[c,_,v,e("li",null,[e("p",null,[n("脚本自动执行, 进行文档编译并部署到 "),e("a",h,[n("Github Pages"),i(s)])])])]),m,b,p,g,e("ol",null,[f,k,x,e("li",null,[n("部署到 "),e("a",y,[n("Github Pages"),i(s)])])]),G])}const H=t(r,[["render",A],["__file","03_通过 GitHub Actions 完成知识库的发布.html.vue"]]);export{H as default};
