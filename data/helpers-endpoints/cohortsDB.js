const knex = require('knex')
const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development)


module.exports = {
    get,
    getById,
    getStudents,
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

function getStudents(cohortId) {
    return db('students as s')
      .join('cohorts as c', 'c.id', 's.cohort_id')
      .select('s.id', 's.name', 'c.name as cohort')
      .where('s.cohort_id', cohortId)
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
