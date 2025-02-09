import{_ as n}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as l,c as a,a as e,b as d,d as r,f as t}from"./app-d43a649e.js";const u={},v=t(`<blockquote><p>Spring Cloud Stream 是 Spring Cloud 体系中的消息中间件组件，它集成了 kafka 和 rabbitMQ</p><p>它屏蔽掉了底层不同消息中间件之间的差异，降低了学习成本和维护成本 (就像我们用 ORM 框架来取代直接操作数据库一样)</p></blockquote><h2 id="快速上手" tabindex="-1"><a class="header-anchor" href="#快速上手" aria-hidden="true">#</a> 快速上手</h2><p>编写代码之前我们需要搭建一个 rabbitMQ 环境，这里不再累述</p><h3 id="构建消息生产者-stream-producer" tabindex="-1"><a class="header-anchor" href="#构建消息生产者-stream-producer" aria-hidden="true">#</a> 构建消息生产者 stream-producer</h3><ol><li>引入依赖</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-stream-rabbit&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建启动类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
public class StreamProducerApplication {
    public static void main(String[] args) {
        SpringApplication.run(StreamProducerApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10011
spring:
  application:
    name: stream-producer
  rabbitmq:  # 我们的 rabbitMQ 配置
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
  cloud:
    stream:
      bindings:
        output:  # 该属性的值就是 org.springframework.cloud.stream.messaging.Source 中的 @Output(&quot;output&quot;) 注解的 value 值
          destination: stream.message  # 绑定的交换机名称
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>编写发送消息的类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@EnableBinding(Source.class)
public class MessageProducer {

    @Autowired
    private Source source;

    public void send(String message) {
        source.output().send(MessageBuilder.withPayload(message).build());
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="构建消息消费者-stream-consumer" tabindex="-1"><a class="header-anchor" href="#构建消息消费者-stream-consumer" aria-hidden="true">#</a> 构建消息消费者 stream-consumer</h3><ol><li>引入依赖</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;org.springframework.cloud&lt;/groupId&gt;
    &lt;artifactId&gt;spring-cloud-starter-stream-rabbit&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建启动类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@SpringBootApplication
public class StreamConsumerApplication {
    public static void main(String[] args) {
        SpringApplication.run(StreamConsumerApplication.class, args);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>配置文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10012
spring:
  application:
    name: stream-consumer
  rabbitmq:
    host: localhost
    port: 5672
    username: guest
    password: guest
    virtual-host: /
  cloud:
    stream:
      bindings:
        input:
          destination: stream.message
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>编写消费消息的类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@EnableBinding(Sink.class)
public class MessageConsumer {

    @StreamListener(Sink.INPUT)
    public void receive(String message) {
        System.out.println(&quot;message = &quot; + message);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>发现了没？除了生产消息和消费消息的类，其他都是一模一样的</p><h3 id="测试服务可用性" tabindex="-1"><a class="header-anchor" href="#测试服务可用性" aria-hidden="true">#</a> 测试服务可用性</h3><p>我们在消息生产者这边编写测试代码</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class MessageProducerTest {

    @Autowired
    private MessageProducer messageProducer;

    @Test
    public void testSend(){
        messageProducer.send(&quot;你好呀&quot;);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>消费者这边我们可以看到控制台成功打印消息</p><figure><img src="https://i.loli.net/2021/01/18/m4ziAH8wjDrLn3p.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="高级部分" tabindex="-1"><a class="header-anchor" href="#高级部分" aria-hidden="true">#</a> 高级部分</h2><p>现在我们对 stream-consumer 的配置文件进行修改</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>server:
  port: 10012
spring:
  application:
    name: stream-consumer
  cloud:
    stream:
      bindings:
        input:
          destination: stream.message
          binder: remote_rabbit
      binders:
        remote_rabbit:
          type: rabbit
          environment:
            spring:
              rabbitmq:
                host: 47.96.146.241
                port: 5672
                username: guest
                password: guest
                virtual-host: /
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10010/eureka/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重新运行，发现还是可以成功运行的</p><h3 id="配置解析" tabindex="-1"><a class="header-anchor" href="#配置解析" aria-hidden="true">#</a> 配置解析</h3><p><strong>我们结合下面这张图来解释配置文件</strong></p><figure><img src="https://i.loli.net/2021/01/18/hDzm6pjI4JtrZP8.png" alt="hDzm6pjI4JtrZP8" tabindex="0" loading="lazy"><figcaption>hDzm6pjI4JtrZP8</figcaption></figure><p><code>spring.cloud.stream.binders</code> 声明一个 binder，命名为 remote_rabbit，type 为 rabbit ，表示使用的是 rabbitmq 消息中间件，如果用的是 kafka ，则 type 设置为 kafka。environment 就是使用的消息中间件的配置信息。可以声明多个 binder 以适配不同的场景</p><p><code>spring.cloud.stream.bindings</code> 中可以声明多个 channel （通道），如上面这个配置文件中，就声明一个 input 消息接收通道，绑定了 rabbit 的 stream.message 交换机。这就意味着 input 通道可以接收 rabbit 中推到 stream.message 交换机的信息</p><p><strong>需要注意的是</strong>，这个 input 可不是乱写的，观察我们上面的代码，消费消息类的 receive 方法上的 @StreamListener(Sink.INPUT) 注解</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface Sink {
    String INPUT = &quot;input&quot;;

    @Input(&quot;input&quot;)
    SubscribableChannel input();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>也就是说，这个 input 就是 org.springframework.cloud.stream.messaging.Sink 中的 @Input(&quot;input&quot;) 注解的 value 值</p><p>好了，现在我们清楚了，标注了 @StreamListener(Sink.INPUT) 的这个方法就是用来监听 input 绑定的 remote_rabbit 的 stream.message 交换机的信息的（觉得绕的多读几遍哈哈）</p><p><em>消息生产者的 output 也同理，具体可以查看 org.springframework.cloud.stream.messaging.Source 的源码</em></p><p><em>这也是 SpringBoot 的约定大于配置思想的体现</em></p><h3 id="自定义消息通道" tabindex="-1"><a class="header-anchor" href="#自定义消息通道" aria-hidden="true">#</a> 自定义消息通道</h3><p>根据上面的思想，我们可以仿照官方来编写自己的消息通道</p><ol><li>自定义消息接收通道</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface MySink {
    String MY_INPUT = &quot;my_input&quot;;

    @Input(MY_INPUT)
    SubscribableChannel input();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>增加配置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  cloud:
    stream:
      bindings:
        input:
          destination: stream.message
          binder: remote_rabbit
        my_input:
          destination: stream.my_input_message
          binder: remote_rabbit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>改造 MessageConsumer 类</li></ol><p>在 @EnableBinding 中增加 MySink.class</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@EnableBinding({Sink.class, MySink.class})
public class MessageConsumer {

    @StreamListener(Sink.INPUT)
    public void receive(String message) {
        System.out.println(&quot;message = &quot; + message);
    }


    @StreamListener(MySink.MY_INPUT)
    public void receiveMyInput(String message) {
        System.out.println(&quot;my message = &quot; + message);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li><p>重启项目，并打开 rabbitmq 的可视化界面</p><ul><li>发布一条消息</li></ul></li></ol><figure><img src="https://i.loli.net/2021/01/18/qei2asorGvERSM1.png" alt="qei2asorGvERSM1" tabindex="0" loading="lazy"><figcaption>qei2asorGvERSM1</figcaption></figure><ul><li>结果如下</li></ul><figure><img src="https://i.loli.net/2021/01/18/1AG7PzVvjs3lhIe.png" alt="1AG7PzVvjs3lhIe" tabindex="0" loading="lazy"><figcaption>1AG7PzVvjs3lhIe</figcaption></figure><h3 id="消息分组" tabindex="-1"><a class="header-anchor" href="#消息分组" aria-hidden="true">#</a> 消息分组</h3><p>在微服务体系下，我们的服务有可能不是一个实例，但是对于消息我们只需要消费一次，而不是让所有的实例都消费。</p><p>Spring Cloud Stream 的解决方案是设置 group， 只要把这些实例的 group 设为同一个，那就只有一个实例消费消息，避免重复消费。这是因为如果设置了 group，那么 exchange 流向的 queue 名称就会成为 group 的名称，否则就是随机字符串</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  cloud:
    stream:
      bindings:
        input:
          destination: stream.message
          binder: remote_rabbit
        my_input:
          destination: stream.my_input_message
          binder: remote_rabbit
          group: my_group
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="消息回执" tabindex="-1"><a class="header-anchor" href="#消息回执" aria-hidden="true">#</a> 消息回执</h3><p>消息回执，顾名思义就是收到消息后再做处理</p><p>我们假设需要在消息消费后发送一条信息到日志服务</p><ol><li>定义消息通道</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 消息接收通道
public interface LogSink {
    String LOG_INPUT = &quot;log_input&quot;;

    @Input(LOG_INPUT)
    SubscribableChannel input();
}

// 消息发送通道
public interface LogSource {
    String LOG_OUTPUT = &quot;log_output&quot;;

    @Output(LOG_OUTPUT)
    MessageChannel output();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>改造 MessageConsumer 类</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@EnableBinding({Sink.class, MySink.class, LogSource.class, LogSink.class})
public class MessageConsumer {

    @StreamListener(Sink.INPUT)
    public void receive(String message) {
        System.out.println(&quot;message = &quot; + message);
    }

    /**
     * 在监听到 MySink.MY_INPUT 后，通过 SendTo 将处理后的消息发送到 LogSource.LOG_OUTPUT
     * @param message 收到的消息
     * @return 日志内容
     */
    @StreamListener(MySink.MY_INPUT)
    @SendTo(LogSource.LOG_OUTPUT)
    public String receiveMyInput(String message) {
        System.out.println(&quot;my message = &quot; + message);
        return &quot;log&quot; + message;
    }

    @StreamListener(LogSink.LOG_INPUT)
    public void logMessage(String message) {
        System.out.println(&quot;log message = &quot; + message);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>增加配置</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  cloud:
    stream:
      bindings:
        log_input:
          destination: stream.log_message
          binder: remote_rabbit
        log_output:
          destination: stream.log_message
          binder: remote_rabbit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>配置完成，重启项目试试看吧</p><h3 id="其他" tabindex="-1"><a class="header-anchor" href="#其他" aria-hidden="true">#</a> 其他</h3><p>Spring Cloud Stream 中还有消费分区、消息降级等概念，篇幅有限，就不做展开啦(<em><sup>▽</sup></em>)</p><h2 id="相关源码地址" tabindex="-1"><a class="header-anchor" href="#相关源码地址" aria-hidden="true">#</a> 相关源码地址</h2><p>仅供参考</p>`,73),c={href:"https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/stream",target:"_blank",rel:"noopener noreferrer"};function m(o,b){const i=s("ExternalLinkIcon");return l(),a("div",null,[v,e("p",null,[e("a",c,[d("https://github.com/logycoconut/Spring-Cloud-Notes/tree/master/stream"),r(i)])])])}const h=n(u,[["render",m],["__file","210116_Spring Cloud 之 Spring Cloud Stream.html.vue"]]);export{h as default};
