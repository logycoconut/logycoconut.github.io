import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as d,c as s,a as e,b as a,d as c,e as n,r}from"./app.751617fe.js";const v={},o=n(`<blockquote><p>Spring的定时任务默认是单线程串行执行的, 那假设第一个任务比较耗时长, 直到超过任务二的设定时间之后才完成, 那么就会造成任务二不能及时完成, 进而造成其他问题</p></blockquote><h2 id="先来说说定时任务" tabindex="-1"><a class="header-anchor" href="#先来说说定时任务" aria-hidden="true">#</a> 先来说说定时任务</h2><p>开启对定时任务的支持, 在启动类上加上<code>@EnableScheduling</code></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 启动类
@EnableScheduling
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 定时任务类
@Slf4j
@Service
public class ScheduledService {
    @Scheduled(fixedRate = 5000)
    public void scheduled1() {
        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());
    }

    @Scheduled(cron = &quot;0/5 * * * * *&quot;)
    public void scheduled2() {
        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行可以看到定时任务都已经执行，并且使同一个线程中串行执行</p><p><img src="https://i.loli.net/2020/08/20/36FeR7hJVqcsmlf.png" alt="image.png" loading="lazy"></p><p><em>注 : cron表达式的配置非常灵活, 但是刚接触的话会产生困惑, 可以用工具生成</em></p>`,7),u={href:"https://www.bejson.com/othertools/cron/",target:"_blank",rel:"noopener noreferrer"},t=n(`<h2 id="开启异步支持" tabindex="-1"><a class="header-anchor" href="#开启异步支持" aria-hidden="true">#</a> 开启异步支持</h2><p><code>@EnableAsync</code>开启异步支持, 并在方法上加上<code>@Async</code>注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 启动类
@EnableAsync
@EnableScheduling
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}

// 定时任务类
@Slf4j
@Service
public class ScheduledService {

    @Async
    @Scheduled(fixedRate = 5000)
    public void scheduled1() {
        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());
    }

    @Async
    @Scheduled(cron = &quot;0/5 * * * * *&quot;)
    public void scheduled2() {
        log.info(&quot;----{}----&quot;, Thread.currentThread().getName());
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重启项目，会发现每一个任务都是在不同的线程中运行</p><p><img src="https://i.loli.net/2020/08/20/IUnLSZ7xW5hN3qJ.png" alt="image.png" loading="lazy"></p>`,5);function m(b,p){const i=r("ExternalLinkIcon");return d(),s("div",null,[o,e("p",null,[e("a",u,[a("在线生成cron表达式"),c(i)])]),t])}const _=l(v,[["render",m],["__file","016_springboot_async.html.vue"]]);export{_ as default};
