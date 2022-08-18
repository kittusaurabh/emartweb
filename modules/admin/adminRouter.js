const express = require('express');
const multer = require('multer');
const router = express.Router();
const adminController = require('./adminController');
// const auth = require('../../common/middelware')





router.post("/login", adminController.login)
router.post('/logout',adminController.logout)
router.post("/changePassword", adminController.changepassword)


router.post("/isblockedUser", adminController.isBlocked_user)
router.get("/getuser", adminController.getuser)
router.post("/deleteUser", adminController.deleteuser)


router.post("/isblockedSeller", adminController.isBlocked_seller)
router.get("/getSeller", adminController.getSeller)
router.post("/deleteSeller", adminController.deleteSeller)


router.post('/addCategory',adminController.addCategory)
router.get('/getCategory',adminController.getCategory)
router.post('/updateCategory',adminController.updateCategory)
router.post('/deleteCategory',adminController.deleteCategory)


router.post('/addSubCategory',adminController.addSubCategory)
router.get('/getSubCategory',adminController.getSubCategory)
router.post('/updateSubCategory',adminController.updateSubCategory)
router.post('/deleteSubCategory',adminController.deleteSubCategory)


router.post('/addChildCategory',adminController.addChildCategory)
router.get('/getChildCategory',adminController.getChildCategory)
router.post('/updateChildCategory',adminController.updateChildCategory)
router.post('/deleteChildCategory',adminController.deleteChildCategory)


router.post('/addBrand',adminController.addBrand)
router.get('/getBrand',adminController.getBrand)
router.post('/updateBrand',adminController.updateBrand)
router.post('/deleteBrand',adminController.deleteBrand)



router.post('/addStore',adminController.addStore)
router.get('/getStore',adminController.getStore)
router.post('/updateStore',adminController.updateStore)
router.post('/deleteStore',adminController.deleteStore)


router.post('/addVariantProduct',adminController.addVariantProduct)
router.get('/getVariantProduct',adminController.getVariantProduct)
router.post('/updateVariantProduct',adminController.updateVariantProduct)
router.post('/deleteVariantProduct',adminController.deleteVariantProduct)



router.post('/addProduct',adminController.addProduct)
router.get('/getProduct',adminController.getProduct)
router.post('/updateProduct',adminController.updateProduct)
router.post('/deleteProduct',adminController.deleteProduct)



router.post('/addCoupon',adminController.addCoupon)
router.get('/getCoupon',adminController.getCoupon)
router.post('/updateCoupon',adminController.updateCoupon)
router.post('/deleteCoupon',adminController.deleteCoupon)





router.post('/addReturnPolicy',adminController.addReturnPolicy)
router.get('/getReturnPolicy',adminController.getReturnPolicy)
router.post('/updateReturnPolicy',adminController.updateReturnPolicy)
router.post('/deleteReturnPolicy',adminController.deleteReturnPolicy)



router.post('/addUnit',adminController.addUnit)
router.get('/getUnit',adminController.getUnit)
router.post('/updateUnit',adminController.updateUnit)
router.post('/deleteUnit',adminController.deleteUnit)



router.post('/addSpecialOffer',adminController.addSpecialOffer)
router.get('/getSpecialOffer',adminController.getSpecialOffer)
router.post('/updateSpecialOffer',adminController.updateSpecialOffer)
router.post('/deleteSpecialOffer',adminController.deleteSpecialOffer)



router.post('/addSizeChart',adminController.addSizeChart)
router.get('/getSizeChart',adminController.getSizeChart)
router.post('/updateSizeChart',adminController.updateSizeChart)
router.post('/deleteSizeChart',adminController.deleteSizeChart)




exports.Router = router;