const mongoose = require('mongoose')

// ! Using default javascript promise
mongoose.Promise = global.Promise
//const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/contact-manager"

const URI = "mongodb://localhost:27017/contact-manager-jan"

// ! Connecting to the database listening on 27107 by default
mongoose.connect(URI, {useNewUrlParser: true})
    .then(function () {
        console.log("connected to db")
    })
    .catch(function (err) {
        console.log(err)
    })

module.exports = {
    mongoose
}