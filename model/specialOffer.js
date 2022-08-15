let mongoose = require('mongoose')
let specialOfferSchema = mongoose.Schema({
    
    linkBy: {
        type: String,
        enum:["Link With Sample Product","Link With Variant Product"]
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    variantProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"variantProduct"
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