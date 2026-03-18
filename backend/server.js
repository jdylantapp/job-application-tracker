import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import jobRoutes from "./routes/jobs.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.send("API running")
})

app.use('/api/jobs', jobRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
        app.listen(process.env.PORT, () => {
            console.log(`server started on PORT: ${process.env.PORT}`)
        }) 
    })
    .catch((error) => {
        console.log('MongoDB connection error', error)
    })

