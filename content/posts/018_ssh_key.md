---
title: "通过密钥登陆服务器"
date: 2020-09-21T13:23:26+08:00
draft: false
categories: ["关于技术"]
tags: ["ssh"]
---

> 在使用Github Action自动化部署博客时，需要用到密钥来登录服务器，在这里记录一下具体步骤和其中踩过的一些坑

## 生成密钥对

在 `root/.ssh`目录中生成公私钥

```
[root@CentOSAli ~]# ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Created directory '/root/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
```

- *新旧生成方式带来的问题*

`ssh-keygen` 新式的生成方式，id_rsa的开头会变成`BEGIN OPENSSH PRIVATE KEY`，而不是 `BEGIN RSA PRIVATE KEY` ，在多数软件还不支持OPENSSH格式的KEY的情况下，我们可以使用 `ssh-keygen -m PEM -t rsa -b 4096 -C "your_email@example.com"` 来继续生成PEM格式的KEY

## 在服务器上安装公钥

很重要的一步，之前一直卡在这里，尝试了很多可能发现是没有安装

```
[root@CentOSAli ~]# cd .ssh
[root@CentOSAli .ssh]# cat id_rsa.pub >> authorized_keys
```

## 保证文件权限

```
[root@CentOSAli .ssh]# chmod 600 authorized_keys
[root@CentOSAli .ssh]# chmod 700 ~/.ssh
```