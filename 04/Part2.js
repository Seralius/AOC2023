const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var totalCards = 0

function scoreCard(index){
    //console.log("Working on card " + index)
    totalCards++
    var line = lines[index]
    var a = line.split(":")
    var check = a[1].split("|")
    var nums = /\d+/g
    var mynums = check[0].match(nums)
    var winnums = check[1].match(nums)
    var intersect = mynums.filter(value => winnums.includes(value))
    if (intersect.length > 0) {
        for (var i = index+1; i < index +1+intersect.length; i++){
            scoreCard(i)
        }
    }
}
console.time("ExecutionTime");
lines.forEach((line, index) => {
    scoreCard(index)
    console.log("Done with card " + index)
})
console.log(totalCards)
console.timeEnd("ExecutionTime");