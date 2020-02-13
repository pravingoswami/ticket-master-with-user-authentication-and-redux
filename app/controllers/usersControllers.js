const User = require('../models/userModel')

module.exports.register = (req, res) => {
    const body = req.body
    body.ip = {register : [req.ip]}
    const user = new User(body)
    user.save()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.login = (req, res) => {
    const body = req.body
    let user
    User.findByCredentials(body.email || body.mobile || body.username, body.password)
        .then(userData => {
            user = userData
            return user.generateToken(req.ip)
        })

            .then(token => res.send({user, token}))
            .catch(err => res.json(err))

        .catch(err => res.json(err))
}

module.exports.account = (req, res) => {
    res.json(req.user)
}

module.exports.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull : {tokens : {token : token}}})
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.list = (req, res) => {
    User.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    const id = req.params.id
    User.findByIdAndDelete(id)
        .then(user => res.json(user))
        .catch(err => res.json(err))
}