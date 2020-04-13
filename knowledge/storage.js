// 这篇文章主要思考一下web中，存储数据的几个方法，cookie，session，session stroage和localstorage
// 网上已经有很多好的文章的，我会在下面贴出来，这篇文章主要有两个作用，一个是记录一下，另一个是理清在概念上和实际使用上的区别

// 网上关于cookie的解释很多，我尽量使用官方的回答+自己的理解出阐述


// 关于 cookie

// 参考：https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies
// 官方解释: HTTP cookie（Web cookie，浏览器cookie）是服务器发送到用户Web浏览器的一小段数据。 浏览器可以存储它，并将其与下一个请求一起发送回同一服务器。 
// 通常，它用于判断两个请求是否来自同一浏览器，例如保持用户登录状态。 它记住无状态HTTP协议的有状态信息。

// 说实话，官方文档比网上那些乱七八糟的归纳说的好太多了，曾几何时，第一次看cookie，看的云里雾里的，23333

// 关于cookie的特点：
// 1. 用来存储数据，可以用来做购物车，用户信息，用户选项等等
// 2. cookie会随着每一个请求一起发送出去，也就是说，你无法控制cookie的发送，这有可能会稍稍降低性能
// 3. cookie是不可跨域的，是基于域名来判断像哪个服务器发送
// 4. 所有的浏览器，对于cookie都有一个数量和大小的限制，以chrome为例，单个域名下，只能储存53个，总大小不能超过4kb
// 5. cookie一般是由服务端设置的，可以设置失效时间。如果在浏览器端设置cookie，默认是在离开浏览器时失效

// 服务器端如何设置cookie：
// 官方解释：当接收到HTTP请求时，服务器可以发送带有响应的Set-Cookie标头。 
// Cookie通常由浏览器存储，然后将Cookie与在HTTP HTTP标头内向同一服务器发出的请求一起发送。 
// 可以指定到期日期或持续时间，之后将不再发送Cookie。 此外，可以设置对特定域和路径的限制，从而限制cookie的发送位置。
// 因为这篇主要是讲前端，这块我直接丢链接吧
// 以node为例：https://blog.csdn.net/qiqingjin/article/details/51760343
// 以django为例：https://www.cnblogs.com/banshaohuan/p/9493021.html

// 客户端操作cookie相关api

let allCookies = document.cookie;  // 返回字符串，包含用户当前域名下所有的cookie信息。每条cookie以"分号和空格(; )"分隔(即, key=value 键值对)

document.cookie = "key=value" // 设置一个新的cookie，以字符串的方式返回

// 当然，实际如果用户相对cookie操作起来还是不是特别方便，官方文档写了一个cookies.js的库，帮助开发者能够方便的对cookie进行处理
// 官方的实现方式主要是基于正则，我正则还不太行，所以大家直接去去看文档的实现吧：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
// 等我哪天cookie有所小成了，在这里补充这段的具体思路


// 关于 session
// 参考：https://www.cnblogs.com/cencenyue/p/7604651.html
// 解释(非官方)：session往往翻译为“会话”，我的理解是这更像是一种状态实现的理念，通常帮助解决http无状态协议下，对用户信息的存储和处理
// 其主要实现方式是将Session内容保存在服务端(内存，数据库，文件都有)，而在前端我们通过存放session id来与服务器进行一个交互(当然，session id不是一定的，只是目前来说一个比较好的解决方案)
// 那么这个所谓的session id，可以存放在cookie中，也可以存放在session storage中，更可以存放在local storage中，但是基于session本身的概念和设定，我们通常会将它存放在session storage(也有人存放在cookie里的)
// 知乎上的一个回答是这么解释的：而我们今天常说的 “session”，是为了绕开 cookie 的各种限制，通常借助 cookie 本身和后端存储实现的，一种更高级的会话状态实现。(https://www.zhihu.com/question/19786827)


