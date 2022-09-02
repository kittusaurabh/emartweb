let mongoose = require('mongoose')
let specialOfferSchema = mongoose.Schema({
    
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    is_active : {
        type: Boolean,
        default:false
    },
}, {
    timestamps: true
})

let specialOffer = new mongoose.model('specialOffer', specialOfferSchema)
module.exports = specialOffer;