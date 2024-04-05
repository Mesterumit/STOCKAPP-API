
"use strict"

const router = require('express').Router()



// auth
router.use('/account/auth', require('./auth'))

// cal user.create for registarion
const {register: useCreate} = require('../controllers/user')
router.post('/account/register', useCreate)

// user
router.use('/users',require('./user'))


module.exports = router