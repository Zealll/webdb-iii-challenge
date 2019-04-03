const express = require('express')
const router = express.Router()

const cohorts = require('./cohortsDB.js')



router.get('/', (req,res) => {
    cohorts
    .get()
    .then(cohorts => res.json(cohorts))
    .catch(error => res.status(500).json(error))
})



module.exports = router