const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var points = 0

lines.forEach(line => {
    var a = line.split(":")
    var check = a[1].split("|")
    var nums = /\d+/g
    var mynums = check[0].match(nums)
    var winnums = check[1].match(nums)
    var intersect = mynums.filter(value => winnums.includes(value))
    if (intersect.length > 0) {
        var sum = 1
        intersect.pop();
        intersect.forEach(num => {
            sum *= 2
        })
        points += sum
    }
})
console.log(points)