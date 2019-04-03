
exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', tbl => {
      tbl.increments()
      tbl.string('name', 100).notNullable().unique()
      tbl.integer('cohort_id').notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students')
};
