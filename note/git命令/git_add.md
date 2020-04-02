## 关于git add命令

将文件内容添加到索引(index)

index，原文是这么说明的：<br>
>The "index" holds a snapshot of the content of the working tree, and it is this snapshot that is taken as the contents of the next commit.<br>

>大意：“索引”保存着工作树内容的快照，并且该快照被用作下一次提交的内容

### 关于命令参数

命令参数可以帮助我们去对这条命令进行个性化的操作，我这里用表格的形式来记录一下

基本命令 

```
git add <文件路径> <参数> // 文件路径可以是单个文件，可以是某个文件夹，也可以是某种正则匹配规则
```

参数 | 别名 | 作用
----|------|----
-n  | --dry-run | 实际上并不添加文件，仅显示哪些文件将会被添加
-v | --verbose  | 逐条显示哪些文件被添加了
-f | --force | 可以添加被.ingnore忽视的文件
-i | --interactive  | 以交互方式将工作树中的修改内容添加到索引。可以提供可选的路径参数，以将操作限制为工作树的子集。有关详细信息，请参见“交互模式”。
-p | --patch  | 与-i类似，表示进入交互模式，指定哪些修改需要添加到暂存区。即使是同一个文件，也可以只提交部分变动。
-e | --edit  | 通过编辑器打开展示差异，然后让用户对其进行编辑
-u | --update  | 参数表示只添加暂存区已有的文件（包括删除操作），但不添加新增的文件。
-A | --all 或 --no-ignore-removal  | 参数表示追踪所有操作，包括新增、修改和删除。在git 2.0的版本开始和git add .没有任何区别了
--no-all | --ignore-removal  | 参数表示追踪所有操作，包括新增、修改，但是会忽略删除的文件
--refresh |   | 不添加新文件，但是会在索引中刷新stat()信息 （这个方法其实我不是很理解，如果哪位大佬看到这比较透彻的希望给个解读）
-n | --intent-to-add  | 新加了一个文件，这个文件目前没被 git 追踪的，一般在 git add 之前你希望 diff 看看改了什么内容，这个新文件在 diff 里面是不会出现的，如果想在 diff 里面看到的话，就先把这个文件 add -n <文件路径>，然后 git diff
--ignore-errors | | 如果由于索引错误而无法添加某些文件，将不会中止该操作，而是继续添加其他文件，可以将配置变量add.ignoreErrors设置为true，以使其成为默认行为。
--ignore-missing | | 必须和-n命令一起使用。 用来检查是否有文件被忽略掉，即使这部分文件目前还没有被追踪

### 关于一些例子

> 我希望添加某个文件夹下的所有txt文件

```
git add fileName/\*.txt
```

> 我忽视了demo.js这个文件，但是我想在这次提交中添加它

```
git add demo.js -f
```

### 关于交互模式

我没有进行过多的了解，先讲文档原文放在这吧，以后有空深入了解，再补充

[交互模式](https://git-scm.com/docs/git-add)






