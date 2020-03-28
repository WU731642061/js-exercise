## 关于git clone

git clone命令的主要作用是克隆一份已经存在的git仓库的完整备份，主要支持两种clone方式，`https | ssh`，这篇文章主要是记录一下两者的区别，和如何配置ssh key到远程仓库(服务器)

> 注：系统主要是基于mac os和linux，如果希望了解关于windows的配置方法，请另行查找资料

### 关于 HTTPS 和 SSH 的区别

**HTTPS**
	
+ 任何人都能直接clone项目，但是需要在每次进行交互类操作(push，fetch等)的时候验证用户信息(用户名、密码)
+ 但是实际上，HTTPS认证方式虽然需要输入账户密码，但现在也不需要每次都输入。每个操作系统平台都有自己的凭据管理器，他会记住你的用户名和密码，这样下次再次操作的时候，系统已经帮你默默地填写好了

**SSH**

+ 你必须是项目的拥有者或者管理员才能clone项目，因此你必须在clone之前添加SSH Key
+ 需要创建并生成SSH Key，并放到远程仓库上
+ 一次配置，后续不需要再次验证身份

### 关于如何生成SSH Key

```
// 判断是否已经生成过ssh key
cd ~/.ssh
ls

// 如果存在id_rsa和id_rsa.pub文件,则读取该文件
cat id_rsa.pub

// 如果不存在，或者无法cd到.ssh文件夹，则创建它
ssh-keygen -t rsa -C "你的邮箱"
// -t 代表你创建的密钥的类型
// -C 代表识别这个密钥的注释，理论上你可以填写任何东西，但是现在的一个共识是填写邮箱

// 然后它会要求你输入两次密钥口令(passphrase)。 如果你不想在使用密钥时输入口令，将其留空即可。
// 建议留空，不然你在每次操作时还是需要输入密码
```

完成上述步骤后复制你的id_rsa.pub内的公钥，到github或你的服务器上

**如何复制到服务器上**

```
ssh-copy-id root@host

// 或者，假设你已经在.ssh文件夹下

scp id_rsa.pub root@host:/root/.ssh/authorized_keys
```

一些知识点的补充，方便以后自己看到这能顺便温习一下<br>

+ 关于[ssh](https://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html)
+ 关于[scp命令](https://www.runoob.com/linux/linux-comm-scp.html)
