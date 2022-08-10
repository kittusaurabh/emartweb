const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const adminModel = require('../model/adminModel');
const User = require('../model/customerModel');
const Seller = require('../model/sellerModel')


exports.adminVerifyToken = (req, res, next) => {

    // console.log("access_token", req.headers)1

    // check header or url parameters or post parameters for token
    const token = req.headers.access_token;

    // console.log("language=========", req.headers.language)1

    if (!token) return res.status(401).json({
        auth: false,
        message: 'No token provided'
    });
    // verifies secret and check expiration
    jwt.verify(token, 'supersecret', async function (err, decoded) {
        if (err)
            return res.status(401).json({
                auth: false,
                message: 'unauthorized'
            });

        let user = await adminModel.findOne({
            access_token: token
        }).lean(true)
        // if everything is good, save to request for use in other routes
        if (!user)
            return res.status(401).json({
                auth: false,
                message: 'unauthorized'
            });
        req.userData = user
        next();
    });
};
exports.userVerifyToken = (req, res, next) => {

    // console.log("access_token", req.headers)1

    // check header or url parameters or post parameters for token
    const token = req.headers.access_token;

    // console.log("language=========", req.headers.language)1

    if (!token) return res.status(401).json({
        auth: false,
        message: 'No token provided'
    });

    // verifies secret and check expiration
    jwt.verify(token, 'supersecret', async function (err, decoded) {
        if (err)
            return res.status(401).json({
                auth: false,
                message: 'Your token has expired'
            });

        let user = await User.findOne({
            access_token: token
        }).lean(true)
        // if everything is good, save to request for use in other routes
        if (!user)
            return res.status(401).json({
                auth: false,
                message: 'Your token has expired'
            });
        req.userData = user
        next();
    });
};
exports.sellerVerifyToken = (req, res, next) => {

    // console.log("access_token", req.headers)1

    // check header or url parameters or post parameters for token
    const token = req.headers.access_token;

    // console.log("language=========", req.headers.language)1

    if (!token) return res.status(401).json({
        auth: false,
        message: 'No token provided'
    });

    // verifies secret and check expiration
    jwt.verify(token, 'supersecret', async function (err, decoded) {
        if (err)
            return res.status(401).json({
                auth: false,
                message: 'Your token has expired'
            });

        let user = await Seller.findOne({
            access_token: token
        }).lean(true)
        // if everything is good, save to request for use in other routes
        if (!user)
            return res.status(401).json({
                auth: false,
                message: 'Your token has expired'
            });
        req.userData = user
        next();
    });
};