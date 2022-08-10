const express = require('express');
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


exports.Router = router;