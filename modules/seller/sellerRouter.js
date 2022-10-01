const express = require('express');
const auth = require('../../common/middelware');
const router = express.Router();
const sellerController = require('./sellerController')

router.post('/signup',sellerController.signup)
router.post('/login',sellerController.login)
router.post('/update',auth.sellerVerifyToken,sellerController.update)
router.post('/logout',auth.sellerVerifyToken,sellerController.logout)
router.post('/forgetPassword',auth.sellerVerifyToken,sellerController.forgetPassword)
router.post('/changePassword',auth.sellerVerifyToken,sellerController.changePassword)


router.post('/addGift',sellerController.addGift)
router.get('/getGift',sellerController.getGift)
router.post('/updateGift',sellerController.updateGift)
router.post('/deleteGift',sellerController.deleteGift)


router.post('/addCategory',sellerController.addCategory)
router.get('/getCategory',sellerController.getCategory)
router.post('/updateCategory',sellerController.updateCategory)
router.post('/deleteCategory',sellerController.deleteCategory)


router.post('/addSubCategory',sellerController.addSubCategory)
router.get('/getSubCategory',sellerController.getSubCategory)
router.post('/updateSubCategory',sellerController.updateSubCategory)
router.post('/deleteSubCategory',sellerController.deleteSubCategory)


router.post('/addChildCategory',sellerController.addChildCategory)
router.get('/getChildCategory',sellerController.getChildCategory)
router.post('/updateChildCategory',sellerController.updateChildCategory)
router.post('/deleteChildCategory',sellerController.deleteChildCategory)


router.post('/addBrand',sellerController.addBrand)
router.get('/getBrand',sellerController.getBrand)
router.post('/updateBrand',sellerController.updateBrand)
router.post('/deleteBrand',sellerController.deleteBrand)


router.post('/addProduct',sellerController.addProduct)
router.get('/getProduct',sellerController.getProduct)
router.post('/updateProduct',sellerController.updateProduct)
router.post('/deleteProduct',sellerController.deleteProduct)


router.post('/addSizeChart',sellerController.addSizeChart)
router.get('/getSizeChart',sellerController.getSizeChart)
router.post('/updateSizeChart',sellerController.updateSizeChart)
router.post('/deleteSizeChart',sellerController.deleteSizeChart)


exports.Router = router; 