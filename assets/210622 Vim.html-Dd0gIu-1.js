import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,d as i,o as e}from"./app-B0PTpf3F.js";const l={};function p(d,s){return e(),a("div",null,s[0]||(s[0]=[i(`<h3 id="基本模式" tabindex="-1"><a class="header-anchor" href="#基本模式"><span>基本模式</span></a></h3><ul><li>Normal：用于光标移动、搜索替换、复制粘贴删除</li><li>Visual：用于选中、反选（v: 按字符选中 V：按行选中）</li><li>Command： 用于文档操作，例如读取、保存</li><li>Insert：用于编辑内容</li></ul><h3 id="光标移动" tabindex="-1"><a class="header-anchor" href="#光标移动"><span>光标移动</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>^: 移到行首</span></span>
<span class="line"><span>$: 移到行尾</span></span>
<span class="line"><span></span></span>
<span class="line"><span>w: 移动一个单词，到词首</span></span>
<span class="line"><span>e: 移动一个单词，到词尾</span></span>
<span class="line"><span>b: 反向移动一个单词，到词首</span></span>
<span class="line"><span>gb: 反向移动一个单词，到词尾</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G: 如果不和数字组合，跳到最后一行</span></span>
<span class="line"><span>10G: 跳到第10行</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="增加、删除、剪切、复制、粘贴" tabindex="-1"><a class="header-anchor" href="#增加、删除、剪切、复制、粘贴"><span>增加、删除、剪切、复制、粘贴</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 增加文本</span></span>
<span class="line"><span>insert： i（在光标前插入）I（在行首插入）</span></span>
<span class="line"><span>append：a（在光标后插入） A（在行末插入）</span></span>
<span class="line"><span>open a line：o（在当前行下方插入） O（在当前行上方插入）</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除</span></span>
<span class="line"><span>x: 向后删除一个字符</span></span>
<span class="line"><span>X: 向前删除一个字符</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 剪切</span></span>
<span class="line"><span>d: 剪切选中字符</span></span>
<span class="line"><span>dd: 剪切当前行</span></span>
<span class="line"><span>daw、dw: 剪切单词，一直剪切到空格</span></span>
<span class="line"><span>diw: 剪切单词，不包含空格</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 复制</span></span>
<span class="line"><span>y: 复制选中字符</span></span>
<span class="line"><span>yy: 复制当前行</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 粘贴</span></span>
<span class="line"><span>p: 在光标后插入</span></span>
<span class="line"><span>P: 在光标前插入</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除命令和数字结合</span></span>
<span class="line"><span>d1G: 剪切从光标所在行到第一行的数据</span></span>
<span class="line"><span>dG: 剪切从光标所在行到最后一行的数据</span></span>
<span class="line"><span>d$: 剪切从光标位置到行末的数据</span></span>
<span class="line"><span>d0: 剪切从光标位置到行首的数据</span></span>
<span class="line"><span>dw: 剪切光标位置的单词</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="撤销、重做" tabindex="-1"><a class="header-anchor" href="#撤销、重做"><span>撤销、重做</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>u: 撤销上一操作</span></span>
<span class="line"><span>ctrl + r: 重做上一操作</span></span>
<span class="line"><span>.: 重复上一操作</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找"><span>查找</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>/ : 查找光标以后某单词</span></span>
<span class="line"><span>? : 查找光标以前某单词</span></span>
<span class="line"><span>n : 查找下一个</span></span>
<span class="line"><span>N : 查找上一个</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="替换" tabindex="-1"><a class="header-anchor" href="#替换"><span>替换</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span># 语法</span></span>
<span class="line"><span>:{作用范围}s/{目标}/{替换}/{替换标志}</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 举个栗子</span></span>
<span class="line"><span>:s/w1/w2：代表把光标当前行的第一个w1单词替换为w2；</span></span>
<span class="line"><span>:s/w1/w2/g：（global）代表把光标当前行的所有w1单词替换为w2；</span></span>
<span class="line"><span>:s/w1/w2/i：（ignoreCase）代表把光标当前行的所有w1单词替换为w2，大小写（小写i代表不敏感，大写I代表敏感）；</span></span>
<span class="line"><span>:s/w1/w2/gc：（global, confirm）代表把光标当前行的所有w1单词替换为w2，并需要确认；</span></span>
<span class="line"><span></span></span>
<span class="line"><span>:5,12s/w1/w2/g：代表替换范围为第5到12行</span></span>
<span class="line"><span>:%s/w1/w2/g：代表替换范围为全文</span></span>
<span class="line"><span>:&#39;&lt;,&#39;&gt;s/w1/w2/g：代表替换范围为选中区域（在visual模式下，选中区域后直接按【:s】会自动补全）</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小知识" tabindex="-1"><a class="header-anchor" href="#小知识"><span>小知识</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>命令可以和数字结合达到重复执行的目的</span></span>
<span class="line"><span>4j: 向下移动4行</span></span>
<span class="line"><span>5k: 向上移动5行</span></span>
<span class="line"><span>2dd: 删除2行</span></span>
<span class="line"><span></span></span>
<span class="line"><span>等等...</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h3><p><a href="https://www.yuque.com/manongkevinliang/ldtp9u/sg3fl4" target="_blank" rel="noopener noreferrer">Vim常用命令速查表（入门版）</a></p><p>​​<!-- +++++++++ 下面是引用式链接 +++++++++ --></p>`,17)]))}const t=n(l,[["render",p],["__file","210622 Vim.html.vue"]]),o=JSON.parse(`{"path":"/resource/code/09_tools/210622%20Vim.html","title":"Vim","lang":"zh-CN","frontmatter":{"title":"Vim","date":"2021-06-22T00:00:00.000Z","tag":["Vim"],"description":"基本模式 Normal：用于光标移动、搜索替换、复制粘贴删除 Visual：用于选中、反选（v: 按字符选中 V：按行选中） Command： 用于文档操作，例如读取、保存 Insert：用于编辑内容 光标移动 增加、删除、剪切、复制、粘贴 撤销、重做 查找 替换 小知识 参考资料 Vim常用命令速查表（入门版） ​​","head":[["meta",{"property":"og:url","content":"https://logycoconut.github.io/resource/code/09_tools/210622%20Vim.html"}],["meta",{"property":"og:site_name","content":"logycoconut's k-lab"}],["meta",{"property":"og:title","content":"Vim"}],["meta",{"property":"og:description","content":"基本模式 Normal：用于光标移动、搜索替换、复制粘贴删除 Visual：用于选中、反选（v: 按字符选中 V：按行选中） Command： 用于文档操作，例如读取、保存 Insert：用于编辑内容 光标移动 增加、删除、剪切、复制、粘贴 撤销、重做 查找 替换 小知识 参考资料 Vim常用命令速查表（入门版） ​​"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-02-11T14:19:39.000Z"}],["meta",{"property":"article:tag","content":"Vim"}],["meta",{"property":"article:published_time","content":"2021-06-22T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-02-11T14:19:39.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vim\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-22T00:00:00.000Z\\",\\"dateModified\\":\\"2025-02-11T14:19:39.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"logycoconut\\",\\"url\\":\\"https://logycoconut.github.io/\\"}]}"]]},"headers":[{"level":3,"title":"基本模式","slug":"基本模式","link":"#基本模式","children":[]},{"level":3,"title":"光标移动","slug":"光标移动","link":"#光标移动","children":[]},{"level":3,"title":"增加、删除、剪切、复制、粘贴","slug":"增加、删除、剪切、复制、粘贴","link":"#增加、删除、剪切、复制、粘贴","children":[]},{"level":3,"title":"撤销、重做","slug":"撤销、重做","link":"#撤销、重做","children":[]},{"level":3,"title":"查找","slug":"查找","link":"#查找","children":[]},{"level":3,"title":"替换","slug":"替换","link":"#替换","children":[]},{"level":3,"title":"小知识","slug":"小知识","link":"#小知识","children":[]},{"level":3,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]}],"git":{"createdTime":1676545048000,"updatedTime":1739283579000,"contributors":[{"name":"logycoconut","username":"logycoconut","email":"logycoconut@foxmail.com","commits":5,"url":"https://github.com/logycoconut"}]},"readingTime":{"minutes":2.32,"words":696},"filePathRelative":"resource/code/09_tools/210622 Vim.md","localizedDate":"2021年6月22日","autoDesc":true}`);export{t as comp,o as data};
