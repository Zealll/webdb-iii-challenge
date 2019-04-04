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

router.get('/:id/students', (req, res) => {
    const id = req.params.id

    cohorts
    .getStudents(id)
    .then(students => {
        if(students.length === 0) {
            res
            .status(404)
            .json({message: `Cohort with a specified ID of ${id} does not exist!`})
        } else {
            res.json(students)
        }
    })
    .catch(error => res.status(500).json(error))
})

router.post('/', (req, res) => {
    const body = req.body

    if (!body.name) {
        res
        .status(400)
        .json({message: "Please fill out the 'name' field"})
    } else {
        cohorts
        .insert(body)
        .then(newCohort => {
            res
            .status(201)
            .json(newCohort)
        })
        .catch(error => res.status(500).json(error))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    if (!body.name) {
        res
        .status(400)
        .json({message: "Please fill out the 'name' field"})
    } else {
        cohorts
        .update(id, body)
        .then(updated => {
            if (!updated) {
                res
                .status(404)
                .json({message: `Cohort with a specified ID of ${id} does not exist!`})
            } else {
                res
                .status(200)
                .json({message: `Success! You updated ${updated} item(s)`})
            }  
        })
        .catch(error => res.status(500).json(error))
    }
    
})

router.delete('/:id', (req, res) => {
    const id = req.params.id

    cohorts
    .remove(id)
    .then(deleted => {
        if (!deleted) {
            res
            .status(404)
            .json({message: `Cohort with the specified ID of ${id} does not exist.`})
        } else {
            res.json({message: 'Item Has Been Deleted.'}).end()
        }
    })
    .catch(error => res.status(500).json(error))
})


module.exports = router