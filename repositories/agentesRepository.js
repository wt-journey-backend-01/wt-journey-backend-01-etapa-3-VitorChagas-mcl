const agentes = [
    {
        id: "1",
        nome: "Rommel Carneiro",
        dataDeIncorporacao: "1992-10-04",
        cargo: "delegado"
    }
];

function findAll() {
    return agentes;
}

function findById(id) {
    return agentes.find(agente => agente.id === id);
}

function create(novoAgente) {
    novoAgente.id = id;
    agentes.push(novoAgente);
    return novoAgente;
}

function update(id, agenteAtualizado) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return null;

    const { id: _, ...dadosSemId } = agenteAtualizado; 
    agentes[index] = { ...agentes[index], ...dadosSemId };
    agentes[index].id = id;
    return agentes[index];
}


function deleteAgente(id) {
    const index = agentes.findIndex(agente => agente.id === id);
    if (index === -1) return false;

    agentes.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteAgente
};
