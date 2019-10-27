// new的作用：
// new 操作符会返回一个对象
// 构造函数中的this会指向这个对象
// 这个对象可以直接访问到构造函数中原型上的属性

// 注意点：
// 1. 构造函数如果返回原始值，那么这个返回值毫无意义
// 2. 构造函数如果返回值为对象，那么这个返回值会被正常使用
// 3. 构造函数：它提供模板，用来生成对象实例。构造函数的函数名的第一个字母通常大写。函数体内使用this关键字，代表所要生成的对象实例。生成对象的时候，必须使用new命令来调用构造函数。



function New(func){
    // 如果这个对象不存在原型，是无法调用new的需要抛错
    if (!func.prototype){
       throw "Uncaught TypeError: " + func + " is not a constructor. By little five"
    }
    let res = {}
    // 实现将构造函数的原型挂载到实例上
    res.__proto__ = func.prototype
    // 将func中的this指向实例
    var ret = func.apply(res, Array.prototype.slice.call(arguments, 1))
    // 注意点2，如果返回值是对象，那么实例得到的其实是func的return值，注意typeof null返回为'object'，所以需要单独判断
    if ((typeof(ret) == 'object' || typeof(res) == 'function') && ret !== null){
        return ret
    }
    return res
}


New('x', 1, 2)

function Test(a,b){
    this.a = a
    this.b = b
    return {x:1,y:2}
}

New(Test, 1, 2)