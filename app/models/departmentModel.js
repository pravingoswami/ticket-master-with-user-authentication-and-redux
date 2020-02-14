const mongoose = require('mongoose')

const Schema = mongoose.Schema

const departmenrSchema = new Schema({

    code : {
        type : String,
        unique : true,
        required : true
    },

    name : {
        type : String,
        required : true
    },

    user : {
        type : mongoose.Schema.Types.ObjectId
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }
})

const Department = mongoose.model('Department', departmenrSchema)

module.exports = Department