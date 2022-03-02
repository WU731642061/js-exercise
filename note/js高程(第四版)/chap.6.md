# 集合引用类型

这一章节的内容比第三版的第六章多了很多内容，主要是把array和set等一些内容集成到这一章来了

这一章和上一章一样，更多的是“技”上的提升，但也包括“术”上的设计思想

## Object

创建一个对象也包含两种方式：
  1. 构造函数创建：`let obj = new Object()`
  2. 对象字面量表示法: `let obj = {}`

其他的关于Object的用法，会在后面几章有详细的解释

## Array

数组也存在两种声明方式：
  1. 构造函数创建：`let arr = new Array(5) // 创建一个长度为5的数组，数组的每个元素都是empty`
  2. 对象字面量表示法: `let arr = [1, 2, 3, 4]`

**类数组**: 拥有`length`属性，`length-0`可隐式转换为number类型，并且不大于`Math.pow(2,32)`

《JS权威指南》上给出了代码用来判断一个对象是否属于“类数组”。

```js
function isArrayLike(o) {
  if (o &&                                    // o 必须存在
      typeof o === 'object' &&                // o 必须是 对象的实例 
      isFinite(o) &&                          // o 是有穷的
      o.length >= 0 &&                        // o 必须是非负数
      o.lenght === Math.floor(o.length) &&    // o 必须是整数
      o.lenght < 4294967296)                  // o 必须小于 2^ 2
      return true
  else {
    return false
  }
}
```

数组方法:
```js
// es6新增

// arrLike: 类数组
// fun: 映射函数, 可以直接增强新数组的值，而无须像 调用 Array.from().map()那样先创建一个中间数组
// obj: 指定映射函 数中 this 的值。但这个重写的 this 值在箭头函数中不适用
Array.from(arrLike, fun, obj) // 将类数组结构转换为数组实例，key中的无法被隐士转换成整数的值都会被转为undefined，
Array.of() // 一组参数转换为数组。这个方法用于替代在 ES6 之前常用的 Array.prototype. slice.call(arguments)

// 实例方法
let arr = [1, 2, 3, 4, 5]
arr.keys() // 返回一个迭代器, [0,1,2,3,4]
arr.values() // 返回一个迭代器，[1,2,3,4,5]
arr.entries() // 返回一个迭代器, [[0,1],[1,2],[2,3],[3,4],[4,5]]

// target：目标索引位置
// startIndedx：开始索引位置
// endIndex: 结束缩影位置，不包括该位置的值
arr.copyWithin(target, startIndedx, endIndex) // 将指定位置的成员复制到其他位置，并会覆盖原有成员
arr.fill(value, startIndedx, endIndex) // 向一个已有的数组中插入全部或部分相同的值

arr.includes(value) // 返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似

// es5及之前的方法总结
let arr = [1, 2, 3, 4, 5]
arr.toString() // "1,2,3,4,5"
arr.join() // "1,2,3,4,5"
arr.join('') // "12345"
// 数组的一些方法
arr.push(6) // [1,2,3,4,5,6] 添加元素
arr.pop() // [1,2,3,4,5] 删除最后一个元素
arr.shift() // [2,3,4,5] 删除最左边的元素
arr.unshift(1) // [1,2,3,4,5] 从最左侧添加元素
arr.reverse() // 翻转数组
arr.sort() // 排序数组，原理是对每个元素调用toString方法，然后根据字符串的值进行排序
// 如果对于sort方法希望进行优化的，比如使得[1,10,15,5]能正确的排序，可以定制一个function作为参数传入sort，如下：
function compareNumber(value1, value2) {
    if (typeof value1 !== "number" || typeof value2 !== "number") {
        throw "all element must be number"
    }
    if (value1 < value2) {
        return -1
    }
    if (value1 > value2) {
        return 1
    }
    return 0

    // 上面的方法也可以这么写
    // return value1 - value2
}
arr.sort(compareNumber) // es2019开始，规定了排序算法必须稳定

arr.contact(6, [7,8,9]) // [1,2,3,4,5,6,7,8,9] 拼接数组
arr.slice(1,3) // [2,3] 函数切片，包含开头，不包含结尾
// 在String类型数据中，切片一共有三种方式，slice，substring和substr，相关异同，在后面记到string的时候一并总结
// arr.splice(position, count, [...replace_item]) 最强大的数组方法，主要实现三种用法: 删除，插入和替换
// 参数分别是，起始位置，个数，替代的元素(1个或多个，用逗号分开)，返回值是被删除的元素组成的数组
arr = [1,2,3,4,5,6]
arr.splice(1, 2) // [2,3] 删除用法，即从第2个元素位置开始删除两个元素，包括开始的元素
arr.splice(1, 0, 999) // [] 插入用法，即在第2个元素后插入999这个元素，原数组变成[1,2,999,3,4,5,6]
arr.splice(1, 2, 'replace item 1', 'replace item 2') // [2, 3] 替换用法，即在第2个元素后删除两个元素，并用相应的元素替换，原数组变成[1, "replace item 1", "replace item 2", 4, 5, 6]

arr = [1,2,3,4,3,2,1]
arr.indexOf(3) // 2 从头开始寻找某个元素，并返回其所在的位置，若不存在，则返回-1
arr.lastIndexOf(3) // 4 从尾部倒序寻找某个元素，并返回其所在的位置，若不存在，则返回-1
arr.indexOf(3, 3) // 4 从指定位置开始寻找某个元素，并返回其所在的位置，若不存在，则返回-1
arr.include(3) // true ES6的用法，判断某个元素是否存在在数组中

arr.map(function(item, index, array){...}) // 对数组的每一项都给定函数，返回每次调用的结果组成的数组
arr.every() // 对数组的每一项都给定函数，如果该函数对每一项都返回true，则返回true
arr.filter() // 对数组的每一项都给定函数，返回该函数会返回true的项组成的数组
arr.forEach() // 对数组的每一项都给定函数，无返回值
arr.some() // 对数组的每一项都给定函数，如果该函数任意一项返回true，则返回true

arr.reduce(function(pre, cur, index, array){...}) // 迭代数组所有的项，然后构建一个最终的返回值
arr.reduceRight() // 从数组的最后一项开始，遍历到数组的第一项

// 网络上有道有趣的题，[1, 2, 3].map(parseInt)，求返回值
// 根据上面写的，上述函数在调用时会传入三个三处，分别是元素item，索引位置index和数组本身
// 这相当于分别调用了该方法 parseInt(1, 0, [1,2,3])，parseInt(2, 1, [1,2,3])， parseInt(3, 2, [1,2,3])
// parseInt第二个形参没指定的时候是10，其次他是具有有效范围滴：[2, 36]和特殊值0，当为0时，则设置为默认值10
```

