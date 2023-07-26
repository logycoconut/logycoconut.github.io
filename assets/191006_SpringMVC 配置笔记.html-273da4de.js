import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as n,c as i,f as t}from"./app-b97177ea.js";const l={},s=t(`<blockquote><p>忘记的时候翻一翻</p></blockquote><h2 id="基本注解" tabindex="-1"><a class="header-anchor" href="#基本注解" aria-hidden="true">#</a> <strong>基本注解</strong></h2><p><code>@Controller</code><br> 定义一个Controller控制器</p><p><code>@RequestMapping</code><br> 映射URL到控制器类</p><p><code>@RequestParam</code>、<code>@RequestBody</code><br> 获取请求体参数</p><p><code>@RequestHeader</code><br> 获取请求头</p><p><code>@PathVariable</code><br> 获取URL里的变量</p><p><code>@ModelAttribute</code><br> 在Controller的方法执行之前执行</p><p><code>@CookieValue</code>、<code>@SessionAttribute</code><br> 获取Cookie、Session的参数</p><h2 id="web-xml文件示例" tabindex="-1"><a class="header-anchor" href="#web-xml文件示例" aria-hidden="true">#</a> <strong>web.xml文件示例</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;!DOCTYPE web-app PUBLIC
 &quot;-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN&quot;
 &quot;http://java.sun.com/dtd/web-app_2_3.dtd&quot; &gt;

&lt;web-app&gt;
  &lt;display-name&gt;Archetype Created Web Application&lt;/display-name&gt;

  &lt;!--设置配置文件的路径，让监听器不只加载web-inf的文件--&gt;
  &lt;context-param&gt;
    &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;
    &lt;param-value&gt;classpath:applicationContext.xml&lt;/param-value&gt;
  &lt;/context-param&gt;

  &lt;!--解决中文乱码的过滤器--&gt;
  &lt;filter&gt;
    &lt;filter-name&gt;characterEncodingFilter&lt;/filter-name&gt;
    &lt;filter-class&gt;org.springframework.web.filter.CharacterEncodingFilter&lt;/filter-class&gt;
    &lt;init-param&gt;
      &lt;param-name&gt;encoding&lt;/param-name&gt;
      &lt;param-value&gt;UTF-8&lt;/param-value&gt;
    &lt;/init-param&gt;
  &lt;/filter&gt;
  &lt;filter-mapping&gt;
    &lt;filter-name&gt;characterEncodingFilter&lt;/filter-name&gt;
    &lt;url-pattern&gt;/*&lt;/url-pattern&gt;
  &lt;/filter-mapping&gt;


  &lt;!--配置spring的监听器，默认只加载WEB-INF目录下的applicationContext.xml配置文件--&gt;
  &lt;listener&gt;
    &lt;listener-class&gt;org.springframework.web.context.ContextLoaderListener&lt;/listener-class&gt;
  &lt;/listener&gt;

  &lt;!--配置前端控制器--&gt;
  &lt;servlet&gt;
    &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;
    &lt;servlet-class&gt;org.springframework.web.servlet.DispatcherServlet&lt;/servlet-class&gt;
    &lt;!--加载springmvc.xml--&gt;
    &lt;init-param&gt;
      &lt;param-name&gt;contextConfigLocation&lt;/param-name&gt;
      &lt;param-value&gt;classpath:springmvc.xml&lt;/param-value&gt;
    &lt;/init-param&gt;
    &lt;!--启动时就创建--&gt;
    &lt;load-on-startup&gt;1&lt;/load-on-startup&gt;
  &lt;/servlet&gt;
  &lt;servlet-mapping&gt;
    &lt;servlet-name&gt;dispatcherServlet&lt;/servlet-name&gt;
    &lt;url-pattern&gt;/&lt;/url-pattern&gt;
  &lt;/servlet-mapping&gt;

&lt;/web-app&gt;

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="spring-mvc-xml文件示例" tabindex="-1"><a class="header-anchor" href="#spring-mvc-xml文件示例" aria-hidden="true">#</a> <strong>spring-mvc.xml文件示例</strong></h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;beans xmlns=&quot;http://www.springframework.org/schema/beans&quot;
       xmlns:mvc=&quot;http://www.springframework.org/schema/mvc&quot;
       xmlns:context=&quot;http://www.springframework.org/schema/context&quot;
       xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
       xsi:schemaLocation=&quot;
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd&quot;&gt;


    &lt;!--开启注解扫描，只扫描controller--&gt;
    &lt;context:component-scan base-package=&quot;com.hall&quot;&gt;
        &lt;context:include-filter type=&quot;annotation&quot; expression=&quot;org.springframework.stereotype.Controller&quot;&gt;&lt;/context:include-filter&gt;
    &lt;/context:component-scan&gt;

    &lt;!-- 视图解析器对象 --&gt;
    &lt;bean id=&quot;internalResourceViewResolver&quot; class=&quot;org.springframework.web.servlet.view.InternalResourceViewResolver&quot;&gt;
        &lt;property name=&quot;prefix&quot; value=&quot;/WEB-INF/pages/&quot;/&gt;
        &lt;property name=&quot;suffix&quot; value=&quot;.jsp&quot;/&gt;
    &lt;/bean&gt;

    &lt;!--文件解析器对象--&gt;
    &lt;bean id=&quot;multipartResolver&quot; class=&quot;org.springframework.web.multipart.commons.CommonsMultipartResolver&quot;&gt;
        &lt;property name=&quot;maxUploadSize&quot; value=&quot;10485760&quot;&gt;&lt;/property&gt;
    &lt;/bean&gt;

    &lt;!-- 配置自定义类型转换器 --&gt;
    &lt;bean id=&quot;conversionService&quot; class=&quot;org.springframework.context.support.ConversionServiceFactoryBean&quot;&gt;
        &lt;property name=&quot;converters&quot; ref=&quot;stringToDate&quot;&gt;&lt;/property&gt;
    &lt;/bean&gt;
    &lt;bean id=&quot;stringToDate&quot; class=&quot;com.hall.utils.StringToDate&quot;&gt;&lt;/bean&gt;

    &lt;!--异常处理--&gt;
    &lt;bean id=&quot;myExceptionResolver&quot; class=&quot;com.hall.exception.MyExceptionResolver&quot;&gt;&lt;/bean&gt;

    &lt;!--拦截器--&gt;
    &lt;mvc:interceptors&gt;
        &lt;mvc:interceptor&gt;
            &lt;!--要拦截的具体方法 --&gt;
            &lt;mvc:mapping path=&quot;/user/*&quot;/&gt;
            &lt;bean class=&quot;com.hall.interceptor.MyInterceptor&quot;&gt;&lt;/bean&gt;
        &lt;/mvc:interceptor&gt;
    &lt;/mvc:interceptors&gt;

    &lt;!--配置静态资源 哪些资源不拦截--&gt;
    &lt;mvc:resources mapping=&quot;/js/**&quot; location=&quot;/js/**&quot;&gt;&lt;/mvc:resources&gt;
    &lt;mvc:resources mapping=&quot;/css/**&quot; location=&quot;/css/**&quot;&gt;&lt;/mvc:resources&gt;
    &lt;mvc:resources mapping=&quot;/image/**&quot; location=&quot;/image/**&quot;&gt;&lt;/mvc:resources&gt;

    &lt;!--开启SpringMvc注解支持--&gt;
    &lt;mvc:annotation-driven conversion-service=&quot;conversionService&quot;&gt;&lt;/mvc:annotation-driven&gt;

    &lt;!--可以将GET或POST请求转换为所有标准的HTTP方法（PUT、DELETE）--&gt;
    &lt;!--HiddenHttpMethodFilter--&gt;

&lt;/beans&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="拓展功能" tabindex="-1"><a class="header-anchor" href="#拓展功能" aria-hidden="true">#</a> <strong>拓展功能</strong></h2><h3 id="异常处理" tabindex="-1"><a class="header-anchor" href="#异常处理" aria-hidden="true">#</a> <strong>异常处理</strong></h3><blockquote><p>需要实现HandlerExceptionResolver接口，并且在spring容器中声明</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class MyExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        // MyException是继承Exception的异常类
        MyException ex = null;
        if( e instanceof MyException) {
            ex = (MyException)e;
        } else {
            e = new MyException(&quot;Error&quot;);
        }

        ModelAndView mv = new ModelAndView();
        mv.addObject(&quot;errorMsg&quot;, e.getMessage());
        mv.setViewName(&quot;error&quot;);

        return mv;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="拦截器" tabindex="-1"><a class="header-anchor" href="#拦截器" aria-hidden="true">#</a> <strong>拦截器</strong></h3><blockquote><p>需要实现HandlerExceptionResolver接口，并且在spring容器中声明</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public class MyInterceptor implements HandlerInterceptor {
    // 
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println(&quot;lanjiele &quot;);
        return true;
    }


    // 在controller方法执行后，success.jsp 执行前，该方法会执行
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    // 在success.jsp 执行后，该方法会执行
    @Override

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="文件上传" tabindex="-1"><a class="header-anchor" href="#文件上传" aria-hidden="true">#</a> <strong>文件上传</strong></h3><blockquote><p>需要在spring容器中声明文件解析器对象，并且在html文件中编写相对应的代码</p></blockquote><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@RequestMapping(&quot;/fileupload&quot;)
public String fileupload(HttpServletRequest request, MultipartFile upload) throws Exception {
    // 上传位置
    String path = request.getSession().getServletContext().getRealPath(&quot;/uploads/&quot;);
    // 判断该路径是否存在
    File file = new File(path);
    if (!file.exists()) {
        file.mkdirs();
    }
    
    // 获取上传文件的名字 
    String fileName = upload.getOriginalFilename();
    // 将文件名设成唯一
    String uuid = UUID.randomUUID().toString().replace(&quot;-&quot;, &quot;&quot;);
    fileName = uuid + &quot;_&quot; + fileName;
    // 上传文件
    upload.transferTo(new File(path, fileName));

    return &quot;success&quot;;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;form action=&quot;/user/fileupload&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;&gt;
    选择文件：&lt;input type=&quot;file&quot; name=&quot;upload&quot;&gt; &lt;br&gt;
    &lt;input type=&quot;submit&quot; value=&quot;提交&quot;&gt;
&lt;/form&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,24),r=[s];function a(d,v){return n(),i("div",null,r)}const u=e(l,[["render",a],["__file","191006_SpringMVC 配置笔记.html.vue"]]);export{u as default};
