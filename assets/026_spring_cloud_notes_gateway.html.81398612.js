import{_ as d}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as l,c as s,a as e,b as i,d as a,e as r,r as t}from"./app.cee66267.js";const c={},o=r(`<blockquote><p>Spring Cloud Gateway 作为 Spring Cloud 生态系统中的网关，比 Netflix 的 Zuul 组件更加适合 Spring Cloud体系</p><p>大家一定要多看官方文档啊！！文档比我详细多了，本文只是一些简单的应用</p></blockquote><h2 id="为什么要用网关" tabindex="-1"><a class="header-anchor" href="#为什么要用网关" aria-hidden="true">#</a> 为什么要用网关</h2><p>网关是介于客户端和服务器之间的一层，外部请求会先经过网关这一层再转发到其他功能模块中</p><p>所以，我们可以在网关上进行鉴权、监控等操作，让业务模块更加专注于业务</p><ul><li>只将网关对外暴露，隐藏微服务真实地址，保护微服务</li><li>在网关中进行鉴权操作，无须在业务代码中鉴权</li><li>避免了客户端和微服务直接接触 （ 在微服务变更时，重构难度会变大 ）</li></ul><h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h2><h3 id="添加依赖" tabindex="-1"><a class="header-anchor" href="#添加依赖" aria-hidden="true">#</a> 添加依赖</h3><p>网关本质上也是一个微服务，也需要在注册中心注册</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependencies&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;
    &lt;/dependency&gt;
    &lt;dependency&gt;
        &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
        &lt;artifactId&gt;spring-cloud-starter-gateway&lt;/artifactId&gt;
    &lt;/dependency&gt;
&lt;/dependencies&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="相关代码" tabindex="-1"><a class="header-anchor" href="#相关代码" aria-hidden="true">#</a> 相关代码</h3><p>启动类代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>application.yml 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: true  # 是否要通过服务中心自动根据 serviceId 创建路由
          lower-case-service-id: true  #是否将服务id转换为小写
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
logging:
  level:
    org.springframework.cloud.gateway: debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="测试" tabindex="-1"><a class="header-anchor" href="#测试" aria-hidden="true">#</a> 测试</h3><h4 id="是否正确代理" tabindex="-1"><a class="header-anchor" href="#是否正确代理" aria-hidden="true">#</a> 是否正确代理</h4><p>网关转发的语法为<code>网关地址:端口/服务中心注册serviceId/具体的url</code></p>`,17),u={href:"http://localhost:10011/feign-provider/user/info",target:"_blank",rel:"noopener noreferrer"},v=r('<p><em>feign-provider 是之前文章中创建的一个服务提供方</em></p><h4 id="负载均衡" tabindex="-1"><a class="header-anchor" href="#负载均衡" aria-hidden="true">#</a> 负载均衡</h4><p>复制一份 provider 的启动配置并且对返回值进行适当的修改，我们可以看到不同的结果是交替出现的</p><h2 id="路由规则匹配" tabindex="-1"><a class="header-anchor" href="#路由规则匹配" aria-hidden="true">#</a> 路由规则匹配</h2><p>我们现在知道了 gateway 自动根据 serviceId 创建路由的方式，但是怎么自定义路由规则呢</p><p>我们需要先清楚三个概念</p><ul><li>Route（路由）：它由一个 ID，一个目标 URI，一组断言和一组过滤器定义。如果断言为真，则路由匹配。</li><li>Predicate（断言）：这是一个 Java 8 的 Predicate。输入类型是一个 ServerWebExchange。我们可以使用它来匹配来自 HTTP 请求的任何内容，例如 headers 或参数。</li><li>Filter（过滤器）：GatewayFilter的实例，我们可以使用它修改请求和响应。</li></ul>',7),p={href:"https://cloud.spring.io/spring-cloud-gateway/reference/html/#glossary",target:"_blank",rel:"noopener noreferrer"},h=r(`<h3 id="简单实现" tabindex="-1"><a class="header-anchor" href="#简单实现" aria-hidden="true">#</a> 简单实现</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      routes:
        - id: provider-service  # 路由的唯一Id
          uri: https://github.com/  # 目标服务地址
          predicates:  # 路由条件，接受一个输入参数，返回一个布尔值结果
            - Path=/logycoconut
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置的意思是：配置了一个名为<code>provider-service</code>的规则，当访问地址<code>http://localhost:10011/logycoconut</code>时会自动转发到地址<code>https://github.com/logycoconut</code></p><p>这是路由匹配规则的一种，还有其他的可以参照文档，包括通过时间、Cookie、请求方式、请求参数等匹配</p>`,4),b={href:"https://cloud.spring.io/spring-cloud-gateway/reference/html/#gateway-request-predicates-factories",target:"_blank",rel:"noopener noreferrer"},m=r(`<h2 id="gateway-中的-filter" tabindex="-1"><a class="header-anchor" href="#gateway-中的-filter" aria-hidden="true">#</a> Gateway 中的 Filter</h2><h3 id="简单实现-1" tabindex="-1"><a class="header-anchor" href="#简单实现-1" aria-hidden="true">#</a> 简单实现</h3><h4 id="更改网关的配置文件" tabindex="-1"><a class="header-anchor" href="#更改网关的配置文件" aria-hidden="true">#</a> 更改网关的配置文件</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10011
spring:
  application:
    name: gateway
  cloud:
    gateway:
      discovery:
        locator:
          enabled: false  # 是否要通过服务中心自动根据 serviceId 创建路由
          lower-case-service-id: false  #是否将服务id转换为小写
      routes:
        - id: provider-service  # 路由的唯一Id
          uri: lb://feign-provider  # 目标服务地址
          predicates:  # 路由条件，接受一个输入参数，返回一个布尔值结果
            - Path=/user/info
          filters:
            - AddRequestParameter=name, zhangsan
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
logging:
  level:
    org.springframework.cloud.gateway: debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上述配置的意思是：将符合路径<code>/user/info</code>的请求都添加了<code>name=zhangsan</code>的请求参数</p><p><code>lb://feign-provider</code>是Gateway Global Filter的一种运用，如果 URL 中具有 lb，就使用负载均衡客户端将 URL 解析成实际的地址加端口</p><h4 id="修改-provider-服务验证请求" tabindex="-1"><a class="header-anchor" href="#修改-provider-服务验证请求" aria-hidden="true">#</a> 修改 provider 服务验证请求</h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RestController
@RequestMapping(&quot;user&quot;)
public class ProviderController {

    @GetMapping(&quot;info&quot;)
    public String info(String name) {
        return &quot;我叫张三，今年二十三&quot; + name;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,10),g={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/gateway",target:"_blank",rel:"noopener noreferrer"},f=e("h2",{id:"参考资料",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考资料","aria-hidden":"true"},"#"),i(" 参考资料")],-1),_={href:"https://cloud.spring.io/spring-cloud-gateway/reference/html/",target:"_blank",rel:"noopener noreferrer"},x={href:"https://www.jianshu.com/p/5e40bbc95eb9",target:"_blank",rel:"noopener noreferrer"},y={href:"https://www.haoyizebo.com/posts/1e919f7d/",target:"_blank",rel:"noopener noreferrer"};function w(k,I){const n=t("ExternalLinkIcon");return l(),s("div",null,[o,e("p",null,[i("我们通过访问 "),e("a",u,[i("http://localhost:10011/feign-provider/user/info"),a(n)]),i(" 发现可以得到正确结果")]),v,e("p",null,[e("em",null,[e("a",p,[i("上述概念原文地址"),a(n)]),i("，我是可耻的搬运工")])]),h,e("p",null,[e("a",b,[i("路由规则拓展"),a(n)])]),m,e("p",null,[e("a",g,[i("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/gateway"),a(n)])]),f,e("p",null,[e("a",_,[i("Spring Cloud Gateway官方文档"),a(n)])]),e("p",null,[e("a",x,[i("spring cloud gateway 2 深入了解 - filter"),a(n)]),i(" 常用网关过滤器和全局过滤器介绍")]),e("p",null,[e("a",y,[i("Spring Cloud Gateway 过滤器"),a(n)]),i(" 自定义过滤器")])])}const q=d(c,[["render",w],["__file","026_spring_cloud_notes_gateway.html.vue"]]);export{q as default};
