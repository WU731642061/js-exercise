## 函数式编程学习

个人理解：函数式编程是一个编程思想，通过 `函数` 将表达包裹起来，同时减少不必要的封装

```
吐槽两句：曾经也看过好几次函数curry的文章，但是每次都是看完就忘。
现在回顾，根本原因还是不了解纯函数的意义，包括幂等性等一系列概念。
因此，还是有必要经过系统的学习，才能彻底理解函数式编程的思想。
以上是本人的一些理解，如有不足，欢迎指正
```

纯函数：即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用。

```js
// 典型的几个例子
var numberA = 1
function add (x) {
  return x + numberA
}
add(1) // 2
numberA = 2
add(1) // 3
// 上面这个函数，只要修改了numberA的值，函数的结果就会发生改变，因此不能称之为纯函数

function add2 (x) {
  var numberB = 1
  return x + numberB
}
add2(1) // 2
// 上面这个函数，numberB被声明在函数内部，只要输入相同的值，总是能得到相同的结果，可以被称之为纯函数
```

纯函数带来的好处：不依赖于系统状态(system state)，减少认知负荷(cognitive load)

什么是函数的副作用：副作用是在计算结果的过程中，系统状态的一种变化，或者与外部世界进行的可观察的交互。

文章补了一句：只要是跟函数外部环境发生的交互就都是副作用

从定义上来说，纯函数必须要能够根据相同的输入返回相同的输出；如果函数需要跟外部事物打交道，那么就无法保证这一点了

纯函数的特点：
  1. 可缓存性
  2. 可移植性／自文档化（Portable / Self-Documenting）
  3. 可测试性（Testable）
  4. 合理性（Reasonable）：这块还有点懵逼，结合后面的代码再看几次
  5. 并行代码

### 函数柯里化

curyy的意义：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数

你可以一次性地调用 curry 函数，也可以每次只传一个参数分多次调用。

```js
// 最经典的代码
// 实现一个add函数
function add(x) {
  return function(y) {
    return x + y
  }
}

var r = add(1)(2) // 3
```

通用函数柯里化的方法

```js
// 设计思路(个人分析)
// 将普通函数，转化成柯里化函数，是一个收集参数的过程，需要利用到的特性有：函数的闭包，浅拷贝，函数的arguments等等
// 第一步：我们需要创建一个纯函数，这个函数接受一个参数，接受的这个参数，就是我们最后需要转化的这个函数，并且允许他通过如下方式调用
curry(function(x, y) {
  return x + y
})

function curry (fn, receiveArgs) {
  // 收集递归的参数，如果没有，就生成一个新数组
  const args = receiveArgs || []
  // 获取函数的参数的长度
  const fnLength = fn.length
  // 返回一个新函数，这个函数接受剩余的参数
  return function (...rest) {
    // 解构收集所有的数组
    const _args = [...args, ...rest]
    // 判断参数的长度是否等于 fn 所需要的参数的长度，如果满足，则执行函数，如果不是则继续返回一个函数等待接收
    return _args.length < fnLength ? curry(fn, _args) : fn(..._args)
  }
}
```

最后：补充一个经典面试题

> 实现一个柯里化函数，可以无限调用 add 函数，而不需要我们显示声明参数的个数


### 代码组合(compose)

《函数式编程指北》这本电子书只介绍了compose这种组合方式，但是在我的查阅中，还发现有`pipe`这种组合方式

`compose`方式的代码组合:

```js
var componse = function (f, g) {
  return function(x) {
    return f(g(x))
  }
}
// 这里可以很明显的看出，调用的顺序是从后往前
```

那么，因此可以总结出：compose是根据参数倒序包装: `[a, b, c]` 调用顺序 c -> b -> a

`pipe`方式的代码组合(正好与compose相反):

```js
var pipe = function (f, g) {
  return function(x) {
    return g(f(x))
  }
}
// 这里可以很明显的看出，调用的顺序是从前往后
```

同理，可以总结出：pipe函数包装函数是根据参数顺序包装: `[a, b, c]` 调用顺序 a -> b -> c

总结一下，我们通过这两种思路，实现一个通用的调用方式

```js
// 就从pipe开始吧
// 递归实现版本
function pipe (...fns) {
  const len = fns.length
  let index = len // 这里取len是为了做一次验证，确保每一个fns都是函数类型
  while (index) {
    index -= 1
    if (typeof fns[index] !== 'function') {
      throw new TypeError('Excepted  a function');
    }
  }
  return function (...args) {
    // 如果 len 长度大于0，则调用函数，否则返回args
    let result = len ? fns[index].apply(this, args) : args
    index += 1
    while (index < len) {
      console.log(this)
      result = fns[index].call(this, result) // 其实我不太理解为什么这里要调用this，fns[index](result) 也是一样的
      index += 1
    }
    return result
  }
}

// compose的写法，就是将pipe的调用链反过来
function compone (...fns) {
  return pipe(...fns.reverse())
}
```

以上，就实现了 `pipe` 和 `compose` 的两种基本实现。但是既然可以用迭代的方式可以实现pipe，那么用递归的方式一定也可以实现

```js
function pipe (...fns) {
  const len = fns.length
  let index = len
  // 老样子，验证一次，数组所有元素是否都是函数
  while (index) {
    index -= 1
    if (typeof fns[index] !== 'function') {
      throw new TypeError('Excepted  a function')
    }
  }
  // 这里需要利用闭包的特性，去存储每一次执行的结果
  let result = null
  return function fn (...args) {
    if (index >= len - 1 ) {
      index = 0
      return result ? result : args[0]
    }
    result = fns[index].apply(this, args)
    index = index + 1
    // 每一次执行的结果会作为参数传递给下一次执行的函数
    return fn.call(this, result)
  }
}
```

优化：看了上述的代码，是不是觉得和数组方法中的 `reduce` 很像，我们可以借助 `reduce` 方法进行代码一个显著的简化

```js
// reduce 版本
// 假设这里不用验证都是函数
// 这个的 arg 在第一次循环时，指的是 args， 后面指的是前一次执行获得的结果，作为参数传递给下一个函数
let pipe = (...fns) => (...args) => fns.reduce((arg, fn, index) => index === 0 ? fn.apply(this, arg) : fuc.call(this, arg), args) // 最后这个args是初始值，详见reduce用法
// 同理compose的写法也可以用pipe + reduce + reverse 实现
let compose = (...fns) => (...args) => fns.reverse().reduce((arg, fn, index) => index === 0 ? fn.apply(this, arg) : fuc.call(this, arg), args)
```


