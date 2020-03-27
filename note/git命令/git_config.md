## git配置

### 配置文件位置

--local // 默认选项,当前使用仓库的 Git 目录中的 config 文件(.git/config)

--global // 当前用户的配置(~/.gitconfig 或 ~/.config/git/config 文件)，如果一台计算机有多个用户，仅对当前登陆的用户的配置生效

--system // 当前系统的配置(/etc/gitconfig)，需要管理员权限

用法：git config --system -l <br>
结果：列出该计算机系统的所有参数配置

***后面的配置如果不带文件位置参数，都是默认使用local文件位置***

### 用户信息

```
git config --global user.name "用户名" // 配置git的用户名

git config --global user.email 你的邮箱名@万恶的运营商.com  // 配置git的邮箱
```

*注意点:*

1. 一旦配置了该信息，之后该系统的所有项目都会自动调用这些信息，如果需要针对不同项目做定制化配置，需要在项目内使用it config user.name等命令
2. 如果你希望你的github能正确的显示你的提交记录，请保证邮箱的统一性，我之前因为本地配置了163邮箱，github上配置了qq邮箱，导致很长一段时间都看不到自己的提交记录，2333

### 配置文本编辑器

```
git config --global core.editor 文本编辑器
```

作用就是当你需要输入某些git信息的时候，会默认打开你的文本编辑器，关于git支持哪些文本编辑器，请参考这篇[文档](https://git-scm.com/book/zh/v2/%E9%99%84%E5%BD%95-C%3A-Git-%E5%91%BD%E4%BB%A4-%E8%AE%BE%E7%BD%AE%E4%B8%8E%E9%85%8D%E7%BD%AE#_core_editor)

### 查看配置信息

```
git config -l
git config --list  
``` 

以上是一些常用的配置命令，基本一台电脑也就最多配置个1-2次，更多细节性的配置，用`git help config`命令它不香吗？


