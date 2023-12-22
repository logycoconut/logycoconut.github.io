import{_ as l}from"./plugin-vue_export-helper-c27b6911.js";import{r as s,o as d,c as r,a as e,b as i,d as t,e as n}from"./app-28676176.js";const o={},c=n('<h2 id="有状态和无状态" tabindex="-1"><a class="header-anchor" href="#有状态和无状态" aria-hidden="true">#</a> 有状态和无状态</h2><h3 id="什么是有状态" tabindex="-1"><a class="header-anchor" href="#什么是有状态" aria-hidden="true">#</a> 什么是有状态</h3><p>服务器需要记录每次会话的用户信息, 从而识别用户信息, 根据用户身份对请求处理, 例如说tomcat的session</p><p>用户登陆后, 服务器将用户信息保存在session中, 然后返回用户一个cookie, cookie中记录了session的id</p><p>在用户下次请求时, 我们就可以根据session的id找到对应的用户信息, 这样就实现了用户的登录验证</p><p>如果存在很多用户, 那么服务器就需要保存大量session数据, 给服务器带来很大的压力</p><h3 id="什么是无状态" tabindex="-1"><a class="header-anchor" href="#什么是无状态" aria-hidden="true">#</a> 什么是无状态</h3><p>有状态服务依赖于服务器, 多次请求必须请求同一台服务器, 这不符合微服务集群的思想</p><p>REST风格的一个重要规范即是服务的无状态性</p><p>服务器不需要保存任何客户端用户信息</p><p>客户端的每次请求必须都具备自描述信息, 这样服务器才能通过这些信息识别请求所属</p><h2 id="实现无状态" tabindex="-1"><a class="header-anchor" href="#实现无状态" aria-hidden="true">#</a> 实现无状态</h2><ul><li>用户登录</li><li>服务器返回token信息, 放在cookie中</li><li>之后的每次请求都携带token信息</li><li>服务器解析token判断请求是否有效 ( 是否过期? 是否被篡改? )</li></ul><p>可以看出, 在无状态登录过程中, token至关重要</p><p>所以我们需要学习token的生成以及加密</p><h3 id="jwt" tabindex="-1"><a class="header-anchor" href="#jwt" aria-hidden="true">#</a> JWT</h3><p>JWT的全称是Json Web Token, 是JSON风格轻量级的授权和身份认证规范，可实现无状态、分布式的Web应用授权</p>',17),u={href:"https://jwt.io/",target:"_blank",rel:"noopener noreferrer"},v=n(`<ul><li>包含三部分数据, <code>Header</code>, <code>Payload</code>, <code>Signature</code></li><li><code>Header:</code> 描述该JWT最基本的信息, 例如类型以及签名所用的算法</li><li><code>Payload:</code> 存放有效信息的地方, 采用base64编码, 不要放敏感信息</li><li><code>Signature:</code> 前两部分组合, 然后通过声明的加密方式加盐生成</li></ul><h3 id="rsa" tabindex="-1"><a class="header-anchor" href="#rsa" aria-hidden="true">#</a> RSA</h3><p>RAS, 是一种非对称加密算法</p><ul><li>根据一串密文同时生成私钥和公钥</li><li>私钥隐秘保存, 公钥下发给信任的客户端</li><li>私钥加密, 私钥和公钥可以解密</li><li>公钥加密, 私钥可以解密</li></ul><h3 id="结合rsa的鉴权" tabindex="-1"><a class="header-anchor" href="#结合rsa的鉴权" aria-hidden="true">#</a> 结合RSA的鉴权</h3><ul><li>客户端发送登录请求, 请求通过网关发送给授权中心</li><li>授权中心验证用户名密码之后下发私钥加密后的token</li><li>之后客户端的每次请求都携带着token</li><li>被信任的微服务中都存放着公钥, 通过公钥解析token, 对请求进行处理</li></ul><h3 id="java实现" tabindex="-1"><a class="header-anchor" href="#java实现" aria-hidden="true">#</a> Java实现</h3><ul><li>引入maven</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>&lt;dependency&gt;
    &lt;groupId&gt;io.jsonwebtoken&lt;/groupId&gt;
    &lt;artifactId&gt;jjwt&lt;/artifactId&gt;
    &lt;version&gt;0.9.0&lt;/version&gt;
&lt;/dependency&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>编写工具类</li></ul><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/**
 * 假设token中存放着用户id以及用户名
 */
public class JwtUtils {
    /**
     * 私钥加密token
     * @param userInfo  载荷中的数据
     */
    public static String generateToken(UserInfo userInfo, PrivateKey privateKey, int expireMinutes) throws Exception {
        return Jwts.builder()
                .claim(&quot;id&quot;, userInfo.getId())
                .claim(&quot;username&quot;, userInfo.getUsername())
                .setExpiration(DateTime.now().plusMinutes(expireMinutes).toDate())
                .signWith(SignatureAlgorithm.RS256, privateKey)
                .compact();
    }

    /**
     * 公钥解析token
     */
    private static Jws&lt;Claims&gt; parserToken(String token, PublicKey publicKey) {
        return Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token);
    }

    /**
     * 获取token中的用户信息
     */
    public static UserInfo getInfoFromToken(String token, PublicKey publicKey) throws Exception {
        Jws&lt;Claims&gt; claimsJws = parserToken(token, publicKey);
        Claims body = claimsJws.getBody();
        return new UserInfo(
                ObjectUtils.toLong(body.get(&quot;id&quot;)),
                ObjectUtils.toString(body.get(&quot;username&quot;))
        );
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11);function m(b,p){const a=s("ExternalLinkIcon");return d(),r("div",null,[c,e("p",null,[e("em",null,[e("a",u,[i("官网"),t(a)]),i("可以在线调试JWT")])]),v])}const _=l(o,[["render",m],["__file","200221_如何实现无状态登录.html.vue"]]);export{_ as default};
