let mongoose = require('mongoose')
let variantProductSchema = mongoose.Schema({
    
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"category"
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"subCategory"
    },
    childCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"childCategory"
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Brand"
    },
    productName: {
        type: String,
    },
    alsoIn: {
        type: String,
    },
    productCatalogue: {
        type: String,
    },
    sizeChart: {
        type: String,
    },
    keyFeatures: {
        type: String,
    },
    description: {
        type: String,
    },
    productVideoPreview: {
        type: String,
    },
    productVideoThumbnail: {
        type: String,
    },
    warranty: {
        type: String,
    },
    daysMonthsYear: {
        type: String,
        enum:["none","day","months","year"]
    },
    type: {
        type: String,
        enum:["gaurantee","warranty"]
    },
    startSellingFrom: {
        type: String,
    },
    tags: {
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
    giftPackingCharges: {
        type: String,
    },
    priceIncludeTax : {
        type: Boolean,
        default:false
    },
    taxApplied: {
        type: String,
    },
    taxName: {
        type: String,
    },
    taxClass: {
        type: String,
        enum:["GST","US Tax"]
    },
    productTag: {
        type: String,
    },
    productTagTextColor: {
        type: String,
    },
    productTagBackgroundColor: {
        type: String,
    },
    freeShipping : {
        type: Boolean,
        default:false
    },
    featured : {
        type: Boolean,
        default:false
    },
    is_active : {
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
}, {
    timestamps: true
})

let variantProduct = new mongoose.model('variantProduct', variantProductSchema)
module.exports = variantProduct;