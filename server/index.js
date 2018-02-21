const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(morgan('dev'))
const bodyParser = require('body-parser')
const api = require('./api')

app.use(express.static(path.join(__dirname, '../public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api', api)

app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..public/index.html'))
})

app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
})

// module.exports = app

const port = process.env.port || 3000
app.listen(port, function() {
    console.log(`Server listining on port ${port}`)
})
