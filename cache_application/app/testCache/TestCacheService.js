'use strict'

const JSONPlaceHolderRepo = require('../jsonplaceholder/JSONPlaceHolderRepo')

exports.fetchAllData = async () => {
  let cachedValue = await cache.get('cached-data')
  console.log('Data from cache', cachedValue)
  if (cachedValue) return { data: JSON.parse(cachedValue) }

  const { error, data } = await JSONPlaceHolderRepo.getData()
  if (error) return { error }
  let cacheResponse = await cache.set('cached-data', JSON.stringify(data))
  console.log('Cache', cacheResponse)
  return {
    data
  }
}