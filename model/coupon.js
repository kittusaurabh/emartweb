let mongoose = require('mongoose')
let couponSchema = mongoose.Schema({
    
    couponCode: {
        type: String,
    },
    discountType: {
        type: String,
        enum:["Fix Amount","%Percentage"]
    },
    amount: {
        type: String,
    },
    linkedTo: {
        type: String,
        enum:["Link to Cart","Link by ","Link by Product","Link by Category"]
    },
    maxUsageLimit: {
        type: String,
    },
    ProductId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    minAmount: {
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

let Coupon = new mongoose.model('Coupon', couponSchema)
module.exports = Coupon;