function CalculateTime () {
    this.start = 0
    this.end = 0
}

CalculateTime.prototype.startCal = function () {
    this.start = new Date().getTime()
}

CalculateTime.prototype.endCal = function () {
    this.end = new Date().getTime()
}

CalculateTime.prototype.calculate = function() {

    const difftime = (this.end - this.start) / 1000  // 转换成秒 

    const days = parseInt(difftime/86400); // 天  24*60*60

    const hoursBase = difftime%(24*3600); // 计算 总时间-天数的剩余
    const hours = parseInt(hoursBase/3600);    // 小时 60*60 

    const minutesBase = hoursBase%3600; // 计算 总小时数-小时的余数
    const minutes = parseInt(minutesBase/60); // 分钟

    const seconds = parseInt(minutesBase%60);  // 以60秒为一整份 取余 剩下秒数

    const millisecond = String(difftime).split(".")[1]

    return `${hours}小时${minutes}分钟${seconds}秒${millisecond}毫秒`
}

CalculateTime.prototype.updateTime = function() {
    let timeHtml = $('.left-inner')
    timeHtml.innerHTML =  "耗时：" + this.calculate()
}