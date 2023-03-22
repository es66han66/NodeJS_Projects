'use strict'

const router = require('express').Router()

const testCacheController = require('../testCache/TestCacheController')

router.get('/test', testCacheController.fetchAllData)

module.exports = router
