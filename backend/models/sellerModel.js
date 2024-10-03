const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'businessUser',
    unique:true
  },
    description: {
        type: String,
        required: true
    }
   


},{timestamps:true});
const sellerModel = mongoose.model('seller', sellerSchema);
module.exports = sellerModel;