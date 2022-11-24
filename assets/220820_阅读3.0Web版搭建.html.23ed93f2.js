import{_ as s}from"./_plugin-vue_export-helper.cdc0426e.js";import{o as a,c as d,a as e,d as n,b as r,e as l,r as c}from"./app.cf73cc21.js";const v={},t=l(`<h3 id="使用说明" tabindex="-1"><a class="header-anchor" href="#使用说明" aria-hidden="true">#</a> 使用说明</h3><blockquote><p>文档比我说的明白....</p><ol><li>在自己的服务器上部署（推荐docker）</li><li>在iOS上使用Safari访问并添加到桌面</li></ol></blockquote><h3 id="配置文件" tabindex="-1"><a class="header-anchor" href="#配置文件" aria-hidden="true">#</a> 配置文件</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>version: &#39;3.1&#39;
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考链接" tabindex="-1"><a class="header-anchor" href="#参考链接" aria-hidden="true">#</a> 参考链接</h3>`,5),o={href:"https://github.com/hectorqin/reader",target:"_blank",rel:"noopener noreferrer"},u={href:"https://github.com/XIU2/Yuedu",target:"_blank",rel:"noopener noreferrer"},m={href:"http://yck.mumuceo.com/",target:"_blank",rel:"noopener noreferrer"};function b(h,_){const i=c("ExternalLinkIcon");return a(),d("div",null,[t,e("p",null,[n("● "),e("a",o,[n("阅读3服务器版"),r(i)])]),e("p",null,[n("● "),e("a",u,[n("GitHub - XIU2/Yuedu: 📚「阅读」APP 精品书源（网络小说）"),r(i)])]),e("p",null,[n("● "),e("a",m,[n("源仓库书源"),r(i)])])])}const E=s(v,[["render",b],["__file","220820_阅读3.0Web版搭建.html.vue"]]);export{E as default};
