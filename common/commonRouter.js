const uploadController = require("./commonController");
const express = require("express");
const router = express.Router();
// const path = require('path')



router.post("/imgUpload", uploadController.uploadMedia_image, (req, res) => {
    try {
        console.log(req.file)
         res.status(200).send({
            path: req.file.location
        });
    } catch (e) {
        return res.status(400).json({
            message: e.message
        });
    }
})

exports.Router = router;