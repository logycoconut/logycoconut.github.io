import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as c,c as l,a as e,b as s,d as t,e as d}from"./app-33ef3045.js";const r={},o=d(`<h3 id="背景" tabindex="-1"><a class="header-anchor" href="#背景" aria-hidden="true">#</a> 背景</h3><p>根据某列的数据进行去重之后的查询</p><h3 id="distinct-on-用法" tabindex="-1"><a class="header-anchor" href="#distinct-on-用法" aria-hidden="true">#</a> distinct on 用法</h3><p>可以简单的理解成 <code>group by</code> 之后然后取分组第一行?</p><h4 id="准备-sql" tabindex="-1"><a class="header-anchor" href="#准备-sql" aria-hidden="true">#</a> 准备 SQL</h4><div class="language-SQL line-numbers-mode" data-ext="SQL"><pre class="language-SQL"><code>create table class_teacher_info  
(  
    id serial not null primary key,  
    class_id int not null,  
    teacher_id int not null  
);  
  
insert into class_teacher_info (class_id, teacher_id) values (1, 1);  
insert into class_teacher_info (class_id, teacher_id) values (1, 2);  
insert into class_teacher_info (class_id, teacher_id) values (1, 3);  
insert into class_teacher_info (class_id, teacher_id) values (1, 4);  
insert into class_teacher_info (class_id, teacher_id) values (1, 5);  
insert into class_teacher_info (class_id, teacher_id) values (2, 6);  
insert into class_teacher_info (class_id, teacher_id) values (2, 7);  
insert into class_teacher_info (class_id, teacher_id) values (2, 8);  
insert into class_teacher_info (class_id, teacher_id) values (2, 9);  
insert into class_teacher_info (class_id, teacher_id) values (2, 10);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="查询语句" tabindex="-1"><a class="header-anchor" href="#查询语句" aria-hidden="true">#</a> 查询语句</h4><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">SELECT</span> <span class="token keyword">distinct</span> <span class="token keyword">on</span> <span class="token punctuation">(</span>class_id<span class="token punctuation">)</span> teacher_id <span class="token keyword">FROM</span> class_teacher_info<span class="token punctuation">;</span>

<span class="token keyword">SELECT</span> <span class="token keyword">distinct</span> <span class="token keyword">on</span> <span class="token punctuation">(</span>class_id<span class="token punctuation">)</span> teacher_id <span class="token keyword">FROM</span> class_teacher_info <span class="token keyword">order</span> <span class="token keyword">by</span> class_id<span class="token punctuation">,</span> teacher_id <span class="token keyword">desc</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>诶? 我怎么写了两条 <code>SQL</code>, 这两条 <code>SQL</code> 有区别吗?</p>`,9),_=e("code",null,"PostgreSQL",-1),u={href:"https://www.postgresql.org/docs/12/queries-select-lists.html#QUERIES-DISTINCT",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[s("从文档中可知, 输出中只保留以"),e("code",null," distinct on"),s(" 条件分组的该组行的第一行, "),e("strong",null,"但是第一行是不可预测的")],-1),p=e("p",null,[s("如果我们想确定结果, 可以在 "),e("code",null,"SQL"),s(" 后面拼接各种 "),e("code",null,"where"),s("、"),e("code",null,"order"),s(" 条件")],-1);function v(m,k){const n=i("ExternalLinkIcon");return c(),l("div",null,[o,e("p",null,[s("那当然有, 先读一下 "),_,s(" 的"),e("a",u,[s("官方文档"),t(n)])]),h,p])}const g=a(r,[["render",v],["__file","PostgreSQL 中 distinct on 用法.html.vue"]]);export{g as default};
