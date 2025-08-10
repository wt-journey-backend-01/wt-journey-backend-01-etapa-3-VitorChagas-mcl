const db = require('../db/db');

async function findAll() {
  return await db('agentes').select('*');
}

async function insert(data) { 
  return await db('agentes').insert(data).returning('*');
}

async function create(agente) {
  return await db('agentes').insert(agente).returning('*');
}

async function deleteById(id) {
  return db('agentes').where({ id }).del();
}

module.exports = { 
  findAll, 
  insert,
  create, 
  deleteById,
};
