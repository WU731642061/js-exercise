<!--
 * @Author: yiwen.wu
 * @Date: 2022-02-15 17:24:09
 * @LastEditTime: 2022-02-22 09:14:23
 * @LastEditors: yiwen.wu
 * @Description: 
 * @FilePath: /promise-test/rule.md
-->
# promise A+规范

promise A+规范，请参考[翻译](https://juejin.cn/post/6844903767654023182)，参考[文档](https://juejin.cn/post/7043758954496655397#heading-19)

这篇文档主要记录一下自己对promsie的理解

将`promise`的实现分成三个部分：状态的定义、then方法的实现、具体的程序处理

## promise 状态的定义

根据部分文档的定义：`Promise`对象表示一个异步的操作，有三种状态：`pending`（进行中），`fulfilled`（已成功），`rejected`（已失败）

当状态从`pending`改变时，调用对应的回掉函数(传递给`then`或者`catch`)

```js
// promise常用方法
let syncEvent = function() {
  return new Promise((resolve, reject) => {
    if (...) resolve()
    if (...) reject()
  })
}
```