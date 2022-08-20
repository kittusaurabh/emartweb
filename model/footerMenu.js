let mongoose = require('mongoose')
let footerMenuSchema = mongoose.Schema({

    menuTitle: {
        type: String,
    },
    linkBy: {
        type: String,
        enum:["Pages","URL"]
    },
    selectPages: {
        type:String,
        enum:["Terms & Conditions","Privacy Policy","About Us","Contact Us"]
    },
    url: {
        type: String,
    },
    widgetPosition: {
        type:String,
        enum:["0","1","2"]
    },
    is_active : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let FooterMenu = new mongoose.model('FooterMenu', footerMenuSchema)
module.exports = FooterMenu;