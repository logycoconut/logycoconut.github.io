---
title: "Spring配置笔记"
date: 2019-10-02T20:03:16+08:00
draft: false
categories: ["关于技术"]
tags: ["Spring"]
---

> 忘记的时候翻一翻

## **XML配置**

### **IOC容器**

*使用bean标签，除了id和class属性之外没有其他属性和标签时，采用的就是默认构造函数创建bean对象
如果类中没有默认构造函数，则无法创建*

* 默认构造函数创建
`<bean id="exampleService" class="com.hall.service.impl.ExampleService"></bean>`

* 使用某个类(例如工厂)中的方法创建对象
```
<bean id="instanceFactory" class="com.hall.factory.InstanceFactory"></bean>
<bean id="exampleService" factory-bean="instanceFactory" factory-method="getExampleService"></bean>
```

* 工厂中的静态方法创建对象（使用某个类中的静态方法创建对象）
```
<bean id="accountService" class="com.hall.factory.StaticFactory" factory-method="getExampleService"></bean>
```

---

### **DI依赖注入**

#### **能注入的数据类型**

* 基本类型和String类型
* 其他的bean类型（在配置文件中或者注解配置过的bean）
* 复杂类型/集合类型

#### **注入方式**

* 使用构造函数提供 
使用constructor-arg标签
``` 
<bean id="exampleService" class="com.hall.service.impl.ExampleService">
    <constructor-arg index="0" value="张三"></constructor-arg>
    <constructor-arg type="java.lang.Integer" value="3"></constructor-arg>
    <constructor-arg name="birthday" ref="now"></constructor-arg>
</bean>
<bean id="now" class="java.util.Date"></bean>
```
* 使用set方法提供
使用property标签，需要提供setter方法
```
<bean id="exampleService" class="com.hall.service.impl.ExampleService">
    <property name="name" value="张三"></property>
    <property name="age" value="15"></property>
    <property name="birthday" ref="now"></property>
</bean>
```
* 使用注解提供

---

### **AOP面向切面**

#### **配置AOP**

```
<!--开始aop的配置-->
<aop:config>
    <!--配置切面,指定通知类的bean的id-->
    <aop:aspect id="logAdvice" ref="logger"> 
        <!--配置通知的类型，并且建立通知方法和切入点方法的关联-->
        <aop:before method="printLog" pointcut="execution(* com.hall.service.impl.*.*(..))"></aop:before>
    </aop:aspect>
</aop:config>
```
#### **切入点表达式**

* **表达式** 访问修饰符 返回值 全类名.方法名(参数类别)
* **标准的表达式写法** ` public void com.hall.service.impl.ExampleService.saveExample()`
>* 访问修饰符可以省略
>* 返回值可以使用通配符，表示任意返回值
>* 包名可以使用通配符表示，表示任意包，但是有几级包，就需要写几个*.
>* 包名可以使用..表示当前包及其子包
>* 参数列表：
    * 可以直接写数据类型：基本类型直接写名称`int`、引用类型写包名.类名的方式 `java.lang.String`
    * 可以使用通配符表示任意类型，但是必须有参数
    * 可以使用..表示有无参数均可，有参数可以是任意类型

* **全通配写法** `* *..*.*(..)`
* **实际开发中切入点表达式的通常写法** 切到业务层实现类下的所有方法

---

### **Spring事务**

* 配置事务管理器
* 配置事务的通知
* 建立事务通知和切入点表达式的对应关系
```
 <!-- 1. 配置事务管理器 -->
<bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
    <property name="dataSource" ref="dataSource"></property>
</bean>
<!-- 2. 配置事务的通知 -->
<tx:advice id="txAdvice" transaction-manager="transactionManager">
    <!--配置事务的属性
            isolation=""    用于指定事务的隔离级别 默认是DEFAULT 表示使用数据库的默认隔离级别
            propagation=""      用于指定事务的传播行为 默认是REQUIRED 表示一定会有事务，增删改的选择，查询方法可以选择SUPPORTS
            read-only=""        用于指定事务是否只读 只有查询方法才能设置为true 默认是false 表示读写
            timeout=""      用于指定事务的超时时间
            rollback-for=""    用于指定一个异常， 当产生该异常是，事务回滚，其他异常不回滚，没有默认值则全都回滚
            no-rollback-for=""  用于指定一个异常，当产生该异常是，事务不回滚，其他异常回滚，没有默认值则全都回滚
    -->
    <tx:attributes>
        <tx:method name="*" propagation="REQUIRED" read-only="false" />
        <tx:method name="find*" propagation="SUPPORTS" read-only="true" />
    </tx:attributes>
</tx:advice>

<!-- 3. 配置aop -->
<aop:config>
    <aop:pointcut id="pt" expression="execution(* com.hall.service.impl.*.*(..))"></aop:pointcut>
    <!--建立切入点表达式和事务通知的对应关系-->
    <aop:advisor advice-ref="txAdvice" pointcut-ref="pt" ></aop:advisor>
</aop:config>
```

---

## **注解配置**

* **用于创建对象的**

`@Component(value="beanId")`

`@Repository`、`@Service`、`@Controller`的作用和`@Component`的作用一样

`@Bean("beanName")` 将对象放入容器

* **用于注入数据的**

`@Autowired`
自动按照类型注入，只要容器中有唯一的一个bean对象类型和要注入的变量类型匹配，就可以注入成功，否则根据名字匹配

`@Qualifier`
和`@Autowired`在类型注入的基础上按照名称注入

`@Resource`
默认按照注解对象的名称注入

`@Value`
用于注入基本类型和String类型，可以使用spring的EL表达式`${表达式}`

* **用于配置事务的**

`@Transactional(propagation = Propagation.SUPPORTS, readOnly = true)`
使用前需要先在容器中配置事务管理器

* **用于配置Configuration的**

`@Configuration`
标识spring的配置类，可有可无

`@ComponentScan({"com.hall"})`
标识要扫描的包

`@Import(JdbcConfig.class)`
导入其他配置类，例如数据库连接、事务管理

`@PropertySource("classpath:jdbcConfig.properties")`
导入配置文件

* **用于Spring整合junit的**

`@RunWith(SpringJUnit4ClassRunner.class)`
用于替代原来的方法

`@ContextConfiguration(classes=SpringConfiguration.class)`
用于导入Spring的配置类或配置文件

* **用于配置AOP的**

`@Aspect`
标注切面

`@Pointcut`
配置切入点表达式
```
@Pointcut("execution(* com.hall.service.impl.*.*(..))")
private void pt(){}
```

`@Before`、`@AfterReturning`、`@AfterThrowing`、`@After`
前置通知、后置通知、异常通知、最终通知

`@Around`
环绕通知

```
@Around("pt()")
public Object aroundAdvice(ProceedingJoinPoint joinPoint) {
    Object rtnValue = null;
    try {
        System.out.println("前置通知");
        rtnValue = joinPoint.proceed(joinPoint.getArgs());
        System.out.println("后置通知");
        return rtnValue;
    } catch (Throwable throwable) {
        System.out.println("异常通知");
        throw new RuntimeException(throwable.getMessage());
    } finally {
        System.out.println("最终通知");
    }
}
```

### JoinPoint类型的几个方法
`Object[] getArgs()`：返回执行目标方法时的参数

`Signature getSignature()`：返回被增强的方法的相关信息。

`Object getTarget()`：返回被织入advice的目标对象

`Object getThis()`：返回AOP框架为目标对象生成的代理对象

---

