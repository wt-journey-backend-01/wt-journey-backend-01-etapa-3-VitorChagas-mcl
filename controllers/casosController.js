const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

module.exports = {
    async findAll(req, res) {
        const {titulo, descricao, status, agente_id } = req.query;
        let casos = await casosRepository.findAll();

        if (status) {
            casos = casos.filter(caso => caso.status === status);
        }

        if (agente_id) {
            casos = casos.filter(caso => caso.agente_id === agente_id);
        }

        if(titulo){
            casos = casos.filter(caso => caso.titulo === titulo);
        }

        if(descricao){
            casos = casos.filter(caso => caso.descricao === descricao);
        }

        res.json(casos);
    },

    async findById(req, res) {
        const id = req.params.id;
        const caso = await casosRepository.findById(id);
        if (!caso) {
            return res.status(404).send('Caso não encontrado');
        }
        res.json(caso);
    },

    async create(req, res) {
        const novoCaso = req.body;
        const statusPermitidos = ['aberto', 'solucionado'];
        const errors = [];

        if (!novoCaso.titulo) {
            errors.push({ field: "titulo", message: "Título é obrigatório" });
        }

        if (!novoCaso.descricao) {
            errors.push({ field: "descricao", message: "Descrição é obrigatória" });
        }

        if (!novoCaso.status) {
            errors.push({ field: "status", message: "Status é obrigatório" });
        } else if (!statusPermitidos.includes(novoCaso.status)) {
            return res.status(400).json({
                errors: [{ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" }]
            });
        }

        if (!novoCaso.agente_id) {
            errors.push({ field: "agente_id", message: "Agente é obrigatório" });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Parâmetros inválidos",
                errors
            });
        }

        const agenteExiste = await agentesRepository.findById(novoCaso.agente_id);
        if (!agenteExiste) {
            return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
        }

       const casoCriado = await casosRepository.create(novoCaso);
        return res.status(201).json(casoCriado);
    },


    
    async update(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };
        if ('id' in req.body) {
            return res.status(400).json({
                status: 400,
                message: "Não é permitido alterar o ID do caso."
            });
        }

        const errors = [];

        if (!dadosAtualizados.titulo) {
            errors.push({ field: "titulo", message: "Título é obrigatório" });
        }

        if (!dadosAtualizados.descricao) {
            errors.push({ field: "descricao", message: "Descrição é obrigatória" });
        }

        if (!dadosAtualizados.status) {
            errors.push({ field: "status", message: "Status é obrigatório" });
        } else if (!['aberto', 'solucionado'].includes(dadosAtualizados.status)) {
            errors.push({ field: "status", message: "Status deve ser 'aberto' ou 'solucionado'" });
        }

        if (!dadosAtualizados.agente_id) {
            errors.push({ field: "agente_id", message: "Agente é obrigatório" });
        } else {
            const agenteExiste = await agentesRepository.findById(dadosAtualizados.agente_id);
            if (!agenteExiste) {
                return res.status(404).json({ message: 'Agente não encontrado para o agente_id informado' });
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ status: 400, message: "Parâmetros inválidos", errors });
        }

        const caso = await casosRepository.update(id, dadosAtualizados);
        if (!caso) return res.status(404).send('Caso não encontrado');

        res.json(caso);
    },

    async partialUpdate(req, res) {
        const id = req.params.id;
        const dadosAtualizados = { ...req.body };
        if ('id' in req.body) {
            return res.status(400).json({
                status: 400,
                message: "Não é permitido alterar o ID do caso."
            });
        }
        const casoAtualizado = await casosRepository.update(id, dadosAtualizados);
        if (!casoAtualizado) {
            return res.status(404).send('Caso não encontrado');
        }
        res.json(casoAtualizado);
    },

    async delete(req, res) {
        const id = req.params.id;
        const deletado = await casosRepository.delete(id);
        if (!deletado) {
            return res.status(404).send('Caso não encontrado');
        }
        res.status(204).send();
    }
};
