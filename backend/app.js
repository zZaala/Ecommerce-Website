import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import connectDb from './db/connectDb.js'
import router from './Routes/routes.js'
import multer from "multer"

const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const port=process.env.PORT 
const DATABASE_URL=process.env.DATABASE_URL
connectDb(DATABASE_URL)

app.use('/',router)


app.listen(port,(req,res)=>{
    console.log(`The Server is Running at http://localhost:${port}`)
})