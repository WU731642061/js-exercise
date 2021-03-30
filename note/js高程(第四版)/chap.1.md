<!--
 * @Author: yiwen.wu
 * @Date: 2021-03-29 16:29:40
 * @LastEditTime: 2021-03-30 14:19:58
 * @LastEditors: yiwen.wu
 * @Description: 
 * @FilePath: /js-exercise/note/js高程(第四版)/chap.1.md
-->
# 什么是JavaScript

## js的历史大事件概览

+ 1995年 Brendan Eich大佬发明了LiveScript，后改名为JavaScript，版本为 1.0
+ 1997年 Ecma(欧洲计算机制造商协会，一个组织) 接纳了js 1.1 提案，由 TC39(第39技术委员会，一个组织下面的某个部门) 负责制定规则
+ 1997年 ECMA-262 诞生，作为 JavaScript 语言实现的标准
+ 1998年 各家浏览器均以 ECMAScript 作为自己 JavaScript 实现的依据
+ 2015年 ECMA-262 第 6 版，俗称 ES6、ES2015，有史以来最终要的一次版本大更新，pc端大谷歌时代降临，ie逐渐退出历史舞台
  babel等编译工具应运而生，各种兼容问题开始考死各种面试者

## JavaScript实现

完整的JavaScript包括：**ECMAScript**、**DOM(文档对象模型)**、**BOM(浏览器对象模型)**

## DOM

文档对象模型，是针对XML但经过扩展用于HTML的应用程序编程接口

+ DOM Level 1: 包括DOM Core和 DOM HTML。DOM核心规定如何映射XML结构，DOM HTML添加了针对HTML的对象和方法 
+ DOM Level 2: 在DOM的基础上添加了鼠标，点击，遍历等事件。包括DOM Views，DOM Events，DOM Styles、DOM Traversal and Range(DOM遍历和范围)
+ DOM Level 3: 引入了统一加载和保存的方法，验证文档的方法
+ DOM4: (W3C 不再按照 Level 来维护 DOM 了，而是作为 DOM Living Standard 来维护)增加了替代 Mutation Events 的 Mutation Observers
  > 补充：Mutation Events 为web页面提供一种机制或扩展，以便在DOM被改变时获得通知。目前已被废弃
  > MutationObserver 该接口给用户提供了观察dom树变化的能力。具体参考[文档](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## BOM

浏览器对象模型，理论上，BOM只处理浏览器窗口和框架，但现在也包括针对浏览器的js扩展（窗口弹出，移动、缩放、关闭浏览器，navigator对象操作，location对象，screen对象，cookie对象，XMLhttprequest对象等）

## 补充笔记

### HTML大事件

HTML 又称 超文本标记语言(HyperText Markup Language)

+ 1982年 Tim Berners-Lee 建立 HTML(比js早出生10多年)
+ 1994年 W3C 成立， 网络应用发展的标准规范交由 W3C 协会制定及推广(W3C 全称 全球资讯网协会，是制定html，css，xml标准的一个组织)
+ 2014年 HTML5.0 教程 HTML5正式发布(和 es6 的出现前后差一年，极大地改变了前端的生态)
