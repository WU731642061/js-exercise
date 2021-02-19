// 响应式数据

// 说到响应式数据，不得不提到Vue
// “Vue最独特的特性之一，是其非侵入性的响应式系统。
//  数据模型仅仅是普通的 JavaScript 对象。
//  而当你修改它们时，视图会进行更新。这使得状态管理非常简单直接，不过理解其工作原理同样重要，这样你可以避开一些常见的问题。”
//  -- 尤雨溪

// 其核心的api主要是通过了使用 Object.defineProperty (vue2) 和 proxy (vue3) 这两个api

// Object.defineProperty
// 定义：Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象

// defineProperty的若干个属性（说法来自于js高程）
// 数据属性：
// Configurable: 表示能否通过delete删除属性从而从新定义属性，能否修改属性的特性(后面解释)，默认值是true
// Enumerable: 表示能否通过for-in循环返回属性，默认值是true
// Writable: 表示能否修改属性值，默认为 false(老版本默认值是true，现在默认值是false)
// Value: 包含这个属性的数据值，读取的时候，从这个位置读取，写入的时候，把新值保存在这个位置。默认值是undefined，如果你给属性赋值，那么value即为指定值

// 如果你希望访问/修改上数据属性，需要通过Object.defineProperty()方法
Object.defineProperty('属性所在的对象', '属性名称', '描述对象') // 描述对象指的是数据属性所组成的对象，可以是一个或多个值，如下

var person = {
  age: 11,
  name: 'Tom',
  job: 'engineer',
  enjoy: ['ball', 'music', 'game'],
  sayName: function(){
      return "I am Tom."
  }
}

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
Object.defineProperties(book, 
  {
    _year:{value:2020, writable: true}, 
    edition:{value:1, writable: true}, 
    year:{
      get:function(){return this._year},
      set:function(newVal){
        if (newVal <= 2021){
          this._year = newVal
          console.log(newVal)
          console.log(this._year)
        }
      }
    }
  }
)

// 上述方法可以同时定义多个属性，也可以用下面这种写法
// var book = Object.defineProperties({}, {...})

// proxy
// 定义：Proxy的监听是针对一个对象的，这个对象的所有操作会进入监听操作
// Object.defineProperty 虽然很好用，但是依然存在着诸多问题：
// 1. 无法劫持到对象数据的添加和删除
// 2. 数组API方法无法监听到
// 3. 深层对象需要对每个属性进行便利，操作复杂不说，性能开销也变大了

// 语法
var myProxy = new Proxy(target, handler)
// 注意，要使得Proxy起作用，必须针对Proxy实例(myProxy)进行操作，而不是针对目标对象(target)进行操作。

// 未完。。。