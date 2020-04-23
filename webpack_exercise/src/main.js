import _ from 'lodash';
import './style.css';
import print from './print'

console.log('学习 webpack')

function component() {
  var element = document.createElement('div');

  // Lodash, now imported by this script
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  var btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = print;
  element.appendChild(btn);

  return element;
}

print()

document.body.appendChild(component());