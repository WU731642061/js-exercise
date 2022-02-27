# 对象、类与面向对象编程

对象：一组属性的无序集合

对象的创建方式：
  1. 构造函数创建：`let obj = new Object()`
  2. 对象字面量表示法: `let obj = {}`

## 属性类型

对象的每个属性都拥有一些特征，官方使用了一些内部特性来描述属性的特征。

主要分为 ***数据属性*** 与 ***访问器属性***

### 数据属性：

1. Configurable: 表示能否通过delete删除属性从而从新定义属性，能否修改属性的特性(后面解释)，默认值是true
2. Enumerable: 表示能否通过for-in循环返回属性，默认值是true
3. Writable: 表示能否修改属性值，默认为 false(老版本默认值是true，现在默认值是false)
4. Value: 包含这个属性的数据值，读取的时候，从这个位置读取，写入的时候，把新值保存在这个位置。默认值是undefined，如果你给属性赋值，那么value即为指定值

```js
// 如果你希望访问/修改上数据属性，需要通过Object.defineProperty()方法
Object.defineProperty('属性所在的对象', '属性名称', '描述对象') // 描述对象指的是数据属性所组成的对象，可以是一个或多个值，如下

person.name = 'God'; person.name // 'God'

for (var i in person) {console.log(i)} // age name job enjoy sayName

// 那么，接下来，就让我们来修改这个name的对象属性的数据属性
Object.defineProperty(person, 'name', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 'Man'
}) // {age: 11, job: "engineer", name: "Man", sayName: ƒ}

person.name // Man，因为直接通过value对name属性重新赋值了，因此新值Man覆盖了旧值God
person.name = "Tom"; person.name // Man，这里将writable修改成了false，name属性变成只读的，因为无法为他重新赋值
delete person.name; person.name // Man, 因为设置了configurable=false，因为属性无法被删除，在严格模式下，还会报错，

// 同时，你无法再使用Object.defineProperty()方法修改除了writable(将true改为false)之外的其他属性，会报错
Object.defineProperty(person, 'name', { configurable: true }) // 抛错 Cannot redefine property: name

for (var i in person) {console.log(i)} // age job enjoy sayName 这里通过修改了enumerable=false，导致了该属性无法通过for-in遍历获得，但是并不影响name值能否被遍历

// 注意，以上方法请在IE8以上的浏览器才能被正常使用
```

### 访问器属性

访问器属性不包含数据值，取而代之的是两个方法，getter和setter函数，访问器属性同样也包括四个属性

1. Configurable: 表示能否通过delete删除属性从而从新定义属性，能否修改属性的特性(后面解释)，默认值是true
2. Enumerable: 表示能否通过for-in循环返回属性，默认值是true
3. get: 读取属性时调用的函数，默认值为undefined
4. set: 设置属性时调用的函数，默认值为undefined

一旦设置了get和set函数，就不能设置数据属性中的writable和value
**在严格模式下，必须同时指定get和set方法，不然会报错**

```js
person._job = 'engineer'
Object.defineProperty(person, 'job', {
  get: function() {
    return this._job
  },
  set: function(newVal) {
    if (['engineer', 'policeman', 'doctor'].includes(newVal)){
      this._job = newVal // 这里不论是get还是set，无法在这个属性本身直接进行赋值取值操作，会造成无限递归直至栈溢出
    }
  }
})
```

## 定义多个属性

可以通过 `Object.defieneProperties` 方法定义多个属性

```js
let book = {}
Object.defineProperties(book, 
  {
    _year:{value:2020, writable: true}, 
    edition:{value:1, writable: true}, 
    year:{
      get:function(){return this._year},
      set:function(newVal){
        if (newVal <= 2020){
          this._year = newVal
          console.log(newVal)
          console.log(this._year)
        }
      }
    }
})
```

## 读取属性的特性

除了可以给对象属性赋予特性，也可以通过 `object.getOwnPropertyDescriptor` 方法获取指定属性的描述

```js
let book = {}
Object.defineProperty(book, 'userName', {value: 'Tom', enumerable: true})
Object.getOwnPropertyDescriptor(book, 'userName')
```

