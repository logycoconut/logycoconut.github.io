import{_ as d}from"./plugin-vue_export-helper-c27b6911.js";import{r as a,o as s,c as l,a as e,b as i,d as r,f as v,e as c}from"./app-bd1b8191.js";const u={},t=v(`<h3 id="基本模式" tabindex="-1"><a class="header-anchor" href="#基本模式" aria-hidden="true">#</a> 基本模式</h3><ul><li>Normal：用于光标移动、搜索替换、复制粘贴删除</li><li>Visual：用于选中、反选（v: 按字符选中 V：按行选中）</li><li>Command： 用于文档操作，例如读取、保存</li><li>Insert：用于编辑内容</li></ul><h3 id="光标移动" tabindex="-1"><a class="header-anchor" href="#光标移动" aria-hidden="true">#</a> 光标移动</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>^: 移到行首
$: 移到行尾

w: 移动一个单词，到词首
e: 移动一个单词，到词尾
b: 反向移动一个单词，到词首
gb: 反向移动一个单词，到词尾

G: 如果不和数字组合，跳到最后一行
10G: 跳到第10行
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="增加、删除、剪切、复制、粘贴" tabindex="-1"><a class="header-anchor" href="#增加、删除、剪切、复制、粘贴" aria-hidden="true">#</a> 增加、删除、剪切、复制、粘贴</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 增加文本
insert： i（在光标前插入）I（在行首插入）
append：a（在光标后插入） A（在行末插入）
open a line：o（在当前行下方插入） O（在当前行上方插入）

# 删除
x: 向后删除一个字符
X: 向前删除一个字符

# 剪切
d: 剪切选中字符
dd: 剪切当前行
daw、dw: 剪切单词，一直剪切到空格
diw: 剪切单词，不包含空格

# 复制
y: 复制选中字符
yy: 复制当前行

# 粘贴
p: 在光标后插入
P: 在光标前插入

# 删除命令和数字结合
d1G: 剪切从光标所在行到第一行的数据
dG: 剪切从光标所在行到最后一行的数据
d$: 剪切从光标位置到行末的数据
d0: 剪切从光标位置到行首的数据
dw: 剪切光标位置的单词
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="撤销、重做" tabindex="-1"><a class="header-anchor" href="#撤销、重做" aria-hidden="true">#</a> 撤销、重做</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>u: 撤销上一操作
ctrl + r: 重做上一操作
.: 重复上一操作
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="查找" tabindex="-1"><a class="header-anchor" href="#查找" aria-hidden="true">#</a> 查找</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>/ : 查找光标以后某单词
? : 查找光标以前某单词
n : 查找下一个
N : 查找上一个
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="替换" tabindex="-1"><a class="header-anchor" href="#替换" aria-hidden="true">#</a> 替换</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code># 语法
:{作用范围}s/{目标}/{替换}/{替换标志}

# 举个栗子
:s/w1/w2：代表把光标当前行的第一个w1单词替换为w2；
:s/w1/w2/g：（global）代表把光标当前行的所有w1单词替换为w2；
:s/w1/w2/i：（ignoreCase）代表把光标当前行的所有w1单词替换为w2，大小写（小写i代表不敏感，大写I代表敏感）；
:s/w1/w2/gc：（global, confirm）代表把光标当前行的所有w1单词替换为w2，并需要确认；

:5,12s/w1/w2/g：代表替换范围为第5到12行
:%s/w1/w2/g：代表替换范围为全文
:&#39;&lt;,&#39;&gt;s/w1/w2/g：代表替换范围为选中区域（在visual模式下，选中区域后直接按【:s】会自动补全）
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="小知识" tabindex="-1"><a class="header-anchor" href="#小知识" aria-hidden="true">#</a> 小知识</h3><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>命令可以和数字结合达到重复执行的目的
4j: 向下移动4行
5k: 向上移动5行
2dd: 删除2行

等等...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>`,15),m={href:"https://www.yuque.com/manongkevinliang/ldtp9u/sg3fl4",target:"_blank",rel:"noopener noreferrer"},b=e("p",null,[i("​​"),c(" +++++++++ 下面是引用式链接 +++++++++ ")],-1);function o(h,x){const n=a("ExternalLinkIcon");return s(),l("div",null,[t,e("p",null,[e("a",m,[i("Vim常用命令速查表（入门版）"),r(n)])]),b])}const p=d(u,[["render",o],["__file","210622 Vim.html.vue"]]);export{p as default};
