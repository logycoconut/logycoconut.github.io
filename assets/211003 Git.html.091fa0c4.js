import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as l,a as n,b as e,d as a,e as c,r}from"./app.296972cb.js";const o={},d=c(`<h2 id="重写历史" tabindex="-1"><a class="header-anchor" href="#重写历史" aria-hidden="true">#</a> 重写历史</h2><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 修改最近一次提交的提交信息</span>
<span class="token function">git</span> commit <span class="token parameter variable">--amend</span>

<span class="token comment"># 修改多个提交信息（修改最近三次提交信息）</span>
<span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="暂存修改「git-stash」" tabindex="-1"><a class="header-anchor" href="#暂存修改「git-stash」" aria-hidden="true">#</a> 暂存修改「git stash」</h2><aside> 💡 当修改项还不确定要提交，又要将代码更新或回去改 bug，此时可以用「git stash」将修改项暂存 </aside><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 将当前所有修改项(未提交的)暂存，压栈。此时代码回到你上一次的提交，用git status可查看状态</span>
<span class="token function">git</span> stash

<span class="token comment"># 列出所有暂存项</span>
<span class="token function">git</span> stash list

<span class="token comment"># 清除所有暂存项</span>
<span class="token function">git</span> stash <span class="token function">clear</span>

<span class="token comment"># 将暂存的修改重新应用，list中仍有记录</span>
<span class="token function">git</span> stash apply

<span class="token comment"># 将暂存的修改重新应用，list中没有记录</span>
<span class="token function">git</span> stash pop
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,6),m={href:"https://git-scm.com/book/zh/v2",target:"_blank",rel:"noopener noreferrer"},p={href:"https://backlog.com/git-tutorial/cn/",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.phodal.com/",target:"_blank",rel:"noopener noreferrer"};function v(h,b){const s=r("ExternalLinkIcon");return t(),l("div",null,[d,n("ul",null,[n("li",null,[n("a",m,[e("Git - 官方文档"),a(s)])]),n("li",null,[n("a",p,[e("猴子都能懂的GIT入门"),a(s)])]),n("li",null,[n("a",u,[e("GitHub 漫游指南"),a(s)])])])])}const k=i(o,[["render",v],["__file","211003 Git.html.vue"]]);export{k as default};
