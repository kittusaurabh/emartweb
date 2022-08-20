let mongoose = require('mongoose')
let menuSchema = mongoose.Schema({
    
    linkBy: {
        type: String,
        enum:["Link By Categories","Link By Page","Link By Custom URL"]
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subCategory"
    },
    childCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"childCategory"
    },
    selectPages: {
        type:String,
        enum:["Terms & Conditions","Privacy Policy","About Us","Contact Us"]
    },
    menuName: {
        type: String,
    },
    menuIcon: {
        type: String,
    },
    sideMenuBannerImage: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    menuTag : {
        type: Boolean,
        default:false
    },
    tagBackground: {
        type: String,
    },
    textColor: {
        type: String,
    },
    tagText: {
        type: String,
    },
    url: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Menu = new mongoose.model('Menu', menuSchema)
module.exports = Menu;