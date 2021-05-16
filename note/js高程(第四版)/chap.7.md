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
  for(constxof[1,2,3]){
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
