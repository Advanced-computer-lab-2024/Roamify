const walletSchema = new mongoose.Schema({

    availableBalance: {
        type: Number,
        Default: 0
        //required:true
    },
    totalSpent: {
        type: Number,
        Default: 0
        //required:true
    },
    cardNumber: {
        type: String,
        required: true
    }

})

const walletModel = mongoose.model('wallet', walletSchema);
module.exports = walletModel;