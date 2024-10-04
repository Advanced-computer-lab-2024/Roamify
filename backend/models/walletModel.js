 const mongoose = require('mongoose');
const walletSchema=new mongoose.Schema({
    availableBalance:{
        type:Number,
        Default:0
        //required:true
    },
    totalSpent:{
        type:Number,
        Default:0
        //required:true
    },
    cardNumber:{
        type:String,
        
    },
    cardValidUntil:{
        type:Date,
        
    }

})
const walletModel = mongoose.model('wallet', walletSchema);
module.exports = walletModel;