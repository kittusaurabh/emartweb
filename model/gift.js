let mongoose = require('mongoose')
let giftSchema = mongoose.Schema({
    
    title: {
        type: String,
    },
    giftCode: {
        type: String,
    },
    amount: {
        type: String,
    },
    maxUsageLimit: {
        type: String,
    },
    expiryDate: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Gift = new mongoose.model('Gift', giftSchema)
module.exports = Gift