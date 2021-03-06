import express from "express"
import fs from "fs"

let adjectives, nouns, adverbs

fs.readFile("./data/adjectives.json", { encoding: "utf-8" }, (err, data) => {
    if(err) console.log(err)
    adjectives = JSON.parse(data)
})

fs.readFile("./data/nouns.json", { encoding: "utf-8" }, (err, data) => {
    if(err) console.log(err)
    nouns = JSON.parse(data)
})

fs.readFile("./data/adverbs.json", { encoding: "utf-8" }, (err, data) => {
    if(err) console.log(err)
    adverbs = JSON.parse(data)
})

const fetchRouter = express.Router()

fetchRouter.get('/adjectives', async (req, res, next) => {
    try {
        res.json(adjectives)
    } catch (error) {
        next(error)    
    }
})

fetchRouter.get('/nouns', async (req, res, next) => {
    try {
        res.json(nouns)
    } catch (error) {
        next(error)
    }
})

fetchRouter.get('/adverbs', async (req, res, next) => {
    try {
        res.json(adverbs)
    } catch (error) {
        next(error)
    }
})

export default fetchRouter