var $ = function(selectors){
    return document.querySelector(selectors)
}

$('.outer-box').addEventListener('click', function(event){
    console.log(event)
    console.log('外部-冒泡')
})

$('.inner-box').addEventListener('click', function(event){
    console.log(event)
    console.log('内部-冒泡')
    // event.stopPropagation()
})

$('.outer-box').addEventListener('click', function(event){
    console.log(event)
    console.log('外部-捕获')
}, true)

$('.inner-box').addEventListener('click', function(event){
    console.log(event)
    console.log('内部-捕获')
}, true)

function showContent(event){
    var node = event.target
    if(node.nodeName.toLowerCase() === 'li'){
        console.log('The number is ' + node.innerHTML);
    }
    if(node.nodeName.toLowerCase() === 'a'){
        event.stopPropagation()
        event.preventDefault()
    }
}

$('.outer-box2').addEventListener('click', function(event){
    console.log('外部2-冒泡')
})

$('ul').addEventListener('click', showContent, false)
