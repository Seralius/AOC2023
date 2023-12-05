const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var seeds = lines[0].split(" ").map(x => parseInt(x)).filter(x => !isNaN(x))

var mapLines = lines.filter(x => x.match(/^\w+-\w+-\w+ map:/m)).map(x => lines.indexOf(x))
var maps = []
for (var i = 0; i < mapLines.length; i++) {
    var start = mapLines[i]
    var end = mapLines[i + 1]
    if (end == undefined) {
        end = lines.length
    }
    maps.push(lines.slice(start + 1, end - 1).map(x => x.split(" ")).map(x => x.map(y => parseInt(y))))
}
console.log(maps)
function convertSeedToLocation(seed){
    var steps = [seed]
    maps.forEach(x => {
        var currElem = steps[steps.length - 1]
        var newNum = currElem
        x.forEach(y => {
            if(currElem >= y[1] && currElem <= y[1] + y[2]){
                newNum = y[0] + currElem - y[1]
            }
        })
        steps.push(newNum)
    })
    return steps[steps.length - 1]
}
var locations = []
seeds.forEach(x => {
    locations.push(convertSeedToLocation(x))
    console.log("Done...")
})
console.log(Math.min(...locations))