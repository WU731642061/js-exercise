const content = $('.header-right')
let timeout = null

$("#insert1").addEventListener("mouseover", function() {
  content.innerHTML = "暴力插入法<br>使用for循环和appendChild方法依次插入到html中<br>由于渲染阻塞的原因，并不会一条条渲染，会等到脚本运行完毕后，一次性绘制"
})

$("#insert2").addEventListener("mouseover", function() {
  content.innerHTML = "一次性渲染<br>通过for循环拼装html语句，最后将拼装好的html通过innerHTML方法替换，实现一次性绘制，算是一种对暴力插入法的最简单的优化吧(笑)"
})

$("#insert3").addEventListener("mouseover", function() {
  content.innerHTML = "DocumentFragment渲染<br>利用createDocumentFragment方法，创建虚拟dom，这样不会引起重绘，也不会引起每次appendChild时计算css，创建完一次性渲染"
})

$("#insert4").addEventListener("mouseover", function() {
  content.innerHTML = "DocumentFragment循环渲染<br>上面那种方法的优化版本，利用循环的方式，渲染table，这样用户能够更加快的获取到数据"
})

$("#insert5").addEventListener("mouseover", function() {
  content.innerHTML = "关于无限滚动加载，思考再三，我觉得有必要单独写一个exercise，因为需要考虑到各种新能的优化，还有使用H5的新的API等等，请看文档目录吧"
})

$all(".insert-button-common").forEach( e => {
  e.addEventListener("mouseout", function() {
    content.innerHTML = ""
  })
})

// 切换 按钮开关
function switchButton (state) {
  let r = state === "disabled" ? "on" : "off"

  $all(".insert-button-common").forEach( e => {
    if (r === "on") {
      e.setAttribute("disabled", true)
      e.classList.add("disabled")
    } 
    if (r === "off") {
      e.removeAttribute("disabled")
      e.classList.remove("disabled")
    }
  })
}

// 初始化 table
function initTable() {
  if ( animationFrame ) {
    window.cancelAnimationFrame(animationFrame)
  }
  table.innerHTML = `<tr><th>ID</th><th>内容</th></tr>`
}

function mutiInsert(event) {
  initTable()
  console.log('初始化table')
  const time = new CalculateTime()
  switchButton("disabled")
  
  time.startCal()
  setTimeout(()=>{
    switch(event){
      case "syncInsert":
        syncInsert()
        break
      case "preInsert":
        preInsert()
        break
      case "virtualDOM":
        virtualDOM()
        break
      case "loopVirtualDOM":
        loopVirtualDOM(0)
        break
      default:
        console.log('不存在该选项')
    }
    setTimeout(()=>{
      time.endCal()
      switchButton("able")
      time.updateTime()
    },0)    
  },0) 
}

