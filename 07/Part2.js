const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var hands = []
var Worth = { "A": 14, "K": 13, "Q": 12, "J": 1, "T": 10, "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2 }
console.time("Part2")
lines.forEach(line => {
    var cards = line.split(" ")
    hands.push({ cards: cards[0].split("").map(x => Worth[x]), bid: parseInt(cards[1]) })
})

function popRanks(a) {
    var xMap = new Map()
    var xRank = 0
    var aJokerCount = a.cards.filter(x => x == 1).length
    a.cards.forEach(card => {
        if (xMap.has(card)) {
            xMap.set(card, xMap.get(card) + 1)
        } else {
            xMap.set(card, 1)
        }
    })
    xMap.forEach((value, key) => {
        if (value == 5 || value + aJokerCount == 5) {
            xRank = 10
        }
    })
    xMap.forEach((value, key) => {
        if ((value == 4 || value + aJokerCount == 4) && xRank == 0 && key != 1) {
            xRank = 9
            a.rank = xRank
            return a
        }
    })
    var xThree = false
    var xTwo = 0
    if (xRank == 0) {

        xMap.forEach((value, key) => {
            if (value == 3 && key != 1) {
                xThree = true
                xRank = 7
            }
            if (value == 2 && key != 1) {
                xTwo++
                xRank = xRank < 7 ? xTwo == 2 ? 6 : 5 : xRank
            }
        })
        if (xThree && xTwo) {
            xRank = 8
        }
        if (xTwo == 1 && aJokerCount == 1) {
            xRank = 7
        }
        if ((xThree && aJokerCount == 1) || (xTwo == 2 && aJokerCount == 1)) {
            xRank = 8
        }
        if (xRank == 0 && aJokerCount == 1) {
            xRank = 5
        }
        if (xRank == 0) {
            xRank = 1
        }
        if (xRank == 1 && aJokerCount == 2) {
            xRank = 7
        }
    }
    a.rank = xRank
    return a
}
hands = hands.map(x => popRanks(x))
function sortByRank(a, b) {
    var xRank = a.rank
    var yRank = b.rank
    if (xRank == yRank) {
        for (var i = 0; i < 5; i++) {
            if (a.cards[i] > b.cards[i]) {
                return 1
            } else if (a.cards[i] < b.cards[i]) {
                return -1
            }
        }
    }
    else {
        return xRank > yRank ? 1 : -1
    }
}
hands.sort(sortByRank)
var Bids = 0
for (var i = 0; i < hands.length; i++) {
    Bids += hands[i].bid * (i + 1)
}
console.log(Bids)