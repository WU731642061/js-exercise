// 基本数据类型：Undefined, Null, Boolean, Number, String
// 复杂数据类型：Object

typeof(null) === "object" // true, null被认为是一个空的对象的引用

var obj = null // 当需要保存的对象还没有真正的保存对象，建议设置为null

obj = new Object() // 虽然 new Object也有效，但是不建议这种语义化差的写法
// object实例自有的属性和方法如下：
// Constructor: 保存着用于创建当前对象的函数。就上面的例子而言，构造函数就是Object()
// hasOwnProperty(property_name): 用于检查指定的属性在当前的实例中(而不是在实例的原型中)是否存在。用法: obj.hasOwnProperty('x')
// isPrototypeOf(obj): 用于检查传入的对象是否是另一个对象的原型
// propertyIsEnumerable(property_name): 用来检查某个给定的属性是否能够用for-in枚举
// toLocaleString(): 返回的对象用字符串表示，该字符串与执行环境的地区对应
// toString(): 返回的对象用字符串表示
// valueOf(): 返回对象的字符串，数值或者布尔值表示

// 当对象执行数据类型转换时，会优先执行他们的valueOf方法，如果对象没有该方法，则调用toString方法，进行相对应的操作，如 '1' + 1, 数字1会被转换成'1'，结果变成‘11’


// 关系符操作
// 需要注意的是，当双方都是字符串时，会将首位转换成字符编码值，如首位相同，则依次向后比较
// 而一位为字符串，一位为数字，会将字符串转换为数字，例如: '23' > 3，结果为true，然而 'a' > 3时，会将'a'转换成NaN，导致结果永远为false


// 三元表达式 var variable = 表达式 ? 值1 : 值2; 例如：var max = a > b ? a : b;

// with (expression) statement: 将代码的作用域指定到某个特定的对象中去，不建议使用，理由是大量消耗性能，同时给调试 造成困难 

// switch (expression) {
//     case value: 
//         statement
//         break
//     case value: 
//         statement
//         break
//     default:
//         statement 
// } 

function test() {
    console.log(arguments) // 由于js不限定方法传入的参数，可以通过arguments来获取用户传入的所有参数
}
// arguments是一个类数组，并不是真正的Array类型实例，可以用括号语法访问每个数据，并且仅用一个length属性获取传递多少个参数
// 当然，也有一些方法可以将arguments转换成数组，我这边会写几个作为参考

function arg_to_array() {
    console.log(arguments)
    var arr1 = Array.prototype.slice.call(arguments)
    console.log(arr1)
    var arr2 = new Array(...arguments)
    console.log(arr2)
}    
