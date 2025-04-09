import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,d as a,o as i}from"./app-DfvBXUGl.js";const l={};function r(p,n){return i(),e("div",null,n[0]||(n[0]=[a(`<blockquote><p>更优雅的将传入的信息转化成自定义的实体</p></blockquote><h2 id="springmvc数据绑定" tabindex="-1"><a class="header-anchor" href="#springmvc数据绑定"><span>SpringMVC数据绑定</span></a></h2><p>先贴一段代码 ( 需要<code>Lombok</code>包 )</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// User实体类</span></span>
<span class="line"><span>@Data</span></span>
<span class="line"><span>@AllArgsConstructor</span></span>
<span class="line"><span>public class User {</span></span>
<span class="line"><span>    String name;</span></span>
<span class="line"><span>    String password;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// UserController</span></span>
<span class="line"><span>// http://localhost:8888/user/info?name=jack&amp;password=123</span></span>
<span class="line"><span>@RestController</span></span>
<span class="line"><span>@RequestMapping(&quot;user&quot;)</span></span>
<span class="line"><span>public class UserController {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @GetMapping(&quot;info&quot;)</span></span>
<span class="line"><span>    public void getUser(User user) {</span></span>
<span class="line"><span>        System.out.println(user);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringMVC会自动将请求中的参数赋值给对象中的同名属性, 实现数据绑定</p><h2 id="对方法参数处理" tabindex="-1"><a class="header-anchor" href="#对方法参数处理"><span>对方法参数处理</span></a></h2><h3 id="实现handlermethodargumentresolver接口对参数处理" tabindex="-1"><a class="header-anchor" href="#实现handlermethodargumentresolver接口对参数处理"><span>实现<code>HandlerMethodArgumentResolver</code>接口对参数处理</span></a></h3><blockquote><p>数据绑定很好用, 但是我们不可能每次请求都带上User的参数, 在日常开发中, 我们一般是根据cookie来判断请求的身份</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 用于演示的伪代码, 不可用于生产环境</span></span>
<span class="line"><span>public class UserArgumentResolver implements HandlerMethodArgumentResolver {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public boolean supportsParameter(MethodParameter methodParameter) {</span></span>
<span class="line"><span>        // 当参数类型等于User类型时执行下面的resolveArgument方法</span></span>
<span class="line"><span>        return User.class == methodParameter.getParameterType();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {</span></span>
<span class="line"><span>        HttpServletRequest request = nativeWebRequest.getNativeRequest(HttpServletRequest.class);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        // 获取token值</span></span>
<span class="line"><span>        String token = getCookieValue(request, cookieName);</span></span>
<span class="line"><span>        </span></span>
<span class="line"><span>        // 根据token获取对应用户</span></span>
<span class="line"><span>        return userService.getByToken(token);</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就能通过cookie获得user对象, 并传入controller的方法参数中</p><h3 id="对带有特定注解的参数处理" tabindex="-1"><a class="header-anchor" href="#对带有特定注解的参数处理"><span>对带有特定注解的参数处理</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>// 新增一个注解类</span></span>
<span class="line"><span>@Target({ElementType.PARAMETER})</span></span>
<span class="line"><span>@Retention(RetentionPolicy.RUNTIME)</span></span>
<span class="line"><span>@Documented</span></span>
<span class="line"><span>public @interface UserAnno {</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 将UserArgumentResolver中的supportsParameter方法改造</span></span>
<span class="line"><span>@Override</span></span>
<span class="line"><span>public boolean supportsParameter(MethodParameter methodParameter) {</span></span>
<span class="line"><span>    return methodParameter.hasParameterAnnotation(UserAnno.class);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// 在Controller层方法参数前加@UserAnno注解</span></span>
<span class="line"><span>@GetMapping(&quot;info&quot;)</span></span>
<span class="line"><span>public void getUser(@UserAnno User user) {</span></span>
<span class="line"><span>    System.out.println(user);</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样会获得和上述一样的效果</p><h3 id="将解析器添加到webconfig" tabindex="-1"><a class="header-anchor" href="#将解析器添加到webconfig"><span>将解析器添加到WebConfig</span></a></h3><p><strong>不然SpringMVC不知道这个解析器, 导致参数处理不生效</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>@Configuration</span></span>
<span class="line"><span>public class WebConfig implements WebMvcConfigurer {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Bean</span></span>
<span class="line"><span>    public UserArgumentResolver userArgumentResolver() {</span></span>
<span class="line"><span>        return new UserArgumentResolver();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void addArgumentResolvers(List&lt;HandlerMethodArgumentResolver&gt; argumentResolvers) {</span></span>
<span class="line"><span>        argumentResolvers.add(userArgumentResolver());</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16)]))}const c=s(l,[["render",r],["__file","200630_SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定.html.vue"]]),o=JSON.parse(`{"path":"/archive/blog/2020/200630_SpringMVC%20%E4%B9%8B%20HandlerMethodArgumentResolver%20%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.html","title":"SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定","lang":"zh-CN","frontmatter":{"title":"SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定","date":"2020-06-30T14:47:48.000Z","draft":false,"category":["关于技术"],"tag":["SpringMVC"],"description":"更优雅的将传入的信息转化成自定义的实体 SpringMVC数据绑定 先贴一段代码 ( 需要Lombok包 ) SpringMVC会自动将请求中的参数赋值给对象中的同名属性, 实现数据绑定 对方法参数处理 实现HandlerMethodArgumentResolver接口对参数处理 数据绑定很好用, 但是我们不可能每次请求都带上User的参数, 在日常开...","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2020/200630_SpringMVC%20%E4%B9%8B%20HandlerMethodArgumentResolver%20%E5%AE%9E%E7%8E%B0%E6%95%B0%E6%8D%AE%E7%BB%91%E5%AE%9A.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定"}],["meta",{"property":"og:description","content":"更优雅的将传入的信息转化成自定义的实体 SpringMVC数据绑定 先贴一段代码 ( 需要Lombok包 ) SpringMVC会自动将请求中的参数赋值给对象中的同名属性, 实现数据绑定 对方法参数处理 实现HandlerMethodArgumentResolver接口对参数处理 数据绑定很好用, 但是我们不可能每次请求都带上User的参数, 在日常开..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"SpringMVC"}],["meta",{"property":"article:published_time","content":"2020-06-30T14:47:48.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-30T14:47:48.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"SpringMVC数据绑定","slug":"springmvc数据绑定","link":"#springmvc数据绑定","children":[]},{"level":2,"title":"对方法参数处理","slug":"对方法参数处理","link":"#对方法参数处理","children":[{"level":3,"title":"实现HandlerMethodArgumentResolver接口对参数处理","slug":"实现handlermethodargumentresolver接口对参数处理","link":"#实现handlermethodargumentresolver接口对参数处理","children":[]},{"level":3,"title":"对带有特定注解的参数处理","slug":"对带有特定注解的参数处理","link":"#对带有特定注解的参数处理","children":[]},{"level":3,"title":"将解析器添加到WebConfig","slug":"将解析器添加到webconfig","link":"#将解析器添加到webconfig","children":[]}]}],"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":1,"url":"https://github.com/logycoconut"},{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":4,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":1.46,"words":439},"filePathRelative":"archive/blog/2020/200630_SpringMVC 之 HandlerMethodArgumentResolver 实现数据绑定.md","localizedDate":"2020年6月30日","autoDesc":true}`);export{c as comp,o as data};
