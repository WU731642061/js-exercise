# HTML 中的 JavaScript

## Script 标签

`<script>` 标签拥有8个属性（1个已经被废弃）

|属性名|可选/必选|说明|
|---|---|---|
|async|可选|异步加载脚本，**只对外部脚本文件有效**|
|charset|可选|指定代码字符集，大多数浏览器不 在乎它的值|
|crossorigin|可选|配置相关请求的 CORS(跨源资源共享)设置。默认不使用 CORS。详见[文档](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Attributes/crossorigin)|
|defer|可选|脚本可以延迟到文档完全被解析和显示之后再执行|
|integrity|可选|允许比对接收到的资源和指定的加密签名以验证子资源完整性(SRI， 12 Subresource Integrity)|
|src|可选|表示包含要执行的代码的外部文件|
|type|可选|代替 language，表示代码块中脚本语言的内容类型(也称 MIME 类型)，大部分情况下这个值应当为`"text/javascript"`|

**注意点**

1. 使用了 src 属性的<script>元素不应该再在<script>和</script>标签中再包含其他 JavaScript 代码。如果两者都提供的话，则浏览器只会下载并执行脚本文件，从而忽略行内代码
2. 关于`defer` 和 `async`, js高程给出了这样几句话
    + defer: HTML5 规范要求脚本应该按照它们出现的顺序执行，因此第一个推迟的脚 本会在第二个推迟的脚本之前执行，而且两者都会在 DOMContentLoaded 事件之前执行。不过在实际当中，推迟执行的脚本不一定总会按顺序执行或者在 DOMContentLoaded 事件之前执行，因此最好只包含一个这样的脚本。
    + async: 异步脚本保证会在页面的 load 事件前执行，但可能会在 DOMContentLoaded之 前或之后。
    + 这里有一篇[文章](https://blog.csdn.net/zyj0209/article/details/79698430)对此有一个更好的说明。
3. 可以通过DOM的api去动态加载脚本(背一下api)
    ```js
    let script = document.createElement('script')
    script.src = './demo.js'
    document.head.appendChild(script)
    ```

## 文档模式

doctype: 文档类型，主要是影响一些css编译和js解释执行
包括混杂模式(quirks mode),标准模式(standards mode)和准标准模式(almost standards mode)

## noscript元素

`<noscript>`元素可以包含任何可以出现在`<body>`中的 HTML 元素，`<script>`除外

标准示例如下:

```html
<body>
  <noscript>
    <p>This page requires a JavaScript-enabled browser.</p>
  </noscript>
</body>
```

## 补充笔记

许多的书上都会说这样一句话：`JavaScript 是一门单线程语言`

JavaScript 运行在浏览器(宿主)环境中，浏览器本身并不是单线程的。

著名的chrome浏览器是由 c++ 写的([观光地址](https://chromium.googlesource.com/chromium/src/))

这里有一篇更好的[文章](https://segmentfault.com/a/1190000012925872)，阐述了浏览器和js单线程的关系与js的运行机制，存档一下。
