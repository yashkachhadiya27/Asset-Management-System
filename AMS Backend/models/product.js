import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
  },
  processor: String,
  generations: String,
  location: {
    type: String,
    required: true,
  },
  purchaseYear: Number,
  ram: String,
  hdd: String,
  ssd: String,
  screenType: String,
  ip:String,
});



export const productModel = mongoose.model('Product', productSchema);
