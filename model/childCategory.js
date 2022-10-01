let mongoose = require('mongoose')
let childCategorySchema = mongoose.Schema({
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subCategory"
    },
    childCategory: {
        type: String
    },
    icon: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
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

let childCategory = new mongoose.model('childCategory', childCategorySchema)
module.exports = childCategory;