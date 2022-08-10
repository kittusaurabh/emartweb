let mongoose = require('mongoose')

let sellerSchema = mongoose.Schema({

  name : {
    type:String
  },
  buisness_email : {
    type:String
  },
  mobile_number : {
    type:String
  },
  phone_number : {
    type:String
  },
  lat : {
    type:String,
    default:""
  },
  long : {
    type:String,
    default:""
  },
  country : {
    type:String
  },
  state : {
    type:String
  },
  city : {
    type:String
  },
  profile_picture : {
    type:String
  },
  password : {
    type:String
  }
},{
    timestamps: true
})

let Seller = new mongoose.model('Seller', sellerSchema)
module.exports = Seller;