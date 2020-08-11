// BOM(浏览器对象模型)

// 感觉进入这一章，就要开始学习跟浏览器相关的api，大多是各大浏览器厂商实现的
// 给个建议：很多时候，不要去想着这些api的底层，因为你去看底层代码，只能找到几十万行的c++代码，去学习它的设计思路和设计规范

// BOM已经成为了HTML5的规范之中，因此所有的浏览器厂商都会依照这个规范去实现

// 想要了解BOM，就要了解其核心对象，window，它表示浏览器的一个实例
// 它既是通过js访问浏览器窗口的一个接口，又是ECAMscript规定的Global(全局)对象

// 注意：这里还要提到一个概念，是书上没有的。即顶层对象
// 在es5及之前，浏览器中的全局对象就是顶层对象，即window，而node中的顶层对象即global
// 但是在es6开始，引入了let,const和块级作用域的概念
// ES6规定，var命令和function命令声明的全局变量，依旧是顶层对象的属性；let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
// 也就是说，从ES6开始，全局变量将逐步和顶层对象的属性脱钩。

let a = 1
window.a  // undefined

// 全局作用域
// 所有在全局范围内声明的变量，函数，对象都会被挂载到window对象下
var age = 29 // 如果这里改成let申明，结果就会变成undefined，猜猜为什么呢，2333
function say(){
    console.log(this.age)
}
say() // 29
window.say() // 29

// 直接定义window对象属性和全局属性的区别
// 全局属性无法通过delete删除，window对象属性可以
var a = 1
window.b = 2

// 注意，以下写法在IE9以下(不包括)都会抛错
delete a // false
delete window.b // true
// 原因：当我们声明一个全局变量，其configurable属性为false，当然这边你也别想用defineProperty改变了，浏览器禁止对window对象操作

// 补充：top 属性返回最顶层的先辈窗口。因为当我们的html中存在多个frame时，每个frame都有一个window对象，若要找到最顶层的window对象，就要用到top
// 该属性返回对一个顶级窗口的只读引用。如果窗口本身就是一个顶级窗口，top 属性存放对窗口自身的引用。如果窗口是一个框架，那么 top 属性引用包含框架的顶层窗口
window.top  // 返回顶层window对象
window.parent // 返回父级框架window对象，如果没有，就返回其自身
window.self // 返回当前框架内的window对象

// 窗口位置
var leftPops = (typeof window.screenLeft == "number") ? window.screenLeft : window.screenX
var topPops = (typeof window.screenTop == "number") ? window.screenTop : window.screenX
// 由于firefox没有实现screenLeft，因此要通过这种方式去实现兼容性

// 窗口大小，以chrome为例，不同的浏览器规范好像不太一样，书中说的好像也有点过时了？至少我测试结果我书中不一样，以下是我测试结果
innerHeight // 视口高度
innerWidth  // 视口宽度，当我打开控制台，返回的宽度=outerWidth - 控制台宽度
outerHeight // 窗口本身的高度
outerWidth  // 窗口本身的宽度
// 关于视口viewport，建议读一下这篇文章，思考一下移动端的适配问题：https://www.cnblogs.com/2050/p/3877280.html

// 导航和打开窗口
// 当然，后面有更好的处理路由跳转的方法
window.open("url", "窗口目标", "特性字符串", "布尔值:新页面是否取代浏览器历史记录中当前加载页面")

// 系统对话框
alert("something") // 弹框
confirm("something") // 确认框，返回值是true或false
prompt("something") // 让用户输入一段文字，作为返回值返回


// location对象
// 提供了当前文档中加载的文档有关的信息
// window.location和document.location访问是同一个对象
// 相关属性
location.hash // 返回URL中的hash(#号后跟0或多个符号)，如果不存在hash则返回""
location.host // 返回服务器名称和端口号
location.hostname // 返回不带端口号的服务器名称
location.href // 返回当前加载页面的完整url。location.trString()方法也返回这个值
location.pathname // 返回url中的目录或文件名，例如"www.baidu.com/aa" 则返回"/aa"
location.port // 返回url中的端口号，如果url中不包含端口，返回空字符串
location.protocol // 返回页面使用的协议。通常是http:或者https:
location.search // 返回URL的查询字符串以问号开头的结果

