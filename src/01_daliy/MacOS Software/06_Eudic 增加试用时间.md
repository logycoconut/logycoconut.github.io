---
title: Eudic (欧路词典) 增加试用时间
date: 2023-07-03
tag: [Eudic]
---

1. 安装任意版本的[欧路词典](http://www.eudic.net/)，打开一次并退出。

2. 打开 `Finder` 前往 `~/Library/Preferences` 找到 `com.eusoft.eudic.plist` 文件

3. 使用 `PlistEdit Pro` 打开，修改 `MAIN_TimesLeft` (试用天数) 中的数值为任意值 (例如 820711)

4. 单击文件, 选择 `显示简介` , 将文件属性改为只读并锁定
