const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');



const app=express();

 


mongoose.connect("mongodb://localhost:27017/PMS",{useUnifiedTopology:true,useNewUrlParser:true},()=>{
    console.log("connected to mongo db server");
})

let productSchema = new mongoose.Schema({
    name:String,
    price:Number,
    quantity:Number,
    color:String,
    description:String,
    rating:Number
});

let productModel=new mongoose.model('products',productSchema);



app.use(express.json());
app.use(cors());




app.get('/products',(req,res)=>{

    let products=productModel.find();
    res.send(products);

})


app.post('/products',(req,res)=>{

    let product =req.body;
    let proObj =  productModel(product);
    proObj.save();
    res.send("Product Created");
})


app.delete("/products/:id",async(req,res)=>{
   await produtModel.deleteOne({"_id":req.params.id});
    res.send("product deleted");
});

app.put("/products/:id",async(req,res)=>{
    const id=req.params.id;
    const data =req.body;

    await productModel.updateOne({"_id":id},{$set:data});
    res.send("product updated");
});



app.listen(5000,function(){
    console.log("server is running");
});