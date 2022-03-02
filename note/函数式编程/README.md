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

<!-- 省略一部分知识点，这部分需要大量代码实践，感觉目前不能很好的掌握这种写法，能弄透了再回来补 —— functor，pointed functor ... -->

### 洋葱模型

第一次遇到洋葱模型设计是在 `koa` 这类框架和 `redux` 库中看到的。

第一次看到的时候，只得其形，不得其义。导致过一段时间就会忘了。直到阅读了函数式编程，大致能理解一些这种设计思想。

当然这里的洋葱模型问题更加偏向面试，而非纯粹的函数式编程中的 `Monad`，以后有机会我补充到后面

先看一下代码的使用，我们来反向推测一波。

```js
// koa官方文档上的使用，我们这里稍微简化一下
// https://koa.bootcss.com/
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('start log')
  await next();
  console.log('end log');
});

app.use(async (ctx, next) => {
  console.log('get Time')
  await next();
  console.log('now');
});

app.use(async ctx => {
  console.log('middle')
});

app.listen(3000);

// 我们希望得到的结果是
// start log
// get Time
// middle
// now
// end log
```

上面这段代码中，用到了两个实例方法，use和listen
其中`listen`的主要作用是启动服务，`use`的作用则是注册

通常情况下，想实现这种功能，我们需要额外维护一个数组，用来存放中间件函数
然后，通过函数式编程中的 compose(即代码组合)来调用中间件(同时传递上下文)，具体的实现手段是迭代或者循环

```js
// 让我们看一下源码 
module.exports = class Application extends Emitter {
  // 这里只引用这次用到的
  constructor (options) {
    super()
    this.middleware = [] // 创建一个 middleware 数组，用来存放中间件
    // ...
  }

  // 第一个使用到的实例方法use
  // use函数就是起到了一个注册的作用，即存放需要的中间件
  use (fn) {
    if (typeof fn !== 'function') throw new TypeError('middleware must be a function!')
    this.middleware.push(fn)
    return this
  }

  // 接下来是第二个遇到的实例方法listen，其中调用了 this.callback 
  listen (...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }

  // 这里与模型相关的主要是compose方法，通过compose方法，实现了洋葱模型函数的调用
  // 其余的地方主要是处理了请求，创建了上下文内容，并执行处理请求的函数(this.handleRequest)
  // 所以this.callback() 的返回值得到了一个新的函数，这个函数被调用用来处理请求，我们将compose后的函数作为参数传入
  // 这里分析的路径分成了两部分
  // 1：分析 this.handleRequest 干了什么
  // 2：分析 compose 函数干了什么
  callback () {
    const fn = compose(this.middleware)

    if (!this.listenerCount('error')) this.on('error', this.onerror)

    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }

    return handleRequest
  }

  // 我们先看 1
  // handleRequest处理了ctx，并调用了中间件
  // 这里可以看到 fnMiddleware 是通过 promise的形式调用的，可以大胆的假设，compose的返回值是一个promise实例
  handleRequest (ctx, fnMiddleware) {
    const res = ctx.res
    res.statusCode = 404
    const onerror = err => ctx.onerror(err)
    const handleResponse = () => respond(ctx)
    onFinished(res, onerror)
    return fnMiddleware(ctx).then(handleResponse).catch(onerror)
  }
}
```

关于handleRequest的线索到这里断了，那这里需要补充一个知识点，node的http模块

http模块是nodeJs的一个内置模块，旨在支持该协议的许多传统上难以使用的功能，他的相关api是非常底层的，用来进行流处理和消息解析。 它将消息解析为标头和正文，但不解析实际的标头或正文。更多的具体信息，详见[文档](http://nodejs.cn/api/http.html#httpcreateserveroptions-requestlistener)

这里主要剖析一下 createServer 这个api

```js
http.createServer([options][, requestListener])
// options 接受对象，指定一些server数据处理的配置
// requestListener 接受一个函数，是自动添加到 'request' 事件的函数

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!'
  }));
});

// 在调用的过程中，该api默认传输req和res两个参数，这也是为什么express的next是作为第三个参数存在，而这里被ctx封装了
```

有了上面这一段解析，大致可以明白以一整个流程了：

1. 构建实例、初始化  (new Koa; this.middleware[])
2. 编译代码的过程中，注册中间件 (app.use; this.middleware.push(fn))
3. 代码组合，返回一个新的函数 (this.callback(); compose(this.middleware)) -- 下文分析
4. 基于http模块，创建node层的服务器，并将组合后的代码通过`handlerequest`包装， 注入到`request`事件中 (http.createServer(this.callback()))
5. 挂载服务，每次收到请求时，触发request事件，即`handlerequest`函数 -> 即调用 `middleware`


那么，最后一块，目标则是 `compose` 函数的实现
虽然上面有了函数式编程的compse实现，但是此处要支持异步，因此实现方法会有些不同

```js
// 1. 声明compose函数，接受中间件，记得函数式编程的特点，纯函数，无副作用
function compose (middleware) {
  // 为了保险，需要检查一下 middleware 类型，当然在koa中，因为初始化了middleware属性，就没做检查，这边就当多了解一下，做一次检查
  if (!Array.isArray(middleware)) {
    throw new TypeError('middleware is not array type.')
  }
  // 2. 还记得上面的用法吗？fnMiddleware(ctx).then(handleResponse).catch(onerror)
  //    那么 compose 的返回值一定是一个函数，同时要提供 next 方法
  return function (context, next) {
    let index = -1 // 此处这么设计是为了防止中间件重复调用
    return dispatch(0) // 从第一个中间件开始调用

    // 声明 dispatch 函数
    function dispatch(i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i // 将指针指向当前参数传进来的中间件索引位置
      let fn = middleware[i] // 声明被调用的中间件
      // 官方接下来是这么写的
      // 判断 中间件 是否调用万，如果调用万，则赋值 next 给 fn
      // 但是追溯源码的过程中，官方并没有给next赋值，思来想去，感觉这里是为了做一个扩展，感觉有点类似于提供一个hook，可以在最后一步处理之前处理过的上下文
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      // 但是由于没有处理next的数据类型，这里直接通过try catch 捕获
      try {
        // 这里直接调用middleware中的函数，并提供next，如果开发者调用next，就会dispatch下一个中间件，如果不调用，则终止中间件的循环
        return Promise.resolve(fn(context, function next () {
          dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
```
