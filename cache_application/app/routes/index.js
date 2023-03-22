'use strict'

const testCacheRouter = require('./testCache')

module.exports = app => {
  app.use('/testCache', testCacheRouter)
}
