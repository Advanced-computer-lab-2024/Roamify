const mongoose = require('mongoose');

const historicalTagSchema = new mongoose.Schema({
    Type: {
        type: String,
        enum: ['monuments', 'museums', 'religious_sites', 'palaces_castles'],
        required: true
    },
    Period: {
        type: String,
        required: true
    }
});

const historicalTagModel = mongoose.model('historicalTag', historicalTagSchema);
module.exports = historicalTagModel;
