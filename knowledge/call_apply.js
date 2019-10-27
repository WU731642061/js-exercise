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

function Food(name, price) {
  Product.call(this, name, price);
  this.category = 'food';
}

var cheese = new Food('feta', 5);

// 接下来自己实现一个call，apply和bind
// 首先，call，apply，bind是在Function原型上的方法，所以希望自己实现call，apply和bind也必须修改Function的原型

