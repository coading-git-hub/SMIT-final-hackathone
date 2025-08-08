
import dotenv from 'dotenv'
dotenv.config()
import express from "express";

import cors from 'cors'
import cookieParser from 'cookie-parser'
import getConnection from "./utils/getConnection.js";
import userRoutes from './routes/user.js'
import styleRoutes from './routes/styles.js'
import errorHandler from './middlewares/errorHandler.js'

const app = express()
// Trust proxy for secure cookies behind platforms like Render/Vercel/NGINX
app.set('trust proxy', 1)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/styles', styleRoutes)
app.use(errorHandler)
app.get(`/`,(req,res)=>{
    res.send("hello")
})

getConnection()
app.listen(process.env.PORT,()=>
    console.log(`Server is running on port ${process.env.PORT}`))