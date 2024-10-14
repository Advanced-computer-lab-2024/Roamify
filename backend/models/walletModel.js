 const mongoose = require('mongoose');
const walletSchema=new mongoose.Schema({
    cardNumber:{
        type:String,
        
    },
    cardValidUntil:{
        type:Date,
        
    }

})

const walletModel = mongoose.model('wallet', walletSchema);
module.exports = walletModel;