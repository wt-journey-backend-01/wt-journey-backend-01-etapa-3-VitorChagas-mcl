/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del();
  await knex('casos').insert([
    {id: 1, titulo: "Homicidio", descricao: "Homicidio a facadas", status: "aberto", agente_id: 1},
    {id: 2, titulo: "Roubo", descricao: "Roubo a banco", status: "solucionado", agente_id: 2},
  ]);
};
