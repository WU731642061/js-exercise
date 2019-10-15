let obj = {
    Tom: 18,
    Jhon: 20,
    Eric: 24
}

function test(name){
    console.log(this)
    console.log(this.Tom)
}

test.call(obj)