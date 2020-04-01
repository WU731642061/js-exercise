// 之前面试的时候，遇到过一道关于js的eventloop的事件机制，果断的做错了
// 这篇主要来记录一下关于，js中的宏任务，微任务和面试题中的坑吧

// 先补充几个知识点
// js本身是一门单线程的脚本语言，h5提出了web worker(以后讨论)可以开辟新的线程，但是不能执行dom操作
// 关于参考，参考了这篇文章：https://juejin.im/post/5b407162f265da0f51403f42和https://juejin.im/post/5b498d245188251b193d4059
// 关于补充，写这篇文章是因为上面两篇文章没有提到有async的情况，面试的时候遇到了，所以在这里记录一下，上面两片文章已经是教科书般的普及了，我就不班门弄斧了

// 异步任务：不在主线程执行，当代码遇到队列任务时，会将其放入队列任务中执行，其中又分为：”微任务“和”宏任务“
// 宏任务包括：setTimeout、setInterval、I/O、UI rendering
// 微任务包括：Promise、Object.observe（已废弃）、MutationObserver（html5新特性）

// 宏任务优先级：setTimeout > setInterval > I/O
// 微任务优先级：Promise > Object.observe > MutationObserver
// 同时存在微任务队列和宏任务队列：微任务 > 宏任务，但是实际情况比较复杂，需要分析是否在同一次循环事件中

// 文章一中的例子，我这边也做一下，建议先看一下文章一，这里加了node端的process.nextTick和setImmediate(这是个毒瘤，后文会讲)
// 微任务：process.nextTick > Promise > Object.observe > MutationObserver
// 宏任务：setTimeout > setInterval > I/O 

console.log('global'); // 同步任务

setTimeout(function() {  // 宏任务
    console.log('setTimeout1');
    new Promise(function(resolve) {  // 微任务，注意这里虽然是微任务，但是不是第一时间就压入微任务队列的，详见文章
        console.log('setTimeout1_promise');
        resolve();
    }).then(function() {
        console.log('setTimeout1_promiseThen')
    })
    process.nextTick(function() {  // 微任务，同上
        console.log('setTimeout1_nextTick');
    })
},0)

new Promise(function(resolve) {  // 微任务，注意一点，promise的构造部分，是一个同步任务，真正异步的是它的回调，也就是then的部分
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promiseThen1')
})

setImmediate(function() {  // 宏任务
    console.log('setImmediate');
})

process.nextTick(function() {  // 微任务
    console.log('nextTick');
})

new Promise(function(resolve) {  // 微任务
    console.log('promise2');
    resolve();
}).then(function() {
    console.log('promiseThen2')  
})

setTimeout(function() {  // 宏任务
    console.log('setTimeout2');
},0)

// 结果自测，逗号隔开
// 第一轮宏任务微任务执行: global，promise1, promise2, nextTick, promiseThen1, promiseThen2    
// 第二轮： setTimeout1, setTimeout1_promise, setTimeout2, setTimeout1_nextTick, setTimeout1_promiseThen, setImmediate

// 这里有一个小小的点，我们会发现setImmediate是最后输出的，我一开始的理解是这样的当一个宏任务队列中有优先级不同的任务，同时在宏任务中又压入微任务
// 优先级高的宏任务执行完，会执行微任务，然后再执行优先级低的宏任务，然后我执行了这段代码

setImmediate(function() {  // 宏任务
    console.log('setImmediate');
})

setTimeout(function() {
    console.log('setTimeout')
    process.nextTick(function() {  // 微任务，同上
        console.log('setTimeout1_nextTick');
    })
},0)

// 然后你把他丢进去运行，会发现结果根本不是你想的那样，23333，写这篇文章的时候，我自己都懵逼了，我就去查了下文档：https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

