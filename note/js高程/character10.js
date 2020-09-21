/*
 * @Author: your name
 * @Date: 2020-08-11 15:55:23
 * @LastEditTime: 2020-08-29 14:47:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /js-exercise/note/js高程/character10.js
 */
// DOM

// DOM：文档对象模型，针对HTML和XML文档的一个api
// 不同的浏览器内核实现的稍有不同，但是基本都会遵守一个相同的规范 

// 基本概念：
// 文档节点：每个文档的根节点
// 文档元素：文档的最外层元素，在html文件中，文档元素就是<html>元素

<html>
  <head>
    <title>demo</title>
  </head>
  <body>
    <p>hello world</p>
  </body>
</html>

// 上述html转换成对应的层次结构：
// Document
//    |
//    ╰ Element Html
//           |
//           ╰ Element Head
//           |      |
//           |      ╰ Element Title
//           |      |
//           |      ╰ Text demo
//           |
//           ╰ Element body
//                  | 
//                  ╰ Element p
//                       |
//                       ╰ Text hello world

// 节点类型：用来表示文档树中的每一个节点，一共有12中节点类型
// 1. Node类型
// 由DOM中的所有节点类型实现，除了IE以外的所有浏览器都实现了这个类型。所有节点类型都继承自Node类型，也就是所谓的基类型
Node.ELEMENT_NODE // 1, node类型的属性返回值是一个数字

Node.ATTRIBUTE_NODE // 2
Node.TEXT_NODE // 3
Node.CDATA_SECTION_NODE // 4
Node.ENTITY_REFERENCE_NODE // 5
Node.ELEMENT_NODE // 6
Node.PROCESSING_INSTRUCTION_NODE // 7
Node.COMMENT_NODE // 8
Node.DOCUMENT_NODE // 9
Node.DOCUMENT_TYPE_NODE // 10
Node.DOCUMENT_FRAGMENT_NODE // 11
Node.NOTATION_NODE // 12

// DOM的部分属性
dom.nodeName // 返回节点的标签名
dom.nodeType // 返回节点的类型
dom.nodeValue // null

// 节点关系
// 节点和节点之间存在的，父子，兄弟等关系，可以通过一系列的方法去获取这种关系
dom.childNodes // 返回一个类数组对象，是一组有序的节点，拥有length值
dom.childNodes.item(1) // 可以通过item方法访问
dom.childNodes[1] // 也可以通过下标访问

dom.parentNode // 可以访问父节点, HTML的parentNode为null
dom.previousSibling // 返回兄弟节点中的前一个节点
dom.nextSibling // 返回兄弟节点中的后一个节点
dom.firstChild // 返回第一个子节点
dom.lastChild // 返回最后一个子节点

dom.ownerDocument // 该属性指向整个文档的文档节点

// 操作节点(重点)
dom.appendChild(node) // 向该节点的childNodes列表的末尾添加一个节点
dom.insertBefore(newNode, someNode.someChild) //  如果someNode为null，这默认插入最后一个位置
dom.replaceChild(newChild, someNode.someChild) // 替换节点在某个为止插入新的dom元素，并删除指定的dom元素
dom.removeChild(someNode.someChild) // 移除某个节点
dom.cloneChild(boolean) // 克隆一个节点，参数为布尔值，表示是否要深度克隆，IE存在一个bug，会克隆节点事件

// 2. Document类型

