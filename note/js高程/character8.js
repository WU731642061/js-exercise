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
window.open("url", "窗口目标", "特性字符串", "布尔值:新页面是否取代浏览器历史记录中当前加载页面")

// 系统对话框
alert("something") // 弹框
confirm("something") // 确认框，返回值是true或false
prompt("something") // 让用户输入一段文字，作为返回值返回  


// location对象








