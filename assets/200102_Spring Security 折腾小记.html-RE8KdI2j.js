import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-CRoaDNLO.js";const l={};function t(p,s){return i(),a("div",null,s[0]||(s[0]=[e(`<blockquote><p>使用Spring Security过程中遇到的问题</p></blockquote><h2 id="web-xml配置" tabindex="-1"><a class="header-anchor" href="#web-xml配置"><span><strong>Web.xml配置</strong></span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;!--指定spring-security配置文件的路径--&gt;</span></span>
<span class="line"><span>&lt;context-param&gt;</span></span>
<span class="line"><span>    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;</span></span>
<span class="line"><span>    &lt;param-value&gt;classpath:spring-security.xml&lt;/param-value&gt;</span></span>
<span class="line"><span>&lt;/context-param&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--过滤器的名字不能变--&gt;</span></span>
<span class="line"><span>&lt;filter&gt;</span></span>
<span class="line"><span>    &lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;</span></span>
<span class="line"><span>    &lt;filter-class&gt;org.springframework.web.filter.DelegatingFilterProxy&lt;/filter-class&gt;</span></span>
<span class="line"><span>&lt;/filter&gt;</span></span>
<span class="line"><span>&lt;filter-mapping&gt;</span></span>
<span class="line"><span>    &lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;</span></span>
<span class="line"><span>    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;</span></span>
<span class="line"><span>&lt;/filter-mapping&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;!--配置监听器--&gt;</span></span>
<span class="line"><span>&lt;listener&gt;</span></span>
<span class="line"><span>    &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;</span></span>
<span class="line"><span>&lt;/listener&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-security-xml配置" tabindex="-1"><a class="header-anchor" href="#spring-security-xml配置"><span><strong>Spring-Security.xml配置</strong></span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:security=&quot;http://www.springframework.org/schema/security&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>    http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span>    http://www.springframework.org/schema/security</span></span>
<span class="line"><span>    http://www.springframework.org/schema/security/spring-security.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;security:global-method-security jsr250-annotations=&quot;enabled&quot; secured-annotations=&quot;enabled&quot; /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 配置不拦截的资源 --&gt;</span></span>
<span class="line"><span>    &lt;security:http pattern=&quot;/login.jsp&quot; security=&quot;none&quot;/&gt;</span></span>
<span class="line"><span>    &lt;security:http pattern=&quot;/failure.jsp&quot; security=&quot;none&quot;/&gt;</span></span>
<span class="line"><span>    &lt;security:http pattern=&quot;/css/**&quot; security=&quot;none&quot;/&gt;</span></span>
<span class="line"><span>    &lt;security:http pattern=&quot;/img/**&quot; security=&quot;none&quot;/&gt;</span></span>
<span class="line"><span>    &lt;security:http pattern=&quot;/plugins/**&quot; security=&quot;none&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--配置具体的规则--&gt;</span></span>
<span class="line"><span>    &lt;security:http auto-config=&quot;true&quot; use-expressions=&quot;false&quot;&gt;</span></span>
<span class="line"><span>        &lt;!-- 配置拦截的规则 --&gt;</span></span>
<span class="line"><span>        &lt;security:intercept-url pattern=&quot;/**&quot; access=&quot;ROLE_USER,ROLE_ADMIN&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- 定义跳转的具体的页面 --&gt;</span></span>
<span class="line"><span>        &lt;security:form-login</span></span>
<span class="line"><span>                login-page=&quot;/login.jsp&quot;</span></span>
<span class="line"><span>                login-processing-url=&quot;/login.do&quot;</span></span>
<span class="line"><span>                default-target-url=&quot;/index.jsp&quot;</span></span>
<span class="line"><span>                authentication-failure-url=&quot;/failer.jsp&quot;</span></span>
<span class="line"><span>                authentication-success-forward-url=&quot;/pages/main.jsp&quot;</span></span>
<span class="line"><span>        /&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- 关闭跨域请求 --&gt;</span></span>
<span class="line"><span>        &lt;security:csrf disabled=&quot;true&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        &lt;!-- 退出 --&gt;</span></span>
<span class="line"><span>        &lt;security:logout invalidate-session=&quot;true&quot; logout-url=&quot;/logout.do&quot; logout-success-url=&quot;/login.jsp&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;/security:http&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 使用数据库中的用户名和密码 --&gt;</span></span>
<span class="line"><span>    &lt;security:authentication-manager&gt;</span></span>
<span class="line"><span>        &lt;!--配置自己编写的userService--&gt;</span></span>
<span class="line"><span>        &lt;security:authentication-provider user-service-ref=&quot;userService&quot;&gt;</span></span>
<span class="line"><span>            &lt;!-- 配置加密的方式 --&gt;</span></span>
<span class="line"><span>            &lt;security:password-encoder ref=&quot;passwordEncoder&quot;/&gt;</span></span>
<span class="line"><span>        &lt;/security:authentication-provider&gt;</span></span>
<span class="line"><span>    &lt;/security:authentication-manager&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 配置加密类 --&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;passwordEncoder&quot; class=&quot;org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder&quot;/&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="userdetailsservice接口" tabindex="-1"><a class="header-anchor" href="#userdetailsservice接口"><span><strong>UserDetailsService接口</strong></span></a></h2><blockquote><p>Spring Security框架已经为我们写好了用户认证的流程，我们只需编写继承自UserDetailsService的用户服务层，并重写loadUserByUsername方法即可</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Service</span></span>
<span class="line"><span>public class UserService implements IUserService {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 查询出数据库中的userinfo并将其封装到框架为我们提供的User类中</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {</span></span>
<span class="line"><span>        UserInfo userinfo = null;</span></span>
<span class="line"><span>        try {</span></span>
<span class="line"><span>            userinfo = userDao.findByUsername(username);</span></span>
<span class="line"><span>        } catch (Exception e) {</span></span>
<span class="line"><span>            e.printStackTrace();</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        // 处理自己的用户对象封装成UserDetails</span></span>
<span class="line"><span>        return new User(userinfo.getUsername(), userinfo.getPassword(), getAuthority(userinfo.getRoles()));</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 返回一个List集合，集合中装入的是角色描述</span></span>
<span class="line"><span>    private List&lt;SimpleGrantedAuthority&gt; getAuthority(List&lt;Role&gt; roles) {</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>        List&lt;SimpleGrantedAuthority&gt; list = new ArrayList&lt;&gt;();</span></span>
<span class="line"><span>        for (Role role : roles) {</span></span>
<span class="line"><span>            list.add(new SimpleGrantedAuthority(&quot;ROLE_&quot; + role.getRoleName()));</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>        return list;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span> }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法权限控制" tabindex="-1"><a class="header-anchor" href="#方法权限控制"><span><strong>方法权限控制</strong></span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// JSR-250</span></span>
<span class="line"><span>@RolesAllowed(&quot;ROLE_USER&quot;)表示访问对应方法时所应该具有的角色</span></span>
<span class="line"><span>@PermitAll表示允许所有的角色进行访问，也就是说不进行权限控制 </span></span>
<span class="line"><span>@DenyAll是和PermitAll相反的，表示无论什么角色都不能访问 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>// secured注解</span></span>
<span class="line"><span>@Secured(&quot;ROLE_USER&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 支持表达式的注解</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10)]))}const d=n(l,[["render",t],["__file","200102_Spring Security 折腾小记.html.vue"]]),u=JSON.parse(`{"path":"/archive/blog/2020/200102_Spring%20Security%20%E6%8A%98%E8%85%BE%E5%B0%8F%E8%AE%B0.html","title":"Spring Security 折腾小记🐵","lang":"zh-CN","frontmatter":{"title":"Spring Security 折腾小记🐵","date":"2020-01-02T13:03:09.000Z","draft":false,"category":["关于技术"],"tag":["Spring Security"],"description":"使用Spring Security过程中遇到的问题 Web.xml配置 Spring-Security.xml配置 UserDetailsService接口 Spring Security框架已经为我们写好了用户认证的流程，我们只需编写继承自UserDetailsService的用户服务层，并重写loadUserByUsername方法即可 方法权限控制","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2020/200102_Spring%20Security%20%E6%8A%98%E8%85%BE%E5%B0%8F%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"Spring Security 折腾小记🐵"}],["meta",{"property":"og:description","content":"使用Spring Security过程中遇到的问题 Web.xml配置 Spring-Security.xml配置 UserDetailsService接口 Spring Security框架已经为我们写好了用户认证的流程，我们只需编写继承自UserDetailsService的用户服务层，并重写loadUserByUsername方法即可 方法权限控制"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"Spring Security"}],["meta",{"property":"article:published_time","content":"2020-01-02T13:03:09.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Spring Security 折腾小记🐵\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-01-02T13:03:09.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"Web.xml配置","slug":"web-xml配置","link":"#web-xml配置","children":[]},{"level":2,"title":"Spring-Security.xml配置","slug":"spring-security-xml配置","link":"#spring-security-xml配置","children":[]},{"level":2,"title":"UserDetailsService接口","slug":"userdetailsservice接口","link":"#userdetailsservice接口","children":[]},{"level":2,"title":"方法权限控制","slug":"方法权限控制","link":"#方法权限控制","children":[]}],"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":1,"url":"https://github.com/logycoconut"},{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":4,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":2.02,"words":607},"filePathRelative":"archive/blog/2020/200102_Spring Security 折腾小记.md","localizedDate":"2020年1月2日","autoDesc":true}`);export{d as comp,u as data};
