const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")
console.time("ExecutionTime");
var t = 0
lines = lines.map(line => line.split(":")[1].split("|").map(x => x.split(" ").map(y => parseInt(y)).filter(y => !isNaN(y))))
var PointTable = new Array(lines.length).fill(1)
lines.forEach((line, index) => {
    t += PointTable[index]
    var intersect = line[0].filter(value => line[1].includes(value)).length
    if (intersect > 0) {
        for (var i = index+1; i < index +1+intersect; i++){
            PointTable[i] += PointTable[index]
        }
    }
})
console.log(t)
console.timeEnd("ExecutionTime");