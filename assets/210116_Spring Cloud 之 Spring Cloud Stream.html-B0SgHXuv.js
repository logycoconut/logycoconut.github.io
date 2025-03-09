import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,o as e}from"./app-mbwvGqXF.js";const l={};function p(r,s){return e(),a("div",null,s[0]||(s[0]=[i(`<blockquote><p>Spring Cloud Stream 是 Spring Cloud 体系中的消息中间件组件，它集成了 kafka 和 rabbitMQ</p><p>它屏蔽掉了底层不同消息中间件之间的差异，降低了学习成本和维护成本 (就像我们用 ORM 框架来取代直接操作数据库一样)</p></blockquote><h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手"><span>快速上手</span></a></h2><p>编写代码之前我们需要搭建一个 rabbitMQ 环境，这里不再累述</p><h3 id="构建消息生产者-stream-producer" tabindex="-1"><a class="header-anchor" href="#构建消息生产者-stream-producer"><span>构建消息生产者 stream-producer</span></a></h3><ol><li>引入依赖</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-cloud-starter-stream-rabbit&lt;/artifactId&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建启动类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class StreamProducerApplication {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(StreamProducerApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置文件</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 10011</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: stream-producer</span></span>
<span class="line"><span>  rabbitmq:  # 我们的 rabbitMQ 配置</span></span>
<span class="line"><span>    host: localhost</span></span>
<span class="line"><span>    port: 5672</span></span>
<span class="line"><span>    username: guest</span></span>
<span class="line"><span>    password: guest</span></span>
<span class="line"><span>    virtual-host: /</span></span>
<span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        output:  # 该属性的值就是 org.springframework.cloud.stream.messaging.Source 中的 @Output(&quot;output&quot;) 注解的 value 值</span></span>
<span class="line"><span>          destination: stream.message  # 绑定的交换机名称</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://127.0.0.1:10010/eureka/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>编写发送消息的类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@EnableBinding(Source.class)</span></span>
<span class="line"><span>public class MessageProducer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private Source source;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void send(String message) {</span></span>
<span class="line"><span>        source.output().send(MessageBuilder.withPayload(message).build());</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建消息消费者-stream-consumer" tabindex="-1"><a class="header-anchor" href="#构建消息消费者-stream-consumer"><span>构建消息消费者 stream-consumer</span></a></h3><ol><li>引入依赖</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;dependency&gt;</span></span>
<span class="line"><span>    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;</span></span>
<span class="line"><span>    &lt;artifactId&gt;spring-cloud-starter-stream-rabbit&lt;/artifactId&gt;</span></span>
<span class="line"><span>&lt;/dependency&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建启动类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@SpringBootApplication</span></span>
<span class="line"><span>public class StreamConsumerApplication {</span></span>
<span class="line"><span>    public static void main(String[] args) {</span></span>
<span class="line"><span>        SpringApplication.run(StreamConsumerApplication.class, args);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置文件</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 10012</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: stream-consumer</span></span>
<span class="line"><span>  rabbitmq:</span></span>
<span class="line"><span>    host: localhost</span></span>
<span class="line"><span>    port: 5672</span></span>
<span class="line"><span>    username: guest</span></span>
<span class="line"><span>    password: guest</span></span>
<span class="line"><span>    virtual-host: /</span></span>
<span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        input:</span></span>
<span class="line"><span>          destination: stream.message</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://127.0.0.1:10010/eureka/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>编写消费消息的类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@EnableBinding(Sink.class)</span></span>
<span class="line"><span>public class MessageConsumer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @StreamListener(Sink.INPUT)</span></span>
<span class="line"><span>    public void receive(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;message = &quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现了没？除了生产消息和消费消息的类，其他都是一模一样的</p><h3 id="测试服务可用性" tabindex="-1"><a class="header-anchor" href="#测试服务可用性"><span>测试服务可用性</span></a></h3><p>我们在消息生产者这边编写测试代码</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@RunWith(SpringJUnit4ClassRunner.class)</span></span>
<span class="line"><span>@SpringBootTest</span></span>
<span class="line"><span>public class MessageProducerTest {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Autowired</span></span>
<span class="line"><span>    private MessageProducer messageProducer;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Test</span></span>
<span class="line"><span>    public void testSend(){</span></span>
<span class="line"><span>        messageProducer.send(&quot;你好呀&quot;);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者这边我们可以看到控制台成功打印消息</p><figure><img src="https://i.loli.net/2021/01/18/m4ziAH8wjDrLn3p.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="高级部分" tabindex="-1"><a class="header-anchor" href="#高级部分"><span>高级部分</span></a></h2><p>现在我们对 stream-consumer 的配置文件进行修改</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>server:</span></span>
<span class="line"><span>  port: 10012</span></span>
<span class="line"><span>spring:</span></span>
<span class="line"><span>  application:</span></span>
<span class="line"><span>    name: stream-consumer</span></span>
<span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        input:</span></span>
<span class="line"><span>          destination: stream.message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span>
<span class="line"><span>      binders:</span></span>
<span class="line"><span>        remote_rabbit:</span></span>
<span class="line"><span>          type: rabbit</span></span>
<span class="line"><span>          environment:</span></span>
<span class="line"><span>            spring:</span></span>
<span class="line"><span>              rabbitmq:</span></span>
<span class="line"><span>                host: 47.96.146.241</span></span>
<span class="line"><span>                port: 5672</span></span>
<span class="line"><span>                username: guest</span></span>
<span class="line"><span>                password: guest</span></span>
<span class="line"><span>                virtual-host: /</span></span>
<span class="line"><span>eureka:</span></span>
<span class="line"><span>  client:</span></span>
<span class="line"><span>    service-url:</span></span>
<span class="line"><span>      defaultZone: http://127.0.0.1:10010/eureka/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行，发现还是可以成功运行的</p><h3 id="配置解析" tabindex="-1"><a class="header-anchor" href="#配置解析"><span>配置解析</span></a></h3><p><strong>我们结合下面这张图来解释配置文件</strong></p><figure><img src="https://i.loli.net/2021/01/18/hDzm6pjI4JtrZP8.png" alt="hDzm6pjI4JtrZP8" tabindex="0" loading="lazy"><figcaption>hDzm6pjI4JtrZP8</figcaption></figure><p><code>spring.cloud.stream.binders</code> 声明一个 binder，命名为 remote_rabbit，type 为 rabbit ，表示使用的是 rabbitmq 消息中间件，如果用的是 kafka ，则 type 设置为 kafka。environment 就是使用的消息中间件的配置信息。可以声明多个 binder 以适配不同的场景</p><p><code>spring.cloud.stream.bindings</code> 中可以声明多个 channel （通道），如上面这个配置文件中，就声明一个 input 消息接收通道，绑定了 rabbit 的 stream.message 交换机。这就意味着 input 通道可以接收 rabbit 中推到 stream.message 交换机的信息</p><p><strong>需要注意的是</strong>，这个 input 可不是乱写的，观察我们上面的代码，消费消息类的 receive 方法上的 @StreamListener(Sink.INPUT) 注解</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface Sink {</span></span>
<span class="line"><span>    String INPUT = &quot;input&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Input(&quot;input&quot;)</span></span>
<span class="line"><span>    SubscribableChannel input();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，这个 input 就是 org.springframework.cloud.stream.messaging.Sink 中的 @Input(&quot;input&quot;) 注解的 value 值</p><p>好了，现在我们清楚了，标注了 @StreamListener(Sink.INPUT) 的这个方法就是用来监听 input 绑定的 remote_rabbit 的 stream.message 交换机的信息的（觉得绕的多读几遍哈哈）</p><p><em>消息生产者的 output 也同理，具体可以查看 org.springframework.cloud.stream.messaging.Source 的源码</em></p><p><em>这也是 SpringBoot 的约定大于配置思想的体现</em></p><h3 id="自定义消息通道" tabindex="-1"><a class="header-anchor" href="#自定义消息通道"><span>自定义消息通道</span></a></h3><p>根据上面的思想，我们可以仿照官方来编写自己的消息通道</p><ol><li>自定义消息接收通道</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>public interface MySink {</span></span>
<span class="line"><span>    String MY_INPUT = &quot;my_input&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Input(MY_INPUT)</span></span>
<span class="line"><span>    SubscribableChannel input();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>增加配置</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        input:</span></span>
<span class="line"><span>          destination: stream.message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span>
<span class="line"><span>        my_input:</span></span>
<span class="line"><span>          destination: stream.my_input_message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>改造 MessageConsumer 类</li></ol><p>在 @EnableBinding 中增加 MySink.class</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@EnableBinding({Sink.class, MySink.class})</span></span>
<span class="line"><span>public class MessageConsumer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @StreamListener(Sink.INPUT)</span></span>
<span class="line"><span>    public void receive(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;message = &quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @StreamListener(MySink.MY_INPUT)</span></span>
<span class="line"><span>    public void receiveMyInput(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;my message = &quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><p>重启项目，并打开 rabbitmq 的可视化界面</p><ul><li>发布一条消息</li></ul></li></ol><figure><img src="https://i.loli.net/2021/01/18/qei2asorGvERSM1.png" alt="qei2asorGvERSM1" tabindex="0" loading="lazy"><figcaption>qei2asorGvERSM1</figcaption></figure><ul><li>结果如下</li></ul><figure><img src="https://i.loli.net/2021/01/18/1AG7PzVvjs3lhIe.png" alt="1AG7PzVvjs3lhIe" tabindex="0" loading="lazy"><figcaption>1AG7PzVvjs3lhIe</figcaption></figure><h3 id="消息分组" tabindex="-1"><a class="header-anchor" href="#消息分组"><span>消息分组</span></a></h3><p>在微服务体系下，我们的服务有可能不是一个实例，但是对于消息我们只需要消费一次，而不是让所有的实例都消费。</p><p>Spring Cloud Stream 的解决方案是设置 group， 只要把这些实例的 group 设为同一个，那就只有一个实例消费消息，避免重复消费。这是因为如果设置了 group，那么 exchange 流向的 queue 名称就会成为 group 的名称，否则就是随机字符串</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        input:</span></span>
<span class="line"><span>          destination: stream.message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span>
<span class="line"><span>        my_input:</span></span>
<span class="line"><span>          destination: stream.my_input_message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span>
<span class="line"><span>          group: my_group</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消息回执" tabindex="-1"><a class="header-anchor" href="#消息回执"><span>消息回执</span></a></h3><p>消息回执，顾名思义就是收到消息后再做处理</p><p>我们假设需要在消息消费后发送一条信息到日志服务</p><ol><li>定义消息通道</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 消息接收通道</span></span>
<span class="line"><span>public interface LogSink {</span></span>
<span class="line"><span>    String LOG_INPUT = &quot;log_input&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Input(LOG_INPUT)</span></span>
<span class="line"><span>    SubscribableChannel input();</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 消息发送通道</span></span>
<span class="line"><span>public interface LogSource {</span></span>
<span class="line"><span>    String LOG_OUTPUT = &quot;log_output&quot;;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Output(LOG_OUTPUT)</span></span>
<span class="line"><span>    MessageChannel output();</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>改造 MessageConsumer 类</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Component</span></span>
<span class="line"><span>@EnableBinding({Sink.class, MySink.class, LogSource.class, LogSink.class})</span></span>
<span class="line"><span>public class MessageConsumer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @StreamListener(Sink.INPUT)</span></span>
<span class="line"><span>    public void receive(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;message = &quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    /**</span></span>
<span class="line"><span>     * 在监听到 MySink.MY_INPUT 后，通过 SendTo 将处理后的消息发送到 LogSource.LOG_OUTPUT</span></span>
<span class="line"><span>     * @param message 收到的消息</span></span>
<span class="line"><span>     * @return 日志内容</span></span>
<span class="line"><span>     */</span></span>
<span class="line"><span>    @StreamListener(MySink.MY_INPUT)</span></span>
<span class="line"><span>    @SendTo(LogSource.LOG_OUTPUT)</span></span>
<span class="line"><span>    public String receiveMyInput(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;my message = &quot; + message);</span></span>
<span class="line"><span>        return &quot;log&quot; + message;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @StreamListener(LogSink.LOG_INPUT)</span></span>
<span class="line"><span>    public void logMessage(String message) {</span></span>
<span class="line"><span>        System.out.println(&quot;log message = &quot; + message);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>增加配置</li></ol><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>  cloud:</span></span>
<span class="line"><span>    stream:</span></span>
<span class="line"><span>      bindings:</span></span>
<span class="line"><span>        log_input:</span></span>
<span class="line"><span>          destination: stream.log_message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span>
<span class="line"><span>        log_output:</span></span>
<span class="line"><span>          destination: stream.log_message</span></span>
<span class="line"><span>          binder: remote_rabbit</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成，重启项目试试看吧</p><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他"><span>其他</span></a></h3><p>Spring Cloud Stream 中还有消费分区、消息降级等概念，篇幅有限，就不做展开啦(<em><sup>▽</sup></em>)</p><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址"><span>相关源码地址</span></a></h2><p>仅供参考</p><p><a href="https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/stream" target="_blank" rel="noopener noreferrer">https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/stream</a></p>`,74)]))}const c=n(l,[["render",p],["__file","210116_Spring Cloud 之 Spring Cloud Stream.html.vue"]]),u=JSON.parse(`{"path":"/archive/blog/2021/210116_Spring%20Cloud%20%E4%B9%8B%20Spring%20Cloud%20Stream.html","title":"Spring Cloud 之 Spring Cloud Stream","lang":"zh-CN","frontmatter":{"title":"Spring Cloud 之 Spring Cloud Stream","date":"2021-01-16T06:40:00.000Z","draft":false,"category":["关于技术"],"tag":["SpringCloud"],"description":"Spring Cloud Stream 是 Spring Cloud 体系中的消息中间件组件，它集成了 kafka 和 rabbitMQ 它屏蔽掉了底层不同消息中间件之间的差异，降低了学习成本和维护成本 (就像我们用 ORM 框架来取代直接操作数据库一样) 快速上手 编写代码之前我们需要搭建一个 rabbitMQ 环境，这里不再累述 构建消息生产者 s...","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2021/210116_Spring%20Cloud%20%E4%B9%8B%20Spring%20Cloud%20Stream.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"Spring Cloud 之 Spring Cloud Stream"}],["meta",{"property":"og:description","content":"Spring Cloud Stream 是 Spring Cloud 体系中的消息中间件组件，它集成了 kafka 和 rabbitMQ 它屏蔽掉了底层不同消息中间件之间的差异，降低了学习成本和维护成本 (就像我们用 ORM 框架来取代直接操作数据库一样) 快速上手 编写代码之前我们需要搭建一个 rabbitMQ 环境，这里不再累述 构建消息生产者 s..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://i.loli.net/2021/01/18/m4ziAH8wjDrLn3p.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"SpringCloud"}],["meta",{"property":"article:published_time","content":"2021-01-16T06:40:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Cloud 之 Spring Cloud Stream\\",\\"image\\":[\\"https://i.loli.net/2021/01/18/m4ziAH8wjDrLn3p.png\\",\\"https://i.loli.net/2021/01/18/hDzm6pjI4JtrZP8.png\\",\\"https://i.loli.net/2021/01/18/qei2asorGvERSM1.png\\",\\"https://i.loli.net/2021/01/18/1AG7PzVvjs3lhIe.png\\"],\\"datePublished\\":\\"2021-01-16T06:40:00.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"快速上手","slug":"快速上手","link":"#快速上手","children":[{"level":3,"title":"构建消息生产者 stream-producer","slug":"构建消息生产者-stream-producer","link":"#构建消息生产者-stream-producer","children":[]},{"level":3,"title":"构建消息消费者 stream-consumer","slug":"构建消息消费者-stream-consumer","link":"#构建消息消费者-stream-consumer","children":[]},{"level":3,"title":"测试服务可用性","slug":"测试服务可用性","link":"#测试服务可用性","children":[]}]},{"level":2,"title":"高级部分","slug":"高级部分","link":"#高级部分","children":[{"level":3,"title":"配置解析","slug":"配置解析","link":"#配置解析","children":[]},{"level":3,"title":"自定义消息通道","slug":"自定义消息通道","link":"#自定义消息通道","children":[]},{"level":3,"title":"消息分组","slug":"消息分组","link":"#消息分组","children":[]},{"level":3,"title":"消息回执","slug":"消息回执","link":"#消息回执","children":[]},{"level":3,"title":"其他","slug":"其他","link":"#其他","children":[]}]},{"level":2,"title":"相关源码地址","slug":"相关源码地址","link":"#相关源码地址","children":[]}],"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":1,"url":"https://github.com/logycoconut"},{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":4,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":4.64,"words":1392},"filePathRelative":"archive/blog/2021/210116_Spring Cloud 之 Spring Cloud Stream.md","localizedDate":"2021年1月16日","autoDesc":true}`);export{c as comp,u as data};
