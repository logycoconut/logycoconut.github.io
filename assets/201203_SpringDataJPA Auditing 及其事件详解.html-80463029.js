import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as a,f as e}from"./app-38b238a9.js";const t={},i=e(`<blockquote><p>我们在实际开发中，对表中记录经常需要记录是谁创建的、谁最后修改过、修改时间是什么时候</p><p>Auditing 意为审计，是 JPA 自带的功能实现</p></blockquote><h2 id="基本实现" tabindex="-1"><a class="header-anchor" href="#基本实现" aria-hidden="true">#</a> 基本实现</h2><h3 id="四个注解" tabindex="-1"><a class="header-anchor" href="#四个注解" aria-hidden="true">#</a> 四个注解</h3><ul><li><code>@CreatedDate</code></li><li><code>@LastModifiedDate</code></li><li><code>@CreatedBy</code></li><li><code>@LastModifiedBy</code></li></ul><h3 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 实体类</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@EntityListeners</span><span class="token punctuation">(</span><span class="token class-name">AuditingEntityListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>  <span class="token comment">// 表明需要审计功能</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>

    <span class="token comment">// 以下是JPA支持自动修改的注解</span>
    <span class="token annotation punctuation">@CreatedDate</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> createTime<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@LastModifiedDate</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> lastModifiedTime<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@CreatedBy</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> createUser<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@LastModifiedBy</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastModifiedUser<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

<span class="token comment">// 实现自己的AuditorAware</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyAuditorAware</span> <span class="token keyword">implements</span> <span class="token class-name">AuditorAware</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Optional</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getCurrentAuditor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">&quot;hall&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

<span class="token comment">// 开启JPA的审计功能</span>
<span class="token annotation punctuation">@SpringBootApplication</span>
<span class="token annotation punctuation">@EnableJpaAuditing</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">DemoApplication</span> <span class="token punctuation">{</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">SpringApplication</span><span class="token punctuation">.</span><span class="token function">run</span><span class="token punctuation">(</span><span class="token class-name">DemoApplication</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 注入自己实现的AuditorAware类</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">AuditorAware</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">auditorProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MyAuditorAware</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="扩展成entity基类" tabindex="-1"><a class="header-anchor" href="#扩展成entity基类" aria-hidden="true">#</a> 扩展成Entity基类</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@MappedSuperclass</span>
<span class="token annotation punctuation">@EntityListeners</span><span class="token punctuation">(</span><span class="token class-name">AuditingEntityListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractAuditable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@CreatedDate</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> createTime<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@LastModifiedDate</span>
    <span class="token keyword">private</span> <span class="token class-name">Date</span> lastModifiedTime<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@CreatedBy</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> createUser<span class="token punctuation">;</span>
    <span class="token annotation punctuation">@LastModifiedBy</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> lastModifiedUser<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="listener扩展" tabindex="-1"><a class="header-anchor" href="#listener扩展" aria-hidden="true">#</a> Listener扩展</h2><h3 id="callbacks-注解方式" tabindex="-1"><a class="header-anchor" href="#callbacks-注解方式" aria-hidden="true">#</a> Callbacks 注解方式</h3><table><thead><tr><th>Type</th><th>Description</th></tr></thead><tbody><tr><td>@PrePersist</td><td>新增之前</td></tr><tr><td>@PostPersist</td><td>新增之后</td></tr><tr><td>@PreUpdate</td><td>更新之前</td></tr><tr><td>@PostUpdate</td><td>更新之后</td></tr><tr><td>@PreRemove</td><td>删除之前</td></tr><tr><td>@PostRemove</td><td>删除之后</td></tr><tr><td>@PostLoad</td><td>加载之后</td></tr></tbody></table><p>需要注意的是，这些方法都是同步机制，一旦报错将会影响所有底层代码执行。实际工作中实现这些方法的时候，方法体里面开启异步线程或者消息队列来异步处理</p><h3 id="代码示例-1" tabindex="-1"><a class="header-anchor" href="#代码示例-1" aria-hidden="true">#</a> 代码示例</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 实体类</span>
<span class="token annotation punctuation">@Data</span>
<span class="token annotation punctuation">@Entity</span>
<span class="token annotation punctuation">@EntityListeners</span><span class="token punctuation">(</span><span class="token class-name">EmployeeAuditListener</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Employee</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractAuditable</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span><span class="token constant">IDENTITY</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">long</span> id<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> name<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> code<span class="token punctuation">;</span>


<span class="token punctuation">}</span>

<span class="token comment">// 自定义Listener</span>
<span class="token annotation punctuation">@Slf4j</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EmployeeAuditListener</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@PostPersist</span>
    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">postPersist</span><span class="token punctuation">(</span><span class="token class-name">Employee</span> employee<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;新增啦，{}&quot;</span><span class="token punctuation">,</span> employee<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="jpa-的乐观锁实现-version" tabindex="-1"><a class="header-anchor" href="#jpa-的乐观锁实现-version" aria-hidden="true">#</a> JPA 的乐观锁实现 <code>@Version</code></h3><p>只需要在字段上加上 Version 注解</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Version</span>
<span class="token keyword">private</span> <span class="token class-name">Long</span> version<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,17),p=[i];function c(o,l){return s(),a("div",null,p)}const r=n(t,[["render",c],["__file","201203_SpringDataJPA Auditing 及其事件详解.html.vue"]]);export{r as default};
