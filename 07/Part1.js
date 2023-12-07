const fs = require('fs')

var input = fs.readFileSync("input.txt").toString('utf-8')

var lines = input.split("\r\n")

var hands = []
var Worth = {"A": 14, "K": 13, "Q": 12, "J": 11, "T": 10, "9": 9, "8": 8, "7": 7, "6": 6, "5": 5, "4": 4, "3": 3, "2": 2}
console.time("Part1")
lines.forEach(line => {
    var cards = line.split(" ")
    hands.push({cards: cards[0].split("").map(x => Worth[x]), bid: parseInt(cards[1])})  
})

function sortByRank(a, b){
    var xMap = new Map()
    var yMap = new Map()
    var xRank = 0
    var yRank = 0
    a.cards.forEach(card => {
        if(xMap.has(card)){
            xMap.set(card, xMap.get(card) + 1)
        }else{
            xMap.set(card, 1)
        }
    })
    b.cards.forEach(card => {
        if(yMap.has(card)){
            yMap.set(card, yMap.get(card) + 1)
        }else{
            yMap.set(card, 1)
        }
    })
    xMap.forEach((value, key) => {
        if(value == 5){
            xRank = 10
        }
    })
    yMap.forEach((value, key) => {
        if(value == 5){
            yRank = 10
        }
    })
    xMap.forEach((value, key) => {
        if(value == 4){
            xRank = 9
        }
    })
    yMap.forEach((value, key) => {
        if(value == 4){
            yRank = 9
        }
    })
    var xThree = false
    var yThree = false
    var xTwo = 0
    var yTwo = 0
    xMap.forEach((value, key) => {
        if(value == 3){
            xThree = true
            xRank = 7
        }
        if(value == 2){
            xTwo++
            xRank = xTwo == 2 ? 6 : 5
        }
    })
    yMap.forEach((value, key) => {
        if(value == 3){
            yThree = true
            yRank = 7
        }
        if(value == 2){
            yTwo++
            yRank = yTwo == 2 ? 6 : 5
        }
    })
    if(xThree && xTwo){
        xRank = 8
    }
    if(yThree && yTwo){
        yRank = 8
    }
    if(xRank == 0){
        xRank = 1
    }
    if(yRank == 0){
        yRank = 1
    }
    a.rank = xRank
    b.rank = yRank
    if(xRank == yRank){
        for(var i = 0; i < 5; i++){
            if(a.cards[i] > b.cards[i]){
                return 1
            }else if(a.cards[i] < b.cards[i]){
                return -1
            }
        }
    }
    else{
        return xRank > yRank ? 1 : -1
    }
}
hands.sort(sortByRank)
var Bids = 0
for(var i = 0; i < hands.length; i++){
    Bids += hands[i].bid * (i + 1)
}
console.log(Bids)