const users = [
  {
    username: 'admin',
    password: '$2a$08$D776Z9Dv.vUal8N0rZFTCO23zlH8JZj9R5zkSgy4HSkWnbVJXnNl2',
  },
];

exports.seed = function (knex, Promise) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert(users);
    });
};
