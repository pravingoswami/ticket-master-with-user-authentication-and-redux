const express = require('express')

const userscontrollers = require('../app/controllers/usersControllers')

const authenticateUser = require('../app/middlewares/authenticateUSer')

const router = express.Router()

router.post('/users/register', userscontrollers.register)
router.post('/users/login', userscontrollers.login)
router.get('/users/account', authenticateUser, userscontrollers.account)
router.get('/users/logout', authenticateUser, userscontrollers.logout)

router.get('/admin/users', userscontrollers.list)
router.delete('/admin/users/:id', userscontrollers.destroy)


module.exports = router