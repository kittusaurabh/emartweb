let mongoose = require('mongoose')
let categorySchema = mongoose.Schema({
    
    category: {
        type: String,
        required:true
    },
    description: {
        type: String,
    },
    icon: {
        type: String,
    },
    image: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Category = new mongoose.model('Category', categorySchema)
module.exports = Category;