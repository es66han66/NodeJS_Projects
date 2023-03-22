'use strict'

const TestCacheService = require('./TestCacheService.js')

const { sendErrorResponse, sendResponse } = require('../../helpers')

exports.fetchAllData = async (req, res, next) => {
  const { error, data } = await TestCacheService.fetchAllData()
  if (error) return sendErrorResponse({ res, message: error })

  return sendResponse({ res, responseBody: data })
}