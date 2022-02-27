# 迭代器和生成器

迭代: 按照顺序反复多次执行一段程序

## 迭代器

迭代器模式: js设计者们，在ECMAScript 这个语境下，描述了一个方案，即可以把有些结构称为“可迭代对象”(iterable)，因为它们实现了正式的 Iterable(可迭代) 接口，而且可以通过迭代器 Iterator 消费

### 可迭代协议

实现 Iterable 接口(可迭代协议)要求同时具备两种能力:支持迭代的自我识别能力和创建实现 Iterator 接口的对象的能力。

在js中，必须通过 Symbol.iterator 去实现一个迭代器工厂函数，返回值是一个新的迭代器

接收可迭代对象的原生语言特性包括：
   1. for-of 循环
   2. 数组解构
   3. 扩展操作符: ...
   4. Array.from()
   5. 创建集合: new Set
   6. 创建映射: new Map
   7. Promise.all()接收由promise组成的可迭代对象
   8. Promise.race()接收由promise组成的可迭代对象
   9. yield*操作符，在生成器中使用

### 迭代器协议

迭代器 API 使用 next()方法 在可迭代对象中遍历数据。

next()方法返回值包括:done 和 value。done 表示是否还可以再次调用;value 包含可迭代对象的下一个值(done 为 false)，或者 undefined(done 为 true)。done: true 状态称为“耗尽”。

### 自定义迭代器

简单的实现一个输出前二十位的斐波那契数列

```js
function fib () {}
fib[Symbol.iterator] = function () {
  const arr = [1, 1]
  let index = 0
  return {
    next () {
      if (index === 20) {
        return {value: undefined, done: true}
      }
      if (index === 0) {
        index++
        return {value: arr[0], done: false}
      } else if (index === 1) {
        index++
        return {value: arr[1], done: false}
      } else {
        index++
        const len = arr.length
        arr.push(arr[len - 1] + arr[len - 2])
        return {value: arr[arr.length - 1], done: false}
      }
    },
    return () {
      console.log('中止迭代')
      return {done: true}
    }
  }
}
```

## 生成器

es6新增的一种结构，拥有在一个函数块内暂停和恢复代码执行的能力。

### 语法的使用

```js
// 箭头函数不能用来定义生成器函数
function* generatorFn() { 
  yield 1
  yield 2
  return 3
} // 返回值 {done: false, value: 1} ...

class Bar {
  static * generatorFn() {}
}
```

调用生成器函数会产生一个**生成器对象**,生成器对象也实现了 Iterator 接口, 可以调用 next 方法

可以使用星号增强 yield 的行为，让它能够迭代一个可迭代对象，从而一次产出一个值

```js
// 等价的generatorFn:
function* generatorFn() {
  for(const x of [1,2,3]){
    yield x;
  }
}

function* equalGeneratorFn() {
  yield* [1,2,3]
}

function* generatorFn() {}
const g = generatorFn();

g.return(4) // { done: true, value: 4 } 调用生成器return方法，提前中止迭代
g.throw('foo') // throw()方法会在暂停的时候将一个提供的错误注入到生成器对象中。如果错误未被处理，生成器就会关闭
// 假如生成器函数内部处理了这个错误，那么生成器就不会关闭，而且还可以恢复执行。错误处理会跳过对应的 yield。throw方法抛出的错误要被内部捕获，前提是必须至少执行过一次next方法。

// 这里实践下来和书中的说法有点歧义，书中在7.3.2中说到，下面两种写法是等价的：
function* testGen() {
  for (const i of [1,2,3]) {
    yield i
  }
}

// 等价于
function* testGen2() {
  yield* [1,2,3]
}

// 然而，在最后的提前终止生成器中，两种写法有所区别
function* generatorFn1() {
  for (const i of [1,2,3,4,5]) {
    try {
      yield i
    } catch(e) {
      console.log('我在内部捕获了错误，所以当前值跳过')
    }
  }
}

function* generatorFn2() {
  const arr = [1,2,3,4,5]
  try {
    yield* arr
  } catch(e) {
    console.log('我在内部捕获了错误，同时迭代结束了')
  }
}

const g1 = generatorFn1()
const g2 = generatorFn2()
g1.throw() // 输出catch内容，同时跳过当前迭代，生成器继续执行
g2.throw() // 输出catch内容，生成器结束

// 个人理解：yield* 可以接受一个可迭代对象，会开辟一个新的作用域环境去执行，因此跳出了当前try catch的作用域环境，因此无法被捕获到
// 以后如果发现这个是错误的，会回来改正
```

## 属性的可枚举性(补充——非书中内容)

完善一下第三章笔记中相关的记录

先从一个问题开始吧。我曾经在一个面试中被问到一个问题：**for-in 和 forEach 有什么区别？**

从现在看来，我觉得这是又不是一个很好的问题。
说好的原因是：这个问题考察的方面很广泛，可以从很多点来回答，从底层的定义，到构成，到性能，不同的知识储备的开发者，看到的层次是不同的，可以聊很多。
说不好的原因是：正是给的太宽泛了，反而失去了本身考察的意义，个人认为应该更加有针对性的提问，而非让开发者去猜面试官的意图，这样容易两者都对对方产生不满(个人看法)

回到题目本身中来，我尽可能的以自己目前的能力去完善这个问题，同时引申出标题的内容。先上定义：

`for-in`: 以任意顺序遍历一个对象的除Symbol以外的**可枚举属性**，包括继承的**可枚举属性**。

`forEach`: 数组方法，遍历数组，对给定的数组的每个元素，执行一次指定的函数。

再看用法：

```js
// for-in 通常来说，可以遍历数组，对象(这也是常用的方式)
const arr = [1,2,3,4]
const dict = {x: 1, y: 2, z: 3}
for (const i in arr) { console.log(i) } // 0, 1, 2, 3 返回数组索引
for (const i in dict) { console.log(i) } // x, y, z 返回对象key值

// 同时，for-in 也可以遍历函数和构造函数
function Demo () {
  this.name = 'demo'
}
Demo.prototype.age = 99
const demo = new Demo()
for (const i in demo) { console.log(i) } // name, age
// 这里返回了 实例属性 和 原型里的可枚举属性
// 那么 可枚举属性是在那里定义的呢，后面解析
// for in 特点，js中最底层的循环方式之一，可以通过continue和break跳过、终止循环，可以循环所有可枚举的属性

// forEach，常规用法，数组遍历
arr.forEact((item, index, arr) => {
  console.log(item, index, arr) // 1 0 [1,2,3,4] ...
})
// foeEach特点，无返回值，函数本身不会改变数组，无法终止执行，不会在迭代之前创建副本(也就是说某些元素被删除后会影响其他元素)
```

通常来说，创建一个元素(数组或对象)，每个被创建的元素内部有一个`[[可枚举]]`的属性，这个属性通常是在元素隐形的，非显形声明的。
对于基本类型来说，例如字符串，在创建时，生成了迭代器，同时允许下标访问(es5开始支持)
对于通过直接的赋值和属性初始化的属性，该标识值(`[[可枚举]]`)默认为即为 true
对于通过 `Object.defineProperty` 等定义的属性，该标识值默认为 false
可枚举的属性可以通过 `for-in` 循环进行遍历（包括元素自身的可枚举属性，以及继承的可枚举属性）

这往往导致一个问题，也就是网上很多通过 `for-in` 去实现 `forEach` 函数的时候，没有考虑到可枚举属性，导致写出的 polyfill 不够健壮

