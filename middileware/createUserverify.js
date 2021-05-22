const { User } = require("../model/index.js")
exports.isEmailExist = (req, res, next) => {
    //checking user name is existing
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            res.send({
                status: false,
                message: "Failed! Username is already in use!"
            });
            return;
        }

        next();

    }).catch(error => {
        res.send({
            status: false,
            message: "error in checking username"
        })
        return;
    })
}