import{_ as l}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as t,c as p,a as n,d as a,b as e,e as i,r as c}from"./app.638b9557.js";const r={},o=i(`<blockquote><p>如果我们要去租房，我们可能首先要去找中介，中介手上有很多房源，我们能在中介这里找到自己需要的房源</p><p>而微服务体系中，也存在这么一个中介，就是服务注册与发现中心，它为服务的提供者和服务的消费者提供一个交流的平台，Provider可以在注册中心注册供其他服务使用，Consumer可以在注册中心中寻找自己需要的服务</p><p>Eureka是Netflix开发的服务发现组件，Spring Cloud将它集成在其子项目spring-cloud-netflix中，以实现Spring Cloud的服务发现功能</p></blockquote><h2 id="简单实现" tabindex="-1"><a class="header-anchor" href="#简单实现" aria-hidden="true">#</a> 简单实现</h2><h3 id="版本说明和依赖" tabindex="-1"><a class="header-anchor" href="#版本说明和依赖" aria-hidden="true">#</a> 版本说明和依赖</h3><ul><li>Java: 1.8</li><li>Spring Boot: 2.3.2.RELEASE</li><li>Spring Cloud: Hoxton.SR8</li></ul><div class="language-xml line-numbers-mode" data-ext="xml"><pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-dependencies<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">&gt;</span></span>Hoxton.SR8<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>type</span><span class="token punctuation">&gt;</span></span>pom<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>type</span><span class="token punctuation">&gt;</span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>scope</span><span class="token punctuation">&gt;</span></span>import<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>scope</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencyManagement</span><span class="token punctuation">&gt;</span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependencies</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">&gt;</span></span>org.springframework.cloud<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">&gt;</span></span>
        <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">&gt;</span></span>spring-cloud-starter-netflix-eureka-server<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">&gt;</span></span>
    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">&gt;</span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependencies</span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建注册中心" tabindex="-1"><a class="header-anchor" href="#创建注册中心" aria-hidden="true">#</a> 创建注册中心</h3><ol><li>给启动文件加上注解</li></ol><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@EnableEurekaServer
@SpringBootApplication
public class EurekaServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@EnableEurekaServer</code> 表明启动一个注册中心节点</p><ol start="2"><li>新建 application.yml</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>registry
<span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10010</span>
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">register-with-eureka</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>  <span class="token comment"># 不将自己注册到注册中心</span>
    <span class="token key atrule">fetch-registry</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>  <span class="token comment"># 不从eureka获取注册信息</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>10010/eureka/  <span class="token comment"># 注册中心的访问地址</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),u={start:"3"},d={href:"http://localhost:10010",target:"_blank",rel:"noopener noreferrer"},v=i(`<h3 id="创建服务提供者" tabindex="-1"><a class="header-anchor" href="#创建服务提供者" aria-hidden="true">#</a> 创建服务提供者</h3><ol><li>给启动文件加上注解</li></ol><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@EnableEurekaClient
@SpringBootApplication
public class EurekaProviderApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaProviderApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>新建 application.yml</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10011</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>provider
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//localhost<span class="token punctuation">:</span>10010/eureka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),k={start:"3"},m={href:"http://localhost:10010",target:"_blank",rel:"noopener noreferrer"},g=n("li",null,[n("p",null,"创建一个简单的接口来模拟我们提供的服务")],-1),b=i(`<div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapping(&quot;user&quot;)
public class ProviderController {

    @GetMapping(&quot;info&quot;)
    public String info() {
        return &quot;我叫张三，今年二十三&quot;;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建服务服务消费者" tabindex="-1"><a class="header-anchor" href="#创建服务服务消费者" aria-hidden="true">#</a> 创建服务服务消费者</h3><ol><li>给启动文件加上注解并注入RestTemplate</li></ol><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@EnableEurekaClient
@SpringBootApplication
public class EurekaConsumerApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(EurekaConsumerApplication.class, args);
    }

    /**
     * 启用负载均衡, 使得 RestTemplate 可以直接通过服务名找到对应的IP地址
     */
    @LoadBalanced
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>新建 application.yml</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">server</span><span class="token punctuation">:</span>
  <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">10012</span>
<span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">application</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> eureka<span class="token punctuation">-</span>consumer
<span class="token key atrule">eureka</span><span class="token punctuation">:</span>
  <span class="token key atrule">client</span><span class="token punctuation">:</span>
    <span class="token key atrule">service-url</span><span class="token punctuation">:</span>
      <span class="token key atrule">defaultZone</span><span class="token punctuation">:</span> http<span class="token punctuation">:</span>//127.0.0.1<span class="token punctuation">:</span>10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建一个简单的接口来模拟消费服务</li></ol><div class="language-Java line-numbers-mode" data-ext="Java"><pre class="language-Java"><code>@RestController
@RequestMapping(&quot;user&quot;)
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;

    private static final String APPLICATION_NAME = &quot;eureka-provider&quot;;

    @GetMapping(&quot;consume&quot;)
    public String consume() {
        String providerUrl = &quot;http://&quot; + APPLICATION_NAME + &quot;/user/info&quot;;
        return this.restTemplate.getForObject(providerUrl, String.class);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><p>请求consume方法可以看到成功返回数据</p></li><li><p>我们可以provider服务的方法中加入打印日志，并同时启动两个provider服务，查看控制台信息，验证负载均衡功能</p></li></ol><p><img src="https://i.loli.net/2020/12/24/GXPeplQ4VS79CTW.png" alt="GXPeplQ4VS79CTW" loading="lazy"></p><p><img src="https://i.loli.net/2020/12/24/oDFIB4sjkuTezyL.png" alt="oDFIB4sjkuTezyL" loading="lazy"></p><h2 id="eureka实现高可用" tabindex="-1"><a class="header-anchor" href="#eureka实现高可用" aria-hidden="true">#</a> Eureka实现高可用</h2><p>实现高可用的关建就是运行多台Eureka服务器并让他们相互注册，并让其他服务都注册到这些注册中心</p><h3 id="修改注册中心配置" tabindex="-1"><a class="header-anchor" href="#修改注册中心配置" aria-hidden="true">#</a> 修改注册中心配置</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  profiles: eureka-registry1
  application:
    name: eureka-registry1
server:
  port: 10010
eureka:
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://localhost:10009/eureka  # 注册到 eureka-registry2 上

---

spring:
  profiles: eureka-registry2
  application:
    name: eureka-registry2
server:
  port: 10009
eureka:
  client:
    registerWithEureka: true
    fetchRegistry: true
    serviceUrl:
      defaultZone: http://localhost:10010/eureka  # 注册到 eureka-registry1 上
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在idea的Services栏中复制一份注册中心的启动配置</p><p><img src="https://i.loli.net/2020/12/25/6xjV4yhogvaYmHL.png" alt="微信截图_20201225113543.png" loading="lazy"></p><p>修改profiles参数</p><p><img src="https://i.loli.net/2020/12/25/qZGuwPynCVR1mbM.png" alt="微信截图_20201225113610.png" loading="lazy"></p><h3 id="修改服务提供者和消费者的配置" tabindex="-1"><a class="header-anchor" href="#修改服务提供者和消费者的配置" aria-hidden="true">#</a> 修改服务提供者和消费者的配置</h3><p>就是在client服务中添加所有的server地址, 但是要注意的是client1配置server1, server2，client2配置server2, server1</p><p>client会优先从第一个开始找，找到能连通的就从那里同步数据，找不到会继续找一直到最后。如果前面的server挂掉了，就找后面的server， 这样才能达到高可用的目的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eureka:
  client:
    service-url:
      defaultZone: http://localhost:10010/eureka, http://localhost:10009/eureka
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,25),h={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/eureka",target:"_blank",rel:"noopener noreferrer"};function y(f,_){const s=c("ExternalLinkIcon");return t(),p("div",null,[o,n("ol",u,[n("li",null,[a("运行 Application.java 文件，并访问 "),n("a",d,[a("http://localhost:10010"),e(s)]),a(" （没有任何后缀）")])]),v,n("ol",k,[n("li",null,[n("p",null,[a("运行 Application.java 文件，并查看 "),n("a",m,[a("http://localhost:10010"),e(s)]),a(" 是否有提供商的注册信息")])]),g]),b,n("p",null,[n("a",h,[a("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/eureka"),e(s)])])])}const E=l(r,[["render",y],["__file","023_spring_cloud_notes_eureka.html.vue"]]);export{E as default};
