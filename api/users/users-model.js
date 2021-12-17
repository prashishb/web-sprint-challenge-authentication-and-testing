const db = require('../../data/dbConfig');

function findByUsername(username) {
  return db('users').where({ username }).first();
}

function findById(id) {
  return db('users').where({ id }).first();
}

async function add({ username, password }) {
  let created_user_id;
  await db.transcation(async (trx) => {
    const [id] = await trx('users').insert({ username, password });
    created_user_id = id;
  });
  return findById(created_user_id);
}

module.exports = {
  findByUsername,
  findById,
  add,
};
