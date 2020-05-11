// 面向对象的程序设计

var person = {
    age: 11,
    name: 'Tom',
    job: 'engineer',
    enjoy: ['ball', 'music', 'game'],
    sayName: function(){
        return "I am Tom."
    }
}
// 对象的属性类型：数据属性和访问器属性，在js中无法直接访问他们，
// 即你无法通过person.age.value这种方式去访问他，即使每个对象的属性存在此类的数据属性(也有文章称他们为元属性，明白在说什么即可)
// 数据属性：
// Configurable: 表示能否通过delete删除属性从而从新定义属性，能否修改属性的特性(后面解释)，默认值是true
// Enumerable: 表示能否通过for-in循环返回属性，默认值是true
// Writable: 表示能否修改属性值，默认为 false(老版本默认值是true，现在默认值是false)
// Value: 包含这个属性的数据值，读取的时候，从这个位置读取，写入的时候，把新值保存在这个位置。默认值是undefined，如果你给属性赋值，那么value即为指定值

// 如果你希望访问/修改上数据属性，需要通过Object.defineProperty()方法
Object.defineProperty('属性所在的对象'，'属性名称', '描述对象') // 描述对象指的是数据属性所组成的对象，可以是一个或多个值，如下

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

// 访问器属性：
// 访问器属性不包含数据值，取而代之的是两个方法，getter和setter函数，访问器属性同样也包括四个属性
// Configurable: 表示能否通过delete删除属性从而从新定义属性，能否修改属性的特性(后面解释)，默认值是true
// Enumerable: 表示能否通过for-in循环返回属性，默认值是true
// get: 读取属性时调用的函数，默认值为undefined
// set: 设置属性时调用的函数，默认值为undefined
// 一旦设置了get和set函数，就不能设置数据属性中的writable和value
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
// 这个功能有什么用，看似很多余的一个功能，其实在vue中是实现整个架构的重要组成。
// 在严格模式下，必须同时指定get和set方法，不然会报错

// 定义多个属性
var book = {}
Object.defineProperties(book, {_year:{value:2020, writable: true}, 
                               edition:{value:1, writable: true}, 
                               year:{get:function(){return this._year},
                                     set:function(newVal){
                                         if (newVal <= 2020){
                                             this._year = newVal
                                             console.log(newVal)
                                             console.log(this._year)
                                         }
                                     }
                                  }
                               })
// 上述方法可以同时定义多个属性，也可以用下面这种写法
var book = Object.defineProperties({}, {...})

// 关于创建对象
// 工厂模式（其实在es6中实现了通过class对象的方法，这里不作讨论）
function createPerson(name, age, job){
    var obj = {}
    obj.name = name
    obj.age = age
    obj.job = job
    obj.sayName = function() { return "I am" + name }
    return obj
}
var person1 = createPerson('Tom', 11, 'xxx')
// 这个做法的优势是，可以无限次调用这个方法，每个方法都将创建一个新的对象，并作为返回值赋予变量
// 缺点是没有解决对象识别的问题，即怎么样知道一个对象的类型

// 构造函数模式
function Person(name, age, job){
    this.name = name
    this.age = age
    this.job = job
}
Person.prototype.sayName = function() {
    return "I am" + this.name
}

var person2 = new Person('God', 99, 'god')
// 相比于工厂模式，构造函数模式没有显示的创建对象，直接将属性和方法绑定到this上，没有return语句
// new操作符一共执行了4步操作：
// 1. 创建一个新的对象
// 2. 将构造函数的作用域赋予新对象(即改变this的指向)
// 3. 执行构造函数的代码(为新对象赋值)
// 4. 返回新对象
// 其实js高程里这边的解释还有一些不完整(比如原型和有返回值的情况等)，更加完整的补充可以参看关于new的知识点笔记

// 关于原型(prototype)
// 每一个函数都有一个原型(prototype)属性，这个属性是一个指针，指向一个对象
// 原型的作用：由特定类型的所有实例共享这个对象(原型)属性和方法
// 上述的Person.prototype.sayName即是原型使用的具体表现
// 注意，可能会产生一个疑惑，下面两种定义实例方法有什么不同
function Demo1(){
    this.say = function(){return 1}
}
function Demo2(){}
Demo2.prototype.say = function(){return 2}
// Demo1中的say，相当于Function的实例，也就是我们每new一个新的Demo1实例，也会创建一个新的say函数实例，不同的实例不共享同一个方法
var demo1_1 = new Demo1(); var demo1_2 = new Demo1()
demo1_1.say == demo1_2.say // false，很显然这边的两个say是完全两个不同的实例方法
// Demo2中的say，由于是挂载在函数原型上，所有的实例通过共享这个原型对象的属性和方法，而不是通过创建新的实例属性和方法
var demo2_1 = new Demo2(); var demo2_2 = new Demo2()
demo2_1.say == demo2_2.say // true，很显然，由于是共享同一个原型方法，因此返回值是true

// 每个构造函数被创建后，都会自动创建一个prototype属性，且这个原型对象都会获得一个constructor属性，是一个指针，指向构造函数本身

