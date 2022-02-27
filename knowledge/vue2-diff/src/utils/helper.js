export function isStr (str) {
  return Object.prototype.toString.call(str) === '[object String]'
}

export function isNum (num) {
  return Object.prototype.toString.call(num) === '[object NUmber]'
}

export function isArr (arr) {
  return Array.isArray(arr)
}

export function isObj (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}