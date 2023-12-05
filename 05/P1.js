const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var seeds = lines[0].split(" ").map(x => parseInt(x)).filter(x => !isNaN(x))

var mapLines = lines.filter(x => x.match(/^\w+-\w+-\w+ map:/m)).map(x => lines.indexOf(x))

function getArr(start, length){
    return Array.from(Array(length).keys()).map(x => x + start)
}

function getConvertMap(lineStart, lineEnd) {
    var mapList = {src: [], dest: []}
    var mapLines = lines.slice(lineStart + 1, lineEnd - 1).map(x => x.split(" ")).map(x => x.map(y => parseInt(y)))
    mapLines.forEach(x => {
        mapList.src = mapList.src.concat(getArr(x[1], x[2]))
        mapList.dest = mapList.dest.concat(getArr(x[0], x[2]))
    })
    return mapList
}
var maps = []
for (var i = 0; i < mapLines.length; i++) {
    var start = mapLines[i]
    var end = mapLines[i + 1]
    if (end == undefined) {
        end = lines.length
    }
    maps.push(getConvertMap(start, end))
}

function convertSeedToLocation(seed) {
    var steps = [seed]
    maps.forEach(x => {
        var currElem = steps[steps.length - 1]
        if (x.src.includes(currElem)) {
            steps.push(x.dest[x.src.indexOf(currElem)])
        }
        else {
            steps.push(currElem)
        }
    })
    return steps[steps.length - 1]
}
var locations = []
seeds.forEach(x => {
    locations.push(convertSeedToLocation(x))
    console.log("Done...")
})
console.log(Math.min(...locations))