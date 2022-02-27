import vnode from "./vnode";

import { isArr, isStr, isNum, isObj } from "../utils/helper";

// 为了只体验核心思想，这里暂时不实现像源码中的那样的函数重载功能，必须传入三个及以上参数
export default function h (sel, data, c) {
  if (arguments.length < 3) {
    throw new Error('必须传入3个参数')
  }

  if (isStr(c) || isNum(c)) {
    // 当content为字符串或数字时，函数处理
    return vnode(sel, data, undefined, c, undefined)
  } else if (isArr(c)) {
    c.forEach(item => {
      if (!isObj(item) || !item.hasOwnProperty('sel')) throw new Error(`${item} 不符合格式要求`)
    })
    return vnode(sel, data, c, undefined, undefined)
  } else if (isObj(c) && c.hasOwnProperty('sel')) {
    return vnode(sel, data, [c], undefined, undefined)
  } else {
    throw new TypeError('content 结构错误')
  }
}