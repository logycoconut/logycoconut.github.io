import{_ as e}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as n,c as i,e as r}from"./app.51e0e208.js";const s={},d=r(`<blockquote><p>更优雅的将传入的信息转化成自定义的实体</p></blockquote><h2 id="springmvc数据绑定" tabindex="-1"><a class="header-anchor" href="#springmvc数据绑定" aria-hidden="true">#</a> SpringMVC数据绑定</h2><p>先贴一段代码 ( 需要<code>Lombok</code>包 )</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// User实体类
@Data
@AllArgsConstructor
public class User {
    String name;
    String password;
}

// UserController
// http://localhost:8888/user/info?name=jack&amp;password=123
@RestController
@RequestMapping(&quot;user&quot;)
public class UserController {

    @GetMapping(&quot;info&quot;)
    public void getUser(User user) {
        System.out.println(user);
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SpringMVC会自动将请求中的参数赋值给对象中的同名属性, 实现数据绑定</p><h2 id="对方法参数处理" tabindex="-1"><a class="header-anchor" href="#对方法参数处理" aria-hidden="true">#</a> 对方法参数处理</h2><h3 id="实现handlermethodargumentresolver接口对参数处理" tabindex="-1"><a class="header-anchor" href="#实现handlermethodargumentresolver接口对参数处理" aria-hidden="true">#</a> 实现<code>HandlerMethodArgumentResolver</code>接口对参数处理</h3><blockquote><p>数据绑定很好用, 但是我们不可能每次请求都带上User的参数, 在日常开发中, 我们一般是根据cookie来判断请求的身份</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 用于演示的伪代码, 不可用于生产环境
public class UserArgumentResolver implements HandlerMethodArgumentResolver {
    @Override
    public boolean supportsParameter(MethodParameter methodParameter) {
        // 当参数类型等于User类型时执行下面的resolveArgument方法
        return User.class == methodParameter.getParameterType();
    }

    @Override
    public Object resolveArgument(MethodParameter methodParameter, ModelAndViewContainer modelAndViewContainer, NativeWebRequest nativeWebRequest, WebDataBinderFactory webDataBinderFactory) throws Exception {
        HttpServletRequest request = nativeWebRequest.getNativeRequest(HttpServletRequest.class);

        // 获取token值
        String token = getCookieValue(request, cookieName);
        
        // 根据token获取对应用户
        return userService.getByToken(token);
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样就能通过cookie获得user对象, 并传入controller的方法参数中</p><h3 id="对带有特定注解的参数处理" tabindex="-1"><a class="header-anchor" href="#对带有特定注解的参数处理" aria-hidden="true">#</a> 对带有特定注解的参数处理</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>// 新增一个注解类
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface UserAnno {
}

// 将UserArgumentResolver中的supportsParameter方法改造
@Override
public boolean supportsParameter(MethodParameter methodParameter) {
    return methodParameter.hasParameterAnnotation(UserAnno.class);
}

// 在Controller层方法参数前加@UserAnno注解
@GetMapping(&quot;info&quot;)
public void getUser(@UserAnno User user) {
    System.out.println(user);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这样会获得和上述一样的效果</p><h3 id="将解析器添加到webconfig" tabindex="-1"><a class="header-anchor" href="#将解析器添加到webconfig" aria-hidden="true">#</a> 将解析器添加到WebConfig</h3><p><strong>不然SpringMVC不知道这个解析器, 导致参数处理不生效</strong></p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public UserArgumentResolver userArgumentResolver() {
        return new UserArgumentResolver();
    }

    @Override
    public void addArgumentResolvers(List&lt;HandlerMethodArgumentResolver&gt; argumentResolvers) {
        argumentResolvers.add(userArgumentResolver());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16),l=[d];function a(t,v){return n(),i("div",null,l)}const o=e(s,[["render",a],["__file","013_spring_handlerMethodArgumentResolver.html.vue"]]);export{o as default};
