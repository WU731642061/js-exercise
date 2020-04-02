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
```

```
git add <文件路径>  // 添加(追踪)文件

git commit -m "提交说明"  // 提交文件

git push  // 将本地分支的更新，推送到远程主机
```

关于git add拓展，详见[文档](./git_add.md)<br>
关于git commit拓展，详见[文档](./git_commit.md)<br>
关于git push拓展，详见[文档](./git_push.md)

```
git rm <文件名>  // 移除文件
// 与命令行rm操作的区别，git rm 会记录此次移除文件的操作，而普通的rm则不会

git rm -f <文件名> // 强制移除，删除之前修改过或已经放到暂存区的文件

git rm --cached <文件名> // 仅从git仓库中移除，但是保留在本地，当你忘记配置.gitigonre文件时，可以这么做

git mv <file_from> <file_to> // 移动文件,可以将文件移到别的文件夹下，也可以重命名
```



