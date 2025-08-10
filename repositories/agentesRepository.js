const db = require('../db/db');

async function findAll() {
  return await db('agentes').select('*');
}

async function findById(id) {
  return await db('agentes').where({ id }).first();
}

async function create(data) { 
  return await db('agentes').insert(data).returning('*');
}


async function update(id, data) {
  return await db('agentes').where({ id }).update(data).returning('*').then(rows => rows[0]);
}

async function deleteById(id) {
  return await db('agentes').where({ id }).del();
}

module.exports = { 
  findAll,
  findById,
  update,
  create,
  deleteById,
};
