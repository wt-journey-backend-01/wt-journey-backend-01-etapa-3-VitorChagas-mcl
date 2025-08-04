/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('agentes').del()
  await knex('agentes').insert([
    {id: 1, nome: "Vitor", dataDeIncorporacao: "2025-01-01", cargo: "Detetive"},
    {id: 2, nome: "Pedro", dataDeIncorporacao: "2025-02-01", cargo: "Investigadora"},
  ]);
};
