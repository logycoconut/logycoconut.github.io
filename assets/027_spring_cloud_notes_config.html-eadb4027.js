const t=JSON.parse('{"key":"v-4069f45d","path":"/post/027_spring_cloud_notes_config.html","title":"Spring Cloud 之 配置中心 Spring Cloud Config ","lang":"zh-CN","frontmatter":{"title":"Spring Cloud 之 配置中心 Spring Cloud Config ","date":"2020-12-31T05:07:23.000Z","draft":false,"category":["关于技术"],"tag":["SpringCloud"],"description":"对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱 为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息 构建配置中心，从本地读取配置 1、新建一个 SpringBoot 项目，并导入依赖 &lt;dependency&gt; &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt; &lt;artifactId&gt;spring-cloud-config-server&lt;/artifactId&gt; &lt;/dependency&gt;","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/post/027_spring_cloud_notes_config.html"}],["meta",{"property":"og:title","content":"Spring Cloud 之 配置中心 Spring Cloud Config "}],["meta",{"property":"og:description","content":"对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱 为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息 构建配置中心，从本地读取配置 1、新建一个 SpringBoot 项目，并导入依赖 &lt;dependency&gt; &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt; &lt;artifactId&gt;spring-cloud-config-server&lt;/artifactId&gt; &lt;/dependency&gt;"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2022-12-02T15:36:16.000Z"}],["meta",{"property":"article:tag","content":"SpringCloud"}],["meta",{"property":"article:published_time","content":"2020-12-31T05:07:23.000Z"}],["meta",{"property":"article:modified_time","content":"2022-12-02T15:36:16.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud 之 配置中心 Spring Cloud Config \\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-12-31T05:07:23.000Z\\",\\"dateModified\\":\\"2022-12-02T15:36:16.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"构建配置中心，从本地读取配置","slug":"构建配置中心-从本地读取配置","link":"#构建配置中心-从本地读取配置","children":[]},{"level":2,"title":"构建 Config Client","slug":"构建-config-client","link":"#构建-config-client","children":[]},{"level":2,"title":"构建配置中心，从Git仓库中读取配置","slug":"构建配置中心-从git仓库中读取配置","link":"#构建配置中心-从git仓库中读取配置","children":[]},{"level":2,"title":"实现自动刷新","slug":"实现自动刷新","link":"#实现自动刷新","children":[]},{"level":2,"title":"使用 Spring Cloud Bus 来刷新多个客户端","slug":"使用-spring-cloud-bus-来刷新多个客户端","link":"#使用-spring-cloud-bus-来刷新多个客户端","children":[]},{"level":2,"title":"将配置中心注册到Eureka","slug":"将配置中心注册到eureka","link":"#将配置中心注册到eureka","children":[]},{"level":2,"title":"相关源码地址","slug":"相关源码地址","link":"#相关源码地址","children":[]}],"git":{"createdTime":1669995376000,"updatedTime":1669995376000,"contributors":[{"name":"logycoconut","email":"logycoconut@foxmail.com","commits":1}]},"readingTime":{"minutes":6.06,"words":1819},"filePathRelative":"_post/027_spring_cloud_notes_config.md","localizedDate":"2020年12月31日","excerpt":"<blockquote>\\n<p>对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱</p>\\n<p>为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息</p>\\n</blockquote>\\n<h2> 构建配置中心，从本地读取配置</h2>\\n<p>1、新建一个 SpringBoot 项目，并导入依赖</p>\\n<div class=\\"language-text line-numbers-mode\\" data-ext=\\"text\\"><pre class=\\"language-text\\"><code>&lt;dependency&gt;\\n    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;\\n    &lt;artifactId&gt;spring-cloud-config-server&lt;/artifactId&gt;\\n&lt;/dependency&gt;\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{t as data};