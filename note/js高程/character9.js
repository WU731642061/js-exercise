// 客户端检测

// 检测客户端的必要性之一就是为了解决浏览器之间的差异，以及不同浏览器内核之间的一些怪异的实现

// 1. 基本能力检测
// 检测浏览器是否具有某个‘能力’，就能给出相应的解决方案，例如
function getElement(id) {
  if (document.getElementById) {
    return document.getElementById(id)
  } else if (document.all) {
    return document.all(id)
  } else {
    throw new Error("浏览器不支持任何获取dom的方式")
  }
}

// 使用typeof，判断任何对象的某个属性是否存在
function  isHostMethod(object, property) {
  var t = typeof object[property]
  // typeof xhr.open 会返回unkonw
  // IE 8 之前， DOM对象是宿主对象，是通过COM对象，返回结果是object
  return typeof t == 'function' || (!!(t == 'object' && object[property])) || t == 'unknow'
}

// 注：能力检测并非浏览器检测，我们不应该通过测试一两个独有的api就判断是某个浏览器内核。更加好的办法是检测浏览器是否有某些通用的功能。

// 怪癖检测
// 是为了识别浏览器的“特殊行为”，目的是为了希望检测出浏览器存在什么“缺陷”，即bug。
// 例如：IE8及之前版本，如果某个实例属性与原型属性同名，则不会被for-in遍历到

// 用户代理检测
// 检测用户代理字符串来确定实际使用的浏览器
// 比较常用的方法就是通过调用 navigator.userAgent 属性返回的字符串，从而计算出属于哪个浏览器

// 电子欺骗(spoofing)
// 浏览器在自己的用户代理字符串加入一些错误或误导信息，来达到欺骗服务器的作用



