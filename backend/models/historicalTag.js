const mongoose = require('mongoose');

const historicalTagSchema=new mongoose.Schema({
    Type:{
        type:String,
        enum:['Monuments','Museums', 'Religious Sites','Palaces/Castles']
    },
    Period:{
        type:String
    }

});

const historicalTagModel=mongoose.model('historicalTag', historicalTagSchema);  
module.exports = historicalTagModel;