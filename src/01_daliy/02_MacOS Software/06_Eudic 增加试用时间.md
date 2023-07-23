---
title: Eudic (欧路词典) 增加试用时间
tag: [Eudic]
---

### 具体步骤

1. 安装任意版本的[欧路词典](http://www.eudic.net/)，打开一次并退出。

2. 打开 `Finder` 前往 `~/Library/Preferences` 找到 `com.eusoft.eudic.plist` 文件

3. 使用 `PlistEdit Pro` 打开，修改 `MAIN_TimesLeft` (试用天数) 中的数值为任意值 (例如 820711)

4. 单击文件, 选择 `显示简介` , 将文件属性改为只读并锁定

### Eudic 会自动检测 ` plist  ` 文件并修改数值的问题

上述步骤再来一遍属实有点麻烦, 所以还有一种命令行的方式

通过 `PlistBuddy` 工具 ( macOS 自带 ) 修改 `plist` 文件

代码如下:

```bash
# 查看
/usr/libexec/PlistBuddy -c 'PRINT MAIN_TimesLeft'  ~/Library/Preferences/com.eusoft.eudic.plist

# 修改
/usr/libexec/PlistBuddy -c 'SET MAIN_TimesLeft 820711'  ~/Library/Preferences/com.eusoft.eudic.plist
```

_上述代码也可以直接写到类.zshrc 文件中, 通过别名的方式直接调用_

### 参考链接

- [What is PlistBuddy? - Mark](https://medium.com/@marksiu/what-is-plistbuddy-76cb4f0c262d)
