const express = require('express');
const router = express.Router();
const auth = require('../../common/middelware');
const customerController = require('./customerController');

router.post('/signup',customerController.signup)
router.post('/login',customerController.login)
router.post('/update',auth.userVerifyToken,customerController.update)
router.post('/logout',auth.userVerifyToken,customerController.logout)
router.post('/forgetpassword',auth.userVerifyToken,customerController.forgetpassword)
router.post('/changePassword',auth.userVerifyToken,customerController.changePassword)



exports.Router = router;
