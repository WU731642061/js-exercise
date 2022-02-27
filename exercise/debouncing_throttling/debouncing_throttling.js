let $ = (selector) => document.querySelector(selector)

let changeContent = function(node, value){
       $(node).innerText = value
}

let normal = $('div.normal .input')
normal.addEventListener('keyup', (e)=>{
    changeContent('div.normal p', normal.value)
})


let throttle = function(func, interval){
    let timer
    return function(){
        let _args = arguments
        if (timer) {
            return
        }
        timer = setTimeout(function() {
            func(..._args)
            timer = null
        }, interval)
    }
} 
let throttleInput = throttle(changeContent, 1000)

let throttling = $('div.throttling .input')
throttling.addEventListener('keyup', (e)=>{
   throttleInput('div.throttling p', throttling.value)
})



let debounce = function(func, delay){
    // 参考自：https://juejin.im/post/5b8de829f265da43623c4261
    // 原文中定义了let _that = this，并且是用func.call(_that, ..._args)形式调用的，这边不是很理解这样调用的意义是什么
    // 这里返回一个函数，函数中定义clearTimeout和setTimeout，每次输入则触发清除延时，并重新触发延时
    // 这种写法主要是方便复用，不用每次都定义延时时长
    let timer
    return function(){
        let _args = arguments
        clearTimeout(timer)
        timer = setTimeout(function(){
            func(..._args)
        }, delay)
    }
}

let debounceInput = debounce(changeContent, 500)

let debouncing = $('div.debouncing .input')
debouncing.addEventListener('keyup', (e)=>{
    debounceInput('div.debouncing p', debouncing.value)
})


