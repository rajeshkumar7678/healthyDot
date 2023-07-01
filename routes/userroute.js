const express=require("express")
const userroute=express.Router()
let {usermodel}=require("../model/usermodel")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');


userroute.get("/",(req,res)=>{
    res.send("user route")
})
 
 
userroute.post("/add", async(req,res)=>{
     try {
         let {name,email,password}=req.body
         let user=await usermodel.findOne({email})
         console.log(user)
 
         if(user){
             return res.status(400).send({"msg":"already exist please login"})
         }
 
         let hashpasswod= bcrypt.hashSync(password,6)
 
         let newuser= new usermodel({name,email,password:hashpasswod})
         
         let dbnewuser=await newuser.save()
 
         
         res.status(200).send({"msg":"User registered successfully."})
  
        } catch (error) {
         res.status(400).send(error)
         //console.log(error)
        }
})

userroute.post("/login",async(req,res)=>{
    let {email,password}=req.body
       
    try {
        let data=await usermodel.findOne({email})
        console.log(data)
        if(data){
            bcrypt.compare(password, data.password, (err, result)=> {
                if(result){
                    res.status(200).send({"msg":`login sucessfull`,"name":data.name,"token":jwt.sign({"userid":data._id }, 'rajesh',{expiresIn:"1hr"})})
                }else{
                    res.status(400).send({"msg":"user not found"})
                }
            });
        } else{
            res.send("uer not found")
        }      
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})

module.exports={
    userroute
}