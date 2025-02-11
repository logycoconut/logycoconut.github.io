---
title: 拿到一台新 Mac，该安装哪些 APP？
tag: [APP, MacOS] 
---

# 拿到一台新 Mac，该安装哪些 APP？

*以下软件都可以在官网、Github 仓库直接下载安装
不要轻易相信三方网站，注意甄别哦～*

### 开发工具

| 名称                               | 介绍                  | 备注                                                 |
| :------------------------------- | :------------------ | -------------------------------------------------- |
| Chrome                           | 没啥好介绍的              |                                                    |
| IntelliJ IDEA Ultimate           | Java 开发 IDE         | 可以根据需要选择 Community Edition 版本                      |
| Datagrip                         | All in One 的数据库管理工具 | 涵盖大多数数据源, MySQL、PostgreSQL、Redis、ES, 甚至云服务商提供的 RDS |
| Sequel Pro                       | 免费的 MySQL 客户端       |                                                    |
| Visual Studio Code               | 强大的编辑器              | 写前端时需要                                             |
| Sublime Text                     | 文本工具                | 记录一些文本、代码碎片时很有用，打开很快                               |
| iTerm                            | 终端                  | 需要搭配 OhMyZsh 使用                                    |
| Postman                          | API 调试              | 虽然有点卡, 但目前没有找到替代品                                  |
| Docker                           | 虚拟机                 |                                                    |
| [ProxyMan](https://proxyman.io/) | 抓包                  | 上手很快, 和 Charles 相比像是不同时代的产物                        |

_另外： 「Sequel Pro」的正式版在 Mac 上打开有点问题，可以下载 [测试版本][Sequel Pro 测试版本]。_

#### oh-my-zsh 插件

*指南： https://github.com/dunwu/linux-tutorial/blob/master/docs/linux/ops/zsh.md *

- 下载插件包

```bash
# zsh-syntax-highlighting 插件
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-\~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting

# zsh-autosuggestions 插件
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-\~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
```

- 在 `.zshrc` 文件中配置插件列表

```bash
plugins=( 
    git 
    zsh-autosuggestions
    zsh-syntax-highlighting 
    z 
)
```

- `source ~/.zshrc`

### 效率工具

| 名称         | 介绍           | 备注                   |
| ---------- | ------------ | -------------------- |
| TickTick   | Todo List 神器 | 社区版的功能似乎够用           |
| uTools     | 效率工具         | 记录一些文本、代码碎片时很有用，打开很快 |
| Snipaste   | 截图 / 贴图      |                      |
| Eudic 欧陆词典 | 词典           | 搭配三方词库使用             |
| 微信输入法      | 输入法          | 联想功能比自带的强太多          |

### 系统小工具

| 名称             | 介绍                 | 备注                        |
| -------------- | ------------------ | ------------------------- |
| BetterSnapTool | 窗口大小、位置设置工具        | 类似 magnet，但是要便宜，偶尔还限免     |
| Mac Mouse Fix  | Mac 鼠标拓展，重新定义侧键、中键 | 在使用外置键盘的时候, 不习惯用触控板, 所以需要 |

### 其他

| 名称          | 介绍           | 备注                                                       |
| :---------- | :----------- | -------------------------------------------------------- |
| Obsidian    | Markdown 编辑器 | 个人知识库                                                    |
| PicGo       | 图床工具         | 搭配 Obsidian 插件 `Image Auto Upload Plugin` 使用, 可以实现贴图自动上传 |
| PDF Expert  | PDF 阅读       |                                                          |
| NetNewsWire | RSS 阅读       |                                                          |
| IINA        | 视频播放         |                                                          |

### 参考链接

- [ Mac 使用软件分享，抛砖引玉][]

- [这十多个插件，大幅度改善你的 Obsidian 编辑体验][]

- [Mac 教程 - 一站式解决大部分 Mac 问题](https://44maker.github.io/wiki/Mac/index.html)

​​<!-- 下面是引用式链接-->

[Sequel Pro 测试版本]: https://sequelpro.com/test-builds

[MonitorControl]: https://github.com/MonitorControl/MonitorControl

[ Mac 使用软件分享，抛砖引玉]: https://www.v2ex.com/t/894110

[这十多个插件，大幅度改善你的 Obsidian 编辑体验]: https://sspai.com/post/68394
