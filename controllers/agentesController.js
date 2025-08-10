const agentesRepository = require('../repositories/agentesRepository');

function isValidDate(dateString) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  const today = new Date();
  return !isNaN(date.getTime()) && date <= today;
}

module.exports = {
    async findAll(req, res) {
        try {
            let agentes = await agentesRepository.findAll();
            const { cargo, sort } = req.query;

            if (cargo) {
                agentes = agentes.filter(agente =>
                    agente.cargo.toLowerCase() === cargo.toLowerCase()
                );
            }

            if (sort === 'dataDeIncorporacao') {
                agentes = agentes.sort((a, b) =>
                    new Date(a.dataDeIncorporacao) - new Date(b.dataDeIncorporacao)
                );
            } else if (sort === '-dataDeIncorporacao') {
                agentes = agentes.sort((a, b) =>
                    new Date(b.dataDeIncorporacao) - new Date(a.dataDeIncorporacao)
                );
            }

            res.json(agentes);
        } catch (error) {
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    },


    async findById(req, res) {
        const id = req.params.id;
        const agente = agentesRepository.findById(id);
        if (!agente) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agente);
    },

    async create(req, res) {
        const { nome, dataDeIncorporacao, cargo } = req.body;
        const errors = [];
        if (!nome || nome.trim() === '') {
            errors.push({ field: "nome", message: "Nome é obrigatório" });
        }
        if (!cargo){
            errors.push({ field: "cargo", message: "Cargo é obrigatório" });
        }
        if (!dataDeIncorporacao || !isValidDate(dataDeIncorporacao)) {
            errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
        }

        if (errors.length > 0) {
        return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agenteCriado = agentesRepository.create({ nome, dataDeIncorporacao, cargo });
        res.status(201).json(agenteCriado);
  },


    async update(req, res) {
        const id = req.params.id;
        const { nome, dataDeIncorporacao, cargo, id: idBody } = req.body;

        if ('id' in req.body) {
            return res.status(400).json({
                status: 400,
                message: "Não é permitido alterar o ID do caso."
            });
        }

        const errors = [];
        if ('nome' in dadosAtualizados) {
            if (typeof dadosAtualizados.nome !== 'string' || dadosAtualizados.nome.trim() === '') {
                errors.push({ field: "nome", message: "Nome deve ser uma string não vazia" });
            }
        }

        if ('cargo' in dadosAtualizados) {
            if (typeof dadosAtualizados.cargo !== 'string' || dadosAtualizados.cargo.trim() === '') {
                errors.push({ field: "cargo", message: "Cargo deve ser uma string não vazia" });
            }
        }

        if ('dataDeIncorporacao' in dadosAtualizados) {
            if (!isValidDate(dadosAtualizados.dataDeIncorporacao)) {
                errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agente = agentesRepository.update(id, { nome, dataDeIncorporacao, cargo });
        if (!agente) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agente);
    },

    async partialUpdate(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };

        if (Object.keys(dadosAtualizados).length === 0) {
            return res.status(400).json({
                status: 400,
                message: "Nenhum dado para atualizar foi fornecido."
            });
        }

        if ('id' in req.body) {
            return res.status(400).json({
                status: 400,
                message: "Não é permitido alterar o ID do agente."
            });
        }

        const errors = [];

        if (!('nome' in dadosAtualizados) || typeof dadosAtualizados.nome !== 'string' || dadosAtualizados.nome.trim() === '') {
        errors.push({ field: "nome", message: "Nome é obrigatório e deve ser uma string não vazia" });
        }

        if (!('cargo' in dadosAtualizados) || typeof dadosAtualizados.cargo !== 'string' || dadosAtualizados.cargo.trim() === '') {
            errors.push({ field: "cargo", message: "Cargo não pode ser vazio" });
        }

        if ('dataDeIncorporacao' in dadosAtualizados && !isValidDate(dadosAtualizados.dataDeIncorporacao) || typeof dadosAtualizados.cargo !== 'string' || dadosAtualizados.cargo.trim() === ''){
            errors.push({ field: "dataDeIncorporacao", message: "Data inválida ou no futuro" });
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const agenteAtualizado = agentesRepository.update(id, dadosAtualizados);
        if (!agenteAtualizado) {
            return res.status(404).send('Agente não encontrado');
        }
        res.json(agenteAtualizado);
    },

    async delete(req, res) {
        const id = req.params.id;
        const deletado = agentesRepository.delete(id);
        if (!deletado) {
            return res.status(404).send('Agente não encontrado');
        }
        res.status(204).send();
    }
};
