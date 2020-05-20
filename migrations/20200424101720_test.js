exports.up = function(knex) {
    return knex.schema
    .createTable('users', table => {
        table.increments('id')
        table.string('username')
        table.string('password')
        table.integer('age')
        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('created_at').defaultTo(knex.fn.now())
    })
    .createTable('users_electives', table => {
        table.increments('id');
        table.string('course_name').notNullable();

        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');

        table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'))
        table.dateTime('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users_electives')
        .dropTableIfExists('users');
};
