module.exports = (app) => {
    require('./user.route.js')(app)
    require('./csvparsing.route')(app)
}