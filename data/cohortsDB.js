const knex = require('knex')
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)


module.exports = {
    get,
    getById,
    insert,
    update,
    remove,
}

function get() {
    return db('cohorts')
}

function getById(id) {
    return db('cohorts')
    .where({ id })
    .first()
}

function insert(cohort) {
    return db('cohorts')
    .insert(cohort)
    .then(ids => {
        return getById(ids[0])
    })
}

function update(id, cohort) {
    return db('cohorts')
    .where({ id })
    .update(cohort)
}

function remove(id) {
    return db('cohorts')
    .where('id', id)
    .del()
}
