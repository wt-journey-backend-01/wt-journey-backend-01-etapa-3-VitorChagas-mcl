const db = require("../db/db");

async function findAll() {
    return db("casos").select("*");
}

async function insert(data) { 
  return await db('casos').insert(data).returning('*');
}

async function create(data) {
  return db('casos').insert(data).returning('*');
}


async function deleteById(id){
  return db('casos').where({id}).del();
}

module.exports = {
    findAll,
    insert,
    create,
    deleteById,
};
