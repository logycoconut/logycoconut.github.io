import{_ as p}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as o,a as n,b as a,d as t,e as c,r as l}from"./app.119b4650.js";const u={},i=c(`<blockquote><p>对流中的数据进行分组求和</p></blockquote><h2 id="实例" tabindex="-1"><a class="header-anchor" href="#实例" aria-hidden="true">#</a> 实例</h2><p><code>Collectors.groupingBy</code> 最重要的一个参数 <code>Function&lt;? super T,? extends K&gt; classifier</code> ，它代表了map的key</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> items <span class="token operator">=</span> <span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span><span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;banana&quot;</span><span class="token punctuation">,</span>
        <span class="token string">&quot;apple&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;orange&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;banana&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;papaya&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> items
        <span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Function</span><span class="token punctuation">.</span><span class="token function">identity</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">counting</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 运行结果</span>
<span class="token punctuation">{</span>papaya<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> orange<span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">,</span> banana<span class="token operator">=</span><span class="token number">2</span><span class="token punctuation">,</span> apple<span class="token operator">=</span><span class="token number">3</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>比如说我们有A、B、C三个仓库，每个仓库都有货品的库存（比如桌子、凳子、数据线），现在我们需要统计所有货品的库存，我们就需要对三个仓库都进行统计</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 伪代码，不可用于生产环境</span>
<span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Goods</span><span class="token punctuation">&gt;</span></span> goodslist <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Long</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> items<span class="token punctuation">.</span><span class="token function">stream</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">collect</span><span class="token punctuation">(</span><span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">groupingBy</span><span class="token punctuation">(</span><span class="token class-name">Goods</span><span class="token operator">::</span><span class="token function">getName</span><span class="token punctuation">,</span>
                                   <span class="token class-name">Collectors</span><span class="token punctuation">.</span><span class="token function">summingInt</span><span class="token punctuation">(</span>good <span class="token operator">-&gt;</span> <span class="token class-name">Goods</span><span class="token operator">::</span><span class="token function">getStock</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>map<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// 运行结果</span>
<span class="token punctuation">{</span>
    <span class="token string">&quot;桌子&quot;</span><span class="token operator">:</span> <span class="token number">23</span><span class="token punctuation">,</span>
    <span class="token string">&quot;椅子&quot;</span><span class="token operator">:</span> <span class="token number">46</span><span class="token punctuation">,</span>
    <span class="token string">&quot;数据线&quot;</span><span class="token operator">:</span> <span class="token number">46</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h2>`,7),r={href:"https://www.jianshu.com/p/dd5121c8fa89",target:"_blank",rel:"noopener noreferrer"},k={href:"https://blog.csdn.net/neweastsun/article/details/89504811",target:"_blank",rel:"noopener noreferrer"};function d(m,v){const s=l("ExternalLinkIcon");return e(),o("div",null,[i,n("p",null,[n("a",r,[a("Java8 Stream多字段分组求和groupingBy"),t(s)])]),n("p",null,[n("a",k,[a("介绍 Java 8 groupingBy Collector"),t(s)])])])}const f=p(u,[["render",d],["__file","019_java8_stream_groupby.html.vue"]]);export{f as default};