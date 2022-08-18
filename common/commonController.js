const multer = require('multer');
var upload = multer({dest: 'public/uploads'})
const path = require('path')

const Storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, '/public/upload/')
        console.log(file, 'fikekekkek')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + '-' + file.originalname);
    }
})
// let upload = multer({storage:Storage})



exports.uploadMedia_image = function (req, res, next) {
    upload.single('media')(req, res, function (err, some) {
        console.log(req.media)
        console.log(req.file)

        if (err) {
            return res.status(400).send({
                errors: [{
                    title: 'Image Upload Error',
                    detail: err.message
                }]
            });
        }

        next();
    });
}