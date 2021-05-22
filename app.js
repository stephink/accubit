const connect = require("./config/db.config")
module.exports = (app) => {
    //function called for connecting mongodb using mongoose
    connect()
    //calling routes
    require('./routes/index.js')(app)
}