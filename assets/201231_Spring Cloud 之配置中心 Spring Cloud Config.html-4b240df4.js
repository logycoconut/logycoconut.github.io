import{_ as a}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as r,c as t,a as e,b as i,d,f as l}from"./app-d082d9eb.js";const c={},v=l(`<blockquote><p>对于一些简单的应用，我们一般都是直接把配置信息写在 application.yml 中，复杂点的就分成dev、prod之类，但是这样做有两个缺点，一是当我们修改了配置之后，必须要重启服务才能使服务生效，二则是随着应用和配置信息的增多，我们很容易在修改配置信息的过程中混乱</p><p>为了实现对配置文件的实时更新和统一管理，我们需要一个配置中心，用来存放和发放配置信息</p></blockquote><h2 id="构建配置中心-从本地读取配置" tabindex="-1"><a class="header-anchor" href="#构建配置中心-从本地读取配置" aria-hidden="true">#</a> 构建配置中心，从本地读取配置</h2><p>1、新建一个 SpringBoot 项目，并导入依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-config-server&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、使用 @EnableConfigServer 开启配置服务器</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、通过配置 spring.profile.active=native 来使配置中心从本地读取配置，读取的路径为 classpath 下的 shared 目录</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10013
spring:
  application:
    name: config-server
  profiles:
    active: native
  cloud:
    config:
      server:
        native:
          search-locations: classpath:/shared
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、在 resources 目录下新建 shared 文件夹，在 shared 文件夹下新建一个 config-client-dev.yml 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>user:
  username: zhangsan
server:
  port: 8989
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="构建-config-client" tabindex="-1"><a class="header-anchor" href="#构建-config-client" aria-hidden="true">#</a> 构建 Config Client</h2><p>1、新建一个 SpringBoot 项目，并导入依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-config&lt;/artifactId&gt;
&lt;/dependency&gt;
&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-web&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、在 resources 目录下新建 bootstrap.yml 文件</p><p><em>bootstrap 由父 ApplicationContext 加载，比 applicaton 优先加载</em></p><p><em>boostrap 里面的属性不能被覆盖</em></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  application:
    name: config-client
  cloud:
    config:
      uri: http://localhost:10013
  profiles:
    active: dev
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、写一个测试接口，通过 @Value 注入配置中的信息，就像配置文件在本地一样，该怎么用就怎么用</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
@RestController
public class ConfigClientApplication {

    @Value(&quot;\${user.username}&quot;)
    private String username;

    @GetMapping(&quot;/&quot;)
    public String home() {
        return username;
    }
    
    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、启动服务，我们可以发现 client 服务的端口是 我们随意编写的 8989，访问 localhost:8989，可以得到结果 <code>zhangsan</code></p><p>可见 config-client 成功地从 config-server 应用的 shared 目录 读取到 配置文件 config-client-dev.yml 中的 user.username 变量</p><h2 id="构建配置中心-从git仓库中读取配置" tabindex="-1"><a class="header-anchor" href="#构建配置中心-从git仓库中读取配置" aria-hidden="true">#</a> 构建配置中心，从Git仓库中读取配置</h2><p>1、修改 config server 的配置文件 application.yml</p><p>仔细观察可以发现就是将配置文件路径换成 git 仓库</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10013
spring:
  application:
    name: config-server
  cloud:
    config:
      server:
        git:
          uri: https://gitee.com/logycoconut/config-example
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面是最简单的一种方式，这个仓库是公开仓库，配置信息不需要任何其他信息就可以读取到</p><p>但是，如果仓库是私有的话就得加入用户名密码等配置信息，相关信息如下表</p><table><thead><tr><th>配置</th><th>解释</th></tr></thead><tbody><tr><td>spring.cloud.config.server.git.uri</td><td>git仓库地址</td></tr><tr><td>spring.cloud.config.server.git.username</td><td>访问仓库的用户名</td></tr><tr><td>spring.cloud.config.server.git.password</td><td>访问仓库的用户密码</td></tr><tr><td>spring.cloud.config.server.git.search-paths</td><td>仓库路径</td></tr><tr><td>spring.cloud.config.server.git.basedir</td><td>本地仓库路径</td></tr><tr><td>spring.cloud.config.label</td><td>仓库的分支</td></tr></tbody></table><p>2、将我们的配置信息上传到仓库中，重启服务测试结果<br><img src="https://i.loli.net/2021/01/04/c1uxoH8veXEUR6K.png" alt="c1uxoH8veXEUR6K" loading="lazy"></p><h2 id="实现自动刷新" tabindex="-1"><a class="header-anchor" href="#实现自动刷新" aria-hidden="true">#</a> 实现自动刷新</h2><p>目前，我们只实现了对配置文件的统一管理，但是还没有实现实时更新，如果我们在 git 仓库里面的配置文件有改动，本地还是需要重启服务才能接收到最新配置，那和我们在本地修改有啥区别呢？</p><p>所以我们来修改 config-client 项目以达到刷新的效果</p><p>1、引入 spring-boot-starter-actuator 包</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
    &lt;artifactId&gt;spring-boot-starter-actuator&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>2、增加相关配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>management:
  endpoint:
    shutdown:
      enabled: true  # 开启这个之后，我们向 /actuator/shutdown 发送 POST 请求可以优雅的关闭应用
  endpoints:
    web:
      exposure:
        include: &quot;*&quot;  # 需要开启的端点，* 表示开启所有端口，这里主要用到的是 refresh 这个端点，我们可以访问 /actuator 查看开启的节点
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、在需要读取配置的类上增加 @RefreshScope 注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
@RestController
@RefreshScope
public class ConfigClientApplication {

    @Value(&quot;\${user.username}&quot;)
    private String username;

    @GetMapping(&quot;/&quot;)
    public String home() {
        return username;
    }

    public static void main(String[] args) {
        SpringApplication.run(ConfigClientApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,38),u={href:"http://127.0.0.1:8989/actuator/refresh",target:"_blank",rel:"noopener noreferrer"},o=l(`<figure><img src="https://i.loli.net/2021/01/06/zOAYjbc6EW4qRfo.png" alt="zOAYjbc6EW4qRfo" tabindex="0" loading="lazy"><figcaption>zOAYjbc6EW4qRfo</figcaption></figure><p>好，我们可以访问 localhost:8989 发现结果已经变了，但是好像还是有点不对，说好的自动刷新呢，这不是手动发送一个请求吗</p><p>别急，以 Gitee 为例，我们可以通过这个钩子函数在仓库有 push 操作后向 actuator/refresh 发送 POST 请求，但是这个地址要是可以被 gitee 访问到的。同样的，github 也有类似的webhook可供调用</p><figure><img src="https://i.loli.net/2021/01/06/AnJxOZU4vtcThmr.png" alt="AnJxOZU4vtcThmr" tabindex="0" loading="lazy"><figcaption>AnJxOZU4vtcThmr</figcaption></figure><h2 id="使用-spring-cloud-bus-来刷新多个客户端" tabindex="-1"><a class="header-anchor" href="#使用-spring-cloud-bus-来刷新多个客户端" aria-hidden="true">#</a> 使用 Spring Cloud Bus 来刷新多个客户端</h2><p>单个服务我们可以为其配置 Webhook，但是应用多了之后再一个个配置未免太麻烦，Spring Cloud Bus 就是为此而生，它可以在微服务节点之间进行广播，通知状态的更改（例如配置更改）</p><p>我们通过 Spring Cloud Bus 将所有节点连接在一起，当有一个节点触发了更新配置后，Spring Cloud Bus 就会将此事件更新到其他节点</p><p>以下步骤都是在 client 端操作</p><p>1、搭建 RabbitMQ 环境</p><p>我是通过 docker 快速搭了一个</p><p>2、在 client 引入依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
   &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
   &lt;artifactId&gt;spring-cloud-starter-bus-amqp&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、增加 RabbitMQ 相关配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>4、启动两个 client 服务进行测试</p><p>复制一份 client 的启动配置，并且加上不同的启动端口</p><figure><img src="https://i.loli.net/2021/01/06/23BUPtn9KmVvONk.png" alt="23BUPtn9KmVvONk" tabindex="0" loading="lazy"><figcaption>23BUPtn9KmVvONk</figcaption></figure><p>5、POST 访问任意一个 client 的 actuator/bus-refresh 地址</p><p>查看控制台输出，会看到这两个服务都有类似的日志输出，表示配置已经刷新</p><figure><img src="https://i.loli.net/2021/01/06/z4l8VoaCj965mEf.png" alt="z4l8VoaCj965mEf" tabindex="0" loading="lazy"><figcaption>z4l8VoaCj965mEf</figcaption></figure><h2 id="将配置中心注册到eureka" tabindex="-1"><a class="header-anchor" href="#将配置中心注册到eureka" aria-hidden="true">#</a> 将配置中心注册到Eureka</h2><p>1、启动一个 Eureka 注册中心</p><p>之前我们已经介绍过 Eureka 的相关知识，所以这里不再累述</p><p>2、配置 Config 服务端</p><p>加入 Eureka 依赖</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-netflix-eureka-client&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加入配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>启动类增加 @EnableEurekaClient 注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@EnableEurekaClient
@EnableConfigServer
@SpringBootApplication
public class ConfigServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(ConfigServerApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>3、配置 Config 客户端</p><p>前三步和 Config 服务端类似，现在我们的 client 配置文件是这样的</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>spring:
  application:
    name: config-client
  cloud:
    config:
      uri: http://localhost:10013
  profiles:
    active: dev
  rabbitmq:
    host: 127.0.0.1
    port: 5672
    username: guest
    password: guest
management:
  endpoint:
    shutdown:
      enabled: true  # 开启这个之后，我们向 /actuator/shutdown 发送 POST 请求可以优雅的关闭应用
  endpoints:
    web:
      exposure:
        include: &quot;*&quot;  # 需要开启的端点，* 表示开启所有端口，这里主要用到的是 refresh 这个端点，我们可以访问 /actuator 查看开启的节点
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>接入注册中心后，配置客户端和配置服务端不应该再通过固定的 http 地址通信了，而是应该通过服务名</p><p>改造 spring.cloud.config 配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  cloud:
    config:
      discovery:
        enabled: true  # 开启Config服务发现支持
        service-id: config-server  # 配置中心服务器的服务名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ok，重启服务试试是不是和之前一样呢</p><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,39),p={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/config",target:"_blank",rel:"noopener noreferrer"};function g(m,b){const n=s("ExternalLinkIcon");return r(),t("div",null,[v,e("p",null,[i("4、最后一步，我们修改一下放在仓库中的配置文件，并向 "),e("a",u,[i("http://127.0.0.1:8989/actuator/refresh"),d(n)]),i(" 发送一个 POST 请求，这个接口就是用来触发加载新配置的")]),o,e("p",null,[e("a",p,[i("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/config"),d(n)])])])}const x=a(c,[["render",g],["__file","201231_Spring Cloud 之配置中心 Spring Cloud Config.html.vue"]]);export{x as default};
