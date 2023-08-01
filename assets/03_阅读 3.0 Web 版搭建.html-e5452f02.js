import{_ as s}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as l,c as t,a as e,b as n,d as r,f as a,e as o}from"./app-dfc4fa93.js";const c={},v=a(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>阅读 3 服务器版本，主要用于填补 iOS 系统上小说软件的空白
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="搭建前的准备" tabindex="-1"><a class="header-anchor" href="#搭建前的准备" aria-hidden="true">#</a> 搭建前的准备</h2><ul><li>一台云服务器</li></ul><p><strong>需要有公网 IP</strong>，方便随时随地访问（域名可有可无）</p><p>我目前用的「阿里云服务器」，还是大学的时候一次性买的，但是之后续费变的太贵，之后会寻找其他方式部署</p><p>机器配置为 2C 1G ，搜书效率很慢、带宽也上不去</p><p>有条件的建议部署在好一点的服务器上面，可以提升使用体验（比如一台有公网IP的本地服务器）</p><ul><li>可靠的书源</li></ul><p>其实和 Android 端的阅读 3 一脉相承，所以 iOS 用户可以蹭一下 Android 用户的书源</p><h2 id="如何搭建" tabindex="-1"><a class="header-anchor" href="#如何搭建" aria-hidden="true">#</a> 如何搭建</h2>`,10),u={href:"https://github.com/hectorqin/reader/blob/master/doc.md",target:"_blank",rel:"noopener noreferrer"},m=a(`<h3 id="步骤" tabindex="-1"><a class="header-anchor" href="#步骤" aria-hidden="true">#</a> 步骤</h3><ol><li>详细阅读配置文件，按照自己的想法稍作修改</li><li>docker-compose 部署</li><li>开放安全组端口，方便外部访问（如果是阿里云）</li><li>使用 Safari、Chrome 访问阅读 3 对应地址（ip:4396）</li><li>将网页添加到主屏幕</li></ol><p>好了，现在就可以访问你自己的阅读 APP了，就像原生 APP 一样 🎉</p><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3.1&#39;
services:
# reader 在线阅读
# 第三方在线演示(服务器位于日本)：[https://reader.nxnow.top](https://reader.nxnow.top) 测试账号/密码分别为guest/guest123，也可自行创建账号添加书源，不定期删除长期未登录账号
# 源仓库书源 : yckceo.com/yuedu/shuyuan/index.html
# 阅读官方书源 : https://www.legado.top/blog/book-source
# 喵公子书源 : http://shuyuan.miaogongzi.net/shuyuan/1623355431.json
# 手动更新方式 : docker-compose pull &amp;&amp; docker-compose up -d
  reader:
    # image: hectorqin/reader
    image: hectorqin/reader:openj9-latest #docker镜像，arm64架构或小内存机器优先使用此镜像.启用需删除上一行
    container_name: reader #容器名 可自行修改
    restart: always
    ports:
      - 4396:8080 #4396端口映射可自行修改
    networks:
      - share_net
    volumes:
      - /home/reader/logs:/logs #log映射目录 /home/reader/logs 映射目录可自行修改
      - /home/reader/storage:/storage #数据映射目录 /home/reader/storage 映射目录可自行修改
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - READER_APP_USERLIMIT=50 #用户上限,默认50
      - READER_APP_USERBOOKLIMIT=200 #用户书籍上限,默认200
      - READER_APP_CACHECHAPTERCONTENT=true #开启缓存章节内容 V2.0
      # 如果启用远程webview，需要取消注释下面的 remote-webview 服务
      # - READER_APP_REMOTEWEBVIEWAPI=http://remote-webview:8050 #开启远程webview
      # 下面都是多用户模式配置
      - READER_APP_SECURE=true #开启登录鉴权，开启后将支持多用户模式
      - READER_APP_SECUREKEY=adminpwd  #管理员密码  建议修改
      - READER_APP_INVITECODE=601 #注册邀请码 建议修改,如不需要可注释或删除
  # remote-webview:
  #   image: hectorqin/remote-webview
  #   container_name: remote-webview #容器名 可自行修改
  #   restart: always
  #   ports:
  #     - 8050:8050
  #   networks:
  #     - share_net
# 自动更新docker镜像
  watchtower:
    image: containrrr/watchtower
    container_name: watchtower
    restart: always
    # 环境变量,设置为上海时区
    environment:
        - TZ=Asia/Shanghai
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    command: reader watchtower --cleanup --schedule &quot;0 0 4 * * *&quot;
    networks:
      - share_net
    # 仅更新reader与watchtower容器,如需其他自行添加 &#39;容器名&#39; ,如:reader watchtower nginx
    # --cleanup 更新后清理旧版本镜像
    # --schedule 自动检测更新 crontab定时(限定6位crontab) 此处代表凌晨4点整
networks:
  share_net:
    driver: bridge
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="另外" tabindex="-1"><a class="header-anchor" href="#另外" aria-hidden="true">#</a> 另外</h3><p>其实经过上述步骤后，你已经可以正常阅读小说了</p><p>但是阅读 3 还提供了调试书源、配置备份、webdav 等功能，有兴趣的可以自己摸索</p><h2 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h2>`,9),b={href:"https://github.com/hectorqin/reader",target:"_blank",rel:"noopener noreferrer"},h={href:"https://github.com/XIU2/Yuedu",target:"_blank",rel:"noopener noreferrer"},_={href:"http://yck.mumuceo.com/",target:"_blank",rel:"noopener noreferrer"},p=e("p",null,[n("​​"),o(" +++++++++ 下面是引用式链接 +++++++++ ")],-1);function w(g,E){const i=d("ExternalLinkIcon");return l(),t("div",null,[v,e("p",null,[n("其实"),e("a",u,[n("文档"),r(i)]),n("已经说得很明白了，注释也写得非常全....")]),m,e("ul",null,[e("li",null,[e("p",null,[e("a",b,[n("阅读3 服务器版"),r(i)])])]),e("li",null,[e("p",null,[e("a",h,[n("GitHub - XIU2/Yuedu: 📚「阅读」APP 精品书源（网络小说）"),r(i)])])]),e("li",null,[e("p",null,[e("a",_,[n("源仓库书源"),r(i)])])])]),p])}const k=s(c,[["render",w],["__file","03_阅读 3.0 Web 版搭建.html.vue"]]);export{k as default};
