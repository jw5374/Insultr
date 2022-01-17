const insultLine = document.querySelector(".insult")
const generateButton = document.querySelector("#insultspin")
const advButton = document.querySelector("#adverbspin")
const adjButton = document.querySelector("#adjectivespin")
const nounButton = document.querySelector("#nounspin")
const url = "http://localhost:8070"
let adverbs, adjectives, nouns
let advIndex, adjIndex, nounIndex

function randomIndex(max) {
    return Math.floor(Math.random() * max)
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

generateButton.addEventListener("click", (e) => {
    advIndex = randomIndex(adverbs.data.length)
    adjIndex = randomIndex(adjectives.data.length)
    nounIndex = randomIndex(nouns.data.length)
    insultLine.textContent = `${adverbs.data[advIndex]} ${adjectives.data[adjIndex]} ${nouns.data[nounIndex]}!`
})

advButton.addEventListener("click", (e) => {
    advIndex = randomIndex(adverbs.data.length)
    insultLine.textContent = `${adverbs.data[advIndex]} ${adjectives.data[adjIndex]} ${nouns.data[nounIndex]}!`
})

adjButton.addEventListener("click", (e) => {
    adjIndex = randomIndex(adjectives.data.length)
    insultLine.textContent = `${adverbs.data[advIndex]} ${adjectives.data[adjIndex]} ${nouns.data[nounIndex]}!`
})

nounButton.addEventListener("click", (e) => {
    nounIndex = randomIndex(nouns.data.length)
    insultLine.textContent = `${adverbs.data[advIndex]} ${adjectives.data[adjIndex]} ${nouns.data[nounIndex]}!`
})