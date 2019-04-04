const express = require('express')
const router = express.Router()

const students = require('./studentsDB.js')



router.get('/', (req,res) => {
    students
    .get()
    .then(students => res.json(students))
    .catch(error => res.status(500).json(error))
})

router.get('/:id', (req,res) => {
    const id = req.params.id

    students
    .getById(id)
    .then(student => {
        if(student.length === 0) {
            res
            .status(404)
            .json({message: `student with a specified ID of ${id} does not exist!`})
        } else {
            res.json(student)
        }
    })
    .catch(error => res.status(500).json(error))
})

router.post('/', (req, res) => {
    const body = req.body

    if (!body.name || !body.cohort_id) {
        res
        .status(400)
        .json({message: "Please fill out the both ('name' and 'cohort_id') field(s)"})
    } else {
        students
        .insert(body)
        .then(newstudent => {
            res
            .status(201)
            .json(newstudent)
        })
        .catch(error => res.status(500).json(error))
    }
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body

    if (!body.name || !body.cohort_id) {
        res
        .status(400)
        .json({message: "Please fill out the both ('name' and 'cohort_id') field(s)"})
    } else {
        students
        .update(id, body)
        .then(updated => {
            if (!updated) {
                res
                .status(404)
                .json({message: `student with a specified ID of ${id} does not exist!`})
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

    students
    .remove(id)
    .then(deleted => {
        if (!deleted) {
            res
            .status(404)
            .json({message: `student with the specified ID of ${id} does not exist.`})
        } else {
            res.json({message: 'Item Has Been Deleted.'}).end()
        }
    })
    .catch(error => res.status(500).json(error))
})


module.exports = router