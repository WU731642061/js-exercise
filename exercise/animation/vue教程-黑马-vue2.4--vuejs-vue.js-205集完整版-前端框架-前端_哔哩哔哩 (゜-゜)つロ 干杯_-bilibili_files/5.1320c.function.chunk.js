(window.webpackJsonpwebpackLogReporter=window.webpackJsonpwebpackLogReporter||[]).push([[5],{82:function(e,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=r(o(10)),a=r(o(2));function r(e){return e&&e.__esModule?e:{default:e}}function i(e,n){for(var o=0;o<n.length;o++){var t=n[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var c=function(){function e(){!function(e,n){if(!(e instanceof n))try{throw new TypeError("Cannot call a class as a function")}catch(e){}}(this,e),this.onloaded(this.showRawPerformance)}var n,o,r;return n=e,(o=[{key:"onloaded",value:function(e){var n=this;e.call(n),window.addEventListener("load",function(){setTimeout(function(){e.call(n)},1e3)})}},{key:"showRawPerformance",value:function(){if(window.performance&&window.performance.timing&&window.performance.timing.domComplete>0){var e=window.performance.timing;this.todo(e)}}},{key:"todo",value:function(e){var n={type:"performance",obj:a.default.assignObject({},e)};t.default.receiveMsg(n)}}])&&i(n.prototype,o),r&&i(n,r),e}();n.default=c}}]);