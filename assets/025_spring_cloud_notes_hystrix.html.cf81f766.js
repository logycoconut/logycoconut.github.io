import{_ as n}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as r,a as e,b as l,d as a,e as s,r as d}from"./app.ba4eec26.js";const o={},c=s(`<blockquote><p>在微服务架构中，通常会使用 Feign 来进行服务间的相互调用，一个请求，可能需要调用多个微服务接口才能实现，会形成非常复杂的调用链路</p><p>我们假设以下场景，如果服务提供方突然宕机或者出现网络问题，那消费方就会迟迟收不到回应，处理的线程得不到释放，随着请求的增加，服务器的资源也会逐渐耗尽，导致服务瘫痪</p><p>因为服务间的依赖性，整个微服务体系就会发生雪崩</p></blockquote><p>Hystix应运而生，它可以在服务提供方故障的时候，隔离远程服务，快速响应结果，防止出现级联失败</p><h2 id="在feign上使用熔断器" tabindex="-1"><a class="header-anchor" href="#在feign上使用熔断器" aria-hidden="true">#</a> 在Feign上使用熔断器</h2><p>在不使用 Feign 的前提下也是可以使用 Hystrix 的，需要的可以自行了解，本文介绍的是 Feign 和 Hystrix 结合使用的情况</p><ol><li>开启 hystrix 配置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>feign:
  hystrix:
    enabled: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>为 client 指定一个失败回调的类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@FeignClient(value = &quot;feign-provider&quot;, path = &quot;user&quot;, fallback = ProviderClientFallback.class)
public interface ProviderClient extends ProviderApi { }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>当发生服务熔断或者降级的情况时，会返回回调类中相同签名的方法的值</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class ProviderClientFallback implements ProviderClient {
    @Override
    public String info() {
        return &quot;调用失败&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,12),u={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign",target:"_blank",rel:"noopener noreferrer"};function v(p,m){const i=d("ExternalLinkIcon");return t(),r("div",null,[c,e("p",null,[e("a",u,[l("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/feign"),a(i)])])])}const h=n(o,[["render",v],["__file","025_spring_cloud_notes_hystrix.html.vue"]]);export{h as default};
