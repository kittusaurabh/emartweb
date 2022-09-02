const uploadController = require("./commonController")
const express = require("express");
const router = express.Router();



router.post("/imgUpload", uploadController.upload_image)
router.post("/sheetUpload", uploadController.upload_sheet)


exports.Router = router;