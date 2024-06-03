---
title: SpringMVC 配置笔记
date: 2019-10-06T18:53:39+08:00
draft: false
category: ["关于技术"]
tag: ["SpringMVC"]
---

> 忘记的时候翻一翻

## **基本注解**

`@Controller`
定义一个Controller控制器

`@RequestMapping`
映射URL到控制器类

`@RequestParam`、`@RequestBody`
获取请求体参数

`@RequestHeader`
获取请求头

`@PathVariable`
获取URL里的变量

`@ModelAttribute`
在Controller的方法执行之前执行

`@CookieValue`、`@SessionAttribute`
获取Cookie、Session的参数

## **web.xml文件示例**

```
<!DOCTYPE web-app PUBLIC
 "-//Sun Microsystems, Inc.//DTD Web Application 2.3//EN"
 "http://java.sun.com/dtd/web-app_2_3.dtd" >

<web-app>
  <display-name>Archetype Created Web Application</display-name>

  <!--设置配置文件的路径，让监听器不只加载web-inf的文件-->
  <context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:applicationContext.xml</param-value>
  </context-param>

  <!--解决中文乱码的过滤器-->
  <filter>
    <filter-name>characterEncodingFilter</filter-name>
    <filter-class>org.springframework.web.filter.CharacterEncodingFilter</filter-class>
    <init-param>
      <param-name>encoding</param-name>
      <param-value>UTF-8</param-value>
    </init-param>
  </filter>
  <filter-mapping>
    <filter-name>characterEncodingFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>


  <!--配置spring的监听器，默认只加载WEB-INF目录下的applicationContext.xml配置文件-->
  <listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
  </listener>

  <!--配置前端控制器-->
  <servlet>
    <servlet-name>dispatcherServlet</servlet-name>
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
    <!--加载springmvc.xml-->
    <init-param>
      <param-name>contextConfigLocation</param-name>
      <param-value>classpath:springmvc.xml</param-value>
    </init-param>
    <!--启动时就创建-->
    <load-on-startup>1</load-on-startup>
  </servlet>
  <servlet-mapping>
    <servlet-name>dispatcherServlet</servlet-name>
    <url-pattern>/</url-pattern>
  </servlet-mapping>

</web-app>

```

## **spring-mvc.xml文件示例**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">


    <!--开启注解扫描，只扫描controller-->
    <context:component-scan base-package="com.hall">
        <context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"></context:include-filter>
    </context:component-scan>

    <!-- 视图解析器对象 -->
    <bean id="internalResourceViewResolver" class="org.springframework.web.servlet.view.InternalResourceViewResolver">
        <property name="prefix" value="/WEB-INF/pages/"/>
        <property name="suffix" value=".jsp"/>
    </bean>

    <!--文件解析器对象-->
    <bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <property name="maxUploadSize" value="10485760"></property>
    </bean>

    <!-- 配置自定义类型转换器 -->
    <bean id="conversionService" class="org.springframework.context.support.ConversionServiceFactoryBean">
        <property name="converters" ref="stringToDate"></property>
    </bean>
    <bean id="stringToDate" class="com.hall.utils.StringToDate"></bean>

    <!--异常处理-->
    <bean id="myExceptionResolver" class="com.hall.exception.MyExceptionResolver"></bean>

    <!--拦截器-->
    <mvc:interceptors>
        <mvc:interceptor>
            <!--要拦截的具体方法 -->
            <mvc:mapping path="/user/*"/>
            <bean class="com.hall.interceptor.MyInterceptor"></bean>
        </mvc:interceptor>
    </mvc:interceptors>

    <!--配置静态资源 哪些资源不拦截-->
    <mvc:resources mapping="/js/**" location="/js/**"></mvc:resources>
    <mvc:resources mapping="/css/**" location="/css/**"></mvc:resources>
    <mvc:resources mapping="/image/**" location="/image/**"></mvc:resources>

    <!--开启SpringMvc注解支持-->
    <mvc:annotation-driven conversion-service="conversionService"></mvc:annotation-driven>

    <!--可以将GET或POST请求转换为所有标准的HTTP方法（PUT、DELETE）-->
    <!--HiddenHttpMethodFilter-->

</beans>
```

## **拓展功能**

### **异常处理**

> 需要实现HandlerExceptionResolver接口，并且在spring容器中声明

```
public class MyExceptionResolver implements HandlerExceptionResolver {
    @Override
    public ModelAndView resolveException(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) {
        // MyException是继承Exception的异常类
        MyException ex = null;
        if( e instanceof MyException) {
            ex = (MyException)e;
        } else {
            e = new MyException("Error");
        }

        ModelAndView mv = new ModelAndView();
        mv.addObject("errorMsg", e.getMessage());
        mv.setViewName("error");

        return mv;
    }
}
```

### **拦截器**

> 需要实现HandlerExceptionResolver接口，并且在spring容器中声明

```
public class MyInterceptor implements HandlerInterceptor {
    // 
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("lanjiele ");
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
```

### **文件上传**

> 需要在spring容器中声明文件解析器对象，并且在html文件中编写相对应的代码

```
@RequestMapping("/fileupload")
public String fileupload(HttpServletRequest request, MultipartFile upload) throws Exception {
    // 上传位置
    String path = request.getSession().getServletContext().getRealPath("/uploads/");
    // 判断该路径是否存在
    File file = new File(path);
    if (!file.exists()) {
        file.mkdirs();
    }
    
    // 获取上传文件的名字 
    String fileName = upload.getOriginalFilename();
    // 将文件名设成唯一
    String uuid = UUID.randomUUID().toString().replace("-", "");
    fileName = uuid + "_" + fileName;
    // 上传文件
    upload.transferTo(new File(path, fileName));

    return "success";
}
```

```
<form action="/user/fileupload" method="post" enctype="multipart/form-data">
    选择文件：<input type="file" name="upload"> <br>
    <input type="submit" value="提交">
</form>
```
