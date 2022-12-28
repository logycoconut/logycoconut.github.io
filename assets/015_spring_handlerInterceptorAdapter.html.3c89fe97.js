import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as i,e as r}from"./app.751617fe.js";const d={},l=r(`<blockquote><p>在Web开发中，我们经常需要对请求拦截并做一些动作，比如日志记录、权限检测或者性能检测等</p></blockquote><h2 id="handlerinterceptor" tabindex="-1"><a class="header-anchor" href="#handlerinterceptor" aria-hidden="true">#</a> HandlerInterceptor</h2><p>SpringMVC中提供了<code>HandlerInterceptor</code>接口, 我们来大致看一下它的源码 ( <strong>省略参数和异常以方便阅读</strong> )</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface HandlerInterceptor {
    // 请求处理之前调用, 当此方法返回true时才执行后续代码, 否则流程中断
    default boolean preHandle() { return true; }

    // 请求处理之后调用
    default void postHandle() { }  
    
    // 请求完成之后调用, 一般用于资源的清理
    default void afterCompletion() { }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="handlerinterceptoradapter" tabindex="-1"><a class="header-anchor" href="#handlerinterceptoradapter" aria-hidden="true">#</a> HandlerInterceptorAdapter</h2><p>有时候我们只需要在请求前拦截, 也就是只需要实现<code>preHandle</code>方法, 对于之后流程并不关心, 但是<code>HandlerInterceptor</code>接口需要我们同时实现三个接口, 所以Spring为我们提供了<code>HandlerInterceptorAdapter</code>类, 我们可以选择只复写需要的方法</p><p><strong>我们来看看源码 ( 省略参数和异常以方便阅读 )</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public abstract class HandlerInterceptorAdapter implements AsyncHandlerInterceptor {

	@Override
	public boolean preHandle() { return true; }

	@Override
	public void postHandle() {}

	@Override
	public void afterCompletion() {}

	@Override
	public void afterConcurrentHandlingStarted(){}

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="权限检测场景" tabindex="-1"><a class="header-anchor" href="#权限检测场景" aria-hidden="true">#</a> 权限检测场景</h2><p>项目中有些接口需要对请求方进行登录检测, 检测通过之后才能访问 所以我们可能需要写一个登录的拦截器, 在请求处理之前进行检测</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 伪代码，主要是为了演示
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String cookieValue = CookieUtils.getCookieValue(request, cookieName);

        try {
            // 用公钥解析cookie中携带的token信息
            JwtUtils.parseToken(configuration.getPublicKey(), cookieValue);
            return true;
        } catch (Exception e) {
            throw new CommonException(CodeStatus.FORBIDDEN);
        }
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="还有最重要的一步" tabindex="-1"><a class="header-anchor" href="#还有最重要的一步" aria-hidden="true">#</a> 还有最重要的一步</h2><p>当然是将我们的拦截器交由给Spring管理, 不然不会生效</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Bean
    public LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor()).addPathPatterns(&quot;/**&quot;);
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),a=[l];function s(t,c){return n(),i("div",null,a)}const u=e(d,[["render",s],["__file","015_spring_handlerInterceptorAdapter.html.vue"]]);export{u as default};
