import{_ as e,Y as i,Z as l,$ as s,a0 as a,a1 as t,a2 as p,I as c}from"./framework-beff9ad1.js";const o={},u=p(`<h1 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch" aria-hidden="true">#</a> ElasticSearch</h1><h2 id="基础概念" tabindex="-1"><a class="header-anchor" href="#基础概念" aria-hidden="true">#</a> 基础概念</h2><ul><li><p>集群与节点</p><p>集群是一个或多个node的集合，每一个node在启动时都会彼此发现，组成集群（节点默认会加入一个叫elasticsearch的节点）</p></li><li><p>Index 和 Type</p><p>index是一类拥有相似属性的document的集合，必须是小写的字符</p><p>type作为index中的逻辑类别（在ES6之后的版本逐步放弃type的概念，因为在ES中，一个Index下不同的type如果有相同的字段，他们会被luecence当作一个字段，并且他们的定义必须相同，这难道不像一个表吗）</p></li><li><p>document</p><p>Index里面的单条的记录，类似于关系型数据库中的行的概念</p></li><li><p>Shards 和 Replicas</p><p>如果一个Index存放了过多的数据，响应的速度就会下降。<strong>所以ES可以将Index分片，每一片都是一个Shards，分布在不同的服务器中</strong></p><p>分片分为主分片和副本分片，主分片数量在索引创建时指定，后续不允许修改，除非Reindex，多个主分片加起来才是完整的数据</p><figure><img src="https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bc3bde42-f673-44ff-ad26-ca527239ab80/Untitled.png" alt="Untitled" tabindex="0" loading="lazy"><figcaption>Untitled</figcaption></figure></li></ul><h2 id="基本用法" tabindex="-1"><a class="header-anchor" href="#基本用法" aria-hidden="true">#</a> 基本用法</h2><h3 id="创建索引" tabindex="-1"><a class="header-anchor" href="#创建索引" aria-hidden="true">#</a> 创建索引</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token comment"># 创建一个叫做twitter的索引（index），并插入一个文档（document)</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,11),d={href:"https://mp.weixin.qq.com/s/-j4DkNQI3Yj6FsuQsexNQg",target:"_blank",rel:"noopener noreferrer"},r={href:"https://juejin.cn/post/6844904030037245959#heading-0",target:"_blank",rel:"noopener noreferrer"};function v(m,k){const n=c("ExternalLinkIcon");return i(),l("div",null,[u,s("p",null,[s("a",d,[a("Elasticsearch入门基础"),t(n)])]),s("p",null,[s("a",r,[a("利用Elasticsearch搜索数据"),t(n)])])])}const q=e(o,[["render",v],["__file","20211020 基本概念.html.vue"]]);export{q as default};
