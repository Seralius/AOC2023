const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

console.time("Part2")
var Times = parseInt(lines[0].match(/\d+/g).join(""))
var Dist = parseInt(lines[1].match(/\d+/g).join(""))
var begBeat = 0
var endBeat = 0
var i = 0
while (begBeat == 0) {
    var Travelled = (Times - i) * i
    if (Travelled > Dist) {
        begBeat = i
    }
    i++
}
i = Times
while (endBeat == 0) {   
    var Travelled = (Times - i) * i
    if (Travelled > Dist) {
        endBeat = i
    }
    i--
}

var TimesBeat = endBeat - begBeat
console.log(TimesBeat+1)
console.timeEnd("Part2")