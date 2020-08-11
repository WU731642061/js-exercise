// js分基本类型值和引用类型值，基本类型值即：Number, String, Boolean, Null和Undefined，引用类型值即: Object

var a1 = 5 
var a2 = a1 
// 当复制基本类型的数据时，开辟新的内存，复制该值，因此两个变量互相不影响

var obj1 = { x:1 }
var obj2 = obj1
// 当复制引用类型的数据时，也会将该值复制一份到新的变量所开辟的空间中去，实际上，该值的本质是指向对内存中对象的指针，因此，两个变量任何一方修改该对象，都会导致值的变化

function test(num, obj){
    num += 1
    obj.x = 1
    console.log(num)
    console.log(obj)
}
// js中的参数传递的本质就是将基本类型值和引用类型值复制给一个局部变量(或称之为命名参数)，需要注意的是，在传递给参数的过程中，所有的传递都是按值传递的
// 如何理解传递是按值传递的，可以通过一个例子

function setName(obj) {
    obj.name = 'God'
    obj = new Object
    obj.name = 'Tom'
}

var person = new Object
setName(person)
console.log(person)

// 上述函数将参数的地址复制一份，按值传递地址
// 即引用复制（reference-copy）传递大多数编程语言都采用这种方式传递复杂类型的参数。
// 特征：对于变量的成员进行修改时，会直接影响原变量；而如果对传递过来的变量进行重新赋值，则不会影响原变量，并且此后再修改变量的成员，也不会影响原变量。


// 关于类型检测
// typeof虽然很好用，但是只能检查出部分基本类型和引用类型之间的区别
// 当需要检测的对象都是引用类型或null时，typeof就不那么好用了，因为都会返回为obejct
// 因此，引出了另一个方法判断，即 instanceof
let arr = []
arr instanceof Array // true
var obj = {}
obj instanceof Object // true
arr instanceof Object // true, 由于所有引用类型的本质都是Object的实例，所以instanceof Objrct都会返回true
function test(){}
test instanceof Function // true 任何在内部实现call方法的对象使用typeof都应当返回function，因此在safari和chrome中对正则使用typeof返回的是function，而在ie和火狐浏览器中返回的是object
test instanceof Object // true


// 关于执行环境和作用域
// 这段我觉得实在是太经典了，解释了全局变量和局部变量之间的关系，因此我把它打了下来：
// 当代码在一个环境中执行时，会创建变量对象的一个作用域链(scope chain)。作用域链的用途，是保证对执行环境有权访问的所有变量和函数的有序访问。
// 作用域链的前端，始终都是当前执行的代码所在环境的变量对象。如果这个环境是函数，则将其活动对象作为变量对象。
// 活动对象在最开始时只包含一个变量，即arguments对象。作用域链中的下一个变量对象来自包含(外部)环境，而再下一个变量对象则来自下一个包含环境。
// 这样，一直延续到全局执行环境(在web浏览器中为windows对象)；全局执行环境的变量对象始终都是作用域链中的最后一个对象。

// 使用var申明的变量对象是没有块级作用域的(指基于花括号的块级作用域)，即在作用域块代码被执行完成后，变量声明会将变量添加到当前执行环境中去，例如：通过if和for声明的变量
// 注：使用var声明的变量会被自动添加到最近的环境中去，如在函数内部声明，则被添加到函数对象中去
// 同时，如果不使用var声明，默认被添加到全局变量中去
// 在es6中，let和const两个声明变量的方法很好的解决了这一点


// 关于垃圾收集
// 标记清除：当变量进入环境(例如在函数中声明一个变量)，则变量被标记为“进入环境”，当变量离开环境时，则被标记为“离开环境”
// 引用计数：需要注意的是，循环引用会导致无法释放，内存无法回收，例如 var a = {}; var b = {}; a.x = b; b.y = a;
//         a和b的引用次数都是2，导致两边的计数次数都是2，永远无法被回收