## 定型数组 typed array

这是在第三版没有提出来的概念，是一种特殊的包含数值类型的数组

**ArrayBuffer**: 可用于在内存中分配特定数量的字节空间
```js
let buf= new ArrayBussfer(32) // 在内存中分配32个字节
buf.byteLength // 32

// ArrayBuffer 一经创建就不能再调整大小。不过，可以使用 slice()复制其全部或部分到一个新 实例中
const buf1 = new ArrayBuffer(16)
const buf2 = buf1.slice(4, 12)
alert(buf2.byteLength); // 8
```

**想法**：这一节有些过于抽象了，读了两遍也没想到应用场景，日后能明白这一块的内容再补充

## Map

Map用来建立一种`key/value`的映射关系，类似于object，但是其中有一些不同(下面讨论)，es6新增数据类型

特点：
  1. 与object的不同, Object 只能使用数值、字符串或符号作为键不同，Map 可以使用任何 JavaScript 数据类型作为键
  2. 

关于如何使用，建议看代码
```js
const m = new Map() // 实例化一个map实例
const m1 = new Map([  // 使用嵌套数组初始化映射 
      ["key1", "val1"],
      ["key2", "val2"],
      ["key3", "val3"]
])

// map实例方法
m.set('myKey', 'myValue') // Map(1) {"myKey" => "myValue"}，返回映射实例，因此可以链式调用，例如：m.set().set()
m.get('myKey') // myValue，返回对应键的返回值

m.size // 1, 获取映射中的键/值对的数量

m.has('myKey') // true，检查key是否存在
m.delete('myKey') // true, 删除制定key，如果key不存在，返回false
m.clear() // 无返回值，清除所有

m.keys() // 返回一个迭代器，包含map所有的key值
m.values() // 返回一个迭代器，包含map所有的value值
m.entries() // 返回一个迭代器，包含一个数组[key, value]
m.forEach(function(value, key, map) {
  console.log("Key: %s, Value: %s", key, value);
}) // 遍历map

// 特点1的特殊情况
let key1 = {name: 'a'}
let key2 = {name: 'a'}

m.set(key1, 'a') // Map(1) {{…} => "a"}
m.set(key2, 'b') // Map(2) {{…} => "a", {…} => "b"}

m.get(key1) // a
m.get(key2) // b
m.get({name: 'a'}) // undefiend
// 上述可以看出，存入的并非是实际的值，而是内存的地址
```

