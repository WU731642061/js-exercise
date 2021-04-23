# 基本引用类型

这一章主要是对Date、正则、原始值包装类型等一些js内置的`引用类型`的详细解释，使用方法说明

这一章更多的是对“技”的一种提升，之前一些内置对象用法比较薄弱，正好可以通过这一章补一补

## Date

协调世界时(UTC，Universal Time Coordinated)
计算机时间初始值：1970 年 1 月 1 日午夜(零时)
Date 类型保存的是初始值至今所经过的**毫秒数**

```js
let now = new Date() // Thu Apr 22 2021 09:48:59 GMT+0800 (中国标准时间) Data的构造方法
Date.UTC() // 返回毫秒数  依次传入年，月(从0开始到11), 日，时，分(从0到23)，秒
Date.parse() // 返回毫秒数 简单地将格式化的字符串参数转换成毫秒数，支持的格式较多
```

#### 一些建议和想法：
  + 善用编辑器的`.`功能，可以快速的查看Date实例有哪些方法可以调用
  + 现在项目往往是前后端分离的，大多数的时间戳都是后端直接处理通过字符串的形式返回，当然也有少部分情况下前端提交的，这时候要保证和后端交互的数据格式，不然会经常报错

## RegExp

基本的表达方式: `let reg = /pattern/flags`
构造函数表达法: `let reg = new RegExp("pattern", "flag")`

pattern: 可以是任何简单或复杂的正则表达式，包括字符类、限定符、 分组、向前查找和反向引用
flags: 用于控制正则表达式的行为

    g:全局模式，表示查找字符串的全部内容，而不是找到第一个匹配的内容就结束。 
    i:不区分大小写，表示在查找匹配时忽略 pattern 和字符串的大小写。
    m:多行模式，表示查找到一行文本末尾时会继续查找。
    y:粘附模式，表示只查找从 lastIndex 开始及之后的字符串。
    u:Unicode 模式，启用 Unicode 匹配。
    s:dotAll 模式，表示元字符.匹配任何字符(包括\n 或\r)。

RegExp实例有两个常用方法，`exec` 和 `test`, 用这些方法可以做一些需要的正则验证，当然也可以用String的方法去做一些匹配，例如`str.match()`等

这篇[文章](https://juejin.cn/post/6844904085179596813)提供了一些常用的正则，日后可能会用到，保存一下

#### 正则的进阶

除了了解常规的正则匹配方法，也需要了解一些正则的进阶使用，例如贪婪非贪婪等等，有助于业务的开发，同时有助于阅读webpack源码中的编译部分代码

这边留了一些文章，供日后查阅：
  1. [正则表达式系列之中级进阶篇](https://juejin.cn/post/6844903635508264967)
  2. 如果想系统学习，还是建议阅读动物书[正则表达式](https://book.douban.com/subject/2154713/) 


## 原始包装类型(基本包装类型——第3版的叫法)

原始类型值不是对象，从逻辑上来说，他们不应该有属性方法，但实际上，他有自己的方法，但是开发者无法为字符串添加属性或方法

```js
let s1 = 'paint'
s1.color = 'red' // 在这一步，实际上经历了三个过程，通过 new String创建字符串，添加color属性，销毁String对象，因此下一行想读取时，已经被销毁了
s1.color // undefined 
```

以下是一些常用的string或者number类型数据的方法

```js
// 关于Number
var num = 10
num.toString() // '10'
num.toString(2) // '1010' toString()方法可以接受一个参数，返回几进制数下的字符串形式
num.toFixed(2) // "10.00" toFixed()方法返回指定位数的字符串形式
num.toExponential(1) // 1.0e+1 toExponential()方法返回e表示法的结果，参数输出指定结果中的小数位数
num.toPrecision(1) // 1e+1 toPrecision()返回固定大小格式，参数输出所有数字的位数，如2则返回10，3则返回10.0，通常情况下，最多支持21位小数，依据浏览器的不同会有所不同
// es6新增
num.isInteger() // 用于辨别一个数值是否保存为整数

// 关于String
// 字符串有自己的属性，如length等，也有相关的字符串方法，具体如下
var str = 'hello world'
str.charAt(1) // e 该方法返回指定参数位置的字符, ie7之后的版本也可以通过str[1]的形式来访问
str.charCodeAt(1) // 101 该方法返回指定参数位置的字符串的字符编码
str.contact('!'， ' I am Tom') // hello world! I am Tom 字符串拼接，可以接受任意多个参数,实际上用'+'号更加方便
// slice, substring, substr都是字符串切片，但是其中的参数意义有所区别
str.slice(3,7) // 第一个参数：字符切片的起始位置，第二个参数：字符串切片的结束位置，负值：负值与字符串长度相加
str.substring(3,7) // 第一个参数：字符切片的起始位置，第二个参数：字符串切片的结束位置，负值：将负值转换成0
str.substr(3,7) // 第一个参数：字符切片的起始位置，第二个参数：字符个数，负值：第一个负值加上字符串长度，第二个负值转换成0
str.indexOf('l') // 2，查找第一个匹配到的字符串位置
str.lastIndexOf('l') // 9，逆序查找第一个匹配到的字符串位置
str.indexOf('l', 6) // 9，第二个参数表示从第几个字符开始搜索，lastIndexOf也可以接受第二个参数，即从第几个字符开始倒叙搜索
var str1 = '   xxx   '
str1.trim() // xxx, 删除字符串前后的空格，返回的是字符串副本，不会修改原字符串
str.toUpperCase() // HELLO WORLD, 转换成大写
str.toLowerCase() // hello world, 转换成小写
str.replace(/l/g, 'a') // heaao worad 字符串替换
str.split(' ') // ["hello", "world"] 字符串分割
// es6 新增
str.startsWith('h') // true 判断字符串是否以参数的值开始
str.endsWith('d') // true 判断字符串是否以参数的值结束
str.includes('llo') // true 判断字符串是否包含参数内的值
str.padStart(15, 's') // sssshello world 复制字符串，如果小于指定长度，则在相应一边填充字符，直至满足长度条件
str.padEnd(4) // 第二个参数是可选的填充字符串，默认为空格
```

## 单例内置对象

内置对象：任何由 ECMAScript 实现提供、与宿主环境无关，并在 ECMAScript 程序开始执行时就存在的对象

## 疑惑

1. 通常情况下，我们实例化一个构造函数，返回值是一个对象，但是上面的now的返回值却是一个字符串，看了一下，和now.toString()返回值是一致的，now.valueOf()的返回值是毫秒数。`typeof now`的返回值依然是`object`，这里实现的方式，依旧百思不得其解，还是这是底层设计时就是这么决定的？
