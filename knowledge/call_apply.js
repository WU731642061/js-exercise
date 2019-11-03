let obj = {
    Tom: 18,
    Jhon: 20,
    Eric: 24
}

function test(name, content){
    if (this[name]){
        console.log(content+ ' ' + name + ' ' + this[name])
    } else {
        console.log(name + ' is not exist.')
    }
}

// call，apply，bind作用都是为了改变this的指向，call将参数依次传入，apply传入参数数组，bind将参数依次传入但返回的是一个function
// 在 fun 函数运行时指定的 this 值时，
// 在非严格模式下，如果 obj为undefined|null，this会指向window
// 如果obj为其他原始类型，this会指向new Number()，new Boolean()，new String()
test.call(obj, 'Tom', 'welecome')
test.apply(obj, ['Tom', 'welecome'])
var newTest = test.bind(obj, 'Tom', 'welecome')
newTest()

// 可以使用apply，call来实现继承
// 摘自：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
function Product(name, price) {
  this.name = name;
  this.price = price;
}

Product.prototype.test = function(){
    console.log(111)
    console.log(this)
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

Food.prototype.test2 = function(){
    console.log(222)
    console.log(this)
}

var cheese = new Food('feta', 5);


//一些bind的用法，实现一切切片
var slice = Array.prototype.slice;
slice.apply(arguments);

// 用 bind()可以使这个过程变得简单。在下面这段代码里面，slice 是 Function.prototype 的 apply() 方法的绑定函数，并且将 Array.prototype 的 slice() 方法作为 this 的值。这意味着我们压根儿用不着上面那个 apply()调用了。
var unboundSlice = Array.prototype.slice;
var slice = Function.prototype.apply.bind(unboundSlice);
slice(arguments);

// 接下来自己实现一个call，apply和bind
// 首先，call，apply，bind是在Function原型上的方法，所以希望自己实现call，apply和bind也必须修改Function的原型

Function.prototype.newCall = function(context){
  // 第一步，获取这个对象，如果为null，则将对象挂载再window上
  var context = context || window
  // 这里的this指向的是调用的函数本身，相当于xxx = new Function，在new的时候，this指向了xxx
  // 这里需要谨慎考虑的是，context也可能有fn这个key，这里可能会覆盖对象本身的key，在实际操作中，建议使用生成随机数来实现这边this指向的改变，这里就不做这个实现
  // var uniqueID = "00" + Math.random();
  // while (context.hasOwnProperty(uniqueID)) {
  //   uniqueID = "00" + Math.random();
  // }
  // context[uniqueID] = this;
  context.fn = this
  var args = [...arguments].slice(1)
  // 或者 new Array(...arguments).slice(1)
  // 或者 Array.from(arguments).slice(1)        from方法从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例
  var r = context.fn(...args)
  // 如果不允许使用es6特性，可以使用eval来实现
  // var args = [];
  // for (var i = 1; i < arguments.length; i++) {  
  //   args.push("arguments[" + i + "]");
  // }
  // var result = eval("context.fn(" + args + ")");
  // 最后删除context的fn属性
  delete context.fn
  return r
}

Function.prototype.newApply = function(context, arr){
  // apply和call十分的相似，只是多了一步检查arr是否存在
  var context = context || window
  context.fn = this

  // 这里需要判断传入的数据是否为数组，如果不是要报错，但是typeof无法检测出数组的类型，需要用instanceof
  if (arr && !arr instanceof Array){
    throw "请传一个正确的数组"
  }
  var r = arr ? context.fn(...arr) : context.fn()
  return r
}

Function.prototype.newBind = function(context){

}

// 文章参考自：https://zhuanlan.zhihu.com/p/83523272

