const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

console.log('开始测试')
function WPromise(callback) {
  this.promiseState = PENDING
  this.promiseResult = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  function resolve(result) {
    if (this.promiseState === PENDING) {
      setTimeout(() => {
        this.promiseState = FULFILLED
        this.promiseResult = result
        this.onFulfilledCallbacks.forEach(fn => {
          fn(result)
        })
      })
    }
  }

  function reject(reason) {
    if (this.promiseState === PENDING) {
      setTimeout(() => {
        this.promiseState = REJECTED
        this.promiseResult = reason
        this.onRejectedCallbacks.forEach(fn => {
          fn(reason)
        })
      })
    }
  }

  try {
    callback(resolve.bind(this), reject.bind(this))
  } catch (e) {
    reject(e)
  }
}

WPromise.prototype.then = function (onFulfilled, onRejected) {
  const _this = this;
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
  onRejected = typeof onRejected === 'function' ? onRejected : (reason) => {
    throw reason
  };

  const promise2 = new WPromise((resolve, reject) => {
    if (_this.promiseState === FULFILLED) {
      setTimeout(() => {
        try {
          let x = onFulfilled(_this.promiseResult)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (_this.promiseState === REJECTED) {
      setTimeout(() => {
        try {
          let x = onRejected(_this.promiseResult)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    } else if (_this.promiseState === PENDING) {
      _this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onFulfilled(_this.promiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      _this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            let x = onRejected(_this.promiseResult)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })
  return promise2
}

/**
 * @param {promise} promise2 promise1.then方法返回的新的promise对象
 * @param {[type]} x promise1中的onFulfilled或者onRejected的方法的返回值
 * @param {[type]} resolve promise2的resolve方法
 * @param {[type]} reject promise2的reject方法
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  if (x instanceof WPromise) {
    if (x.promiseState === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject);
    } else if (x.promiseState === FULFILLED) {
      resolve(x.promiseResult);
    } else if (x.promiseState === REJECTED) {
      reject(x.promiseResult);
    }
  } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
    try {
      var then = x.then;
    } catch (e) {
      return reject(e);
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          r => {
            if (called) return;
            called = true;
            reject(r);
          }
        )
      } catch (e) {
        if (called) return;
        called = true;

        reject(e);
      }
    } else {
      resolve(x);
    }
  } else {
    return resolve(x);
  }
}

// 实现promsie .catch方法
WPromise.prototype.catch = function(callback) {
  // 由于catch方法是一个语法当，是.then(null, callback)的另一种形式。这里直接调用即可
  return this.then(null, callback)
}

// 实现promise .finally方法
// 先参考一个这个实力
// var demo = new Promise((resolve, reject) => {resolve(1)})

// demo.then((res) => {
//   console.log(1)
//   return 2
// }).finally(() => {
//   console.log(3)
// }).then(res => {
//   console.log(res)
// })
WPromise.prototype.finally = function(callback) {
  // 这里需要注意的是，finally方法是一定最后执行的，且和上面的.then .catch的结果已经无关了
  // 但是！！！如果上一个.then调用的结果有返回值，会在finally这里被传递下去
  // 我们只需要保证执行顺序即可，即创建一个新的promsie
  // 这里要处理一下，因为callback可能是一个promsie
  return this.then(
    data => {
      return WPromise.resolve(callback()).then(() => data)
    },
    err => {
      return WPromise.resolve(callback()).then(() => {throw err})
    })
}

// 为了上面的finally写的更加舒服，这里先实现一个静态方法resolve
WPromise.resolve = function(value) {
  return new WPromise((resolve, reject) => {
        resolve(value)
  })
}

WPromise.reject = function(reason) {
  return new WPromise((resolve, reject) => {
    reject(err)
  })
}

WPromise.all = function(promiseList) {
  // all的特性是所有的都resolve，才resolve，否则reject
  return new Promise((resolve, reject) => {
    let resolveCount = 0
    const r = Array(promiseList.length)
    promiseList.forEach((promise, index) => {
      WPromise.resolve(promise).then(res => {
        r[index] = res
        resolveCount++
        if (resolveCount === promiseList.length) {
          resolve(r)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}

// 测试用例
WPromise.deferred = function () {
  let dfd = {};
  dfd.promise = new WPromise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}

module.exports = WPromise
