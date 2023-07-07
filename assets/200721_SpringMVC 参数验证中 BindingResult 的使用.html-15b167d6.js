import{_ as i}from"./plugin-vue_export-helper-c27b6911.js";import{o as e,c as n,f as a}from"./app-d50118f0.js";const r={},d=a(`<blockquote><p>在不需要统一处理异常时使用</p></blockquote><h2 id="代码示例" tabindex="-1"><a class="header-anchor" href="#代码示例" aria-hidden="true">#</a> 代码示例</h2><h3 id="创建实体类" tabindex="-1"><a class="header-anchor" href="#创建实体类" aria-hidden="true">#</a> 创建实体类</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class User {
    @NotNull(message = &quot;用户名不能为空&quot;)
    private String name;
    @NotEmpty(message = &quot;密码不能是空值&quot;)
    private String password;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="编写web层代码" tabindex="-1"><a class="header-anchor" href="#编写web层代码" aria-hidden="true">#</a> 编写WEB层代码</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Slf4j
@RestController
@RequestMapping(&quot;user&quot;)
public class UserController {

    @GetMapping(&quot;login1&quot;)
    public String login1(@Valid User user, BindingResult result) {
        if (result.hasErrors()) {
            result.getAllErrors()
                    .forEach(error -&gt; log.info(error.getDefaultMessage()));
        }
        return &quot;登录成功&quot;;
    }

    @GetMapping(&quot;login2&quot;)
    public String login2(@Valid User user) {
        return &quot;登录成功&quot;;
    }
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="结果对比" tabindex="-1"><a class="header-anchor" href="#结果对比" aria-hidden="true">#</a> 结果对比</h2><h3 id="_1-参数中有bindingresult" tabindex="-1"><a class="header-anchor" href="#_1-参数中有bindingresult" aria-hidden="true">#</a> ① 参数中有BindingResult</h3><h4 id="返回结果" tabindex="-1"><a class="header-anchor" href="#返回结果" aria-hidden="true">#</a> 返回结果：</h4><figure><img src="https://i.loli.net/2020/07/22/yJE6iKFXaMrlwkp.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="控制台信息" tabindex="-1"><a class="header-anchor" href="#控制台信息" aria-hidden="true">#</a> 控制台信息：</h4><figure><img src="https://i.loli.net/2020/07/22/tGa2AP9plj8zhmM.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>异常并没有被抛出，在 web 层中获取了参数验证错误信息并在控制台打印了出来</p><hr><h3 id="_2-参数中没有bindingresult" tabindex="-1"><a class="header-anchor" href="#_2-参数中没有bindingresult" aria-hidden="true">#</a> ② 参数中没有BindingResult</h3><h4 id="返回结果-1" tabindex="-1"><a class="header-anchor" href="#返回结果-1" aria-hidden="true">#</a> 返回结果：</h4><figure><img src="https://i.loli.net/2020/07/22/jtQ5w7zX1vLVRlZ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h4 id="控制台信息-1" tabindex="-1"><a class="header-anchor" href="#控制台信息-1" aria-hidden="true">#</a> 控制台信息：</h4><figure><img src="https://i.loli.net/2020/07/22/NJ1xmvYwZXDIioM.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>抛出参数校验异常，框架为我们返回了一段信息，平时我们可以通过捕获全局异常的方式将校验异常包装到我们自定义的异常中，取出错误信息并与错误代码一起返回</p>`,20),s=[d];function l(t,u){return e(),n("div",null,s)}const h=i(r,[["render",l],["__file","200721_SpringMVC 参数验证中 BindingResult 的使用.html.vue"]]);export{h as default};
