let mongoose = require('mongoose')
let brandsSchema = mongoose.Schema({
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    brandName: {
        type: String,
    },
    brandLogo: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    },
    featured : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Brands = new mongoose.model('Brands', brandsSchema)
module.exports = Brands;