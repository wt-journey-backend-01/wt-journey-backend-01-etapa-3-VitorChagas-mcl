const casos = [
    {
        id: "1",
        titulo: "homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "1"
    }
];

function findAll() {
    return casos;
}

function findById(id) {
    return casos.find(caso => caso.id === id);
}

function create(novoCaso) {
    novoCaso.id = id;
    casos.push(novoCaso);
    return novoCaso;
}

function update(id, dadosAtualizados) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return null;

    const { id: _, ...dadosSemId } = dadosAtualizados;
    casos[index] = { ...casos[index], ...dadosSemId };
    casos[index].id = id;
    return casos[index];
}

function deleteCaso(id) {
    const index = casos.findIndex(caso => caso.id === id);
    if (index === -1) return false;

    casos.splice(index, 1);
    return true;
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteCaso
};
