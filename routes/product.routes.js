const express = require("express");
const { ProductModel  } =  require("../model/product.model.js");
const { auth } =  require("../middleware/auth.middleware.js");

const productRouter = express.Router();

productRouter.get("/products", async(req, res) => {
    const data = await ProductModel.find();
  res.status(200).send(data);
});


productRouter.get("/products/:id?", async (req, res) => {
    const { id } = req.params;
    try {
      if (id) {
        const product = await ProductModel.findOne({ _id: id });
        if (!product) {
          return res.status(404).send({ msg: "Product not found" });
        }
       
      } else {
        return res.status(200).send(product);
      }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });



productRouter.post("/products/add", auth, (req, res) => {
  try {
    const newProduct = new ProductModel(req.body);
    newProduct.save();
    res.status(200).send({ msg: "product added" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
});


productRouter.patch("/products/update/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send({"msg":`the product with id:${id} has been updated`})
    } catch (err) {
        res.status(400).send({ "error": err.message })
    }
})


productRouter.delete("/products/delete/:id", async (req, res) => {
    let { id } = req.params;
    try {
        await ProductModel.findByIdAndDelete({ _id: id } ); 
        res.status(200).send({"msg":`the product with id:${id} has been deleted`})
    } catch (err) {
        res.status(400).send({ "error": err.message })
    }
})

module.exports = { productRouter };
