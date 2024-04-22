
"use strict"

const router = require('express').Router()



// auth
router.use('/account/auth', require('./auth'))

// cal user.create for registarion
const {register: useCreate} = require('../controllers/user')
router.post('/account/register', useCreate)

// user
const { list} = require('../controllers/user')
router.use('/users',list)

// brand
router.use('/brands',require('./brand'))

// category
router.use('/categories', require('./category'))

// firm
router.use('/firms',require('./firm'))

// product
router.use('/products',require('./product'))

// purchase
router.use('/purchases',require('./purchase'))

// sale:
router.use('/sales', require('./sale'))

// document:
router.use('/documents', require('./document'))

// token:
router.use('/tokens', require('./token'))



module.exports = router