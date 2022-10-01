const multer = require('multer');

const storage_image = multer.diskStorage({
    destination: function (req, file, cb) {

        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split(".")
        extension = extension[extension.length - 1]
        cb(null, Date.now() + '.' + extension);
    }
})
var upload_image = multer({
    storage: storage_image
});
exports.upload_image = function (req, res, next) {
    upload_image.single('media')(req, res, function (err, some) {
        if (err) {
            return res.status(400).json({
                errors: [{
                    title: 'Image Upload Error',
                    detail: err.message
                }]
            });
        }
        return res.status(200).json({
            data: `http://localhost:3000/images/${req.file.filename}`,
            message: "Success",
        });
    });
}

// **********************************************Sheet**********************************************************

const storage_sheet = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/sheet/')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split(".")
        extension = extension[extension.length - 1]
        cb(null, Date.now() + '.' + extension);
    }
})
var upload_sheet = multer({
    storage: storage_sheet
})
exports.upload_sheet = function (req, res, next) {
    upload_sheet.single('media')(req, res, function (err, some) {
        // console.log(req);
        if (err) {
            return res.status(400).json({ 
                 errors: [{
                    title: 'sheet Upload Error',
                    detail: err.message
                 }]
            });
        }
        return res.status(200).json({
            data: `http://localhost:3000/sheet/${req.file.filename}`,
            message: "Success",
        });
        next();
    });
}         