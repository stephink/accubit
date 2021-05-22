const controller = require('../controllers/user.controller')
const middleware = require('../middileware/createUserverify')
module.exports = (app) => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/create-user", [
        middleware.isEmailExist,
    ],
        controller.createUser)
}