// 关于__proto__
// js高程给了一个更加清晰的解答，相较于我看其他文章的时候，原文是这么解释道的：
// 构造函数的实例内部将包含一个指针(即一个内部属性)，指向构造函数的原型对象。ECMA-262第5版管这个指针叫[[prototype]]
// 而在部分浏览器中，__proto__正是这个指针的具体体现，如果某个浏览器没有实现这块，那么这个所谓的指针，即无法被显示的访问到
// 所以很多文章上来就说实例的__proto__属性，我觉得是不够严谨的，因为根据js高程的说法，这个是因为各个浏览器厂商实现了这个[[prototype]]指针

// 关于查询是否是构造函数的实例
Demo2.prototype.isPrototypeOf(demo2_1)  // true，isPrototypeOf可以确定实例和构造函数之间的关系
Object.getPrototypeOf(demo2_1) == Demo2 // true Object.getPrototypeOf返回参数的[[prototype]]值，也就是常说的__proto__指向的对象

// 原型与in操作符
// 在js中，一共有两种情况下使用in操作符：单独使用和for-in使用
"say" in demo2_1 // true 可以判断某个属性是否存在于对象的属性或者原型中
// for-in 将会遍历所有能够通过对象访问的，且可枚举的属性，同时包括实例和原型。这里更多的建议直接看原文，或者参考这篇文章：https://www.cnblogs.com/wujie520303/p/4931384.html

// 寄生模式构造函数
// 基本思想：创建一个函数，该函数的作用是封装创建对象代码，然后再返回新创建的对象。从表面上来看，很像工厂模式，但是其中的不同，下面慢慢品味

function Person(name, age, job) {
    var o = new Object()
    o.name = name
    o.age = age
    o.job = job
    o.sayName = function () {
        console.log('my name is ' + this.name)  // 注意一下这里，这是和工厂模式的不同之处之一
        // 如果不加this，那么我们不管怎么修改实例中的name，这里永远会调用上面对象中的name
    }
    return o
}

var myFriend = new Person('Tom', 15, 'no job')
myFriend.sayName()

// 这里要注意一点，也是上面构造模式中没有提到的，当我们通过new实例化一个对象时，如上面的Person，它是有返回值的，如果返回值是一个object对象，那么得到的值将会是return值
// 以下为示例

function Test () {
    this.name = 'test'
    // 情况一
    return {}
    // 情况二
    // return function () {return 1}
    // 情况三
    // return null
    // 情况四
    // return []
}
// 在情况一下实例化
var test1 = new Test()  // {}  返回值是空对象
// 在情况二下实例化
var test2 = new Test()  // ƒ () {return 1}  返回值是一个方法
// 在情况三下实例化
var test3 = new Test()  // {name: "test"}  虽然typeOf null 的返回值是object，但是这里却没有将null返回给变量
// 在情况四下实例化
var test4 = new Test()  // [] 返回值是空数组

// 回到寄生模式，它可以做什么呢，在某些特殊情况下，创建一个构造函数，然后提供一些额外的方法。
// 什么算是特殊情况，比如我们希望扩展一个Array或者String，但是我们不希望在原生数组的prototype上修改，这样会造成混乱，那么，我们就可以通过这种方式去实现

function SpecialArray () {
    var arr = new Array()
    arr.push.apply(arr, arguments)  // 将所有参数添加到数组中去 
    // 假设我们这个数组只用来传输数字，那么我希望实现一个自定义的快速排序
    arr.quickSort = function (l = this) {
        // 当长度小于等于1时，直接返回
        if (l.length <= 1) {
            return l
        }
        // 这个基准可以时任意值，考虑到整个数组是无序的，所以我们没有必要去取中间值
        // 为啥这么写，因为js不支持像pyhthon那样的l[1:]数组切割，我们用这种方法去删除基准，得到出了基准以外的值组成的数组
        var pivot = l.splice(0, 1)[0]
        var smaller = []
        var bigger = []
        for (var i = 0; i < l.length; i++) {
            if (l[i] < pivot) {
                smaller.push(l[i])
            } else {
                bigger.push(l[i])
            }
        }
        return this.quickSort(smaller).concat([pivot], this.quickSort(bigger))
    }
    return arr
} 

var newArr = SpecialArray(5,3,1,4,6)
newArr.quickSort() // [1,3,4,5,6]
// 这样，不管我们后续如何push新的数据，总能通过调用quickSort方法，获取到排序后的数组
newArr.push(0)
newArr.push(-100)
newArr.quickSort() // [-100, 0, 1, 3, 4, 6]

// 书中如此说明：返回的对象与构造函数或者构造函数的原型属性之间没有关系，这种写法和我们直接在函数外创建一个obj没有本质上的区别，如果能使用其他模式的情况下，不要使用这种模式
// 这段其实我还不能很深刻的体会到，以后如果有体会的话，我会在此补充

// 稳妥构造函数模式
// 稳妥对象：指的是没有公共属性，而且其方法也不引用this对象
// 示例如下：

function Person(name, age, job) {
    var obj = new Object
    // 此处可以定义一些私有变量和方法
    obj.sayName = function () {
        console.log(name)
    }
    return obj
}    
// 在我们使用时，并不同通过new操作符去实例化它
var per = Person('Tom', 11, 'no job') // 从这个角度看来，和工厂模式已经很像了
// 但是还是有不同的，因为我们发现，我们出了调用sayName方法外，没有任何方法可以访问到其内部其他属性，突出了两个字"稳妥"，也可以称之为“安全”

// 关于继承
// 这是这一章的重点，我相信很多面试的时候，也会考你js的继承。
// 关于es6中通过class继承和一些拓展，请参考inheritance那篇笔记


