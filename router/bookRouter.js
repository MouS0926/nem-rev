const express=require("express")
const { bookModel } = require("../models/bookmodel")

const bookrouter=express.Router()


bookrouter.post("/add",async(req,res)=>{
    
    try {
        const book=new bookModel(req.body)
        await book.save()
        res.status(200).send({"msg":"A New book is added"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})


bookrouter.get("/",async(req,res)=>{
   
   
    try {
       
        const {search,page = 1, limit = 5}=req.query
        const skip=(page-1)*limit
        const tolimit=parseInt(limit)


    
       
        

        const searchByName = search ? { $or: [{ title: { $regex: search, $options: "i" } }, { author: { $regex: search, $options: "i" } }] } : {};
  
        const query={...searchByName}
    
      
        const books=await bookModel.find(query).skip(skip).limit(tolimit)
        
        res.status(200).send(books)
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})


bookrouter.get("/:id", async (req, res) => {
    try {
      const bookId = req.params.id;
      
      const book = await bookModel.findById(bookId);
      
      if (!book) {
        return res.status(404).send({ message: "Book not found" });
      }
      
      res.status(200).send(book);
    } catch (error) {
      res.status(400).send({ err: error.message });
      console.error(error);
    }
  });



  bookrouter.patch("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updatedBook=await bookModel.findByIdAndUpdate({_id:id},req.body)
        
        res.status(200).send({"msg":"book has been updated",updatedBook})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})


bookrouter.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try {
        const updatedEmp=await bookModel.findByIdAndDelete({_id:id})
        
        res.status(200).send({"msg":"book has been deleted"})
    } catch (error) {
        res.status(400).send({"err":error})
        console.log(error);
    }

})
module.exports={
    bookrouter
}

