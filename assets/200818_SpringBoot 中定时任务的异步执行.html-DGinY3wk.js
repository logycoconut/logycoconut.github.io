import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-CDs18hrd.js";const l={};function p(c,n){return i(),a("div",null,n[0]||(n[0]=[e(`<blockquote><p>Spring 的定时任务默认是单线程串行执行的, 那假设第一个任务比较耗时长, 直到超过任务二的设定时间之后才完成, 那么就会造成任务二不能及时完成, 进而造成其他问题</p></blockquote><h2 id="先来说说定时任务" tabindex="-1"><a class="header-anchor" href="#先来说说定时任务"><span>先来说说定时任务</span></a></h2><p>开启对定时任务的支持, 在启动类上加上<code>@EnableScheduling</code></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 启动类</span></span>
<span class="line"><span>@EnableScheduling</span></span>
<span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class DemoApplication {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(DemoApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定时任务类</span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class ScheduledService {</span></span>
<span class="line"><span>    @Scheduled(fixedRate = 5000)</span></span>
<span class="line"><span>    public void scheduled1() {</span></span>
<span class="line"><span>        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Scheduled(cron = &quot;0/5 * * * * *&quot;)</span></span>
<span class="line"><span>    public void scheduled2() {</span></span>
<span class="line"><span>        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行可以看到定时任务都已经执行，并且使同一个线程中串行执行</p><figure><img src="https://i.loli.net/2020/08/20/36FeR7hJVqcsmlf.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure><p><em>注 : cron表达式的配置非常灵活, 但是刚接触的话会产生困惑, 可以用工具生成</em></p><p><a href="https://www.bejson.com/othertools/cron/" target="_blank" rel="noopener noreferrer">在线生成cron表达式</a></p><h2 id="开启异步支持" tabindex="-1"><a class="header-anchor" href="#开启异步支持"><span>开启异步支持</span></a></h2><p><code>@EnableAsync</code>开启异步支持, 并在方法上加上<code>@Async</code>注解</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 启动类</span></span>
<span class="line"><span>@EnableAsync</span></span>
<span class="line"><span>@EnableScheduling</span></span>
<span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class DemoApplication {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(DemoApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 定时任务类</span></span>
<span class="line"><span>@Slf4j</span></span>
<span class="line"><span>@Service</span></span>
<span class="line"><span>public class ScheduledService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Async</span></span>
<span class="line"><span>    @Scheduled(fixedRate = 5000)</span></span>
<span class="line"><span>    public void scheduled1() {</span></span>
<span class="line"><span>        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Async</span></span>
<span class="line"><span>    @Scheduled(cron = &quot;0/5 * * * * *&quot;)</span></span>
<span class="line"><span>    public void scheduled2() {</span></span>
<span class="line"><span>        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启项目，会发现每一个任务都是在不同的线程中运行</p><figure><img src="https://i.loli.net/2020/08/20/IUnLSZ7xW5hN3qJ.png" alt="image.png" tabindex="0" loading="lazy"><figcaption>image.png</figcaption></figure>`,13)]))}const r=s(l,[["render",p],["__file","200818_SpringBoot 中定时任务的异步执行.html.vue"]]),d=JSON.parse(`{"path":"/archive/blog/2020/200818_SpringBoot%20%E4%B8%AD%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E7%9A%84%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C.html","title":"SpringBoot 中定时任务的异步执行","lang":"zh-CN","frontmatter":{"title":"SpringBoot 中定时任务的异步执行","date":"2020-08-18T14:25:31.000Z","draft":false,"category":["关于技术"],"tag":["SpringBoot","Async"],"description":"Spring 的定时任务默认是单线程串行执行的, 那假设第一个任务比较耗时长, 直到超过任务二的设定时间之后才完成, 那么就会造成任务二不能及时完成, 进而造成其他问题 先来说说定时任务 开启对定时任务的支持, 在启动类上加上@EnableScheduling 运行可以看到定时任务都已经执行，并且使同一个线程中串行执行 image.pngimage.p...","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2020/200818_SpringBoot%20%E4%B8%AD%E5%AE%9A%E6%97%B6%E4%BB%BB%E5%8A%A1%E7%9A%84%E5%BC%82%E6%AD%A5%E6%89%A7%E8%A1%8C.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"SpringBoot 中定时任务的异步执行"}],["meta",{"property":"og:description","content":"Spring 的定时任务默认是单线程串行执行的, 那假设第一个任务比较耗时长, 直到超过任务二的设定时间之后才完成, 那么就会造成任务二不能及时完成, 进而造成其他问题 先来说说定时任务 开启对定时任务的支持, 在启动类上加上@EnableScheduling 运行可以看到定时任务都已经执行，并且使同一个线程中串行执行 image.pngimage.p..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://i.loli.net/2020/08/20/36FeR7hJVqcsmlf.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"SpringBoot"}],["meta",{"property":"article:tag","content":"Async"}],["meta",{"property":"article:published_time","content":"2020-08-18T14:25:31.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringBoot 中定时任务的异步执行\\",\\"image\\":[\\"https://i.loli.net/2020/08/20/36FeR7hJVqcsmlf.png\\",\\"https://i.loli.net/2020/08/20/IUnLSZ7xW5hN3qJ.png\\"],\\"datePublished\\":\\"2020-08-18T14:25:31.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"先来说说定时任务","slug":"先来说说定时任务","link":"#先来说说定时任务","children":[]},{"level":2,"title":"开启异步支持","slug":"开启异步支持","link":"#开启异步支持","children":[]}],"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":1,"url":"https://github.com/logycoconut"},{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":4,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":1.15,"words":346},"filePathRelative":"archive/blog/2020/200818_SpringBoot 中定时任务的异步执行.md","localizedDate":"2020年8月18日","autoDesc":true}`);export{r as comp,d as data};
