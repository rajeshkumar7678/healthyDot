const mongoose=require("mongoose")

let userschema=mongoose.Schema({
    email:{ type : String, required : true, unique : true },
    name:{ type : String, required : true },
    password:{ type : String, required : true }
})

const usermodel=mongoose.model("userdetail",userschema)

module.exports={
    usermodel
}