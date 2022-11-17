import{_ as a}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as s,c as d,a as e,b as n,d as i,w as o,e as c,r as l}from"./app.119b4650.js";const u={},v=e("blockquote",null,[e("p",null,[n("我们知道 RestTemplate 可以通过 url 甚至服务名进行消费，但是如果对于服务提供者的每一个服务都需要写上这么一段代码，不仅麻烦还很容易产生混乱，所以本文将要介绍Spring Cloud中的服务调用组件"),e("code",null,"Feign")])],-1),p=e("h2",{id:"创建微服务中必要的三类角色",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#创建微服务中必要的三类角色","aria-hidden":"true"},"#"),n(" 创建微服务中必要的三类角色")],-1),m=c(`<p>服务提供者和消费者模块有些变动，接下来开始展示</p><h3 id="在服务提供服务中增加一个api模块" tabindex="-1"><a class="header-anchor" href="#在服务提供服务中增加一个api模块" aria-hidden="true">#</a> 在服务提供服务中增加一个Api模块</h3><p>里面放置公用的部分，比如说entity、api接口等</p><p>一般都是由服务提供方编写，毕竟服务提供方最熟悉自己的接口</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface ProviderApi {

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,13),b={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign",target:"_blank",rel:"noopener noreferrer"};function g(h,_){const r=l("RouterLink"),t=l("ExternalLinkIcon");return s(),d("div",null,[v,p,e("p",null,[n("注册中心之前在"),i(r,{to:"/2020/023_spring_cloud_notes_eureka/"},{default:o(()=>[n("Spring Cloud 之 Eureka实现服务注册和发现")]),_:1}),n("中有过介绍，这里就不再累述")]),m,e("p",null,[e("a",b,[n("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign"),i(t)])])])}const C=a(u,[["render",g],["__file","024_spring_cloud_notes_feign.html.vue"]]);export{C as default};
