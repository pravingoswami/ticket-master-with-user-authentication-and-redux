const express = require('express')
const setupDB = require('./config/databse')
const router = require('./config/routes')

const app = express()
setupDB()

app.use(express.json())

app.use('/', router)


const port = 3021

app.listen(port, () => {
    console.log('listening on port', port)
})