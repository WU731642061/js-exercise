const table = $('tbody')
const dataTotal = 100000
let animationFrame = null

// 暴力插入的方式
// 知识点，文档记录一下：https://juejin.im/entry/59e1d31f51882578c3411c77
function syncInsert () {
  for (let i = 0; i <= dataTotal; i++) {
    let row = document.createElement('tr')  //创建行
    let idCell = document.createElement('td')  //创建第一列id
    idCell.classList.add('red')
    idCell.innerHTML = i  //填充数据
    row.appendChild(idCell);

    let contentCell = document.createElement('td')  //创建第二列content
    contentCell.innerHTML = i
    row.appendChild(contentCell)
    table.appendChild(row)
    // console.log(table.offsetHeight) // 慎重添加，原因见virtualDOM上面的注释
  }
  // console.log(table)
}

// innerHTML插入
function preInsert () {
  let insertHtml = `<tr><th>ID</th><th>内容</th></tr>`
  for (let i = 0; i <= dataTotal; i++) {
    insertHtml += `<tr><td class='red'>${i}</td><td>${i}</td></tr>`
  }
  table.innerHTML = insertHtml
}

// 虚拟DOM插入，与innerHTML插入有些类似，但是更加灵活，可以插入进现有的HTML中，而不是重新改写整个HTML
// 现在的JS引擎已经有了JS渲染阻塞了，关于两者的区别，记录一下这篇文章：https://www.zhihu.com/question/27260165
// 关于createDocumentFragment和直接插入的区别
// 文章是这么写的：当你append到document时，被append进去的元素的样式表的计算是同步发生的，此时getComputedStyle可以得到样式的计算值。
// 而append到document fragment，没样式表什么事，可以省下这个计算


// 直接循环时，你每次插入，都需要重新计算css样式，为什么没有直接一条条插入，是因为我们的浏览器做了优化
// 浏览器将多次回流/重绘收集起来组成队列，在一定时间后flush队列，将多个reflow的变为一次reflow。
// 但是你会发想，上面syncInsert和virtualDOM两个方法跑的时间差不多，是因为现在的浏览器做了更加智能的优化，甚至连css都不计算了，直接统一计算完后添加
// 但是，如果你添加了console.log(table.offsetHeight)，或者任何计算高度的js语句，就会强制引发计算css，那时候你就能体会到直接for循环又多慢了

// 我们现在可能感受不到两者的区别，是因为有些浏览器做了更好的优化，导致两者之间重绘时间感觉相差无几
function virtualDOM () {
  let fragment = document.createDocumentFragment()
  for (let i = 0; i <= dataTotal; i++){
    let row = document.createElement('tr')  //创建行
    let idCell = document.createElement('td')  //创建第一列id
    idCell.classList.add('red')
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

  animationFrame = window.requestAnimationFrame(function(){
    let fragment = document.createDocumentFragment()
    for (let i = curIndex; i <= curIndex + once; i ++){
      let row = document.createElement('tr')  //创建行
      let idCell = document.createElement('td')  //创建第一列id
      idCell.classList.add('red')
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


