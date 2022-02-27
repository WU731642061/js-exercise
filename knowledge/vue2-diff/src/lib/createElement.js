// 真正创建dom节点
export default function createElement (vnode) {
  let domNode = document.createElement(vnode.sel)
  vnode.elm = domNode

  if (vnode.text && (vnode.children == undefined || vnode.children.length == 0)) {
    // 创建dom
    let textnode = document.createTextNode(vnode.text)
    domNode.appendChild(textnode)
    
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 处理子节点
    for (let i in vnode.children) {
      const child = vnode.children[i]
      domNode.appendChild(createElement(child))
    }
  }

  // 这里需要提供dom节点给递归处理地时候用
  return vnode.elm
}