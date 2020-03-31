const table = $('tbody')
const dataTotal = 100000

// 暴力插入的方式
// 知识点，文档记录一下：https://juejin.im/entry/59e1d31f51882578c3411c77
function syncInsert () {
  for (let i = 0; i <= dataTotal; i++) {
    let row = document.createElement('tr')  //创建行
    let idCell = document.createElement('td')  //创建第一列id
    idCell.innerHTML = i  //填充数据
    row.appendChild(idCell);

    let contentCell = document.createElement('td')  //创建第二列content
    contentCell.innerHTML = i
    row.appendChild(contentCell)
    table.appendChild(row)
  }
  // console.log(table)
}

// innerHTML插入
function preInsert () {
  let insertHtml = `<tr><th>ID</th><th>内容</th></tr>`
  for (let i = 0; i <= dataTotal; i++) {
    insertHtml += `<tr><td>${i}</td><td>${i}</td></tr>`
  }
  table.innerHTML = insertHtml
}

// 虚拟DOM插入，与innerHTML插入有些类似，但是更加灵活，可以插入进现有的HTML中，而不是重新改写整个HTML
// 现在的JS引擎已经有了JS渲染阻塞了，关于两者的区别，记录一下这篇文章：https://www.zhihu.com/question/27260165
// 关于createDocumentFragment和直接插入的区别
// 文章是这么写的：当你append到document时，被append进去的元素的样式表的计算是同步发生的，此时getComputedStyle可以得到样式的计算值。
// 而append到document fragment，没样式表什么事，可以省下这个计算
// 我的理解是：直接循环虽然有js渲染阻塞，但是他依旧会每次循环是计算css，虽然不会直接引起重绘
// 而getComputedStyle只有再最后真正append到html文档中，才会统一进行计算，两者之间节省了计算css的时间

// 我们现在可能感受不到两者的区别，是因为有些浏览器做了更好的优化，导致两者之间重绘时间感觉相差无几
function virtualDOM () {
  let fragment = document.createDocumentFragment()
  for (let i = 0; i <= dataTotal; i++){
    let row = document.createElement('tr')  //创建行
    let idCell = document.createElement('td')  //创建第一列id
    idCell.innerHTML = i  //填充数据
    row.appendChild(idCell);

    let contentCell = document.createElement('td')  //创建第二列content
    contentCell.innerHTML = i
    row.appendChild(contentCell)
    
    fragment.appendChild(row)
  }
  // console.log(table)
  table.appendChild(fragment)
}


// 基于上面这种方案的优化，以确保更快的首屏展示
function loopVirtualDOM (curIndex) {
  let once = 100  // 一次加载多少条

  once = (dataTotal-curIndex) < once ? (dataTotal-curIndex) : once

  if (once === 0) {
    return
  }

  window.requestAnimationFrame(function(){
    let fragment = document.createDocumentFragment()
    for (let i = curIndex; i <= curIndex + once; i ++){
      let row = document.createElement('tr')  //创建行
      let idCell = document.createElement('td')  //创建第一列id
      idCell.innerHTML = i  //填充数据
      row.appendChild(idCell);

      let contentCell = document.createElement('td')  //创建第二列content
      contentCell.innerHTML = i
      row.appendChild(contentCell)
      
      fragment.appendChild(row)
    }
    table.appendChild(fragment)
    loopVirtualDOM(curIndex+once)
  })
}


