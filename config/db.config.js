const mongoose = require('mongoose');
const { MONGO_DB_URL } = require('./env.config');

const uri = MONGO_DB_URL;
const connect = () => mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log("MongoDB Connected…")
    })
    .catch(err => console.log(err));

module.exports = connect;