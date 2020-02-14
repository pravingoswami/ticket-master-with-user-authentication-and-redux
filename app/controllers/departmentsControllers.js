const Department = require('../models/departmentModel')
const pick = require('lodash.pick')

module.exports.list = (req, res) => {
    Department.find({user : req.user._id})
        .then(department => res.json(department))
        .catch(err => res.json(err))
}

module.exports.create = (req, res) => {
    const body = req.body
    const department = new Department(body)
    department.user = req.user._id
    department.save()
        .then(department => res.json(pick(department, ['_id', 'name', 'code'])))
        .catch(err => res.json(err))
}

module.exports.show = (req, res) => {
    Department.findOne({_id : req.params.id, user : req.user._id})
        .then(department => department ? res.json(pick(department, ['_id', 'name', 'code'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.update = (req, res) => {
    Department.findOneAndUpdate({_id : req.params.id, user : req.user._id}, req.body, {runValidators : true, new : true})
        .then(department => department ? res.json(pick(department, ['_id', 'name', 'code'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.destroy = (req, res) => {
    Department.findOneAndDelete({_id : req.params.id, user : req.user._id})
        .then(department => department ? res.json(pick(department, ['_id', 'name', 'code'])) : res.json({}))
        .catch(err => res.json(err))
}

module.exports.info = (req, res) => {
    Department.find()
        .then(department => res.json(department))
        .catch(err => res.json(err))
}

module.exports.destroyDepartment = (req, res) => {
    Department.findByIdAndDelete(req.param.id)
        .then(department => res.json(department))
        .catch(err => res.json(err))
}