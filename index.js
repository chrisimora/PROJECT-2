import express from "express"
import cors from 'cors'
import routers from "./routes/routes.js"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import db from "./config/Database.js"
dotenv.config()

try {
    db.sync()
} catch (error) {

}
const app = express()
const PORT = 3001
// app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }))
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/api', routers)




app.listen(PORT, () => console.log(`Server running at port ${PORT}`))