import mySnabbdom from "./lib/index.cjs.js";

const {
  h,
  patch
} = mySnabbdom

const vDom = h('div', {key: 'meta'}, [
  h('div', { key: 'a' }, 'aaa'),
  h('div', { key: 'b' }, 'bbb'),
  h('div', { key: 'c' }, 'ccc'),
  h('div', { key: 'd' }, 'ddd')
])

const vDom2 = h('div', {key: 'meta'}, [
  h('div', { key: 'a' }, 'aaa'),
  h('div', { key: 'k' }, 'kkk'),
  h('div', { key: 'b' }, 'bbb')
])

const vDom3 = h('div', {key: 'meta'}, [
  h('div', { key: 'b' }, 'bbbb'),
  h('div', { key: 'c' }, 'ccc'),
  h('div', { key: 'a' }, 'aaab')
])

const container = document.getElementById('container')

patch(container, vDom)


document.getElementById('pacth').onclick = function () {
  patch(vDom, vDom2)
}

document.getElementById('pacth2').onclick = function () {
  patch(vDom2, vDom3)
}

document.getElementById('pacth3').onclick = function () {
  patch(vDom3, vDom)
}
