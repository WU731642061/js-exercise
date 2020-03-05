// 引用类型的创建方法
// new Object构造新对象
var obj = new Object
obj.name = 'Tom'
obj.age = 25
obj['favourite food'] = 'apple'
// 对象字面量表示法，即: var obj = {}

// js数组的特点
// 1: 有序列表
// 2: 每一项可以保存任何类型的数据，包括基本类型和也能用类型(对象，方法等)
// 3: 数组的大小是动态调整的
// 创建数组的方式：
// new Array构造新数组
var arr = new Array('red', 'green', 'blue')
// 当创建新数组时传递的值为数值，则会创建一个length为该值的长度的数组
var num_arr = new Array(10) // [empty × 10]
// 数组字面量表示法，即：var arr = [1,2,3]
// 注意，不要使用如下写法，[1,2,3,] or [,,,]，这两种写法在不同浏览器中(如ie8之前)会产生不同长度的数组
// 数组的length并不是只读属性，可以通过修改arr.length的值来修改数组的长度
// 数组的最大长度是42.9亿，超过这个长度，数组将报错
// 检测数组
typeof Array === "function" // true
typeof [] === "object" // true
[] instanceof Array // true
[] instanceof Object // true  由于所有引用类型的本质都是Object的实例，所以instanceof Objrct都会返回true
Array.isArray([]) // true es5中Array提供的新方法，可以判断某个值是不是数组，当然，要考虑兼容性


// 这里多次提到了typeOf和instanceOf，这边我就根据自己找到的资料，简述一下两者的不同
// typeof 为一元运算符，用来返回操作数类型的字符串。
typeof undefined  ===  "undefined"
typeof null  ===  "object" // JavaScript 诞生以来便如此
typeof Boolean  ===  "boolean"
typeof Number  ===  "number"
typeof new Number(123) === "object"
typeof Infinity === "number"
typeof NaN === "number" // 尽管它是 "Not-A-Number" (非数值) 的缩写
typeof String  ===  "string"
typeof new String("foo") === "object"
typeof Array === "function" //为什么这里返回的是function，根据ECMA-262 规范实现 [[Call]]的对象，都会返回function
typeof new Array() === "object"
typeof [1,2,3] === "object"
typeof Object === "function" 
typeof new Object() === "object"
typeof {} === "object"

// 除此之外，还有一个表示对象内部属性的[[Class]] 的值
// JavaScript 标准文档中定义: [[Class]] 的值只可能是下面字符串中的一个：
// Arguments, Array, Boolean, Date, Error, Function, JSON, Math, Number, Object, RegExp, String，null，undefined
// 为了获取对象的 [[Class]]，我们需要使用定义在 Object.prototype 上的方法 toString。
Object.prototype.toString.call([]) // "[object Array]"
Object.prototype.toString.call({}) // "[object Object]"
// 就目前来说，用这种方法判断对象的类型是最准确的，但是相对复杂一些，当然，可以封装一个方法去判断类型
function is(type, obj) {
    var cls = Object.prototype.toString.call(obj).slice(8, -1)
    if (typeof type != "string"){
        throw "Type must be String"
    } 
    return type.toLowerCase() === cls.toLowerCase()
}

// 关于instanceof，instanceof 运算符是用来测试一个对象是否在其原型链原型构造函数的属性，返回值是true，false
// 记住上面那句话即可
Function instanceof Object // true
Array instanceof Function // true
Array instanceof Object // true

// toString和join方法
var arr = [1,2,3,4,5]
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
arr.sort(compareNumber)

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

arr.every() // 对数组的每一项都给定函数，如果该函数对每一项都返回true，则返回true
arr.filter() // 对数组的每一项都给定函数，返回该函数会返回true的项组成的数组
arr.forEach() // 对数组的每一项都给定函数，无返回值
arr.map(function(item, index, array){...}) // 对数组的每一项都给定函数，返回每次调用的结果组成的数组
arr.some() // 对数组的每一项都给定函数，如果该函数任意一项返回true，则返回true

arr.reduce(function(pre, cur, index, array){...}) // 迭代数组所有的项，然后构建一个最终的返回值
arr.reduceRight() // 从数组的最后一项开始，遍历到数组的第一项

// 网络上有道有趣的题，[1, 2, 3].map(parseInt)，求返回值
// 根据上面写的，上述函数在调用时会传入三个三处，分别是元素item，索引位置index和数组本身
// 这相当于分别调用了该方法 parseInt(1, 0, [1,2,3])，parseInt(2, 1, [1,2,3])， parseInt(3, 2, [1,2,3])
// parseInt第二个形参没指定的时候是10，其次他是具有有效范围滴：[2, 36]和特殊值0，当为0时，则设置为默认值10


// 关于Date类型
// Date使用的是UTC时间，从1970年1月1日0时开始经过的毫秒数来保存日期
var date = new Date() // 在不传参数的情况下，自动获得当前的日期和时间，可接受生成日期的毫秒数
Date.UTC() // 依次传入年，月(从0开始到11), 日，时，分(从0到23)，秒
Date.parse() // 简单地将格式化的字符串参数转换成毫秒数，支持的格式较多，就不一一举例了，举几个常用的：
Date.parse("01/01/2020");Date.parse("2020-01-01T00:00:00")
var newDate = new Date(Date.parse("2020-01-01"))
// 上述写法等价于 var newDate = new Date("2020-01-01") 因为new Date内部会自己调用Date.parse()方法
// 日期格式化，不同的浏览器实现的结果可能略有不同，这边只是介绍一下date的格式化方法
date.toDateString() // "Sun Feb 02 2020"
date.toTimeString() // "21:24:30 GMT+0800 (中国标准时间)"
date.toLocaleDateString() // "2020/2/2"
date.toLocaleTimeString() // "下午9:24:30"
date.toUTCString() // "Sun, 02 Feb 2020 13:24:30 GMT"

