---
title: "Auditing及其事件详解"
date: 2020-12-03T13:59:11+08:00
draft: false
categories: ["关于技术"]
tags: ["SpringDataJpa"]
---

> 我们在实际开发中，对表中记录经常需要记录是谁创建的、谁最后修改过、修改时间是什么时候。
> Auditing意为审计，是Jpa为我们提供的以上功能实现

## 基本实现

### 四个注解

- `@CreatedDate`
- `@LastModifiedDate`
- `@CreatedBy`
- `@LastModifiedBy`

### 代码示例
```java
// 实体类
@Data
@Entity
@EntityListeners(AuditingEntityListener.class)  // 表明需要审计功能
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String code;

    // 以下是JPA支持自动修改的注解
    @CreatedDate
    private Date createTime;
    @LastModifiedDate
    private Date lastModifiedTime;
    @CreatedBy
    private String createUser;
    @LastModifiedBy
    private String lastModifiedUser;

}

// 实现自己的AuditorAware
public class MyAuditorAware implements AuditorAware<String> {

    @Override
    public Optional<String> getCurrentAuditor() {
        return Optional.of("hall");
    }

}

// 开启JPA的审计功能
@SpringBootApplication
@EnableJpaAuditing
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    // 注入自己实现的AuditorAware类
    @Bean
    public AuditorAware<String> auditorProvider() {
        return new MyAuditorAware();
    }

}
```

### 扩展成Entity基类

```java
@Data
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AbstractAuditable {

    @CreatedDate
    private Date createTime;
    @LastModifiedDate
    private Date lastModifiedTime;
    @CreatedBy
    private String createUser;
    @LastModifiedBy
    private String lastModifiedUser;

}
```

## Listener扩展

### Callbacks注解方式

|  Type | Description |
| --- | --- |
| @PrePersist | 新增之前 |
| @PostPersist | 新增之后 |
| @PreUpdate | 更新之前 |
| @PostUpdate | 更新之后 |
| @PreRemove | 删除之前 |
| @PostRemove | 删除之后 |
| @PostLoad | 加载之后 |

需要注意的是，这些方法都是同步机制，一旦报错将会影响所有底层代码执行。实际工作中实现这些方法的时候，方法体里面开启异步线程或者消息队列来异步处理

### 代码示例

```java
// 实体类
@Data
@Entity
@EntityListeners(EmployeeAuditListener.class)
public class Employee extends AbstractAuditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String code;


}

// 自定义Listener
@Slf4j
public class EmployeeAuditListener {

    @PostPersist
    private void postPersist(Employee employee) {
        log.info("新增啦，{}", employee);
    }

}
```

### Jpa的乐观锁实现 `@Version` 

只需要在字段上加上Version注解

```java
@Version
private Long version;
```
