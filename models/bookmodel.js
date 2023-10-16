const mongoose=require("mongoose")
const bookSchema=mongoose.Schema({
    title:String,
    author:String,
    isbn:String,
    desc:String,
    pub_date:String
},{
    versionKey:false
})
const bookModel=mongoose.model("book",bookSchema)

module.exports={
    bookModel
}

