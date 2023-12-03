const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")
var sums = []
function getAdjNumbers(lines, lineIndex, charIndex) {
    function isDigit(char) {
        return /\d/.test(char);
    }
    let adjacentNumbers = new Set();
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            let newRow = lineIndex + i;
            let newCol = charIndex + j;

            if (newRow >= 0 && newRow < lines.length && newCol >= 0 && newCol < lines[newRow].length) {
                let char = lines[newRow][newCol];
                if (isDigit(char)) {
                    let numStr = char;
                    let offset = 1;
                    while (newCol + offset < lines[newRow].length && isDigit(lines[newRow][newCol + offset])) {
                        numStr += lines[newRow][newCol + offset];
                        offset++;
                    }
                    offset = 1;
                    while (newCol - offset >= 0 && isDigit(lines[newRow][newCol - offset])) {
                        numStr = lines[newRow][newCol - offset] + numStr;
                        offset++;
                    }
                    adjacentNumbers.add(numStr);
                }
            }
        }
    }
    return Array.from(adjacentNumbers);
}
lines.forEach((line, linenum) => {
    var stars = /\*/g
    var allStars = line.match(stars)
    if (allStars == null) return;
    allStars.forEach(star => {
        var Nums = getAdjNumbers(lines, linenum, line.indexOf(star))
        if (Nums.length == 2) {
            var fullnum = Nums.reduce((a, b) => a * b, 1)
            sums.push(fullnum)
            console.log(fullnum)
        }
        line = line.replace(star, ".")
    })
})
console.log(sums.reduce((a, b) => a + b, 0))