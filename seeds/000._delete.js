exports.seed = function(knex) {
  return knex('users_electives').del()
    .then(function () {
      return knex('users').del();
    });
};
