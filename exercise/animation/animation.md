# 动画0animation

主要理解animation的几个参数和tansfrom的几种变换方法

关于animation，主要有以下几种属性
```
animation-name // 动画名
animation-duration // 一个周期动画的时间
animation-timing-function // 规定动画的速度曲线，基于贝塞尔函数，来生成速度曲线，可选值有：linear，ease，ease-in，ease-out，ease-in-out，cubic-bezier(n,n,n,n)
animation-delay // 动画开始前延迟时间
animation-iteration-count // 播放次数，infinite表示重复播放
animation-direction // 是否应该轮流反向播放动画，normal为正向播放，alternate为反向播放
animation-fill-mode // 动画填充模式，forwards，表示，动画完成后，元素状态保持为最后一帧的状态，backwards，表示，有动画延迟时，动画开始前，元素状态保持为第一帧的状态，both，表示上述二者效果都有
```
tips：如果想是想绕着某个中心旋转，在旋转的css中，添加transform-origin(Xpx, Ypx)，transform-origin是一个元素变换的起始点。
除此之外，动画中还能定义一个steps(number，position)属性，将动画分成number段，position表示动画是从时间段的开头连续还是末尾连续

关于transform中的2d变换，主要有5种形式
```
translate(Xpx, Ypx) // 偏移，当XY都为正数时，X沿着右边移动，Y沿着下方移动，可以为百分比，当为百分比时，按照父元素的百分比大小平移
rotate(Xdeg) // 旋转，当X为整数时，向顺时针方向旋转X度
scale(X, Y) // 缩放，X代表宽度缩放的倍数，Y代表高度缩放的倍数，可以只填写一个参数，即宽度和高度都依照这个值变化
skew(Xdeg, Ydeg) // 倾斜转换，X表示用于沿横坐标扭曲元素的角度，Y表示用于沿纵坐标扭曲元素的角度，如果未定义，则其默认值为0
matrix(a,b,c,d,e,f) // x的最终偏移量= aX + cY + e, y的最终偏移量 = bX + dY + f，其中X，Y分别为transform-origin中设置的变换初始点
```



更多的参数和原理可以参考MDN上的解释：https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function


参考自：https://mp.weixin.qq.com/s/-rOBuPraA3oWdlZA0U6_Mg