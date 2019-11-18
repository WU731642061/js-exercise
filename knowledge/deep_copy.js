// 理解一下，引用，浅拷贝和深拷贝的区别


// 原始对象
let obj1 = {
    name: "Tom",
    age: 20,
    hobby: ['football', 'game', 'music', {'special': 'sleep'}],
    say: function(){
        console.log('Hello, I am ' + this.name + '.')
    }
}


// 引用
let obj2 = obj1

obj2.age = 25
console.log(obj2) // {name: "Tom", age: 25, hobby: Array(3), say: ƒ}
console.log(obj1) // {name: "Tom", age: 25, hobby: Array(3), say: ƒ}

// 浅拷贝
// 数组快速版：如果拷贝的对象是数组，不需要去自己实现一个浅拷贝：
let shallow_copy_array =  Array.prototype.concat.call(arr)  // 或者 shallow_copy_array = arr.contact()
// 相较于引用，浅拷贝实现了基础类型的拷贝，但是对于引用数据类型，浅拷贝依旧是拷贝的原始数据的内存地址，而不是真的值
function shallowCopy(obj){
    let new_obj = {}
    for (let i in obj) {
        new_obj[i] = obj[i]
    }
    return new_obj
}
let obj3 = shallowCopy(obj1)

obj3.name = 'God'
console.log(obj3) // {name: "God", age: 20, hobby: Array(3), say: ƒ}
console.log(obj1) // {name: "Tom", age: 20, hobby: Array(3), say: ƒ}

obj3.hobby.pop()
console.log(obj3) // {name: "God", age: 20, hobby: Array(2), say: ƒ}
console.log(obj1) // {name: "God", age: 20, hobby: Array(2), say: ƒ}


//深拷贝
// 先上一个乞丐版
// 乞丐版的问题：无法拷贝函数，undefined; 时间将转换成字符串；拷贝构造函数的实例，会使丢失构造函数；
let poor_obj = JSON.parse(JSON.stringify(obj1))
// 正常版本
function deepCopy(obj){
    if (typeof(obj) !== 'object' || obj === null){
        throw "请输入正确的拷贝对象"
    }
    let new_obj = Array.isArray(obj) ? [] : {} // 老版本浏览器不兼容的话，可以用Object.prototype.toString.call(arg) === '[object Array]' 代替
    for (var key in obj){
        if (typeof(obj[key]) === 'object' && obj[key] !== null){
            new_obj[key] =  deepCopy(obj[key])
        } else { 
            new_obj[key] = obj[key]
        }
    }
    return new_obj
}

let obj4 = deepCopy(obj1)
