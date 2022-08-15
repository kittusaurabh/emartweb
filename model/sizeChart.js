let mongoose = require('mongoose')
let sizeChartSchema = mongoose.Schema({
    
    templateName: {
        type: String,
    },
    templateCode: {
        type: String,
    },
    templateOption: {
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