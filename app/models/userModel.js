const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs  = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const userSchema = new Schema({
    username : {
        type : String,
        unique : true,
        required : true
    },
    email : {
        type : String,
        unique : true,
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
        minlength : 10,
        maxlength : 10,
        required : true,
        validate : {
            validator : function(value){
                return validator.isNumeric(value)
            },
            message : function(){
                return 'Invalid Mobile Number'
            }
        }
    },
    password : {
        type : String,
        required : true
    },
    ip : {
        login : [String],
        register : [String],
        logout : [String]
    },
    tokens : [
        {
            token : {
                type : String,
            },
            createdAt : {
                type : Date,
                default : Date.now()
            }
        }
    ],
    loginCount : {
        type : Number,
        default : 0
    },
    createdAt: {
        type : Date,
        default : Date.now()

    }
})

userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
            .then(salt => {
                bcryptjs.hash(user.password, salt)
                    .then(encryptedPassword => {
                        user.password = encryptedPassword
                        next()
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
    }else {
        next()
    }
})

userSchema.statics.findByCredentials = function(data, password){
    const User = this
    let find = {}
    if(validator.isEmail(data)){
        find = {email : data}
    } else if(validator.isNumeric(data)){
        find = {mobile : data}
    } else {
        find = {username : data}
    }
    return User.findOne(find)
        .then(User => {
            if(!User){
                return Promise.reject({errors : 'invalid email id'})
            }
            return bcryptjs.compare(password, User.password)
                        .then(result => result ? Promise.resolve(User) : Promise.reject({errors : 'invalid password'}))
                        .catch(err => Promise.reject(err))
        })

        .catch(err => Promise.reject(err))

}

userSchema.methods.generateToken = function(ip){
    const user = this
    const tokenData = {
        id : user._id,
        username : user.username,
        email : user.email,
        createdAt : Date.now()
    }

    const token = jwt.sign(tokenData, 'jwt@123')
    user.tokens.push({token})
    user.ip.login.push(ip)
    user.loginCount = user.loginCount + 1
    return user.save()
            .then(user => Promise.resolve(token))
            .catch(err => Promise.reject(err))
}

userSchema.statics.findByToken = function(token){
    const User = this
    let tokenData
    try{
        tokenData = jwt.verify(token, 'jwt@123')
    }catch(err){
        return Promise.reject(err)
    }

    return User.findOne({
        '_id' : tokenData.id,
        'tokens.token' : token
    })
}


const User = mongoose.model('User', userSchema)

module.exports = User