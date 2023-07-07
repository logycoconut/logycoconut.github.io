import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as i,o as d,c as s,a as e,b as n,d as l,w as o,f as c,e as u}from"./app-d50118f0.js";const p={},v=e("blockquote",null,[e("p",null,[n("我们知道 RestTemplate 可以通过 url 甚至服务名进行消费，但是如果对于服务提供者的每一个服务都需要写上这么一段代码，不仅麻烦还很容易产生混乱，所以本文将要介绍Spring Cloud中的服务调用组件"),e("code",null,"Feign")])],-1),m=e("h2",{id:"创建微服务中必要的三类角色",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#创建微服务中必要的三类角色","aria-hidden":"true"},"#"),n(" 创建微服务中必要的三类角色")],-1),b=c(`<p>服务提供者和消费者模块有些变动，接下来开始展示</p><h3 id="在服务提供服务中增加一个-api-模块" tabindex="-1"><a class="header-anchor" href="#在服务提供服务中增加一个-api-模块" aria-hidden="true">#</a> 在服务提供服务中增加一个 Api 模块</h3><p>里面放置公用的部分，比如说entity、api接口等</p><p>一般都是由服务提供方编写，毕竟服务提供方最熟悉自己的接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface ProviderApi {

    /**
     * 提供服务模拟
     * @return String
     */
    @GetMapping(&quot;info&quot;)
    String info();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消费方增加feignclient" tabindex="-1"><a class="header-anchor" href="#消费方增加feignclient" aria-hidden="true">#</a> 消费方增加FeignClient</h3><ol><li><p>在 Application 上增加 @EnableFeignClients 注解开启 Feign 支持</p></li><li><p>增加 UserClient，我们可以看到注解中有服务提供方的 application name， 以及请求地址的前缀</p></li></ol><p>前缀和 @GetMapping 中的值结合起来就是服务提供方的请求路径</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@FeignClient(value = &quot;feign-provider&quot;, path = &quot;user&quot;)
public interface ProviderClient extends ProviderApi { }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>现在我们可以在服务中消费<code>feign-provider</code>的服务啦</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;user&quot;)
public class ConsumerController {

    @Autowired
    private ProviderClient providerClient;

    @GetMapping(&quot;consume&quot;)
    public String consume() {
        return providerClient.info();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,13),g={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign",target:"_blank",rel:"noopener noreferrer"},h=e("p",null,[n("​​"),u(" +++++++++ 下面是引用式链接 +++++++++ ")],-1);function _(f,x){const t=i("RouterLink"),r=i("ExternalLinkIcon");return d(),s("div",null,[v,m,e("p",null,[n("注册中心之前在"),l(t,{to:"/blog/201222_SpringCloud%E4%B9%8BEureka%E5%AE%9E%E7%8E%B0%E6%9C%8D%E5%8A%A1%E6%B3%A8%E5%86%8C%E5%92%8C%E5%8F%91%E7%8E%B0.html"},{default:o(()=>[n("Spring Cloud 之 Eureka实现服务注册和发现")]),_:1}),n("中有过介绍，这里就不再累述")]),b,e("p",null,[e("a",g,[n("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign"),l(r)])]),h])}const q=a(p,[["render",_],["__file","201225_Spring Cloud 之 OpenFeign的使用.html.vue"]]);export{q as default};
