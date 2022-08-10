let mongoose = require('mongoose')
let subCategorySchema = mongoose.Schema({
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    subCategory: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
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

let subCategory = new mongoose.model('subCategory', subCategorySchema)
module.exports = subCategory;