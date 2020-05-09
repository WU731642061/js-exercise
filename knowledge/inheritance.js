// 关于js的继承
// 网上有一篇文章提供了一共8种实现继承的方式，好记性不如烂笔头，我这边结合js高程里的内容，记录一下js继承的相关知识
// 参考：https://juejin.im/post/5bcb2e295188255c55472db0

// 1.原型链继承

function Father() {
    this.arr = [1,2,3,4,5]
    this.isFater = true
}

Father.prototype.getFatherValue = function() {
    return this.isFater  // 这里的this，在new之后，会指向实例
}

function Son() {
    this.isSon = true
}

// 通过将另一个构造函数的原型指向继承对象的实例，这样就可以完全共享到继承对象的所有属性
Son.prototype = new Father()
// 可以在继承的基础上，添加新的方法
Son.prototype.getSonValue = function() {
    return this.isSon
}
// 最后实例化，这样son就可以得到构造函数Son和构造函数Father的所有属性和方法了
var son = new Son()

// 同样的，这样继承会产生一个问题，就是多个实例在操作引用类型时，会篡改引用类型的数据
var son2 = new Son()

son.arr === son2.arr  // ture
son.arr.push(6)
son2.arr // [1,2,3,4,5,6]
// 会发生这样的原因时，我们访问arr这个引用类型的属性，并不是直接来自于Son构造函数中创建的，而是顺着__proto__去访问Father实例中的属性，所以导致了指向了同一个内存地址
// 同理的，任何两个同类型变量的toStiring方法也都是全等的，因为他们都继承自Object.prototype或者基本类型的prototype.toString方法
// 我这里引用js高程的原话，对我上面的说法做一个解释：
// 引用类型值的原型属性会被所有实例共享；而这也是为什么要在构造函数中，而不是在原型对象中定义属性的原因。
// 在通过原型来实现继承时，原型实际上会变成另一个类型的实例。原先的实例属性也就顺理成章地变成了现在的原型属性了。
// 从而导致了共享的问题题


// 2. 借用构造函数

function Father() {
    this.arr = [1,2,3,4,5]
}

function Son() {
    Father.call(this)
}

var son = new Son()
var son2 = new Son()
son.arr.push(6)  // [1,2,3,4,5,6]
son2.arr // [1,2,3,4,5]
// 其核心思想是：使用父类的构造函数来增强子类实例
// 实现方法是，使用call或者apply，在子类的环境中，调用了父类的构造函数
// 这样写只能继承父类的实例属性和方法，不能继承原型属性/方法


// 3. 组合继承
// 组合继承就是上面两种继承方式的结合，既解决了实例属性引用的问题，又解决了原型方法共享的问题
function Father() {
    this.arr = [1,2,3,4,5]
    this.isFater = true
}

Father.prototype.getFatherValue = function() {
    return this.isFater
}

function Son() {
    Father.apply(this)
    this.isSon = true
}

Son.prototype = new Father()

var son = new Son()
var son2 = new Son()
son.arr.push(6)
// 组合继承最大的问题就在于，会两次调用超类的构造函数，因此，继承下来的属性，分别会被保存在实例中和实力的构造函数的原型中


// 4. 原型式继承
// 这边的命名我就直接抄js高程里的例子吧
var obj = {
    name: "牛逼Plus",
    arr: [1,2,3,4,5]
}

function object(obj) {
    function F() {}
    F.prototype = obj
    return new F
}

var son = object()
son.arr.push(6) // [1,2,3,4,5,6]
// 由于方法内是直接复制，导致了引用类型共享的问题，obj.arr也会被改变
// ES5中已经规定了相应的范式，因此我们就不需要去实现这种方法了
var defineProperty = {
    name:{
        value: "God",
        configurable: false,
        enumerable: false,
        writable: false
    }
}
var r = Object.create(obj, defineProperty) // 第一个参数就传入的对象，第二个参数就和defineproperty传入的参数一样


// 5. 寄生式继承
function createAnother(orginal) {
    var clone = Object(orginal)
    clone.sayNmae = function() {
        console.log(this.name)
    }
    return clone
}

var anotherson = createAnother(obj)
// 寄生式继承，相当于用Object创建了一个新对象，然后在内部增强这个对象，最后作为返回值，实现了我们可以使用对象的属性的基础上，还能够拥有自己的方法
// 缺点就是无法函数复用


// 6. 寄生组合模式
// 结合借用构造函数传递参数和寄生模式实现继承。本质上，寄生组合模式就是使用寄生式继承来继承超类型的原型，然后再将结果制定给子类型的原型
// js高程中给的原型部分继承方法如下
function inheritPrototype(Son, Father) {
    var prototype = Object(Father.prototype) // 创建对象,参考文章中用了Object.create
    prototype.constructor = Son  // 增强对象，重写子类的constructor
    Son.prototype = prototype // 指定对象
}

// 完整的寄生组合方法如下，结合借用构造函数和寄生模式
function Father() {
    this.arr = [1,2,3,4,5]
    this.isFater = true
}

Father.prototype.getFatherValue = function() {
    return this.isFater  // 这里的this，在new之后，会指向实例
}

function Son() {
    Father.call(this)
    this.isSon = true
}

inheritPrototype(Son, Father)

Son.prototype.getSonValue = function() {
    return this.isSon
}

var son = new Son()
var son2 = new Son() // 这样，引用类型的属性也不会互相影响，也能共享原型属性和方法
// 是目前最完善的一种实现方式，库类的实现也是基于这种方法的


// 第7中方式我这里不作介绍，只是一种写法上的扩展

// 8. class继承
// es6中，实现了class，虽然也是一种语法糖，但是确实美化了很多写法，因此也是可以实现继承的
// 主要是通过extends关键字实现继承
// 其主要的实现方式就是上面所说的寄生组合继承
class Father {
    constructor(name) {
        this.name = name
    }
    get setence() {
        return this.getSetence()
    }
    getSetence() {
        return "Hi, I am" + this.name
    }
}

class Son extends Father {
    constructor(name, age) {
        // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
        super(name)
        this.age = age
    }

    getSonSetence() {
        return "I am" + this.age + " years old"
    }
}

var son = new Son('God', 20)
