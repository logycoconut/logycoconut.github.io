import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as e,o as i}from"./app-iL55Gi4h.js";const l={};function p(r,n){return i(),a("div",null,[...n[0]||(n[0]=[e(`<div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>阅读 3 服务器版本，主要用于填补 iOS 系统上小说软件的空白</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><h1 id="阅读-3-0-web-版搭建" tabindex="-1"><a class="header-anchor" href="#阅读-3-0-web-版搭建"><span>阅读 3.0 Web 版搭建</span></a></h1><h2 id="搭建前的准备" tabindex="-1"><a class="header-anchor" href="#搭建前的准备"><span>搭建前的准备</span></a></h2><ul><li>一台云服务器</li></ul><p><strong>需要有公网 IP</strong>，方便随时随地访问（域名可有可无）</p><p>我目前用的「阿里云服务器」，还是大学的时候一次性买的，但是之后续费变的太贵，之后会寻找其他方式部署</p><p>机器配置为 2C 1G ，搜书效率很慢、带宽也上不去</p><p>有条件的建议部署在好一点的服务器上面，可以提升使用体验（比如一台有公网IP的本地服务器）</p><ul><li>可靠的书源</li></ul><p>和 Android 端的阅读 3 一脉相承，所以 <code>iOS</code> 用户可以蹭一下 <code>Android</code> 用户的书源</p><h2 id="如何搭建" tabindex="-1"><a class="header-anchor" href="#如何搭建"><span>如何搭建</span></a></h2><p>其实<a href="https://github.com/hectorqin/reader/blob/master/doc.md" target="_blank" rel="noopener noreferrer">文档</a>已经说得很明白了，注释也写得非常全....</p><h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤"><span>步骤</span></a></h3><ol><li><p>详细阅读配置文件，按照自己的想法稍作修改</p></li><li><p>docker-compose 部署</p></li><li><p>开放安全组端口，方便外部访问（如果是阿里云）</p></li><li><p>使用 Safari、Chrome 访问阅读 3 对应地址（ip:4396）</p></li><li><p>将网页添加到主屏幕</p></li></ol><p>好了，现在就可以访问你自己的阅读 APP了，就像原生 APP 一样 🎉</p><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件"><span>配置文件</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>version: &#39;3.1&#39;</span></span>
<span class="line"><span>services:</span></span>
<span class="line"><span># reader 在线阅读</span></span>
<span class="line"><span># 第三方在线演示(服务器位于日本)：[https://reader.nxnow.top](https://reader.nxnow.top) 测试账号/密码分别为guest/guest123，也可自行创建账号添加书源，不定期删除长期未登录账号</span></span>
<span class="line"><span># 源仓库书源 : yckceo.com/yuedu/shuyuan/index.html</span></span>
<span class="line"><span># 阅读官方书源 : https://www.legado.top/blog/book-source</span></span>
<span class="line"><span># 喵公子书源 : http://shuyuan.miaogongzi.net/shuyuan/1623355431.json</span></span>
<span class="line"><span># 手动更新方式 : docker-compose pull &amp;&amp; docker-compose up -d</span></span>
<span class="line"><span>  reader:</span></span>
<span class="line"><span>    # image: hectorqin/reader</span></span>
<span class="line"><span>    image: hectorqin/reader:openj9-latest #docker镜像，arm64架构或小内存机器优先使用此镜像.启用需删除上一行</span></span>
<span class="line"><span>    container_name: reader #容器名 可自行修改</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    ports:</span></span>
<span class="line"><span>      - 4396:8080 #4396端口映射可自行修改</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - share_net</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /home/reader/logs:/logs #log映射目录 /home/reader/logs 映射目录可自行修改</span></span>
<span class="line"><span>      - /home/reader/storage:/storage #数据映射目录 /home/reader/storage 映射目录可自行修改</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      - SPRING_PROFILES_ACTIVE=prod</span></span>
<span class="line"><span>      - READER_APP_USERLIMIT=50 #用户上限,默认50</span></span>
<span class="line"><span>      - READER_APP_USERBOOKLIMIT=200 #用户书籍上限,默认200</span></span>
<span class="line"><span>      - READER_APP_CACHECHAPTERCONTENT=true #开启缓存章节内容 V2.0</span></span>
<span class="line"><span>      # 如果启用远程webview，需要取消注释下面的 remote-webview 服务</span></span>
<span class="line"><span>      # - READER_APP_REMOTEWEBVIEWAPI=http://remote-webview:8050 #开启远程webview</span></span>
<span class="line"><span>      # 下面都是多用户模式配置</span></span>
<span class="line"><span>      - READER_APP_SECURE=true #开启登录鉴权，开启后将支持多用户模式</span></span>
<span class="line"><span>      - READER_APP_SECUREKEY=adminpwd  #管理员密码  建议修改</span></span>
<span class="line"><span>      - READER_APP_INVITECODE=601 #注册邀请码 建议修改,如不需要可注释或删除</span></span>
<span class="line"><span>  # remote-webview:</span></span>
<span class="line"><span>  #   image: hectorqin/remote-webview</span></span>
<span class="line"><span>  #   container_name: remote-webview #容器名 可自行修改</span></span>
<span class="line"><span>  #   restart: always</span></span>
<span class="line"><span>  #   ports:</span></span>
<span class="line"><span>  #     - 8050:8050</span></span>
<span class="line"><span>  #   networks:</span></span>
<span class="line"><span>  #     - share_net</span></span>
<span class="line"><span># 自动更新docker镜像</span></span>
<span class="line"><span>  watchtower:</span></span>
<span class="line"><span>    image: containrrr/watchtower</span></span>
<span class="line"><span>    container_name: watchtower</span></span>
<span class="line"><span>    restart: always</span></span>
<span class="line"><span>    # 环境变量,设置为上海时区</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>        - TZ=Asia/Shanghai</span></span>
<span class="line"><span>    volumes:</span></span>
<span class="line"><span>      - /var/run/docker.sock:/var/run/docker.sock</span></span>
<span class="line"><span>    command: reader watchtower --cleanup --schedule &quot;0 0 4 * * *&quot;</span></span>
<span class="line"><span>    networks:</span></span>
<span class="line"><span>      - share_net</span></span>
<span class="line"><span>    # 仅更新reader与watchtower容器,如需其他自行添加 &#39;容器名&#39; ,如:reader watchtower nginx</span></span>
<span class="line"><span>    # --cleanup 更新后清理旧版本镜像</span></span>
<span class="line"><span>    # --schedule 自动检测更新 crontab定时(限定6位crontab) 此处代表凌晨4点整</span></span>
<span class="line"><span>networks:</span></span>
<span class="line"><span>  share_net:</span></span>
<span class="line"><span>    driver: bridge</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="另外" tabindex="-1"><a class="header-anchor" href="#另外"><span>另外</span></a></h3><p>其实经过上述步骤后，你已经可以正常阅读小说了</p><p>但是阅读 3 还提供了调试书源、配置备份、webdav 等功能，有兴趣的可以自己摸索</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接"><span>参考链接</span></a></h2><ul><li><p><a href="https://github.com/hectorqin/reader" target="_blank" rel="noopener noreferrer">阅读3 服务器版</a></p></li><li><p><a href="https://github.com/XIU2/Yuedu" target="_blank" rel="noopener noreferrer">GitHub - XIU2/Yuedu: 📚「阅读」APP 精品书源（网络小说）</a></p></li><li><p><a href="http://yck.mumuceo.com/" target="_blank" rel="noopener noreferrer">源仓库书源</a></p></li></ul><p>​​<!-- +++++++++ 下面是引用式链接 +++++++++ --></p>`,23)])])}const d=s(l,[["render",p]]),o=JSON.parse(`{"path":"/area/lifestyle/03_%E5%B0%B1%E6%98%AF%E7%88%B1%E6%8A%98%E8%85%BE%E7%B3%BB%E5%88%97/%E9%98%85%E8%AF%BB%203.0%20Web%20%E7%89%88%E6%90%AD%E5%BB%BA.html","title":"阅读 3.0 Web 版搭建","lang":"zh-CN","frontmatter":{"title":"阅读 3.0 Web 版搭建","tags":["小说"],"order":6,"description":"阅读 3.0 Web 版搭建 搭建前的准备 一台云服务器 需要有公网 IP，方便随时随地访问（域名可有可无） 我目前用的「阿里云服务器」，还是大学的时候一次性买的，但是之后续费变的太贵，之后会寻找其他方式部署 机器配置为 2C 1G ，搜书效率很慢、带宽也上不去 有条件的建议部署在好一点的服务器上面，可以提升使用体验（比如一台有公网IP的本地服务器） ...","head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"阅读 3.0 Web 版搭建\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"],["meta",{"property":"og:url","content":"https://logycoconut.github.io/area/lifestyle/03_%E5%B0%B1%E6%98%AF%E7%88%B1%E6%8A%98%E8%85%BE%E7%B3%BB%E5%88%97/%E9%98%85%E8%AF%BB%203.0%20Web%20%E7%89%88%E6%90%AD%E5%BB%BA.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"阅读 3.0 Web 版搭建"}],["meta",{"property":"og:description","content":"阅读 3.0 Web 版搭建 搭建前的准备 一台云服务器 需要有公网 IP，方便随时随地访问（域名可有可无） 我目前用的「阿里云服务器」，还是大学的时候一次性买的，但是之后续费变的太贵，之后会寻找其他方式部署 机器配置为 2C 1G ，搜书效率很慢、带宽也上不去 有条件的建议部署在好一点的服务器上面，可以提升使用体验（比如一台有公网IP的本地服务器） ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"小说"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}]]},"git":{"createdTime":1668008572000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"1425795337@qq.com","commits":17,"url":"https://github.com/logycoconut"},{"name":"eward","username":"eward","email":"logycoconut@foxmail.com","commits":2,"url":"https://github.com/eward"}]},"readingTime":{"minutes":2.99,"words":897},"filePathRelative":"area/lifestyle/03_就是爱折腾系列/阅读 3.0 Web 版搭建.md","autoDesc":true}`);export{d as comp,o as data};
