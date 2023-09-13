import{_ as e}from"./plugin-vue_export-helper-c27b6911.js";import{o as s,c as i,f as a}from"./app-13240a34.js";const n={},d=a(`<blockquote><p>在使用 Github Action 自动化部署博客时，需要用到密钥来登录服务器，在这里记录一下具体步骤和其中踩过的一些坑</p></blockquote><h2 id="生成密钥对" tabindex="-1"><a class="header-anchor" href="#生成密钥对" aria-hidden="true">#</a> 生成密钥对</h2><p>在 <code>root/.ssh</code>目录中生成公私钥</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@CentOSAli ~]# ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Created directory &#39;/root/.ssh&#39;.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><strong>新旧生成方式带来的问题</strong></li></ul><p><code>ssh-keygen</code> 新的生成方式，id_rsa的开头会变成<code>BEGIN OPENSSH PRIVATE KEY</code>，而不是 <code>BEGIN RSA PRIVATE KEY</code></p><p>在多数软件还不支持 OPENSSH 格式的 KEY 的情况下，我们可以使用 <code>ssh-keygen -m PEM -t rsa -b 4096 -C &quot;your_email@example.com&quot;</code> 来继续生成 PEM 格式的 KEY</p><h2 id="在服务器上安装公钥" tabindex="-1"><a class="header-anchor" href="#在服务器上安装公钥" aria-hidden="true">#</a> 在服务器上安装公钥</h2><p>很重要的一步，之前一直卡在这里，尝试了很多可能发现是没有安装</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@CentOSAli ~]# cd .ssh
[root@CentOSAli .ssh]# cat id_rsa.pub &gt;&gt; authorized_keys
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="保证文件权限" tabindex="-1"><a class="header-anchor" href="#保证文件权限" aria-hidden="true">#</a> 保证文件权限</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>[root@CentOSAli .ssh]# chmod 600 authorized_keys
[root@CentOSAli .ssh]# chmod 700 ~/.ssh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,12),r=[d];function t(o,c){return s(),i("div",null,r)}const u=e(n,[["render",t],["__file","200921_通过密钥登陆服务器.html.vue"]]);export{u as default};
