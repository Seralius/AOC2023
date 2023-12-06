const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

console.time("Part1")
function calcRace(maxMili){
    var times = []
    for (let holding = 0; holding < maxMili; holding++) {
        var TravelDist = (maxMili - holding) * holding
        times.push(TravelDist)
    }
    return times
}
var Times = lines[0].match(/\d+/g).map(x => parseInt(x))
var Dist = lines[1].match(/\d+/g).map(x => parseInt(x))
var Filtered = []
for (let i = 0; i < Times.length; i++) {
    var Games = calcRace(Times[i])
    var BiggerDist = Games.filter(x => x > Dist[i])
    Filtered.push(BiggerDist.length)
}

var result = Filtered.reduce((a, b) => a * b, 1);
console.log(result)
console.timeEnd("Part1")