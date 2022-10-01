let mongoose = require('mongoose')
let sizeChartSchema = mongoose.Schema({
    
    tamplateName: {
        type: String,
    },
    tamplateCode: {
        type: String,
    },
    tamplateOption: {
        type: String,
    },
    is_active : {
        type: Boolean,
        default:false
    },
}, {
    timestamps: true
})

let sizeChart = new mongoose.model('sizeChart', sizeChartSchema)
module.exports = sizeChart;