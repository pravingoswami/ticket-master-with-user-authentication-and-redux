const Customer = require('../models/customerModel')
const pick = require('lodash.pick')

module.exports.list = (req, res) => {
    Customer.find({user : req.user._id})
        .then(customer => res.send(pick(customer ,  ['_id', 'name', 'code', 'mobile', 'email'])))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const customer = new Customer(body)
    customer.user = req.user._id
    customer.save()
        .then(customer => res.send(pick(customer ,  ['_id', 'name', 'code', 'mobile', 'email'])))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    const id = req.params.id
    Customer.findOne({_id : id, user : req.user._id})
        .then(customer => customer ? res.send(pick(customer ,  ['_id', 'name', 'code', 'mobile', 'email'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    Customer.findOneAndUpdate({_id : req.params.id, user : req.user._id}, req.body, {runValidators : true, new : true})
        .then(customer => customer ? res.send(pick(customer ,  ['_id', 'name', 'code', 'mobile', 'email'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    Customer.findOneAndDelete({_id : req.params.id, user : req.user._id})
        .then(customer => customer ? res.send(pick(customer ,  ['_id', 'name', 'code', 'mobile', 'email'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    Customer.find()
        .then(customer => res.json(customer))
        .catch(err => res.json(err))
}

module.exports.destroyCustomer = (req, res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(customer => customer ? res.json(customer) : res.json(err))
        .catch(err => res.json(err))
}