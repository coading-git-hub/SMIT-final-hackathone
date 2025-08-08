
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
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())

app.use('/user', userRoutes)
app.use('/styles', styleRoutes)
app.use(errorHandler)

getConnection()
app.listen(process.env.PORT,()=>
    console.log(`Server is running on port ${process.env.PORT}`))