var data = {
  _name: '初始值',
  name: ''
}

Object.defineProperty(data, 'name', {
  get: function() {
    return this._name
  },
  set: function (newVal) {
    console.log(newVal)
    // 对dom内容进行更新
    this._name = newVal
    document.getElementById('valueShow').innerHTML = newVal
  }
})

function initPage () {
  document.getElementById('input').value = data.name
  document.getElementById('valueShow').innerHTML = data.name
}

function inputChange () {
  var val = document.getElementById('input').value
  data.name = val
}

initPage()