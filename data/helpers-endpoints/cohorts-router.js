const express = require('express')
const router = express.Router()

const cohorts = require('./cohortsDB.js')



router.get('/', (req,res) => {
    cohorts
    .get()
    .then(cohorts => res.json(cohorts))
    .catch(error => res.status(500).json(error))
})

router.get('/:id', (req,res) => {
    const id = req.params.id

    cohorts
    .getById(id)
    .then(cohort => {
        if(!cohort) {
            res
            .status(404)
            .json({message: `Cohort with a specified ID of ${id} does not exist!`})
        } else {
            res.json(cohort)
        }
    })
    .catch(error => res.status(500).json(error))
})



module.exports = router