const express = require('express')
const app = express()
// let max = 0
// let clear
app.get('/check', async (req, res) => {
    let max = 0
let clear
  clear = setInterval(() => {
    max++
    console.log('max now is', max)
    if (max === 2) {
      res.end(JSON.stringify({
        "name": "end"
      }))
      clearInterval(clear)
    } else {
      res.write(JSON.stringify({
        "name": "start"
      }))
    }
  }, 5000)
})

app.listen(5000, () => {
  console.log('server started')
})
