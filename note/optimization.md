# 优化

## 写在前面

一开始学前端的时候，对于优化其实是盲目的，听得风便是雨。直到读到了一篇[文章：Front-End Performance 2021: Planning And Metrics](https://www.smashingmagazine.com/2021/01/front-end-performance-getting-ready-planning-metrics/)

读了这篇文章后(没读完。。)，感觉整个人对优化提高了一个级别的认知。就像是一种降维的打击一样。

过去，个人觉得优化是一种手段，而不知道优化的目标是什么，看到别人一些好的优化方案，就拿来主义。仿佛是为了优化而优化。

而这篇文章在开篇就抛出了核心的观点：**Micro-optimizations are great for keeping performance on track, but it’s critical to have clearly defined targets in mind — measurable goals that would influence any decisions made throughout the process.**

个人愚见：从前端的角度来说，优化的是为了使得项目的性能达到一个可以衡量的指标范围之内，从而达到提高使用者满意度的一个目的。

例如：你写一个静态网站，网站里就放一张5*5px的图片和一段文字，每天访问的人数很少。在这种情况下，我认为优化是毫无必要的。

同理：你有一个大型的电商平台网站，同时还有竞争对手。在出售相同产品的前提之下，你的对手打开网站只要2秒，而你需要5秒。这个时候，你需要开始考虑优化了。

这里我结合一篇其他[文章](https://juejin.cn/post/7052918009555320839)，纪录一下我目前对优化的理解。

## 一个通用的原则（2-5-8原则）

+ 当用户能在2秒以内得到响应，会感觉系统响应很快；

+ 当用户在 2-5 秒之间得到响应时，会感觉系统的响应速度还可以

+ 当用户在 5-8 秒以内得到响应时，会感觉系统的响应速度很慢，但是还可以接受

+ 而当用户在超过 8 秒后仍然无法得到响应时，会感觉系统糟透了，或者认为系统已经失去响应，而选择离开这个 Web 站点，或者发起第二次请求(刷新)。

一旦用户发起刷新的行为时，将是一种恶性循环。如果本来就是某些资源加载的问题的情况下，会使得服务器更加的不堪受辱。

Performance里提到过一句有趣的话：**if you want users to feel that your website is faster than your competitor’s website, you need to be at least 20% faster**(如果你希望用户感知到你的网站比你的竞争对手更快，你的网站至少要快20%)



