---
title: "Spring Security 折腾小记🐵"
date: 2020-01-02T21:03:09+08:00
draft: false
category: ["关于技术"]
tag: ["Spring Security"]
---

> 使用Spring Security过程中遇到的问题

## **Web.xml配置**

```
<!--指定spring-security配置文件的路径-->
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring-security.xml</param-value>
</context-param>

<!--过滤器的名字不能变-->
<filter>
    <filter-name>springSecurityFilterChain</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
</filter>
<filter-mapping>
    <filter-name>springSecurityFilterChain</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>

<!--配置监听器-->
<listener>
    <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
</listener>
```

## **Spring-Security.xml配置**

```
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:security="http://www.springframework.org/schema/security"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/security
    http://www.springframework.org/schema/security/spring-security.xsd">

    <security:global-method-security jsr250-annotations="enabled" secured-annotations="enabled" />

    <!-- 配置不拦截的资源 -->
    <security:http pattern="/login.jsp" security="none"/>
    <security:http pattern="/failure.jsp" security="none"/>
    <security:http pattern="/css/**" security="none"/>
    <security:http pattern="/img/**" security="none"/>
    <security:http pattern="/plugins/**" security="none"/>

    <!--配置具体的规则-->
    <security:http auto-config="true" use-expressions="false">
        <!-- 配置拦截的规则 -->
        <security:intercept-url pattern="/**" access="ROLE_USER,ROLE_ADMIN"/>

        <!-- 定义跳转的具体的页面 -->
        <security:form-login
                login-page="/login.jsp"
                login-processing-url="/login.do"
                default-target-url="/index.jsp"
                authentication-failure-url="/failer.jsp"
                authentication-success-forward-url="/pages/main.jsp"
        />

        <!-- 关闭跨域请求 -->
        <security:csrf disabled="true"/>

        <!-- 退出 -->
        <security:logout invalidate-session="true" logout-url="/logout.do" logout-success-url="/login.jsp"/>

    </security:http>

    <!-- 使用数据库中的用户名和密码 -->
    <security:authentication-manager>
        <!--配置自己编写的userService-->
        <security:authentication-provider user-service-ref="userService">
            <!-- 配置加密的方式 -->
            <security:password-encoder ref="passwordEncoder"/>
        </security:authentication-provider>
    </security:authentication-manager>

    <!-- 配置加密类 -->
    <bean id="passwordEncoder" class="org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder"/>

</beans>
```

## **UserDetailsService接口**

> Spring Security框架已经为我们写好了用户认证的流程，我们只需编写继承自UserDetailsService的用户服务层，并重写loadUserByUsername方法即可

```
@Service
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
    private List<SimpleGrantedAuthority> getAuthority(List<Role> roles) {
    
        List<SimpleGrantedAuthority> list = new ArrayList<>();
        for (Role role : roles) {
            list.add(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));
        }
        return list;
    }
 }
```

## **方法权限控制**

```
// JSR-250
@RolesAllowed("ROLE_USER")表示访问对应方法时所应该具有的角色
@PermitAll表示允许所有的角色进行访问，也就是说不进行权限控制 
@DenyAll是和PermitAll相反的，表示无论什么角色都不能访问 

// secured注解
@Secured("ROLE_USER")

// 支持表达式的注解
```
