# 语言基础

## 严格模式

ES5 增加了严格模式的概念，严格模式下，很多代码运行时，会得到不同的结果。

开启严格模式方法：1，在脚本开头添加 "use strict", 则全局开启严格模式; 2. 在某个函数体开头添加 "use strict", 则局部开启严格模式

mdn对严格模式的一些说明：

1. 严格模式通过抛出错误来消除了一些原有静默错误。
2. 严格模式修复了一些导致 JavaScript引擎难以执行优化的缺陷：有时候，相同的代码，严格模式可以比非严格模式下运行得更快。
3. 严格模式禁用了在ECMAScript的未来版本中可能会定义的一些语法。

**严格模式记录**

我会在这篇笔记下持续更新遇到的严格模式下和非严格模式下的代码区别:


## 变量

1. var 关键字

用来声明一个变量，有如下特点：

  + 仅在全局作用域和函数作用域生效
  + var声明提升(变量提升——var hoist)，变量会自动提升到函数作用域/全局作用域顶部

2. let 声明

es6新出的关键字，用来声明一个变量，与var相似，但是有如下特点:

  + let 声明的范围是块作用域， 而 var 声明的范围是函数作用域（作用域的具体解释，书第四章会解释）
      ```js
      if (true) {var a = 1} 
      console.log(a) // 1
      if (true) {let b = 2}
      console.log(b) // Uncaught ReferenceError: b is not defined
      ```
  + 暂时性死区，也就是 let 声明的变量不会在作用域中被提升
  + 全局声明不会变成window对象的数据，var会。同时，let 声明仍然是在全局作用域中发生的，相应变量会在页面的生命周期内存续
  + 无法重复声明
  + 解决了for循环中的变量迭代问题，本质还是存在的作用域问题

3. const 声明

es6新出的关键字，用来声明一个变量，与 let 基本相同，唯一一个重要的区别是用它声明变量时必须同时初始化变量，且 尝试修改 const 声明的变量会导致运行时错误。

## 数据类型

基本类型(简单数据类型): Undefined、Null、Boolean、Number、 String、 Symbol
引用类型(复杂数据类型): Object (Object 类型、Array 类型、Date 类型、RegExp 类型、Function 类型统称为Object类型，因为都是基于Object类型实现的)

***为什么 typeof null == "object" ?***
从设计的逻辑上讲，null表示**一个空对象指针**，因此**定义**将来要保存对象值的变量时，建议使用 null 来初始化，不要使用其他值。

### object 类型及拓展

创建一个变量有两种方式：字面量语法(`var obj = {name: 'Tome'}`)和构造函数创建对象(`var obj = new Object(); obj.name = 'Tom'`)

每个Object**实例**都有如下属性和方法：

+ constructor: 用于创建当前对象的函数。在前面的例子中，这个属性的值就是 Object()函数。
+ hasOwnProperty(propertyName): 用于判断当前对象实例(不是原型)上是否存在给定的属性。要检查的属性名必须是字符串(如 o.hasOwnProperty("name"))或符号 
+ isPrototypeOf(object): 用于判断当前对象是否为另一个对象的原型
+ propertyIsEnumerable(propertyName): 用于判断给定的属性是否可以使用 for-in 语句枚举。与 hasOwnProperty()一样，属性名必须是字符串。
+ toLocaleString(): 返回对象的字符串表示，该字符串反映对象所在的本地化执行环境。
+ toString(): 返回对象的字符串表示。
+ valueOf(): 返回对象对应的字符串、数值或布尔值表示。通常与 toString()的返回值相同。

### 补充

关于for-in遍历，for-of遍历，Object.keys()的不同，建议先了解一下以下几个知识点：[属性的可枚举性和所有权](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)、[可迭代协议](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols)。

## 操作符

本来打算跳过这一节的，但是想想里面还是有很多类似于“八股文”一样的坑和特性，还是值得记录一下的。

+ 递增/递减操作符: ++a, --a(假设变量a是number类型数据，先+1赋值，再做其他操作符的相关计算), a++, a--(先做其他操作符的相关计算，再-1赋值)
+ 上面的a如果不是number类型时，书中已经讲的很清楚了，更多隐式转换的坑，详见这篇[文章](https://juejin.cn/post/6844904190309990413)
+ 位操作符的妙用

  ```js
  // leetcode中有一道经典的题目
  // 数组中，只有一个数出现一次，剩下都出现两次，找出出现一次的数
  // 这道题，运用位运算可以巧妙的解答，学废了吗？
  function singleNumber(arr) {
    let r = 0
    for (let i of arr) { r = r ^ i }
    return r
  }
  ```
+ 关于 `== !=` 和 `=== !==`，`== !=` 会先进行**强制类型转换**，再确定操作数是否相等。`=== !==` 会先判断类型，类型相同后再进行值判断。
+ 对象的强制类型转换，会优先调用`valueOf()`再调用`toString()`, 因此，如果想对对象进行强制类型转换的操作，可以考虑从Object的原型上进行修改
  ```js
  Object.prototype.valueOf = function() {return 1}
  var obj = {name: 2}
  obj.valueOf() // 1
  ```

