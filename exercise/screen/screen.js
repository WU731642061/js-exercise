const $ = (selector) => document.querySelector(selector)

const container = $('.container')
const inner = $('.inner')

console.log('=========关于client==========')
console.log("body的高度为 ", document.body.clientHeight)
console.log("container的宽度为 ", container.clientWidth)
console.log("container的高度为 ", container.clientHeight)
console.log('=========关于offset==========')
console.log("container的宽度为 ", container.offsetWidth)
console.log("container的高度为 ", container.offsetHeight)
console.log('=========关于scroll==========')
console.log("container的宽度为 ", container.scrollWidth)
console.log("container的高度为 ", container.scrollHeight)

let imgLoaded = false

function lazyImgLoad () {
    // 因为我们这里只加载一张图片，这边就偷懒点，在多张图片渲染的情况下，需要考虑循环的同时，不要让图片每次都重复加载
    const imgContainer = $('.bottom-image')
    const img = $('img')
    const seeHeight = document.documentElement.clientHeight; //可见区域高度
    const scrollTop = container.scrollTop //滚动条距离顶部高度

    // img.offsetTop 指的是图片距离他的offsetParent(指的是td,th,tr,body等)的内部边距
    // 这里有一个注意点，就是为什么我img取的是它外层的div而不是img本身，是因为当你没有给img设一个固定的高度时，获取到的offsetTop始终是0
    if ( imgContainer.offsetTop <=  seeHeight + scrollTop) {
        if (!imgLoaded){
            alert("开始渲染图片")
            img.src = img.getAttribute("data-src")
            imgLoaded = true
            // 这里其实是偷懒了，可以考虑一下多图的情况下的操作
        }
    }
}

container.addEventListener("scroll", lazyImgLoad)
