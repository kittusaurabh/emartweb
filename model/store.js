let mongoose = require('mongoose')
let storeSchema = mongoose.Schema({
    
    storeOwner: {
        type: String,
    },
    storeName: {
        type: String,
    },
    businessEmail: {
        type: String,
    },
    gstinNumber: {
        type: String,
    },
    phone: {
        type: String,
    },
    mobile: {
        type: String,
    },
    storeAddress: {
        type: String,
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: String,
    },
    prerfedPayout: {
        type: String,
        enum: ["0", "1", "2"]
    },
    payaplEmail: {
        type: String,
    },
    accountName: {
        type: String,
    },
    accountNumber: {
        type: String,
    },
    bankName: {
        type: String,
    },
    ifscCode: {
        type: String,
    },
    branchAddress: {
        type: String,
    },
    paytmMobleNumber: {
        type: String,
    },
    logo: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    },
    verified : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Store = new mongoose.model('Store', storeSchema)
module.exports = Store;