map和object对比之 ———— 性能问题：
  1. 内存占用
    Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。 不同浏览器的情况不同，但给定固定大小的内存，Map 大约可以比 Object 多存储 50%的键/值对。 
  2. 插入性能
    向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快 一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。如果代码涉及大量插入操 作，那么显然 Map 的性能更佳。
  3. 查找速度
    与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对， 则 Object 有时候速度更快。在把 Object 当成数组使用的情况下(比如使用连续整数作为属性)，浏 览器引擎可以进行优化，在内存中使用更高效的布局。这对 Map 来说是不可能的。对这两个类型而言， 查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选 择 Object 更好一些。
  4. 删除性能
    使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此， 出现了一些伪删除对象属性的操作，包括把属性值设置为undefined或null。但很多时候，这都是一 种讨厌的或不适宜的折中。而对大多数浏览器引擎来说，Map 的 delete()操作都比插入和查找更快。 如果代码涉及大量删除操作，那么毫无疑问应该选择 Map。
  
这篇[文章](http://www.manongjc.com/detail/19-tkgoigjzvazgboa.html)对上面四个方向做了一些解释，可以参考

## WeakMap

弱映射，这里直接记录一段阮一峰老师的es6的原文：

    WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有keys()、values()和entries()方法），也没有size属性。
    因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。
    这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持clear方法。
    因此，WeakMap只有四个方法可用：get()、set()、has()、delete()。

## Set

Set是es6提供的一种新的数据结构，类似于数组，但是成员的值都是唯一的，没有重复的值。

常规方法如下：
```js
const set = new Set() // 可以传入一个可迭代对象，类似于数组，但是成员的值都是唯一的，没有重复的值

set.size() // 0, 返回元素数量

// add()和 delete()操作是幂等的
set.add('value') // 返回set实例，因此可以链式调用
set.has('value') // true, 检查是否存在某个值
set.delete('value') // true, 删除某个值
set.clear() // true, 销毁集合实例中的所有值

// 由于set内部实现了迭代器，因此也是可迭代的
// 由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致
set.keys() // 返回键名的遍历器
set.values() // 返回键值的遍历器
set.entries() // 返回键值对的遍历器
set.forEach(function(value, key) {
  console.log("Key: %s, Value: %s", key, value);
}) // 使用回调函数遍历每个成员
```

## WeakSet

弱集合, 这里直接记录一段阮一峰老师的es6的原文：

    WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
    首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

## 迭代与扩展操作

这里书上主要讲了如何迭代，其实我更想知道的是扩展操作符的原理，它是基于哪些特性才能做到结构的，于是去查阅了一些文章。

[规范](https://tc39.es/proposal-object-rest-spread/)中，是这样定义扩展操作的：
> Rest properties collect the remaining field names that are not already picked off by the destructuring pattern. Those keys and their values are copied onto a new object.

从上面那句话可以得出，主要是通过浅拷贝进行一个赋值操作，以下是babel对扩展操作的一个转译操作

```js
"use strict";
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

var arr = [1, 2, 3];
var obj = {
  name: 'hello'
};

// 如果是数组，会直接使用数据方法处理
console.log([].concat(arr));

// 如果是object，使用内置的工具函数把属性拷贝出来
console.log(_objectSpread({}, obj));
```

## 面试题补充

实现map和用map实现reduce，现在的面试题是真的千奇百怪啊

```js
Array.prototype.myMap = function(fn, cbThis) {
    const r = []
    const list = this
    let callbackThis = cbThis || null
    list.reduce((pre, aft, index, arr) => {
        r.push(fn.call(callbackThis, aft, index, arr))
    }, 0)
    return r
}

Array.prototype.myReduce = function(fn, initValue) {
    const list = this
    let r = initValue || list[0]
    for (let i = initValue ? 0: 1; i < list.length; i++) {
        r = fn(r, list[i], i, list)
    }
    return r
}
```