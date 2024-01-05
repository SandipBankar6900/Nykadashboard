
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  picture: String ,
  description: String ,
  gender: String,
  category:String,
  price:Number,
  
});


const ProductModel = mongoose.model('product', productSchema);
module.exports = {
    ProductModel 
}