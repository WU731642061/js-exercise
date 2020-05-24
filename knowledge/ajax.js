// 正好看到很多招聘要求上说要求精通ajax，我也不知道到底怎么样算精通ajax，今天就通过原生js实现一个ajax
// 其实关于ajax一般有两种理解，一种是Ajax：Asynchronous JavaScript and XML，即用JavaScript执行异步网络请求，
// 这个可以理解为一种技术方案，主要还是依赖XMLHttpRequest来实现异步网络请求
// 另一种则是jQuery中的ajax方法， 即$.ajax({url: url,success:function(result){}})
// 可以说是对XMLHttpRequest方法的一种封装，使我们能够更加方便，更加语义化的调用异步网络请求

// 0. 在没有jQuery中的ajax方法之前，我们一般通过原生的XMLHttpRequest执行http请求（更低版本的ActiveXObject我就不考虑了，因为没具体研究过，2333）
// 先来看一下XMLHttpRequest是怎么使用的

function sendRequest(url, method, data={}, async=true){
    console.log(url, method, data)
    // 第一步，创建一个新的XMLHttpRequest对象，并配置相关数据
    var xhr = new XMLHttpRequest
    // 说明，当请求为同步请求时，timeout必须为0，withCredentials必须为false，responseType必须为""
    xhr.timeout = async === false ? 0 : 3000 
    // 第二步，发送HTTP请求，这里我们做一个限制，只允许发送GET，POST，PUT和DELELTE请求，只需还有patch，head之类的请求，暂时先屏蔽了
    // 这里如果不支持es6语法，可以使用 [1, 2, 3].indexOf(1) === -1 或者 !!~[1, 2, 3].indexOf(1) 这两种写法
    if (['GET','POST','PUT','DELETE'].includes(method)){
        // xhr的第三个参数是async，即是否需要异步发送请求
        xhr.open(method, url, async)
    } else {
        throw "暂时不支持该方法，请使用'GET','POST','PUT','DELETE'方法"
    }
    // 如果我们需要传送json文件，需要设置请求头，且必须在open方法后设置
    // xhr.setRequestHeader('content-type', 'application/json');

    // 这边有两种方法注册相关事件回调处理函数，一种是onreadystatechange，另一种是onload
    // 其中，onreadystatechange()的定义是只要返回的状态码只要变化时就回调一次函数，而onload只有状态码为4时才能回调一次函数。
    // readyState 状态码：0:请求未初始化；1:服务器连接已建立；2:请求已接受；3:请求处理中；4:请求已完成，且响应已就绪
    xhr.onload = function() {
        if(xhr.status == 200 || xhr.status == 304){
            console.log(xhr.responseText);
        }
    }
    xhr.ontimeout = function(e) {
        console.log(e)
    };
    xhr.onerror = function(e) { 
        console.log(e)
    };
    // xhr会自动判断，当请求为get或者head时，data会自动被忽略为null
    xhr.send(data);

}

// 关于jquery中的ajax用法，这里也有必要写一下，巩固一下

var url = "http://www.demo.com"
// jQuery.ajax( url [, settings ] )
$.ajax(url)