const express = require('express')
const server = express()

const cohortsRouter = require('./data/helpers-endpoints/cohorts-router.js')
const studentsRouter = require('./data/helpers-endpoints/students-router.js')

server.use(express.json())

server.get('/', (req,res) => {
    res.send(
        `<h1>Welcome to Elan's Project!</h1>`
    )
})

server.use('/api/cohorts', cohortsRouter)
server.use('/api/students', studentsRouter)

module.exports = server