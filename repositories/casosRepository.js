const db = require('../db/db');

async function findAll() {
  return await db('casos').select('*');
}

async function findById(id) {
  return await db('casos').where({ id }).first();
}

async function create(data) { 
  const rows = await db('casos').insert(data).returning('*');
  return rows[0]; // Retorna o objeto criado
}

async function update(id, data) {
  return await db('casos').where({ id }).update(data).returning('*').then(rows => rows[0]);
}

async function deleteById(id) {
  return await db('casos').where({ id }).del();
}

module.exports = { 
  findAll,
  findById,
  update,
  create, 
  deleteById,
};
