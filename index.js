const express=require("express")
require("dotenv").config()
const {connection}=require("./db")
const {userroute}=require("./routes/userroute")
const {pro}=require("./routes/productroute")
const cors=require("cors")

const app=express()
app.use(cors())
app.use(express.json())

app.use("/home",pro)
app.use("/user",userroute)






app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("db is connected")
        
    } catch (error) {
        console.log("error occure")
    }
    console.log("server is running")
})