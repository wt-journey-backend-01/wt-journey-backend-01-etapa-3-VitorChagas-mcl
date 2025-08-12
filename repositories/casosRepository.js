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

async function findFiltered(filters) {
  const query = db('casos').select('*');

  if (filters.status) {
    query.where('status', filters.status);
  }
  if (filters.agente_id) {
    query.where('agente_id', filters.agente_id);
  }
  if (filters.titulo) {
    query.where('titulo', 'ilike', `%${filters.titulo}%`); // ilike para case-insensitive
  }
  if (filters.descricao) {
    query.where('descricao', 'ilike', `%${filters.descricao}%`);
  }

  return await query;
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
  findFiltered,
  create, 
  deleteById,
};
