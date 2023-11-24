---
title: 使用滑动窗口算法实现限流 - Java 实现
tag: [Redis, 滑动窗口, Java]
---

### 主要步骤

- 引入必须的 Jar 包

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
```

- 准备好 `Lua` 脚本

```lua
-- KEYS[1]: 资源名称
-- ARGV[1]: 时间窗口长度(单位秒)
-- ARGV[2]: 限流大小
local key = tostring(KEYS[1])
local window = tonumber(ARGV[1])
local limit = tonumber(ARGV[2])

local current = redis.call("incr", key)
if current == 1 then
    -- 第一次请求,设置过期时间
    redis.call("expire", key, window)
    return 1
elseif current <= limit then
    -- 请求数量未超过限流大小
    return 1
else
    -- 请求数量超过限流大小
    return 0
end
```

- 使用 `Redis Template` 执行 `Lua` 脚本

```java
@Resource
private StringRedisTemplate stringRedisTemplate;

@Test
void slideWindowTest() {
    DefaultRedisScript<Long> limitScript = new DefaultRedisScript<>();
    limitScript.setScriptSource(new ResourceScriptSource(new ClassPathResource("./lua/limit.lua")));
    limitScript.setResultType(Long.class);
    Long result = stringRedisTemplate.execute(limitScript, Collections.singletonList("test_key"), "60", "10");
    if (1 == result) {
        // 允许请求
        System.out.println("allowed");
    } else {
        // 限流
        System.out.println("limited");
    }
}
```
