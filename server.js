import { app } from "./app.js"

const PORT = 8070

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}...`)
})