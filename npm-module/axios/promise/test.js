/*
 * @Author: yiwen.wu
 * @Date: 2021-04-14 09:33:11
 * @LastEditTime: 2021-04-14 09:46:52
 * @LastEditors: yiwen.wu
 * @Description: 
 * @FilePath: /js-exercise/npm-module/axios/promise/test.js
 */

const WuPromise = require('./index')

WuPromise.deferred = function(){
  let dfd = {};
  dfd.promise = new WuPromise(function(resolve, reject) {
      dfd.resolve = resolve;
      dfd.reject = reject;
  });
  return dfd;
}

module.exports = WuPromise
