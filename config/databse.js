const mongoose = require('mongoose')

const setupDB = () => {
    mongoose.connect('mongodb://localhost:27017/ticket-master-app-with-user-authentication',  { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () =>  console.log('connected with the database'))

        .catch (err => console.log(err))
}

module.exports = setupDB