const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const customerSchema = new Schema({

    code : {
        type : String,
        unique : true,
        required : true
    },

    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                return validator.isEmail(value)
            },
            message : function(){
                return 'Invalid Email'
            }
        }
    },

    mobile : {
        type : String,
        required : true,
        minlength : 10,
        maxlength : 10,
        validate : {
            validator : function(value){
                return validator.isNumeric(value)
            },
            message : function(){
                return 'Invalid mobile number'
            }
        }
    },

    user : {
        type : mongoose.Schema.Types.ObjectId
    },

    createdAt : {
        type : Date,
        default : Date.now()
    }

})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer