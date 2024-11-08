const mongoose = require('mongoose');
const walletSchema = new mongoose.Schema({
    card: {
        type: [mongoose.Types.ObjectId],
        ref: 'card'
    },
    availableCredit: {
        type: Number,
        default: 0

    },
    tourist: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
})

const walletModel = mongoose.model('wallet', walletSchema);
module.exports = walletModel;