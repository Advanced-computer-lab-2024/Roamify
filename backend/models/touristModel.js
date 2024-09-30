const mongoose = require('mongoose')


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
        type:String
    }

})

const touristSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique: true
    },
    userName:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true

    },
    nationality:{
        type:String,
        required:true
    },
    dateofBirth:{
        type:String,
        required:true
    },
    occupation: {
        type: String,
        enum: ['Student', 'Employee'],
        required: true
    },
    status:{
        type:String,
        enum:['active', 'deleted'],
        default:'pending'
    },
    wallet:{
        type:walletSchema,
        required:true
    }

},{timestamps:true})


const Wallet = mongoose.model('Wallet', walletSchema);
const Tourist = mongoose.model('Tourist', touristSchema);
module.exports = Wallet;
module.exports = Tourist;
