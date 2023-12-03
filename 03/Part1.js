const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var num = /\d+/g

var valid = []
lines.forEach((line, linenum) => {
    var nums = line.match(num)
    if (nums == null) return;
    nums.forEach(number => {
        var x = line.indexOf(number)
        var y = line.indexOf(number) + number.length - 1
        //Check for Symbol that is not .
        var befpoint = line[x-1]
        var aftpoint = line[y+1]
        var onTop = false
        var onBottom = false

        //--> Basically all the Logic here <--
        if (linenum != 0) {
            var onTop = lines[linenum-1].substring(x-1, y+2).replace(/\./g, "").length != 0
        }
        if (linenum != lines.length-1) {
            var onBottom = lines[linenum+1].substring(x-1, y+2).replace(/\./g, "").length != 0
        }
        var isVal = (befpoint != undefined && befpoint != ".") || (aftpoint != undefined && aftpoint != ".")
        if(isVal || onTop || onBottom) {
            console.log(`Number ${number} is valid because of ${isVal == true ? "sameLine" : ""} ${onTop == true ? "onTop" : ""} ${onBottom == true ? "onBottom" : ""}`)
            valid.push(parseInt(number))
        }
        input.replace(number, ".".repeat(number.length))
        line = line.replace(number, ".".repeat(number.length))
        //--> Basically all the Logic here <--
    })
})
console.log(valid.reduce((a, b) => a + b, 0))