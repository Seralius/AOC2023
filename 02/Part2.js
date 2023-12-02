const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')
var lines = input.split("\r\n")

var games = []

var blue = /\d+ blue/g
var red = /\d+ red/g
var green = /\d+ green/g


lines.forEach(m => {
    var x = {}
    var blues = m.match(blue)
    var reds = m.match(red)
    var greens = m.match(green)
    x.blues = blues.map(m => parseInt(m))
    x.reds = reds.map(m => parseInt(m))
    x.greens = greens.map(m => parseInt(m))
    games.push(x)
})
var filtered = games.map(m => {
    var maxRed = Math.max(...m.reds)
    var maxGreen = Math.max(...m.greens)
    var maxBlue = Math.max(...m.blues)
    return maxRed * maxGreen * maxBlue
})
var sum = filtered.reduce((a, b) => a + b, 0)
console.log(sum)