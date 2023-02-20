---
title: "Spring中事务的处理"
date: 2020-12-03T14:21:11+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringDataJpa", "Spring"]
---

## 注解式事务

### `@Transactional` 源码

```java
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface Transactional {
    @AliasFor("transactionManager")
    String value() default "";

    @AliasFor("value")
    String transactionManager() default "";

    Propagation propagation() default Propagation.REQUIRED;

    Isolation isolation() default Isolation.DEFAULT;

    int timeout() default -1;

    boolean readOnly() default false;

    Class<? extends Throwable>[] rollbackFor() default {};

    String[] rollbackForClassName() default {};

    Class<? extends Throwable>[] noRollbackFor() default {};

    String[] noRollbackForClassName() default {};
}
```

### 常用参数说明

| 参数名称                   | 功能描述                                 |
| ---------------------- | ------------------------------------ |
| readOnly               | 设置当前事务是否为只读事务                        |
| rollbackFor            | 设置需要进行回滚的异常类数组                       |
| rollbackForClassName   | 设置需要进行回滚的异常类名称数组                     |
| noRollbackFor          | 设置不需要进行回滚的异常类数组                      |
| noRollbackForClassName | 设置不需要进行回滚的异常类名称数组                    |
| propagation            | 设置事务的传播行为                            |
| isolation              | 设置底层数据库的事务隔离级别，通常使用数据库的默认隔离级别        |
| timeout                | 设置事务的超时秒数，默认为-1，表示永不超时               |
| transactionManager     | 指定transactionManager，当有多个datasource时 |

### `propagation` 的值

- REQUIRED：如果当前存在事务，则加入该事务；如果当前没有事务，则创建一个新的事务
- SUPPORTS：如果当前存在事务，则加入该事务；如果当前没有事务，则以非事务的方式继续运行
- MANDATORY：如果当前存在事务，则加入该事务；如果当前没有事务，则抛出异常
- REQUIRED_NEW：创建一个新事务，如果当前存在事务，则把当前事务挂起
- NOT_SUPPORTED：以非事务方式运行，如果当前存在事务，则把当前事务挂起
- NEVER：以非事务方式运行，如果当前存在事务，则抛出异常
- NESTED：如果当前存在事务，则创建一个事务作为当前事务的嵌套事务来运行；如果当前没有事务，则该取值等价于REQUIRED

## 声明式事务

> 又叫隐式事务，或者叫ASPECTJ事务

```java
@Configuration
@EnableTransactionManagement
public class AspectJTransactionConfig {

    /**
     * 表示com.example.demo.service包下的所有类的所有方法
     */
    private static final String TRANSACTION_EXECUTION = "execution (* com.example.demo.service.*.*(..))";

    @Autowired
    private PlatformTransactionManager transactionManager;

    @Bean
    public DefaultPointcutAdvisor defaultPointcutAdvisor() {
        // 1. 配置切入点表达式
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        pointcut.setExpression(TRANSACTION_EXECUTION);

        // 2. 配置事务通知
        NameMatchTransactionAttributeSource attributes = new NameMatchTransactionAttributeSource();

        // 2.1 配置事务传播属性
        RuleBasedTransactionAttribute readOnlyTx = new RuleBasedTransactionAttribute();
        readOnlyTx.setReadOnly(true);
        readOnlyTx.setPropagationBehavior(TransactionDefinition.PROPAGATION_NOT_SUPPORTED);

        RuleBasedTransactionAttribute requiredTx = new RuleBasedTransactionAttribute();
        requiredTx.setRollbackRules(Collections.singletonList(new RollbackRuleAttribute(Exception.class)));
        requiredTx.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        requiredTx.setTimeout(5);

        Map<String, TransactionAttribute> txMap = new HashMap<>();
        txMap.put("add*", requiredTx);
        txMap.put("save*", requiredTx);
        txMap.put("insert*", requiredTx);
        txMap.put("update*", requiredTx);
        txMap.put("delete*", requiredTx);
        txMap.put("get*", readOnlyTx);
        txMap.put("query*", readOnlyTx);
        attributes.setNameMap(txMap);

        TransactionInterceptor txAdvice = new TransactionInterceptor();
        txAdvice.setTransactionManager(transactionManager);
        txAdvice.setTransactionAttributeSource(attributes);

        // 3. 配置advisor
        DefaultPointcutAdvisor advisor = new DefaultPointcutAdvisor();
        advisor.setPointcut(pointcut);
        advisor.setAdvice(txAdvice);

        return advisor;
    }

}
```
