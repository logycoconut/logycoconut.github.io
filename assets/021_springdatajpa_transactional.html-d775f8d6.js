const n=JSON.parse('{"key":"v-54a75ad1","path":"/post/021_springdatajpa_transactional.html","title":"Spring中事务的处理","lang":"zh-CN","frontmatter":{"title":"Spring中事务的处理","date":"2020-12-03T06:21:11.000Z","draft":false,"category":["关于技术"],"tag":["SpringDataJpa","Spring"],"description":"注解式事务 @Transactional 源码 @Target({ElementType.TYPE, ElementType.METHOD}) @Retention(RetentionPolicy.RUNTIME) @Inherited @Documented public @interface Transactional { @AliasFor(\\"transactionManager\\") String value() default \\"\\"; @AliasFor(\\"value\\") String transactionManager() default \\"\\"; Propagation propagation() default Propagation.REQUIRED; Isolation isolation() default Isolation.DEFAULT; int timeout() default -1; boolean readOnly() default false; Class&lt;? extends Throwable&gt;[] rollbackFor() default {}; String[] rollbackForClassName() default {}; Class&lt;? extends Throwable&gt;[] noRollbackFor() default {}; String[] noRollbackForClassName() default {}; }","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/post/021_springdatajpa_transactional.html"}],["meta",{"property":"og:title","content":"Spring中事务的处理"}],["meta",{"property":"og:description","content":"注解式事务 @Transactional 源码 @Target({ElementType.TYPE, ElementType.METHOD}) @Retention(RetentionPolicy.RUNTIME) @Inherited @Documented public @interface Transactional { @AliasFor(\\"transactionManager\\") String value() default \\"\\"; @AliasFor(\\"value\\") String transactionManager() default \\"\\"; Propagation propagation() default Propagation.REQUIRED; Isolation isolation() default Isolation.DEFAULT; int timeout() default -1; boolean readOnly() default false; Class&lt;? extends Throwable&gt;[] rollbackFor() default {}; String[] rollbackForClassName() default {}; Class&lt;? extends Throwable&gt;[] noRollbackFor() default {}; String[] noRollbackForClassName() default {}; }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-02T15:36:16.000Z"}],["meta",{"property":"article:tag","content":"SpringDataJpa"}],["meta",{"property":"article:tag","content":"Spring"}],["meta",{"property":"article:published_time","content":"2020-12-03T06:21:11.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-02T15:36:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring中事务的处理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-12-03T06:21:11.000Z\\",\\"dateModified\\":\\"2022-12-02T15:36:16.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"注解式事务","slug":"注解式事务","link":"#注解式事务","children":[{"level":3,"title":"@Transactional 源码","slug":"transactional-源码","link":"#transactional-源码","children":[]},{"level":3,"title":"常用参数说明","slug":"常用参数说明","link":"#常用参数说明","children":[]},{"level":3,"title":"propagation 的值","slug":"propagation-的值","link":"#propagation-的值","children":[]}]},{"level":2,"title":"声明式事务","slug":"声明式事务","link":"#声明式事务","children":[]}],"git":{"createdTime":1669995376000,"updatedTime":1669995376000,"contributors":[{"name":"logycoconut","email":"logycoconut@foxmail.com","commits":1}]},"readingTime":{"minutes":2.11,"words":634},"filePathRelative":"_post/021_springdatajpa_transactional.md","localizedDate":"2020年12月3日","excerpt":"<h2> 注解式事务</h2>\\n<h3> <code>@Transactional</code> 源码</h3>\\n<div class=\\"language-java line-numbers-mode\\" data-ext=\\"java\\"><pre class=\\"language-java\\"><code><span class=\\"token annotation punctuation\\">@Target</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span><span class=\\"token class-name\\">ElementType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">TYPE</span><span class=\\"token punctuation\\">,</span> <span class=\\"token class-name\\">ElementType</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">METHOD</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token annotation punctuation\\">@Retention</span><span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">RetentionPolicy</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">RUNTIME</span><span class=\\"token punctuation\\">)</span>\\n<span class=\\"token annotation punctuation\\">@Inherited</span>\\n<span class=\\"token annotation punctuation\\">@Documented</span>\\n<span class=\\"token keyword\\">public</span> <span class=\\"token annotation punctuation\\">@interface</span> <span class=\\"token class-name\\">Transactional</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token annotation punctuation\\">@AliasFor</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"transactionManager\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">value</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token annotation punctuation\\">@AliasFor</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\\"value\\"</span><span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token class-name\\">String</span> <span class=\\"token function\\">transactionManager</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token string\\">\\"\\"</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">Propagation</span> <span class=\\"token function\\">propagation</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token class-name\\">Propagation</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">REQUIRED</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">Isolation</span> <span class=\\"token function\\">isolation</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token class-name\\">Isolation</span><span class=\\"token punctuation\\">.</span><span class=\\"token constant\\">DEFAULT</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">int</span> <span class=\\"token function\\">timeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token keyword\\">boolean</span> <span class=\\"token function\\">readOnly</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token boolean\\">false</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">Class</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Throwable</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">rollbackFor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">rollbackForClassName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">Class</span><span class=\\"token generics\\"><span class=\\"token punctuation\\">&lt;</span><span class=\\"token operator\\">?</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Throwable</span><span class=\\"token punctuation\\">&gt;</span></span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">noRollbackFor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n    <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">[</span><span class=\\"token punctuation\\">]</span> <span class=\\"token function\\">noRollbackForClassName</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">default</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};