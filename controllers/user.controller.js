const { User } = require('../model/index.js')
exports.createUser = (req, res) => {
    const { firstname, lastname, email, age } = req.body
    var newUser = new User({
        firstname,
        lastname,
        email,
        age
    })
    //saving the data user
    newUser.save().then((userData) => {
        const responseData = {
            "status": "sucess",
            "userId": userData._id
        }
        return res.status(200).send(responseData)
    }).catch(err => {
        return res.status(400)
    })

}