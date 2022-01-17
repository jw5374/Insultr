const insultLine = document.querySelector(".insult")
const generateButton = document.querySelector("#insultspin")
const advButton = document.querySelector("#adverbspin")
const adjButton = document.querySelector("#adjectivespin")
const nounButton = document.querySelector("#nounspin")
const cyclesetting = document.querySelector("#togglecycle")
const url = "http://localhost:8070"
let cycleIndicator = document.querySelector("#cycleindicator")
let adverbs, adjectives, nouns
let indexes =  {
    advIndex: null,
    adjIndex: null,
    nounIndex: null
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms))
}

function randomIndex(max) {
    return Math.floor(Math.random() * max)
}

function setLine() {
    insultLine.textContent = `${adverbs.data[indexes.advIndex]} ${adjectives.data[indexes.adjIndex]} ${nouns.data[indexes.nounIndex]}!`
}

async function cycleWords(index, value, key) {
    for(let i = value-7; i <= value; i++) {
        index[key] = i
        await timer((1/(value-i)) * 300)
        setLine()
    }
}

async function fetchAll() {
    try {
        await fetch(url + '/data/adverbs', { method: "GET" })
            .then(res => res.json())
            .then(data => {
                adverbs = data
            })
        await fetch(url + '/data/adjectives', { method: "GET" })
            .then(res => res.json())
            .then(data => {
                adjectives = data
            })
        await fetch(url + '/data/nouns', { method: "GET" })
            .then(res => res.json())
            .then(data => {
                nouns = data
            })
    } catch (e) {
        console.log(e)
    }
}

fetchAll()

cyclesetting.addEventListener("click", (e) => {
    cycleIndicator.textContent = cycleIndicator.textContent == "On" ? "Off" : "On"
})

generateButton.addEventListener("click", (e) => {
    indexes.advIndex = randomIndex(adverbs.data.length)
    indexes.adjIndex = randomIndex(adjectives.data.length)
    indexes.nounIndex = randomIndex(nouns.data.length)
    if(cycleIndicator.textContent == "On") {
        cycleWords(indexes, indexes.advIndex, "advIndex")
        cycleWords(indexes, indexes.adjIndex, "adjIndex")
        cycleWords(indexes, indexes.nounIndex, "nounIndex")
    } else {
        setLine()
    }
})

advButton.addEventListener("click", (e) => {
    indexes.advIndex = randomIndex(adverbs.data.length)
    if(cycleIndicator.textContent == "On") {
        cycleWords(indexes, indexes.advIndex, "advIndex")
    } else {
        setLine()        
    }
})

adjButton.addEventListener("click", (e) => {
    indexes.adjIndex = randomIndex(adjectives.data.length)
    if(cycleIndicator.textContent == "On") {
        cycleWords(indexes, indexes.adjIndex, "adjIndex")
    } else {
        setLine()
    }
})

nounButton.addEventListener("click", (e) => {
    indexes.nounIndex = randomIndex(nouns.data.length)
    if(cycleIndicator.textContent == "On") {
        cycleWords(indexes, indexes.nounIndex, "nounIndex")
    } else {
        setLine()
    }
})