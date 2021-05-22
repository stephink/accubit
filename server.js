const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
//cors to all origin
app.use(cors())
//parse request of content-type -application/json
app.use(bodyParser.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// connect mongo and routing
require('./app.js')(app)
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})