// 这个联系参考自 https://github.com/muhammederdem/vue-interactive-paycard
// 这边没有使用vue-cli去生成一个vue的项目，而是外部引入的vue的库

var app = new Vue({
  el: '#app',
  data: function(){
    return {
      cardNumber: '',
      cardName: '',
      cardMonth: '',
      cardYear: '',
      minCardYear: new Date().getFullYear(),
    }
  },
  computed: {
    minCardMonth() {
      if (this.cardYear === this.minCardYear) {
        return new Date().getMonth() + 1
      }
      return 1;
    }
  }, 
  watch: {
    cardNumber(newVal, oldVal){
      let rawVal = newVal.replace(/ /g, '')
      if (rawVal.length > 19){
        this.cardNumber = oldVal
        return
      }
      if ( isNaN(rawVal) === true){
        this.cardNumber = oldVal
        return
      }
      let formatVal = rawVal.replace(/(\d{4})(?=\d)/g, '$1 ')
      this.cardNumber = formatVal
    }
  }
})