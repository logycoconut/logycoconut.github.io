import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as t,c as i,f as n}from"./app-21511e46.js";const o={},a=n(`<blockquote><p>忘记的时候翻一翻</p></blockquote><h2 id="xml配置" tabindex="-1"><a class="header-anchor" href="#xml配置" aria-hidden="true">#</a> <strong>XML配置</strong></h2><h3 id="ioc容器" tabindex="-1"><a class="header-anchor" href="#ioc容器" aria-hidden="true">#</a> <strong>IOC容器</strong></h3><p><em>使用bean标签，除了id和class属性之外没有其他属性和标签时，采用的就是默认构造函数创建bean对象<br> 如果类中没有默认构造函数，则无法创建</em></p><ul><li>默认构造函数创建</li></ul><p><code>&lt;bean id=&quot;exampleService&quot; class=&quot;com.hall.service.impl.ExampleService&quot;&gt;&lt;/bean&gt;</code></p><ul><li>使用某个类(例如工厂)中的方法创建对象</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;bean id=&quot;instanceFactory&quot; class=&quot;com.hall.factory.InstanceFactory&quot;&gt;&lt;/bean&gt;
&lt;bean id=&quot;exampleService&quot; factory-bean=&quot;instanceFactory&quot; factory-method=&quot;getExampleService&quot;&gt;&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>工厂中的静态方法创建对象（使用某个类中的静态方法创建对象）</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;bean id=&quot;accountService&quot; class=&quot;com.hall.factory.StaticFactory&quot; factory-method=&quot;getExampleService&quot;&gt;&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="di依赖注入" tabindex="-1"><a class="header-anchor" href="#di依赖注入" aria-hidden="true">#</a> <strong>DI依赖注入</strong></h3><h4 id="能注入的数据类型" tabindex="-1"><a class="header-anchor" href="#能注入的数据类型" aria-hidden="true">#</a> <strong>能注入的数据类型</strong></h4><ul><li>基本类型和String类型</li><li>其他的bean类型（在配置文件中或者注解配置过的bean）</li><li>复杂类型/集合类型</li></ul><h4 id="注入方式" tabindex="-1"><a class="header-anchor" href="#注入方式" aria-hidden="true">#</a> <strong>注入方式</strong></h4><ul><li>使用构造函数提供</li></ul><p>使用constructor-arg标签</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;bean id=&quot;exampleService&quot; class=&quot;com.hall.service.impl.ExampleService&quot;&gt;
    &lt;constructor-arg index=&quot;0&quot; value=&quot;张三&quot;&gt;&lt;/constructor-arg&gt;
    &lt;constructor-arg type=&quot;java.lang.Integer&quot; value=&quot;3&quot;&gt;&lt;/constructor-arg&gt;
    &lt;constructor-arg name=&quot;birthday&quot; ref=&quot;now&quot;&gt;&lt;/constructor-arg&gt;
&lt;/bean&gt;
&lt;bean id=&quot;now&quot; class=&quot;java.util.Date&quot;&gt;&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用set方法提供</li></ul><p>使用property标签，需要提供setter方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;bean id=&quot;exampleService&quot; class=&quot;com.hall.service.impl.ExampleService&quot;&gt;
    &lt;property name=&quot;name&quot; value=&quot;张三&quot;&gt;&lt;/property&gt;
    &lt;property name=&quot;age&quot; value=&quot;15&quot;&gt;&lt;/property&gt;
    &lt;property name=&quot;birthday&quot; ref=&quot;now&quot;&gt;&lt;/property&gt;
&lt;/bean&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>使用注解提供</li></ul><h3 id="aop面向切面" tabindex="-1"><a class="header-anchor" href="#aop面向切面" aria-hidden="true">#</a> <strong>AOP面向切面</strong></h3><h4 id="配置aop" tabindex="-1"><a class="header-anchor" href="#配置aop" aria-hidden="true">#</a> <strong>配置AOP</strong></h4><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--开始aop的配置--&gt;
&lt;aop:config&gt;
    &lt;!--配置切面,指定通知类的bean的id--&gt;
    &lt;aop:aspect id=&quot;logAdvice&quot; ref=&quot;logger&quot;&gt; 
        &lt;!--配置通知的类型，并且建立通知方法和切入点方法的关联--&gt;
        &lt;aop:before method=&quot;printLog&quot; pointcut=&quot;execution(* com.hall.service.impl.*.*(..))&quot;&gt;&lt;/aop:before&gt;
    &lt;/aop:aspect&gt;
&lt;/aop:config&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="切入点表达式" tabindex="-1"><a class="header-anchor" href="#切入点表达式" aria-hidden="true">#</a> <strong>切入点表达式</strong></h4><ul><li><strong>表达式</strong> 访问修饰符 返回值 全类名.方法名(参数类别)</li><li><strong>标准的表达式写法</strong> <code> public void com.hall.service.impl.ExampleService.saveExample()</code></li></ul><blockquote><ul><li>访问修饰符可以省略</li><li>返回值可以使用通配符，表示任意返回值</li><li>包名可以使用通配符表示，表示任意包，但是有几级包，就需要写几个*.</li><li>包名可以使用..表示当前包及其子包</li><li>参数列表：</li></ul></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>* 可以直接写数据类型：基本类型直接写名称\`int\`、引用类型写包名.类名的方式 \`java.lang.String\`
* 可以使用通配符表示任意类型，但是必须有参数
* 可以使用..表示有无参数均可，有参数可以是任意类型
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>全通配写法</strong> <code>* *..*.*(..)</code></li><li><strong>实际开发中切入点表达式的通常写法</strong> 切到业务层实现类下的所有方法</li></ul><h3 id="spring事务" tabindex="-1"><a class="header-anchor" href="#spring事务" aria-hidden="true">#</a> <strong>Spring事务</strong></h3><ul><li>配置事务管理器</li><li>配置事务的通知</li><li>建立事务通知和切入点表达式的对应关系</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> &lt;!-- 1. 配置事务管理器 --&gt;
&lt;bean id=&quot;transactionManager&quot; class=&quot;org.springframework.jdbc.datasource.DataSourceTransactionManager&quot;&gt;
    &lt;property name=&quot;dataSource&quot; ref=&quot;dataSource&quot;&gt;&lt;/property&gt;
&lt;/bean&gt;
&lt;!-- 2. 配置事务的通知 --&gt;
&lt;tx:advice id=&quot;txAdvice&quot; transaction-manager=&quot;transactionManager&quot;&gt;
    &lt;!--配置事务的属性
            isolation=&quot;&quot;    用于指定事务的隔离级别 默认是DEFAULT 表示使用数据库的默认隔离级别
            propagation=&quot;&quot;      用于指定事务的传播行为 默认是REQUIRED 表示一定会有事务，增删改的选择，查询方法可以选择SUPPORTS
            read-only=&quot;&quot;        用于指定事务是否只读 只有查询方法才能设置为true 默认是false 表示读写
            timeout=&quot;&quot;      用于指定事务的超时时间
            rollback-for=&quot;&quot;    用于指定一个异常， 当产生该异常是，事务回滚，其他异常不回滚，没有默认值则全都回滚
            no-rollback-for=&quot;&quot;  用于指定一个异常，当产生该异常是，事务不回滚，其他异常回滚，没有默认值则全都回滚
    --&gt;
    &lt;tx:attributes&gt;
        &lt;tx:method name=&quot;*&quot; propagation=&quot;REQUIRED&quot; read-only=&quot;false&quot; /&gt;
        &lt;tx:method name=&quot;find*&quot; propagation=&quot;SUPPORTS&quot; read-only=&quot;true&quot; /&gt;
    &lt;/tx:attributes&gt;
&lt;/tx:advice&gt;

&lt;!-- 3. 配置aop --&gt;
&lt;aop:config&gt;
    &lt;aop:pointcut id=&quot;pt&quot; expression=&quot;execution(* com.hall.service.impl.*.*(..))&quot;&gt;&lt;/aop:pointcut&gt;
    &lt;!--建立切入点表达式和事务通知的对应关系--&gt;
    &lt;aop:advisor advice-ref=&quot;txAdvice&quot; pointcut-ref=&quot;pt&quot; &gt;&lt;/aop:advisor&gt;
&lt;/aop:config&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="注解配置" tabindex="-1"><a class="header-anchor" href="#注解配置" aria-hidden="true">#</a> <strong>注解配置</strong></h2><ul><li><strong>用于创建对象的</strong></li></ul><p><code>@Component(value=&quot;beanId&quot;)</code></p><p><code>@Repository</code>、<code>@Service</code>、<code>@Controller</code>的作用和<code>@Component</code>的作用一样</p><p><code>@Bean(&quot;beanName&quot;)</code> 将对象放入容器</p><ul><li><strong>用于注入数据的</strong></li></ul><p><code>@Autowired</code><br> 自动按照类型注入，只要容器中有唯一的一个bean对象类型和要注入的变量类型匹配，就可以注入成功，否则根据名字匹配</p><p><code>@Qualifier</code><br> 和<code>@Autowired</code>在类型注入的基础上按照名称注入</p><p><code>@Resource</code><br> 默认按照注解对象的名称注入</p><p><code>@Value</code><br> 用于注入基本类型和String类型，可以使用spring的EL表达式<code>\${表达式}</code></p><ul><li><strong>用于配置事务的</strong></li></ul><p><code>@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)</code><br> 使用前需要先在容器中配置事务管理器</p><ul><li><strong>用于配置Configuration的</strong></li></ul><p><code>@Configuration</code><br> 标识spring的配置类，可有可无</p><p><code>@ComponentScan({&quot;com.hall&quot;})</code><br> 标识要扫描的包</p><p><code>@Import(JdbcConfig.class)</code><br> 导入其他配置类，例如数据库连接、事务管理</p><p><code>@PropertySource(&quot;classpath:jdbcConfig.properties&quot;)</code><br> 导入配置文件</p><ul><li><strong>用于Spring整合junit的</strong></li></ul><p><code>@RunWith(SpringJUnit4ClassRunner.class)</code><br> 用于替代原来的方法</p><p><code>@ContextConfiguration(classes=SpringConfiguration.class)</code><br> 用于导入Spring的配置类或配置文件</p><ul><li><strong>用于配置AOP的</strong></li></ul><p><code>@Aspect</code><br> 标注切面</p><p><code>@Pointcut</code><br> 配置切入点表达式</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Pointcut(&quot;execution(* com.hall.service.impl.*.*(..))&quot;)
private void pt(){}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p><code>@Before</code>、<code>@AfterReturning</code>、<code>@AfterThrowing</code>、<code>@After</code><br> 前置通知、后置通知、异常通知、最终通知</p><p><code>@Around</code><br> 环绕通知</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Around(&quot;pt()&quot;)
public Object aroundAdvice(ProceedingJoinPoint joinPoint) {
    Object rtnValue = null;
    try {
        System.out.println(&quot;前置通知&quot;);
        rtnValue = joinPoint.proceed(joinPoint.getArgs());
        System.out.println(&quot;后置通知&quot;);
        return rtnValue;
    } catch (Throwable throwable) {
        System.out.println(&quot;异常通知&quot;);
        throw new RuntimeException(throwable.getMessage());
    } finally {
        System.out.println(&quot;最终通知&quot;);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="joinpoint类型的几个方法" tabindex="-1"><a class="header-anchor" href="#joinpoint类型的几个方法" aria-hidden="true">#</a> JoinPoint类型的几个方法</h3><p><code>Object[] getArgs()</code>：返回执行目标方法时的参数</p><p><code>Signature getSignature()</code>：返回被增强的方法的相关信息。</p><p><code>Object getTarget()</code>：返回被织入advice的目标对象</p><p><code>Object getThis()</code>：返回AOP框架为目标对象生成的代理对象</p>`,64),l=[a];function r(d,s){return t(),i("div",null,l)}const v=e(o,[["render",r],["__file","191002_Spring 配置笔记.html.vue"]]);export{v as default};
