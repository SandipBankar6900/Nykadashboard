const express = require("express");
const { ProductModel } = require("../models/product.model");

const productRouter = express.Router();

productRouter.get("/products",async(req,res)=>{

    try {
        const product = await ProductModel.find();

        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});

productRouter.get("/products/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await ProductModel.find({_id:id});

        return res.status(200).send(product)
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});

productRouter.post("/products",async(req,res)=>{
    
    try {
        const product =new ProductModel(req.body);
        await product.save()
        return res.status(201).send({message:"New Product has been added in store","product":product})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});

productRouter.patch("/products/:id",async(req,res)=>{
    const {id} = req.params;

    try {
        await ProductModel.findByIdAndUpdate({_id:id},req.body)
        res.status(204).send({message:"product has been updated"})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});

productRouter.delete("/products/:id",async(req,res)=>{
    const {id} = req.params;

    try {
        await ProductModel.findByIdAndDelete({_id:id})
        res.status(202).send({message:"product has been deleted"})
    } catch (error) {
        return res.status(400).send({message:error.message})
        
    }
});
module.exports ={productRouter}