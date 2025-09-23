import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as l}from"./app-CAtmO8tN.js";const i={};function p(t,n){return l(),a("div",null,[...n[0]||(n[0]=[e(`<blockquote><p>忘记的时候翻一翻</p></blockquote><h2 id="基本注解" tabindex="-1"><a class="header-anchor" href="#基本注解"><span><strong>基本注解</strong></span></a></h2><p><code>@Controller</code><br> 定义一个Controller控制器</p><p><code>@RequestMapping</code><br> 映射URL到控制器类</p><p><code>@RequestParam</code>、<code>@RequestBody</code><br> 获取请求体参数</p><p><code>@RequestHeader</code><br> 获取请求头</p><p><code>@PathVariable</code><br> 获取URL里的变量</p><p><code>@ModelAttribute</code><br> 在Controller的方法执行之前执行</p><p><code>@CookieValue</code>、<code>@SessionAttribute</code><br> 获取Cookie、Session的参数</p><h2 id="web-xml文件示例" tabindex="-1"><a class="header-anchor" href="#web-xml文件示例"><span><strong>web.xml文件示例</strong></span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;!DOCTYPE web-app PUBLIC</span></span>
<span class="line"><span> &quot;-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN&quot;</span></span>
<span class="line"><span> &quot;http://java.sun.com/dtd/web-app_2_3.dtd&quot; &gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;web-app&gt;</span></span>
<span class="line"><span>  &lt;display-name&gt;Archetype Created Web Application&lt;/display-name&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!--设置配置文件的路径，让监听器不只加载web-inf的文件--&gt;</span></span>
<span class="line"><span>  &lt;context-param&gt;</span></span>
<span class="line"><span>    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;</span></span>
<span class="line"><span>    &lt;param-value&gt;classpath:applicationContext.xml&lt;/param-value&gt;</span></span>
<span class="line"><span>  &lt;/context-param&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!--解决中文乱码的过滤器--&gt;</span></span>
<span class="line"><span>  &lt;filter&gt;</span></span>
<span class="line"><span>    &lt;filter-name&gt;characterEncodingFilter&lt;/filter-name&gt;</span></span>
<span class="line"><span>    &lt;filter-class&gt;org.springframework.web.filter.CharacterEncodingFilter&lt;/filter-class&gt;</span></span>
<span class="line"><span>    &lt;init-param&gt;</span></span>
<span class="line"><span>      &lt;param-name&gt;encoding&lt;/param-name&gt;</span></span>
<span class="line"><span>      &lt;param-value&gt;UTF-8&lt;/param-value&gt;</span></span>
<span class="line"><span>    &lt;/init-param&gt;</span></span>
<span class="line"><span>  &lt;/filter&gt;</span></span>
<span class="line"><span>  &lt;filter-mapping&gt;</span></span>
<span class="line"><span>    &lt;filter-name&gt;characterEncodingFilter&lt;/filter-name&gt;</span></span>
<span class="line"><span>    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;</span></span>
<span class="line"><span>  &lt;/filter-mapping&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!--配置spring的监听器，默认只加载WEB-INF目录下的applicationContext.xml配置文件--&gt;</span></span>
<span class="line"><span>  &lt;listener&gt;</span></span>
<span class="line"><span>    &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;</span></span>
<span class="line"><span>  &lt;/listener&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>  &lt;!--配置前端控制器--&gt;</span></span>
<span class="line"><span>  &lt;servlet&gt;</span></span>
<span class="line"><span>    &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;</span></span>
<span class="line"><span>    &lt;servlet-class&gt;org.springframework.web.servlet.DispatcherServlet&lt;/servlet-class&gt;</span></span>
<span class="line"><span>    &lt;!--加载springmvc.xml--&gt;</span></span>
<span class="line"><span>    &lt;init-param&gt;</span></span>
<span class="line"><span>      &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;</span></span>
<span class="line"><span>      &lt;param-value&gt;classpath:springmvc.xml&lt;/param-value&gt;</span></span>
<span class="line"><span>    &lt;/init-param&gt;</span></span>
<span class="line"><span>    &lt;!--启动时就创建--&gt;</span></span>
<span class="line"><span>    &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;</span></span>
<span class="line"><span>  &lt;/servlet&gt;</span></span>
<span class="line"><span>  &lt;servlet-mapping&gt;</span></span>
<span class="line"><span>    &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;</span></span>
<span class="line"><span>    &lt;url-pattern&gt;/&lt;/url-pattern&gt;</span></span>
<span class="line"><span>  &lt;/servlet-mapping&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/web-app&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-mvc-xml文件示例" tabindex="-1"><a class="header-anchor" href="#spring-mvc-xml文件示例"><span><strong>spring-mvc.xml文件示例</strong></span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;</span></span>
<span class="line"><span>&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;</span></span>
<span class="line"><span>       xmlns:mvc=&quot;http://www.springframework.org/schema/mvc&quot;</span></span>
<span class="line"><span>       xmlns:context=&quot;http://www.springframework.org/schema/context&quot;</span></span>
<span class="line"><span>       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;</span></span>
<span class="line"><span>       xsi:schemaLocation=&quot;</span></span>
<span class="line"><span>        http://www.springframework.org/schema/beans</span></span>
<span class="line"><span>        http://www.springframework.org/schema/beans/spring-beans.xsd</span></span>
<span class="line"><span>        http://www.springframework.org/schema/mvc</span></span>
<span class="line"><span>        http://www.springframework.org/schema/mvc/spring-mvc.xsd</span></span>
<span class="line"><span>        http://www.springframework.org/schema/context</span></span>
<span class="line"><span>        http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--开启注解扫描，只扫描controller--&gt;</span></span>
<span class="line"><span>    &lt;context:component-scan base-package=&quot;com.hall&quot;&gt;</span></span>
<span class="line"><span>        &lt;context:include-filter type=&quot;annotation&quot; expression=&quot;org.springframework.stereotype.Controller&quot;&gt;&lt;/context:include-filter&gt;</span></span>
<span class="line"><span>    &lt;/context:component-scan&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 视图解析器对象 --&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;internalResourceViewResolver&quot; class=&quot;org.springframework.web.servlet.view.InternalResourceViewResolver&quot;&gt;</span></span>
<span class="line"><span>        &lt;property name=&quot;prefix&quot; value=&quot;/WEB-INF/pages/&quot;/&gt;</span></span>
<span class="line"><span>        &lt;property name=&quot;suffix&quot; value=&quot;.jsp&quot;/&gt;</span></span>
<span class="line"><span>    &lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--文件解析器对象--&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;multipartResolver&quot; class=&quot;org.springframework.web.multipart.commons.CommonsMultipartResolver&quot;&gt;</span></span>
<span class="line"><span>        &lt;property name=&quot;maxUploadSize&quot; value=&quot;10485760&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span>    &lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!-- 配置自定义类型转换器 --&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;conversionService&quot; class=&quot;org.springframework.context.support.ConversionServiceFactoryBean&quot;&gt;</span></span>
<span class="line"><span>        &lt;property name=&quot;converters&quot; ref=&quot;stringToDate&quot;&gt;&lt;/property&gt;</span></span>
<span class="line"><span>    &lt;/bean&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;stringToDate&quot; class=&quot;com.hall.utils.StringToDate&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--异常处理--&gt;</span></span>
<span class="line"><span>    &lt;bean id=&quot;myExceptionResolver&quot; class=&quot;com.hall.exception.MyExceptionResolver&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--拦截器--&gt;</span></span>
<span class="line"><span>    &lt;mvc:interceptors&gt;</span></span>
<span class="line"><span>        &lt;mvc:interceptor&gt;</span></span>
<span class="line"><span>            &lt;!--要拦截的具体方法 --&gt;</span></span>
<span class="line"><span>            &lt;mvc:mapping path=&quot;/user/*&quot;/&gt;</span></span>
<span class="line"><span>            &lt;bean class=&quot;com.hall.interceptor.MyInterceptor&quot;&gt;&lt;/bean&gt;</span></span>
<span class="line"><span>        &lt;/mvc:interceptor&gt;</span></span>
<span class="line"><span>    &lt;/mvc:interceptors&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--配置静态资源 哪些资源不拦截--&gt;</span></span>
<span class="line"><span>    &lt;mvc:resources mapping=&quot;/js/**&quot; location=&quot;/js/**&quot;&gt;&lt;/mvc:resources&gt;</span></span>
<span class="line"><span>    &lt;mvc:resources mapping=&quot;/css/**&quot; location=&quot;/css/**&quot;&gt;&lt;/mvc:resources&gt;</span></span>
<span class="line"><span>    &lt;mvc:resources mapping=&quot;/image/**&quot; location=&quot;/image/**&quot;&gt;&lt;/mvc:resources&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--开启SpringMvc注解支持--&gt;</span></span>
<span class="line"><span>    &lt;mvc:annotation-driven conversion-service=&quot;conversionService&quot;&gt;&lt;/mvc:annotation-driven&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    &lt;!--可以将GET或POST请求转换为所有标准的HTTP方法（PUT、DELETE）--&gt;</span></span>
<span class="line"><span>    &lt;!--HiddenHttpMethodFilter--&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;/beans&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拓展功能" tabindex="-1"><a class="header-anchor" href="#拓展功能"><span><strong>拓展功能</strong></span></a></h2><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理"><span><strong>异常处理</strong></span></a></h3><blockquote><p>需要实现HandlerExceptionResolver接口，并且在spring容器中声明</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public class MyExceptionResolver implements HandlerExceptionResolver {</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {</span></span>
<span class="line"><span>        // MyException是继承Exception的异常类</span></span>
<span class="line"><span>        MyException ex = null;</span></span>
<span class="line"><span>        if( e instanceof MyException) {</span></span>
<span class="line"><span>            ex = (MyException)e;</span></span>
<span class="line"><span>        } else {</span></span>
<span class="line"><span>            e = new MyException(&quot;Error&quot;);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ModelAndView mv = new ModelAndView();</span></span>
<span class="line"><span>        mv.addObject(&quot;errorMsg&quot;, e.getMessage());</span></span>
<span class="line"><span>        mv.setViewName(&quot;error&quot;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        return mv;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拦截器" tabindex="-1"><a class="header-anchor" href="#拦截器"><span><strong>拦截器</strong></span></a></h3><blockquote><p>需要实现HandlerExceptionResolver接口，并且在spring容器中声明</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>public class MyInterceptor implements HandlerInterceptor {</span></span>
<span class="line"><span>    // </span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {</span></span>
<span class="line"><span>        System.out.println(&quot;lanjiele &quot;);</span></span>
<span class="line"><span>        return true;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在controller方法执行后，success.jsp 执行前，该方法会执行</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span>    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    // 在success.jsp 执行后，该方法会执行</span></span>
<span class="line"><span>    @Override</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传"><span><strong>文件上传</strong></span></a></h3><blockquote><p>需要在spring容器中声明文件解析器对象，并且在html文件中编写相对应的代码</p></blockquote><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>@RequestMapping(&quot;/fileupload&quot;)</span></span>
<span class="line"><span>public String fileupload(HttpServletRequest request, MultipartFile upload) throws Exception {</span></span>
<span class="line"><span>    // 上传位置</span></span>
<span class="line"><span>    String path = request.getSession().getServletContext().getRealPath(&quot;/uploads/&quot;);</span></span>
<span class="line"><span>    // 判断该路径是否存在</span></span>
<span class="line"><span>    File file = new File(path);</span></span>
<span class="line"><span>    if (!file.exists()) {</span></span>
<span class="line"><span>        file.mkdirs();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    // 获取上传文件的名字 </span></span>
<span class="line"><span>    String fileName = upload.getOriginalFilename();</span></span>
<span class="line"><span>    // 将文件名设成唯一</span></span>
<span class="line"><span>    String uuid = UUID.randomUUID().toString().replace(&quot;-&quot;, &quot;&quot;);</span></span>
<span class="line"><span>    fileName = uuid + &quot;_&quot; + fileName;</span></span>
<span class="line"><span>    // 上传文件</span></span>
<span class="line"><span>    upload.transferTo(new File(path, fileName));</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    return &quot;success&quot;;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>&lt;form action=&quot;/user/fileupload&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;</span></span>
<span class="line"><span>    选择文件：&lt;input type=&quot;file&quot; name=&quot;upload&quot;&gt; &lt;br&gt;</span></span>
<span class="line"><span>    &lt;input type=&quot;submit&quot; value=&quot;提交&quot;&gt;</span></span>
<span class="line"><span>&lt;/form&gt;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24)])])}const d=s(i,[["render",p]]),o=JSON.parse(`{"path":"/archive/blog/2019/191006_SpringMVC%20%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0.html","title":"SpringMVC 配置笔记","lang":"zh-CN","frontmatter":{"title":"SpringMVC 配置笔记","date":"2019-10-06T10:53:39.000Z","draft":false,"category":["关于技术"],"tag":["SpringMVC"],"description":"忘记的时候翻一翻 基本注解 @Controller 定义一个Controller控制器 @RequestMapping 映射URL到控制器类 @RequestParam、@RequestBody 获取请求体参数 @RequestHeader 获取请求头 @PathVariable 获取URL里的变量 @ModelAttribute 在Controlle...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SpringMVC 配置笔记\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2019-10-06T10:53:39.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"],["meta",{"property":"og:url","content":"https://logycoconut.github.io/archive/blog/2019/191006_SpringMVC%20%E9%85%8D%E7%BD%AE%E7%AC%94%E8%AE%B0.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"SpringMVC 配置笔记"}],["meta",{"property":"og:description","content":"忘记的时候翻一翻 基本注解 @Controller 定义一个Controller控制器 @RequestMapping 映射URL到控制器类 @RequestParam、@RequestBody 获取请求体参数 @RequestHeader 获取请求头 @PathVariable 获取URL里的变量 @ModelAttribute 在Controlle..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"SpringMVC"}],["meta",{"property":"article:published_time","content":"2019-10-06T10:53:39.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}]]},"git":{"createdTime":1667915485000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":5,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":2.97,"words":890},"filePathRelative":"archive/blog/2019/191006_SpringMVC 配置笔记.md","autoDesc":true}`);export{d as comp,o as data};
