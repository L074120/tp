// Importa o framework Express.js para criar um servidor e gerenciar rotas
const express = require('express');

// Cria uma instância do roteador do Express, permitindo modularizar as rotas
const router = express.Router()

// Exporta o roteador para que ele possa ser utilizado em outros arquivos da aplicação
module.exports = router;

// Importa o modelo de dados 'Tarefa', que define a estrutura das tarefas no banco de dados
const modeloTarefa = require('../models/tarefa');


// Rota para criar uma nova tarefa e salvar no banco de dados
router.post('/post', async (req, res) => {
    // Cria um novo objeto 'modeloTarefa' com os dados enviados no corpo da requisição
    const objetoTarefa = new modeloTarefa({
        descricao: req.body.descricao, // Recebe a descrição da tarefa do corpo da requisição
        statusRealizada: req.body.statusRealizada // Recebe o status da tarefa (se foi realizada ou não)
    });

    try {
        // Salva a nova tarefa no banco de dados
        const tarefaSalva = await objetoTarefa.save();
        // Retorna a tarefa salva com status 200 (OK)
        res.status(200).json(tarefaSalva);
    } catch (error) {
        // Se houver erro, retorna status 400 (Bad Request) com a mensagem do erro
        res.status(400).json({ message: error.message });
    }
});


