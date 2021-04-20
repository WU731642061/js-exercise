<!--
 * @Author: yiwen.wu
 * @Date: 2021-04-06 11:09:14
 * @LastEditTime: 2021-04-20 09:06:17
 * @LastEditors: yiwen.wu
 * @Description: 
 * @FilePath: /js-exercise/note/js高程(第四版)/chap.4.md
-->
# 变量、作用域和内存

## 原始值和引用值

原始值: 内存中存贮着变量的原始值
原始值包括: Undefined、Null、Boolean、Number、String 和 Symbol

引用值: 内存中保存着对值的引用
引用值包括: Object(以及由object而构造出的Array 和 Function 等)

当复制基本类型的数据时，开辟新的内存，复制该值，因此两个变量互相不影响
```js
var a1 = 5 
var a2 = a1 
```

当复制引用类型的数据时，也会将该值复制一份到新的变量所开辟的空间中去，实际上，该值的本质是指向对内存中对象的指针，因此，两个变量任何一方修改该对象，都会导致值的变化
```js
var obj1 = { x:1 }
var obj2 = obj1
```

js中的参数传递的本质就是将基本类型值和引用类型值复制给一个局部变量(或称之为命名参数)，需要注意的是，在传递给参数的过程中，所有的传递都是按值传递的
如何理解传递是按值传递的，可以通过一个例子
```js
function setName(obj) {
    obj.name = 'God'
    obj = new Object
    obj.name = 'Tom'
}

var person = new Object
setName(person) // {name: "God"}
console.log(person)
```

上述函数将参数的地址复制一份，按值传递地址
即引用复制（reference-copy）传递大多数编程语言都采用这种方式传递复杂类型的参数。
特征：对于变量的成员进行修改时，会直接影响原变量；而如果对传递过来的变量进行重新赋值，则不会影响原变量，并且此后再修改变量的成员，也不会影响原变量。

## 关于类型检测

typeof虽然很好用，但是只能检查出部分基本类型和引用类型之间的区别
当需要检测的对象都是引用类型或null时，typeof就不那么好用了，因为都会返回为obejct
因此，引出了另一个方法判断，即 instanceof
如果变量是给定引用类型的实例，则 instanceof 操作 符返回 true

```js
let arr = []
arr instanceof Array // true
arr instanceof Object // true
var obj = {}
obj instanceof Object // true
arr instanceof Object // true, 由于所有引用类型的本质都是Object的实例，所以instanceof Objrct都会返回true
function test(){}
test instanceof Function // true 任何在内部实现call方法的对象使用typeof都应当返回function，因此在safari和chrome中对正则使用typeof返回的是function，而在ie和火狐浏览器中返回的是object
test instanceof Object // true
```

## 执行上下文 和 作用域

**变量对象**: 存在于每一个上下文中，上下文中定义的所有变量和函数都存在于这个对象上，无法通过代码访问，为js引擎内部处理时所用到的机制

全局上下文: 在浏览器中，全局上下文就是我们常说的 window 对象，通过var声明的变量会挂在到window上，使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的

上下文中的代码在执行的时候，会创建变量对象的一个**作用域链(scope chain)**。这个作用域链决定 了各级上下文中的代码在访问变量和函数时的顺序。代码正在执行的上下文的变量对象始终位于作用域链的最前端。如果上下文是函数，则其**活动对象(activation object)**用作变量对象

用一段代码和一张图表示一下

```js
var top = '我是顶层'

function createTop() {
  let outerTop = '我是函数内部的top'

  function getTop () {
    let innerTop = outerTop
    console.log(outerTop)
    console.log(top)
  }
  getTop()
}

createTop()
```

上述代码中，按照红宝书中的说法，执行到`createTop`方法时，会创建一个作用域链，里面包含着变量对象，执行到`getTop`时，也会创建属于`getTop`的作用域链
那么`getTop`的作用域链应当如下

```
window
  |
  ╰─── top
  |
  ╰─── createTop()
          |
          ╰─── arguments
          |
          ╰─── outerTop
          |
          ╰─── getTop()
                  |
                  ╰─── arguments
                  |
                  ╰─── outerTops 
```

当上下文代码执行完毕后，会被js的垃圾回收机制回收，全局上下文只有在宿主环境结束时，才会被回收

## 变量声明(初级面试常考题)

由于第三章的笔记里已经有了，这里只是一些补充：

> 块级作用域包括: 由 {} 界定。包括 if 块、while 块、function 块，甚至连单独 的块也是 let 声明变量的作用域

## 垃圾回收

1. 标记清除(mark-and-sweep): 当变量进入上下文，比如在函数 内部声明一个变量时，这个变量会被加上存在于上下文中的标记。而在上下文中的变量，逻辑上讲，永 远不应该释放它们的内存，因为只要上下文中的代码在运行，就有可能用到它们。当变量离开上下文时， 也会被加上离开上下文的标记

2. 引用计数(reference counting): 需要注意的是，循环引用会导致无法释放，内存无法回收，例如 var a = {}; var b = {}; a.x = b; b.y = a; a和b的引用次数都是2，导致两边的计数次数都是2，永远无法被回收

## 补充

1. 浏览器会分配给页面多少内存？

    书中有一句话：JavaScript 运行在一个内存 管理与垃圾回收都很特殊的环境。分配给浏览器的内存通常比分配给桌面软件的要少很多，分配给移动 浏览器的就更少了。这更多出于安全考虑而不是别的，就是为了避免运行大量 JavaScript 的网页耗尽系 统内存而导致操作系统崩溃。这个内存限制不仅影响变量分配，也影响调用栈以及能够同时在一个线程 中执行的语句数量。

    那么一个页面的内存使用多少后，会引发页面崩溃呢？

    > 网上并没有查到官方的数据，但是有其中几篇文章提到过，以chrome为例，47，56等版本页面内存占用1.4～1.8g时，页面极其卡顿然后崩溃。
    > 在64及之后的高版本中，可以达到3.5g左右
  
    **TODO**: 之后会做一个测试，来通过纯js创建，dom等因素，来测试代码量和内存的关系

2. LHS 和 RHS (Left Hand Side和 Right Hand Side)

    这是我在《你不知道的js》第一章中学到的一个概念，具体可以参考[文章](https://segmentfault.com/a/1190000010645079)

3. 隐藏类(性能优化，V8专享)

   原文：V8 会将创建的对象与隐藏类关联起来，以跟踪它们的属性特征。能够共享相同隐藏类 的对象性能会更好，V8 会针对这种情况进行优化，但不一定总能够做到(代码示例建议看书)。核心解决思想: **先创建再补充(ready-fire-aim)式的动态属性赋值**，其次就是善于使用设置null 而非 delete
  