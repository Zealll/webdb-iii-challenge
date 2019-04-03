const express = require('express')
const server = express()

const cohortsRouter = require('./data/helpers-endpoints/cohorts-router.js')

server.use(express.json())

server.get('/', (req,res) => {
    res.send(
        `<h1>Welcome to Elan's Project!</h1>`
    )
})

server.use('/api/cohorts', cohortsRouter)

module.exports = server