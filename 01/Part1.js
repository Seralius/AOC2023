const fs = require('fs')




//Day1 Part2 -- is brokey, maybe im putting the C# Solution here if im not lazy
var input = fs.readFileSync("input.txt").toString('utf-8')
var lines = input.split("\r\n")
var rep = ["one","two","three","four","five","six","seven","eight","nine"]
var sum = 0;
var reg = /(one|two|three|four|five|six|seven|eight|nine|\d)/g
lines.forEach(m => {
    var x = m.match(reg)
    var first = x[0]
    var last = x.pop();
    first = conv(first)
    last = conv(last)
    console.log(first + last)
    sum += parseInt(first + last)
})

function conv(a) {
    if (rep.includes(a)) {
        return (rep.indexOf(a) + 1 + "") 
    }
    return a
}
