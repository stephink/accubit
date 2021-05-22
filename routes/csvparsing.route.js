const multer = require('multer')
const controller = require('../controllers/email.controller')
const upload = multer({ dest: '../uploads' })
module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/sending-email", [
        upload.single('csv_file'),
    ],
        controller.sendingEmail)
}