es2017 新增语法: `Object.getOwnPropertyDescriptors('属性所在的对象')` 可以返回每个属性集描述的集合

## 合并对象

这一小节非常的实用，因为在开发过程是，经常会遇到很多数据合并的问题，尤其是遇到重复字段，大量数据拼接，还要考虑各种问题。

正好借着这一章了解一下对象如何合并

1. 最直接的合并: for循环合并

    ```js
    // 先实现一个最简单版本的合并
    const objA = {a: 1, b: 2, c: 3}
    const objB = {c: 4, d: 5, e: 6}
    function objMerge(target, source) {
      // 暂时不考虑数据兼容的问题
      for (key in source) {
        target[key] = source[key]
      }
      return target
    }
    objMerge(objA, objB) // {a: 1, b: 2, c: 4, d: 5, e: 6}
    ```

2. 调用js api合并: Object.assign

  ```js
  // Object.assign 是一个浅拷贝
  const objA = {a: 1, b: 2, c: 3}
  const objB = {c: 4, d: 5, e: 6}
  const returnedTarget = Object.assign(target, source) // {a: 1, b: 2, c: 4, d: 5, e: 6}
  ```
  关于 `Object.assign` 的es5实现，可以参考 [polyfill](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

## 对象的相等判断

  Object.is() 是比 `===` 符号更加严格的对等判断符号，具体区别书中提及较少，可以参考[文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/is)

## 创建对象

这一节主要是讲述了对象的几种可复用的创建方式，为了更好的服务后面的继承讲解

1. 工厂模式

  最基础的设计模式，用于抽象创建特定对象的过程。具体形象的比喻可参考[文章](https://refactoringguru.cn/design-patterns/factory-method)和(js实践)[https://juejin.cn/post/6844903653774458888]

  ```js
  // 工厂模式就好比，我们把包装和肉送进制造厂，就可以得到包装好的火腿肠一样
  // 我们通过声明一个特定的方法，允许接受特性的参数，返回一个封装好的数据对象
  function createFact (name, age, job) {
    let factObj = { name, age, job }
    factObj.sayName = function () {
      console.log(this.name)
    }
    return factObj
  }

  let p1 = createFact('Tom', 20, 'employee')
  let p2 = createFact('Jim', 20, 'employer')
  ```

  相较于下面的构造函数模式，工厂模式需要显示地声明对象来存储属性

2. 构造函数模式

  利用了js的 `new` 关键字的特性，通过创造构造函数，自己定义对象类型定义属性和方法。

  ```js
  function Student (name, age) {
    this.name = name
    this.age = age
    this.school = 'xxx school'
    this.individulShow = function () {
      console.log('I am ' + this.name + ', and I come from ' + this.school)
    }
  }

  let Tom = new Student('Tom', 15)
  let Jerry = new Student('Jerry', 15)
  ```

  每一个被实例化的对象，都能通过构造函数获得自己的属性。但是在上面这个例子中，`individulShow` 方法做的事是一样的，没有必要单独为每一个实例创建这样一个方法，于是就有了下面这种模式
  
3. 原型模式

  这个模式主要利用的js函数的特性，每个函数都会创建一个 prototype 属性，这个属性是一个对象，包含其实例共享的属性和方法。

  ```js
  function Person() {}
  Person.prototype.name = 'Tom'
  Person.prototype.hobby = [1,2,3]

  const person1 = new Person()
  const person2 = new Person()
  ```
  这样的好处是实例可以共享属性，坏处是如果某个实例修改了属性值，其他实例获取到的值也会改变

  ```js
  person1.hobby.push(4)  // person2.hobby也会跟着更改 
  ```

4. 对象迭代

  这里记录一些api吧
  如何遍历一个对象
  `for-in`, `Object.keys()`, `Object.getOwnPropertyName()`, `Object.values()`, `Object.entries()`

## 继承(6种)

1. 原型链继承

  简要说明：将构造函数挂载实例化后挂在到子类的原型链上去

  ```js
  function Supertype () {
    this.type = 1
  }

  Supertype.prototype.getSuperValue = function () {
    return this.type
  }

  function Subtype() {
    this.subtype = 2
  }

  Subtype.prototype = new Supertype()
  var s = new Subtype()
  ```




