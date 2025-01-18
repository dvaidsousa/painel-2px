const express = require('express');
const router = express.Router();
const { Facebook } = require('../models'); // Importando o modelo Facebook
const authenticateToken = require('../middleware/auth');

// Rota POST para adicionar uma nova entrada facebook
router.post('/adicionar', authenticateToken, async (req, res) => {
  const { valor, tipo, dataEntrada, descricao } = req.body; // Agora incluindo o tipo
  
  try {
    // Cria uma nova entrada no banco de dados com o tipo
    const novaFacebook = await Facebook.create({
      valor,
      tipo,
      dataEntrada,
      descricao,
      userId: req.user.id, // Associando a entrada ao usuário autenticado
    });
    res.status(201).json({ message: 'Entrada adicionada com sucesso!', data: novaFacebook });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao salvar a entrada', error: err });
  }
});

// Rota para listar todas as facebook
router.get('/listar', authenticateToken, async (req, res) => {
  try {
    const facebook = await Facebook.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(facebook);
  } catch (error) {
    console.error('Erro ao buscar as facebook:', error);
    res.status(500).json({ error: 'Erro ao buscar as facebook' });
  }
});

// Rota PUT para editar uma entrada facebook existente
router.put('/editar/:id', authenticateToken, async (req, res) => { // Adicionado authenticateToken
  const { id } = req.params;
  const { valor, tipo, dataEntrada, descricao } = req.body;

  try {
    // Verificar se a entrada existe no banco de dados
    const entrada = await Facebook.findByPk(id);
    if (!entrada) {
      return res.status(404).send({ message: 'Entrada não encontrada' });
    }

    // Verificar se a entrada pertence ao usuário autenticado
    if (entrada.userId !== req.user.id) {
      return res.status(403).send({ message: 'Você não tem permissão para editar esta entrada' });
    }

    // Atualizar a entrada com os novos dados
    await entrada.update({ valor, tipo, dataEntrada, descricao });

    // Retornar a entrada atualizada
    res.status(200).json({
      message: 'Entrada atualizada com sucesso',
      data: entrada, // Retorna a entrada atualizada
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar a entrada', error });
  }
});

// Rota DELETE para excluir uma entrada facebook
router.delete('/deletar/:id', authenticateToken, async (req, res) => { // Adicionado authenticateToken
  const { id } = req.params;

  try {
    // Verificar se a entrada existe no banco de dados
    const entrada = await Facebook.findByPk(id);
    if (!entrada) {
      return res.status(404).send({ message: 'Entrada não encontrada' });
    }

    // Verificar se a entrada pertence ao usuário autenticado
    if (entrada.userId !== req.user.id) {
      return res.status(403).send({ message: 'Você não tem permissão para excluir esta entrada' });
    }

    // Excluir a entrada
    await entrada.destroy();
    res.json({ message: 'Item excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao excluir a entrada', error });
  }
});

module.exports = router;
