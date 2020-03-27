
const $ = (selector) => document.querySelector(selector)

let container = $('.container')

let imgae_container = $('.img-container')

let left = $('.left')

let right = $('.right')

container.addEventListener('mouseover', function(){
    left.style.display = 'block'
    right.style.display = 'block'
})

container.addEventListener('mouseout', function(){
    left.style.display = 'none'
    right.style.display = 'none'
})

left.addEventListener('click', function(){
    console.log('start', imgae_container.style.left)
    imgae_container.style.left=parseInt(imgae_container.style.left)+600+"px";
    
    if (parseInt(imgae_container.style.left) > 0){
        imgae_container.style.left = -1800 + 'px';
    }
    console.log('end', imgae_container.style.left)
})

right.addEventListener('click', function(){
    imgae_container.style.left=parseInt(imgae_container.style.left)-600+"px";
    console.log('start', imgae_container.style.left)
    if (parseInt(imgae_container.style.left) < -1800){
        imgae_container.style.left = 0 + 'px';
    }
    console.log('end', imgae_container.style.left)
})

// TODO
// 加上动画效果和下标跟随移动
// 加上懒加载效果