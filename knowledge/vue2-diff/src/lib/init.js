import vnode from "./vnode"
import createElement from "./createElement"

// 判断是否是vnode
function isVNode(vnode) {
  return vnode.sel === '' || vnode.sel === undefined
}

function isSameVNode(oldVNode, newVNode) {
  return oldVNode.key === newVNode.key && oldVNode.sel === newVNode.sel
}

function updateChildren(parentElm, oldch, newch) {
  // 新前、新后、旧前、旧后
  let newStartIndex = 0
  let oldStartIndex = 0
  let newEndIndex = newch.length - 1
  let oldEndIndex = oldch.length - 1

  let newStartNode = newch[newStartIndex]
  let newEndNode = newch[newEndIndex]

  let oldStartNode = oldch[oldStartIndex]
  let oldEndNode = oldch[oldEndIndex]

  let keyMap = null
  
  // 开始命中四种策略
  while (newStartIndex <= newEndIndex && oldStartIndex <= oldEndIndex) {
    // 四个节点为空
    if (!oldStartNode) {
      oldStartNode = oldch[++oldStartIndex]
    } else if (!oldEndNode) {
      oldEndNode = oldch[--oldEndIndex]
    } else if (!newStartNode) {
      newStartNode = newch[++newStartNode]
    } else if (!newEndNode) {
      newEndNode = newch[--newEndIndex]
    } else if (isSameVNode(oldStartNode, newStartNode)) {
      // 新前 === 旧前
      pacthVnode(oldStartNode, newStartNode)
      newStartNode = newch[++newStartIndex]
      oldStartNode = oldch[++oldStartIndex]
    } else if (isSameVNode(oldEndNode, newEndNode)) {
      // 新后与旧后
      pacthVnode(oldEndNode, newEndNode)
      newEndNode = newch[--newEndIndex]     
      oldEndNode = oldch[--oldEndIndex]
    } else if (isSameVNode(oldStartNode, newEndNode)) {
      // 新后与旧前
      pacthVnode(oldStartNode, newEndNode)
      // 新后移到旧后后，旧前设为null
      parentElm.insertBefore(oldStartNode.elm, oldEndNode.elm.nextSibling)
    
      // 移动索引
      oldStartNode = oldch[++oldStartIndex]
      newEndNode = newch[--newEndIndex]
    } else if (isSameVNode(oldEndNode, newStartNode)) {
      // 新前与旧后
      // 新前移到旧前前，旧后设为null
      pacthVnode(oldEndNode, newStartNode)
      parentElm.insertBefore(oldEndNode.elm, oldStartNode.elm)

      oldEndNode = oldch[--oldEndIndex]
      newStartNode = newch[++newStartIndex]
    } else {
      // 四种策略，无法命中
      // 场景： old: a,c;   new: a, b, c
      // 上面new 中的b在上面四种场景都无法被命中，因此需要被特殊处理
      // 官方设计的方案，通过创建一个keyMap对象，来缓存oldch的key值，从而能够快速定位到插入的位置
      if (!keyMap) {
        keyMap = {}
        // 这里没必要从头开始计数，如果前面几项能通过新前新后匹配，代表已经处理完毕了
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
          const key = oldch[i].key
          if (key) {
            keyMap[key] = i
          }
        }
      }
      // 创建结束后，我们拿着当前的节点的key 去匹配这个keymap
      const idInOld = keyMap[newStartNode.key]

      if (!idInOld) {
        // 如果这个节点不存在，代表这是一个全新的节点，直接插入到oldStartNode 之前(因为上次匹配会是的 index +1 )
        parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm)
      } else {
        // 如果存在，就表示老的这一项需要被移动位置，同时还需要patch
        const elmToMove = oldCh[idInOld]
        // 这个时候还要判断，虽然key一样，但是可能被改变了sel值，因此要创建新的dom
        if (elmToMove.sel !== newStartNode.sel) {
          // 因为这里旧节点和新节点dom解绑了，因此不需要再将oldch[idInOld]设置为空了，因为两个不再是同一个节点了
          parentElm.insertBefore(createElement(newStartNode), oldStartNode.elm)
        } else {
          // 否则，需要patch，同时将oldch[idInOld] 设置为null
          pacthVnode(elmToMove, newStartNode)
          oldCh[idxInOld] = undefined
          parentElm.insertBefore(elmToMove.elm, oldStartNode.elm)
        }
      }

      // 最后当前节点前进
      newStartNode = newch[++newStartIndex]
    }
      
  }
  // 循环结束后，还有存在两种情况
  // newStartIndex <= newEndIndex, 增加的情况
  if (newStartIndex <= newEndIndex) {
    const before = newch[newEndIndex + 1] == null ? null : newch[newEndIndex + 1]
    for (; newStartIndex <=  newEndIndex; newStartIndex++) {
      parentElm.insertBefore(createElement(newch[newStartIndex]), before?.elm || null)
    }
  }
  // oldStartInde <= oldEndIndex, 全部删除的情况
  if (oldStartIndex <= oldEndIndex) {
    for (;oldStartIndex <= oldEndIndex; oldStartIndex++) {
      if (oldch[oldStartIndex] == null) {
        continue
      }
      parentElm.removeChild(oldch[oldStartIndex].elm)
    }
  }
}

function pacthVnode(oldVNode, newVNode) {
  // 当oldVNode 和 newVNode 是同一个节点
  if (oldVNode === newVNode) return
  // 如果不同，先将oldVNode.elm赋值过来，不然之后会报错
  newVNode.elm = oldVNode.elm
  // 判断 newVNode 有没有text属性，并且newVNode 没有children
  if (newVNode.text && (newVNode.children == undefined || !newVNode.children.length)) {
    if (newVNode.text !== oldVNode.text) {
      oldVNode.elm.innerText = newVNode.text
    }
  } else {
    // 新节点没有text属性，老节点可能是text，也可能有children
    if (oldVNode.children && oldVNode.children.length) {
      // 老节点有children，diff中最复杂的地方
      updateChildren(oldVNode.elm, oldVNode.children, newVNode.children)
    } else {
      createElement(newVNode)
      // 这里一定要 循环插入，不能用innerHtml，不然会失去vdom和真实dom之间的绑定关系
      for (let i in newVNode.children) {
        oldVNode.elm.appendChild(newVNode.children[i].elm)
      }
    }
  }
}

// 实现patch函数
// patch的作用在于更新dom，而非更新虚拟dom
export default function (oldVNode, newVNode) {
  // 判断oldnode是否是vnode
  if (isVNode(oldVNode)) {
    oldVNode = vnode(oldVNode.tagName.toLowerCase(), {}, [], undefined, oldVNode)
  }

  // 比较是否是同一个node,  同层比较，不同替换
  if (isSameVNode(oldVNode, newVNode)) {
    pacthVnode(oldVNode, newVNode)
  } else {
    let elm = oldVNode.elm
    let parent = elm.parentNode

    // 当不是同一个节点，那么触发更新机制
    createElement(newVNode)

    if (parent !== null) {
      parent.insertBefore(newVNode.elm, elm)
      parent.removeChild(elm)
    }
  }
}
