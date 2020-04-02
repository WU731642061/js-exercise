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


// 先太监一下，后续补上
