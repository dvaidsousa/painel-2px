const express = require('express');
const router = express.Router();
const { Contas } = require('../models');
const authenticateToken = require('../middleware/auth');

// Rota POST para adicionar uma nova entrada de contas
router.post('/adicionar', authenticateToken, async (req, res) => {
  const { nome, valor, tipo, dataVencimento } = req.body;
  
  try {
    const novaConta = await Contas.create({
      nome,
      valor,
      tipo,
      dataVencimento,
      userId: req.user.id,
    });
    res.status(201).json({ message: 'Conta adicionada com sucesso!', data: novaConta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao salvar a conta', error: 'Erro ao carregar os dados.' });
  }
});

// Rota para listar todas as contas
router.get('/listar', authenticateToken, async (req, res) => {
  try {
    const contas = await Contas.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(contas);
  } catch (error) {
    console.error('Erro ao buscar as contas:', error);
    res.status(500).json({ error: 'Erro ao carregar os dados.', details: error.message });
  }
});

// Rota PUT para editar uma conta existente
router.put('/editar/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { nome, valor, tipo, dataVencimento } = req.body;

  try {
    const conta = await Contas.findByPk(id);
    if (!conta) {
      return res.status(404).send({ message: 'Conta não encontrada' });
    }

    if (conta.userId !== req.user.id) {
      return res.status(403).send({ message: 'Você não tem permissão para editar esta conta' });
    }

    await conta.update({ nome, valor, tipo, dataVencimento });

    res.status(200).json({
      message: 'Conta atualizada com sucesso',
      data: conta,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao atualizar a conta', error: error.message });
  }
});

// Rota DELETE para excluir uma conta
router.delete('/deletar/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const conta = await Contas.findByPk(id);
    if (!conta) {
      return res.status(404).send({ message: 'Conta não encontrada' });
    }

    if (conta.userId !== req.user.id) {
      return res.status(403).send({ message: 'Você não tem permissão para excluir esta conta' });
    }

    await conta.destroy();
    res.json({ message: 'Conta excluída com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Erro ao excluir a conta', error: error.message });
  }
});

module.exports = router;
