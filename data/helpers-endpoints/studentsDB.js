const knex = require('knex')
const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)


module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
}

function get() {
    return db('students')
}

function getById(id) {
    return db('students as s')
    .join('cohorts as c', 'c.id', 's.cohort_id')
    .select('s.id', 's.name', 'c.name as cohort')
    .where('s.id', id )
    
}

function insert(student) {
    return db('students')
    .insert(student)
    .then(ids => {
        return getById(ids[0])
    })
}

function update(id, student) {
    return db('students')
    .where({ id })
    .update(student)
}

function remove(id) {
    return db('students')
    .where('id', id)
    .del()
}