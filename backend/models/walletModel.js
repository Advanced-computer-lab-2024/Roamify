const mongoose = require('mongoose');
const walletSchema = new mongoose.Schema({
    card: {
        type: [mongoose.Types.ObjectId],
        ref: 'card'
    },
    availableCredit: {
        type: Number,

    }
})

const walletModel = mongoose.model('card', walletSchema);
module.exports = walletModel;