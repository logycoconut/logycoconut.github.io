import{_ as t}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as l,c as p,a as s,b as n,d as e,f as c,e as o}from"./app-5e910552.js";const u={},r=c(`<h2 id="名词解释" tabindex="-1"><a class="header-anchor" href="#名词解释" aria-hidden="true">#</a> 名词解释</h2><ul><li><p>集群与节点</p><p>集群是一个或多个 Node 的集合，每一个 Node 在启动时都会彼此发现，组成集群<br> （节点默认会加入一个叫 <code>elasticsearch</code> 的节点）</p></li><li><p>index 和 type</p><p>index 是一类拥有相似属性的 document 的集合，必须是小写的字符<br> type 作为 index 中的逻辑类别</p><p>（在 ES6 之后的版本逐步放弃type的概念，因为在 ES 中，一个Index下不同的type如果有相同的字段，他们会被luecence当作一个字段，并且他们的定义必须相同，这其实就是一个 Type 了呀）</p></li><li><p>document</p><p>index 里面的单条的记录，类似于关系型数据库中的行的概念</p></li><li><p>shards<br> 分片</p><p>如果一个 index 存放了过多的数据，响应的速度就会下降</p><p><strong>所以 ES 可以将 index 分片，每一片都是一个 shards，分布在不同的节点中</strong></p><p>多个主分片加起来才是完整的数据，相当于一桶水用多个杯子装</p><p>分片分为主分片和副本分片，主分片数量在索引创建时指定，后续不允许修改，除非 Reindex，多个主分片加起来才是完整的数据</p></li><li><p>replicas<br> 复制，也可以叫做备份分片</p><p>主分片和备分片不会出现在同一个节点上（防止单点故障）</p><p>默认情况下一个索引创建 5 个分片一个备份（即 5 primary+5 replica = 10 个分片）</p><p>replicas 不仅提供备份容灾的作用，也可以提高查询性能</p></li></ul><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建一个叫做twitter的索引（index），并插入一个文档（document)</span>
PUT twitter/_doc/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;GB&quot;</span>,
  <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
  <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Beijing&quot;</span>,
  <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;Beijing&quot;</span>,
  <span class="token string">&quot;country&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;China&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="添加、修改" tabindex="-1"><a class="header-anchor" href="#添加、修改" aria-hidden="true">#</a> 添加、修改</h3><ul><li><p>指定一个特定的id来进行修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT twitter/_doc/1
<span class="token punctuation">{</span>
   <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;GB&quot;</span>,
   <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
   <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;北京&quot;</span>,
   <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;北京&quot;</span>,
   <span class="token string">&quot;country&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;中国&quot;</span>,
   <span class="token string">&quot;location&quot;</span>:<span class="token punctuation">{</span>
     <span class="token string">&quot;lat&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;29.084661&quot;</span>,
     <span class="token string">&quot;lon&quot;</span><span class="token builtin class-name">:</span><span class="token string">&quot;111.335210&quot;</span>
   <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>修改部分数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST twitter/_update/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;doc&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;成都&quot;</span>,
    <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;四川&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用script的方式修改</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 知道Id</span>
POST twitter/_update/1
<span class="token punctuation">{</span>
  <span class="token string">&quot;script&quot;</span> <span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ctx._source.city=params.city&quot;</span>,
      <span class="token string">&quot;lang&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;painless&quot;</span>,
      <span class="token string">&quot;params&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;长沙&quot;</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment"># 不知道Id，先查询再修改</span>
POST twitter/_update_by_query
<span class="token punctuation">{</span>
  <span class="token string">&quot;script&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;source&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;ctx._source.city = params.city;ctx._source.province = params.province;ctx._source.country = params.country&quot;</span>,
    <span class="token string">&quot;lang&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;painless&quot;</span>,
    <span class="token string">&quot;params&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;上海&quot;</span>,
      <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;上海&quot;</span>,
      <span class="token string">&quot;country&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;中国&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;match&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;GB&quot;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>使用settings创建index</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>DELETE twitter
PUT twitter
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;number_of_shards&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>,
    <span class="token string">&quot;number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
 
PUT twitter/_mapping
<span class="token punctuation">{</span>
  <span class="token string">&quot;properties&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;address&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;age&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;long&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;city&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;country&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;location&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;geo_point&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;message&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;province&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;uid&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;long&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;user&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
      <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;text&quot;</span>,
      <span class="token string">&quot;fields&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;keyword&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
          <span class="token string">&quot;type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;keyword&quot;</span>,
          <span class="token string">&quot;ignore_above&quot;</span><span class="token builtin class-name">:</span> <span class="token number">256</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul><h3 id="查询" tabindex="-1"><a class="header-anchor" href="#查询" aria-hidden="true">#</a> 查询</h3><ul><li><p>查询一个文档是否存在</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>HEAD twitter/_doc/1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>查询该索引有多少条数据</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET twitter/_count
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>搜索所有的文档，不指定size的话默认为10</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET /_search?size<span class="token operator">=</span><span class="token number">20</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>搜索特定的index</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET twitter/_search
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>分页查询</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET twitter/_search?size<span class="token operator">=</span><span class="token number">2</span><span class="token operator">&amp;</span><span class="token assign-left variable">from</span><span class="token operator">=</span><span class="token number">2</span>

GET twitter/_search
<span class="token punctuation">{</span>
  <span class="token string">&quot;size&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>,
  <span class="token string">&quot;from&quot;</span><span class="token builtin class-name">:</span> <span class="token number">2</span>, 
  <span class="token string">&quot;query&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;match_all&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>获取Settings</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET twitter/_settings
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>获取index中的mapping （类似于数据结构，每个字段的类型）</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>GET twitter/_mapping
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,10),d={href:"https://mp.weixin.qq.com/s/-j4DkNQI3Yj6FsuQsexNQg",target:"_blank",rel:"noopener noreferrer"},v={href:"https://juejin.cn/post/6844904030037245959#heading-0",target:"_blank",rel:"noopener noreferrer"},m=s("p",null,[n("​​"),o(" +++++++++ 下面是引用式链接 +++++++++ ")],-1);function k(b,q){const a=i("ExternalLinkIcon");return l(),p("div",null,[r,s("ul",null,[s("li",null,[s("a",d,[n("Elasticsearch入门基础"),e(a)])]),s("li",null,[s("a",v,[n("利用Elasticsearch搜索数据"),e(a)])])]),m])}const _=t(u,[["render",k],["__file","20211020 基础概念.html.vue"]]);export{_ as default};
