const express = require('express');
const router = express.Router();
const { Financa, Etiqueta } = require('../models'); // Importando o modelo Financa e Etiqueta
const authenticateToken = require('../middleware/auth');

// Rota POST para adicionar uma nova entrada financeira
router.post('/adicionar', authenticateToken, async (req, res) => {
  const { valor, tipo, dataEntrada, descricao, etiquetaId } = req.body; // Agora incluindo o tipo
  
  try {
    // Cria uma nova entrada no banco de dados com o tipo
    const novaFinanca = await Financa.create({
      valor,
      tipo,
      dataEntrada,
      descricao,
      userId: req.user.id, // Associando a entrada ao usuário autenticado
      etiquetaId: req.body.etiquetaId,
    });
    res.status(201).json({ message: 'Entrada adicionada com sucesso!', data: novaFinanca });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao salvar a entrada', error: err });
  }
});

// Rota para listar todas as finanças
router.get('/listar', authenticateToken, async (req, res) => {
  try {
    const financas = await Financa.findAll({
      where: { userId: req.user.id },
      include: [{ model: Etiqueta, as: 'etiqueta' }] // Incluindo a tabela de etiquetas
    });
    res.status(200).json(financas);
  } catch (error) {
    console.error('Erro ao buscar as finanças:', error);
    res.status(500).json({ error: 'Erro ao buscar as finanças' });
  }
});

// Rota PUT para editar uma entrada financeira existente
router.put('/editar/:id', authenticateToken, async (req, res) => { // Adicionado authenticateToken
  const { id } = req.params;
  const { valor, tipo, dataEntrada, descricao, etiquetaId } = req.body;

  try {
    // Verificar se a entrada existe no banco de dados
    const entrada = await Financa.findByPk(id);
    if (!entrada) {
      return res.status(404).send({ message: 'Entrada não encontrada' });
    }

    // Verificar se a entrada pertence ao usuário autenticado
    if (entrada.userId !== req.user.id) {
      return res.status(403).send({ message: 'Você não tem permissão para editar esta entrada' });
    }

    // Atualizar a entrada com os novos dados
    await entrada.update({ valor, tipo, dataEntrada, descricao, etiquetaId });

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

// Rota DELETE para excluir uma entrada financeira
router.delete('/deletar/:id', authenticateToken, async (req, res) => { // Adicionado authenticateToken
  const { id } = req.params;

  try {
    // Verificar se a entrada existe no banco de dados
    const entrada = await Financa.findByPk(id);
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
