const axios = require('axios')
const config = require('../../config')
const { handleAxiosError } = require('../../helpers')

const _axios = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/comments'
})

exports.getData = async () => {
  try {
    return {
      data: (await _axios.get()).data
    }
  } catch (e) {
    console.log('An Error Occurred', e, handleAxiosError(e))
    return { error: e.message }
  }
}
