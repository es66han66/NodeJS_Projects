const express = require('express')

const app = express()

app.get('/checkServer', (req, res) => {
    res.json({
        "message": "hello"
    })
})

app.listen(8000, () => {
    console.log("Server started at 8000")
})