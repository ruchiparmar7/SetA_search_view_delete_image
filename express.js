const express = require("express")
const mongoose = require("mongoose")
var app = express()

app.use(express.json())
app.use(express.static(__dirname))


mongoose.connect("mongodb://127.0.0.1:27017/MobileStore") 
var conn = mongoose.connection 
conn.on('connected',function(){ 
 console.log("Connected to mongoDB") 
}) 

const mobileSchema = new mongoose.Schema({
    mobileId: String, 
    name: String,
    brand: String,
    price: Number,
    processor: String,
    storage: String,
    image: String,
    quantity: Number
  });
const mobile = mongoose.model("mobile",mobileSchema,"Mobile");


app.get("/",function(req, res){
    res.sendFile(__dirname+"/mobile.html")
})

app.get("/api/mobile", function(req, res){
    mobile.find().then((data)=>{
        res.json(data)
    })
})

app.delete("/api/mobile/:id", function(req, res){
    const id = req.params.id 
        mobile.deleteOne({mobileId:id}).then((err,data)=>{ 
        res.json(data) 
    })
})

app.listen(5500, ()=>{
    console.log("Server Running on PORT Number: 5500");
})