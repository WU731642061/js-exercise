/*
 * @Author: your name
 * @Date: 2019-10-29 13:47:20
 * @LastEditTime: 2020-08-18 10:23:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-exercise/exercise/drag/drag.js
 */
// 这个拖拽功能想实现已经很久了，要么懒了，要么工作很忙，一直被耽搁着。趁这两天有空，赶紧补上

// 这个demo主要参考：
// drag：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event
// HTML5 drag & drop 拖拽与拖放简介：https://www.zhangxinxu.com/wordpress/2011/02/html5-drag-drop-%E6%8B%96%E6%8B%BD%E4%B8%8E%E6%8B%96%E6%94%BE%E7%AE%80%E4%BB%8B/
// 用两种不同的姿势来实现拖动排序：https://segmentfault.com/a/1190000012335153

// 在HTML5之前，浏览器没有拖拽相关的api
// 早期拖拽实现div拖拽的方案，是通过监听mousemove事件和event的x,y轴，来实现

(function dragOldEvent () {
  let dragOld = document.querySelector(".drag-circle__old")

  dragOld.addEventListener("mousedown", function(e) {
    var e = e || window.event
    var diffX = e.clientX - dragOld.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    var diffY = e.clientY - dragOld.offsetTop
    if (typeof dragOld.setCapture !== 'undefined') {
      dragOld.setCapture()
    }

    document.onmousemove = function(e) {
      var e = e || window.event
      var left = e.clientX - diffX
      var top = e.clientY - diffY
      if (left < 0) {
        left = 0
      } else if (left > window.innerWidth - dragOld.offsetWidth) {
        left = window.innerWidth - dragOld.offsetWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > 299) {
        top = 299
      }

      // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
      dragOld.style.left = left + 'px'
      dragOld.style.top = top + 'px'
      console.log(dragOld.style.left)
      console.log(dragOld.style.top)
    }

    document.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
      document.onmousemove = null
      document.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）

      // 修复低版本ie bug
      if (typeof dragOld.releaseCapture !== 'undefined') {
        dragOld.releaseCapture()
      }
    }
  })
})()

(function dragNewEvent (){
  // https://developer.mozilla.org/zh-CN/docs/Web/API/Document/drag_event
})()
