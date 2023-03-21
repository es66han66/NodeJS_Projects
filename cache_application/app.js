require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config')
const routes = require('./app/routes')

const app = express()
require("./cacheManager")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).send('Hi from Application')
})

routes(app)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    res.send('Route not found')
    next(err)
})
app.listen(process.env.PORT || config.port, () => {
    console.log(`${config.name} listening on port ${config.port}!`)
})

module.exports = app