// module imports
import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import helmet from "helmet"
import * as errFuncs from "./errorHandlers/errorFuncs.js"

// routes
import fetches from "./routes/fetchRouter.js"

const app = express()

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use('/', express.static('public', { extensions: ["html", "htm"] }))

app.use('/data', fetches)

// error handlers (using next(error) to pass on errors)
app.use(errFuncs.logErrors)
app.use(errFuncs.clientErrorHandler)
app.use(errFuncs.errorHandler)

export { app }