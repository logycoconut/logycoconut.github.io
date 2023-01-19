import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as i,c as n,e as t}from"./app.087d842a.js";const s={},l=t(`<blockquote><p>使用Spring Security过程中遇到的问题</p></blockquote><h2 id="web-xml配置" tabindex="-1"><a class="header-anchor" href="#web-xml配置" aria-hidden="true">#</a> <strong>Web.xml配置</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!--指定spring-security配置文件的路径--&gt;
&lt;context-param&gt;
    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;
    &lt;param-value&gt;classpath:spring-security.xml&lt;/param-value&gt;
&lt;/context-param&gt;

&lt;!--过滤器的名字不能变--&gt;
&lt;filter&gt;
    &lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;
    &lt;filter-class&gt;org.springframework.web.filter.DelegatingFilterProxy&lt;/filter-class&gt;
&lt;/filter&gt;
&lt;filter-mapping&gt;
    &lt;filter-name&gt;springSecurityFilterChain&lt;/filter-name&gt;
    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;
&lt;/filter-mapping&gt;

&lt;!--配置监听器--&gt;
&lt;listener&gt;
    &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;
&lt;/listener&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-security-xml配置" tabindex="-1"><a class="header-anchor" href="#spring-security-xml配置" aria-hidden="true">#</a> <strong>Spring-Security.xml配置</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;
       xmlns:security=&quot;http://www.springframework.org/schema/security&quot;
       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
       xsi:schemaLocation=&quot;http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/security
    http://www.springframework.org/schema/security/spring-security.xsd&quot;&gt;

    &lt;security:global-method-security jsr250-annotations=&quot;enabled&quot; secured-annotations=&quot;enabled&quot; /&gt;

    &lt;!-- 配置不拦截的资源 --&gt;
    &lt;security:http pattern=&quot;/login.jsp&quot; security=&quot;none&quot;/&gt;
    &lt;security:http pattern=&quot;/failure.jsp&quot; security=&quot;none&quot;/&gt;
    &lt;security:http pattern=&quot;/css/**&quot; security=&quot;none&quot;/&gt;
    &lt;security:http pattern=&quot;/img/**&quot; security=&quot;none&quot;/&gt;
    &lt;security:http pattern=&quot;/plugins/**&quot; security=&quot;none&quot;/&gt;

    &lt;!--配置具体的规则--&gt;
    &lt;security:http auto-config=&quot;true&quot; use-expressions=&quot;false&quot;&gt;
        &lt;!-- 配置拦截的规则 --&gt;
        &lt;security:intercept-url pattern=&quot;/**&quot; access=&quot;ROLE_USER,ROLE_ADMIN&quot;/&gt;

        &lt;!-- 定义跳转的具体的页面 --&gt;
        &lt;security:form-login
                login-page=&quot;/login.jsp&quot;
                login-processing-url=&quot;/login.do&quot;
                default-target-url=&quot;/index.jsp&quot;
                authentication-failure-url=&quot;/failer.jsp&quot;
                authentication-success-forward-url=&quot;/pages/main.jsp&quot;
        /&gt;

        &lt;!-- 关闭跨域请求 --&gt;
        &lt;security:csrf disabled=&quot;true&quot;/&gt;

        &lt;!-- 退出 --&gt;
        &lt;security:logout invalidate-session=&quot;true&quot; logout-url=&quot;/logout.do&quot; logout-success-url=&quot;/login.jsp&quot;/&gt;

    &lt;/security:http&gt;

    &lt;!-- 使用数据库中的用户名和密码 --&gt;
    &lt;security:authentication-manager&gt;
        &lt;!--配置自己编写的userService--&gt;
        &lt;security:authentication-provider user-service-ref=&quot;userService&quot;&gt;
            &lt;!-- 配置加密的方式 --&gt;
            &lt;security:password-encoder ref=&quot;passwordEncoder&quot;/&gt;
        &lt;/security:authentication-provider&gt;
    &lt;/security:authentication-manager&gt;

    &lt;!-- 配置加密类 --&gt;
    &lt;bean id=&quot;passwordEncoder&quot; class=&quot;org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder&quot;/&gt;

&lt;/beans&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="userdetailsservice接口" tabindex="-1"><a class="header-anchor" href="#userdetailsservice接口" aria-hidden="true">#</a> <strong>UserDetailsService接口</strong></h2><blockquote><p>Spring Security框架已经为我们写好了用户认证的流程，我们只需编写继承自UserDetailsService的用户服务层，并重写loadUserByUsername方法即可</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Service
public class UserService implements IUserService {

    // 查询出数据库中的userinfo并将其封装到框架为我们提供的User类中
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserInfo userinfo = null;
        try {
            userinfo = userDao.findByUsername(username);
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 处理自己的用户对象封装成UserDetails
        return new User(userinfo.getUsername(), userinfo.getPassword(), getAuthority(userinfo.getRoles()));
    }
    
    // 返回一个List集合，集合中装入的是角色描述
    private List&lt;SimpleGrantedAuthority&gt; getAuthority(List&lt;Role&gt; roles) {
    
        List&lt;SimpleGrantedAuthority&gt; list = new ArrayList&lt;&gt;();
        for (Role role : roles) {
            list.add(new SimpleGrantedAuthority(&quot;ROLE_&quot; + role.getRoleName()));
        }
        return list;
    }
 }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="方法权限控制" tabindex="-1"><a class="header-anchor" href="#方法权限控制" aria-hidden="true">#</a> <strong>方法权限控制</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// JSR-250
@RolesAllowed(&quot;ROLE_USER&quot;)表示访问对应方法时所应该具有的角色
@PermitAll表示允许所有的角色进行访问，也就是说不进行权限控制 
@DenyAll是和PermitAll相反的，表示无论什么角色都不能访问 

// secured注解
@Secured(&quot;ROLE_USER&quot;)

// 支持表达式的注解
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),r=[l];function a(d,u){return i(),n("div",null,r)}const o=e(s,[["render",a],["__file","008_spring_security_notes.html.vue"]]);export{o as default};
