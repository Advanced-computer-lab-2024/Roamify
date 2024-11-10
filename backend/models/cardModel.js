const mongoose = require('mongoose');
const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,

    },
    cardValidUntil: {
        type: Date,
    }
})

const cardModel = mongoose.model('card', cardSchema);
module.exports = cardModel;