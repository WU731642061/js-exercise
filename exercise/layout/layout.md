# 页面布局-layout



主要理解一下三种看上去差不多的布局的异同和用法，分别是：Block(inline-block), Flex(inline-flex)和Grid(inline-grid|subgrid)


***block***: 最简单的，块级元素，独占一行，元素前后会带有换行符。


***inline-block***: 此元素对父元素呈现为inline对象，但是元素的内部作为block对象呈现。


***flex***: 将元素作为弹性伸缩盒显。一共有6种属性。

```
flex-direction: row | row-reverse | column | column-reverse; // 排列方向

flex-wrap: nowrap | wrap | wrap-reverse; // 是否换行

flex-flow: <flex-direction> || <flex-wrap>； // 相当于两者的组合

justfy-content: flex-start | flex-end | center | space-between | space-around; // 沿着主轴方向上的对齐方式（是基于flex-direction的,row就是水平方向，column就是垂直方向）

align-items: flex-start | flex-end | center | stretch | baseline; // 交叉轴方向上的对齐方式（同上）

align-content: flex-start | flex-end | center | space-between | space-around | stretch; // 当多行时，垂直方向每一行flex元素的对齐和分布方式，单行不生效
```

关于flex-item，也有6种属性：

```
order: <integer>; // item的位置，默认为0

flex-grow: <number>; // 等比例扩展，默认为0

flex-shrink: <number>; // 等比例收缩，默认为1

flex-basis: <length> | auto; // 分配剩余空间之前元素的默认大小，flex-grow和flex-shrink会在这个值的基础上二次进行扩展或收缩

flex: none | auto | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] // 相当于上述的组合

align-self: auto | flex-start | flex-end | center | baseline | stretch; // 单独某一个flex子项的交叉轴方向上的对齐方式
```

注: 关于每个属性的每个详细的解释，关于flex布局可以参考：https://zhuanlan.zhihu.com/p/46684565, 关于flex-item的解释可以参考：https://juejin.im/post/591d74ad128fe1005cfc21cd, 或者官方文档


***inline-flex***: 将元素作为内联块级弹性伸缩盒显示 使用flex时父元素是block元素，而声明了inline-flex的父元素变成了inline元素.


***grid***: 指定一个容器采用网格布局。属性说明如下：

注: 当元素设置了网格布局，column、float、clear、vertical-align属性无效。

```
grid-area: a; // 网格项的grid-area属性值，给独立的网格赋予名称
grid-template-columns: 100px 100px 100px; // 每一列的列宽
grid-template-rows: 100px 100px 100px; // 每一行的行高
grid-template-areas: "a a a a"  // 通过获取网格项中的grid-area属性值（名称），来定义网格模版。重复网格区（grid-area）名称将跨越网格单元格，‘.’代表空网格单元。
                     "b b . ."  // 属性值必须连续的出现，例如 "a a b a" 这种格式，浏览器无法正常解析，但是支持 "b a a" "b c c" 这种格式
                     "c c c c"  // 
grid-template: "葡萄 葡萄 葡萄" 1fr 
               "龙虾 养鱼 养鱼" 1fr 
               "龙虾 养鱼 养鱼" 1fr 
               "西瓜 西瓜 西瓜" 1fr
               /1fr 1fr 1fr;        // grid-template-rows，grid-template-columns和grid-template-areas属性的缩写。
grid-column-gap：10px; // 列间距
grid-row-gap: 10px; // 行间距 
grid-gap：<grid-row-gap> <grid-column-gap>; // grid-column-gap 和 grid-row-gap简写。
justify-items: stretch | start | end | center; // 网格元素的水平呈现方式
align-items: stretch | start | end | center; // 网格元素的垂直呈现方式
place-items: <align-items> / <justify-items>; // 不支持IE和Edge，不建议这种写法
justify-content: stretch | start | end | center | space-between | space-around | space-evenly; // 网格元素的水平分布方式。此属性仅在网格总宽度小于grid容器宽度时候有效果
align-content: stretch | start | end | center | space-between | space-around | space-evenly; // 网格元素的垂直方向每一行grid元素的分布方式
place-content: <align-content> / <justify-content>; // 不支持IE和Edge，不建议这种写法
grid-auto-columns: 10px; // 指定任何自动生成的网格轨道（也称为隐式网格轨道）的大小。 当网格项目多于网格中的单元格或网格项目放置在显式网格之外时，将创建隐式轨道。
grid-auto-rows: 10px; // 同上
```

***inline-grid***：将元素作为内联块级弹性网格布局显示 使用grid时父元素是block元素，而声明了inline-grid的父元素变成了inline元素.

***subgrid***：如果网格容器本身是网格项（嵌套网格容器），此属性用来继承其父网格容器的列、行大小。

