const $ = (q) => document.querySelector(q)

// 这里先不考虑api兼容性了，用getBoundingClientRect来实现

const dir = {
    up: "js-up",
    down: "js-down",
    left: "js-left",
    right: "js-right"
}

const jsBox = $('.js-box')

let rect = jsBox.getBoundingClientRect();

if (!rect.width) {
  rect.width = rect.right - rect.left;
}

if (!rect.height) {
  rect.height = rect.bottom - rect.top;
}

jsBox.addEventListener("mouseover", function(e){
  console.log(e)
})