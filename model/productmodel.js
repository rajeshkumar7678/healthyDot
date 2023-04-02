const mongoose=require("mongoose")

const productschema=mongoose.Schema({
    "title":String,
    "subtitle":String,
    "price":Number,
    "category":String,
    "type":String,
    "image":String,
    "rate":Number,
    "count":String,
    "off":Number,
    "quantity":Number,
    "max_unit":Number
})

const productmodel=mongoose.model("product",productschema)

module.exports={
    productmodel
}