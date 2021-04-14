// 在实现一个promise之前，还是有必要学习一些promise的调用方法

// 关于promise的基本用法，建议阅读阮一峰老师的文章，绝对总结的比我好很多：https://es6.ruanyifeng.com/#docs/promise
// 其他参考文章：
// 图解promsie的实现原理：https://zhuanlan.zhihu.com/p/58428287
// promise实现原理：https://juejin.im/post/5b83cb5ae51d4538cc3ec354

// 这篇笔记主要分成两个部分：api的使用，原理解读与实现。能实现到哪一步程度，仅取决于本人目前的水平，因此不敢妄加保证

// 先聊一聊promsie的基本概念和使用(阮一峰老师解释的更加的好，建议直接阅读，我这里就不班门弄斧啦，2333)：
// promsie是es6的一个新的异步编程的解决方案
// 在es5及之前，我们希望执行完一个函数或操作之后，拿着结果该怎么做，一般是通过回调函数或者事件，这个我会在callback.js那篇笔记里更下详细的描述

// 这里要分清楚一个概念，异步≠多线程，我自己写着写着也差点被忽悠进去了(因为我写的时候总会莫名去和python的threading去对比，傻逼了我)
// 一定要分清楚这个概念，异步的核心是“延迟”执行，从而减少运行代码时的大量阻塞问题，但在执行代码的过程中，他依旧是单线程的
// 只不过我们通常用异步去执行io和网络请求，所以给人一种错觉，异步就是多线程，这个我看很多文章里讲的也很模糊，所以我还是希望能够提醒自己，我在笔记的最后应该会放一些例子
// html5中提出了web worker，这个才是真正js多线程编程，这里就不做论述了
// 走远了，回到promsie

// promise的基本用法
// 创造了Promise实例
function promiseFunc(data){
  return new Promise((resolve, reject) => {
    if (data) {
      console.log("成功获取到data")

      resolve(data)
    } else {
      console.log("未能获取到data")
      reject("error: no data")
    }
  })
}

// 处理then和catch
// 这里只是交代用法，一些别名用法或者其他的之类，如.then(null, rejection)，还是请参考文档
promiseFunc([1,2,3,4]).then((r) => {
  console.log(r)
}).catch((err) => {
  console.log(err)
})
// 这里提醒一下，关于promsie的catch处理，其中涉及到内部不抛出，外部是否继续执行，先catch后then和先then后catch等一些列知识点，我这里没有记，但是还是请一定要看一下阮一峰老师的教程

// 处理finally
// 不管promise最后的状态，在执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数
promiseFunc([5,6,7,8]).then((r) => {
  console.log(r)
}).catch((err) => {
  console.log(err)
}).finally(() => {
  console.log("最终，我们都秃了，233333")
})

// 处理多个promsie——promsie.all
// Promise.all()方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。
// 另外，Promise.all()方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

let promiseList = [1,2,3,4].map((value)=>{
  value +=1
  return Promise.resolve(value)
})

Promise.all(promiseList).then((r)=>{
  // 同样的，如果我们的resolve中返回了值，最后会拼接成数组传进来
  console.log('处理完所有的promsie后，我出现了')
  console.log(r)
}).catch((err)=>{
  // 注意，如果作为参数的 Promise 实例，自己定义了catch方法，那么它一旦被rejected，并不会触发Promise.all()的catch方法。
  // 大致解释，数组中的元素其实是一个promsie实例，当他内部执行完catch方法后，其实是被标记成了resove状态
  // 但是如果元素没有自己的catch方法，就会调用Promise.all()的catch方法。
  // 更加详细的原理请看文档
  console.log("我们中出了个叛徒")
})

// 处理race
// 跟Promise.all()类似，不同点在于，若某个元素的实例率先改变状态，就会率先改变的 Promise 实例的返回值，并传递参数
Promise.race(promiseList).then((r)=>{
  console.log('处理完所有的promsie后，我出现了')
  // 我这里的结果一定是2，从某种方面说明了，异步不等于多线程
  console.log(r)
}).catch((err)=>{
  // 如果第一个改变状态的元素的实例为reject，则会调用这里的catch方法
  // 同样的，如果元素有自己的catch方法，就不会被执行到这里来
  console.log("我们中出了个叛徒")
})

// 后面还有一些用法，比较简单或者是还在提议中，就不写在里面了，建议直接看教程
// 接下来进入这篇笔记的第2部分，promise的原理

// Promises/A+ 规范和 ECMAscript 6 中 Promise实现的区别：
// Promise规范：Promise有很多个规范，如 Promise/A，Promise/B，Promise/D 以及 Promise/A 的升级版 Promise/A+，最终 ES6 中采用了 Promise/A+ 规范。
// ECMAscript Promise实现：基于Promise/A+规范的实现。
// Promises/A+：一个去实现promise的最小规定，包括Promise 状态，then 方法，Promise解析过程。任何能通过这个规范实现的promise都可以称之为promise。

// 检测工具：promises-aplus-tests

// 先看看promise解决了什么问题：回调地狱
// 如果我们想请求一个连续的请求，不使用promise会发生什么

//不使用Promise        
http.get('some_url', function (id) {
  http.get('getNameById', id, function (name) {
      http.get('getCourseByName', name, function (course) {
          http.get('getCourseDetailByCourse', function (courseDetail) {
              // ... 你要请求的越多，你的层级就越长
              // 讲一个苏联笑话，某个间谍偷到了核弹源码的最后一页，上面写着 }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
          })
      })
  })
})
// 使用promise
function getUserId(url) {
  return new Promise(function (resolve) {
    //异步请求
    http.get(url, function (id) {
      resolve(id)
    })
  })
}
getUserId('some_url').then(function (id) {
  return getNameById(id)
}).then(function (name) {
  return getCourseByName(name)
}).then(function (course) {
  return getCourseDetailByCourse(course)
}).then(function (courseDetail) {
  // 这样结构就清晰多了
})
