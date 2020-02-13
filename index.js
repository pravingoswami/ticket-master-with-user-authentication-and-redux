const express = require('express')
const setupDB = require('./config/databse')

const app = express()
setupDB()




const port = 3021

app.listen(port, () => {
    console.log('listening on port', port)
})