// 事件循环一共有6个阶段，分别是：
// timers：这个是定时器阶段，处理setTimeout()和setInterval()的回调函数。进入这个阶段后，主线程会检查一下当前时间，是否满足定时器的条件。如果满足就执行回调函数，否则就离开这个阶段。(摘自阮一峰老师的文章：http://www.ruanyifeng.com/blog/2018/02/node-event-loop.html，以下同)
// pending callbacks：除了以下操作的回调函数，其他的回调函数都在这个阶段执行。setTimeout()和setInterval()的回调函数；setImmediate()的回调函数；用于关闭请求的回调函数，比如socket.on('close', ...)
// idle, prepare：该阶段只供 libuv 内部调用，这里可以忽略。
// poll：这个阶段是轮询时间，用于等待还未返回的 I/O 事件，比如服务器的回应、用户移动鼠标等等。这个阶段的时间会比较长。如果没有其他异步任务要处理（比如到期的定时器），会一直停留在这个阶段，等待 I/O 请求返回结果。
// check：该阶段执行setImmediate()的回调函数。
// close callbacks：该阶段执行关闭请求的回调函数，比如socket.on('close', ...)。

// 因此，虽然理论上，setTimeout优先于setImmediate执行，但是犹豫node做不到0毫秒延迟执行，所以可能会出现setImmediate被优先执行的情况，
// 因此，在实际开发过程中，不建议多种宏任务微任务混用，祖传代码当我没说=。=
// 同时，阮一峰老师的文章里给出了以下例子：

const fs = require('fs');

fs.readFile('test.js', () => {
  setTimeout(() => console.log(1));
  setImmediate(() => console.log(2));
});
// 结果：2，1  理由：第一轮事件循环执行到了OI，然后执行到了check，第二轮执行timers，所以一定是2，1

// 回到这篇文章的主题，当我们遇到了async的时候，会发生什么样的情况呢？来，兄del，看代码
// 我改了一下网上抄下来的代码

async function async1(){
  console.log('async1 start')
  await async2()
  await sync2()
  console.log('async1 end')
  return
}

function sync2(){ // 这是个普通方法
  console.log('sync2')
}

async function async2() { // 这是个async
    console.log('async2')
}

console.log('script start')

setTimeout(function(){  // 宏任务  
  console.log('setTimeout1') 
},0)  

async1().then(function(){  // 微任务
    console.log('async1 promsie')
});

new Promise(function(resolve){
  console.log('promise1')
  resolve();
}).then(function(){
  console.log('promise2')
})

console.log('script end')

new Promise(function(resolve){
    setTimeout(function(){
        console.log('setTimeout in promise 1')
        resolve()
    },0)
}).then(function(){
    console.log('setTimeout resolve in promise 1')
})

setTimeout(function(){
    console.log('setTimeout2')
    new Promise(function(resolve){
        console.log("promise in setTimeout")
        resolve()
    }).then(function(){
        console.log('promise resolve in setTimeout')
    })
},0)


// 反正笔试题就是恶心人呗，谁不会啊，问题是哪个智障真的写项目会这么写呢？

// 结果自测：
// 提示，不同浏览器版本得出的结果可能不一样，原因是TC39 最近决议，await将直接使用Promise.resolve()相同语义。也就是说V8将重新恢复原有行为（也就是原题中的node的行为）。其他引擎也会照此修改。主要原因可能是性能考量。
// 参考文章https://segmentfault.com/q/1010000016147496和https://www.zhihu.com/question/268007969/answer/339811998
// 我这边统一依据新的规定运行的结果为准
// 在做题目之前，先记住几个知识点：构造函数的执行是同步的，想明白了这个继续往下做

// script start
// async1 start
// async2
// promise1
// script end
// 第一轮执行完毕了，来看看第一轮事件末尾添加的微任务输出
// sync2
// promise2
// async1 end
// async1 promsie
// 这边就开始执行宏任务了
// setTimeout1
// setTimeout in promise 1
// setTimeout2
// promise in setTimeout
// etTimeout resolve in promise 1
// promise resolve in setTimeout

// 有没有都做对呢
// 关于就是await async2()这边的逻辑，会先执行async2的函数，然后挂起等待拿到结果，这时候如果有同步任务，会继续执行下去，也就是我们看到为什么async2后面输出了promise1而不是sync2






