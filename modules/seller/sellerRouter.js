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

exports.Router = router;