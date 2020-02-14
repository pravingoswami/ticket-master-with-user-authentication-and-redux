const express = require('express')

const userscontrollers = require('../app/controllers/usersControllers')
const customersControllers = require('../app/controllers/customersControllers')
const departmentsControllers = require('../app/controllers/departmentsControllers')

const authenticateUser = require('../app/middlewares/authenticateUSer')

const router = express.Router()

router.post('/users/register', userscontrollers.register)
router.post('/users/login', userscontrollers.login)
router.get('/users/account', authenticateUser, userscontrollers.account)
router.get('/users/logout', authenticateUser, userscontrollers.logout)


router.get('/customers', authenticateUser, customersControllers.list)
router.post('/customers', authenticateUser, customersControllers.create)
router.get('/customers/:id', authenticateUser, customersControllers.show)
router.put('/customers/:id', authenticateUser, customersControllers.update)
router.delete('/customers/:id', authenticateUser, customersControllers.destroy)

router.get('/departments', authenticateUser, departmentsControllers.list)
router.post('/departments', authenticateUser, departmentsControllers.create)
router.get('/departments/:id', authenticateUser, departmentsControllers.show)
router.put('/departments/:id', authenticateUser, departmentsControllers.update)
router.delete('/departments/:id', authenticateUser, departmentsControllers.destroy)

router.get('/admin/users', userscontrollers.list)
router.delete('/admin/users/:id', userscontrollers.destroy)

router.get('/admin/customers', customersControllers.info)
router.delete('/admin/customers/:id', customersControllers.destroyCustomer)

router.get('/admin/departments', customersControllers.info)
router.delete('/admin/departments/:id', customersControllers.destroyCustomer)


module.exports = router