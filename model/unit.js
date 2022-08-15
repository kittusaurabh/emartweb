let mongoose = require('mongoose')
let unitSchema = mongoose.Schema({

    title: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    },

}, {
    timestamps: true
})

let Unit = new mongoose.model('Unit', unitSchema)
module.exports = Unit;