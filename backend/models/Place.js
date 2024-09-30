const mongoose = require('mongoose')



const Place=new mongoose.Schema({
    Type:{
        type:String,
        enum:['museum','historical_site']
    },
    Name:{
        type:String,
        required:True
    },
    Description:{
        type:String
    },
    Pictures:{
        type:[String]
    },
    Location:{
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