// 关于session的特点：
// 1. 通常存储在服务器端的内存中，当然现在更多的可能是通过redis来解决这类问题，这里不作讨论(因为俺也不会=。=)
// 2. session是会话级别的，从设计规范上来说，当我们从打开一个页面，到关闭这个页面的过程，称之为一次会话(当然是同一域名下，这里如果有阐述的不正确的地方，请大佬指出)
//    当会话结束时，session即应该被销毁，但是后端不一定会这么实现，因为你无法判断用户什么时候关闭页面，所以往往通过给前端分配一个session id，再此后的请求中，前端通过传递session id来与服务器端中保存的session进行交互
//    通常情况下，如果服务器端一段时间内没有接收到一个session id的请求，那么就会删除这个sesiion，当然也有其他实现方案的，这里就不作深入讨论的，像我之前的公司，就是将购物车之类的数据存放在数据库中，然后通过cart_token的方式来交互
// 3. session没有大小的限制(都存放在后端了，还限制个啥，23333)
// 4. Session保存的东西越多，就越占用服务器内存，对于用户在线人数较多的网站，服务器的内存压力会比较大(摘自上面那篇参考里的话)


// 关于 WebStorage
// 参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
// 如果说，sesiion是一种概念，那么sessionStorage就是前端对于session的一种具体实现了(曾几何时有一次面试的时候，还傻傻分不清和session的区别，这也是写这篇笔记的原因)
// 当然，在讨论sessionStorage之前更加有必要讨论一下webStorage

// 在html5中，提供了一种比cookie更加棒的web存储api，能够以键值对的方式在web客户端存储数据。分别是sessionStorage和localStorage
// 无论数据存储在 localStorage 还是 sessionStorage ，它们都特定于页面的协议。

// 关于 sessionStorage
// 官方解释：sessionStorage为每一个页面开辟了一个存储区域，该存储区域在页面会话持续时间内可用（只要浏览器处于打开状态，包括页面刷新和返回上一页等行为）
// 仅存储会话的数据意味着数据将存储到关闭浏览器（或选项卡）为止。

// 关于sessionStorage的特点：
// 1. sessionStorage只是一种存储机制，这意味着他不会和cookie一样，每次都上传到服务器
// 2. 相较于cookie，sessionStorage拥有更大的存储空间(最大可达到5mb，23333)
// 3. 上面所说到的，关闭浏览器(选项卡)即删除相关sessionStorage，同时，打开多个相同的URL的Tabs页面，会创建各自的sessionStorage

// 客户端如何设置sessionStorage：
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/sessionStorage
// 说明：sessionStorage是存储在window对象下的，所以我们可以直接调用

sessionStorage.setItem('key', 'value');  // 设置一个sessionStorage
let data = sessionStorage.getItem('key');  // 获取一个指定的sessionStorage
sessionStorage.removeItem('key');  // 删除指定的sessionStorage
sessionStorage.clear();  // 删除所有的sessionStorage

// 插一嘴，关于webstorage的使用，都是要考虑兼容性的，IE8以下的就别去想了好吧，2333


// 关于 localStorage

// 解释(非官方)：localStorage可以做sessionStorage一样的事，不同的是，他会永久的储存，即使关闭并重新打开浏览器也可以保留。

// 关于localStorage的特点：
// 1. 也可以达到5mb的存储空间 
// 2. 同样也不会上传到服务器
// 3. 除非手动删除，不然数据不会被删除，即使你关闭选项卡或关闭浏览器
//    关于这里插一嘴，因为这个特性，我们现在的登陆方式往往是基于token的，如果存储在localStorage中，则需要后端去处理关于token的过期，这样去实现一个登陆过期的问题
//    也有一个是基于OAuth2的，这里不深入讨论了，因为俺也不是很懂，自己查资料吧，动动你的小手，你就能懂得更多 =。=

// 客户端如何设置localStorage：
// 参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Window/localStorage
// 说明：localStorage是存储在window对象下的，所以我们可以直接调用

localStorage.setItem('key', 'value');  // 设置一个localStorage
let data2 = localStorage.getItem('key');  // 获取一个指定的localStorage
localStorage.removeItem('key');  // 删除指定的localStorage
localStorage.clear();  // 删除所有的localStorage
