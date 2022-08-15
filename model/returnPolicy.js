let mongoose = require('mongoose')
let returnPolicySchema = mongoose.Schema({
    
    policyName: {
        type: String,
    },
    amount: {
        type: String,
    },
    returnDays: {
        type: String,
    },
    description: {
        type: String,
    },
    returnAcceptBy: {
        type: String,
        enum:["Auto","Admin","Vender"]
    },
    is_active : {
        type: Boolean,
        default:false
    }
}, {
    timestamps: true
})

let Return = new mongoose.model('Return', returnPolicySchema)
module.exports = Return