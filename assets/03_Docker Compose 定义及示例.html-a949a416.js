import{_ as o}from"./plugin-vue_export-helper-c27b6911.js";import{r as d,o as l,c as t,a as e,b as n,d as a,f as s}from"./app-dfc4fa93.js";const u={},r=s(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>💡 通过一个 YAML 文件定义（编排）应用所需要的所有服务，一键启动所有服务
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h2>`,2),c={href:"https://yeasy.gitbook.io/docker_practice/compose/usage",target:"_blank",rel:"noopener noreferrer"},v=s(`<ol><li>用 Python 来建立一个能够记录页面访问次数的 web 应用</li></ol><div class="language-python line-numbers-mode" data-ext="py"><pre class="language-python"><code><span class="token keyword">from</span> flask <span class="token keyword">import</span> Flask
<span class="token keyword">from</span> redis <span class="token keyword">import</span> Redis

app <span class="token operator">=</span> Flask<span class="token punctuation">(</span>__name__<span class="token punctuation">)</span>
redis <span class="token operator">=</span> Redis<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&#39;redis&#39;</span><span class="token punctuation">,</span> port<span class="token operator">=</span><span class="token number">6379</span><span class="token punctuation">)</span>  <span class="token comment"># 通过host:redis访问到Redis服务, 具体原因下文解释</span>

<span class="token decorator annotation punctuation">@app<span class="token punctuation">.</span>route</span><span class="token punctuation">(</span><span class="token string">&#39;/&#39;</span><span class="token punctuation">)</span>
<span class="token keyword">def</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    count <span class="token operator">=</span> redis<span class="token punctuation">.</span>incr<span class="token punctuation">(</span><span class="token string">&#39;hits&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">return</span> <span class="token string">&#39;Hello World! 该页面已被访问 {} 次。\\\\n&#39;</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span>count<span class="token punctuation">)</span>

<span class="token keyword">if</span> __name__ <span class="token operator">==</span> <span class="token string">&quot;__main__&quot;</span><span class="token punctuation">:</span>
    app<span class="token punctuation">.</span>run<span class="token punctuation">(</span>host<span class="token operator">=</span><span class="token string">&quot;0.0.0.0&quot;</span><span class="token punctuation">,</span> debug<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>编写 Dockerfile 文件</li></ol><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code><span class="token instruction"><span class="token keyword">FROM</span> python:3.6-alpine</span>
<span class="token instruction"><span class="token keyword">ADD</span> . /code</span>
<span class="token instruction"><span class="token keyword">WORKDIR</span> /code</span>
<span class="token instruction"><span class="token keyword">RUN</span> pip install redis flask</span>
<span class="token instruction"><span class="token keyword">CMD</span> [<span class="token string">&quot;python&quot;</span>, <span class="token string">&quot;app.py&quot;</span>]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>编写 docker-compose.yml 文件</li></ol><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>version: &#39;3&#39;
services:

  web:
    build: .
    ports:
     - &quot;5000:5000&quot;

  redis:
    image: &quot;redis:alpine&quot;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol><li>命令行输入 <code>docker-compose up</code> 运行</li></ol><h2 id="进阶示例" tabindex="-1"><a class="header-anchor" href="#进阶示例" aria-hidden="true">#</a> 进阶示例</h2>`,8),p={href:"https://juejin.cn/post/6844903891977371662",target:"_blank",rel:"noopener noreferrer"},m=s(`<div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>version: &#39;3&#39; # 定义版本，不指定默认为版本 1，新版本功能更多

services: # 容器，就像 docker run
   db: # 名称，它也是 network 中 DNS 名称
     image: mysql:5.7 # 镜像，如果像自定义镜像可以不指定这个参数，而用 build
     volumes: # 定义数据卷，类似 -v
       - db_data:/var/lib/mysql
       - .:/aaa # 挂载当前目录到容器中的 /aaa 无需使用绝对路径
     restart: always # 类似 --restart
     environment: # 定义环境变量，类似 -e
       MYSQL_ROOT_PASSWORD: somewordpress
       MYSQL_DATABASE: wordpress
       MYSQL_USER: wordpress
       MYSQL_PASSWORD: wordpress
   wordpress: # 第二个容器
     labels: # 为容器添加 Docker 元数据（metadata）信息。例如可以为容器添加辅助说明信息。
       com.example.description: &quot;This label will appear on all containers for the web service&quot;
     depends_on: # 帮助 compose 理解容器之间的关系
     <span class="token comment"># db 将会在 wordpress 之前被启动</span>
     <span class="token comment"># 关闭时 wordpress 将会在 db 之前关闭</span>
     <span class="token comment"># 我们指定只启动 wordpress，db 也会跟着启动</span>
       - db
     image: wordpress:latest
     ports: # 端口，类似 -p
       - &quot;8000:80&quot;
     restart: always
     environment:
       WORDPRESS_DB_HOST: db:3306
       WORDPRESS_DB_USER: wordpress
       WORDPRESS_DB_PASSWORD: wordpress

volumes: # 可选，需要创建的数据卷，类似 docker volume create
  db_data:

networks: # 可选，需要创建的网络，类似 docker network create
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-compose自动构建虚拟网络" tabindex="-1"><a class="header-anchor" href="#docker-compose自动构建虚拟网络" aria-hidden="true">#</a> docker-compose自动构建虚拟网络</h2><ol><li>查看docker-compose为我们创建的网络</li></ol><p><strong>docker-compose_default</strong></p><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker-compose docker network ls
···
NETWORK ID     NAME                     DRIVER    SCOPE
3251676092c7   bridge                   bridge    local
9a85b86e70cb   docker-compose_default   bridge    local
6dac529699da   host                     host      local
1c4082e10a1c   none                     null      local
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>自动将两个容器加入到网络中</li></ol><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>docker-compose docker network inspect docker-compose_default
···
[
    {
        &quot;Name&quot;: &quot;docker-compose_default&quot;,
        &quot;Id&quot;: &quot;9a85b86e70cb004f15928910bd63c951a8ac5f1d473833d5ede23594d45621a1&quot;,
        &quot;Created&quot;: &quot;2021-08-02T14:47:29.126203857Z&quot;,
        &quot;Scope&quot;: &quot;local&quot;,
        &quot;Driver&quot;: &quot;bridge&quot;,
        &quot;EnableIPv6&quot;: false,
        &quot;IPAM&quot;: {
            &quot;Driver&quot;: &quot;default&quot;,
            &quot;Options&quot;: null,
            &quot;Config&quot;: [
                {
                    &quot;Subnet&quot;: &quot;172.18.0.0/16&quot;,
                    &quot;Gateway&quot;: &quot;172.18.0.1&quot;
                }
            ]
        },
        &quot;Internal&quot;: false,
        &quot;Attachable&quot;: true,
        &quot;Ingress&quot;: false,
        &quot;ConfigFrom&quot;: {
            &quot;Network&quot;: &quot;&quot;
        },
        &quot;ConfigOnly&quot;: false,
        &quot;Containers&quot;: {
            &quot;f4c400171510046fad301a90051695159a43b6211550cfa40243c4574da46195&quot;: {
                &quot;Name&quot;: &quot;docker-compose_web_1&quot;,
                &quot;EndpointID&quot;: &quot;da8745e36f5288d2f65f11b6f5bd556628958a54ade7442a3d97626ddeb9f105&quot;,
                &quot;MacAddress&quot;: &quot;02:42:ac:12:00:03&quot;,
                &quot;IPv4Address&quot;: &quot;172.18.0.3/16&quot;,
                &quot;IPv6Address&quot;: &quot;&quot;
            },
            &quot;fe51d456ec193dfaafba10565d3a9c78901c179d57dcf56ff052d15f1099dfaa&quot;: {
                &quot;Name&quot;: &quot;docker-compose_redis_1&quot;,
                &quot;EndpointID&quot;: &quot;b4aa1d780eaaa40c8ded9673f2588e3181acec3fedaa0acae42f228d547bfa73&quot;,
                &quot;MacAddress&quot;: &quot;02:42:ac:12:00:02&quot;,
                &quot;IPv4Address&quot;: &quot;172.18.0.2/16&quot;,
                &quot;IPv6Address&quot;: &quot;&quot;
            }
        },
        &quot;Options&quot;: {},
        &quot;Labels&quot;: {
            &quot;com.docker.compose.network&quot;: &quot;default&quot;,
            &quot;com.docker.compose.project&quot;: &quot;docker-compose&quot;,
            &quot;com.docker.compose.version&quot;: &quot;1.29.1&quot;
        }
    }
]
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li><p>可以看到redis服务的网络id就是虚拟网络的id，并且别名为redis，这就是为什么上文中直接把redis当成host参数</p><p>关注 <code>Networks - docker-compose_default - Aliases</code></p></li></ol><div class="language-docker line-numbers-mode" data-ext="docker"><pre class="language-docker"><code>&quot;NetworkSettings&quot;: {
            &quot;Bridge&quot;: &quot;&quot;,
            &quot;SandboxID&quot;: &quot;de03aaddff43be0dd3baeca06eaff7120cfdc6541b05ad09fefb1336db9c5733&quot;,
            &quot;HairpinMode&quot;: false,
            &quot;LinkLocalIPv6Address&quot;: &quot;&quot;,
            &quot;LinkLocalIPv6PrefixLen&quot;: 0,
            &quot;Ports&quot;: {
                &quot;6379/tcp&quot;: null
            },
            &quot;SandboxKey&quot;: &quot;/var/run/docker/netns/de03aaddff43&quot;,
            &quot;SecondaryIPAddresses&quot;: null,
            &quot;SecondaryIPv6Addresses&quot;: null,
            &quot;EndpointID&quot;: &quot;&quot;,
            &quot;Gateway&quot;: &quot;&quot;,
            &quot;GlobalIPv6Address&quot;: &quot;&quot;,
            &quot;GlobalIPv6PrefixLen&quot;: 0,
            &quot;IPAddress&quot;: &quot;&quot;,
            &quot;IPPrefixLen&quot;: 0,
            &quot;IPv6Gateway&quot;: &quot;&quot;,
            &quot;MacAddress&quot;: &quot;&quot;,
            &quot;Networks&quot;: {
                &quot;docker-compose_default&quot;: {
                    &quot;IPAMConfig&quot;: null,
                    &quot;Links&quot;: null,
                    &quot;Aliases&quot;: [
                        &quot;fe51d456ec19&quot;,
                        &quot;redis&quot;
                    ],
                    &quot;NetworkID&quot;: &quot;9a85b86e70cb004f15928910bd63c951a8ac5f1d473833d5ede23594d45621a1&quot;,
                    &quot;EndpointID&quot;: &quot;b4aa1d780eaaa40c8ded9673f2588e3181acec3fedaa0acae42f228d547bfa73&quot;,
                    &quot;Gateway&quot;: &quot;172.18.0.1&quot;,
                    &quot;IPAddress&quot;: &quot;172.18.0.2&quot;,
                    &quot;IPPrefixLen&quot;: 16,
                    &quot;IPv6Gateway&quot;: &quot;&quot;,
                    &quot;GlobalIPv6Address&quot;: &quot;&quot;,
                    &quot;GlobalIPv6PrefixLen&quot;: 0,
                    &quot;MacAddress&quot;: &quot;02:42:ac:12:00:02&quot;,
                    &quot;DriverOpts&quot;: null
                }
            }
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>​​<!-- +++++++++ 下面是引用式链接 +++++++++ --></p>`,10);function b(q,k){const i=d("ExternalLinkIcon");return l(),t("div",null,[r,e("p",null,[n("从《Docker — 从入门到实践》的 "),e("a",c,[n("一个小例子"),a(i)]),n(" 开始")]),v,e("p",null,[n("来自 "),e("a",p,[n("wopen的Docker Compose 零基础入门"),a(i)]),n(" 的详细解释")]),m])}const g=o(u,[["render",b],["__file","03_Docker Compose 定义及示例.html.vue"]]);export{g as default};
