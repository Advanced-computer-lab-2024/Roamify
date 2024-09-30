const mongoose = require('mongoose')



const placeSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['museum','historical_site']
    },
    name:{
        type:String,
        required:True
    },
    description:{
        type:String
    },
    pictures:{
        type:[String]
    },
    location:{
        latiude:{
            type:Number,
            //required:true
        },
        longitude:{
            type:Number,
            //required:true
        }
    },
    ticketPrice:{
        Native:{
            type:Number
        },
        foreigner:{
            type:Number
        },
        student:{
            type:Number

        }
    },
    governorId:{

        tag:{
            type:[String]
        }
    }


},{timestamps:true})