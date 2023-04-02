const express=require("express")
const userroute=express.Router()
let {usermodel}=require("../model/usermodel")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');


userroute.post("/add",async(req,res)=>{
    let{email,name,password}=req.body
    try {
        bcrypt.hash(password, 2, async(err, hash)=> {
            // Store hash in your password DB.
            let data=new usermodel({name,email,password:hash})
            await data.save()
            console.log(data)
            res.status(200).send({"msg":"Registration Successful"})
        });
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }

})

userroute.post("/login",async(req,res)=>{
    let {email,password}=req.body
       
    try {
        let data=await usermodel.find({email})
        console.log(data)
        if(data.length>0){
            bcrypt.compare(password, data[0].password, (err, result)=> {
                if(result){
                    res.status(200).send({"msg":`login sucessfull`,"name":data[0].name,"token":jwt.sign({"userid":data[0]._id }, 'masai',{expiresIn:"1hr"})})
                }else{
                    res.status(400).send({"msg":"user not found"})
                }
            });
        }       
    } catch (error) {
        res.status(400).send({"msg":error})
        
    }
})

module.exports={
    userroute
}