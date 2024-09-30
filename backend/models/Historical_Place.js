const mongoose = require('mongoose')



const Historical_Place=new mongoose.Schema({
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
        type:String
    },
    Location:{
        latiude:{
            type:float,
            required:true
        },
        longitude:{
            type:float,
            required:true
        }
    },
    ticketPrice:{
        Native:{
            type:float
        },
        foreigner:{
            type:float
        },
        student:{
            type:float

        }
    },
    governorId:{
        tag:{
            type:String
        }
    }


})