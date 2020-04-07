## git命令

**注：所有的学习基于这篇[文档](https://git-scm.com/book/zh/v2/)，我做的仅是总结，记录**

在记录命令之前，聊一聊关于git的特色，有别于别的版本管理系统

+ 分布式存储
+ 快照流，而非基于差异的版本控制
+ 本地几乎可以执行任何操作，因为每个人都拥有一个完整的版本，仅在有网络的时候与“终端”进行交互
+ git文件只有三种状态：已提交（committed）、已修改（modified） 和 已暂存（staged）
	+ 已提交表示数据已经安全地保存在本地数据库中。
	+ 已修改表示修改了文件，但还没保存到数据库中。
	+ 已暂存表示对一个已修改文件的当前版本做了标记，使之包含在下次提交的快照中。

关于GUI，我个人用的是sourceTree，挺好使的，但是自从看到了XD和佳园哥的牛逼操作，我决定投入到Terminal的怀抱，也就有了这篇笔记，2333

### git配置篇

关于git配置，因为不是特别常用，我将它迁移到这篇[文档](./git_config.md)中了

### git帮助命令

```
git help <git命令名>  // 看内置文档永远是比上网查资料更快的途径
git <git命令名> -h  // 关于git命令名，指的是config, add, push, commit等等
```

### git基础类命令

```
git clone <仓库地址> <自定义本地仓库名(可选)>
```

**注意：关于git clone主要有ssh和https两种方式，详见这篇[文档](./ssh_https.md)**

```
git init  // 初始化仓库，在项目文件下创建.git文件夹

git status  // 查看仓库文件状态
git status -s  // 状态简览

git diff  // 查看已暂存和未暂存的修改

git log // 查看提交历史，基于提交时间的先后顺序
git log -p -<数字> // 以交互模式展示，最近n次的提交历史
git log --stat // 查看提交历史，以简约的方式展示每次提交的信息

```

关于git log常用参数，详见[文档](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#pretty_format)

```
git add <文件路径>  // 添加(追踪)文件

git commit -m "提交说明"  // 提交文件，并添加提交信息说明
git commit -a  // 将所有修改的和删除的文件提交到版本库，但是不会影响未被追踪的文件(即新建的未存在于git上的文件)
git commit --amend  // 覆盖掉你的上一次提交，可以借这个命令实现一些撤销的行为

git push  // 将本地分支的更新，推送到远程主机

git reset HEAD <文件名> // 撤销git add添加的指定文件
git checkout -- <文件名> // 放弃工作目录中的更改，彻底撤销(消除撤销的记录)，这两条命令在文档中，被称之为“危险的”，请小心使用

```

关于git add拓展，详见[文档](./git_add.md)<br>
关于git reset原理，详见[文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E9%87%8D%E7%BD%AE%E6%8F%AD%E5%AF%86#_git_reset)<br>
关于数据恢复，详见[文档](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E7%BB%B4%E6%8A%A4%E4%B8%8E%E6%95%B0%E6%8D%AE%E6%81%A2%E5%A4%8D#_data_recovery)

```
git rm <文件名>  // 移除文件
// 与命令行rm操作的区别，git rm 会记录此次移除文件的操作，而普通的rm则不会

git rm -f <文件名> // 强制移除，删除之前修改过或已经放到暂存区的文件

git rm --cached <文件名> // 仅从git仓库中移除，但是保留在本地，当你忘记配置.gitigonre文件时，可以这么做

git mv <file_from> <file_to> // 移动文件,可以将文件移到别的文件夹下，也可以重命名
```



