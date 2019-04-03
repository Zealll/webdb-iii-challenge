
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
 
  return knex('table_name').insert([
    {cohort_id: 1, name: 'Elan'},
    {cohort_id: 2, name: 'Jordan'},
    {cohort_id: 1, name: 'Frank'},
    {cohort_id: 1, name: 'Anthony'},
    {cohort_id: 1, name: 'Jawad'},
  ]);
};