// 关于RegExp类型(正则)
// var exp = / pattern / flags; 
// 其中pattern代表模式，可以是任何简单或者复杂的正则表达式
// flags代表着标志，js支持三种标志：
// g(globan)即全局模式，该模式将被应用于所有的字符串，而非发现第一个匹配到的结果就停止
// i(case-insensitive)模式，即匹配时忽略大小写
// m(multiline)多行模式，即在到达一行文本末尾时，还会继续查找下一行
// js的正则可以支持一个flag或者多个flags的组合，如下

var txt = "135xxxxxxxx135x123x135\
           13512345678\
           139xxxxxxxx\
           13912345678\
           abcd\
           ABCD"
var exp1 = /135/g
var exp2 = new RegExp("135", "g") //该写法等价于上面那种变量声明
// 有趣的例子
// 根据es5规定，使用正则字面量必须保持和直接调用new RegExp一致，因此在ie9+，firefox和chrome中，每次都会返回true，而在其他版本中，实例属性不会被覆盖
var testTxt = "135xxx12345", exp1 = null;
for (var i = 1; i<=10; i++){
    exp1 = /135/g
    exp1.test(testTXT)
} 
// 正则实例属性
// global: 布尔值，表示是否设置了g标志
// ignoreCase: 布尔值，表示是否设置了i标志
// lastIndex: 整数，表示开始搜索下一个匹配项的字符位置，从0开始
// multiline: 布尔值，表示是否设置了m标志
// source: 字符串，正则表达式的字符串表达形式， 例如 /\"[123]\"/g.source  === "\"[123]\""
// 正则实例方法
var testTxt = "mother father son"
var exp3 = /mother (father (son)?)?/g
var pattern = exp3.exec(testTxt) //  ["mother father son", "father son", "son", index: 0, input: "mother father son", groups: undefined]
// exec方法会返回一个数组，但还会包括两个属性，index和input，index表示匹配项在字符串中的位置，input代表输入的值
// 当使用g标志时，每次调用exec方法，都会返回字符串中的下一个匹配项，而不是用g标志，每次都返回第一个匹配项

//关于Function
// 函数的本质是对象，每个方法其实是Function类型的实例，函数名是一个指向函数对象的指针，并不与函数本身绑定
// 为了理解上面那句话，给出如下例子
function sum(v1, v2){ return v1 + v2 } //这种方式称之为"函数声明"
var sum2 = function(v1, v2){return v1 + v2} //这种方式称之为"函数表达式"
var anotherSum = sum
sum(1,1) // 2
anotherSum(1,1) // 2
sum = null
anotherSum(1,1) // 2
// 函数声明和函数表达式的区别，函数声明拥有函数提升的特性，能够在执行任何代码之前调用，而函数表达式只能在解析器运行到一行之后才能调用
console.log(testF())
function testF(){return 1} // 能够正常调用
console.log(testF2())
var testF2 = function(){return 2} // 报错

// 利用闭包的特性，可以实现一些数组内对象的排序
var data = [{name:'Tom', age:18}, {name:'Eric', age:20}, {name:'Sam', age: 15}]
// 如果想实现根据姓名排序或者根据年龄排序，使用sort是不行的，因为sort只会对array的每一个元素调用toString方法，得不到想要的结果，
// 而简单的自定义函数，只能针对array内对象的单一元素进行排序，因此，要利用闭包的特性，实现可以定制化的排序方法，如下
function compareFunction(argument){
    return function(obj1, obj2){
        var value1 = obj1[argument]
        var value2 = obj2[argument]
        return value1 - value2
    }
}

// arguments, 函数内部的特殊属性，一个类数组对象，包含传入函数中的所有参数，不管你有没有设置参数名称
// callee是arguments的内部属性，是一个指针，指向拥有arguments对象的函数
function factorial(num){
    if (num <= 1){
        return 1
    } else {
        // return num * factorial(num-1)
        return num * arguments.callee(num - 1) // 严格模式下不可用
    }
}
// 上述这种写法的好处是，当函数被其他变量引用时，就会出现问题，即：var someOtherFunction = factorial, factorial = null 

// 关于this
// this指向的是函数据以执行的环境对象，注意最后四个字，环境对象

// 关于函数属性和方法
// 每个函数都包含两个属性：length和prototype
// length表示希望接受的命名参数的个数，如:
function xxx(num1, num2){}; xxx.length  // 2
// prototype代表着函数的原型，是保存函数实例方法的真正所在(详细讲解在下一章笔记中)

// 关于call，apply，bind，可以详见关于之前写过的笔，除此之外，补充一点，call,apply和bind是特殊的，非继承而来的

// 关于基本包装类型
// 基本类型值不是对象，从逻辑上来说，他们不应该有属性方法，但实际上，他有自己的方法，但是开发者无法为字符串添加属性或方法
var s1 = 'paint'
s1.color = 'red' // 在这一步，实际上经历了三个过程，通过 new String创建字符串，添加color属性，销毁String对象，因此下一行想读取时，已经被销毁了
s1.color // undefined 

// 关于Number
var num = 10
num.toString() // '10'
num.toString(2) // '1010' toString()方法可以接受一个参数，返回几进制数下的字符串形式
num.toFixed(2) // "10.00" toFixed()方法返回指定位数的字符串形式
num.toExponential(1) // 1.0e+1 toExponential()方法返回e表示法的结果，参数输出指定结果中的小数位数
num.toPrecision(1) // 1e+1 toPrecision()返回固定大小格式，参数输出所有数字的位数，如2则返回10，3则返回10.0，通常情况下，最多支持21位小数，依据浏览器的不同会有所不同

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





