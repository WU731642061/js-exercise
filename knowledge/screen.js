// 关于js获取屏幕的高度，宽度的知识点记录

// 关于document对象和window对象的区别
// window是js在浏览器中的顶层对象，在es5中顶层对象和全局变量是对等的。你可以认为任何一个全局变量，都是window对象的属性，但是在es6中有所不同，ts中又有所不同
// document对象是window对象的属性，表示当前页面，而window对象表示当前窗口
// 主要介绍window对象下的几个主要的属性
window.navigator // 包含客户端浏览器的信息
window.screen // 包含客户端显示屏的信息
window.history // 包含了浏览器窗口访问过的 URL
window.location // 包含了当前URL的信息
// document对象定义了许多和HTML节点相关的属性和方法，让我们可以通过脚本来对这些节点进行访问和修改

// 接下来总结一下通过js获取屏幕宽高的接种方法

// 第一种Element.clientWidth，Element.clientHeight
// 属性表示元素的内部宽度，以像素计。该属性包括内边距 padding，但不包括边框 border、外边距 margin 和滚动条（如果有的话）
document.body.clientWidth // body对象的宽度
document.body.clientHeight // body对象的高度
// 在不对body进行任何设置的时候，body的宽度往往等于屏幕的宽度，但是我们在开发过程中，往往会对body做一个限制，尤其是在做一些h5页面时
document.documentElement.clientWidth // html文档的宽度
document.documentElement.clientHeight // html文档的高度，一般我们取屏幕可视区域高度，用这个
// document.documentElement是整个文档节点树的根节点，在网页中即html标签
// document.body是整个文档DOM节点树里的body节点，网页中即为body标签元素
// 关于两者带来的问题，可以参考这篇文章：https://www.jianshu.com/p/fb867e8109f7


// 第二种Element.offsetWidth，Element.offsetHeight
// 与clientXXX不同的是，该属性包括边框border和滚动条，但依然不包括margin
document.body.offsetWidth // body对象的布局宽度
document.body.offsetHeight // body对象的布局高度
// 网上有一些文章会说body.clientHeight是屏幕可见区域的高度，测试下来是不对的，当内部标签的高度小于1屏高的时候才是可见区域的高度
// 当文档形成一个scroll的状态时，得到的高度是内部元素撑高后的整个body高度
// 详见可以看../exercise/screen/下的html
// 这里还要关注一下offsetTop，可以自己查一下文档


// 第三种Element.scrollWidth，Element.scrollHeight
// 包括由于overflow溢出而在屏幕上不可见的内容，同时它包含元素的内边距，但不包括边框，外边距或滚动条（如果存在）
document.body.scrollWidth // 包含内容的完全宽度
document.body.scrollHeight // 包含内容的完全高度
// 这里返回的是四舍五入的整数值，如果需要小数，调用element.getBoundingClientRect()方法
// 在不同浏览器的实现方式可能不同，因此取到的结果可能不同

// 除此之外，还有两个比较重要的对象属性
document.body.scrollTop // body对象的顶部距可视部分顶部的距离，这边只是写了让我自己看的一个记录，如果还是不明白可以看一下mdn上的文档
document.body.scrollLeft // body对象的左侧距可视部分左侧的距离
// 例如图片懒加载，我们如何实现一个图片是否需要加载，一个方案就是，我们计算图片是否进入可视区域，或者图片距离可视区域是否达到我们需要加载的距离
// 这边我做了一个案例，在../exercise/screen/下的html

// 关于window对象的几个属性
window.screenTop // 返回用户浏览器的上边界到屏幕最顶端的距离
window.screenLeft // 返回用户浏览器的左边界到屏幕最左边的距离

window.screen.height  // 显示分辨率下的高度
window.screen.width   // 显示分辨率下的宽度
window.screen.availHeight  // 显示分辨率下的可用高度，即去掉顶部菜单栏和底部菜单栏，如果有的话
window.screen.availWidth // 显示分辨率下的可用宽度，即去掉左右侧菜单栏，如果有的话


