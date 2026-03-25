import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import jobRoutes from "./routes/jobs.js"
import rateLimiter from './middleware/rateLimiter.js'

dotenv.config()

const app = express()

app.use(cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL
    ].filter(Boolean)
}));

app.use(express.json())
app.use(rateLimiter)

app.get("/", (request, response) => {
    response.send("API running")
})

app.use('/api/jobs', jobRoutes)

const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
        app.listen(PORT, () => {
            console.log(`server started on PORT: ${PORT}`)
        }) 
    })
    .catch((error) => {
        console.log('MongoDB connection error', error)
    })

