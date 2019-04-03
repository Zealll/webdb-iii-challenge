const express = require('express')

const server = express()

server.use(express.json())

server.get('/', (req,res) => {
    res.send(
        `<h1>Welcome to Elan's Project!</h1>`
    )
})

// server.use('/api/cohorts', )

module.exports = server