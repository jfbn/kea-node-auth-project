exports.seed = function(knex) {
  return knex('users').insert([    // password
    { username: 'admin', password: '$2b$12$W0TfZoJA6xl6iHJcNyuRpuuqpzyHsC4Bk/mv1fCNbobLS/F/eZPBS' },
    { username: 'seconduser', password: '$2b$12$o5cJ2WnnOi0WBxPxoUhv8eofSRTZtGY.dyXullgN.tvhbRSQkeMum' }
  ]);
};
