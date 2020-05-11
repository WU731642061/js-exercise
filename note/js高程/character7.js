// 函数表达式

// 复习一下，ES6之前声明函数一共有两种方式，分别是：函数声明和函数表达式

// 函数声明
function func(arg){
    // 函数体
}
// 函数声明的一个特点就是存在函数声明提升，你可以先调用，再声明

// 函数表达式
var func = function(){
    // 函数体
}
// 如果先调用函数，再调用func，则会报错
// 因为这边会有一个变量提升，即会先声明一个变量func，但是值为undefined，所以调用 会报错
// 这种情况下创建的函数，我们也称之为“匿名函数”--很重要

// 递归
// 通过函数名调用自身
// 最经典的递归莫过于斐波那契数列函数
function fib(num) {
    if (num <= 1) {
        return 1
    }
    // return num * fib(num-1)
    // 上面这行代码当我们执行以下代码时，会报错：var anotherFib = fib; fib=null; anotherFib()
    // 当执行递归时，fib已经不再是函数，所以提供了下面这种写法
    return num * arguments.callee(num-1)
}
// 由于严格模式下arguments属性变得不可用，我们可以通过结合函数命名和函数表达式来达到效果
var func = (function f(num){
    if (num <= 1){
        return 1
    }
    return num * f(num-1)
})


// 闭包
// 一个经典的js问题，面试题中出现无数次，网上文章无数篇，还是看看权威书籍是怎么解释的
// 解释：闭包是指有权访问另一个函数作用域中变量的函数
// 常见创建闭包的方式，就是通过在函数内部创建另一个函数，从而实现访问另一个函数内部的变量的目的
// 补充关于作用域链：作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象

// 关于闭包的内存无法释放问题，我尽量用自己的话描述一遍，不过这里还是建议去读原文。
// 需要理解原理必须先理解两个概念，作用域链和变量对象，其关系我在上面的补充中已经说明了
// 先来看一个例子：
function outer(){
    var name = 'God'
    return function() {
        console(name) // 闭包的作用就是内部的匿名函数可以获取到外部的name属性，原因是作用域链的存在
    }
}

var inner = outer()
var result = inner()
// 当outer函数执行完毕后，其作用域链已经被销毁了，但是变量对象没有被销毁，因为返回的匿名函数中的作用域链依然保存着对outher函数的变量对象的引用
// 因此，name变量依旧被保存在内存中无法释放
inner = null // 只有当执行这步操作时，匿名函数的作用域链才会被销毁，变量对象发现自己没有被任何作用域链销毁，则被释放了

// 作用域链的副作用：闭包只能取得包含函数中，任何变量的最后一个值。
// 这就引出了另一道经典的面试题
function pushArray(){
    var result = []
    for(var i = 0; i <5; i++){
        result[i] = function(){
            return i
        }
    }
    return result
}    

var r = pushArray()

// 最后你会发现，r中保存的是5个function，当你依次执行5个函数时，得到的结果都是5，因为它只能获取当前i的值 
// 解决方案，1，立刻执行函数；2，使用es6的let
// 方案一：
function pushArray(){
    var result = []
    for(var i = 0; i <5; i++){
        result[i] = (function(num){
            return num
        })(i)
    }
    return result
} 
// 方案二：
function pushArray(){
    var result = []
    for(let i = 0; i < 5; i++){
        result[i] = function(){
            return i
        }
    }
    return result
} 

// 关于匿名函数的this指向，通常情况下指向window，具体原理建议看书原文
// 关于内存泄漏，会结合第13章补充，#TODO


// 块级作用域
// 在es6之前，js是没有块级作用域的概念的，只有全局作用域和函数作用域，在es6开始，引入了块级作用域，通过let，const等，这里不多做概述










