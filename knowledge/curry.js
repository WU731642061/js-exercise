/*
 * @Author: yiwen.wu
 * @Date: 2021-04-21 17:04:06
 * @LastEditTime: 2021-11-08 16:59:51
 * @LastEditors: yiwen.wu
 * @Description: 
 * @FilePath: /js-exercise/knowledge/curry.js
 */
// 函数柯里化
// 老样子，先丢参考：https://juejin.im/post/5d2299faf265da1bb67a3b65

// 定义(引用)：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

// 普通的add函数
function add(x, y) {
    return x + y
}

// Currying后
function curryingAdd(x) {
    return function (y) {
        return x + y
    }
}

add(1, 2)           // 3
curryingAdd(1)(2)   // 3

// 以上这种函数的实现最大的问题在于，他并不通用，如果我们想实现curryingAdd(1)(2)(3)，我们需要通过重新编码函数本身实现

// currying解释，我们需要保存上一次传进来的参数实现一个延迟求值的过程
// currying 函数的返回值其实是一个接收剩余参数并且立即返回计算值的函数。
// 即它的返回值并没有自动被 Currying化 。
// 所以我们可以通过递归来将 currying 的返回的函数也自动 Currying 化

// currying使用场景：参数复用、延迟执行