// 做点什么
// 我们可以实现一个获取路由中所有参数的方法
function getQueryArgs() {
    var qs = (location.search.length > 0 ? location.search.slice(1) : ""); 
    var args = {}

    items = qs.length ? qs.split("&") : []

    var name = null
    var value = null
    for (var i of items) {
        var item = i.split("=")
        // 这里必须对url的参数进行一个解码
        name = decodeURIComponent(item[0])
        value = decodeURIComponent(item[1])

        if (name.length) {
            args[name] = value
        }
    }
    return args
}

// 位置操作
location.assign(url); // 该方法会立即打开新的url并且在浏览器中生成一条历史记录
location.href = url; window.location = url; // 这两种行为的本质还是修改这个方法

location.replace("https://www.baidu.com") // 重定向路由，并且无法使用浏览器的回退回到上一页，同时不会在浏览器中生成新的历史记录
location.reload(true) // 重载当前页面，不传任何参数时，可能会加载缓存，添加参数true，则必定从服务器请求资源


// navigator对象
// 识别客户端浏览器的事实标准

navigator.appCodeName // 浏览器的名称，通常是Mozilla，即使在非Mozilla也是如此
navigator.appMinorVersion // 次版本信息，但是firefox和chrome未提供该属性
navigator.appName // 完整的浏览器名称
navigator.appVersion // 浏览器版本。一般不与实际的浏览器版本对应
navigator.cookieEnabled // 表示cookie是否启用
navigator.javaEnabled() // 表示当前浏览器中是否启用了java
navigator.language // 表示当前浏览器的主语言
navigator.userAgent // 浏览器的用户代理字符串

navigator.plugins // 检测浏览器中安装了哪些插件(仅针对与非IE浏览器)
// 通常情况下，plugins返回一个数组对象，每个对象会包含如下四个属性：
// name: 插件的名字
// filename: 插件的文件名
// length: 插件所处理的MIME类型数量

// 检查浏览器中是否存在某插件
function hasPlugin(name) {
    if ( typeof name !== "string") {
        throw "请传入string类型数据"
    }
    const pluginName = name.toLowerCase()
    for (var i =0; i < navigator.plugins.length; i++) {
        if (navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
            return true
        }
    }
    return false
}


// screen对象
// 展示浏览器窗口外部的信息
// 这里只展示所有浏览器都支持的属性，只支持ie或只支持1-2个浏览器的属性不做展示

screen.availHeight // 屏幕的像素高减去系统部件高度之后的值
screen.availWidth // 屏幕的像素宽去系统部件宽度之后的值
screen.height // 屏幕的像素高度
screen.width // 屏幕的像素宽度


// history对象
// 对象保存着用户上网的记录
// 出于安全性考虑，浏览器无法获取用户浏览过的url，但是通过history对象，我们可以进行前进后退等操作

history.go(-1) // 后退1页
history.go(2) // 前进2页
history.go("www.baidu.com") // 跳转到最近的baidu页面，如果历史中不存在该页面，则仅刷新当前页面
history.back(); history.forward(); // 后退/前进1页的缩写

history.pushState(data, tltle, url) // 添加历史记录，接受3个参数，分别是状态对象，标题(在部分浏览器会被忽略，例如火狐)，路由地址
// 该方法不会真的跳转到新的路由地址去，仅将当前路由替换成制定路由，并添加一条历史记录
history.replaceState(data, tltle, url) // 修改历史记录，与pushState不同的是替换当前历史记录，而不产生新的历史记录

// 某种意义上，调用pushState()与设置widnow.location = '#ff'类似，二者都会在当前页面创建并激活新的历史记录。但pushState()有以下几条优点：
// 新的URL可以是与当前URL同源的任意URL。而设置window.location仅当你只修改了哈希值时才保持同一个document。
// 如果需要，你可以不必改变URL。而设置window.location = '#foo';在当前哈希不是#foo的情况下，仅仅是新建了一个新的历史记录选项。
// 你可以为新的历史记录项关联任意数据。而基于哈希值的方式，则必须将所有相关数据编码到一个短字符串里。
// 假如标题在之后会被浏览器用到，那么这个数据是可以被使用的（哈希则不能）。
// 注意pushState()绝对不会触发hashchange事件，即是是新的URL与旧的URL仅哈希不同也不会触发。
// 摘自：https://www.cnblogs.com/jehorn/p/8119062.html
