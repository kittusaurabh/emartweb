let mongoose = require('mongoose')
let productSchema = mongoose.Schema({

    productType: {
        type: String,
        enum:['0','1','2']
    },
    productName: {
        type: String,
    },
    productLink: {
        type: String,
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Brand"
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },
    keyFeatures: {
        type: String,
    },
    productDescription: {
        type: String,
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
    alsoIn: {
        type: String,
    },
    stock: {
        type: String,
    },
    productTags: {
        type: String,
    },
    sizeChart: {
        type: String,
    },
    productTagIn: {
        type: String,
    },
    productTagTextColor: {
        type: String,
    },
    productTagBackgroundColor: {
        type: String,
    },
    model: {
        type: String,
    },
    hsnSac: {
        type: String,
    },
    sku: {
        type: String,
    },
    price: {
        type: String,
    },
    offerPrice: {
        type: String,
    },
    weight:{
        type:String
    },
    tax: {
        type: String,
    },
    taxName: {
        type: String,
    },
    productThumbnailImage: {
        type: String,
    },
    productHoverThumbnailImage: {
        type: String,
    },
    otherProductImages:{
        type:String
    },
    downloadableProductFile:{
        type:String
    },
    is_active : {
        type: Boolean,
        default:false
    },
    freeShipping : {
        type: Boolean,
        default:false
    },
    featured : {
        type: Boolean,
        default:false
    },
    cancleAvailable : {
        type: Boolean,
        default:false
    },
    cashOnDelivery : {
        type: Boolean,
        default:false
    },
    returnAvailable : {
        type: String,
        enum:["Return Available","Return Not Available"]
    },
    selectReturnPolicy : {
        type: String,
        enum:["Damaged Goods","Return Policy","Defective Goods","Electronic Goods And Accessories","A Test Policy"]
    },
}, {
    timestamps: true
})

let Product = new mongoose.model('Product', productSchema)
module.exports = Product;