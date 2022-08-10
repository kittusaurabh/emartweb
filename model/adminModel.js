let mongoose = require('mongoose')
let adminSchema = mongoose.Schema({
    access_token: {
        type: String,
        require: true
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    mobile_number: {
        type: String,
    }
}, {
    timestamps: true
})

let admin = new mongoose.model('admin', adminSchema)

admin.findOne({}).then((res) => {
    if (!res)
        admin.create({
            email: "admin@gmail.com",
            password: "25d55ad283aa400af464c76d713c07ad" //12345678
        })
})
module.exports = admin;