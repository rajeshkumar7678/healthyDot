const mongoose=require("mongoose")

let userschema=mongoose.Schema({
    email:String,
    name:String,
    password:String
})

const usermodel=mongoose.model("userdetail",userschema)

module.exports={
    usermodel
}