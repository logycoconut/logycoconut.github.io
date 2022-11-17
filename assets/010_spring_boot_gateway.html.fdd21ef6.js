import{_ as i}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as e,c as n,e as l}from"./app.119b4650.js";const d={},s=l(`<blockquote><ul><li>SpringCloud采用了Zuul作为微服务的网口</li><li>Zuul网关为全部微服务提供唯一入口, 避免直接暴露接口, 后台服务更加安全</li><li>对每个请求鉴权</li><li>处理跨域请求</li></ul></blockquote><h2 id="跨域请求处理" tabindex="-1"><a class="header-anchor" href="#跨域请求处理" aria-hidden="true">#</a> 跨域请求处理</h2><p>关于跨域问题, 现在一般都采用CORS方案(一个W3C标准)解决, 需要服务器和浏览器同时支持,但是开发者只需要关心服务器实现即可, 其他的都由浏览器完成</p><p>浏览器会在请求中加上一些头信息，例如Origin, 我们需要以此判断是否允许其跨域，然后在响应头中加入一些信息</p><p>SpringMVC内部实现了CORS的跨域过滤器 <code>CorsFilter</code> , 我们可以直接用, 编写代码将其注入到容器中即可</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        // 1.添加Cors配置信息
        CorsConfiguration config = new CorsConfiguration();
        // 1.1 允许的域
        config.addAllowedOrigin(&quot;http://example.com&quot;);
        // 1.2 是否发送Cookie信息
        config.setAllowCredentials(true);
        // 1.3 允许的请求方式
        config.addAllowedMethod(&quot;OPTIONS&quot;);
        config.addAllowedMethod(&quot;HEAD&quot;);
        config.addAllowedMethod(&quot;GET&quot;);
        config.addAllowedMethod(&quot;PUT&quot;);
        config.addAllowedMethod(&quot;POST&quot;);
        config.addAllowedMethod(&quot;DELETE&quot;);
        config.addAllowedMethod(&quot;PATCH&quot;);
        // 1.4允许的头信息
        config.addAllowedHeader(&quot;*&quot;);

        //2.添加映射路径，我们拦截一切请求
        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
        configSource.registerCorsConfiguration(&quot;/**&quot;, config);

        //3.返回新的CorsFilter.
        return new CorsFilter(configSource);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h2 id="请求鉴权" tabindex="-1"><a class="header-anchor" href="#请求鉴权" aria-hidden="true">#</a> 请求鉴权</h2><h3 id="继承-zuulfilter" tabindex="-1"><a class="header-anchor" href="#继承-zuulfilter" aria-hidden="true">#</a> 继承 ZuulFilter</h3><p>原理就是对于每个经过网关的请求都进行过滤</p><p>编写Component继承 <code>ZuulFilter</code> 并实现接口方法</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
public class ExampleFilter extends ZuulFilter {

    /**
     * 过滤类别,:
     * pre：在请求被路由之前调用
     * routing: 路由请求时被调用
     * post: 在routing和error过滤器之后被调用
     * error: 处理请求时发生错误后被调用
     */
    @Override
    public String filterType() {
        return null;
    }

    /**
     * 过滤优先级
     */
    @Override
    public int filterOrder() {
        return 0;
    }

    /**
     * 判断是否进行过滤
     */
    @Override
    public boolean shouldFilter() {
        return false;
    }

    /**
     * 处理主要逻辑的地方, 例如进行登录判断, 日志记录等
     */
    @Override
    public Object run() throws ZuulException {
        return null;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="zuul配置中的一处坑" tabindex="-1"><a class="header-anchor" href="#zuul配置中的一处坑" aria-hidden="true">#</a> Zuul配置中的一处坑</h3><p>在鉴权服务中, 我们通常使用jwt来实现客户端的无状态登录, 所以需要向客户端中设置cookie信息</p><p>但是zuul内部有默认的过滤器, 会将请求和响应头信息过滤, 不允许设置敏感信息 ( 比如set-cookie )</p><p><strong>解决方案:</strong></p><p>在application.yml中配置</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>zuul:
  sensitive-headers:  # 配置禁止使用的头信息, 设置为null代表不禁止任何头信息
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,18),r=[s];function a(u,v){return e(),n("div",null,r)}const t=i(d,[["render",a],["__file","010_spring_boot_gateway.html.vue"]]);export{t as default};
